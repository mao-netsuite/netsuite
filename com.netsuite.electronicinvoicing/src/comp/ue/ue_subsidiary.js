/**
 *
 * @NApiVersion 2.1
 * @NScriptName E-Document Subsidiary UE
 * @NScriptId _edoc_ue_subsidiary
 * @NScriptType usereventscript
 */

define(["N/record", "N/query", "../../lib/constants"], function (record, query, constants) {
    const IS_INACTIVE_FLD = "isinactive";
    const SUBSIDIARY_PREF_REC_TYPE = "customrecord_psg_ei_sub_prefs_data";
    const ID_FLD = "id";
    const SUBSIDIARY_INTERNAL_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
    const E_DOCUMENT_AUTOMATION_TYPE_FLD =
        "custrecord_psg_ei_sub_edoc_automation";

    function afterSubmit(context) {
        try {
            const newRecord = context.newRecord;
            const oldRecord = context.oldRecord;

            const oldInactiveFldValue = oldRecord?.getValue(IS_INACTIVE_FLD);
            const newInactiveFldValue = newRecord.getValue(IS_INACTIVE_FLD);
            const subsidiaryId = newRecord.getValue(ID_FLD);
            const prefInstanceId = fetchPrefInstance(subsidiaryId);
            log.debug("prefInstanceId", prefInstanceId);
            if (!(prefInstanceId || newInactiveFldValue)) {
                initPrefInstance(subsidiaryId);
            } else if (prefInstanceId && oldInactiveFldValue !== newInactiveFldValue) {
                updatePrefInactiveStatus(prefInstanceId, newInactiveFldValue);
            }
        } catch (e) {
            log.error("Error in beforeLoad subsidiary", e);
        }
    }

    /**
     * Returns pref instance ID matching with the subsidiaryId passed as parameter
     * @param subsidiaryId
     */
    function fetchPrefInstance(subsidiaryId) {
        const instanceQuery = query.create({
            type: SUBSIDIARY_PREF_REC_TYPE,
        });
        instanceQuery.columns = [
            instanceQuery.createColumn({
                fieldId: ID_FLD,
            }),
        ];
        instanceQuery.condition = instanceQuery.createCondition({
            fieldId: SUBSIDIARY_INTERNAL_ID_FLD,
            operator: query.Operator.ANY_OF,
            values: [subsidiaryId],
        });
        const instanceQueryResultSet = instanceQuery.run().results;

        return (
            instanceQueryResultSet &&
            instanceQueryResultSet[0]?.values &&
            instanceQueryResultSet[0].values[0]
        );
    }

    /**
     * Updates the inactive status of the "prefInstance" to "newStatus" based on the parameters sent
     * @param prefInstanceId
     * @param newStatus
     */
    function updatePrefInactiveStatus(prefInstanceId, newStatus) {
        const prefInstanceFieldsForUpdate = {};
        prefInstanceFieldsForUpdate[IS_INACTIVE_FLD] = newStatus;

        record.submitFields({
            type: SUBSIDIARY_PREF_REC_TYPE,
            id: prefInstanceId,
            values: prefInstanceFieldsForUpdate,
        });
    }

    /**
     * Creates a Subsidiary Preference Instance with default values for the subsidiaryId passed
     * @param subsidiaryId
     */
    function initPrefInstance(subsidiaryId) {
        const newPrefInstance = record.create({
            type: SUBSIDIARY_PREF_REC_TYPE,
        });

        newPrefInstance.setValue({
            fieldId: SUBSIDIARY_INTERNAL_ID_FLD,
            value: subsidiaryId,
        });
        newPrefInstance.setValue({
            fieldId: E_DOCUMENT_AUTOMATION_TYPE_FLD,
            value: constants.EdocAutomationMode.DISABLED,
        });

        newPrefInstance.save();
    }

    return {
        afterSubmit,
    };
});
