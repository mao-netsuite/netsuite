/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       23 Feb 2017     ssantiago
 * 2.00		  09 Jul 2018	  syadav		Added changes for supporting Custom Validation Plugin Types for Inbound documents.
 *
 * This is the user event for the Electronic Invoicing Inbound Validation Plugin
 *
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([
    "N/error",
    "../../lib/translator",
    "N/runtime",
    "N/ui/serverWidget",
    "../../app/einvoice/app_einvoice_plugin_find_implementations",
    "N/ui/message",
], function (error, translator, runtime, serverWidget, plugin, message) {
    var INBOUND_VALIDATION_PLUGIN_RECORD =
        "custrecord_ei_inbound_validation_pl_impl";
    var INBOUND_VALIDATION_SCRIPT_RECORD = "custrecord_ei_validation_script";
    var VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Inbound E-Document Validation Plugin Implementation";
    var VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the Inbound E-Document Validation Plugin Implementation.";
    var VALIDATOIN_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_inbound_validation_plugin";
    var VALIDATOIN_CUSTOM_PLUGIN_IMPL_TYPE =
        "customscript_ei_pl_type_validation";
    var SCRIPT_TYPE_VALIDATION_PLUGIN_MSG_CODE =
        "validationplugin.scriptbannermessage";
    var SCRIPT_TYPE_VALIDATION_PLUGIN_MSG =
        "Inbound e-document validation should be custom plug-in implementations. Please recreate existing validation scripts as new custom plug-in implementations of the type “Inbound Validation Plugin”";
    var DEFAULT = "Default";

    var pluginImplNameMap = {};

    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var pluginError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "validationplugin.contextunsupported"
                ),
                notifyOff: true,
            });

            throw new Error(pluginError.name + ": " + pluginError.message);
        }

        var record = context.newRecord;

        var impl = record.getValue(VALIDATOIN_PLUGIN_IMPLEMENTATION_FLD);

        record.setValue({
            fieldId: INBOUND_VALIDATION_PLUGIN_RECORD,
            value: impl,
        });
    }

    /**
     *
     * Following method will be triggered before loading the form
     */
    function beforeLoad(context) {
        var currRecord = context.newRecord;

        if (isCopiedRecord(context)) {
            currRecord.setValue(INBOUND_VALIDATION_SCRIPT_RECORD, "");
        }

        var scriptTypePluginMethod = isScriptTypeValidationPlugin(currRecord);

        if (scriptTypePluginMethod) {
            createWarningBanner(
                SCRIPT_TYPE_VALIDATION_PLUGIN_MSG_CODE,
                SCRIPT_TYPE_VALIDATION_PLUGIN_MSG
            );
        }

        var validationPluginImpl = currRecord.getValue(
            INBOUND_VALIDATION_PLUGIN_RECORD
        );
        var execContext = runtime.executionContext;
        if (execContext === runtime.ContextType.USER_INTERFACE) {
            if (validationPluginImpl !== "" || isCopiedRecord(context)) {
                hideValidationScriptField(context);
                addValidationPluginImplField(context);
            }

            if (isCreateRecord(context)) {
                addValidationPluginImplField(context);
                hideValidationScriptField(context);
            }
        }
    }
    function isScriptTypeValidationPlugin(currentRec) {
        var scriptName = currentRec.getValue(INBOUND_VALIDATION_SCRIPT_RECORD);
        return scriptName !== "";
    }

    function createWarningBanner(messageKey, messageVal) {
        message
            .create({
                type: message.Type.WARNING,
                message: translator.getString(messageKey) || messageVal,
            })
            .show({ sendToClient: true });
    }
    function isCreateRecord(context) {
        return context.UserEventType.CREATE === context.type;
    }

    function isCopiedRecord(context) {
        return context.UserEventType.COPY === context.type;
    }

    /**
     * Hide the Validation script field
     *
     * @param context
     */

    function hideValidationScriptField(context) {
        var form = context.form;
        var field = form.getField(INBOUND_VALIDATION_SCRIPT_RECORD);
        if (field) {
            field.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
        }
    }

    /**
     * Enable the validation plugin implementation field and lists all the implementations available.
     * @param context
     */
    function addValidationPluginImplField(context) {
        var form = context.form;
        var validationPluginImplFld;

        // Add E-Document Validation Plugin Implementation list field.
        validationPluginImplFld = form.addField({
            id: VALIDATOIN_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString("validationplugin.pluginimplementation") ||
                VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        validationPluginImplFld.isMandatory = true;
        validationPluginImplFld.setHelpText({
            help:
                translator.getString(
                    "validationplugin.pluginimplementationhelp"
                ) || VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });

        // Adding the names of plugin implementations in the list.
        addAllPluginImplementationNames(context, validationPluginImplFld);
    }

    function addAllPluginImplementationNames(context, validationPluginImplFld) {
        var selectedPluginImpl;
        var pluginNames = plugin.findImplementations(
            VALIDATOIN_CUSTOM_PLUGIN_IMPL_TYPE
        );
        updatePluginNameIdMap(pluginNames);

        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImpl = context.newRecord.getValue(
                INBOUND_VALIDATION_PLUGIN_RECORD
            );
        }
        if (selectedPluginImpl === DEFAULT) {
            validationPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            validationPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }

        for (var i in pluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImpl) &&
                pluginNames[i].name === pluginImplNameMap[selectedPluginImpl]
            ) {
                validationPluginImplFld.addSelectOption({
                    value: pluginNames[i].id,
                    text: pluginNames[i].name,
                    isSelected: true,
                });
            } else {
                validationPluginImplFld.addSelectOption({
                    value: pluginNames[i].id,
                    text: pluginNames[i].name,
                });
            }
        }
    }

    function updatePluginNameIdMap(pluginInfo) {
        for (var i in pluginInfo) {
            pluginImplNameMap[pluginInfo[i].id] = pluginInfo[i].name;
        }
    }

    /**
     * Checks if current context does not belong to unsupported contexts
     * @returns {Boolean}
     */
    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.WEBSTORE,
            ].indexOf(runtime.executionContext) === -1
        );
    }

    return {
        beforeSubmit: beforeSubmit,
        beforeLoad: beforeLoad,
    };
});
