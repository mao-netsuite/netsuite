/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This module serves as client scripts' entry point for connecting with the edoc file loading service.
 *
 * Version    Date            Author           Remarks
 * 1.00       27 Oct 2016     esia
 *
 * @NModuleScope Public
 */

define(["N/url", "N/https"], function (url, https) {
    function loadEdocFile(edocFileId) {
        var SERVICE_SU_SCRIPT = "customscript_ei_edoc_loading_service_su";
        var SERVICE_SU_DEPLOY = "customdeploy_ei_edoc_loading_service_su";

        var parameters = { edocFileId: edocFileId };

        var suiteletURL = url.resolveScript({
            scriptId: SERVICE_SU_SCRIPT,
            deploymentId: SERVICE_SU_DEPLOY,
        });

        var response = https.post({
            url: suiteletURL,
            body: parameters,
        });

        return JSON.parse(response.body);
    }

    return {
        loadEdocFile: loadEdocFile,
    };
});
