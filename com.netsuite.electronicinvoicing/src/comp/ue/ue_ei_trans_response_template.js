/**
 * @NApiVersion 2.x
 * @NScriptName E-Invoicing Response Template UE
 * @NScriptId _ei_transres_template_ue
 * @NScriptType usereventscript
 */
define([
    "N/runtime",
    "N/error",
    "N/query",
    "N/ui/serverWidget",
    "../../lib/translator",
    "../../lib/string_formatter",
    "../../lib/app/app_transaction_type_map",
    "../../app/einvoice/app_einvoice_plugin_find_implementations",
], function (
    runtime,
    error,
    query,
    serverWidget,
    translator,
    stringFormatter,
    transactionTypeMap,
    plugin
) {
    var TRANSACTION_TYPE = "custrecord_psg_ei_transres_trans_type";
    var ISINACTIVE_FIELD = "isinactive";
    var TRANS_TEMP_TYPE = "restemp";
    var SUPPORTED_TRANS_TYPE_FLD =
        "custpage_psg_ei_template_supported_transtype";
    var SUBSIDIARY_FLD = "custrecord_psg_ei_transres_subsidiary";
    var INJECT_CUSTOM_DATA_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Custom Data Source Plugin Implementation";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the Custom Data Source Plugin Implementation";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_psg_ei_transres_outplug";
    var SUPPORTED_TRANS_TYPE_FLD_LABEL = "Transaction Type";
    var SUPPORTED_TRANS_TYPE_FLD_HELP =
        "Select one or more transaction types to be supported by this transaction response template. To select multiple transaction types, press and hold Ctrl.";
    var EI_RESPONSE_TEMPLATE_ALREADY_EXISTS =
        "EI_RESPONSE_TEMPLATE_ALREADY_EXISTS";
    var RESPONSE_TEMPLATE_ALREADY_EXISTS_MSG =
        "You cannot save this response template because '{RESPONSE_TEMPLATE_NAME}' is already selected as the Response Template for the subsidiaries [{SUBSIDIARIES}] and transactions [{TRANSACTIONS}]. To save this record, you must unassign '{RESPONSE_TEMPLATE_NAME}' from the specific subsidiary(s) and transaction type(s), or make it inactive.";
    var DEFAULT = "";
    var pluginImplNameMap = {};
    var selectedPluginImplFinal;

    function beforeLoad(context) {

        var form = context.form;
        var transTypeFld = {};
        var execContext = runtime.executionContext;

        if (execContext === runtime.ContextType.USER_INTERFACE) {
            // Add transaction type multi-select field.
            transTypeFld = form.addField({
                id: SUPPORTED_TRANS_TYPE_FLD,
                label:
                    translator.getString("outbound.type") ||
                    SUPPORTED_TRANS_TYPE_FLD_LABEL,
                type: serverWidget.FieldType.MULTISELECT,
            });
            transTypeFld.isMandatory = true;
            transTypeFld.updateDisplaySize({
                height: 5,
                width: 0,
            });
            transTypeFld.setHelpText({
                help:
                    translator.getString(
                        "help.custrecord.psg.ei.transres.trans.type"
                    ) || SUPPORTED_TRANS_TYPE_FLD_HELP,
            });
            // Place transaction type field as the last field in Primary Information field group.
            form.insertField({
                field: transTypeFld,
                nextfield: TRANSACTION_TYPE,
            });
            // Hide original transaction type field.
            var origTransTypeFld = form.getField({
                id: TRANSACTION_TYPE,
            });
            origTransTypeFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
            // Add all supported transaction types in transaction type field.
            addSupportedTransType(context, transTypeFld, origTransTypeFld);
            addCustomDataSourcePluginImplementation(context);
        }
        var currRecord = context.newRecord;
        //To hide subsidiary field in Single Instance accounts
        if (!runtime.isFeatureInEffect("SUBSIDIARIES")) {
            var subsidiaryFld = form.getField({
                id: SUBSIDIARY_FLD,
            });
            subsidiaryFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
            //to preselect this field with the only possible value if new record is created in Single Instance account
            if (context.UserEventType.CREATE === context.type || context.UserEventType.COPY === context.type) {
                currRecord.setValue(SUBSIDIARY_FLD, [1]);
            }
        }
    }

    function beforeSubmit(context) {
        if (((context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY) && context.newRecord.getValue(SUBSIDIARY_FLD).length) || (context.type === context.UserEventType.XEDIT &&
                (context.newRecord.getValue(SUBSIDIARY_FLD) || context.newRecord.getValue(TRANSACTION_TYPE)))) {
            var validationResult =
                responseTemplateAlreadyExists(context);
            if (validationResult.alreadyExists) {
                var parameters = {
                    RESPONSE_TEMPLATE_NAME:
                        validationResult[
                        "nameOfAlreadyExistingResponseTemplate"
                        ],
                    SUBSIDIARIES:
                        validationResult["subsidiariesAlreadyCovered"],
                    TRANSACTIONS:
                        validationResult["transactionsAlreadyCovered"],
                };
                stringFormatter.setString(
                    translator.getString("template.transactionresponse.default.alreadyexist") ||
                    RESPONSE_TEMPLATE_ALREADY_EXISTS_MSG
                );
                stringFormatter.replaceParameters(parameters);
                var details = stringFormatter.toString();
                var errorMsg = error.create({
                    name: EI_RESPONSE_TEMPLATE_ALREADY_EXISTS,
                    message: details,
                    notifyOff: true,
                });
                throw new Error(errorMsg.name + ": " + errorMsg.message);
            }
        }
    }
    /**
     * Add all supported transaction types in transaction type field.
     *
     * @param context {Object} context record
     * @param transTypeFld {Object} transaction type field object
     * @param origTransTypeFld {Object} originial trasaction type field object
     */
    function addSupportedTransType(context, transTypeFld, origTransTypeFld) {
        var selectedTransType = [];
        var supportedTransTypeOptions = transactionTypeMap.getSupportedTransTypeLabels(origTransTypeFld.getSelectOptions(), TRANS_TEMP_TYPE, true);
        if (context.type === context.UserEventType.CREATE) {
            for (var m in supportedTransTypeOptions) {
                transTypeFld.addSelectOption({
                    value: supportedTransTypeOptions[m].value,
                    text: supportedTransTypeOptions[m].text,
                });
            }
        } else if (context.type === context.UserEventType.VIEW) {
            selectedTransType = context.newRecord.getValue(TRANSACTION_TYPE);
            for (var n in supportedTransTypeOptions) {
                if (
                    selectedTransType.indexOf(
                        supportedTransTypeOptions[n].value
                    ) !== -1
                ) {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[n].value,
                        text: supportedTransTypeOptions[n].text,
                        isSelected: true,
                    });
                }
            }
        } else if (
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedTransType = context.newRecord.getValue(TRANSACTION_TYPE);
            for (var i in supportedTransTypeOptions) {
                if (
                    selectedTransType.indexOf(
                        supportedTransTypeOptions[i].value
                    ) === -1
                ) {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[i].value,
                        text: supportedTransTypeOptions[i].text,
                    });
                } else {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[i].value,
                        text: supportedTransTypeOptions[i].text,
                        isSelected: true,
                    });
                }
            }
        }
    }
    function addCustomDataSourcePluginImplementation(context) {
        var form = context.form;
        var customDataSourcePluginImplFld;
        // Add E-Document Sending Method Plugin Implementation list field.
        customDataSourcePluginImplFld = form.addField({
            id: INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString("customDataSource.pluginimplementation") ||
                INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        customDataSourcePluginImplFld.isMandatory = false;
        customDataSourcePluginImplFld.setHelpText({
            help:
                translator.getString(
                    "customDataSource.pluginimplementationhelp"
                ) || INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });
        // Adding the names of plugin implementations in the list.
        addAllPluginImplementationNames(context, customDataSourcePluginImplFld);
        form.insertField({
            field: customDataSourcePluginImplFld,
            nextfield: SUPPORTED_TRANS_TYPE_FLD,
        });
    }

    function addAllPluginImplementationNames(
        context,
        customDataSourcePluginImplFld
    ) {
        var selectedPluginImpl;
        var pluginNames = plugin.findImplementations(
            INJECT_CUSTOM_DATA_PLUGIN_DEFAULT
        );
        updatePluginNameIdMap(pluginNames);
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImpl = context.newRecord.getValue(
                INJECT_CUSTOM_DATA_PLUGIN_RECORD
            );
        }
        if (selectedPluginImpl === DEFAULT) {
            customDataSourcePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            customDataSourcePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }
        selectedPluginImplFinal =
            selectedPluginImpl && selectedPluginImpl !== undefined
                ? selectedPluginImpl.toLowerCase()
                : selectedPluginImpl;

        for (var i in pluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImplFinal) &&
                pluginNames[i].name ===
                pluginImplNameMap[selectedPluginImplFinal]
            ) {
                customDataSourcePluginImplFld.addSelectOption({
                    value: pluginNames[i].id,
                    text: pluginNames[i].name,
                    isSelected: true,
                });
            } else {
                customDataSourcePluginImplFld.addSelectOption({
                    value: pluginNames[i].id,
                    text: pluginNames[i].name,
                });
            }
        }
    }

    function updatePluginNameIdMap(pluginInfo) {
        for (var i in pluginInfo) {
            pluginImplNameMap[pluginInfo[i].id] = pluginInfo[i].name;
        }
    }

    function responseTemplateAlreadyExists(context) {
        var RESPONSE_TEMPLATE_REC = "customrecord_psg_ei_transres_template";
        var NAME_FIELD = "name";
        var ID_FIELD = "id";
        var responseTemplateExists = { alreadyExists: false };
        try {
            var resTemQuery = query.create({
                type: RESPONSE_TEMPLATE_REC,
            });
            createFilters(resTemQuery, context);
            resTemQuery.columns = [
                resTemQuery.createColumn({
                    fieldId: ID_FIELD,
                }),
                resTemQuery.createColumn({
                    fieldId: NAME_FIELD,
                }),
                resTemQuery.createColumn({
                    fieldId: SUBSIDIARY_FLD,
                }),
                resTemQuery.createColumn({
                    fieldId: TRANSACTION_TYPE,
                }),
            ];
            var resTemResults = resTemQuery.run();
            var iterator = resTemResults.iterator();
            iterator.each(function (result) {
                var item = result.value;
                if (context.newRecord.getValue(ID_FIELD) == item.values[0]) {
                    return true;
                }
                var subsidiariesAlreadyCovered = item.values[2];
                var transactionsAlreadyCovered = item.values[3];
                var nameOfAlreadyExistingResponseTemplate =
                    item.values[1];
                responseTemplateExists = {
                    alreadyExists: true,
                    subsidiariesAlreadyCovered: subsidiariesAlreadyCovered,
                    transactionsAlreadyCovered: transactionsAlreadyCovered,
                    nameOfAlreadyExistingResponseTemplate:
                        nameOfAlreadyExistingResponseTemplate,
                };
                return true;
            });
            return responseTemplateExists;
        } catch (exp) {
            log.debug("exp", exp);
        }
    }

    function createFilters(resTemQuery, context) {
        var subsidiaryValues = context.newRecord.getValue(SUBSIDIARY_FLD);
        var tranTypeValues = context.newRecord.getValue(TRANSACTION_TYPE);
        if (context.type === context.UserEventType.XEDIT) {
            if (!subsidiaryValues)
                subsidiaryValues = context.oldRecord.getValue(SUBSIDIARY_FLD);
            if (!tranTypeValues)
                tranTypeValues = context.oldRecord.getValue(TRANSACTION_TYPE);
        }
        var subsidiaryFilter;
        var inactiveFilter = resTemQuery.createCondition({
            fieldId: ISINACTIVE_FIELD,
            operator: query.Operator.IS,
            values: false,
        });
        var transactionFilter = resTemQuery.createCondition({
            fieldId: TRANSACTION_TYPE,
            operator: query.Operator.INCLUDE_ANY,
            values: transactionTypeMap.getResponseTemplateTransactionCodes(tranTypeValues),
        });
        if (
            runtime.isFeatureInEffect("SUBSIDIARIES")
        ) {
            subsidiaryFilter = resTemQuery.createCondition({
                fieldId: SUBSIDIARY_FLD,
                operator: query.Operator.INCLUDE_ANY,
                values: subsidiaryValues,
            });
            resTemQuery.condition = resTemQuery.and(inactiveFilter, subsidiaryFilter, transactionFilter);
        } else {
            resTemQuery.condition = resTemQuery.and(inactiveFilter, transactionFilter);
        }
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
    };
});