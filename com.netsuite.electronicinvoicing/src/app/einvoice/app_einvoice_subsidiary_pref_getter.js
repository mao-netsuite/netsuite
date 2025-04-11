/**
 *@NApiVersion 2.x
 */
define([
    "N/query",
    "N/record",
    "N/search",
    "./../../lib/constants",
    "N/runtime",
], function (query, record, search, constants, runtime) {
    var SUBSIDIARY_PREFERENCES_RECORD = "customrecord_psg_ei_sub_prefs_data";
    var SUBSIDIARY_FIELD = "custrecord_psg_ei_sub_subsidiary";
    var EDOC_AUTOMATION_TYPE_FIELD = "custrecord_psg_ei_sub_edoc_automation";
    var IS_INACTIVE_FIELD = "isinactive";
    var ID_FIELD = "id";
    var PARENT_FIELD = "parent";
    var GET_FIELD_TEXT = true;
    var SUBSIDIARIES = "SUBSIDIARIES";

    /**
     * Returns an object containing field values of respective field IDs passed in fieldScriptIds, for a subsidiaryId.
     * @param {number} subsidiaryId - Internal ID of subsidiary
     * @param {Array.<string>} fieldScriptIds - List of field IDs of custom record whose value should be returned.
     *
     * @returns {Object} subsidiaryPreferencesObj
     */
    function getSubsidiaryPreferencesFieldValues(subsidiaryId, fieldScriptIds) {
        return getSubsidiaryPreferencesData(
            subsidiaryId,
            fieldScriptIds,
            !GET_FIELD_TEXT
        );
    }

    /**
     * Returns an object containing field texts of respective field IDs passed in fieldScriptIds, for a subsidiaryId.
     * @param {number} subsidiaryId - Internal ID of subsidiary
     * @param {Array.<string>} fieldScriptIds - List of field IDs of custom record whose value should be returned.
     *
     * @returns {Object} subsidiaryPreferencesObj
     */
    function getSubsidiaryPreferencesFieldTexts(subsidiaryId, fieldScriptIds) {
        return getSubsidiaryPreferencesData(
            subsidiaryId,
            fieldScriptIds,
            GET_FIELD_TEXT
        );
    }

    /**
     * Returns an object containing field values/texts of respective field IDs passed in fieldScriptIds, for a subsidiaryId.
     * @param {number} subsidiaryId - Internal ID of subsidiary
     * @param {Array.<string>} fieldScriptIds - List of field IDs of custom record whose value should be returned.
     * @param {boolean} getText - If a field text should be returned instead of field value.
     *
     * @returns {Object} subsidiaryPreferencesObj
     */

    function getSubsidiaryPreferencesData(
        subsidiaryId,
        fieldScriptIds,
        getText
    ) {
        var subsidiaryPreferencesObj = {};
        var subsidiaryPreferencesQuery = query.create({
            type: SUBSIDIARY_PREFERENCES_RECORD,
        });
        subsidiaryPreferencesQuery.condition =
            subsidiaryPreferencesQuery.createCondition({
                fieldId: SUBSIDIARY_FIELD,
                operator: query.Operator.EQUAL,
                values: subsidiaryId,
            });
        var preferencesColumns = [];
        for (var i = 0; i < fieldScriptIds.length; i++) {
            var columnParam = {
                fieldId: fieldScriptIds[i],
            };
            if (getText) {
                columnParam.context = query.FieldContext.DISPLAY;
            }
            var currentPreferenceColumn =
                subsidiaryPreferencesQuery.createColumn(columnParam);
            preferencesColumns.push(currentPreferenceColumn);
        }
        subsidiaryPreferencesQuery.columns = preferencesColumns;
        var subsidiaryPreferencesResults =
            subsidiaryPreferencesQuery.run().results;

        //checks subsidiary preference instance present with given subsidiary Id and assigning values to respective fields
        if (
            subsidiaryPreferencesResults &&
            subsidiaryPreferencesResults.length > 0
        ) {
            for (var index = 0; index < fieldScriptIds.length; index++) {
                var fieldScriptId = fieldScriptIds[index];
                subsidiaryPreferencesObj[fieldScriptId] =
                    subsidiaryPreferencesResults[0].values[index];
            }
        } else {
            //if no subsidiary preference instance is present with given subsidiary Id, then create new instance
            createSusidiaryPreferenceRec(subsidiaryId);
        }
        return subsidiaryPreferencesObj;
    }

    /**
     * create new subsidiary preference record based on subsidiary Id if its deleted
     * @param {number} subsidiaryId - Internal ID of subsidiary
     */
    function createSusidiaryPreferenceRec(subsidiaryId) {
        var toCreateEIPref = true;
        var isOW = runtime.isFeatureInEffect(SUBSIDIARIES);
        if (isOW) {
            var subsidiaryObj = search.lookupFields({
                type: search.Type.SUBSIDIARY,
                id: subsidiaryId,
                columns: [IS_INACTIVE_FIELD],
            });
            var isInactive = subsidiaryObj[IS_INACTIVE_FIELD];
            toCreateEIPref = !isInactive;
        }

        //if subsidiary record is active, then only creating new preferences record because for inactive subsidiary it will throw error while creating record
        //or if account is SI and E-Document Subsidiary Preference instance is missing
        if (toCreateEIPref) {
            var eiPrefRec = record.create({
                type: SUBSIDIARY_PREFERENCES_RECORD,
            });
            eiPrefRec.setValue({
                fieldId: SUBSIDIARY_FIELD,
                value: subsidiaryId,
            });
            eiPrefRec.setValue({
                fieldId: EDOC_AUTOMATION_TYPE_FIELD,
                value: constants.EdocAutomationMode.DISABLED,
            });
            eiPrefRec.save();
        }
    }

    /**
     * Returns Parent company ID
     * @returns {number}
     */
    function getParentSubsidiaryId() {
        var isOW = runtime.isFeatureInEffect(SUBSIDIARIES);

        if (!isOW) {
            return 1;
        }
        var parentSubsidiaryId;
        var parentSubsidiaryQuery = query.create({
            type: query.Type.SUBSIDIARY,
        });
        parentSubsidiaryQuery.columns = [
            parentSubsidiaryQuery.createColumn({
                fieldId: ID_FIELD,
            }),
        ];
        parentSubsidiaryQuery.condition = parentSubsidiaryQuery.createCondition(
            {
                fieldId: PARENT_FIELD,
                operator: query.Operator.EMPTY,
            }
        );

        var parentSubsidiaryResults = parentSubsidiaryQuery.run().results[0];
        if (parentSubsidiaryResults && parentSubsidiaryResults.values) {
            parentSubsidiaryId = parseInt(parentSubsidiaryResults.values[0]);
        }

        return parentSubsidiaryId;
    }

    return {
        getSubsidiaryPreferencesFieldValues:
            getSubsidiaryPreferencesFieldValues,
        getSubsidiaryPreferencesFieldTexts: getSubsidiaryPreferencesFieldTexts,
        getParentSubsidiaryId: getParentSubsidiaryId,
    };
});
