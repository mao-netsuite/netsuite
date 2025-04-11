/**
 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    "N/plugin",
    "N/error",
    "../../lib/wrapper/ns_wrapper_plugin_record",
], function (pluginMod, error, plugRecordWrapper) {
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";
    var EI_CUSTOM_DATA_SOURCE_IN_ERROR = "EI_CUSTOM_DATA_SOURCE_IN_ERROR";
    var EI_CUSTOM_DATA_SOURCE_INVALID_RESULT =
        "EI_CUSTOM_DATA_SOURCE_INVALID_RESULT";
    var CUSTOM_DATA_SOURCE_PLUGIN = "customscript_ei_pl_inject_data_source";

    function runPlugin(params, pluginImpl) {
        try {
            var plugin = loadPlugin(pluginImpl);
            if (params.transactionRecord) {
                params.transactionRecord = plugRecordWrapper.wrapRecord(
                    params.transactionRecord
                );
            }
            var result = plugin.inject(params);
            if (!result || JSON.stringify(result) === "{}") {
                throw error.create({
                    name: EI_CUSTOM_DATA_SOURCE_INVALID_RESULT,
                    message:
                        "The plug-in failed to return valid custom data source",
                    notifyOff: true,
                });
            }
            return result;
        } catch (e) {
            log.error(e.name, e.message);
            throw error.create({
                name: EI_CUSTOM_DATA_SOURCE_IN_ERROR,
                message: [e.name, e.message].join("\n"),
                notifyOff: true,
            });
        }
    }
    function loadPlugin(implId) {
        var plugin;
        try {
            plugin = pluginMod.loadImplementation({
                type: CUSTOM_DATA_SOURCE_PLUGIN,
                implementation: implId,
            });
        } catch (e) {
            log.error(e.name, e.message);

            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    "Custom Data Source Plugin Load Encountered a problem\n",
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
