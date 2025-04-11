/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Module Description

 *

 * Version    Date            Author           Remarks

 * 1.00       09 Nov 2016     esia

 *

 */

define([
    "./app_einvoice_inbound_form_definition_creator",

    "./app_einvoice_form_generator",

    "./app_einvoice_inbound_form_request_adapter",
], function (definitionCreator, formGenerator, requestAdapter) {
    function generateForm(request) {
        var requestParameters =
            requestAdapter.extractRequestParameters(request);

        if (requestParameters.custpage_inbound_result_mode) {
            definitionCreator.setFormType("resultform");
        } else {
            definitionCreator.setFormType("searchform");
        }

        var definition = definitionCreator.getDefinition(requestParameters);

        return formGenerator.generateForm(definition, "inbound");
    }

    return {
        generateForm: generateForm,
    };
});
