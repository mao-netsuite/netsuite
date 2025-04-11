/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This service loads the edoc file information.
 *
 * Version    Date            Author           Remarks
 * 1.00       27 Oct 2016     esia
 *
 * @NApiVersion 2.1
 * @NScriptType suitelet
 */

define(["N/file"], function (file) {
    /*
     * Edoc File Loading Service SU
     * ID: customscript_ei_edocfile_loading_service_su
     * DEPLOYMENT: customdeploy_ei_edocfile_loading_service_su
     * */
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var edocFileInfo = {};
        if (parameters.edocFileId) {
            var edocFile = file.load({
                id: parameters.edocFileId,
            });

            edocFileInfo = {
                name: edocFile.name,
                content: edocFile.getContents(),
            };
        }
        response.setHeader({
            name: "Content-Type",
            value: "application/json",
        });
        response.write(JSON.stringify(edocFileInfo));
    }

    return {
        onRequest: onRequest,
    };
});
