/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       22 Dec 2022     lahari.lagadapati
 *
 * @NApiVersion 2.1
 * @NScriptName E Document server template service SU
 * @NScriptId _ei_template_service_su
 * @NScriptType Suitelet
 */
define(["../../app/einvoice/app_einvoice_server_template_manager"], function (
    manager
) {
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var contentvaliadtionresult =
            manager.validateServerTemplateFields(parameters);
        response.write(JSON.stringify(contentvaliadtionresult));
    }

    return {
        onRequest: onRequest,
    };
});
