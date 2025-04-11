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
    "../../lib/translator",
], function (pluginMod, error, plugRecordWrapper, translator) {
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";

    var ERROR_RUNNING_PLUGIN = "ERROR_RUNNING_PLUGIN";

    var EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT =
        "EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT";

    var INBOUND_CUSTOM_DATA_SOURCE_PLUGIN =
        "customscript_ei_pl_inject_data_inbound";

    function runPlugin(pluginParams, pluginImplId) {
        try {
            var plugin = loadPlugin(pluginImplId);

            if(pluginParams.inboundEDocRec) {
                pluginParams.inboundEDocRec = plugRecordWrapper.wrapRecord(
                pluginParams.inboundEDocRec
            );
        }
            if(pluginParams.templateRec) {  
                pluginParams.templateRec = plugRecordWrapper.wrapRecord(
                pluginParams.templateRec
            );
        }
            if(pluginParams.entityRec) { 
                pluginParams.entityRec = plugRecordWrapper.wrapRecord(
                pluginParams.entityRec
            );
        }
            var result = plugin.inject(pluginParams);

            if (!result || JSON.stringify(result) === "{}") {
                throw error.create({
                    name: EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT,

                    message: translator.getString(
                        "inboundcustomdatasource.plugininvalidresult"
                    ),

                    notifyOff: true,
                });
            }
            return result;
        } catch (e) {
            log.error(e.name, e.message);

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
            plugin = pluginMod.loadImplementation({
                type: INBOUND_CUSTOM_DATA_SOURCE_PLUGIN,

                implementation: implId,
            });
        } catch (e) {
            log.error(e.name, e.message);

            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,

                message: [
                    "Inbound Custom Data Source Plugin load encountered a problem\n",
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
