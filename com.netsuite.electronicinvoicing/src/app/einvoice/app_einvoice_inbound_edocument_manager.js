/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       28 Jul 2016     esia
 *
 * @NModuleScope TargetAccount
 */

define([
    "../audit/app_audit_manager",
    "N/search",
    "N/record",
    "N/error",
    "N/xml",
    "N/file",
    "../../lib/translator",
    "../../lib/string_formatter",
], function (
    auditManager,
    search,
    record,
    error,
    xml,
    file,
    translator,
    stringFormatter
) {
    var CONVERTED = "15";
    var CONVERTING = "16";
    var CANCELLED = "17";

    var EDOC_TEMPLATE_REC = "customrecord_psg_ei_template";
    var EDOC_STANDARD_TEMPLATE_FLD = "custrecord_psg_ei_template_edoc_standard";
    var TRANS_TYPE_TEMPLATE_FLD = "custrecord_psg_ei_template_trans_type";
    var XSD_TEMPLATE_FLD = "custrecord_edoc_template_xsd";

    var CANCEL_STATUS_ERROR_MSG_CODE = "inboundedocument.cancel.failed";
    var CANCEL_SUCCESS_MSG_CODE = "inboundedocument.cancel.complete";

    /**
     * Retrieves the e-document template for given e-document package 
     * according to transaction type and validates against its XSD template.
     *
     * @param edocPackage E-doc Package Id
     * @param tranType Transaction Type Id
     * @param xmlContent String content of XML file
     *
     * @returns template retrieved e-document template Id
     */
    function getEdocTemplate(edocPackage, tranType, xmlContent) {
        var template = "";

        var edocTemplateSearch = search.create({
            type: EDOC_TEMPLATE_REC,
            columns: [
                search.createColumn({
                    name: XSD_TEMPLATE_FLD,
                }),
                search.createColumn({
                    name: "internalid",
                    sort: search.Sort.ASC,
                }),
            ],
            filters: [
                search.createFilter({
                    name: EDOC_STANDARD_TEMPLATE_FLD,
                    operator: search.Operator.IS,
                    values: edocPackage,
                }),
                search.createFilter({
                    name: TRANS_TYPE_TEMPLATE_FLD,
                    operator: search.Operator.IS,
                    values: tranType,
                }),
                search.createFilter({
                    name: XSD_TEMPLATE_FLD,
                    operator: search.Operator.NONEOF,
                    values: ["@NONE@"],
                }),
            ],
        });

        edocTemplateSearch.run().each(function (currentTemplate) {
            var xsdFileId = currentTemplate.getValue(XSD_TEMPLATE_FLD);
            var fileObj = file.load({ id: xsdFileId });
            try {
                xml.validate({
                    xml: xml.Parser.fromString(xmlContent),
                    xsdFilePathOrId: xsdFileId,
                    importFolderPathOrId: fileObj.folder,
                });
                template = currentTemplate.id;
                return false;
            } catch (e) {
                log.error(e.name, e.message);
            }
            return true;
        });
        return template;
    }

    /**
     * This cancels the inbound e-document record.
     *
     * @param recId The inbound e-document record Id
     * @param recType The inbound e-document record type
     * @param actionOwner The user who triggered the action
     * @returns result cancellation result
     */
    function cancelEDocument(recId, recType, actionOwner) {
        var resultDetails = {
            success: true,
            message: "",
        };

        var errorParams;
        if (!recId) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "The inbound e-document record id is a required parameter for cancelling the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }

        if (!recType) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Record type is a required parameter for cancelling the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }

        if (!actionOwner) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Action owner is a required parameter for cancelling the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }

        var inboundLookup = search.lookupFields({
            type: recType,
            id: recId,
            columns: [
                "custrecord_psg_ei_inbound_vendor",
                "custrecord_psg_ei_inbound_status",
            ],
        });

        var status = inboundLookup.custrecord_psg_ei_inbound_status[0].value;
        var statusText = inboundLookup.custrecord_psg_ei_inbound_status[0].text;
        var entityId = inboundLookup.custrecord_psg_ei_inbound_vendor[0]
            ? inboundLookup.custrecord_psg_ei_inbound_vendor[0].value
            : "";

        var logParams = {
            inboundEDoc: recId,
            entity: entityId,
            owner: actionOwner,
        };

        if ([CONVERTED, CONVERTING, CANCELLED].indexOf(status) !== -1) {
            resultDetails.success = false;
            var errorDetails = translator.getString(
                CANCEL_STATUS_ERROR_MSG_CODE
            );
            var errorParameters = {
                STATUS: statusText,
            };
            stringFormatter.setString(errorDetails);
            stringFormatter.replaceParameters(errorParameters);
            resultDetails.message = stringFormatter.toString();
            logParams.details = resultDetails.message;
            auditManager.logCancellationFailed(logParams);
        } else {
            record.submitFields({
                type: recType,
                id: recId,
                values: {
                    custrecord_psg_ei_inbound_status: CANCELLED,
                },
            });
            logParams.details = translator.getString(CANCEL_SUCCESS_MSG_CODE);
            auditManager.logCancelled(logParams);
        }

        return resultDetails;
    }

    return {
        getEdocTemplate: getEdocTemplate,
        cancelEDocument: cancelEDocument
    };
});
