/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       12 Nov 2015     ssantiago
 *
 * @NApiVersion 2.x
 * @NScriptName E-Invoice Generation Service SU
 * @NScriptId _ei_generation_service_su
 * @NScriptType Suitelet
 */
define([
    "../../app/einvoice/app_einvoice_manager",
    "N/runtime",
    "N/error",
    "../../lib/translator",
    "N/record",
    "../../app/einvoice/app_einvoice_cdata_plugin_manager",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_generator",
    "../../app/audit/app_audit_manager",
], function (
    eInvoiceManager,
    runtime,
    error,
    translator,
    record,
    customDataPluginMgr,
    notifier,
    generator,
    auditManager
) {
    var FAILED_GENERATION_LOG_MSG;
    var FAILED_GENERATION_LOG_MSG_CODE = "ei.generation.failedgenerationlog";
    var DEFAULT_ERROR_CODE = "ei.generation.defaulterror";
    var EI_INACTIVE_CUSTOMER_CODE = "ei.generation.inactivecustomer";
    var EI_INACTIVE_VENDOR_CODE = "ei.generation.inactivevendor";
    var GENERATION_COMPLETE_CODE = "ei.generation.msg.processcomplete";
    var EI_TEMPLATE = "custbody_psg_ei_template";
    var QR_CODE_STR_FIELD = "custbody_psg_ei_qr_string";
    var QR_CODE_PREVIEW_FIELD = "custbody_psg_ei_qr_code";
    var EI_GENERATION_SERVICE = "EIGenerationService";
    var FAILED_STATUS = 5;
    var SERVICE = "service";
    var GENERATION_SIGNING_COMPLETE_CODE =
        "ei.generation.msg.completedwithdigitalsignature";
    var qrFieldsUpdate = {};
    var DEFAULT_ERROR_MSG =
        "An error occurred during generation. Please check the E-Document Audit Trail on the E-Document subtab for details.";
    var EI_INACTIVE_CUSTOMER_MSG =
        "Unable to generate an e-document for this transaction because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try generating the e-document again.";
    var EI_INACTIVE_VENDOR_MSG =
        "Unable to generate an e-document for this transaction because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try generating the e-document again.";
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
        FAILED_GENERATION_LOG_MSG = translator.getString(FAILED_GENERATION_LOG_MSG_CODE);
    }
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;
        var result = {
            success: true,
            message: "",
            data: {},
        };
        var bundleId = runtime.getCurrentScript().bundleIds[0];
        var pluginImpl = "";
        result.data.bundleId = bundleId;
        var errorParams;
        if (!parameters.transId) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction Id is a required parameter for generating the e-document.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!parameters.transType) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction type is a required parameter for generating the e-document.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        runtime.getCurrentSession().set(SERVICE, EI_GENERATION_SERVICE);
        var transId = parameters.transId;
        var transType = parameters.transType;
        userIdInReq = parameters.userId;
        locale = parameters.locale;
        var tranObj = record.load({ id: transId, type: transType });
        var ownerForLogs;
        if (userIdInReq) {
            ownerForLogs = userIdInReq;
        } else {
            var currUser = runtime.getCurrentUser();
            ownerForLogs = currUser.id;
            if (ownerForLogs == -4) {
                ownerForLogs = notifier.getFirstActiveAdmin();
            }
        }
        var templateId = tranObj.getValue(EI_TEMPLATE);
        var isAvalaraTemplate = undefined;
        if (templateId !== "" || typeof templateId !== "undefined") {
            var templateRec = getTemplate(templateId);
            pluginImpl = getTemplatePluginImpl(templateRec);
            isAvalaraTemplate = getAvalaraTemplate(templateRec);
        }
        // Resetting the QR code fields at the start of the generation process
        qrFieldsUpdate[QR_CODE_STR_FIELD] = "";
        qrFieldsUpdate[QR_CODE_PREVIEW_FIELD] = "";
        record.submitFields({
            type: transType,
            id: transId,
            values: qrFieldsUpdate,
        });

        var renderJson = {};
        var certSendingMethodId = parameters.certSendingMethodId;
        if (pluginImpl !== "" && typeof pluginImpl !== "undefined") {
            try {
                var ublTransactionRecord = generator.getUBLContent(transId, transType, isAvalaraTemplate);
                var params = {
                    transactionRecord: tranObj,
                    transactionId: transId,
                    userId: ownerForLogs,
                    ublTransactionRecord: ublTransactionRecord,
                };
                log.debug("Executing custom data inject plugin");
                renderJson = customDataPluginMgr.runPlugin(params, pluginImpl);
                log.debug("Successfully  received custom data source");
            } catch (ex) {
                log.error(ex.name, ex.message + "\n" + ex.stack);
                if(isAvalaraTemplate){
                    var logParams = {
                        transaction: transId,
                        entity: eInvoiceManager.getEntityId(tranObj),
                        owner: ownerForLogs,
                    };
                    var template = eInvoiceManager.getTemplate(templateId);
                    getTranslations();
                    var ublTransactionErrorDetails = FAILED_GENERATION_LOG_MSG;
                    var errorParameters = {
                        TEMPLATENAME: template ? template.name : "",
                        ERROR: "Transaction information for the selected accounting book cannot be found."
                    }
                    eInvoiceManager.generateLogErrorMsg(template, ublTransactionErrorDetails, errorParameters, logParams);
                    auditManager.logGenerationFailed(logParams);
                    record.submitFields({
                        type: transType,
                        id: transId,
                        values: {
                            custbody_psg_ei_status: FAILED_STATUS,
                            custbody_ei_ds_txn_identifier: false, //Setting the digitally signed transaction identifier to false in case of generation failure.
                        },
                    });
                    result.success = false;
                    result.message = ex.message;
                    result.data.messageCode = DEFAULT_ERROR_CODE;
                    result.data.messageType = "e";
                    return response.write(JSON.stringify(result));
                }
            }
        }
        var errorDetails = generate(
            transId,
            transType,
            renderJson,
            certSendingMethodId,
            ownerForLogs
        );
        runtime.getCurrentSession().set(SERVICE, null);
        if (!errorDetails.success) {
            result.success = false;
            result.message = getMessagePrompt(errorDetails);
            var notifDef = getUnsuccessfulNotificationDefinition(errorDetails);
            result.data.messageCode = notifDef.code;
            result.data.messageType = notifDef.type;
        } else {
            if (errorDetails.digitalSigningSuccess)
                result.data.messageCode = GENERATION_SIGNING_COMPLETE_CODE;
            else result.data.messageCode = GENERATION_COMPLETE_CODE;
            result.data.messageType = "c";
        }
        response.write(JSON.stringify(result));
    }
    function getMessagePrompt(errorDetails) {
        var message = errorDetails.message;
        var entityType = errorDetails.entityType;
        getTranslations();
        var msg = DEFAULT_ERROR_MSG;
        if (message.indexOf("EI_INACTIVE_ENTITY") !== -1) {
            if (entityType === record.Type.CUSTOMER) {
                msg = EI_INACTIVE_CUSTOMER_MSG;
            } else {
                msg = EI_INACTIVE_VENDOR_MSG;
            }
        }
        return msg;
    }
    function getUnsuccessfulNotificationDefinition(errorDetails) {
        var message = errorDetails.message;
        var entityType = errorDetails.entityType;
        var code = DEFAULT_ERROR_CODE;
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
    /**
     * Generate an E-Invoice via manager
     * @params {String} transId - the internal Id of the transaction for generation
     * @params {String} transType - the transaction type
     * @returns transObj The invoice object with updated E-Invoice values
     */
    function generate(
        transId,
        transType,
        renderJson,
        certSendingMethodId,
        ownerForLogs
    ) {
        log.debug(
            "Owner for logging",
            ownerForLogs + " (type= " + typeof ownerForLogs + ")"
        );
        var transObj = eInvoiceManager.getTransaction(transId, transType);
        transObj = eInvoiceManager.generateEDocument(
            transObj,
            transType,
            ownerForLogs,
            false,
            renderJson,
            certSendingMethodId,
            locale
        );
        return transObj;
    }
    function getTemplate(templateId) {
        var EI_TEMPLATE_RECORD = "customrecord_psg_ei_template";
        return record.load({
            id: templateId,
            type: EI_TEMPLATE_RECORD,
        });
    }
    function getTemplatePluginImpl(templateRec) {
        var CUST_DATA_SOURCE_IMPL = "custrecord_ei_inject_data_source_impl";
        return templateRec.getValue(CUST_DATA_SOURCE_IMPL);
    }
    function getAvalaraTemplate(templateRec) {
        var AVALARA_TEMPLATE = "custrecord_psg_ei_is_avalara_template";
        return templateRec.getValue(AVALARA_TEMPLATE);
    }
    return {
        onRequest: onRequest,
    };
});
