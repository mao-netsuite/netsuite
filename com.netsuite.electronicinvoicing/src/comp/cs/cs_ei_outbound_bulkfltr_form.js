/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Outbound Bulk Filter CS
 * @NScriptId _ei_outbound_bulkfltr_form
 * @NScriptType clientscript
 * @NModuleScope Public
 */

define([
    "N/url",
], function (url) {
    var currRecord;
    var EI_PROCESS_RADIO_BUTTON_ID = "custpage_ei_process_radio";
    var SAVED_SEARCH_FIELD_ID = "custpage_outbound_svdsrch";

    var CBVAL = "custpage_selecttxn";
    var SUBLIST_ID = "custpage_sublisteiprocess";

    var SUITELET_SCRIPT_ID = "customscript_ei_outbound_bulkfltrs_su";
    var SUITELET_DEPLOYMENT_ID = "customdeploy_ei_outbound_bulkfltrs_su";

    var savedSearchId;

    function pageInit(context) {
        currRecord = context.currentRecord;

        var params = {};
        var queries = window.location.search.substring(1).split("&");

        for (var i = 0; i < queries.length; i++) {
            var arr = queries[i].split("=");
            params[arr[0]] = arr[1];
        }

        savedSearchId = params.custpage_outbound_savesearchid
            ? params.custpage_outbound_savesearchid
            : "";

        if (savedSearchId !== "") {
            currRecord.setValue({
                fieldId: SAVED_SEARCH_FIELD_ID,
                value: savedSearchId,
                ignoreFieldChange: true,
            });
        }
    }

    function fieldChanged(context) {
        var currRec = context.currentRecord;
        var eiProcessType;
        var urlParameters;

        var params = {};
        var queries = window.location.search.substring(1).split("&");

        for (var i = 0; i < queries.length; i++) {
            var arr = queries[i].split("=");
            params[arr[0]] = arr[1];
        }

        if (context.fieldId === EI_PROCESS_RADIO_BUTTON_ID) {
            eiProcessType = currRec.getValue(EI_PROCESS_RADIO_BUTTON_ID);
            savedSearchId = params.custpage_outbound_savesearchid
                ? params.custpage_outbound_savesearchid
                : "";

            if (savedSearchId !== "") {
                urlParameters = {
                    custpage_outbound_eiProcessType: eiProcessType,
                    custpage_outbound_savesearchid: savedSearchId,
                };
            } else {
                urlParameters = {
                    custpage_outbound_eiProcessType: eiProcessType,
                };
            }

            var urlStringForEIProcessType = url.resolveScript({
                scriptId: SUITELET_SCRIPT_ID,
                deploymentId: SUITELET_DEPLOYMENT_ID,
                params: urlParameters,
            });
            redirectToURL(urlStringForEIProcessType);
        }

        if (context.fieldId === SAVED_SEARCH_FIELD_ID) {
            eiProcessType = currRec.getValue(EI_PROCESS_RADIO_BUTTON_ID);

            savedSearchId = currRec.getValue(SAVED_SEARCH_FIELD_ID);

            if (savedSearchId !== "" && eiProcessType !== "") {
                urlParameters = {
                    custpage_outbound_savesearchid: savedSearchId,
                    custpage_outbound_eiProcessType: eiProcessType,
                };
            } else if (savedSearchId !== "") {
                urlParameters = {
                    custpage_outbound_savesearchid: savedSearchId,
                };
            } else {
                urlParameters = {};
            }

            var urlStringForSavedSearch = url.resolveScript({
                scriptId: SUITELET_SCRIPT_ID,
                deploymentId: SUITELET_DEPLOYMENT_ID,
                params: urlParameters,
            });

            redirectToURL(urlStringForSavedSearch);
        }
    }

    function redirectToURL(redirectUrl) {
        try {
            NS.form.setChanged(false);
        } catch (ex) {
            console.log(ex.name, ex.message + " " + ex.stack);
        }

        window.location.href = redirectUrl;
    }

    function markAll() {
        for (
            var i = 0;
            i < currRecord.getLineCount({ sublistId: SUBLIST_ID });
            i++
        ) {
            currRecord.selectLine({
                sublistId: SUBLIST_ID,
                line: i,
            });

            currRecord.setCurrentSublistValue({
                sublistId: SUBLIST_ID,
                fieldId: CBVAL,
                value: true,
            });

            currRecord.commitLine({ sublistId: SUBLIST_ID });
        }
    }

    function unmarkAll() {
        for (
            var i = 0;
            i < currRecord.getLineCount({ sublistId: SUBLIST_ID });
            i++
        ) {
            currRecord.selectLine({
                sublistId: SUBLIST_ID,
                line: i,
            });

            currRecord.setCurrentSublistValue({
                sublistId: SUBLIST_ID,
                fieldId: CBVAL,
                value: false,
            });

            currRecord.commitLine({ sublistId: SUBLIST_ID });
        }
    }

    return {
        pageInit: pageInit,

        fieldChanged: fieldChanged,

        markAll: markAll,

        unmarkAll: unmarkAll,
    };
});
