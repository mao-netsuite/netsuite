/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Form UI for inbound bulk conversion for failed e-documents page.

 *

 * Version    Date            Author           Remarks

 * 1.00       09 Nov 2016     esia

 *

 */

define([
    "./app_einvoice_inbound_form_filters_creator",

    "./app_einvoice_form_sublist_content_adapter",

    "./app_einvoice_inbound_search_creator",

    "./app_einvoice_inbound_form_sublist_definition",

    "../../lib/translator",
], function (
    filterFieldsCreator,
    inboundSublistContentAdapter,
    inboundSearchCreator,
    inboundSubListDefinition,
    translator
) {
    var CLIENT_SCRIPT_FILENAME = "../../comp/cs/dist/cs_ei_inbound_form";

    var formType = "searchform";

    function setFormType(type) {
        formType = type;
    }

    var FormDefinition = function () {
        return {
            formTitle: null,

            submitButton: null,

            formFields: null,

            formFieldGroups: null,

            previousFormFlag: null,

            sublists: null,

            buttons: null,

            preventSubmitIfEmpty: false,

            clientScript: null,
        };
    };

    function getDefinition(parameters) {
        var def;

        if (formType === "searchform") {
            def = getSearchFormDefinition(parameters);
        } else {
            def = getResultFormDefinition(parameters);
        }

        def.clientScript = CLIENT_SCRIPT_FILENAME;

        return def;
    }

    function getSearchFormDefinition(parameters) {
        var convertButton = {
            label: translator.getString("inbound.convert") || "Convert",

            isDisabled: true,
        };

        var formDef = new FormDefinition();

        formDef.formTitle =
            translator.getString("inbound.formtitle") ||
            "Convert Inbound E-Documents";

        formDef.submitButton = convertButton;

        formDef.formFieldGroups = getSearchFormFieldGroups();

        formDef.formFields = getSearchFormFields(parameters);

        return formDef;
    }

    function getSearchFormFieldGroups() {
        return filterFieldsCreator.getFieldGroups();
    }

    function getSearchFormFields(parameters) {
        return filterFieldsCreator.getFilterFields(parameters);
    }

    function getResultFormDefinition(parameters) {
        var convertButton = {
            label: translator.getString("inbound.convert") || "Convert",

            isDisabled: false,
        };

        var formDef = new FormDefinition();

        formDef.formTitle =
            translator.getString("inbound.formtitle") ||
            "Convert Inbound E-Documents";

        formDef.submitButton = convertButton;

        formDef.sublists = [getConversionSublist(parameters)];

        formDef.formFieldGroups = getSearchFormFieldGroups();

        formDef.formFields = getSearchFormFields(parameters);

        formDef.preventSubmitIfEmpty = true;

        return formDef;
    }

    function getConversionSublist(parameters) {
        var sublistObj = {};

        var sublistContentDefinition =
            createSublistContentDefinition(parameters);

        var sublistDef =
            inboundSubListDefinition.getDefinitionInstance(parameters);

        sublistObj.sublistDetails = {
            fields: sublistDef.fields,

            sublistContentDefinition: sublistContentDefinition,
        };

        var sublistDefinition = {
            id: sublistDef.name + "_sublist",

            label: sublistDef.label,

            type: sublistDef.type,
        };

        sublistObj.sublistDefinition = sublistDefinition;

        return sublistObj;
    }

    function createSublistContentDefinition(parameters) {
        var input = {};

        input.adapter = inboundSublistContentAdapter;

        input.search = inboundSearchCreator.getEDocSearch(parameters);

        return input;
    }

    return {
        getDefinition: getDefinition,

        setFormType: setFormType,
    };
});
