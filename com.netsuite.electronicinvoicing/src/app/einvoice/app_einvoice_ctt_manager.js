/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    "N/search", 
    "N/query", 
    "N/runtime", 
    "../../lib/constants/main_constants",
], function (search, query, runtime, mainConstants) {
    var ERROR_MSG_CTT_NOT_FOUND =
        "The Transaction Type does not exist in the account.";
    var ERROR_MSG_ERROR_DURING_SEARCH =
        "An error occurred during search on CTT.";

    function isNumeric(num) {
        return !isNaN(num);
    }

    function getStringIdOfCTTFromInternalId(cttInternalID) {
        if (!cttInternalID) return;
        var result = getCTTDetails(cttInternalID);
        return result.cttDetails.stringId;
    }

    function getInternalIdOfCTTFromStringId(cttStringID) {
        if (!cttStringID) return;
        var result = getCTTDetails(cttStringID);
        return result.cttDetails.internalId;
    }

    function getCTTDetails(tranTypeId) {
        var response = {
            success: false,
            message: "",
            cttDetails: {},
        };

        if (!tranTypeId) {
            response.message = "Invalid Transaction Type ID.";
            response.success = false;
            return response;
        }

        if (!isCustomTransactionFeatureEnabled()) {
            response.message = "Custom Transactions feature should be enabled.";
            response.success = false;
            return response;
        }

        var inputField;
        var operator;
        if (isNumeric(tranTypeId)) {
            inputField = "id";
            operator = query.Operator.EQUAL;
        } else {
            inputField = "scriptid";
            operator = query.Operator.IS;
        }

        try {
            var cttDefinitionQuery = query.create({
                type: query.Type.CUSTOM_TRANSACTION_TYPE,
            });

            cttDefinitionQuery.condition = cttDefinitionQuery.createCondition({
                fieldId: inputField,
                operator: operator,
                values: tranTypeId,
            });

            cttDefinitionQuery.columns = [
                cttDefinitionQuery.createColumn({
                    fieldId: "name",
                }),
                cttDefinitionQuery.createColumn({
                    fieldId: "id",
                }),
                cttDefinitionQuery.createColumn({
                    fieldId: "scriptid",
                }),
            ];

            var resultSet = cttDefinitionQuery.run();
            var results = resultSet.results;

            if (results.length !== 0) {
                response.success = true;
                response.message = "Found CTT Details";

                for (var i = results.length - 1; i >= 0; i--) {
                    log.debug(
                        "EICTTMAN",
                        "Result of search on CTT: " + results[i].values
                    );
                    response.cttDetails.name = results[i].values[0];
                    response.cttDetails.internalId = results[i].values[1];
                    response.cttDetails.stringId = results[i].values[2];
                }
            } else {
                response.success = false;
                response.message = ERROR_MSG_CTT_NOT_FOUND;
            }
        } catch (e) {
            log.error(e.name, e.message + e.stack);
            response.success = false;
            response.message =
                ERROR_MSG_ERROR_DURING_SEARCH +
                " Details: " +
                e.name +
                ". " +
                e.message;
        }

        return response;
    }
    
    /**
     * 
     * @param {String} transType record id of the transaction
     * @returns transaction style of the record
     */
    function getCTTTransStyle(transType) {
        var transStyle = null;
        if (!isCustomTransactionFeatureEnabled()) {
            return transStyle;
        }
        var cttQuery = query.create({
            type: query.Type.CUSTOM_TRANSACTION_TYPE,
        });
        var transactionTypeCondition = cttQuery.createCondition({
            fieldId: mainConstants.CORE_FIELDS.SCRIPT_ID,
            operator: query.Operator.IS,
            values: transType,
        });
        cttQuery.condition = cttQuery.and(transactionTypeCondition);
        cttQuery.columns = [
            cttQuery.createColumn({
                fieldId: mainConstants.CORE_FIELDS.TRANSACTION_STYLE,
                context: query.FieldContext.RAW,
            }),
        ];

        var result = cttQuery.run().asMappedResults();
        if (result.length == 1) {
            transStyle = result[0].transactionstyle;
        }
        return transStyle;
    }

    function isCustomTransactionFeatureEnabled() {
        return runtime.isFeatureInEffect("CUSTOMTRANSACTIONS");
    }

    // returns an array of EI-Registered CTT IDs e.g. ["114","117","119","120","121","115","112"]
    function getRegisteredCTTIntIdArray() {
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

        log.debug("EICTTMAN", "IDs in EICTTMAP: " + JSON.stringify(result));

        return result;
    }

    return {
        getRegisteredCTTIntIdArray: getRegisteredCTTIntIdArray,
        getCTTDetails: getCTTDetails,
        getStringIdOfCTTFromInternalId: getStringIdOfCTTFromInternalId,
        getInternalIdOfCTTFromStringId: getInternalIdOfCTTFromStringId,
        isCustomTransactionFeatureEnabled: isCustomTransactionFeatureEnabled,
        getCTTTransStyle: getCTTTransStyle
    };
});
