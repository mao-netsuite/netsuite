/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Sending Method CS
 * @NScriptId _ei_sending_method_cs
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

define([
    "N/ui/message",
    "../../lib/translator",
    "../../lib/string_formatter",
], function (message, translator, stringFormatter) {
    var DEFAULT_RECORD_ALREADY_EXISTS_CODE =
        "sendingMethod.default.alreadyexist";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_CODE =
        "sendingMethod.default.editnotallowed";
    var NAME = "name";
    var DEFAULT_SENDING_METHOD_NAME = "NetSuite Email";
    var DEFAULT_NAME_PARAMETERS = {
        DEFAULT_SENDING_METHOD_NAME: DEFAULT_SENDING_METHOD_NAME,
    };
    var TRANSACTION_TYPE_FLD = "custrecord_psg_ei_trans_type";
    var SUPPORTED_TRANS_TYPE_FLD = "custpage_psg_ei_supported_transtype";
    var SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD = "custpage_ei_sending_plugin";
    var SENDING_PLUGIN_IMPL_RECORD = "custrecord_ei_sending_plugin_impl";

    var stringMap = [];
    var DEFAULT_RECORD_ALREADY_EXISTS_MSG =
        "The {DEFAULT_SENDING_METHOD_NAME} sending method record already exists.You cannot create a sending method record with the same name. Rename your sending method record and try again.";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Editing the {DEFAULT_SENDING_METHOD_NAME} sending method record is not allowed.";

    var scriptContext;
    var originalName;

    function getTranslations() {
        stringMap = translator.getStringMap([
            DEFAULT_RECORD_ALREADY_EXISTS_CODE,
            EDIT_DEFAULT_RECORD_NOT_ALLOWED_CODE,
        ]);
        stringFormatter.setString(
            stringMap[DEFAULT_RECORD_ALREADY_EXISTS_CODE] ||
            DEFAULT_RECORD_ALREADY_EXISTS_MSG
        );
        stringFormatter.replaceParameters(DEFAULT_NAME_PARAMETERS);
        DEFAULT_RECORD_ALREADY_EXISTS_MSG = stringFormatter.toString();

        stringFormatter.setString(
            stringMap[EDIT_DEFAULT_RECORD_NOT_ALLOWED_CODE] ||
            EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG
        );
        stringFormatter.replaceParameters(DEFAULT_NAME_PARAMETERS);
        EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG = stringFormatter.toString();
    }

    function pageInit(context) {
        scriptContext = context;
        originalName = scriptContext.currentRecord.getValue(NAME);

        getTranslations();
        if (context.mode === "edit") {
            var CANNOT_EDIT_TRANS_TYPE_CODE =
                "sendingMethod.msg.cannotedittransactiontype";
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

    function saveRecord(context) {
        var record = context.currentRecord;
        var isValid = true;
        var message = "";
        var name = record.getValue(NAME);
        var impl = record.getValue(SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD);
        if (isUpdateRecord() && isDefaultSendingMethod()) {
            message = EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG;
            isValid = false;
        } else if (name === DEFAULT_SENDING_METHOD_NAME) {
            message = DEFAULT_RECORD_ALREADY_EXISTS_MSG;
            isValid = false;
        }
        record.setValue({
            fieldId: SENDING_PLUGIN_IMPL_RECORD,
            value: impl,
        });
        // All error scenarios are exclusive, it's impossible to get another type of error on the same record
        if (!isValid) {
            alert(message);
        }

        return isValid;
    }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord;
        if (context.fieldId === SUPPORTED_TRANS_TYPE_FLD) {
            // Set supported transaction type selected to the Transaction Type field.
            var supportedTransTypeValues = currentRecord.getValue(
                SUPPORTED_TRANS_TYPE_FLD
            );
            currentRecord.setValue({
                fieldId: TRANSACTION_TYPE_FLD,
                value: supportedTransTypeValues,
            });
        }
    }

    function isUpdateRecord() {
        return scriptContext && scriptContext.mode === "edit";
    }

    function isDefaultSendingMethod() {
        return originalName === DEFAULT_SENDING_METHOD_NAME;
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        fieldChanged: fieldChanged,
    };
});
