/**
 *    Copyright 2019 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
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
    var EI_INVALID_SIGNATURE_RESULT = "EI_INVALID_SIGNATURE_RESULT";
    var DIGITAL_SIGNATURE_PLUGIN_SCRIPT =
        "customscript_ei_pl_digital_signature";

    function runPlugin(pluginParams, pluginImplId) {
        try {
            var plugin = loadPlugin(pluginImplId);
            var result = plugin.signDocument(pluginParams);
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
                    "digitalSignature.plugininvalidresult"
                );
                throw error.create({
                    name: EI_INVALID_SIGNATURE_RESULT,
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
                type: DIGITAL_SIGNATURE_PLUGIN_SCRIPT,
                implementation: implId,
            });
        } catch (e) {
            log.error(e.name, e.message);
            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    "Digital Signature Plugin Load Encountered a problem\n",
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
