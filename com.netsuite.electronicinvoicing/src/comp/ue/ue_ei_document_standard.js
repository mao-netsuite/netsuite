/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       22 Feb 2016     esia
 *
 * This is the user event for the Electronic Document Package.
 *
 * @NApiVersion 2.1
 * @NScriptName E-Document Package UE
 * @NScriptId _ei_document_standard_ue
 * @NScriptType UserEventScript
 */
define([
    "N/error",
    "../../lib/translator",
    "../../lib/string_formatter",
    "N/runtime",
    "N/query"
], function (error, translator, stringFormatter, runtime, query) {
    var EI_CANNOT_CREATE_DEFAULT_DOCUMENT_STANDARD =
        "EI_CANNOT_CREATE_DEFAULT_DOCUMENT_PACKAGE";
    var EI_CANNOT_EDIT_DEFAULT_DOCUMENT_STANDARD =
        "EI_CANNOT_EDIT_DEFAULT_DOCUMENT_PACKAGE";
    var EI_CANNOT_DELETE_DEFAULT_DOCUMENT_STANDARD =
        "EI_CANNOT_DELETE_DEFAULT_DOCUMENT_PACKAGE";
    var NAME = "name";
    var DESCRIPTION = "custrecord_psg_ei_standard_desc";
    var DEFAULT_DOCUMENT_STANDARD = "Default E-Document Package";
    var DEFAULT_DOCUMENT_STANDARD_DESCRIPTION =
        "This is the default E-Document Package. Assign e-document templates and sending methods to be used for your transactions.";

    var DEFAULT_RECORD_ALREADY_EXIST_MSG =
        "The {DEFAULT_DOCUMENT_STANDARD} record already exists. You cannot create a document package record with the same name. Rename your document package record and try again.";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Editing the {DEFAULT_DOCUMENT_STANDARD} record Name or Description is not allowed.";
    var DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Deleting the {DEFAULT_DOCUMENT_STANDARD} record is not allowed.";

    var E_DOCUMENT_PACKAGE_TYPE = 'customrecord_psg_ei_standards';

    function getTranslations() {
        DEFAULT_RECORD_ALREADY_EXIST_MSG =
            translator.getString("standarddocument.default.alreadyexist") ||
            DEFAULT_RECORD_ALREADY_EXIST_MSG;
        EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
            translator.getString("standarddocument.default.editnotallowed") ||
            EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG;
        DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG =
            translator.getString("standarddocument.default.deletenotallowed") ||
            DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG;
    }

    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var templateError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "standarddocument.contextunsupported"
                ),
                notifyOff: true,
            });

            throw new Error(templateError.name + ": " + templateError.message);
        }

        getTranslations();
        var record = context.newRecord;
        var oldRecord = context.oldRecord;

        var errorMsg;
        var oldNameIsDefault = oldRecord
            ? oldRecord.getValue(NAME) === DEFAULT_DOCUMENT_STANDARD
            : false;
        var newName = record.getValue(NAME);
        var newDescription = record.getValue(DESCRIPTION);
        var newNameIsDefault = newName === DEFAULT_DOCUMENT_STANDARD;
        var details;
        var parameters;
        if (
            ( isCreateRecord(context) || // Creating a new Record
                isCopyRecord(context) || // Copying a record
                (isUpdateRecord(context) && !oldNameIsDefault) ) && // Updating a non-default record
            newNameIsDefault
        ) {
            if (doesDefaultDocumentExist()) {
                parameters = {
                    DEFAULT_DOCUMENT_STANDARD: DEFAULT_DOCUMENT_STANDARD,
                };
                stringFormatter.setString(DEFAULT_RECORD_ALREADY_EXIST_MSG);
                stringFormatter.replaceParameters(parameters);
                details = stringFormatter.toString();

                errorMsg = error.create({
                    name: EI_CANNOT_CREATE_DEFAULT_DOCUMENT_STANDARD,
                    message: details,
                    notifyOff: true,
                });

                throw new Error(errorMsg.name + ": " + errorMsg.message);
            }
        } else if (isUpdateRecord(context) && oldNameIsDefault) {
            if (
                newName !== DEFAULT_DOCUMENT_STANDARD ||
                newDescription !== DEFAULT_DOCUMENT_STANDARD_DESCRIPTION
            ) {
                parameters = {
                    DEFAULT_DOCUMENT_STANDARD: DEFAULT_DOCUMENT_STANDARD,
                };
                stringFormatter.setString(EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG);
                stringFormatter.replaceParameters(parameters);
                details = stringFormatter.toString();

                errorMsg = error.create({
                    name: EI_CANNOT_EDIT_DEFAULT_DOCUMENT_STANDARD,
                    message: details,
                    notifyOff: true,
                });

                throw new Error(errorMsg.name + ": " + errorMsg.message);
            }
        } else if (
            isDeleteRecord(context) &&
            (newName === DEFAULT_DOCUMENT_STANDARD ||
                oldRecord.getValue(NAME) === DEFAULT_DOCUMENT_STANDARD)
        ) {
            parameters = {
                DEFAULT_DOCUMENT_STANDARD: DEFAULT_DOCUMENT_STANDARD,
            };
            stringFormatter.setString(DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG);
            stringFormatter.replaceParameters(parameters);
            details = stringFormatter.toString();

            errorMsg = error.create({
                name: EI_CANNOT_DELETE_DEFAULT_DOCUMENT_STANDARD,
                message: details,
                notifyOff: true,
            });

            throw new Error(errorMsg.name + ": " + errorMsg.message);
        }
    }

    function isCreateRecord(context) {
        return context.UserEventType.CREATE === context.type;
    }

    function isUpdateRecord(context) {
        var eventTypes = context.UserEventType;
        return [eventTypes.EDIT, eventTypes.XEDIT].indexOf(context.type) !== -1;
    }

    function isDeleteRecord(context) {
        return context.UserEventType.DELETE === context.type;
    }
    function isCopyRecord(context) {
        return context.UserEventType.COPY === context.type;
    }

    function doesDefaultDocumentExist() {
        var defaultDocumentQuery = query.create({
            type: E_DOCUMENT_PACKAGE_TYPE
        });
        var firstCondition = defaultDocumentQuery.createCondition({
            fieldId: 'name',
            operator: 'IS',
            values: DEFAULT_DOCUMENT_STANDARD,
        });

        defaultDocumentQuery.condition = firstCondition;
        defaultDocumentQuery.columns = [
            defaultDocumentQuery.createColumn({
                fieldId: "name",
            }),
            defaultDocumentQuery.createColumn({
                fieldId: "id",
            }),
        ];
        var resultSet = defaultDocumentQuery.run();
        var results = resultSet.results;

        return results && results.length;
    }

    /**
     * Checks if current context does not belong to unsupported contexts
     * @returns {Boolean}
     */
    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.WEBSTORE,
            ].indexOf(runtime.executionContext) === -1
        );
    }

    return {
        beforeSubmit: beforeSubmit,
    };
});
