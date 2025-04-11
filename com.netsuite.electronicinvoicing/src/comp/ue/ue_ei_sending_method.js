/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2015     aalcabasa
 *
 * This is the user event for the Electronic Invoicing Sending Methods
 *
 * @NApiVersion 2.x
 * @NScriptName E-Invoicing Sending Method UE
 * @NScriptId _ei_sending_method_ue
 * @NScriptType UserEventScript
 */
define([
    "N/error",
    "N/search",
    "../../lib/app/app_transaction_type_map",
    "../../lib/translator",
    "../../lib/string_formatter",
    "N/runtime",
    "N/ui/serverWidget",
    "../../app/einvoice/app_einvoice_plugin_find_implementations",
    "N/ui/message",
], function (
    error,
    search,
    transactionTypeMap,
    translator,
    stringFormatter,
    runtime,
    serverWidget,
    plugin,
    message
) {
    var EI_CANNOT_DELETE_DEFAULT_EMAIL_SENDING_METHOD =
        "EI_CANNOT_DELETE_DEFAULT_EMAIL_SENDING_METHOD";
    var EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS =
        "EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS";
    var NAME = "name";
    var DEFAULT = "Default";
    var DEFAULT_SENDING_METHOD_NAME = "NetSuite Email";
    var TRANSACTION_TYPE = "custrecord_psg_ei_trans_type";
    var SUPPORTED_TRANS_TYPE_FLD = "custpage_psg_ei_supported_transtype";
    var OUTBOUND_EDOC_TYPE = "outbound";
    var SENDING_PLUGIN_DEFAULT = "customscript_ei_pl_sending_plugin";
    var SENDING_CHANNEL = "custrecord_ei_sending_method_channel";
    var SUBSIDIARY_FLD = "custrecord_psg_ei_sm_subsidiary";
    var CERTIFICATION_SENDING_METHOD_FLD =
        "custrecord_ei_sending_method_for_certifi";
    var ISINACTIVE_FIELD = "isinactive";
    var SUPPORTED_TRANS_TYPE_FLD_LABEL = "Transaction Type";
    var SUPPORTED_TRANS_TYPE_FLD_HELP =
        "Select one or more transaction types to be supported by this sending method. To select multiple transaction types, press and hold the Ctrl key while selecting the transaction types.<br /><br />" +
        "If one or more transaction types cannot be selected, the sending method has been assigned to one or more transaction records of that transaction type. You must first remove the sending method from the transaction record to enable selection of the transaction type.";
    var SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "E-Document Sending Method Plugin Implementation";
    var SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the Sending Method Plugin Implementation";
    var SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD = "custpage_ei_sending_plugin";
    var SENDING_PLUGIN_IMPL_RECORD = "custrecord_ei_sending_plugin_impl";
    var SENDING_METHOD_SCRIPT = "custrecord_ei_sending_method_script";
    var DEFAULT_RECORD_ALREADY_EXIST_MSG =
        "The {DEFAULT_SENDING_METHOD_NAME} sending method record already exists. You cannot create a sending method record with the same name. Rename your sending method record and try again.";
    var EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Editing the {DEFAULT_SENDING_METHOD_NAME} sending method record is not allowed.";
    var DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG =
        "Deleting the {DEFAULT_SENDING_METHOD_NAME} sending method record is not allowed.";
    var CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS_MSG =
        "You cannot set this sending method as the Certification Sending Method because '{CERTIFICATION_SENDING_METHOD_NAME}' is already selected as the Certification Sending Method for the Subsidiaries [{SUBSIDIARIES}] and transactions [{TRANSACTIONS}]. To save this record, you must unassign '{CERTIFICATION_SENDING_METHOD_NAME}' as a Certification Sending Method, or make it inactive.";
    var SCRIPT_TYPE_SENDIND_METHOD_MSG_CODE =
        "sendingMethod.scriptbannermessage";
    var SCRIPT_TYPE_SENDING_METHOD_MSG =
        "Sending methods should be custom plug-in implementations. Please recreate existing sending method scripts as new custom plug-in implementations of the type “Sending Plugin”.";
    var pluginImplNameMap = {};
    function getTranslations() {
        DEFAULT_RECORD_ALREADY_EXIST_MSG =
            translator.getString("sendingMethod.default.alreadyexist") ||
            DEFAULT_RECORD_ALREADY_EXIST_MSG;
        EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG =
            translator.getString("sendingMethod.default.editnotallowed") ||
            EDIT_DEFAULT_RECORD_NOT_ALLOWED_MSG;
        DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG =
            translator.getString("sendingMethod.default.deletenotallowed") ||
            DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG;
    }
    function beforeLoad(context) {
        var form = context.form;
        var currRecord = context.newRecord;
        var sendingMethodImpl = currRecord.getValue(SENDING_PLUGIN_IMPL_RECORD);
        var transTypeFld = {};
        var execContext = runtime.executionContext;

        if (isCopiedRecord(context)) {
            currRecord.setValue(SENDING_METHOD_SCRIPT, "");
        }
        var scriptTypePluginMethod = isScriptTypeSendingMethod(currRecord);
        if (scriptTypePluginMethod) {
            createWarningBanner(
                SCRIPT_TYPE_SENDIND_METHOD_MSG_CODE,
                SCRIPT_TYPE_SENDING_METHOD_MSG
            );
        }
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
                height: 7,
                width: 0,
            });
            transTypeFld.setHelpText({
                help:
                    translator.getString(
                        "sendingMethod.supportedtranstypefldhelp"
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
            if (sendingMethodImpl !== "" || isCopiedRecord(context)) {
                hideSendingScript(context);
                addSendingMethodPluginImplementation(context);
            }
            if (isCreateRecord(context)) {
                addSendingMethodPluginImplementation(context);
                hideSendingScript(context);
            }
        } else {
            transTypeFld = form.getField({
                id: TRANSACTION_TYPE,
            });
        }
        if (!isCreateRecord(context) && !isCopiedRecord(context)) {
            if (context.type === context.UserEventType.EDIT) {
                var transactionCount = parseInt(
                    getTransactionCount(context.newRecord),
                    10
                );
                if (transactionCount > 0) {
                    transTypeFld.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.DISABLED,
                    });
                } else {
                    transTypeFld.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.NORMAL,
                    });
                }
            }
        }
        //to hide subsidiary field in Single Instance accounts
        if (!runtime.isFeatureInEffect("SUBSIDIARIES")) {
            var subsidiaryFld = form.getField({
                id: SUBSIDIARY_FLD,
            });
            subsidiaryFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
            //to preselect this field with the only possible value if new record is created in Single Instance account
            if (isCreateRecord(context) || isCopiedRecord(context)) {
                currRecord.setValue(SUBSIDIARY_FLD, [1]);
            }
        }
    }
    function isScriptTypeSendingMethod(currentRec) {
        var scriptName = currentRec.getValue(SENDING_METHOD_SCRIPT);
        return scriptName !== "";
    }
    function createWarningBanner(messageKey, messageVal) {
        message
            .create({
                type: message.Type.WARNING,
                message: translator.getString(messageKey) || messageVal,
            })
            .show({ sendToClient: true });
    }
    function hideSendingScript(context) {
        var form = context.form;
        var field = form.getField(SENDING_METHOD_SCRIPT);
        if (field) {
            field.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
        }
    }
    function addSendingMethodPluginImplementation(context) {
        var form = context.form;
        var sendingMethodPluginImplFld;
        // Add E-Document Sending Method Plugin Implementation list field.
        sendingMethodPluginImplFld = form.addField({
            id: SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString("sendingMethod.pluginimplementation") ||
                SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        sendingMethodPluginImplFld.isMandatory = true;
        sendingMethodPluginImplFld.setHelpText({
            help:
                translator.getString(
                    "sendingMethod.pluginimplementationhelp"
                ) || SENDING_METHOD_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });
        // Adding the names of plugin implementations in the list.
        addAllPluginImplementationNames(context, sendingMethodPluginImplFld);
        form.insertField({
            field: sendingMethodPluginImplFld,
            nextfield: SENDING_CHANNEL,
        });
    }
    function addAllPluginImplementationNames(
        context,
        sendingMethodPluginImplFld
    ) {
        var selectedPluginImpl;
        var pluginNames = plugin.findImplementations(SENDING_PLUGIN_DEFAULT);
        updatePluginNameIdMap(pluginNames);
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImpl = context.newRecord.getValue(
                SENDING_PLUGIN_IMPL_RECORD
            );
        }
        if (selectedPluginImpl === DEFAULT) {
            sendingMethodPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            sendingMethodPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }
        var selectedPluginImplFinal =
            selectedPluginImpl && selectedPluginImpl !== undefined
                ? selectedPluginImpl.toLowerCase()
                : selectedPluginImpl;
        for (var j in pluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImplFinal) &&
                pluginNames[j].name ===
                    pluginImplNameMap[selectedPluginImplFinal]
            ) {
                sendingMethodPluginImplFld.addSelectOption({
                    value: pluginNames[j].id,
                    text: pluginNames[j].name,
                    isSelected: true,
                });
            } else {
                sendingMethodPluginImplFld.addSelectOption({
                    value: pluginNames[j].id,
                    text: pluginNames[j].name,
                });
            }
        }
    }
    function updatePluginNameIdMap(pluginInfo) {
        for (var i in pluginInfo) {
            pluginImplNameMap[pluginInfo[i].id] = pluginInfo[i].name;
        }
    }
    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var templateError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "sendingMethod.contextunsupported"
                ),
                notifyOff: true,
            });
            throw new Error(templateError.name + ": " + templateError.message);
        }
        getTranslations();
        var record = context.newRecord;
        var oldRecord = context.oldRecord;
        var errorMsg;
        var details;
        var parameters;
        if (isDeleteRecord(context)) {
            if (
                record.getValue(NAME) === DEFAULT_SENDING_METHOD_NAME ||
                oldRecord.getValue(NAME) === DEFAULT_SENDING_METHOD_NAME
            ) {
                parameters = {
                    DEFAULT_SENDING_METHOD_NAME: DEFAULT_SENDING_METHOD_NAME,
                };
                stringFormatter.setString(
                    DELETE_DEFAULT_RECORD_NOT_ALLOWED_MSG
                );
                stringFormatter.replaceParameters(parameters);
                details = stringFormatter.toString();
                errorMsg = error.create({
                    name: EI_CANNOT_DELETE_DEFAULT_EMAIL_SENDING_METHOD,
                    message: details,
                    notifyOff: true,
                });
                throw new Error(errorMsg.name + ": " + errorMsg.message);
            }
        }

        if (record.getValue(CERTIFICATION_SENDING_METHOD_FLD)) {
            var validationResult =
                certificationSendingMethodAlreadyExists(context);
            if (validationResult.alreadyExists) {
                parameters = {
                    CERTIFICATION_SENDING_METHOD_NAME:
                        validationResult[
                            "nameOfAlreadyExistingCertificationSendingMethod"
                        ],
                    SUBSIDIARIES:
                        validationResult["subsidiariesAlreadyCovered"],
                    TRANSACTIONS:
                        validationResult["transactionsAlreadyCovered"],
                };
                stringFormatter.setString(
                    CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS_MSG
                );
                stringFormatter.replaceParameters(parameters);
                details = stringFormatter.toString();
                errorMsg = error.create({
                    name: EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS,
                    message: details,
                    notifyOff: true,
                });
                throw new Error(errorMsg.name + ": " + errorMsg.message);
            }
        }
    }

    function createFilters(record) {
        var filters = [];
        filters.push([ISINACTIVE_FIELD, search.Operator.IS, "F"]);
        filters.push("AND");
        filters.push([
            CERTIFICATION_SENDING_METHOD_FLD,
            search.Operator.IS,
            "T",
        ]);
        var subsidiaryFilter = [];
        if (
            runtime.isFeatureInEffect("SUBSIDIARIES") &&
            record.getValue(SUBSIDIARY_FLD).length > 0
        ) {
            subsidiaryFilter.push([
                SUBSIDIARY_FLD,
                search.Operator.ANYOF,
                record.getValue(SUBSIDIARY_FLD),
            ]);
        }
        var transactionFilter = [
            TRANSACTION_TYPE,
            search.Operator.ANYOF,
            record.getValue(TRANSACTION_TYPE),
        ];
        filters.push("AND");
        if (subsidiaryFilter.length > 0) {
            filters.push([subsidiaryFilter, "AND", transactionFilter]);
        } else {
            filters.push(transactionFilter);
        }
        return filters;
    }
    function certificationSendingMethodAlreadyExists(context) {
        var record = context.newRecord;
        var SENDING_METHOD_REC = "customrecord_ei_sending_method";
        var NAME_FIELD = "name";
        var ID_FIELD = "id";
        var filters = createFilters(record);
        var mapSearch = search.create({
            type: SENDING_METHOD_REC,
            columns: [
                search.createColumn({
                    name: NAME_FIELD,
                }),
                search.createColumn({
                    name: TRANSACTION_TYPE,
                }),
                search.createColumn({
                    name: SUBSIDIARY_FLD,
                }),
                search.createColumn({
                    name: ISINACTIVE_FIELD,
                }),
            ],
            filters: filters,
        });
        var certificationSendingMethodExists = { alreadyExists: false };
        mapSearch.run().each(function (result) {
            if (record.getValue(ID_FIELD) == result.id) {
                return true; //to prevent returning true when search returns the same ID that user is trying to save. Added due to intermittent problem in search filters.
            }
            var subsidiariesAlreadyCovered = result.getText(SUBSIDIARY_FLD);
            var transactionsAlreadyCovered = result.getText(TRANSACTION_TYPE);
            var nameOfAlreadyExistingCertificationSendingMethod =
                result.getValue(NAME_FIELD);
            certificationSendingMethodExists = {
                alreadyExists: true,
                subsidiariesAlreadyCovered: subsidiariesAlreadyCovered,
                transactionsAlreadyCovered: transactionsAlreadyCovered,
                nameOfAlreadyExistingCertificationSendingMethod:
                    nameOfAlreadyExistingCertificationSendingMethod,
            };
            return false;
        });
        return certificationSendingMethodExists;
    }
    /**
     * Add all supported transaction types in transaction type field.
     *
     * @param context {Object} context record
     * @param transTypeFld {Object} transaction type field object
     * @param origTransTypeFld {Object} original transaction type field object
     */
    function addSupportedTransType(context, transTypeFld, origTransTypeFld) {
        var selectedTransType = [];
        var supportedTransTypeOptions =
            transactionTypeMap.getSupportedTransTypeLabels(
                origTransTypeFld.getSelectOptions(),
                OUTBOUND_EDOC_TYPE
            );
        if (context.type === context.UserEventType.CREATE) {
            for (var t in supportedTransTypeOptions) {
                transTypeFld.addSelectOption({
                    value: supportedTransTypeOptions[t].value,
                    text: supportedTransTypeOptions[t].text,
                });
            }
        } else if (context.type === context.UserEventType.VIEW) {
            selectedTransType = context.newRecord.getValue(TRANSACTION_TYPE);
            for (var r in supportedTransTypeOptions) {
                if (
                    selectedTransType.indexOf(
                        supportedTransTypeOptions[r].value
                    ) !== -1
                ) {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[r].value,
                        text: supportedTransTypeOptions[r].text,
                        isSelected: true,
                    });
                }
            }
        } else if (
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedTransType = context.newRecord.getValue(TRANSACTION_TYPE);
            for (var s in supportedTransTypeOptions) {
                if (
                    selectedTransType.indexOf(
                        supportedTransTypeOptions[s].value
                    ) === -1
                ) {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[s].value,
                        text: supportedTransTypeOptions[s].text,
                    });
                } else {
                    transTypeFld.addSelectOption({
                        value: supportedTransTypeOptions[s].value,
                        text: supportedTransTypeOptions[s].text,
                        isSelected: true,
                    });
                }
            }
        }
    }
    function getTransactionCount(newRec) {
        var SENDING_METHOD_ENTITY_FIELD = "custbody_psg_ei_sending_method";
        var transactionCount = 0;
        var sendingMethodId = newRec.id;
        var transactionTypeCodes = transactionTypeMap.getOutboundTransactionCodes(
            newRec.getValue(TRANSACTION_TYPE)
        );

        if (transactionTypeCodes.length > 0) {
            var filters = [
                search.createFilter({
                    name: SENDING_METHOD_ENTITY_FIELD,
                    operator: search.Operator.IS,
                    values: sendingMethodId,
                }),
                search.createFilter({
                    name: "type",
                    operator: search.Operator.ANYOF,
                    values: transactionTypeCodes,
                }),
            ];

            var columns = [
                search.createColumn({
                    name: "internalid",
                    summary: search.Summary.COUNT,
                }),
            ];

            var searchObj = search.create({
                type: search.Type.TRANSACTION,
                filters: filters,
                columns: columns,
            });

            var pagedData = searchObj.runPaged({ pageSize: 1000 });

            pagedData.pageRanges.forEach(function (pageRange) {
                var page = pagedData.fetch({ index: pageRange.index });
                page.data.forEach(function (result) {
                    transactionCount += parseInt(
                        result.getValue({
                            name: "internalid",
                            summary: search.Summary.COUNT,
                        }),
                        10
                    );
                });
            });
        }

        return transactionCount;
    }
    function isCreateRecord(context) {
        return context.UserEventType.CREATE === context.type;
    }
    function isCopiedRecord(context) {
        return context.UserEventType.COPY === context.type;
    }
    function isDeleteRecord(context) {
        return context.UserEventType.DELETE === context.type;
    }

    /**
     * Checks if current context does not belong to unsupported contexts
     * @returns {Boolean}
     */
    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.WEBSTORE,
            ].indexOf(runtime.executionContext) === -1
        );
    }
    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
    };
});
