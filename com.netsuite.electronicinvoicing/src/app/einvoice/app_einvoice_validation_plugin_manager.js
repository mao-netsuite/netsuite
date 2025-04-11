/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       17 Feb 2017     ssantiago
 *
 */
define(["N/error", "N/file", "require", "N/plugin"], function (
    error,
    file,
    require,
    pluginImpl
) {
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";
    var EI_VALIDATION_PLUG_IN_ERROR = "EI_VALIDATION_PLUG_IN_ERROR";
    var EI_VALIDATION_INVALID_RESULT = "EI_VALIDATION_INVALID_RESULT";
    var VALIDATION_PLUGIN_DEFAULT = "customscript_ei_pl_type_validation";
    var DEFAULT = "Default";

    /**
     * runPlugin - This function loads a plugin implementation given its file's path
     * It calls the 'run' function of the loaded plugin
     *
     * @param {Object} plugInContext
     * @param {Object} plugInContext.eDocument
     * @param {String} plugInContext.eDocument.id
     * @param {String} plugInContext.eDocument.scriptId
     * @param {String} plugInContext.eDocument.content
     * @param {Object} plugInContext.eDocument.source
     * @param {String} plugInContext.eDocument.source.id
     * @param {String} plugInContext.eDocument.source.text
     * @param {Object} plugInContext.eDocument.template
     * @param {String} plugInContext.eDocument.template.id
     * @param {String} plugInContext.eDocument.template.text
     * @param {Object} plugInContext.eDocument.status
     * @param {Integer} plugInContext.eDocument.status.id
     * @param {String} plugInContext.eDocument.status.text
     * @param {Object} plugInContext.eDocument.package
     * @param {String} plugInContext.eDocument.package.id
     * @param {String} plugInContext.eDocument.package.text
     * @param {Object} plugInContext.eDocument.transactionType
     * @param {String} plugInContext.eDocument.transactionType.id
     * @param {String} plugInContext.eDocument.transactionType.text
     * @param {Object} plugInContext.eDocument.vendor
     * @param {String} plugInContext.eDocument.vendor.id
     * @param {String} plugInContext.eDocument.vendor.text
     *
     * @returns {Object} result
     * @returns {Boolean} result.success: determines if plugin result is successful
     * @returns {String} result.message: a message describing details of result
     */
    function runPlugin(plugInContext) {
        try {
            var plugin = loadPlugin(plugInContext);
            var result = plugin.validate(plugInContext);
            if (!result) {
                throw error.create({
                    name: EI_VALIDATION_INVALID_RESULT,
                    message: "The plug-in failed to return a valid result.",
                    notifyOff: true,
                });
            } else if (!result.success) {
                throw error.create({
                    name: EI_VALIDATION_PLUG_IN_ERROR,
                    message: result.message,
                    notifyOff: true,
                });
            } else if (result.success) {
                return result.message;
            }
        } catch (e) {
            log.error(e.name, e.message);
            var newError = e;
            if (
                [
                    PROBLEM_LOADING_PLUG_IN,
                    EI_VALIDATION_INVALID_RESULT,
                    EI_VALIDATION_PLUG_IN_ERROR,
                ].indexOf(e.name) === -1
            ) {
                newError = error.create({
                    name: EI_VALIDATION_PLUG_IN_ERROR,
                    message: [e.name, e.message].join("\n"),
                    notifyOff: true,
                });
            }

            throw newError;
        }
    }

    /**
     * loadPlugin - This function loads a plugin implementation given its file's path
     * @returns {Object} Plugin implementation
     */
    function loadPlugin(plugInContext) {
        var id = plugInContext.eDocument.scriptId;
        var pluginImplId = plugInContext.eDocument.customPluginImpId;
        var plugin;
        try {
            if (!pluginCache[id]) {
                if (pluginImplId === "") {
                    var scriptFile = file.load({
                        id: id,
                    });
                    require([scriptFile.path], function (module) {
                        pluginCache[id] = module;
                    });
                    plugin = pluginCache[id];
                } else {
                    if (pluginImplId === DEFAULT) {
                        pluginCache[pluginImplId] =
                            pluginImpl.loadImplementation({
                                type: VALIDATION_PLUGIN_DEFAULT,
                            });
                    } else {
                        pluginCache[pluginImplId] =
                            pluginImpl.loadImplementation({
                                type: VALIDATION_PLUGIN_DEFAULT,
                                implementation: pluginImplId,
                            });
                    }
                    plugin = pluginCache[pluginImplId];
                }
            }
        } catch (e) {
            log.error(e.name, e.message);

            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    "E-document Conversion encountered an error while loading a custom plug-in.\n",
                    "Error Code: ",
                    e.name ? e.name : "",
                    "\n Message: ",
                    e.message ? e.message : "",
                ].join(""),
                notifyOff: true,
            };

            throw error.create(errorParams);
        }
        return plugin;
    }
    var pluginCache = {};

    return {
        runPlugin: runPlugin,
    };
});
