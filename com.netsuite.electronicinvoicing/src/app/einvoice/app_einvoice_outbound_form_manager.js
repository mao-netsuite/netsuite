/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Module Description

 *

 * Version    Date            Author           Remarks

 * 1.00       15 Oct 2015     mjaurigue

 *

 */

define([
    "./app_einvoice_outbound_form_definition_creator",
    "./app_einvoice_form_generator",
    "./app_einvoice_outbound_form_request_adapter",
], function (definitionCreator, formGenerator, requestAdapter) {
    function generateForm(request) {
        var requestParameters =
            requestAdapter.extractRequestParameters(request);

        if (requestParameters.custpage_outbound_result_mode) {
            definitionCreator.setFormType("resultform");
        } else {
            definitionCreator.setFormType("searchform");
        }

        var definition = definitionCreator.getDefinition(requestParameters);

        return formGenerator.generateForm(definition, "outbound");
    }

    return {
        generateForm: generateForm,
    };
});
