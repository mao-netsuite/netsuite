/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       06 Jan 2023     prasannanjaneyulu.ga
 *
 */
define([
    "../audit/app_audit_manager",
    "N/search",
    "./app_einvoice_network_status_plugin_manager",
], function (auditManager, search, pluginMgr) {
    var SENDING_METHOD = "custbody_psg_ei_sending_method";
    var SENDING_METHOD_REC = "customrecord_ei_sending_method";
    var IMPLEMENTATION_REC = "custrecord_ei_sending_plugin_impl";
    var PLUGIN_SCRIPT = SENDING_METHOD + ".custrecord_ei_sending_method_script";
    var PLUGIN_IMPLEMENTATION =
        SENDING_METHOD + ".custrecord_ei_sending_plugin_impl";
    var ENTITY = "entity";
    var TRANID = "tranid";
    var TYPE = "type";
    var STATUS = "custbody_psg_ei_status";
    var SENT_STATUS = "7";

    /**
     * getNetworkStatus - This function gets the latest network status of E-Document.
     * @param transId {String/Number} - transaction Id
     * @param transType {String/Number} - transaction Type
     * @param batchOwner {String/Number} - User ID (employee)
     * @param certSendingMethod {String/Number} - internal ID of certification E-Document Sending Method record
     */
    function getNetworkStatus(
        transId,
        transType,
        batchOwner,
        certSendingMethodId,
        createAuditTrail
    ) {
        var resultDetails = {
            success: true,
            message: "",
            errorCode: "",
        };
        var errorDetails = "";
        var entityId = "";
        try {
            var tranColumns = [
                ENTITY,
                TRANID,
                TYPE,
                PLUGIN_IMPLEMENTATION,
                PLUGIN_SCRIPT,
                SENDING_METHOD,
                STATUS,
            ];
            var tranDetails = search.lookupFields({
                type: transType,
                id: transId,
                columns: tranColumns,
            });
            var scriptId = tranDetails[PLUGIN_SCRIPT][0]
                ? tranDetails[PLUGIN_SCRIPT][0].value
                : 0;
            var transTypeText = tranDetails.type[0].text;
            var currStatus = tranDetails[STATUS][0].value;
            var sendMethodId;
            var certificationActive =
                isCertificationActive(certSendingMethodId);
            if (currStatus === SENT_STATUS) {
                sendMethodId = tranDetails[SENDING_METHOD][0]
                    ? tranDetails[SENDING_METHOD][0].value
                    : null;
            } else {
                if (certificationActive) {
                    sendMethodId = certSendingMethodId;
                } else {
                    sendMethodId = tranDetails[SENDING_METHOD][0]
                        ? tranDetails[SENDING_METHOD][0].value
                        : null;
                }
            }
            var pluginImplementationId = tranDetails[PLUGIN_IMPLEMENTATION];
            if (certificationActive) {
                var sendingMethodRec = search.lookupFields({
                    type: SENDING_METHOD_REC,
                    id: sendMethodId,
                    columns: [IMPLEMENTATION_REC],
                });
                pluginImplementationId = sendingMethodRec[IMPLEMENTATION_REC];
            }
            if (
                tranDetails.entity !== null &&
                tranDetails.entity[0] !== null &&
                typeof tranDetails.entity[0] !== "undefined"
            ) {
                entityId = tranDetails.entity[0].value;
            }
            var networkStatusPlugInContext = {
                scriptId: scriptId,
                customPluginImpId: pluginImplementationId,
                batchOwner: batchOwner,
                networkStatusCall: true,
                customer: {
                    id: entityId,
                },
                transaction: {
                    id: transId,
                    type: transTypeText,
                    tranType: transType,
                    eDocStatus: currStatus,
                    isCertificationEnable: certificationActive,
                },
            };
            Object.seal(networkStatusPlugInContext);
            pluginMgr.runGetNetworkStatusPlugin(
                networkStatusPlugInContext,
                createAuditTrail
            );
        } catch (e) {
            log.error(e.name, e.message);
            if (e.name !== "") {
                if (e.name === "SSS_METHOD_NOT_IMPLEMENTED") {
                    resultDetails.errorCode = e.name;
                }
                errorDetails = e.name + ": " + e.message;
            } else {
                errorDetails = e.message;
            }
            resultDetails.success = false;
            resultDetails.message = errorDetails;
        }
        if (!resultDetails.success && createAuditTrail) {
            auditManager.logNetworkStatus({
                transaction: transId,
                entity: entityId,
                owner: batchOwner,
                details: errorDetails,
            });
        }
        return resultDetails;
    }

    function isCertificationActive(certSendingMethod) {
        return (
            certSendingMethod !== "" &&
            certSendingMethod !== "undefined" &&
            typeof certSendingMethod !== "undefined"
        );
    }

    return {
        getNetworkStatus: getNetworkStatus,
    };
});
