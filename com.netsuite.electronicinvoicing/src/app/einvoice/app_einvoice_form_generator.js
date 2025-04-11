/**  @NModuleScope Public */

define([
    "../../lib/wrapper/ns_wrapper_form",

    "N/error",

    "../../lib/app/app_transaction_type_map",
], function (form, error, transactionTypeMap) {
    var REQUIRED_PARAM_MISSING = "REQUIRED_PARAM_MISSING";

    var OUT_FORM_DEF_PARAM_REQ =
        "Form Definition is a required parameter for generating the e-Invoice Outbound Form.";

    var IN_FORM_DEF_PARAM_REQ =
        "Form definition is a required parameter for generating the Inbound Bulk Conversion for Failed E-Documents Form.";

    var ORIG_TRAN_TYPE_FIELD_ID = "custpage_orig_trantype";

    var TRAN_TYPE_FIELD_ID = "custpage_outbound_tran_type";

    var TRAN_TYPE_INBOUND_FIELD_ID = "custpage_inbound_trans_type";

    var OUTBOUND_EDOC_TYPE = "outbound";

    var INBOUND_EDOC_TYPE = "inbound";

    var EDOC_TYPE = "outbound";

    var FORM_DEF_PARAM_REQ;

    function generateForm(definition, edocType) {
        EDOC_TYPE = edocType;

        if (!definition) {
            FORM_DEF_PARAM_REQ = OUT_FORM_DEF_PARAM_REQ;
            if (EDOC_TYPE === INBOUND_EDOC_TYPE) {
                FORM_DEF_PARAM_REQ = IN_FORM_DEF_PARAM_REQ;
            }

            log.error(REQUIRED_PARAM_MISSING, FORM_DEF_PARAM_REQ);

            throw error.create({
                name: REQUIRED_PARAM_MISSING,

                message: FORM_DEF_PARAM_REQ, // iNBOUND/oUTBOUND

                notifyOff: true,
            });
        }

        form.createForm({
            title: definition.formTitle,
        });

        if (definition.clientScript) {
            addClientScriptFile(form, definition.clientScript);
        }

        if (definition.formFieldGroups) {
            setFormFieldGroups(form, definition.formFieldGroups);
        }

        if (definition.formFields) {
            setFormFields(form, definition.formFields);
        }

        if (definition.buttons) {
            addButtons(form, definition.buttons);
        }

        if (definition.sublists) {
            var sublistsLength = addSublists(form, definition.sublists);

            if (definition.preventSubmitIfEmpty) {
                definition.submitButton.isDisabled =
                    sublistsLength <= 0 ? true : false;
            }
        } else {
            var hasLicenseClient = form
                .getFormObject()
                .getField("custpage_inbound_has_license_client");

            var hasLicense = form
                .getFormObject()
                .getField("custpage_inbound_has_license");

            var countrySetup = form
                .getFormObject()
                .getField("custpage_inbound_free_country");

            if (EDOC_TYPE === OUTBOUND_EDOC_TYPE) {
                hasLicenseClient = form
                    .getFormObject()
                    .getField("custpage_outbound_has_license_client");

                hasLicense = form
                    .getFormObject()
                    .getField("custpage_outbound_has_license");

                countrySetup = form
                    .getFormObject()
                    .getField("custpage_outbound_free_country");
            }

            if (
                hasLicenseClient.defaultValue === "F" ||
                (hasLicense.defaultValue === "F" && !countrySetup.defaultValue)
            ) {
                definition.submitButton.isDisabled = true;
            }
        }

        addSubmitButton(form, definition.submitButton);

        return form;
    }

    function setFormFieldGroups(formObj, fieldGroups) {
        for (var i = 0; i < fieldGroups.length; i++) {
            var g = fieldGroups[i];

            formObj.addFieldGroup(g);
        }
    }

    function setFormFields(formObj, fields) {
        var custPageTranTypeId;
        var noCtts = false;
        if(EDOC_TYPE === INBOUND_EDOC_TYPE) {
            custPageTranTypeId = TRAN_TYPE_INBOUND_FIELD_ID;
            noCtts = true;
        } else {
            custPageTranTypeId = TRAN_TYPE_FIELD_ID;
        }
        var field = {};

        var supportedTransTypeOptions = {};

        var origTransTypeFld = {};

        for (var j = 0; j < fields.length; j++) {
            field = formObj.addField(fields[j]);

            if (field.id === ORIG_TRAN_TYPE_FIELD_ID) {
                origTransTypeFld = field;
            } else if (field.id === custPageTranTypeId) {
                supportedTransTypeOptions =
                    transactionTypeMap.getSupportedTransTypeLabels(
                        origTransTypeFld.getSelectOptions(),
                        EDOC_TYPE,
                        noCtts
                    );
                for (var k in supportedTransTypeOptions) {
                    field.addSelectOption({
                        value: supportedTransTypeOptions[k].value,

                        text: supportedTransTypeOptions[k].text,
                    });
                }
            }
        }
    }

    function addSubmitButton(formObj, submitButton) {
        formObj.addSubmitButton(
            { label: submitButton.label },
            submitButton.isDisabled
        );
    }

    function addButtons(formObj, buttons) {
        for (var i = 0; i < buttons.length; i++) {
            var b = buttons[i];

            formObj.addButton(b);
        }
    }

    function addSublists(formObj, sublists) {
        var sublistsLength = 0;

        try {
            for (var i = 0; i < sublists.length; i++) {
                var subl = sublists[i];

                sublistsLength += addSublist(formObj, subl);
            }
        } catch (e) {
            if (EDOC_TYPE === INBOUND_EDOC_TYPE) {
                log.error("EI_INBOUND_CONVERSION_FORM_SUBLIST_ERROR", e);
            } else {
                log.error("EI_OUTBOUND_SENDING_FORM_SUBLIST_ERROR", e);
            }
        }

        return sublistsLength;
    }

    function addSublist(formObj, sublistObj) {
        var sublistDefinition = sublistObj.sublistDefinition;

        var sublistDetails = sublistObj.sublistDetails;

        var subList = formObj.addSubList(sublistDefinition);

        var fields = sublistDetails.fields;

        for (var i = 0; i < fields.length; i++) {
            var fieldView = fields[i];

            subList.addField(fieldView);
        }

        var contentDefinition = sublistDetails.sublistContentDefinition;

        var search = contentDefinition.search;

        var adapter = contentDefinition.adapter;

        var views = adapter.convertResultsToViews(search, EDOC_TYPE);

        var sublistFieldValues = adapter.convertViewsToFieldValues(views);

        for (var j = 0; j < sublistFieldValues.length; j++) {
            var fieldValue = sublistFieldValues[j];

            subList.setSublistValue(fieldValue);
        }

        return views.length;
    }

    function addClientScriptFile(formObj, clientScript) {
        formObj.clientScriptModulePath(clientScript);
    }

    return {
        generateForm: generateForm,
    };
});
