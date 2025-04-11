/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    "N/search",
    "N/config",
    "N/error",
    "N/record",
    "../../data/dao_deployment",
    "../../data/dao_transaction_body_field",
    "./app_einvoice_ctt_manager",
    "N/query",
], function (
    search,
    config,
    error,
    record,
    deploymentDao,
    transactionBodyFieldDao,
    cttManager,
    query
) {
    var SCRIPT_ID_UE_OUTBOUND_TXN = "customscript_edoc_sales_transaction_ue";
    var SCRIPT_ID_CS_OUTBOUND_TXN = "customscript_edoc_sales_transaction_cs";
    var EICTTMAP_RECORD_TYPE_ID = "customrecord_ei_ctt_map";

    function updateRegistration(params) {
        try {
            var result = {
                success: false,
                message: "Registration process not initiated.",
            };
            log.debug("params", JSON.stringify(params));

            if (!params) {
                result.success = false;
                result.errorDetails = {
                    code: "EICTTREGMAN_EMPTY_PARAMS",
                    message: "Request Parameters cannot be empty",
                };
                return result;
            }

            var ttDetailsResponse = cttManager.getCTTDetails(params.tranTypeId);
            if (!ttDetailsResponse.success) {
                log.error(
                    "EICTTREGMAN_ERROR",
                    "CTT " +
                        params.tranTypeId +
                        " not found. " +
                        ttDetailsResponse.message
                );
                result.success = false;
                result.errorDetails = {
                    code: "EICTTREGMAN_CTT_DETAILS_ERROR",
                    message: ttDetailsResponse.message,
                };
                return result;
            }

            log.debug(
                "EICTTREGMAN",
                "Found the details of transaction type " +
                    params.tranTypeId +
                    ": " +
                    JSON.stringify(ttDetailsResponse.cttDetails)
            );
            params.cttDetails = ttDetailsResponse.cttDetails;
            result = updateComponents(params);
            return result;
        } catch (e) {
            log.error(e.name, e.message + " " + e.stack);
            return {
                success: false,
                errorDetails: {
                    code: "EICTTREGMAN_UNEXPECTED_ERROR",
                    message: e.name + " " + e.message + " " + e.stack,
                },
            };
        }
    }

    function updateComponents(params) {
        var result = {
            success: false,
            message: "Registration process not initiated.",
        };

        var resultDeploymentUpdate = updateEIDeployments(
            params.cttDetails.stringId,
            params.isDeregister
        );

        if (!resultDeploymentUpdate.success) {
            return {
                success: false,
                errorDetails: {
                    code: "EICTTREGMAN_ERROR_DEPLOYMENT_UPDATE",
                    message:
                        "Error during deployment update: " +
                        resultDeploymentUpdate.message,
                },
            };
        }

        var resultTBFUpdate = updateAllEIOutboundTBF(
            params.cttDetails.internalId,
            params.isDeregister
        );

        if (!resultTBFUpdate.success) {
            return {
                success: false,
                errorDetails: {
                    code: "EICTTREGMAN_TBF_UPDATE_ERROR",
                    message:
                        "Error during TBF update: " + resultTBFUpdate.message,
                },
            };
        }

        var resultEITTMAPUpdate = updateEITTMAP(
            params.cttDetails.internalId,
            params.isDeregister
        );
        log.debug(
            "EICTTREGMAN",
            "Final result of EICTTMAP update: " + resultEITTMAPUpdate.message
        );

        if (!resultEITTMAPUpdate.success) {
            return {
                success: false,
                errorDetails: {
                    code: "EICTTREGMAN_EICTTMAP_UPDATE_ERROR",
                    message:
                        "Error during EICTTMAP update: " +
                        resultEITTMAPUpdate.message,
                },
            };
        }

        result.success = true;
        result.message =
            resultDeploymentUpdate.message +
            " " +
            resultTBFUpdate.message +
            " " +
            resultEITTMAPUpdate.message;
        return result;
    }

    function getScriptFilters(scriptIdString) {
        var filters = [];
        filters.push(["scriptid", search.Operator.IS, scriptIdString]);
        return filters;
    }

    function getInternalIdOfScriptFromStringId(scriptIdString, searchType) {
        var scriptRecord = {};

        try {
            var scriptSearch = search.create({
                type: searchType,
                columns: ["internalid"],
                filters: getScriptFilters(scriptIdString),
            });

            var resultSet = scriptSearch.run();
            var result1 = resultSet.getRange({
                start: 0,
                end: 1,
            });
            scriptRecord.id = result1[0].getValue("internalid");
        } catch (e) {
            log.error(e.name, e.message + ". " + e.stack);
        }
        log.debug(
            "EICTTREGMAN",
            "Internal ID of " + scriptIdString + ": " + scriptRecord.id
        );

        if (!scriptRecord.id) {
            var errorParams = {
                name: "EICTTREGMAN_ERROR",
                message:
                    "Script Deployment record " +
                    scriptIdString +
                    " not found.",
            };
            throw error.create(errorParams);
        }

        return scriptRecord.id;
    }

    function updateEIDeployments(transactionTypeIdString, isDeregister) {
        try {
            var internalIdOfUE = getInternalIdOfScriptFromStringId(
                SCRIPT_ID_UE_OUTBOUND_TXN,
                search.Type.USEREVENT_SCRIPT
            );

            var responseCSUpdate = {
                success: false,
                message: "CS Deployment update not initiated.",
            };

            var resultUEUpdate;

            if (isDeregister) {
                resultUEUpdate = deploymentDao.deleteDeployment(
                    transactionTypeIdString,
                    internalIdOfUE
                );
            } else {
                resultUEUpdate = deploymentDao.createDeployment(
                    transactionTypeIdString,
                    internalIdOfUE
                );
            }
            log.debug("EICTTREGMAN", resultUEUpdate.message);

            if (resultUEUpdate.success === true) {
                //updating CS Deployment
                var internalIdOfCS = getInternalIdOfScriptFromStringId(
                    SCRIPT_ID_CS_OUTBOUND_TXN,
                    search.Type.CLIENT_SCRIPT
                );

                if (isDeregister) {
                    responseCSUpdate = deploymentDao.deleteDeployment(
                        transactionTypeIdString,
                        internalIdOfCS
                    );
                } else {
                    responseCSUpdate = deploymentDao.createDeployment(
                        transactionTypeIdString,
                        internalIdOfCS
                    );
                }
                log.debug("EICTTREGMAN", responseCSUpdate.message);
            }

            return {
                message:
                    resultUEUpdate.message +
                    ". " +
                    responseCSUpdate.message +
                    ".",
                internalIdOfDeployment:
                    resultUEUpdate.internalIdOfDeployment +
                    ", " +
                    responseCSUpdate.internalIdOfDeployment,
                success: responseCSUpdate.success && resultUEUpdate.success,
            };
        } catch (e) {
            log.error(e.name, e.message + " " + e.stack);
            return {
                message: e.name + " " + e.message + " " + e.stack,
                success: false,
            };
        }
    }

    function updateAllEIOutboundTBF(cttInternalId, isDeregister) {
        var ERROR_MSG_ERROR_DURING_TBF_EDIT = "Failed during TBF update";

        var indexOfFailure = 0;
        var tbfIdsArray;
        var result = {
            success: false,
            message: "TBF Edit not initiated",
        };
        var singleSuccess = false;

        try {
            tbfIdsArray = getAllEIOutboundTBFIds();
            for (var i = 0; i < tbfIdsArray.length; i++) {
                var tbfId = tbfIdsArray[i];

                if (isDeregister) {
                    singleSuccess = transactionBodyFieldDao.removeCTTFromTBF(
                        tbfId,
                        cttInternalId
                    );
                } else {
                    singleSuccess = transactionBodyFieldDao.addCTTToTBF(
                        tbfId,
                        cttInternalId
                    );
                }

                if (singleSuccess === false) {
                    indexOfFailure = i;
                    result.success = false;
                    result.message =
                        ERROR_MSG_ERROR_DURING_TBF_EDIT +
                        " " +
                        tbfIdsArray[indexOfFailure];
                    log.error("EICTTREGMAN_ERROR", result.message);
                    return result; //skipping next TBFs
                }
            }
        } catch (e) {
            log.error(
                "EICTTREGMAN",
                ERROR_MSG_ERROR_DURING_TBF_EDIT +
                    " " +
                    tbfIdsArray[indexOfFailure]
            );
            log.error(
                "EICTTREGMAN_ERROR",
                e.name + ". " + e.message + ". " + e.stack
            );
            result.success = false;
            result.message =
                ERROR_MSG_ERROR_DURING_TBF_EDIT +
                " " +
                e.name +
                ". " +
                e.message +
                ". " +
                e.stack;
            return result;
        }

        result.success = true;
        if (isDeregister) {
            result.message =
                "Updated all EI TBFs to deregister transaction type: " +
                cttInternalId +
                ". ";
        } else {
            result.message =
                "Updated all EI TBFs to include transaction type: " +
                cttInternalId +
                ". ";
        }

        log.debug("EICTTREGMAN", "TBF update final result: " + result.message);

        return result;
    }

    function updateEITTMAP(cttIntId, isDeregister) {
        var response = {
            success: false,
            message: "",
        };

        try {
            var cttSupportedValue = cttManager.getRegisteredCTTIntIdArray();
            log.debug(
                "EICTTREGMAN",
                "IDs in EICTTMAP before update: " +
                    JSON.stringify(cttSupportedValue)
            );
            if (isDeregister) {
                log.debug("EICTTREGMAN", "Initializing EITTMAP update");
                if (cttSupportedValue.indexOf(cttIntId.toString()) === -1) {
                    //process continues if CTT is already absent from EITTMAP
                    response.success = true;
                    response.message =
                        "The Transaction Type " +
                        cttIntId +
                        " is already absent in EICTT Register";
                } else {
                    var i = cttSupportedValue.indexOf(cttIntId.toString());
                    if (i >= 0) {
                        cttSupportedValue.splice(i, 1);
                    }

                    var recId = record.submitFields({
                        type: EICTTMAP_RECORD_TYPE_ID,
                        id: 1,
                        values: {
                            custrecord_ei_registered_ctt: cttSupportedValue,
                        },
                    });

                    if (recId) {
                        log.debug(
                            "EICTTREGMAN",
                            "EICTTMAP updated, record id " + recId
                        );
                        response.success = true;
                        response.message =
                            "The Transaction Type " +
                            cttIntId +
                            " is successfully deregistered from EICTTMAP";
                    }
                }
            } else {
                if (cttSupportedValue.indexOf(cttIntId.toString()) === -1) {
                    cttSupportedValue.push(cttIntId);
                    log.debug(
                        "EICTTREGMAN",
                        "Updating EICTTMAP with array: " + cttSupportedValue
                    );

                    var _recId = record.submitFields({
                        type: EICTTMAP_RECORD_TYPE_ID,
                        id: 1,
                        values: {
                            custrecord_ei_registered_ctt: cttSupportedValue,
                        },
                    });

                    if (_recId) {
                        response.success = true;
                        response.message =
                            "The Transaction Type " +
                            cttIntId +
                            " is added to EICTTMAP, recId=" +
                            _recId;
                    }
                } else {
                    response.success = true;
                    response.message =
                        "The Transaction Type " +
                        cttIntId +
                        " is already present in EI-CTT-Register. ";
                }
            }
        } catch (e) {
            log.error(e.name, e.message + ". " + e.stack);
            response.success = false;
            response.message =
                "An error occurred while updating EICTTMAP. " +
                e.name +
                " " +
                e.message +
                " " +
                e.stack;
        }

        return response;
    }

    function getAllEIOutboundTBFIds() {
        //Outbound TBFs
        var stringIdsOfEIOutboundTBFs = [
            "custbody_psg_ei_trans_edoc_standard",
            "custbody_psg_ei_template_inlinehelp",
            "custbody_psg_ei_template",
            "custbody_psg_ei_status",
            "custbody_psg_ei_sending_method",
            "custbody_psg_ei_generated_edoc",
            "custbody_psg_ei_edoc_recipient",
            "custbody_psg_ei_digitalsignature_label",
            "custbody_psg_ei_content",
            "custbody_psg_ei_certified_edoc",
            "custbody_ei_ds_txn_identifier",
            "custbody_edoc_gen_trans_pdf",
            "custbody_edoc_generated_pdf",
            "custbody_ei_network_id",
            "custbody_ei_network_name",
            "custbody_ei_network_status",
            "custbody_ei_network_updated_date_time",
        ];
        return getInternalIdsOfTBFsFromStringIds(stringIdsOfEIOutboundTBFs);
    }

    //returns array of internal IDs of TBFs corresponding to each string ID in stringIdArray
    function getInternalIdsOfTBFsFromStringIds(stringIdArray) {
        var tbfInternalIds = [];

        // Create a query definition for TBF
        var tbfQuery = query.create({
            type: query.Type.CUSTOM_FIELD,
        });

        tbfQuery.condition = tbfQuery.createCondition({
            fieldId: "scriptid",
            operator: query.Operator.ANY_OF,
            values: stringIdArray,
        });

        tbfQuery.columns = [
            tbfQuery.createColumn({
                fieldId: "internalid", //internal id of TBF
            }),
            tbfQuery.createColumn({
                fieldId: "scriptid", //string ID of TBF
            }),
        ];

        var resultSet = tbfQuery.run();
        var results = resultSet.results;
        log.debug(
            "EICTTREGMAN",
            "TBF query, resultSet.types = " + resultSet.types
        );

        for (var i = results.length - 1; i >= 0; i--) {
            tbfInternalIds.push(results[i].values[0]);
        }
        log.debug("EICTTREGMAN", "All EI TBF internal ids: " + tbfInternalIds);
        return tbfInternalIds;
    }

    return {
        updateRegistration: updateRegistration,
        getInternalIdOfScriptFromStringId: getInternalIdOfScriptFromStringId,
    };
});
