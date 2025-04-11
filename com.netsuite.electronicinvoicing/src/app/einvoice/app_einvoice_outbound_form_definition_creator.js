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

var MODULES = [
    "./app_einvoice_outbound_form_filters_creator",

    "./app_einvoice_outbound_form_sublist_definition",

    "./app_einvoice_form_sublist_content_adapter",

    "./app_einvoice_outbound_search_creator",

    "../../lib/translator",
];

define(
    MODULES,

    function (
        filterFieldsCreator,
        eInvoiceOutboundSubListDefinition,
        eInvoiceOutboundSubListContentAdapter,
        eInvoiceOutboundSearchCreator,
        translator
    ) {
        var formType = "searchform";

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

        var CLIENT_SCRIPT_FILENAME = "../../comp/cs/dist/cs_e_outbound_form";

        function setFormType(type) {
            formType = type;
        }

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

        /* Initial Page */

        function getSearchFormDefinition(parameters) {
            var sendButton = {
                label: translator.getString("outbound.send") || "Send",

                isDisabled: true,
            };

            var formDef = new FormDefinition();

            formDef.formTitle =
                translator.getString("outbound.formtitle") ||
                "Send Failed E-Documents";

            formDef.submitButton = sendButton;

            formDef.formFieldGroups = getSearchFormFieldGroups();

            formDef.formFields = getSearchFormFields(parameters);

            return formDef;
        }

        function getSearchFormFields(parameters) {
            return filterFieldsCreator.getFilterFields(parameters);
        }

        function getSearchFormFieldGroups() {
            return filterFieldsCreator.getFieldGroups();
        }

        /* Search Result Page */

        function getResultFormDefinition(parameters) {
            var sendButton = {
                label: translator.getString("outbound.send") || "Send",

                isDisabled: false,
            };

            var formDef = new FormDefinition();

            formDef.formTitle =
                translator.getString("outbound.formtitle") ||
                "Send Failed E-Documents";

            formDef.submitButton = sendButton;

            formDef.sublists = [getEInvoiceSublist(parameters)];

            formDef.formFields = getSearchFormFields(parameters);

            formDef.formFieldGroups = getSearchFormFieldGroups();

            formDef.preventSubmitIfEmpty = true;

            return formDef;
        }

        function getEInvoiceSublist(parameters) {
            var sublistObj = {};

            /* sublistContentDefinition contains the adapter and search */

            var sublistContentDefinition =
                createOutboundEInvoiceSublistContentDefinition(parameters);

            var sublistDef =
                eInvoiceOutboundSubListDefinition.getDefinitionInstance(
                    parameters
                );

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

        function createOutboundEInvoiceSublistContentDefinition(parameters) {
            var idsAdapter = getOutboundEInvoiceAdapter();

            var idsSearch = getOutboundEInvoiceSearch(parameters);

            var input = {};

            input.adapter = idsAdapter;

            input.search = idsSearch;

            return input;
        }

        function getOutboundEInvoiceAdapter() {
            return eInvoiceOutboundSubListContentAdapter;
        }

        function getOutboundEInvoiceSearch(parameters) {
            return eInvoiceOutboundSearchCreator.getEInvoiceSearch(parameters);
        }

        return {
            getDefinition: getDefinition,

            setFormType: setFormType,
        };
    }
);
