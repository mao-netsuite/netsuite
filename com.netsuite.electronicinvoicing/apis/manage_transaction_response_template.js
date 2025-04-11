/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    "N/file",
    "../src/data/dao_request",
    "../src/data/dao_tr_template_input",
    "../src/lib/constants",
    "../src/lib/transaction_response_template_validator",
    "N/error",
    "../src/lib/translator",
    "../src/lib/string_formatter",
], function (
    file,
    requestDao,
    trTemplateDao,
    constant,
    validator,
    error,
    translator,
    stringFormatter
) {
    var EI_COMP_FILE_ERROR =
        "Exception caught when opening component file from localization bundle.";
    var EI_LOAD_FILE_ERROR =
        "The electronic invoicing response template file does not exist with the given file ID.";
    var EI_INPUT_ERROR = "Values for the mandatory {FIELDS} are missing.";
    var INPUT_PARAMS = ["fileId", "bundleId", "bundleName"];
    var SUCCESS_MESSAGE = "Response Template creation or update is successful.";
    var FAILURE_MESSAGE = "Response Template creation or update failed.";
    var TRANSLATION_STRING_ID = "",
        TRANSLATION_PARAMS = [];

    function upsertTransResponseTemplate(params) {
        log.debug("manage_transaction_response_template : upsertTransResponseTemplate", params);
        var requestFileContent;
        var requestId;
        var jsonInputObject;
        var rawResponse = "";
        TRANSLATION_STRING_ID = "ei_tr_template_failed_message";
        var upsertTemplateResult = {
            result: constant.Result.FAIL,
            message:
                translator.getString("ei.tr.template.failed.message") ||
                FAILURE_MESSAGE,
            errorReason: "",
            translationStringId: TRANSLATION_STRING_ID,
            translationParams: TRANSLATION_PARAMS,
        };
        try {
            if (isRequestParamCorrect(params)) {
                requestFileContent = getInputFileContents(params);
                requestId = requestDao.create({
                    rawRequest: requestFileContent,
                    origin: params.bundleId + ": " + params.bundleName,
                });
                jsonInputObject = requestDao.getJsonObject(requestId);
                jsonInputObject.templateContent =
                    jsonInputObject.templateContent.replace(
                        "{bundleId}",
                        params.bundleId
                    );


                var validate = new validator();
                if (validate.validateTemplateInput(jsonInputObject)) {
                    rawResponse = trTemplateDao.upsertTransResponseTemplate(jsonInputObject);
                }
                requestDao.updateRawResponse({
                    id: requestId,
                    rawResponse: rawResponse,
                });
                upsertTemplateResult = {
                    result: constant.Result.SUCCESS,
                    message:
                        translator.getString("ei.template.success.message") ||
                        SUCCESS_MESSAGE,
                };
                TRANSLATION_STRING_ID = "ei_template_success_message";
            }
        } catch (exp) {
            var errorParams = "";

            var isErrorExistsInCode = exp.name in constant.ErrorCodes;
            errorParams = {
                code: isErrorExistsInCode ? exp.name : "EI_COMP_FILE_ERROR",
                message: isErrorExistsInCode
                    ? exp.message
                    : (translator.getString("ei.file.open.error") ||
                        EI_COMP_FILE_ERROR) + exp.message,
            };
            log.error("error", exp.message);
            TRANSLATION_STRING_ID =
                isErrorExistsInCode && exp.cause
                    ? exp.cause.translationStringId
                    : "ei_file_open_error";
            TRANSLATION_PARAMS =
                exp.cause && exp.cause.translationParams
                    ? exp.cause.translationParams
                    : [];

            upsertTemplateResult.errorReason = errorParams;
        }
        upsertTemplateResult.translationStringId = TRANSLATION_STRING_ID;
        upsertTemplateResult.translationParams = TRANSLATION_PARAMS;
        return upsertTemplateResult;
    }


    function getInputFileContents(params) {
        var requestFile;
        var requestFileContent = "";
        try {
            requestFile = file.load(params.fileId);
            requestFileContent = requestFile.getContents();
        } catch (exp) {
            var errorParams = {
                name: "EI_LOAD_FILE_ERROR",
                message:
                    translator.getString(
                        "ei.localization.assistant.file.not.found"
                    ) || EI_LOAD_FILE_ERROR,
                translationStringId: "ei_localization_assistant_file_not_found",
                translationParams: [],
            };
            throw error.create(errorParams);
        }
        return requestFileContent;
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
        upsertTransResponseTemplate: upsertTransResponseTemplate,
    };
});
