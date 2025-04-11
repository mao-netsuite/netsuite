/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       06 Jan 2023     prasannanjaneyulu.ga
 *
 */
define([
    "N/error",
    "N/record",
    "../audit/app_audit_manager",
    "./app_einvoice_sending_plugin_manager",
], function (error, record, auditManager, pluginMgr) {
    var PROBLEM_LOADING_PLUG_IN = "PROBLEM_LOADING_PLUG_IN";
    var EI_GET_NETWORK_PLUG_IN_ERROR = "EI_GET_NETWORK_PLUG_IN_ERROR";
    var EI_GET_NETWORK_INVALID_RESULT = "EI_GET_NETWORK_INVALID_RESULT";
    var SENT_STATUS = "7";

    /**
     * runGetNetworkStatusPlugin - This function loads a plugin implementation of get network status
     *
     * @param {Object} plugInContext
     * @param {String} plugInContext.scriptId
     * @param {String} plugInContext.customPluginImpId
     * @param {String} plugInContext.batchOwner
     * @param {String} plugInContext.networkStatusCall
     * @param {Object} plugInContext.customer
     * @param {String} plugInContext.customer.id
     * @param {Object} plugInContext.transaction
     * @param {String} plugInContext.transaction.id
     * @param {String} plugInContext.transaction.type
     * @param {String} plugInContext.transaction.tranType
     * @param {String} plugInContext.transaction.eDocStatus
     * @param {String} plugInContext.transaction.isCertificationEnable
     */
    function runGetNetworkStatusPlugin(plugInContext, createAuditTrail) {
        try {
            var plugin = pluginMgr.loadPlugin(plugInContext);
            var networkStatusPlugInContext = {
                transaction: {
                    id: plugInContext.transaction.id,
                    type: plugInContext.transaction.tranType,
                },
            };
            var result = plugin.getStatus(networkStatusPlugInContext);
            if (!result) {
                throw error.create({
                    name: EI_GET_NETWORK_INVALID_RESULT,
                    message: "The plug-in failed to return a valid result.",
                    notifyOff: true,
                });
            } else if (!result.success) {
                throw error.create({
                    name: EI_GET_NETWORK_PLUG_IN_ERROR,
                    message: result.message,
                    notifyOff: true,
                });
            } else if (result.success) {
                if (result.networkStatus) {
                    record.submitFields({
                        type: plugInContext.transaction.tranType,
                        id: plugInContext.transaction.id,
                        values: {
                            custbody_ei_network_status:
                                result.networkStatus.status,
                            custbody_ei_network_updated_date_time:
                                result.networkStatus.updateDateTime,
                        },
                    });
                }
                if (createAuditTrail) {
                    auditManager.logNetworkStatus({
                        transaction: plugInContext.transaction.id,
                        entity: plugInContext.customer.id,
                        owner: plugInContext.batchOwner,
                        details: result.message,
                    });
                }
                return result;
            }
        } catch (e) {
            var newError = e;
            if (
                e.name === "SSS_METHOD_NOT_IMPLEMENTED" &&
                plugInContext.transaction.isCertificationEnable &&
                plugInContext.transaction.eDocStatus === SENT_STATUS
            ) {
                newError = error.create({
                    name: e.name,
                    message: [e.name, e.message].join("\n"),
                    notifyOff: true,
                });
            } else if (
                [
                    PROBLEM_LOADING_PLUG_IN,
                    EI_GET_NETWORK_INVALID_RESULT,
                    EI_GET_NETWORK_PLUG_IN_ERROR,
                ].indexOf(e.name) === -1
            ) {
                newError = error.create({
                    name: EI_GET_NETWORK_PLUG_IN_ERROR,
                    message: [e.name, e.message].join("\n"),
                    notifyOff: true,
                });
            }
            throw newError;
        }
    }

    return {
        runGetNetworkStatusPlugin: runGetNetworkStatusPlugin,
    };
});
