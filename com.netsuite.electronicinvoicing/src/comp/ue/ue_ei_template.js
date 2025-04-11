/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       06 Oct 2015         ldimayuga
 *
 * This is the user event for Electronic Invoicing Template; primarily used for CSV import
 *
 * @NApiVersion 2.x
 * @NScriptName E-Invoicing Template UE
 * @NScriptId _ei_template_ue
 * @NScriptType usereventscript
 */
define([
    "../../app/einvoice/app_einvoice_template_manager",
    "../../app/einvoice/app_einvoice_server_template_manager",
    "../../app/einvoice/app_einvoice_template_validator",
    "N/runtime",
    "N/error",
    "N/record",
    "N/search",
    "N/ui/serverWidget",
    "../../lib/app/app_transaction_type_map",
    "../../lib/translator",
    "../../app/einvoice/app_einvoice_plugin_find_implementations",
    "N/redirect",
    "N/ui/message",
], function (
    manager,
    server_manager,
    templateValidator,
    runtime,
    error,
    record,
    search,
    serverWidget,
    transactionTypeMap,
    translator,
    plugin,
    redirect,
    message
) {
    var TRANSACTION_TYPE = "custrecord_psg_ei_template_trans_type";
    var VALIDATOR_SUBLIST = "recmachcustrecord_psg_ei_temp_validator_parent";
    var VALIDATOR_SUBLIST_REGEX_FIELD =
        "custrecord_psg_ei_temp_validator_regex";
    var VALIDATOR_SUBLIST_XPATH_FIELD =
        "custrecord_psg_ei_temp_validator_xpath";
    var SUPPORTED_TRANS_TYPE_FLD =
        "custpage_psg_ei_template_supported_transtype";
    var SUBSIDIARY_FLD = "custrecord_psg_ei_template_subsidiary";
    var EI_STATUS_FIELD = "custrecord_psg_ei_temp_edoc_status";
    var SUPPORTED_EI_STATUS_FIELD = "custpage_psg_ei_temp_ei_status_txn_block";
    var STATUS_LIST_FOR_BLOCK_EDIT_MAP = {
        3: "Ready For Sending",
        7: "Sent",
        10: "Sending",
        20: "Certification in Progress",
    };
    var SUPPORTED_EI_STATUS_FIELD_LABEL =
        "Restrict Editing of Transactions with E-Document Status";
    var SUPPORTED_EI_STATUS_FIELD_HELP =
        "Transactions with the e-document status you selected will not be editable when this template is associated with them. You can select multiple e-document statuses.";
    var EI_GENERATION_SERVICE = "EIGenerationService";
    var SERVICE = "service";
    var INJECT_CUSTOM_DATA_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Custom Data Source Plugin Implementation";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the Custom Data Source Plugin Implementation";
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_ei_inject_data_source_impl";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_inbound";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_inbound_custom_data_source";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Inbound Custom Data Source Plugin Implementation";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the Inbound Custom Data Source Plugin Implementation";
    var INBOUND_INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_ei_in_inject_data_source_impl";
    var DIGITAL_SIGNATURE_PLUGIN_DEFAULT =
        "customscript_ei_pl_digital_signature";
    var DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Digital Signature Plugin Implementation";
    var DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select a plug-in implementation. This field is required if you want to digitally sign e-documents.";
    var DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_pl_digital_signature";
    var DIGITAL_SIGNATURE_PLUGIN_RECORD =
        "custrecord_ei_pl_digital_signature_impl";
    var OUTBOUND_VALIDATION_PLUGIN_DEFAULT =
        "customscript_ei_pl_outbound_validation";
    var OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL =
        "Outbound Validation Plugin Implementation";
    var OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP =
        "Select the E-Document Outbound Validation Plugin";
    var OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_pl_outbound_validation";
    var OUTBOUND_VALIDATION_PLUGIN_RECORD =
        "custrecord_ei_pl_outboundvalidation_impl";
    var NATIVE_TEMP_EDITING_MODE = "custrecord_psg_ei_native_temp_lock_mode";
    var WARNING_ON_EDIT = "WARNING_ON_EDIT";
    var FORCE_TO_COPY = "FORCE_TO_COPY";
    var SUPPORTED_TRANS_TYPE_FLD_LABEL = "Transaction Type";
    var SUPPORTED_TRANS_TYPE_FLD_HELP =
        "Select one or more transaction types to be supported by this template. To select multiple transaction types, press and hold the Ctrl key while selecting the transaction types.<br /><br />" +
        "If transaction types cannot be selected, it means the template is already assigned to one or more transaction records of the same transaction type. To enable selection of transaction type, remove the template from the transaction record.<br /><br />" +
        "You can assign this template also to inbound e-documents, and doing so will disable the Transaction Type field.";
    var DEFAULT = "";
    var pluginImplNameMap = {};
    var selectedPluginImplFinal;

    var GENERATOR_TEMP_FIELD = "custrecord_psg_ei_template_content";
    var CONTENT_TYPE_FIELD = "custrecord_psg_file_content_type";
    var INBOUND_XSD_FIELD = "custrecord_edoc_template_xsd";
    var OUTBOUND_XSD_FIELD = "custrecord_edoc_template_outbound_xsd";

    function beforeLoad(context) {
        var WARNING_ON_EDIT_INFO_MESSAGE =
            translator.getString("template.msg.warningoneditmessage") ||
            "This is a default e-document template. Any changes made to this template will be lost or will be overwritten when the SuiteApp is updated.";

        var FORCE_TO_COPY_INFO_MESSAGE =
            translator.getString("template.msg.forcetocopymessage") ||
            "You cannot edit the default e-document template. You can either copy it using the Make Copy option from Actions, or create a new one.";

        var form = context.form;
        var transTypeFld = {};
        var eiStatusField = {};
        var messageOptions;
        var execContext = runtime.executionContext;

        var nativeTemplateEditingMode = context.newRecord
            .getValue(NATIVE_TEMP_EDITING_MODE)
            .toUpperCase();
        if (context.type === context.UserEventType.VIEW) {
            if (nativeTemplateEditingMode === WARNING_ON_EDIT) {
                messageOptions = {
                    type: message.Type.INFORMATION,
                    message: WARNING_ON_EDIT_INFO_MESSAGE,
                };
                context.form.addPageInitMessage(messageOptions);
            } else if (nativeTemplateEditingMode === FORCE_TO_COPY) {
                messageOptions = {
                    type: message.Type.INFORMATION,
                    message: FORCE_TO_COPY_INFO_MESSAGE,
                };
                context.form.addPageInitMessage(messageOptions);
                var editButton = context.form.getButton({
                    id: "edit",
                });
                editButton.isHidden = true;
            }
        } else if (context.type === context.UserEventType.EDIT) {
            if (nativeTemplateEditingMode === WARNING_ON_EDIT) {
                messageOptions = {
                    type: message.Type.WARNING,
                    message: WARNING_ON_EDIT_INFO_MESSAGE,
                };
                context.form.addPageInitMessage(messageOptions);
            } else if (nativeTemplateEditingMode === FORCE_TO_COPY) {
                redirect.toRecord({
                    type: context.newRecord.type,
                    id: context.newRecord.id,
                });
            }
        } else {
            context.newRecord.setValue(NATIVE_TEMP_EDITING_MODE, "");
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
                        "template.supportedtranstypefldhelp"
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
            // Add EI Status multiselect field for Transaction EDIT restriction
            eiStatusField = form.addField({
                id: SUPPORTED_EI_STATUS_FIELD,
                label:
                    translator.getString("template.eistatus") ||
                    SUPPORTED_EI_STATUS_FIELD_LABEL,
                type: serverWidget.FieldType.MULTISELECT,
            });
            eiStatusField.setHelpText({
                help:
                    translator.getString(
                        "template.supportedeistatusfieldhelp"
                    ) || SUPPORTED_EI_STATUS_FIELD_HELP,
            });
            form.insertField({
                field: eiStatusField,
                nextfield: EI_STATUS_FIELD,
            });
            //hide original ei status field
            var origEiStatusField = form.getField({
                id: EI_STATUS_FIELD,
            });
            origEiStatusField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });
            //add supported EI status in the field
            addSupportedEIStatus(context, eiStatusField, origEiStatusField);
            addCustomDataSourcePluginImplementation(context);
            // add Inbound Custom Data Source
            addInboundCustomDataSourcePluginImplementation(context);
            //EI Digital Signature
            addDigitalSignaturePluginImplementation(context);
            //EI Outbound Validation
            addOutboundValidationPluginImplementation(context);
        } else {
            transTypeFld = form.getField({
                id: TRANSACTION_TYPE,
            });
        }
        if (
            runtime.getCurrentSession().get(SERVICE) !==
                EI_GENERATION_SERVICE &&
            context.type === context.UserEventType.EDIT
        ) {
            var transactionCount = parseInt(
                getTransactionCount(context.newRecord),
                10
            );
            var inboundEDocCount = parseInt(
                getInboundEDocumentCount(context.newRecord),
                10
            );
            if (transactionCount + inboundEDocCount > 0) {
                transTypeFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED,
                });
            } else {
                transTypeFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.NORMAL,
                });
            }
        }
        var currRecord = context.newRecord;
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

    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var templateError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString("template.contextunsupported"),
                notifyOff: true,
            });
            throw new Error(templateError.name + ": " + templateError.message);
        }
        var newRec = context.newRecord;
        var execContext = runtime.executionContext;
        if (context.type === context.UserEventType.DELETE) {
            var recordId = newRec.id;
            deleteDependentRecords(recordId);
        } else if (
            [context.UserEventType.CREATE, context.UserEventType.EDIT].indexOf(
                context.type
            ) !== -1 &&
            execContext !== runtime.ContextType.USER_INTERFACE
        ) {
            var validationError;
            var result = manager.validateTemplateFields(newRec, execContext);
            var validationResult = result.validationResult;
            if (!validationResult.isValid()) {
                validationError = error.create({
                    name: "EI_TEMPLATE_ERROR",
                    message: validationResult.getMessage(),
                    notifyOff: true,
                });
                throw new Error(
                    validationError.name + ": " + validationError.message
                );
            }

            var templateContent = newRec.getValue({
                fieldId: GENERATOR_TEMP_FIELD,
            });
            var contentTypeText = newRec.getValue({
                fieldId: CONTENT_TYPE_FIELD,
            });
            var inboundXsd = newRec.getValue({
                fieldId: INBOUND_XSD_FIELD,
            });
            var outboundXsd = newRec.getValue({
                fieldId: OUTBOUND_XSD_FIELD,
            });

            var parameters = {
                templateContent: templateContent,
                contentType: contentTypeText,
                inboundXsd: inboundXsd,
                outboundXsd: outboundXsd,
                execContext: execContext,
                hasOutbound: result.hasatleastOneOutbound,
            };
            result = server_manager.validateServerTemplateFields(parameters);
            if (!result.validity && result.type === "ERROR") {
                validationError = error.create({
                    name: "EI_TEMPLATE_ERROR",
                    message: result.message,
                    notifyOff: true,
                });
                throw new Error(
                    validationError.name + ": " + validationError.message
                );
            }

            var validatorCount = newRec.getLineCount(VALIDATOR_SUBLIST);
            var validatorList = [];
            for (var i = 0; i < validatorCount; i++) {
                var regexValue = newRec.getSublistValue(
                    VALIDATOR_SUBLIST,
                    VALIDATOR_SUBLIST_REGEX_FIELD,
                    i
                );
                var xpathValue = newRec.getSublistValue(
                    VALIDATOR_SUBLIST,
                    VALIDATOR_SUBLIST_XPATH_FIELD,
                    i
                );
                var xpathRegexCombination = [xpathValue, regexValue].join("");
                var validatorIndex = validatorList.indexOf(
                    xpathRegexCombination
                );
                if (validatorIndex !== -1) {
                    var validatorError = error.create({
                        name: "EI_TEMPLATE_ERROR",
                        message: translator.getString(
                            "transaction.msg.xmlvalidatorexists"
                        ),
                        notifyOff: true,
                    });
                    throw new Error(
                        validatorError.name + ": " + validatorError.message
                    );
                } else {
                    var regexValidationResult =
                        templateValidator.isValidRegEx(regexValue);
                    if (!regexValidationResult.isValid()) {
                        var regexError = error.create({
                            name: "EI_TEMPLATE_ERROR",
                            message: regexValidationResult.getMessage(),
                            notifyOff: true,
                        });
                        throw new Error(
                            regexError.name + ": " + regexError.message
                        );
                    }
                    validatorList.push(xpathRegexCombination);
                }
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
        var supportedTransTypeOptions =
            transactionTypeMap.getSupportedTransTypeLabels(
                origTransTypeFld.getSelectOptions()
            );
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
    //Digital Signing Plugin Implementations Fields
    function addDigitalSignaturePluginImplementation(context) {
        var form = context.form;
        var digitalSignaturePluginImplFld;
        // Add E-Document Sending Method Plugin Implementation list field.
        digitalSignaturePluginImplFld = form.addField({
            id: DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString("digitalSignature.pluginimplementation") ||
                DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        digitalSignaturePluginImplFld.isMandatory = false;
        digitalSignaturePluginImplFld.setHelpText({
            help:
                translator.getString(
                    "digitalSignature.pluginimplementationhelp"
                ) || DIGITAL_SIGNATURE_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });
        // Adding the names of plugin implementations in the list.
        addAllDigitalSignaturePluginImplementationNames(
            context,
            digitalSignaturePluginImplFld
        );
        form.insertField({
            field: digitalSignaturePluginImplFld,
            nextfield: INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD,
        });
    }
    function addAllDigitalSignaturePluginImplementationNames(
        context,
        digitalSignaturePluginImplFld
    ) {
        var selectedPluginImpl;
        var pluginNames = plugin.findImplementations(
            DIGITAL_SIGNATURE_PLUGIN_DEFAULT
        );
        updatePluginNameIdMap(pluginNames);
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImpl = context.newRecord.getValue(
                DIGITAL_SIGNATURE_PLUGIN_RECORD
            );
        }
        if (selectedPluginImpl === DEFAULT) {
            digitalSignaturePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            digitalSignaturePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }
        selectedPluginImplFinal =
            selectedPluginImpl && selectedPluginImpl !== undefined
                ? selectedPluginImpl.toLowerCase()
                : selectedPluginImpl;

        for (var j in pluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImplFinal) &&
                pluginNames[j].name ===
                    pluginImplNameMap[selectedPluginImplFinal]
            ) {
                digitalSignaturePluginImplFld.addSelectOption({
                    value: pluginNames[j].id,
                    text: pluginNames[j].name,
                    isSelected: true,
                });
            } else {
                digitalSignaturePluginImplFld.addSelectOption({
                    value: pluginNames[j].id,
                    text: pluginNames[j].name,
                });
            }
        }
    }
    //Inbound Custom Data Source Plugin Implementation Fields
    function addInboundCustomDataSourcePluginImplementation(context) {
        var form = context.form;
        var inboundCustomDataSourcePluginImplFld;
        inboundCustomDataSourcePluginImplFld = form.addField({
            id: INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString(
                    "inboundcustomdatasource.pluginimplementation"
                ) || INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        inboundCustomDataSourcePluginImplFld.isMandatory = false;
        inboundCustomDataSourcePluginImplFld.setHelpText({
            help:
                translator.getString(
                    "inboundcustomdatasource.pluginimplementationhelp"
                ) ||
                INBOUND_INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });
        // Adding the names of plugin implementations in the list.
        addAllInboundCustomDataSourcePluginImplNames(
            context,
            inboundCustomDataSourcePluginImplFld
        );
        form.insertField({
            field: inboundCustomDataSourcePluginImplFld,
            nextfield: SUPPORTED_TRANS_TYPE_FLD,
        });
    }
    function addAllInboundCustomDataSourcePluginImplNames(
        context,
        inboundCustomDataSourcePluginImplFld
    ) {
        var selectedPluginImplInbound;
        var inboundCustomDataSourcePluginNames = plugin.findImplementations(
            INBOUND_INJECT_CUSTOM_DATA_PLUGIN_DEFAULT
        );
        updatePluginNameIdMap(inboundCustomDataSourcePluginNames);
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImplInbound = context.newRecord.getValue(
                INBOUND_INJECT_CUSTOM_DATA_PLUGIN_RECORD
            );
        }
        if (selectedPluginImplInbound === DEFAULT) {
            inboundCustomDataSourcePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            inboundCustomDataSourcePluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }
        selectedPluginImplFinal =
            selectedPluginImplInbound && selectedPluginImplInbound !== undefined
                ? selectedPluginImplInbound.toLowerCase()
                : selectedPluginImplInbound;

        for (var k in inboundCustomDataSourcePluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImplFinal) &&
                inboundCustomDataSourcePluginNames[k].name ===
                    pluginImplNameMap[selectedPluginImplFinal]
            ) {
                inboundCustomDataSourcePluginImplFld.addSelectOption({
                    value: inboundCustomDataSourcePluginNames[k].id,
                    text: inboundCustomDataSourcePluginNames[k].name,
                    isSelected: true,
                });
            } else {
                inboundCustomDataSourcePluginImplFld.addSelectOption({
                    value: inboundCustomDataSourcePluginNames[k].id,
                    text: inboundCustomDataSourcePluginNames[k].name,
                });
            }
        }
    }
    function addOutboundValidationPluginImplementation(context) {
        var form = context.form;
        var outboundValidationPluginImplFld;
        // Add E-Document Sending Method Plugin Implementation list field.
        outboundValidationPluginImplFld = form.addField({
            id: OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD,
            label:
                translator.getString(
                    "outboundvalidation.pluginimplementation"
                ) || OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL,
            type: serverWidget.FieldType.SELECT,
        });
        outboundValidationPluginImplFld.isMandatory = false;
        outboundValidationPluginImplFld.setHelpText({
            help:
                translator.getString(
                    "outboundvalidation.pluginimplementationhelp"
                ) || OUTBOUND_VALIDATION_PLUGIN_IMPLEMENTATION_FLD_LABEL_HELP,
        });
        // Adding the names of plugin implementations in the list.
        addAllOutboundValidationPluginImplementationNames(
            context,
            outboundValidationPluginImplFld
        );
        form.insertField({
            field: outboundValidationPluginImplFld,
            nextfield: INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD,
        });
    }
    function addAllOutboundValidationPluginImplementationNames(
        context,
        outboundValidationPluginImplFld
    ) {
        var selectedPluginImpl;
        var pluginNames = plugin.findImplementations(
            OUTBOUND_VALIDATION_PLUGIN_DEFAULT
        );
        updatePluginNameIdMap(pluginNames);
        if (
            context.type === context.UserEventType.VIEW ||
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedPluginImpl = context.newRecord.getValue(
                OUTBOUND_VALIDATION_PLUGIN_RECORD
            );
        }
        if (selectedPluginImpl === DEFAULT) {
            outboundValidationPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
                isSelected: true,
            });
        } else {
            outboundValidationPluginImplFld.addSelectOption({
                value: DEFAULT,
                text: DEFAULT,
            });
        }
        selectedPluginImplFinal =
            selectedPluginImpl && selectedPluginImpl !== undefined
                ? selectedPluginImpl.toLowerCase()
                : selectedPluginImpl;

        for (var l in pluginNames) {
            if (
                pluginImplNameMap.hasOwnProperty(selectedPluginImplFinal) &&
                pluginNames[l].name ===
                    pluginImplNameMap[selectedPluginImplFinal]
            ) {
                outboundValidationPluginImplFld.addSelectOption({
                    value: pluginNames[l].id,
                    text: pluginNames[l].name,
                    isSelected: true,
                });
            } else {
                outboundValidationPluginImplFld.addSelectOption({
                    value: pluginNames[l].id,
                    text: pluginNames[l].name,
                });
            }
        }
    }
    function updatePluginNameIdMap(pluginInfo) {
        for (var i in pluginInfo) {
            pluginImplNameMap[pluginInfo[i].id] = pluginInfo[i].name;
        }
    }
    /**
     * Add all EI Status for which transactions are to be blocked from editing.
     *
     * @param context {Object} context record
     * @param eiStatusField {Object} EI Status block list field object
     * @param origEiStatusField {Object} originial EI Status field object
     */
    function addSupportedEIStatus(context, eiStatusField, origEiStatusField) {
        var selectedEIStatus = [];
        var supportedEIStatus = getSupportedEIStatusLabel(
            origEiStatusField.getSelectOptions()
        );
        if (context.type === context.UserEventType.CREATE) {
            for (var i in supportedEIStatus) {
                eiStatusField.addSelectOption({
                    value: supportedEIStatus[i].value,
                    text: supportedEIStatus[i].text,
                });
            }
        } else if (context.type === context.UserEventType.VIEW) {
            selectedEIStatus = context.newRecord.getValue(EI_STATUS_FIELD);
            for (var p in supportedEIStatus) {
                if (
                    selectedEIStatus.indexOf(supportedEIStatus[p].value) !== -1
                ) {
                    eiStatusField.addSelectOption({
                        value: supportedEIStatus[p].value,
                        text: supportedEIStatus[p].text,
                        isSelected: true,
                    });
                }
            }
        } else if (
            context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.COPY
        ) {
            selectedEIStatus = context.newRecord.getValue(EI_STATUS_FIELD);
            for (var q in supportedEIStatus) {
                if (
                    selectedEIStatus.indexOf(supportedEIStatus[q].value) === -1
                ) {
                    eiStatusField.addSelectOption({
                        value: supportedEIStatus[q].value,
                        text: supportedEIStatus[q].text,
                    });
                } else {
                    eiStatusField.addSelectOption({
                        value: supportedEIStatus[q].value,
                        text: supportedEIStatus[q].text,
                        isSelected: true,
                    });
                }
            }
        }
    }
    function getSupportedEIStatusLabel(eiStatusSelectOptions) {
        var supportedEIStatusArray = [];
        for (var r in STATUS_LIST_FOR_BLOCK_EDIT_MAP) {
            supportedEIStatusArray.push(r);
        }
        var isSupportedEIStatus = false;
        var z = 0;
        while (z < eiStatusSelectOptions.length) {
            isSupportedEIStatus =
                supportedEIStatusArray.indexOf(
                    eiStatusSelectOptions[z].value
                ) !== -1
                    ? true
                    : false;
            if (!isSupportedEIStatus) {
                eiStatusSelectOptions.splice(z, 1);
            } else {
                z++;
            }
        }
        return eiStatusSelectOptions;
    }
    function isCreateRecord(context) {
        return context.UserEventType.CREATE === context.type;
    }
    function isCopiedRecord(context) {
        return context.UserEventType.COPY === context.type;
    }
    /**
     * Gets the number of transactions using this template.
     * @param newRec {Object} Record object
     * @returns transactionCount {Integer} Count of transactions
     */
    function getTransactionCount(newRec) {
        var TEMPLATE_ENTITY_FIELD = "custbody_psg_ei_template";
        var transactionCount = 0;
        var templateId = newRec.id;
        var transactionTypeIds = transactionTypeMap.getOutboundTransactionCodes(
            newRec.getValue(TRANSACTION_TYPE)
        );
        if (transactionTypeIds.length > 0) {
            var filters = [];
            filters[0] = search.createFilter({
                name: TEMPLATE_ENTITY_FIELD,
                operator: search.Operator.IS,
                values: templateId,
            });
            filters[1] = search.createFilter({
                name: "type",
                operator: search.Operator.ANYOF,
                values: transactionTypeIds,
            });
            var columns = [];
            columns[0] = search.createColumn({
                name: "internalid",
                summary: search.Summary.COUNT,
            });
            search
                .create({
                    type: search.Type.TRANSACTION,
                    filters: filters,
                    columns: columns,
                })
                .run()
                .each(function (result) {
                    transactionCount = result.getValue({
                        name: "internalid",
                        summary: search.Summary.COUNT,
                    });
                });
        }
        return transactionCount;
    }
    /**
     * Gets the number of inbound e-documents using this template.
     * @param newRec {Object} Record object
     * @returns recordCount {Integer} Count of inbound e-doc records
     */
    function getInboundEDocumentCount(newRec) {
        var INBOUND_EDOCUMENT_RECORD = "customrecord_psg_ei_inbound_edoc";
        var TEMPLATE_ENTITY_FIELD = "custrecord_psg_ei_inbound_template";
        var recordCount = 0;
        var templateId = newRec.id;
        var filters = [];
        filters[0] = search.createFilter({
            name: TEMPLATE_ENTITY_FIELD,
            operator: search.Operator.IS,
            values: templateId,
        });
        var columns = [];
        columns[0] = search.createColumn({
            name: "internalid",
            summary: search.Summary.COUNT,
        });
        search
            .create({
                type: INBOUND_EDOCUMENT_RECORD,
                filters: filters,
                columns: columns,
            })
            .run()
            .each(function (result) {
                recordCount = result.getValue({
                    name: "internalid",
                    summary: search.Summary.COUNT,
                });
            });
        return recordCount;
    }
    function deleteDependentRecords(recordId) {
        var TEMPLATE_VALIDATOR_RECORD =
            "customrecord_psg_ei_template_validator";
        search
            .create({
                type: TEMPLATE_VALIDATOR_RECORD,
                filters: [
                    search.createFilter({
                        name: "custrecord_psg_ei_temp_validator_parent",
                        operator: search.Operator.IS,
                        values: recordId,
                    }),
                ],
            })
            .run()
            .each(function (result) {
                record.delete({
                    type: TEMPLATE_VALIDATOR_RECORD,
                    id: result.id,
                });
                return true;
            });
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
