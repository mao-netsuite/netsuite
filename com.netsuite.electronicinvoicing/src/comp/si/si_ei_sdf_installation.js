/**
 *@NApiVersion 2.1
 *@NScriptType SDFInstallationScript
 */
define(["N/record", "N/query"], function (record, query) {
    var NETWORK_STATUS_SU_SCRIPT = "customscript_get_network_status_su";
    var NETWORK_STATUS_MR_SCRIPT = "customscript_edoc_mr_automatic_network";
    var TRANSACTION_RESPONSE_MR_SCRIPT = "customscript_psg_ei_tranres_send_mr";
    var INBOUND_EDOC_UE_SCRIPT = "customscript_edoc_ue_inbound";
    var INBOUND_TRANSACTION_UE_SCRIPT = "customscript_edoc_inbound_transaction_ue";
    var RESPONSE_TEMPLATE_UE_SCRIPT = "customscript_ei_transres_template_ue";
    var SENDING_PLUGIN_DEFAULT = "customscript_ei_pl_sending_plugin";
    var INJECT_DATA_SOURCE_PLUGIN_DEFAULT = "customscript_ei_pl_inject_data_source";
    var CUSTOM_PLUGIN_TYPES = "customplugintypes";
    var PLUGIN_TYPE_FLD = "plugintype";
    var SCRIPT_ID = "scriptid";
    var ID = "id";
    var SUITELET_TYPE = "suitelet";
    var MAP_REDUCE_TYPE = "mapreducescript";
    var ERR_CODE_EI_SDF_INSTALL_ERROR = "EI_SDF_INSTALL_ERROR";

    function updateSuitelet(sendingPluginInternalId) {
        var suiteletQuery = query.create({
            type: query.Type.SUITELET,
        });
        suiteletQuery.columns = [
            suiteletQuery.createColumn({
                fieldId: ID,
            }),
        ];
        suiteletQuery.condition = suiteletQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: NETWORK_STATUS_SU_SCRIPT,
        });

        var suiteletResults = suiteletQuery.run().asMappedResults();
        var suiteletInternalId = suiteletResults[0].id;
        var networkStatusSuiteletRecord = record.load({
            type: SUITELET_TYPE,
            id: suiteletInternalId,
        });
        var customPluginTypesLinesCount =
            networkStatusSuiteletRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasSendingPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                networkStatusSuiteletRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === sendingPluginInternalId.toString()
            ) {
                hasSendingPlugin = true;
                break;
            }
        }
        if (!hasSendingPlugin) {
            networkStatusSuiteletRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: sendingPluginInternalId,
            });
            networkStatusSuiteletRecord.save();
        }
    }

    function updateInboundEDocUserEventScript(dataSourcePluginInternalId) {
        var userEventQuery = query.create({
            type: query.Type.USER_EVENT_SCRIPT,
        });
        userEventQuery.columns = [
            userEventQuery.createColumn({
                fieldId: ID,
            }),
        ];
        userEventQuery.condition = userEventQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: INBOUND_EDOC_UE_SCRIPT,
        });

        var userEventResults = userEventQuery.run().asMappedResults();
        var userEventInternalId = userEventResults[0].id;
        var inboundEDocRecord = record.load({
            type: record.Type.USEREVENT_SCRIPT,
            id: userEventInternalId,
        });
        var customPluginTypesLinesCount =
            inboundEDocRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasCDSPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                inboundEDocRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === dataSourcePluginInternalId.toString()
            ) {
                hasCDSPlugin = true;
                break;
            }
        }
        if (!hasCDSPlugin) {
            inboundEDocRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: dataSourcePluginInternalId,
            });
            inboundEDocRecord.save();
        }
    }

    function updateInboundTransactionUserEventScript(dataSourcePluginInternalId) {
        var userEventQuery = query.create({
            type: query.Type.USER_EVENT_SCRIPT,
        });
        userEventQuery.columns = [
            userEventQuery.createColumn({
                fieldId: ID,
            }),
        ];
        userEventQuery.condition = userEventQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: INBOUND_TRANSACTION_UE_SCRIPT,
        });

        var userEventResults = userEventQuery.run().asMappedResults();
        var userEventInternalId = userEventResults[0].id;
        var inboundTransactionRecord = record.load({
            type: record.Type.USEREVENT_SCRIPT,
            id: userEventInternalId,
        });
        var customPluginTypesLinesCount =
            inboundTransactionRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasCDSPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                inboundTransactionRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === dataSourcePluginInternalId.toString()
            ) {
                hasCDSPlugin = true;
                break;
            }
        }
        if (!hasCDSPlugin) {
            inboundTransactionRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: dataSourcePluginInternalId,
            });
            inboundTransactionRecord.save();
        }
    }

    function updateMR(sendingPluginInternalId) {
        var mapreduceQuery = query.create({
            type: query.Type.MAP_REDUCE_SCRIPT,
        });
        mapreduceQuery.columns = [
            mapreduceQuery.createColumn({
                fieldId: ID,
            }),
        ];
        mapreduceQuery.condition = mapreduceQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: NETWORK_STATUS_MR_SCRIPT,
        });

        var mapreduceResults = mapreduceQuery.run().asMappedResults();
        var mapreduceInternalId = mapreduceResults[0].id;
        var networkStatusMapReduceRecord = record.load({
            type: MAP_REDUCE_TYPE,
            id: mapreduceInternalId,
        });
        var customPluginTypesLinesCount =
            networkStatusMapReduceRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasSendingPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                networkStatusMapReduceRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === sendingPluginInternalId.toString()
            ) {
                hasSendingPlugin = true;
                break;
            }
        }
        if (!hasSendingPlugin) {
            networkStatusMapReduceRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: sendingPluginInternalId,
            });
            networkStatusMapReduceRecord.save();
        }
    }

    function updateSendTransactionResponseMR(sendingPluginInternalId) {
        var mapreduceQuery = query.create({
            type: query.Type.MAP_REDUCE_SCRIPT,
        });
        mapreduceQuery.columns = [
            mapreduceQuery.createColumn({
                fieldId: ID,
            }),
        ];
        mapreduceQuery.condition = mapreduceQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: TRANSACTION_RESPONSE_MR_SCRIPT,
        });

        var mapreduceResults = mapreduceQuery.run().asMappedResults();
        var mapreduceInternalId = mapreduceResults[0].id;
        var transactionResponseMapReduceRecord = record.load({
            type: MAP_REDUCE_TYPE,
            id: mapreduceInternalId,
        });
        var customPluginTypesLinesCount =
            transactionResponseMapReduceRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasSendingPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                transactionResponseMapReduceRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === sendingPluginInternalId.toString()
            ) {
                hasSendingPlugin = true;
                break;
            }
        }
        if (!hasSendingPlugin) {
            transactionResponseMapReduceRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: sendingPluginInternalId,
            });
            transactionResponseMapReduceRecord.save();
        }
    }

    function updateUserEventScript(dataSourcePluginInternalId) {
        var userEventQuery = query.create({
            type: query.Type.USER_EVENT_SCRIPT,
        });
        userEventQuery.columns = [
            userEventQuery.createColumn({
                fieldId: ID,
            }),
        ];
        userEventQuery.condition = userEventQuery.createCondition({
            fieldId: SCRIPT_ID,
            operator: query.Operator.IS,
            values: RESPONSE_TEMPLATE_UE_SCRIPT,
        });

        var userEventResults = userEventQuery.run().asMappedResults();
        var userEventInternalId = userEventResults[0].id;
        var responseTemplateRecord = record.load({
            type: record.Type.USEREVENT_SCRIPT,
            id: userEventInternalId,
        });
        var customPluginTypesLinesCount =
            responseTemplateRecord.getLineCount({
                sublistId: CUSTOM_PLUGIN_TYPES,
            });
        var hasCDSPlugin = false;
        for (
            var lineNum = 0;
            lineNum < customPluginTypesLinesCount;
            lineNum++
        ) {
            var customPluginSublistValue =
                responseTemplateRecord.getSublistValue({
                    sublistId: CUSTOM_PLUGIN_TYPES,
                    fieldId: PLUGIN_TYPE_FLD,
                    line: lineNum,
                });
            if (
                customPluginSublistValue === dataSourcePluginInternalId.toString()
            ) {
                hasCDSPlugin = true;
                break;
            }
        }
        if (!hasCDSPlugin) {
            responseTemplateRecord.setSublistValue({
                sublistId: CUSTOM_PLUGIN_TYPES,
                fieldId: PLUGIN_TYPE_FLD,
                line: customPluginTypesLinesCount,
                value: dataSourcePluginInternalId,
            });
            responseTemplateRecord.save();
        }
    }

    function run() {
        try {
            var customPluginQuery = query.create({
                type: query.Type.PLUG_IN_TYPE,
            });
            customPluginQuery.columns = [
                customPluginQuery.createColumn({
                    fieldId: ID,
                }),
            ];
            customPluginQuery.condition = customPluginQuery.createCondition({
                fieldId: SCRIPT_ID,
                operator: query.Operator.IS,
                values: SENDING_PLUGIN_DEFAULT,
            });

            var sendingPluginresults = customPluginQuery
                .run()
                .asMappedResults();
            var sendingPluginInternalId = sendingPluginresults[0].id;
            customPluginQuery = query.create({
                type: query.Type.PLUG_IN_TYPE,
            });
            customPluginQuery.columns = [
                customPluginQuery.createColumn({
                    fieldId: ID,
                }),
            ];
            customPluginQuery.condition = customPluginQuery.createCondition({
                fieldId: SCRIPT_ID,
                operator: query.Operator.IS,
                values: INJECT_DATA_SOURCE_PLUGIN_DEFAULT,
            });

            var dataSourcePluginresults = customPluginQuery
                .run()
                .asMappedResults();
            var dataSourcePluginInternalId = dataSourcePluginresults[0].id;
            updateSuitelet(sendingPluginInternalId);
            updateMR(sendingPluginInternalId);
            updateSendTransactionResponseMR(sendingPluginInternalId);
            updateUserEventScript(dataSourcePluginInternalId);
            updateInboundTransactionUserEventScript(dataSourcePluginInternalId);
            updateInboundEDocUserEventScript(dataSourcePluginInternalId);
        } catch (e) {
            log.error(
                ERR_CODE_EI_SDF_INSTALL_ERROR,
                "".concat(e.name, ". ").concat(e.message, ". ")
            );
        }
    }
    return {
        run: run,
    };
});
