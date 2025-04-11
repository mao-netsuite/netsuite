/**
 * @preserve
 * Client-side script attached to E-Invoice Template custom record
 * 
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Template CS
 * @NScriptId _ei_template_cs
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

define([
    "../../app/einvoice/app_einvoice_template_manager",
    "N/runtime",
    "N/ui/message",
    "../../lib/translator",
    "N/https",
    "N/url",
], function (
    templateManager,
    runtime,
    message,
    translator,
    https,
    url,
) {
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_ei_inject_data_source_impl";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_inbound_custom_data_source";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_ei_in_inject_data_source_impl";
    var OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_pl_outbound_validation";
    var OUTBOUND_VALIDATION_PLUGIN_RECORD =
        "custrecord_ei_pl_outboundvalidation_impl";

    var DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_pl_digital_signature";
    var DIGITAL_SIGNATURE_PLUGIN_RECORD =
        "custrecord_ei_pl_digital_signature_impl";

    var GENERATOR_TEMP_FIELD = "custrecord_psg_ei_template_content";
    var CONTENT_TYPE_FIELD = "custrecord_psg_file_content_type";
    var INBOUND_XSD_FIELD = "custrecord_edoc_template_xsd";
    var OUTBOUND_XSD_FIELD = "custrecord_edoc_template_outbound_xsd";

    function pageInit(context) {
        templateManager.storeInitialRecordValues(context.currentRecord);

        if (context.mode == "edit") {
            var SUPPORTED_TRANS_TYPE_FLD =
                "custpage_psg_ei_template_supported_transtype";
            var CANNOT_EDIT_TRANS_TYPE_CODE =
                "template.msg.cannotedittransactiontype";
            var stringMap = translator.getStringMap([
                CANNOT_EDIT_TRANS_TYPE_CODE,
            ]);
            var CANNOT_EDIT_TRANS_TYPE_MSG =
                stringMap[CANNOT_EDIT_TRANS_TYPE_CODE];

            var currentRec = {};
            var transTypeFld = {};

            currentRec = context.currentRecord;
            transTypeFld = currentRec.getField({
                fieldId: SUPPORTED_TRANS_TYPE_FLD,
            });

            if (transTypeFld.isDisabled) {
                var transTypeDisabledMsg = message.create({
                    type: message.Type.INFORMATION,
                    message: CANNOT_EDIT_TRANS_TYPE_MSG,
                });
                transTypeDisabledMsg.show();
            }
        }
    }

    function fieldChanged(context) {
        return templateManager.validateFieldChanged(context);
    }

    function validateLine(context) {
        return templateManager.validateSublist(context);
    }

    function showBannerMessage(bannerMessage, bannerType) {
        var messageType;
        if (bannerType === "ERROR") {
            messageType = message.Type.ERROR;
        } else if (bannerType === "WARNING") {
            messageType = message.Type.WARNING;
        } else if (bannerType === "CONFIRMATION") {
            messageType = message.Type.CONFIRMATION;
        }

        if (bannerMessage) {
            var transTypeDisabledMsg = message.create({
                type: messageType,
                message: bannerMessage,
            });
            transTypeDisabledMsg.show();
        }
    }

    function saveRecord(context) {
        var EI_STATUS_FIELD = "custrecord_psg_ei_temp_edoc_status";
        var SUPPORTED_EI_STATUS_FIELD =
            "custpage_psg_ei_temp_ei_status_txn_block";

        var execContext = runtime.executionContext;
        var currentRecord = context.currentRecord;

        var impl = currentRecord.getValue(
            INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD
        );
        var inboundImpl = currentRecord.getValue(
            INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD
        );
        var outboundValidationImpl = currentRecord.getValue(
            OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD
        );
        var digitalSignImpl = currentRecord.getValue(
            DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD
        );

        var validation = templateManager.validateTemplateFields(
            currentRecord,
            execContext
        );

        var validationResult = validation.validationResult;
        if (!validationResult.isValid()) {
            showBannerMessage(validationResult.getMessage(), "ERROR");
            return validationResult.isValid();
        }

        var templateContent = currentRecord.getValue({
            fieldId: GENERATOR_TEMP_FIELD,
        });
        var SERVICE_SU_SCRIPT = "customscript_ei_template_service_su";
        var SERVICE_SU_DEPLOY = "customdeploy_ei_template_service_su";

        var contentTypeText = currentRecord
            .getText({ fieldId: CONTENT_TYPE_FIELD })
            .toUpperCase();
        var inboundXsd = currentRecord.getText({ fieldId: INBOUND_XSD_FIELD });
        var outboundXsd = currentRecord.getText({
            fieldId: OUTBOUND_XSD_FIELD,
        });

        var parameters = {
            templateContent: templateContent,
            contentType: contentTypeText,
            inboundXsd: inboundXsd,
            outboundXsd: outboundXsd,
            execContext: execContext,
            hasOutbound: validation.hasatleastOneOutbound,
        };

        var suiteletURL = url.resolveScript({
            scriptId: SERVICE_SU_SCRIPT,
            deploymentId: SERVICE_SU_DEPLOY,
        });

        var response = https.post({
            url: suiteletURL,
            body: parameters,
        });

        var contentValidation = JSON.parse(response.body);
        var isJSONContentValid = contentValidation.validity;
        var messageType = contentValidation.type;

        //to show as banner message
        if (!isJSONContentValid) {
            if (messageType === "CONFIRM") {
                isJSONContentValid = confirm(contentValidation.message);
            } else {
                showBannerMessage(contentValidation.message, "ERROR");
                return isJSONContentValid;
            }
        }

        var eiStatusField = currentRecord.getValue(SUPPORTED_EI_STATUS_FIELD);
        currentRecord.setValue({
            fieldId: EI_STATUS_FIELD,
            value: eiStatusField,
        });
        currentRecord.setValue({
            fieldId: INJECT_CUSTOM_DATA_PLUGIN_RECORD,
            value: impl,
        });
        currentRecord.setValue({
            fieldId: INBOUND_INJECT_CUSTOM_DATA_PLUGIN_RECORD,
            value: inboundImpl,
        });
        currentRecord.setValue({
            fieldId: OUTBOUND_VALIDATION_PLUGIN_RECORD,
            value: outboundValidationImpl,
        });
        currentRecord.setValue({
            fieldId: DIGITAL_SIGNATURE_PLUGIN_RECORD,
            value: digitalSignImpl,
        });

        return isJSONContentValid;
    }

    function sublistChanged(context) {
        var record = context.currentRecord;
        var sublistId = context.sublistId;
        var operation = context.operation;
        templateManager.sublistChanged(record, sublistId, operation);
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        validateLine: validateLine,
        saveRecord: saveRecord,
        sublistChanged: sublistChanged,
    };
});
