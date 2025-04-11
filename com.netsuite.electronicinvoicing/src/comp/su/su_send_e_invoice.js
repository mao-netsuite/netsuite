/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       12 Nov 2015     aalcabasa
 *
 * @NApiVersion 2.x
 * @NScriptName E-Document Sending Service SU
 * @NScriptId _su_send_e_invoice
 * @NModuleScope public
 * @NScriptType Suitelet
 */
define([
    "N/runtime",
    "../../app/einvoice/app_einvoice_sending_manager",
    "../../lib/translator",
    "../../app/einvoice/app_einvoice_license_manager",
    "N/record",
    "../../app/einvoice/app_einvoice_notifier",
], function (
    runtime,
    sendingManager,
    translator,
    licenseManager,
    record,
    notifier
) {
    var DEFAULT_ERROR_CODE = "ei.sending.defaulterror";
    var CERTIFICATION_ERROR_CODE = "ei.sending.certification.defaulterror";
    var EI_INACTIVE_CUSTOMER_CODE = "ei.sending.inactivecustomer";
    var EI_INACTIVE_VENDOR_CODE = "ei.sending.inactivevendor";
    var SENDING_COMPLETE_CODE = "ei.sending.msg.processcomplete";
    var EI_STATUS = "custbody_psg_ei_status";
    var READY_FOR_SENDING = 3;
    var CERTIFICATION_COMPLETE_CODE =
        "ei.sending.certification.msg.processcomplete";
    var DEFAULT_ERROR_MSG =
        "An error occurred during sending of the e-document. Please check the E-Document Audit Trail on the E-Document subtab for details.";
    var CERTIFICATION_ERROR_MSG =
        "An error occurred during certification of the e-document. Please check the E-Document Audit Trail on the E-Document subtab for details.";
    var EI_INACTIVE_CUSTOMER_MSG =
        "Unable to send the e-document for this transaction because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try sending the e-document again.";
    var EI_INACTIVE_VENDOR_MSG =
        "Unable to send the e-document for this transaction because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try sending the e-document again.";

    var userIdInReq;
    var locale;

    function getTranslations(userLocale) {
        if (userLocale) {
            translator.setLocale(userLocale);
        }
        DEFAULT_ERROR_MSG =
            translator.getString(DEFAULT_ERROR_CODE) || DEFAULT_ERROR_MSG;
        EI_INACTIVE_CUSTOMER_MSG =
            translator.getString(EI_INACTIVE_CUSTOMER_CODE) ||
            EI_INACTIVE_CUSTOMER_MSG;
        EI_INACTIVE_VENDOR_MSG =
            translator.getString(EI_INACTIVE_VENDOR_CODE) ||
            EI_INACTIVE_VENDOR_MSG;
    }

    function onRequest(context) {
        var result = {
            success: true,
            message: "",
            data: {},
        };
        var bundleId = runtime.getCurrentScript().bundleIds[0];
        result.data.bundleId = bundleId;
        var request = context.request;
        var parameters = request.parameters;
        var transId = parameters.transId;
        var transType = parameters.transType;
        var isAvalara = JSON.parse(parameters.isAvalara);
        userIdInReq = parameters.userId;
        locale = parameters.locale;

        var senderId = userIdInReq ? userIdInReq : runtime.getCurrentUser().id;
        if (senderId == -4) {
            senderId = notifier.getFirstActiveAdmin();
        }

        var certSendingMethodId = parameters.certSendingMethodId;
        var rec = record.load({ id: transId, type: transType });
        var status = rec.getValue(EI_STATUS);
        var errorDetails = sendingManager.send(
            transId,
            transType,
            senderId,
            certSendingMethodId,
            locale,
            isAvalara
        );
        if (!errorDetails.success) {
            result.success = false;
            result.message = getMessagePrompt(
                errorDetails,
                certSendingMethodId
            );
            var notifDef = getUnsuccessfulNotificationDefinition(
                errorDetails,
                certSendingMethodId
            );
            result.data.messageCode = notifDef.code;
            result.data.messageType = notifDef.type;
        } else {
            licenseManager.lockFreeCountry();
            if (
                (typeof certSendingMethodId !== "undefined" &&
                certSendingMethodId !== "" &&
                certSendingMethodId !== "undefined") || isAvalara
            ) {
                if (status !== READY_FOR_SENDING) {
                    result.data.messageCode = CERTIFICATION_COMPLETE_CODE;
                }
            } else {
                result.data.messageCode = SENDING_COMPLETE_CODE;
            }
            result.data.messageType = "c";
        }
        context.response.write(JSON.stringify(result));
    }

    function getMessagePrompt(errorDetails, certSendingMethodId) {
        var message = errorDetails.message;
        var entityType = errorDetails.entityType;
        getTranslations(locale);
        var msg =
            typeof certSendingMethodId !== "undefined" &&
            certSendingMethodId !== ""
                ? CERTIFICATION_ERROR_MSG
                : DEFAULT_ERROR_MSG;
        if (message.indexOf("EI_INACTIVE_ENTITY") !== -1) {
            if (entityType === record.Type.CUSTOMER) {
                msg = EI_INACTIVE_CUSTOMER_MSG;
            } else {
                msg = EI_INACTIVE_VENDOR_MSG;
            }
        }
        return msg;
    }

    function getUnsuccessfulNotificationDefinition(
        errorDetails,
        certSendingMethodId
    ) {
        var message = errorDetails.message;
        var entityType = errorDetails.entityType;
        var code =
            typeof certSendingMethodId !== "undefined" &&
            certSendingMethodId !== ""
                ? CERTIFICATION_ERROR_CODE
                : DEFAULT_ERROR_CODE;
        var type = "e";
        if (message.indexOf("EI_INACTIVE_ENTITY") !== -1) {
            if (entityType === record.Type.CUSTOMER) {
                code = EI_INACTIVE_CUSTOMER_CODE;
            } else {
                code = EI_INACTIVE_VENDOR_CODE;
            }
            type = "w";
        }
        return { code: code, type: type };
    }

    return {
        onRequest: onRequest,
    };
});
