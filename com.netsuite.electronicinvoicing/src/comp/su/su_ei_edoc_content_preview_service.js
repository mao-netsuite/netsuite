/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This service loads the inbound edoc content
 *
 * Version    Date            Author           Remarks
 * 1.00       01 Feb 2017     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType suitelet
 */

define(["N/search", "N/error"], function (search, error) {
    var FILE_FORMAT = "xml";

    var CONTENT_FIELD = "custrecord_psg_ei_inbound_content";
    var TRANSACTION_BODY_CONTENT = "custbody_psg_ei_content";
    var CONTENT_FIELD_MAP = {
        inbound: CONTENT_FIELD,
        outbound: TRANSACTION_BODY_CONTENT,
    };

    function getEdocRecord(edocId, type, docType, context) {
        var edocRecord;
        if (docType) {
            edocRecord = search.lookupFields({
                type: type,
                id: edocId,
                columns: CONTENT_FIELD_MAP[docType],
            });
        }
        return edocRecord;
    }
    /*
     * Edoc Content Preview SU
     * ID: customscript_ei_content_prev_service_su
     * DEPLOYMENT: customdeploy_ei_content_prev_service_su
     * */
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var edocRecord;
        var errorParams;
        var xmlContent = "";

        if (parameters.edocId) {
            edocRecord = getEdocRecord(
                parameters.edocId,
                parameters.type,
                parameters.doctype,
                context
            );

            if (CONTENT_FIELD_MAP[parameters.doctype] in edocRecord) {
                xmlContent = edocRecord[CONTENT_FIELD_MAP[parameters.doctype]];
            }
        }
        if (!parameters.edocId || !xmlContent) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Inbound E-Document Id is a required parameter for viewing the e-document XML.",
            };
            log.error(errorParams.name, errorParams.message);

            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }

        if (parameters.fileFormat && parameters.fileFormat === FILE_FORMAT) {
            response.setHeader({
                name: "Content-Type",
                value: "text/xml",
            });

            response.write(xmlContent);
        } else {
            errorParams = {
                name: "INVALID_FORMAT",
                message: "Invalid Format for viewing the e-document content",
            };
            log.error(errorParams.name, errorParams.message);

            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
    }

    return {
        onRequest: onRequest,
    };
});
