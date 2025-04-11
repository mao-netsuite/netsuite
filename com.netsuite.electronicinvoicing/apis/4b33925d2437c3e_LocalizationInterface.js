/**
 * Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    "N/file",
    "./manage_templates",
    "./manage_sending_methods",
    "./manage_transaction_response_template",
    "../src/lib/constants",
    "../src/lib/translator",
    "../src/lib/string_formatter",
    "N/error",
], function (
    file,
    manage_templates,
    manage_sending_methods,
    manage_transaction_response_template,
    constant,
    translator,
    stringFormatter,
    error
) {
    var EI_LOAD_FILE_ERROR;
    var EI_EMPTY_COMPONENT_ERROR;
    var EI_INVALID_COMPONENT_ERROR;
    var EI_COMP_FILE_ERROR =
        "Exception caught when opening component file from localization bundle.";
    var EI_INPUT_ERROR = "Values for the mandatory {FIELDS} are missing.";
    var INPUT_PARAMS = ["fileId", "requesterAppId", "requesterAppName"];
    var TRANSLATION_COLLECTION_ID = "custcollection_ei_translations";
    var TRANSLATION_STRING_ID = "",
        TRANSLATION_PARAMS = [];
    /**
     * @returns will return bundle name
     */
    function getBundleName() {
        return { acronym: "EI", fullName: "Electronic Invoicing" };
    }

    /**
     * @returns {SUCCESS: 0/1/2, MESSAGE: error/warning,ISSYNCHRONOUS:true/false }
     */
    function createComponent(params) {
        return upsertTemplate(params);
    }

    /**
     * @returns {SUCCESS: 0/1/2, MESSAGE: error/warning,ISSYNCHRONOUS:true/false }
     */
    function updateComponent(params) {
        return upsertTemplate(params);
    }

    function upsertTemplate(params) {
        var response = {},
            component = "",
            message = "";
        var localizationResponse = {
            SUCCESS: constant.Result.FAIL,
            MESSAGE: {
                translation: {
                    collectionId: TRANSLATION_COLLECTION_ID,
                    stringId: TRANSLATION_STRING_ID,
                    params: TRANSLATION_PARAMS,
                },
            },
            ISSYNCHRONOUS: true,
        };
        try {
            if (isRequestParamCorrect(params)) {
                var paramsForTemplate = {
                    fileId: params.fileId,
                    bundleId: params.requesterAppId,
                    bundleName: params.requesterAppName,
                };
                try {
                    var requestFile = file.load(params.fileId);
                    var requestFileContent = requestFile.getContents();
                } catch (exp) {
                    EI_LOAD_FILE_ERROR = translator.getString(
                        "ei.localization.assistant.file.not.found"
                    );
                    TRANSLATION_STRING_ID =
                        "ei_localization_assistant_file_not_found";
                    var invalidFileResponse = {
                        SUCCESS: constant.Result.FAIL,
                        MESSAGE: {
                            translation: {
                                collectionId: TRANSLATION_COLLECTION_ID,
                                stringId: TRANSLATION_STRING_ID,
                                params: TRANSLATION_PARAMS,
                            },
                        },
                        ISSYNCHRONOUS: true,
                    };
                    return invalidFileResponse;
                }
                var requestFileObj = JSON.parse(requestFileContent);
                component = requestFileObj.component;
                if (component === "Template") {
                    response =
                        manage_templates.upsertTemplate(paramsForTemplate);
                } else if (component === "SendingMethod") {
                    response =
                        manage_sending_methods.upsertSendingMethod(
                            paramsForTemplate
                        );
                } else if (component === "TransactionResponseTemplate") {
                    response =
                        manage_transaction_response_template.upsertTransResponseTemplate(
                            paramsForTemplate
                        );
                }
                else {
                    var componentInvalidMessage = "";
                    if (!component) {
                        EI_EMPTY_COMPONENT_ERROR = translator.getString(
                            "ei.localization.assistant.empty.component"
                        );
                        componentInvalidMessage = EI_EMPTY_COMPONENT_ERROR;
                        TRANSLATION_STRING_ID =
                            "ei_localization_assistant_empty_component";
                    } else {
                        EI_INVALID_COMPONENT_ERROR = translator.getString(
                            "ei.localization.assistant.invalid.component"
                        );
                        componentInvalidMessage = EI_INVALID_COMPONENT_ERROR;
                        TRANSLATION_STRING_ID =
                            "ei_localization_assistant_invalid_component";
                    }
                    var componentInvalidResponse = {
                        SUCCESS: constant.Result.FAIL,
                        MESSAGE: {
                            translation: {
                                collectionId: TRANSLATION_COLLECTION_ID,
                                stringId: TRANSLATION_STRING_ID,
                                params: TRANSLATION_PARAMS,
                            },
                        },
                        ISSYNCHRONOUS: true,
                    };
                    return componentInvalidResponse;
                }
                if (response.result === constant.Result.SUCCESS) {
                    message = response.message;
                    TRANSLATION_STRING_ID = response.translationStringId;
                    TRANSLATION_PARAMS = response.translationParams;
                } else if (response.errorReason) {
                    message = response.errorReason.message;
                    TRANSLATION_STRING_ID = response.translationStringId;
                    TRANSLATION_PARAMS = response.translationParams;
                }
            }
        } catch (exp) {
            response.result = constant.Result.FAIL;
            var isErrorExistsInCode = exp.name in constant.ErrorCodes;
            message = isErrorExistsInCode
                ? exp.message
                : (translator.getString("ei.file.open.error") ||
                    EI_COMP_FILE_ERROR) + exp.message;
            log.error("error", exp.message);
            TRANSLATION_STRING_ID =
                isErrorExistsInCode && exp.cause
                    ? exp.cause.translationStringId
                    : "ei_file_open_error";
            TRANSLATION_PARAMS =
                exp.cause && exp.cause.translationParams
                    ? exp.cause.translationParams
                    : [];
        }
        var localizationResponse = {
            SUCCESS: response.result,
            MESSAGE: {
                translation: {
                    collectionId: TRANSLATION_COLLECTION_ID,
                    stringId: TRANSLATION_STRING_ID,
                    params: TRANSLATION_PARAMS,
                },
            },
            ISSYNCHRONOUS: true,
        };
        return localizationResponse;
    }

    /**
     * for asynchorous result from create method, we will use this method
     * @returns {SUCCESS: 0/1/2, MESSAGE: error/warning }
     */
    function getStatus(params) {
        var defaultResponse = { SUCCESS: "", MESSAGE: "" };
        return defaultResponse;
    }

    /**
     * @returns {SUCCESS: 0/1/2, MESSAGE: error/warning }
     */
    function inactivateComponent(params) {
        var defaultResponse = { SUCCESS: "", MESSAGE: "" };
        return defaultResponse;
    }

    function isRequestParamCorrect(params) {
        var isValid = true;
        var missingArg = [];
        for (var i in INPUT_PARAMS) {
            if (INPUT_PARAMS[i] in params) {
                if (params[INPUT_PARAMS[i]] === "") {
                    isValid = false;
                    missingArg.push(INPUT_PARAMS[i]);
                }
            } else {
                isValid = false;
                missingArg.push(INPUT_PARAMS[i]);
            }
        }
        if (!isValid) {
            var ei_input_error_translation = translator.getString(
                "ei.input.parameter.missing"
            );
            var params1 = {
                1: missingArg.toString(),
            };
            stringFormatter.setString(ei_input_error_translation);
            stringFormatter.replaceParameters(params1);
            ei_input_error_translation = stringFormatter.toString();
            var errorParams = {
                name: "EI_INPUT_ERROR",
                message:
                    ei_input_error_translation ||
                    EI_INPUT_ERROR.replace("FIELDS", missingArg.toString()),
                translationStringId: "ei_input_parameter_missing",
                translationParams: [missingArg.toString()],
            };
            throw error.create(errorParams);
        }
        return isValid;
    }

    return {
        getBundleName: getBundleName,
        createComponent: createComponent,
        updateComponent: updateComponent,
        getStatus: getStatus,
        inactivateComponent: inactivateComponent,
    };
});
