/**
 * @NApiVersion 2.1
 * @NScriptType mapreducescript
 */
/**
 * This MR executes on Bundle Update through the bundle installation script bi_ei_init.js
 */
define(["N/record", "N/query", "N/search"], function (record, query, search) {
    const BYPASS_PO_VALIDATION = "custrecord_psg_ei_bypass_po_valid";
    const SUBSIDIARY_PREF_REC_TYPE = "customrecord_psg_ei_sub_prefs_data";
    const ID_FLD = "id";

    function getInputData() {
        try {
            let subsPrefRecs = [];

            const subsPrefQuery = query.create({
                type: SUBSIDIARY_PREF_REC_TYPE,
            });

            subsPrefQuery.columns = [
                subsPrefQuery.createColumn({
                    fieldId: ID_FLD,
                }),
            ];

            subsPrefQuery
                .run()
                .iterator()
                .each((result) => {
                    const subPrefInternalId = result.value.values[0];

                    if (subPrefInternalId) {
                        subsPrefRecs.push({
                            subPrefInternalId,
                        });
                    }
                    return true;
                });
            return subsPrefRecs;
        } catch (e) {
            log.error("ERROR - getInputData()", e);
        }
    }

    function map(context) {
        log.debug("INFO - map() context", context.value);
        try {
            const subPrefRes = JSON.parse(context.value);
            const subPrefId = subPrefRes["subPrefInternalId"];
            const INT_ID_OF_NO = "1"; // Internal ID of the value "No" set int he custom list used in the field "BYPASS PO# VALIDATION IN INBOUND CONVERSION"
            let bypassPOValidLookUp = search.lookupFields({
                type: SUBSIDIARY_PREF_REC_TYPE,
                id: subPrefId,
                columns: [BYPASS_PO_VALIDATION],
            });
            let bypassPOValidVal;
            if(bypassPOValidLookUp[BYPASS_PO_VALIDATION].length > 0) {
                bypassPOValidVal = bypassPOValidLookUp[BYPASS_PO_VALIDATION][0].value;
            }
            // If no value of set for the Field "BYPASS PO# VALIDATION IN INBOUND CONVERSION" then set the value "No" in this field
            if (!bypassPOValidVal) {
                record.submitFields({
                    type: SUBSIDIARY_PREF_REC_TYPE,
                    id: subPrefId,
                    values: {
                        custrecord_psg_ei_bypass_po_valid: INT_ID_OF_NO,
                    },
                });
            }
        } catch (e) {
            log.error("ERROR - map()", e);
        }
    }

    function summarize() {
        log.debug("INFO - summarize()", "MR Execution Completed");
    }

    return {
        getInputData,
        map,
        summarize,
    };
});
