/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

define([
    "N/error",
    "N/file",
    "../app/einvoice/app_einvoice_template_validator",
    "../lib/app/app_transaction_type_map",
    "./validator",
    "../app/einvoice/app_einvoice_plugin_find_implementations",
    "./translator",
    "./string_formatter",
], function (
    error,
    file,
    validate,
    transactionMap,
    Validator,
    plugin,
    translator,
    stringFormatter
) {
    function TemplateValidator() {
        Validator.call(this);
        this.MANDATORY_FIELD_MAP = ["name", "transactionType", "templateContent","tempUnqIdentifier"];
        this.ARRAY_FIELD_MAP = [
            "transactionType",
            "subsidiary",
        ];

        this.XML_FIELD_MAP = ["templateContent"];
        this.XML_FIELD_VALUE = "";
        this.XML = "XML";
        this.JSON = "JSON";
        this.FILE_FIELD_MAP = [
            "templateContent",
        ];
        this.INPUT_FIELD_MAP = [
            "name",
            "tempUnqIdentifier",
            "transactionType",
            "templateContent",
            "customDataSourcePluginImpl",
        ];
        this.ERROR_MESSAGES["trxml"] =
            "Field values are missing. For transaction response template, enter a valid XML.";
        this.ERROR_MESSAGES["xmltemplateRequired"] =
            "Template content is missing for transaction response. Enter valid XML in Outbound Transaction response field, and then try again. ";
        this.ERROR_MESSAGES["filedoesnotexist"] =
            "Files {FIELDS} are missing. Ensure that the files are in the file location.";
        this.ERROR_MESSAGES["cdsPluginImplDoesNotExist"] =
            "Invalid custom data source plug-in implementation ID. Enter a valid ID and try again.";
        this.ERROR_MESSAGES["cdsPluginImplParameterMissing"] =
            "The value for Custom Data Source plug-in implementation is missing in the request.";
        this.ERROR_MESSAGES["fileextension"] =
            "The provided file for Template Content does not have a matching file extension with the Outbound Content Type specified.";
    }
    util.extend(TemplateValidator.prototype, Validator.prototype);
    var TRANSLATION_STRING_ID = "";
    var CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_source";

    TemplateValidator.prototype.isValidFileId = function (jsonInput) {
        var isValid = true;
        var type = "filedoesnotexist";
        var fileIds = [];
        for (var field in this.FILE_FIELD_MAP) {
            if (jsonInput.hasOwnProperty(this.FILE_FIELD_MAP[field])) {
                var fileId = jsonInput[this.FILE_FIELD_MAP[field]];
                if (fileId.trim() !== "") {
                    try {
                        file.load(fileId);
                    } catch (exp) {
                        isValid = false;
                        fileIds.push(fileId);
                    }
                }
            }
        }
        if (!isValid) {
            var ei_file_does_not_exist_translation = translator.getString(
                "ei.file.does.not.exist"
            );
            TRANSLATION_STRING_ID = "ei_file_does_not_exist";
            var params1 = {
                1: fileIds.toString(),
            };
            stringFormatter.setString(ei_file_does_not_exist_translation);
            stringFormatter.replaceParameters(params1);
            ei_file_does_not_exist_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    ei_file_does_not_exist_translation ||
                    (
                        this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type]
                    ).replace("FIELDS", fileIds.toString()),
                translationStringId: TRANSLATION_STRING_ID,
                translationParams: [fileIds.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    TemplateValidator.prototype.isValidTemplateFields = function (jsonInput) {
        var templateString = jsonInput.templateContent;
        var transactionTypes = jsonInput.transactionType;
        var type = "";
        var errorParams;
        var atleastOnePureOutboundIsPresent =
            this.isAtleastOnePureOutboundPresent(transactionTypes); // If user has selected atleast one transaction-type that was just Outbound type.
        if (!templateString) {
            type = "trxml";
            errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    translator.getString("ei.tr.xml.message") ||
                    this.EI_PARAMETER_VALIDATION +
                    " " +
                    this.ERROR_MESSAGES[type],
                translationStringId: "ei_tr_xml_message",
                translationParams: [],
            };
            throw error.create(errorParams);
        } else if (!atleastOnePureOutboundIsPresent) {
            type = "xmltemplateRequired";
            errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    translator.getString("ei.xml.template.required") ||
                    this.EI_PARAMETER_VALIDATION +
                    " " +
                    this.ERROR_MESSAGES[type],
                translationStringId: "ei_xml_template_required",
                translationParams: [],
            };
            throw error.create(errorParams);
        }
        return true;
    };
    TemplateValidator.prototype.isAtleastOnePureOutboundPresent = function (
        transactionTypes
    ) {
        var atleastOnePureOutboundIsPresent = false; // If user has selected atleast one transaction-type that was just Outbound type.
        for (var i = 0; i < transactionTypes.length; i++) {
            if (
                transactionMap.isValidOutboundTransactionType(
                    transactionTypes[i]
                )
            ) {
                atleastOnePureOutboundIsPresent = true;
                break;
            }
        }
        return atleastOnePureOutboundIsPresent;
    };
    // validates if the given ID (customDataSourcePluginImpl) exists
    TemplateValidator.prototype.isValidCustomDataSourcePluginImpl = function (
        jsonInput
    ) {
        var isValid = false;
        var type = "cdsPluginImplDoesNotExist"; //type of validation faliure.
        var cds_plugin_translation = translator.getString(
            "ei.cds.plugin.impl.does.not.exist"
        );
        TRANSLATION_STRING_ID = "ei_cds_plugin_impl_does_not_exist";
        var customDSImplCustPageValue = "";
        if (jsonInput.hasOwnProperty("customDataSourcePluginImpl")) {
            var implId = jsonInput["customDataSourcePluginImpl"];
            log.error(implId)
            if (implId !== "") {
                log.error(implId + "after")
                try {
                    var pluginNames = plugin.findImplementations(
                        CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT
                    );
                    log.error(pluginNames)
                    for (var i = 0; i < pluginNames.length; i++) {
                        if (
                            pluginNames[i].id.toUpperCase() ===
                            implId.toUpperCase()
                        ) {
                            isValid = true;
                            customDSImplCustPageValue = pluginNames[i].name;
                            jsonInput.customDSPluginCustPage =
                                customDSImplCustPageValue;
                            type = "";
                            break;
                        }
                    }
                } catch (exp) {
                    isValid = false;
                    type = "cdsPluginImplDoesNotExist";
                }
            } else {
                isValid = true;
            }
        } else {
            type = "cdsPluginImplParameterMissing";
            cds_plugin_translation = translator.getString(
                "ei.cds.plugin.impl.parameter.missing"
            );
            TRANSLATION_STRING_ID = "ei_cds_plugin_impl_parameter_missing";
        }
        if (!isValid) {
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message: cds_plugin_translation || this.ERROR_MESSAGES[type],
                translationStringId: TRANSLATION_STRING_ID,
                translationParams: [],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };

    TemplateValidator.prototype.validateTemplateInput = function (jsonInput) {
        log.debug("transaction_response_template_validator:validateTemplateInput",jsonInput )
        var isValidInput = this.validateTransResponseInput(jsonInput);
        var isValidFile = this.isValidFileId(jsonInput);
        var isTemplateFieldValid = this.isValidTemplateFields(jsonInput);
        var isValidCustomDSPluginImpl =
            this.isValidCustomDataSourcePluginImpl(jsonInput);
        log.debug("transaction_response_template_validator", "transaction response template validation is done")
        return (
            isValidInput &&
            isValidFile &&
            isTemplateFieldValid &&
            isValidCustomDSPluginImpl);
    };
    return TemplateValidator;
});
