/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2015     aalcabasa
 *
 */
define(["N/xml", "N/error", "../../lib/translator"], function (
    xml,
    error,
    translator
) {
    var VALIDATOR_LIST = "recmachcustrecord_psg_ei_temp_validator_parent";
    var FAILED_VALIDATION = "FAILED_E_INVOICE_VALIDATION";
    var REQUIRED_PARAM_MISSING = "REQUIRED_PARAM_MISSING";
    var XML_CONTENT = "1";
    var NODETYPE_TEXT = "TEXT_NODE";
    /** Error Codes from xml validator**/
    var EI_VALIDN_XML_DOES_NOT_CONFORM_TO_SCHEMA =
        "SSS_XML_DOES_NOT_CONFORM_TO_SCHEMA";
    var EI_VALIDN_MISSING_REQD_ARG = "SSS_MISSING_REQD_ARGUMENT";
    var EI_VALIDN_XML_DOM_EXCEPTION = "SSS_XML_DOM_EXCEPTION";
    var EI_VALIDN_INVALID_XML_SCHEMA_OR_DEPENDENCY =
        "SSS_INVALID_XML_SCHEMA_OR_DEPENDENCY";
    var EI_VALIDN_SCHEMA_MISSING_DEPENDENCY_FOLDER_ID =
        "SSS_XML_SCHEMA_MISSING_DEPENDECY_FOLDER_ID";

    var INVALID_XML_SCHEMA_OR_DEPENDENCY_MSG;
    var XML_DOES_NOT_CONFORM_TO_SCHEMA_MSG;
    var XML_DOM_EXCEPTION_MSG;
    var MISSING_REQD_ARGUMENT;
    var XSD_VALIDATION_EXCEPTION;
    var SCHEMA_MISSING_DEPENDENCY_FOLDER_ID;

    function getTranslations(userLocale) {
        if (userLocale) {
            translator.setLocale(userLocale);
        }
        INVALID_XML_SCHEMA_OR_DEPENDENCY_MSG =
            translator.getString("template.invalidschemaordependency") ||
            "Schema is an incorrectly structured XSD or the dependent schema cannot be found.";
        XML_DOES_NOT_CONFORM_TO_SCHEMA_MSG =
            translator.getString("template.xmldoesnotconformtoschema") ||
            "The XML of template does not conform to provided XSD or schema.";
        XML_DOM_EXCEPTION_MSG =
            translator.getString("template.xmldomexception") ||
            "The input XML string is malformed.";
        MISSING_REQD_ARGUMENT =
            translator.getString("template.missingreqdargument") ||
            "The XSD for outbound validation is missing.";
        XSD_VALIDATION_EXCEPTION =
            translator.getString("template.xsdvalidationexception") ||
            "Unknown exception occurred during XSD validation.";
        SCHEMA_MISSING_DEPENDENCY_FOLDER_ID =
            translator.getString("template.xsdmissingdependencyfolder") ||
            "The XSD schema folder is either missing or is invalid.";
    }

    /**
     * validateContent - Validate the transaction's e-Invoice content
     *
     * @params {Number} content - The e-Invoice content
     * @params {Number} template - the e-document template record object.
     * @params {String} locale - user's preferred locale.
     *
     * @throws {Error} REQUIRED_PARAM_MISSING
     * @throws {Error} FAILED_E_INVOICE_VALIDATION
     *
     * @returns {Boolean} true if the generated e-invoice content conforms to the validations.
     * */
    function validateContent(content, template, locale) {
        getTranslations(locale);
        var isValid = true;
        var errorParams;
        if (!content) {
            errorParams = {
                name: REQUIRED_PARAM_MISSING,
                message:
                    "e-Invoice content is a required parameter for validation.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        } else if (!template) {
            errorParams = {
                name: REQUIRED_PARAM_MISSING,
                message:
                    "e-Invoice Template is a required parameter for validating the e-Invoice content.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }
        try {
            var contentType = template.contentType;
            if (contentType === XML_CONTENT) {
                var templateSubLists = template.subLists;
                var validators = templateSubLists
                    ? templateSubLists[VALIDATOR_LIST]
                    : [];
                var xpath;
                var regex;
                var nodes;
                var failures = [];
                var validator;
                var eInvoice = xml.Parser.fromString(content);
                /*** XSD validation ***/
                var xsdFileId = template.outboundXsd;
                var xsdImportFolder = template.outboundXsdFolder;
                if (xsdFileId) {
                    try {
                        xml.validate({
                            xml: eInvoice,
                            xsdFilePathOrId: xsdFileId,
                            importFolderPathOrId: xsdImportFolder,
                        });
                    } catch (e) {
                        log.error(e.name, e.message);
                        var errorMessage;
                        if (e.name === EI_VALIDN_XML_DOES_NOT_CONFORM_TO_SCHEMA)
                            errorMessage =
                                XML_DOES_NOT_CONFORM_TO_SCHEMA_MSG +
                                "\n" +
                                e.message;
                        else if (e.name === EI_VALIDN_MISSING_REQD_ARG)
                            errorMessage =
                                MISSING_REQD_ARGUMENT + "\n" + e.message;
                        else if (e.name === EI_VALIDN_XML_DOM_EXCEPTION)
                            errorMessage =
                                XML_DOM_EXCEPTION_MSG + "\n" + e.message;
                        else if (
                            e.name ===
                            EI_VALIDN_INVALID_XML_SCHEMA_OR_DEPENDENCY
                        )
                            errorMessage =
                                INVALID_XML_SCHEMA_OR_DEPENDENCY_MSG +
                                "\n" +
                                e.message;
                        else if (
                            e.name ===
                            EI_VALIDN_SCHEMA_MISSING_DEPENDENCY_FOLDER_ID
                        )
                            errorMessage =
                                SCHEMA_MISSING_DEPENDENCY_FOLDER_ID +
                                "\n" +
                                e.message;
                        else
                            errorMessage =
                                XSD_VALIDATION_EXCEPTION + "\n" + e.message;
                        throw error.create({
                            name: e.name,
                            message: errorMessage,
                            notifyOff: true,
                        });
                    }
                }
                /*** Regex Validation ***/
                for (var i = 0; i < validators.length; i++) {
                    validator = validators[i];
                    xpath = validator.xPath;
                    regex = validator.regex;
                    nodes = xml.XPath.select({
                        node: eInvoice,
                        xpath: xpath,
                    });
                    if (nodes.length === 0) {
                        failures.push(
                            [xpath, regex, "Node does not exist"].join(" | ")
                        );
                    }
                    var node;
                    for (var j = 0; j < nodes.length; j++) {
                        node = nodes[j];
                        var childNodes = xml.XPath.select({
                            node: node,
                            xpath: "node()",
                        });
                        var childNode;
                        var value = "";
                        for (var k = 0; k < childNodes.length; k++) {
                            childNode = childNodes[k];
                            if (childNode.nodeType === NODETYPE_TEXT) {
                                value = childNode.nodeValue || "";
                                break;
                            }
                        }
                        var isMatched = isRegexMatched(value, regex);
                        if (!isMatched) {
                            failures.push([xpath, regex, value].join(" | "));
                        }
                    }
                }
                if (failures.length > 0) {
                    var failureString = [
                        "XPath | Regular Expression | Value\n",
                        failures.join("\n"),
                    ].join("");
                    var errorMessageFailedValidation = [
                        FAILED_VALIDATION + "\n",
                        failureString,
                    ].join("");
                    log.error(FAILED_VALIDATION, errorMessageFailedValidation);
                    throw error.create({
                        name: FAILED_VALIDATION,
                        message: errorMessageFailedValidation,
                        notifyOff: true,
                    });
                }
            }
        } catch (e) {
            var validationError = e;
            if (validationError.name !== FAILED_VALIDATION) {
                log.error(validationError.name, validationError.message);
                validationError = error.create({
                    name: FAILED_VALIDATION,
                    message: [
                        validationError.name,
                        validationError.message,
                    ].join("\n"),
                    notifyOff: true,
                });
            }
            throw validationError;
        }
        return isValid;
    }

    function isRegexMatched(value, regex) {
        var isMatched = true;
        var pattern;
        var modifier = regex.split("/")[regex.split("/").length - 1];
        if (modifier) {
            var lastIndex = regex.lastIndexOf("/");
            pattern = regex.substring(0, lastIndex + 1); //retrieving something like "/[a-z]/"
            pattern = formatRegexPattern(pattern);
        } else {
            pattern = formatRegexPattern(regex);
        }
        var matches = value.match(new RegExp(pattern, modifier)) || [];
        if (matches.length === 0) {
            isMatched = false;
        }
        return isMatched;
    }

    /*
     * Removes backslashes at the beginning and end of the pattern
     * The output will be used as a parameter for RegExp()
     * */
    function formatRegexPattern(pattern) {
        var firstChar = pattern.charAt(0);
        var lastChar = pattern.charAt(pattern.length - 1);
        if (firstChar === "/" && lastChar === "/") {
            pattern = pattern.substring(1, pattern.length - 1);
        }
        return pattern;
    }

    return {
        validateContent: validateContent,
    };
});
