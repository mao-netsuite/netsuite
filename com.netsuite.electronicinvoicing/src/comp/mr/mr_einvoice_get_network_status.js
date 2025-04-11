/**
​
 * @NApiVersion 2.x
​
 * @NScriptType mapreducescript
​
 */

define([
    "../../app/einvoice/app_einvoice_network_status_manager",

    "../../app/einvoice/app_einvoice_sending_manager",

    "../../app/einvoice/app_einvoice_transaction_filter_plugin_manager",

    "N/runtime",

    "../../app/einvoice/app_einvoice_notifier",

    "../../app/einvoice/app_einvoice_outbound_certification",

    "N/search",
], function (
    getNetworkStatusManger,
    sendingMgr,
    transactionFilterPluginMgr,
    runtime,
    notifier,
    certification,
    search
) {
    var SCRIPT_PARAM_FILTER_PLUGIN_ID = "custscript_ei_filtertransid";
    var NETWORK_REFERENCE_ID = "custbody_ei_network_id";

    function getInputData() {
        var scriptObj = runtime.getCurrentScript();

        var filterTransactionsPluginId = scriptObj.getParameter({
            name: SCRIPT_PARAM_FILTER_PLUGIN_ID,
        });

        return transactionFilterPluginMgr.runPlugin(filterTransactionsPluginId);
    }

    function map(context) {
        try {
            var contextVal = JSON.parse(context.value);

            var transId = contextVal.id;

            var transType = contextVal.recordType;

            var owner = notifier.getFirstActiveAdmin();

            var transLookup = search.lookupFields({
                type: transType,

                id: transId,

                columns: [NETWORK_REFERENCE_ID],
            });

            try {
                if (transLookup[NETWORK_REFERENCE_ID]) {
                    var transObj = sendingMgr.getOutboundEDocRecord(
                        transId,
                        transType
                    );

                    var certSendingMethodId =
                        certification.getCertSendingMethodId(transObj);

                    getNetworkStatusManger.getNetworkStatus(
                        transId,
                        transType,
                        owner,
                        certSendingMethodId,
                        false
                    );
                }
            } catch (e) {
                log.error("EI_SS_GETNETWORKSTATUS_ERROR", e);
            }
        } catch (ex) {
            log.debug("Error in Map Stage", ex.message);
        }
    }

    return {
        getInputData: getInputData,
        map: map,
    };
});
