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
        this.MANDATORY_FIELD_MAP = ["name", "edocPackage", "transactionType"];
        this.ARRAY_FIELD_MAP = [
            "transactionType",
            "xpath",
            "regex",
            "lockTxnOnStatus",
            "subsidiary",
        ];
        this.REGEX_FORMAT = "regex";
        this.OUTBOUND_CONTENT_TYPE_KEY = "outboundContentType";
        this.LOCK_TXN_ON_STATUS = "lockTxnOnStatus";
        this.XPATH = "xpath";
        this.XML_FIELD_MAP = ["templateContent"];
        this.XML_FIELD_VALUE = "";
        this.VALID_STATUSES = ["3", "7", "10", "20"];
        this.VALID_OUTBOUND_CONTENT_TYPES = ["XML", "JSON"];
        this.XML = "XML";
        this.JSON = "JSON";
        this.FILE_FIELD_MAP = [
            "templateXsd",
            "outboundXsd",
            "templateContent",
            "fieldMappingInboundEdoc",
        ];
        this.INPUT_FIELD_MAP = [
            "name",
            "description",
            "edocDescription",
            "transactionType",
            "edocPackage",
            "templateContent",
            "templateXsd",
            "outboundXsd",
            "fieldMappingInboundEdoc",
            "xpath",
            "regex",
            "lockTxnOnStatus",
            "customDataSourcePluginImpl",
        ];
        this.ERROR_MESSAGES["xmlType"] = "The xml is not well formed";
        this.ERROR_MESSAGES["regex"] =
            "Regex field has invalid value {FIELDS}. Enter a valid value and try again.";
        this.ERROR_MESSAGES["xmlorjson"] =
            "Field values are missing. For outbound transaction, enter a valid XML or JSON value in the Outbound E-Document field in the template. For inbound transaction, enter a JSON value in the Field Mapping for Inbound E-Document field in the template.";
        this.ERROR_MESSAGES["xmltemplateRequired"] =
            "Template content is missing for outbound transaction. Enter valid XML or JSON template content in the Outbound E-Documents field, and then try again. ";
        this.ERROR_MESSAGES["xsdvalid"] =
            "Select a valid XSD file and then try again. Ensure that you select a file with .xsd extension.";
        this.ERROR_MESSAGES["filedoesnotexist"] =
            "Files {FIELDS} are missing. Ensure that the files are in the file location.";
        this.ERROR_MESSAGES["validators"] =
            "Validators (regex or xpath) are missing.";
        this.ERROR_MESSAGES["validatestatus"] =
            "The Status value is not supported. Enter a valid value and then try again.";
        this.ERROR_MESSAGES["cdsPluginImplDoesNotExist"] =
            "Invalid custom data source plug-in implementation ID. Enter a valid ID and try again.";
        this.ERROR_MESSAGES["cdsPluginImplParameterMissing"] =
            "The value for Custom Data Source plug-in implementation is missing in the request.";
        this.ERROR_MESSAGES["inboundCdsPluginImplDoesNotExist"] =
            "Invalid ID for Inbound Custom Data Source Plug-in Implementation. Enter a valid ID and try again.";
        this.ERROR_MESSAGES["digSignPluginImplDoesNotExist"] =
            "Invalid ID for Digital Signature Plug-in Implementation. Enter a valid ID and then try again.";
        this.ERROR_MESSAGES["fileextension"] =
            "The provided file for Template Content does not have a matching file extension with the Outbound Content Type specified.";
        this.ERROR_MESSAGES["outboundcontenttype"] =
            "Enter a valid value in the outboundContentType key and then try again.";
        this.ERROR_MESSAGES["outboundValidationPluginImplDoesNotExist"] =
            "Invalid ID for Outbound Validation Plug-in Implementation. Enter a valid ID and then try again.";
    }
    util.extend(TemplateValidator.prototype, Validator.prototype);
    var TRANSLATION_STRING_ID = "";
    var CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_source";
    var INBOUND_CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT =
        "customscript_ei_pl_inject_data_inbound";
    var DIGITAL_SIGN_PLUGIN_TYPE_ID = "customscript_ei_pl_digital_signature";
    var OUTBOUND_VALIDATION_PLUGIN_TYPE_ID =
        "customscript_ei_pl_outbound_validation";
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
    TemplateValidator.prototype.isValidRegex = function (jsonInput) {
        var type = "regex";
        if (jsonInput.hasOwnProperty(this.REGEX_FORMAT)) {
            var regexExps = jsonInput[this.REGEX_FORMAT];
            for (var i in regexExps) {
                if (regexExps[i].trim() !== "") {
                    var result = validate.isValidRegEx(regexExps[i]);
                    if (!result.isValid()) {
                        var ei_template_regex_translation =
                            translator.getString("ei.template.incorrect");
                        TRANSLATION_STRING_ID = "ei_template_incorrect";
                        var params1 = {
                            1: regexExps[i],
                        };
                        stringFormatter.setString(
                            ei_template_regex_translation
                        );
                        stringFormatter.replaceParameters(params1);
                        ei_template_regex_translation =
                            stringFormatter.toString();
                        var errorParams = {
                            name: "EI_PARAMETER_VALIDATION",
                            message:
                                ei_template_regex_translation ||
                                this.ERROR_MESSAGES[type].replace(
                                    "FIELDS",
                                    regexExps[i]
                                ),
                            translationStringId: TRANSLATION_STRING_ID,
                            translationParams: [regexExps[i]],
                        };
                        throw error.create(errorParams);
                    }
                }
            }
        }
        return true;
    };
    TemplateValidator.prototype.isValidStatusForLockingTransaction = function (
        jsonInput
    ) {
        var isValid = true;
        var type = "validatestatus";
        var invalidStatuses = [];
        if (jsonInput.hasOwnProperty(this.LOCK_TXN_ON_STATUS)) {
            var statuses = jsonInput[this.LOCK_TXN_ON_STATUS];
            for (var i in statuses) {
                if (this.VALID_STATUSES.indexOf(statuses[i]) === -1) {
                    isValid = false;
                    invalidStatuses.push(statuses[i]);
                }
            }
        }
        if (!isValid) {
            var ei_validation_status_translation = translator.getString(
                "ei.template.validation.status"
            );
            TRANSLATION_STRING_ID = "ei_template_validation_status";
            var params1 = {
                1: invalidStatuses.toString(),
            };
            stringFormatter.setString(ei_validation_status_translation);
            stringFormatter.replaceParameters(params1);
            ei_validation_status_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    ei_validation_status_translation ||
                    (
                        this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type]
                    ).replace("STATUS", invalidStatuses.toString()),
                translationStringId: TRANSLATION_STRING_ID,
                translationParams: [invalidStatuses.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };
    TemplateValidator.prototype.isValidValidators = function (jsonInput) {
        var type = "validators";
        if (
            jsonInput.hasOwnProperty(this.REGEX_FORMAT) &&
            jsonInput.hasOwnProperty(this.XPATH)
        ) {
            var regexExps = jsonInput[this.REGEX_FORMAT];
            var xpaths = jsonInput[this.XPATH];
            if (regexExps.length !== xpaths.length) {
                var errorParams = {
                    name: "EI_PARAMETER_VALIDATION",
                    message:
                        translator.getString("ei.template.validator.missing") ||
                        this.EI_PARAMETER_VALIDATION +
                            " " +
                            this.ERROR_MESSAGES[type],
                    translationStringId: "ei_template_validator_missing",
                    translationParams: [],
                };
                throw error.create(errorParams);
            }
        }
        return true;
    };
    TemplateValidator.prototype.isValidTemplateFields = function (jsonInput) {
        var templateString = jsonInput.templateContent;
        var mapping = jsonInput.fieldMappingInboundEdoc;
        var transactionTypes = jsonInput.transactionType;
        var type = "";
        var errorParams;
        var inboundXSDFilename = this.getXSDFilename(jsonInput.templateXsd);
        var outboundXSDFilename = this.getXSDFilename(jsonInput.outboundXsd);
        var atleastOnePureOutboundIsPresent =
            this.isAtleastOnePureOutboundPresent(transactionTypes); // If user has selected atleast one transaction-type that was just Outbound type.
        if (!templateString && !mapping) {
            type = "xmlorjson";
            errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    translator.getString("ei.xml.json.message") ||
                    this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type],
                translationStringId: "ei_xml_json_message",
                translationParams: [],
            };
            throw error.create(errorParams);
        } else if (!templateString && atleastOnePureOutboundIsPresent) {
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
        } else {
            this.validateXSDFile(inboundXSDFilename);
            this.validateXSDFile(outboundXSDFilename);
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
                ) &&
                !transactionMap.isValidInboundTransactionType(
                    transactionTypes[i]
                )
            ) {
                atleastOnePureOutboundIsPresent = true;
                break;
            }
        }
        return atleastOnePureOutboundIsPresent;
    };
    TemplateValidator.prototype.isAtleastOneBothboundPresent = function (
        transactionTypes
    ) {
        var atleastOneBothboundIsPresent = false; // If user has selected atleast one transaction-type that was Outbound type as well as inbound type.
        for (var i = 0; i < transactionTypes.length; i++) {
            if (
                transactionMap.isValidOutboundTransactionType(
                    transactionTypes[i]
                ) &&
                transactionMap.isValidInboundTransactionType(
                    transactionTypes[i]
                )
            ) {
                atleastOneBothboundIsPresent = true;
                break;
            }
        }
        return atleastOneBothboundIsPresent;
    };
    TemplateValidator.prototype.getXSDFilename = function (xsd) {
        if (xsd) {
            var xsdFile = file.load({
                id: xsd,
            });
            return xsdFile.name;
        }
        return null;
    };
    TemplateValidator.prototype.validateXSDFile = function (xsdFilename) {
        var xsdFileFormat = /.xsd$/i;
        if (xsdFilename && !xsdFileFormat.test(xsdFilename)) {
            var type = "xsdvalid";
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    translator.getString("ei.xsd.valid") ||
                    this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type],
                translationStringId: "ei_xsd_valid",
                translationParams: [],
            };
            throw error.create(errorParams);
        }
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
            if (implId !== "") {
                try {
                    var pluginNames = plugin.findImplementations(
                        CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT
                    );
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
    // validates if the given ID (inboundCustomDataSourcePluginImpl) exists
    TemplateValidator.prototype.isValidInboundCustomDataSourcePluginImpl =
        function (jsonInput) {
            var isValid = false;
            var type = "inboundCdsPluginImplDoesNotExist"; //type of validation failure.
            var inboundCustomDSImplCustPageValue = "";
            if (jsonInput.hasOwnProperty("inboundCustomDataSourcePluginImpl")) {
                var implId = jsonInput["inboundCustomDataSourcePluginImpl"];
                if (implId !== "") {
                    var pluginNames = plugin.findImplementations(
                        INBOUND_CUSTOM_DATA_SOURCE_PLUGIN_DEFAULT
                    );
                    for (var i = 0; i < pluginNames.length; i++) {
                        if (
                            pluginNames[i].id.toUpperCase() ===
                            implId.toUpperCase()
                        ) {
                            isValid = true;
                            inboundCustomDSImplCustPageValue =
                                pluginNames[i].name;
                            jsonInput.inboundCustomDSPluginCustPage =
                                inboundCustomDSImplCustPageValue;
                            type = "";
                            break;
                        }
                    }
                    if (!isValid) {
                        var errorParams = {
                            name: "EI_PARAMETER_VALIDATION",
                            message:
                                translator.getString(
                                    "ei.inbound.cds.plugin.impl.does.not.exist"
                                ) || this.ERROR_MESSAGES[type],
                            translationStringId:
                                "ei_inbound_cds_plugin_impl_does_not_exist",
                            translationParams: [],
                        };
                        throw error.create(errorParams);
                    }
                } else {
                    isValid = true;
                }
            } else {
                isValid = true;
            }
            return isValid;
        };
    TemplateValidator.prototype.isValidDigitalSignPluginImpl = function (
        jsonInput
    ) {
        var isValid = false;
        var type = "digSignPluginImplDoesNotExist"; //type of validation faliure.
        var digSignImplCustPageValue = "";
        if (jsonInput.hasOwnProperty("digitalSignPluginImpl")) {
            var implId = jsonInput["digitalSignPluginImpl"];
            if (implId !== "") {
                var pluginNames = plugin.findImplementations(
                    DIGITAL_SIGN_PLUGIN_TYPE_ID
                );
                for (var i = 0; i < pluginNames.length; i++) {
                    if (
                        pluginNames[i].id.toUpperCase() === implId.toUpperCase()
                    ) {
                        isValid = true;
                        digSignImplCustPageValue = pluginNames[i].name;
                        jsonInput.digSignImplCustPageValue =
                            digSignImplCustPageValue;
                        type = "";
                        break;
                    }
                }
                if (!isValid) {
                    var errorParams = {
                        name: "EI_PARAMETER_VALIDATION",
                        message:
                            translator.getString(
                                "ei.dig.sign.plugin.impl.does.not.exist"
                            ) || this.ERROR_MESSAGES[type],
                        translationStringId:
                            "ei_dig_sign_plugin_impl_does_not_exist",
                        translationParams: [],
                    };
                    throw error.create(errorParams);
                }
            } else {
                isValid = true;
            }
        } else {
            isValid = true;
        }
        return isValid;
    };
    //validates if the given ID (OutboundValidationPluginImpl) exists
    TemplateValidator.prototype.isValidOutboundValidationPluginImpl = function (
        jsonInput
    ) {
        var isValid = false;
        var type = "outboundValidationPluginImplDoesNotExist"; //type of validation faliure.
        var outboundValidationImplCustPageValue = "";
        if (jsonInput.hasOwnProperty("outboundValidationPluginImpl")) {
            var implId = jsonInput["outboundValidationPluginImpl"];
            if (implId !== "") {
                var pluginNames = plugin.findImplementations(
                    OUTBOUND_VALIDATION_PLUGIN_TYPE_ID
                );
                for (var i = 0; i < pluginNames.length; i++) {
                    if (
                        pluginNames[i].id.toUpperCase() === implId.toUpperCase()
                    ) {
                        isValid = true;
                        outboundValidationImplCustPageValue =
                            pluginNames[i].name;
                        jsonInput.outboundValidationImplCustPageValue =
                            outboundValidationImplCustPageValue;
                        type = "";
                        break;
                    }
                }
                if (!isValid) {
                    var errorParams = {
                        name: "EI_PARAMETER_VALIDATION",
                        message:
                            translator.getString(
                                "ei.outbound.cds.plugin.impl.does.not.exist"
                            ) || this.ERROR_MESSAGES[type],
                        translationStringId:
                            "ei_outbound_cds_plugin_impl_does_not_exist",
                        translationParams: [],
                    };
                    throw error.create(errorParams);
                }
            } else {
                isValid = true;
            }
        } else {
            isValid = true;
        }
        return isValid;
    };
    //returns true only if jsonInput.outboundContentType is either XML or JSON.  Empty value or absent key is already preprocessed to be 'XML'
    TemplateValidator.prototype.isOutboundContentTypeValid = function (
        jsonInput
    ) {
        var isValid = true;
        var type = "outboundcontenttype";
        var outboundContentType =
            jsonInput[this.OUTBOUND_CONTENT_TYPE_KEY].toUpperCase();
        if (
            this.VALID_OUTBOUND_CONTENT_TYPES.indexOf(
                outboundContentType.trim()
            ) === -1
        ) {
            isValid = false;
        }
        if (!isValid) {
            var errorParams = {
                name: "EI_PARAMETER_VALIDATION",
                message:
                    translator.getString("ei.outbound.content.parameter") ||
                    this.EI_PARAMETER_VALIDATION +
                        " " +
                        this.ERROR_MESSAGES[type],
                translationStringId: "ei_outbound_content_parameter",
                translationParams: [],
            };
            throw error.create(errorParams);
        }
        return isValid;
    };
    TemplateValidator.prototype.validateTemplateInput = function (jsonInput) {
        var isValidInput = this.validateInput(jsonInput);
        var isValidFile = this.isValidFileId(jsonInput);
        var isOutboundContentTypeValid =
            this.isOutboundContentTypeValid(jsonInput);
        var isTemplateFieldValid = this.isValidTemplateFields(jsonInput);
        var isValidStatusForLock =
            this.isValidStatusForLockingTransaction(jsonInput);
        var isValidCustomDSPluginImpl =
            this.isValidCustomDataSourcePluginImpl(jsonInput);
        var isValidDigitalSignPluginImpl =
            this.isValidDigitalSignPluginImpl(jsonInput);
        var isValidOutboundValidationPluginImpl =
            this.isValidOutboundValidationPluginImpl(jsonInput);
        var isValidInboundCustomDSPluginImpl =
            this.isValidInboundCustomDataSourcePluginImpl(jsonInput);
        var xmlValidatorsNotApplicable = false;
        var xmlValidatorsAreValid = false;
        if (jsonInput.outboundContentType === this.XML) {
            var isValidatorsValid = this.isValidValidators(jsonInput);
            var isRegexValid = this.isValidRegex(jsonInput);
            xmlValidatorsAreValid = isValidatorsValid && isRegexValid;
        } else {
            xmlValidatorsNotApplicable = true;
        }
        return (
            isValidInput &&
            isValidFile &&
            isOutboundContentTypeValid &&
            isTemplateFieldValid &&
            isValidStatusForLock &&
            isValidCustomDSPluginImpl &&
            isValidInboundCustomDSPluginImpl &&
            isValidDigitalSignPluginImpl &&
            isValidOutboundValidationPluginImpl &&
            (xmlValidatorsAreValid || xmlValidatorsNotApplicable)
        );
    };
    return TemplateValidator;
});
