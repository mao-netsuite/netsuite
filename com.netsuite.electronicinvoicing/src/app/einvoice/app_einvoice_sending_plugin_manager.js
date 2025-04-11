/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Nov 2015     aalcabasa
 *
 */
define([
    "N/error",
    "N/file",
    "require",
    "N/plugin",
    "../../../apis/manage_status_audit_trail",
    "N/record",
    "../audit/app_audit_manager",
    "../../lib/translator",
    "./app_einvoice_obn_caller"
], function (
    error,
    file,
    require,
    pluginImpl,
    manageAudit,
    record,
    auditManager,
    translator,
    obnCaller
) {
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";
    var EI_SENDING_PLUG_IN_ERROR = "EI_SENDING_PLUG_IN_ERROR";
    var EI_SEND_INVALID_RESULT = "EI_SEND_INVALID_RESULT";
    var SENDING_PLUGIN_DEFAULT = "customscript_ei_pl_sending_plugin";
    var DEFAULT = "Default";

    /**
     * runPlugin - This function loads a plugin implementation given its file's path
     *
     * @param {Object} plugInContext
     * @param {String} plugInContext.scriptId
     * @param {String} plugInContext.sendMethodId
     * @param {String} plugInContext.customPluginImpId
     * @param {String} plugInContext.eInvoiceContent
     * @param {Object} plugInContext.customer
     * @param {String} plugInContext.customer.id
     * @param {Array}  plugInContext.customer.recipients
     * @param {Object} plugInContext.transaction
     * @param {String} plugInContext.transaction.number
     * @param {String} plugInContext.transaction.id
     * @param {String} plugInContext.transaction.poNum
     * @param {Object} plugInContext.sender
     * @param {String} plugInContext.sender.id
     * @param {String} plugInContext.sender.name
     * @param {String} plugInContext.sender.email
     * @param {Boolean} containsNetworkFields
     *
     * @returns {Object} result
     * @returns {Boolean} result.success: determines
     * @returns {String} result.message: a failure message
     */
    function runPlugin(plugInContext, containsNetworkFields) {
        try {
            var result = null;
            if (plugInContext.isAvalara) {
                result = obnCaller.sendToOBN(plugInContext);
            } else {
                var plugin = loadPlugin(plugInContext);
                result = plugin.send(plugInContext);
            }
            if (
                containsNetworkFields &&
                result &&
                result.success &&
                result.networkStatus
            ) {
                updateNetworkFields(plugInContext, result);
            }
            if ("eiStatus" in result) {
                var eiStatus = result.eiStatus;
                if (eiStatus.owner === -4) {
                    eiStatus.owner = plugInContext.batchOwner;
                }
                manageAudit.insertAuditTrail(result.eiStatus);
            }
            if (!result) {
                throw error.create({
                    name: EI_SEND_INVALID_RESULT,
                    message: "The plug-in failed to return a valid result.",
                    notifyOff: true,
                });
            } else if (!result.success) {
                throw error.create({
                    name: EI_SENDING_PLUG_IN_ERROR,
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
                    EI_SEND_INVALID_RESULT,
                    EI_SENDING_PLUG_IN_ERROR,
                ].indexOf(e.name) === -1
            ) {
                newError = error.create({
                    name: EI_SENDING_PLUG_IN_ERROR,
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
        var plugin;
        var scriptId = plugInContext.scriptId;
        var pluginImplId = plugInContext.customPluginImpId;
        try {
            if (!pluginCache[scriptId] || !pluginCache[scriptId].length) {
                if (pluginImplId === "") {
                    var scriptFile = file.load({
                        id: scriptId,
                    });
                    require([scriptFile.path], function (module) {
                        pluginCache[scriptId] = module;
                    });
                    plugin = pluginCache[scriptId];
                } else {
                    if (pluginImplId === DEFAULT) {
                        pluginCache[pluginImplId] =
                            pluginImpl.loadImplementation({
                                type: SENDING_PLUGIN_DEFAULT,
                            });
                    } else {
                        pluginCache[pluginImplId] =
                            pluginImpl.loadImplementation({
                                type: SENDING_PLUGIN_DEFAULT,
                                implementation: pluginImplId,
                            });
                    }
                    plugin = pluginCache[pluginImplId];
                }
            }
        } catch (e) {
            log.error(e.name, e.message);
            var loadingPluginErrorMessage = "";
            if (plugInContext.networkStatusCall) {
                loadingPluginErrorMessage =
                    translator.getString(
                        "transaction.msg.network.status.load.plugin.error"
                    ) + "\n";
            } else {
                loadingPluginErrorMessage =
                    translator.getString(
                        "transaction.msg.sent.load.plugin.error"
                    ) + "\n";
            }
            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    loadingPluginErrorMessage,
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

    /**
     * updateNetworkFields -  This function updates the network fields.
     * @param plugInContext
     * @param {Object} plugInContext.transaction
     * @param {String} plugInContext.transaction.id
     * @param {String} plugInContext.transaction.type
     * @param {Object} plugInContext.customer
     * @param {String} plugInContext.customer.id
     * @param {String} plugInContext.batchOwner
     */
    function updateNetworkFields(plugInContext, result) {
        try {
            record.submitFields({
                type: plugInContext.transaction.tranType,
                id: plugInContext.transaction.id,
                values: {
                    custbody_ei_network_id: result.networkStatus.referenceId,
                    custbody_ei_network_name: result.networkStatus.name,
                    custbody_ei_network_status: result.networkStatus.status,
                    custbody_ei_network_updated_date_time:
                        result.networkStatus.updateDateTime,
                },
            });
        } catch (e) {
            auditManager.logNetworkStatus({
                transaction: plugInContext.transaction.id,
                entity: plugInContext.customer.id,
                owner: plugInContext.batchOwner,
                details: [e.name, e.message].join("\n"),
            });
        }
    }

    var pluginCache = {};

    return {
        runPlugin: runPlugin,
        loadPlugin: loadPlugin,
    };
});
