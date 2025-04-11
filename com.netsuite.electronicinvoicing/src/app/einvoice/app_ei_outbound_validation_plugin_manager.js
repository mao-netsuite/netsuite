/**
 * Copyright 2020 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 * Version    Date            Author           Remarks
 * 1.00       30 Jun 2020     nvuppalanchi
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["N/plugin", "N/error", "../../lib/translator"], function (
    pluginModule,
    error,
    translator
) {
    //Initialize variables
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";
    var ERROR_RUNNING_PLUGIN = "ERROR_RUNNING_PLUGIN";
    var EI_INVALID_OUTBOUND_VALIDATION_RESULT =
        "EI_INVALID_OUTBOUND_VALIDATION_RESULT";
    var OUTBOUND_VALIDATION_PLUGIN_SCRIPT =
        "customscript_ei_pl_outbound_validation";

    function runPlugin(pluginParams, pluginImplId) {
        try {
            var plugin = loadPlugin(pluginImplId);
            var result = plugin.validate(pluginParams);
            if (
                !result ||
                JSON.stringify(result) === "{}" ||
                typeof result === "undefined"
            ) {
                var locale = pluginParams.locale;
                if (locale) {
                    translator.setLocale(locale);
                }
                var errorMessage = translator.getString(
                    "outboundvalidation.plugininvalidresult"
                );
                throw error.create({
                    name: EI_INVALID_OUTBOUND_VALIDATION_RESULT,
                    message: errorMessage,
                    notifyOff: true,
                });
            }
            return result;
        } catch (e) {
            throw error.create({
                name: ERROR_RUNNING_PLUGIN,
                message: [e.name, e.message].join("\n"),
                notifyOff: true,
            });
        }
    }

    function loadPlugin(implId) {
        var plugin;
        try {
            plugin = pluginModule.loadImplementation({
                type: OUTBOUND_VALIDATION_PLUGIN_SCRIPT,
                implementation: implId,
            });
        } catch (e) {
            log.error(e.name, e.message);
            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    "Outbound Validation Plugin Load Encountered a problem\n",
                    e.message,
                ].join(""),
                notifyOff: true,
            };
            throw error.create(errorParams);
        }
        return plugin;
    }

    return {
        runPlugin: runPlugin,
    };
});
