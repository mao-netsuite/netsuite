/**
 * @NApiVersion 2.x
 * @NScriptType mapreducescript
 * @NModuleScope public
 */

define([
    "N/search",
    "../../app/einvoice/app_einvoice_ctt_manager",
    "../../app/einvoice/app_einvoice_transaction_type_reg_manager",
    "../../data/dao_deployment",
], function (search, cttManager, transTypMgr, deploymentDao) {
    var SCRIPT_ID_UE_OUTBOUND_TXN = "customscript_edoc_sales_transaction_ue";

    var SCRIPT_ID_CS_OUTBOUND_TXN = "customscript_edoc_sales_transaction_cs";

    function getInputData() {
        var EICTTMAP_REC_TYPE = "customrecord_ei_ctt_map";

        var EICTTMAP_REGISTERED_CTT_FIELD_ID = "custrecord_ei_registered_ctt";

        var cttLookupResult = search.lookupFields({
            type: EICTTMAP_REC_TYPE,

            id: 1,

            columns: EICTTMAP_REGISTERED_CTT_FIELD_ID,
        });

        var cttMultiselectFieldValue =
            cttLookupResult[EICTTMAP_REGISTERED_CTT_FIELD_ID];

        var result = [];

        for (var i = 0; i < cttMultiselectFieldValue.length; i++) {
            result.push(cttMultiselectFieldValue[i].value);
        }

        log.debug("Length: ", result.length);

        if (result.length === 0) {
            log.debug("No CTT found in EICTTMAP");
        }

        return result;
    }

    function map(context) {
        var cttInternalId = JSON.parse(context.value);

        var cttDetails = cttManager.getCTTDetails(cttInternalId).cttDetails;

        if (cttDetails !== "") {
            var name = cttDetails.name;

            log.debug("Custom Transaction present in EICTTMAP: ", name);

            log.debug("Internal Id of CTT in EICTTMAP: ", cttInternalId);
        }

        var cttStringId = cttDetails.stringId;

        createOutboundUeCTTScriptDep(cttStringId);

        createOutboundCsCTTScriptDep(cttStringId);
    }

    function createOutboundUeCTTScriptDep(cttStringId) {
        try {
            var internalIdOfUE = transTypMgr.getInternalIdOfScriptFromStringId(
                SCRIPT_ID_UE_OUTBOUND_TXN,
                search.Type.USEREVENT_SCRIPT
            );

            var rec = deploymentDao.createDeployment(
                cttStringId,
                internalIdOfUE
            );

            log.debug(
                "Internal Id of CTT's Outbound Transaction UE script deployment: ",
                rec.internalIdOfDeployment
            );

            return rec;
        } catch (exp) {
            log.error("Error stack: ", exp.stack);

            log.error(
                "Could not create CTT's outbound Transaction UE script deployment for ".concat(
                    cttStringId
                ),
                exp.message
            );
        }
    }

    function createOutboundCsCTTScriptDep(cttStringId) {
        try {
            var internalIdOfCS = transTypMgr.getInternalIdOfScriptFromStringId(
                SCRIPT_ID_CS_OUTBOUND_TXN,
                search.Type.CLIENT_SCRIPT
            );

            var rec = deploymentDao.createDeployment(
                cttStringId,
                internalIdOfCS
            );

            log.debug(
                "Internal Id of CTT's Outbound Transaction CS script deployment: ",
                rec.internalIdOfDeployment
            );

            return rec;
        } catch (exp) {
            log.error("Error Stack: ", exp.stack);

            log.error(
                "Could not create CTT's outbound Transaction CS script deployment for ".concat(
                    cttStringId
                ),
                exp.message
            );
        }
    }

    return {
        getInputData: getInputData,
        map: map,
    };
});
