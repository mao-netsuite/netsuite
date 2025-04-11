/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       30 Jun 2017     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType restlet
 */

define([
    "N/runtime",
    "N/search",
    "../../app/einvoice/app_einvoice_inbound_ws_request_adapter",
    "../../app/einvoice/app_einvoice_inbound_edocument_validator",
    "../../app/einvoice/app_einvoice_notifier",
    "../../data/dao_inbound_edocument",
    "../../data/dao_vendor",
    "../../data/dao_customer",
    "../../lib/translator",
    "../../lib/string_formatter",
    "../../lib/app/app_transaction_type_map",
], function (
    runtime,
    search,
    inboundWSAdapter,
    inboundEdocValidator,
    notifier,
    inboundEdocDAO,
    vendorDAO,
    customerDAO,
    translator,
    stringFormatter,
    transactionTypeMap
) {
    var WEB_SERVICE_ERROR_CODE = "EI_INBOUND_WEB_SERVICE_ERROR";
    var VENDOR_BILL_TYPE = 17;
    var VENDOR_CREDIT_TYPE = 20;
    var SALES_ORDER_TYPE = 31;
    var INVALID_TRAN_TYPE = -1;
    var INBOUND_EDOC_RECORD_TYPE = "customrecord_psg_ei_inbound_edoc";
    var INBOUND_SOURCE_WEB_SERVICE = 3;
    var TEMPLATE_FIELD_VEND = "custrecord_psg_ei_inbound_template";
    var TEMPLATE_FIELD_CUST = "custrecord_psg_ei_inbound_temp_customer";
    var BILL_CREDIT = "BillCredit";
    var BILL = "Bill";
    var SALES_ORDER = "SalesOrder";
    var templateId;

    var NO_VENDOR_CODE = "inbound.webservice.response.novendor";
    var MULTIPLE_VENDOR_CODE = "inbound.webservice.response.multiplevendor";
    var INBOUND_EDOC_SUCCESS_CODE = "inbound.webservice.response.success";
    var MULTIPLE_VENDOR_ERROR_CODE =
        "inbound.webservice.error.multiplevendorerror";
    var NO_TEMPLATE_ERROR_CODE = "inbound.webservice.error.templateerror";
    var INVALID_TRANSACTION_TYPE_CODE = "ei.inbound.webservices.trantype.error";

    var NO_CUSTOMER_CODE = "inbound.webservice.response.nocustomer";

    function post(params) {
        var user = runtime.getCurrentUser();

        // Log Request
        log.audit(
            "Incoming request by user: " + user.id,
            "Request parameters: " + JSON.stringify(params)
        );

        var requestResult = [];
        var errorsToSend = [];

        var extractedRequest = inboundWSAdapter.extract(params);
        var inboundObjects = extractedRequest.resultArray;

        for (var i = 0; i < inboundObjects.length; i++) {
            // Check for initial parameter errors, proceed to next if there is an error
            if (inboundObjects[i].details !== "") {
                requestResult.push({
                    success: false,
                    message: inboundObjects[i].details,
                });

                continue;
            }

            var filename = inboundObjects[i].fileName;
            var content = inboundObjects[i].content;
            var identifier = inboundObjects[i].identifier;
            var tranTypeName = inboundObjects[i].tranType;
            var vendorId = "";
            var customerId = "";
            var recId = "";
            var responseString = "";

            var tranTypeID;
            if (tranTypeName == BILL) {
                tranTypeID = VENDOR_BILL_TYPE;
            } else if (tranTypeName == BILL_CREDIT) {
                tranTypeID = VENDOR_CREDIT_TYPE;
            } else if (tranTypeName == SALES_ORDER) {
                tranTypeID = SALES_ORDER_TYPE;
            } else {
                tranTypeID = INVALID_TRAN_TYPE;
            }

            // Check if Filename is valid, proceed to next if invalid
            var nameTest = inboundEdocValidator.validateFilename(filename);
            if (!nameTest.isSuccessful()) {
                requestResult.push({
                    success: false,
                    message:
                        WEB_SERVICE_ERROR_CODE + ": " + nameTest.getMessage(),
                });

                continue;
            }

            if (tranTypeID == INVALID_TRAN_TYPE) {
                var responseString1 = translator.getString(
                    INVALID_TRANSACTION_TYPE_CODE
                );
                stringFormatter.setString(responseString1);
                stringFormatter.replaceParameters({ IDENTIFIER: identifier });

                requestResult.push({
                    success: false,
                    message:
                        WEB_SERVICE_ERROR_CODE +
                        ": " +
                        stringFormatter.toString(),
                });
                continue;
            }

            if (transactionTypeMap.isPurchaseTransaction(tranTypeID, false)) {
                var vendorDetails = vendorDAO.getVendorUsingIdentifierAndSender(
                    identifier,
                    user.id
                );
                templateId = TEMPLATE_FIELD_VEND;
                if (vendorDetails.length < 1) {
                    responseString = translator.getString(NO_VENDOR_CODE);
                    stringFormatter.setString(responseString);
                    stringFormatter.replaceParameters({
                        IDENTIFIER: identifier,
                    });

                    requestResult.push({
                        success: false,
                        message:
                            WEB_SERVICE_ERROR_CODE +
                            ": " +
                            stringFormatter.toString(),
                    });

                    continue;
                }

                if (vendorDetails.length === 1) {
                    vendorId = vendorDetails[0].id;
                }
            } else if (
                transactionTypeMap.isSalesTransaction(tranTypeID, false)
            ) {
                var customerDetails =
                    customerDAO.getCustomerUsingIdentifierAndSender(
                        identifier,
                        user.id
                    );
                templateId = TEMPLATE_FIELD_CUST;
                if (customerDetails.length < 1) {
                    responseString = translator.getString(NO_CUSTOMER_CODE);
                    stringFormatter.setString(responseString);
                    stringFormatter.replaceParameters({
                        IDENTIFIER: identifier,
                    });

                    requestResult.push({
                        success: false,
                        message:
                            WEB_SERVICE_ERROR_CODE +
                            ": " +
                            stringFormatter.toString(),
                    });

                    continue;
                }

                if (customerDetails.length === 1) {
                    customerId = customerDetails[0].id;
                }
            }

            try {
                var saveOptions = {
                    enableSourcing: true,
                    ignoreMandatoryFields: true,
                };
                var inboundParams = {
                    name: filename,
                    content: content,
                    source: INBOUND_SOURCE_WEB_SERVICE,
                    transtype: tranTypeID,
                };
                if (
                    transactionTypeMap.isPurchaseTransaction(tranTypeID, false)
                ) {
                    inboundParams.vendor = vendorId;
                    recId = inboundEdocDAO.create(
                        inboundParams,
                        null,
                        saveOptions
                    );
                } else if (
                    transactionTypeMap.isSalesTransaction(tranTypeID, false)
                ) {
                    inboundParams.customer = customerId;
                    recId = inboundEdocDAO.create(
                        inboundParams,
                        null,
                        saveOptions
                    );
                }
            } catch (e) {
                // Proceed to next if error caught
                requestResult.push({
                    success: false,
                    message: e.name + ": " + e.message,
                });

                continue;
            }

            // Check if vendor is blank (meaning multiple)
            if (vendorId === "") {
                var responseString2 =
                    translator.getString(MULTIPLE_VENDOR_CODE);
                stringFormatter.setString(responseString2);
                stringFormatter.replaceParameters({
                    IDENTIFIER: identifier,
                    ID: recId,
                });

                requestResult.push({
                    success: true,
                    message: stringFormatter.toString(),
                });

                errorsToSend.push({
                    id: recId,
                    message: translator.getString(MULTIPLE_VENDOR_ERROR_CODE),
                });
            } else {
                var successString = translator.getString(
                    INBOUND_EDOC_SUCCESS_CODE
                );
                stringFormatter.setString(successString);
                stringFormatter.replaceParameters({ ID: recId });

                requestResult.push({
                    success: true,
                    message: stringFormatter.toString(),
                });

                var templateLookup = search.lookupFields({
                    type: INBOUND_EDOC_RECORD_TYPE,
                    id: recId,
                    columns: [templateId],
                });

                // Check if template is blank
                if (templateLookup[templateId].length < 1) {
                    errorsToSend.push({
                        id: recId,
                        message: translator.getString(NO_TEMPLATE_ERROR_CODE),
                    });
                }
            }
        }

        // Check if result should be JSON object
        if (extractedRequest.resultType === "Object") {
            requestResult = requestResult[0];
        } else if (extractedRequest.resultType === "Text") {
            requestResult = requestResult[0].message;
        }

        // Log Response
        log.audit(
            "Response to request by user: " + user.id,
            "Response: " + JSON.stringify(requestResult)
        );

        if (errorsToSend.length > 0) {
            notifier.notifyWebServiceError(errorsToSend);
        }

        return requestResult;
    }

    return {
        post: post,
    };
});
