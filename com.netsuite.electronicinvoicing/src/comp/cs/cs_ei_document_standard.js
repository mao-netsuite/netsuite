/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 *
 */

define([
    "../../lib/string_formatter",
    "../../lib/translator",
], function (stringFormatter, translator) {
    var NAME = "name";
    var DESCRIPTION = "custrecord_psg_ei_standard_desc";
    var DEFAULT_DOCUMENT_STANDARD_NAME = "Default E-Document Package";

    var DEFAULT_RECORD_ALREADY_EXISTS_CODE =
        "standarddocument.default.alreadyexist";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_CODE =
        "standarddocument.default.editnotallowed";

    var DEFAULT_NAME_PARAMETERS = {
        DEFAULT_DOCUMENT_STANDARD: DEFAULT_DOCUMENT_STANDARD_NAME,
    };
    var DEFAULT_RECORD_ALREADY_EXIST_MSG = "";

    var stringMap = [];
    var DEFAULT_RECORD_ALREADY_EXISTS_MSG =
        "The {DEFAULT_DOCUMENT_STANDARD} record already exists. You cannot create a document package record with the same name. Rename your document package record and try again.";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Editing the {DEFAULT_DOCUMENT_STANDARD} record Name or Description is not allowed.";

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
        DEFAULT_RECORD_ALREADY_EXIST_MSG = stringFormatter.toString();

        stringFormatter.setString(
            stringMap[EDIT_DEFAULT_RECORD_NOT_ALLOWED_CODE] ||
            EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG
        );
        stringFormatter.replaceParameters(DEFAULT_NAME_PARAMETERS);
        EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG = stringFormatter.toString();
    }

    var scriptContext;
    var originalName;
    var originalDescription;

    function pageInit(context) {
        scriptContext = context;
        originalName = scriptContext.currentRecord.getValue(NAME);
        originalDescription = scriptContext.currentRecord.getValue(DESCRIPTION);

        getTranslations();
    }

    function saveRecord(context) {
        var isValid = true;

        var record = context.currentRecord;
        var message;
        var name = record.getValue(NAME);
        var description = record.getValue(DESCRIPTION);
        if (isUpdateRecord() && isDefaultDocumentStandard()) {
            if (name !== originalName || description !== originalDescription) {
                message = EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG;
                isValid = false;
            }
        } else if (name === DEFAULT_DOCUMENT_STANDARD_NAME) {
            message = DEFAULT_RECORD_ALREADY_EXIST_MSG;
            isValid = false;
        }

        if (!isValid) {
            alert(message);
        }

        return isValid;
    }

    function isUpdateRecord() {
        return scriptContext && scriptContext.mode === "edit";
    }

    function isDefaultDocumentStandard() {
        return originalName === DEFAULT_DOCUMENT_STANDARD_NAME;
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
    };
});
