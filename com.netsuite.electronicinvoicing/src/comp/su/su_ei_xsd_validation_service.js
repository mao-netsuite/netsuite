/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This service validates an XML file against XSD schemas of templates.
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Jan 2017     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType suitelet
 */

define([
    "../../app/einvoice/app_einvoice_inbound_edocument_manager",
    "N/file",
], function (inboundEdocManager, file) {
    /*
     * Edoc XSD Validation Service SU
     * ID: customscript_ei_xsdvalidation_service_su
     * DEPLOYMENT: customdeploy_ei_xsdvalidation_service_su
     * */
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var edocTemplateInfo = { id: "" };
        if (
            parameters.entityId &&
            parameters.tranType &&
            (parameters.xmlFile || parameters.xmlContent)
        ) {
            var xmlContent = "";

            if (parameters.xmlFile) {
                var xmlFile = file.load({
                    id: parameters.xmlFile,
                });
                xmlContent = xmlFile.getContents();
            } else if (parameters.xmlContent) {
                xmlContent = parameters.xmlContent;
            }

            var edocTemplate = inboundEdocManager.getEdocTemplate(
                parameters.edocPackage,
                parameters.tranType,
                xmlContent
            );

            if (edocTemplate) {
                edocTemplateInfo.id = edocTemplate;
            }
        }
        response.setHeader({
            name: "Content-Type",
            value: "application/json",
        });
        response.write(JSON.stringify(edocTemplateInfo));
    }

    return {
        onRequest: onRequest,
    };
});
