/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       14 Jul 2016     mjaurigue
 *
 * Supporting the following transaction types
 * 	- Sales Order
 *
 * @NApiVersion 2.1
 * @NScriptName E-Document Inbound Transaction UE
 * @NScriptId _edoc_inbound_transaction_ue
 * @NScriptType usereventscript
 */

define([
    "N/ui/serverWidget",
    "N/ui/message",
    "../../app/einvoice/app_einvoice_transaction_response",
    "../../lib/utils",
    "../../lib/translator",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_instances",
], function (
    serverWidget,
    message,
    transResponse,
    utils,
    translator,
    mainConstants,
    recordInstances
) {
    var PO_VALIDATION_BYPASSED = "custbody_psg_ei_inb_txn_po_valid_bypas";
    var PO_VALIDATION_BYPASSED_VEND_BILL_BANNER_CODE =
        "ei_po_validation_bypassed_vendor_bill_banner";
    var PO_VALIDATION_BYPASSED_VEND_BILL_BANNER_MSG =
        "Purchase order number in the inbound e-document used for the conversion into vendor bill was not found in this account. Check audit trail for more details.";
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;
    var ACCEPTED_RESPONSE_STATUS_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].ACCEPTED;
    var DUPLICATE_SO_INFO_CODE = "ei.conversion.duplicatesoinfo";
    var DUPLICATE_SO_INFO_MSG =
        "See the e-document audit trail for details about sales orders with the same PO#.";

    function beforeLoad(context) {
        var newRec = context.newRecord;
        var poValidationBypassedFldVal = newRec.getValue(
            PO_VALIDATION_BYPASSED
        );
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT
        ) {
            if (poValidationBypassedFldVal === true) {
                var bannerType = "INFORMATION";
                var bannerMessage =
                    translator.getString(
                        PO_VALIDATION_BYPASSED_VEND_BILL_BANNER_CODE
                    ) || PO_VALIDATION_BYPASSED_VEND_BILL_BANNER_MSG;
                message
                    .create({
                        type: bannerType,
                        message: bannerMessage,
                    })
                    .show({ sendToClient: true });
            } else if (context.request && context.request.parameters) {
                var bannerDetails = getBannerDetailsFromParams(
                    context.request.parameters
                );
                if (bannerDetails.type && bannerDetails.message) {
                    message.create(bannerDetails).show({ sendToClient: true });
                }
            }
        }
    }

    function afterSubmit(context) {
        var currRecord = context.newRecord;
        var oldRecord = context.oldRecord;
        if (
            currRecord.getValue("custbody_psg_ei_inbound_edocument") &&
            utils.transRespAllowedData(currRecord.getValue("subsidiary"))
                .isTransRespSupportEnabled
        ) {
            var responseStatus = utils.getInternalIdUsingScriptIdQuery(
                TRANSACTION_RESPONSE_TYPE_REC_TYPE,
                ACCEPTED_RESPONSE_STATUS_SCRIPT_ID
            );
            if (currRecord.type === "vendorcredit" && context.type === "create")
                transResponse.createTransactionResponse(
                    currRecord.id,
                    currRecord.type,
                    responseStatus,
                    "CustCred"
                );
            else {
                var STATUS =
                    currRecord.type === "vendorbill"
                        ? "approvalstatus"
                        : "orderstatus";
                if (
                    currRecord.type === "vendorbill" &&
                    (context.type === "approve" ||
                        (context.type === "create" &&
                            currRecord.getValue(STATUS) === "2") ||
                        (currRecord.getValue(STATUS) === "2" &&
                            currRecord.getValue(STATUS) !==
                            oldRecord.getValue(STATUS)))
                ) {
                    transResponse.createTransactionResponse(
                        currRecord.id,
                        currRecord.type,
                        responseStatus,
                        "CustInvc"
                    );
                } else if (
                    currRecord.type === "salesorder" &&
                    (context.type === "approve" ||
                        (context.type === "create" &&
                            currRecord.getValue(STATUS) === "B") ||
                        (currRecord.getValue(STATUS) === "B" &&
                            currRecord.getValue(STATUS) !==
                            oldRecord.getValue(STATUS)))
                ) {
                    transResponse.createTransactionResponse(
                        currRecord.id,
                        currRecord.type,
                        responseStatus,
                        "PurchOrd"
                    );
                }
            }
        }
    }
    /**
     * Function to get banner details from parameters
     *
     * @param {Object} requestParameters Request Parameters
     * @returns {Object} bannerDetails Details of the banner to be shown
     */
    function getBannerDetailsFromParams(requestParameters) {
        var bannerDetails = {
            type: "",
            message: "",
        };

        if (requestParameters.ei_process) {
            var proc = requestParameters.ei_process;
            var messageCode = requestParameters.ei_mc;
            var t = requestParameters.ei_t;

            /* Determining banner type */
            if (!t || t === "i") {
                bannerDetails.type = "INFORMATION";
            }

            if (proc) {
                /* Translation and showing of banner */
                bannerDetails.message = translator.getString(messageCode);
                if (
                    messageCode === DUPLICATE_SO_INFO_CODE &&
                    !bannerDetails.message
                ) {
                    bannerDetails.message = DUPLICATE_SO_INFO_MSG;
                }
            }
        }

        return bannerDetails;
    }

    return {
        beforeLoad: beforeLoad,
        afterSubmit: afterSubmit,
    };
});
