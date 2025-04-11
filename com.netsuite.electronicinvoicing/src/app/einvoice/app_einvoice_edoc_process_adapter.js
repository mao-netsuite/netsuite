/**
 *@NApiVersion 2.x
 */
define([
    "N/search",
    "./../../lib/constants",
    "N/runtime",
    "./app_einvoice_edoc_service",
    "./app_einvoice_subsidiary_pref_getter",
], function (search, constants, runtime, EdocService, subsidiaryPrefGetter) {
    var SCRIPT_ID_GEN_SU = "customscript_ei_generation_service_su";
    var DEPLOYMENT_ID_GEN_SU = "customdeploy_ei_generation_service_su";
    var SCRIPT_ID_SEND_SU = "customscript_su_send_e_invoice";
    var DEPLOYMENT_ID_SEND_SU = "customdeploy_su_send_e_invoice";
    var SUBSIDIARY_PREFS_AUTOMATION_TYPE_FIELD =
        "custrecord_psg_ei_sub_edoc_automation";

    function ProcessAdapter(context) {
        this.processSuiteletMap = getProcessSuiteletMap();
        var subsidiaryId = getSubsidiaryOfTransaction(
            context.transId,
            context.transType
        );
        var subsidiaryFieldScriptIds = [SUBSIDIARY_PREFS_AUTOMATION_TYPE_FIELD];
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                subsidiaryId,
                subsidiaryFieldScriptIds
            );
        this.processType =
            subsidiaryPreferencesObj[SUBSIDIARY_PREFS_AUTOMATION_TYPE_FIELD];

        this.suiteletServiceDetails = this.processSuiteletMap[this.processType];
        this.suiteletServiceDetails.forEach(function (suitletCallDetail) {
            suitletCallDetail.bodyParams = {
                transId: context.transId,
                transType: context.transType,
                certSendingMethodId: context.certSendingMethodId,
                userId: context.userId,
                locale: context.locale,
            };
        });
        this.getProcessType = function () {
            return this.processType;
        };
        this.getSuiteletServiceDetails = function () {
            return this.suiteletServiceDetails;
        };
        function getSubsidiaryOfTransaction(recId, recType) {
            var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
            if (!isOW) {
                return "1"; //parent subsidiary in SI account.
            }
            var params = {
                type: recType,
                id: recId,
                columns: ["subsidiary"],
            };
            var lookUpValues = search.lookupFields(params);
            return lookUpValues["subsidiary"][0].value;
        }

        function getProcessSuiteletMap() {
            return {
                1: undefined,
                2: [
                    new EdocService(
                        SCRIPT_ID_GEN_SU,
                        DEPLOYMENT_ID_GEN_SU,
                        constants.EDOC_PROCESS.GENERATION
                    ),
                    new EdocService(
                        SCRIPT_ID_SEND_SU,
                        DEPLOYMENT_ID_SEND_SU,
                        constants.EDOC_PROCESS.CERTIFICATION
                    ),
                    new EdocService(
                        SCRIPT_ID_SEND_SU,
                        DEPLOYMENT_ID_SEND_SU,
                        constants.EDOC_PROCESS.SENDING
                    ),
                ],
                3: [
                    new EdocService(
                        SCRIPT_ID_GEN_SU,
                        DEPLOYMENT_ID_GEN_SU,
                        constants.EDOC_PROCESS.GENERATION
                    ),
                    new EdocService(
                        SCRIPT_ID_SEND_SU,
                        DEPLOYMENT_ID_SEND_SU,
                        constants.EDOC_PROCESS.CERTIFICATION
                    ),
                ],
                4: [
                    new EdocService(
                        SCRIPT_ID_SEND_SU,
                        DEPLOYMENT_ID_SEND_SU,
                        constants.EDOC_PROCESS.CERTIFICATION
                    ),
                    new EdocService(
                        SCRIPT_ID_SEND_SU,
                        DEPLOYMENT_ID_SEND_SU,
                        constants.EDOC_PROCESS.SENDING
                    ),
                ],
            };
        }
    }
    return ProcessAdapter;
});
