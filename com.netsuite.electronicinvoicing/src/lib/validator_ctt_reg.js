/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["N/runtime", "../app/einvoice/app_einvoice_ctt_manager"], function (
    runtime,
    cttManager
) {
    var FAILED_VALIDATION_MESSAGE = "Validation failed. ";
    var CUSTOM_TRANSACTION_FEATURE = "CUSTOMTRANSACTIONS";
    var DEREGISTER = "DEREGISTER";
    var REQUESTTYPE = "requestType";

    var INPUT_PARAMS = ["tranTypeId", "bundleId", "bundleName"];
    var INPUT_PARAMS_DEREG = [
        "tranTypeId",
        "bundleId",
        "bundleName",
        "requestType",
    ];
    var CTT_NOT_ENABLED =
        "The Custom Transactions feature is not enabled in your account. Enable the feature from Setup > Company > Enable Features, and then try again.";
    var CTT_INPUT_WRONG_PARAM_VAL_ERROR =
        "The value of requestType parameter in the input parameters is invalid.";

    var CTT_WRONG_PARAM_ADDED_ERROR =
        "Invalid parameter (FIELDS). Add a valid parameter and try again.";
    var CTT_INPUT_ERROR =
        "The following mandatory input parameters are either missing or incorrect: (FIELDS)";
    var CTT_INPUT_TXNTYPE_ERROR =
        "The Custom Transaction Type ID (FIELDS) is either invalid or does not exist.";
    var CTT_INPUT_DEREGISTER_TXNTYPE_ERROR =
        "The Custom Transaction Type ID (FIELDS) is either invalid or does not exist or is not registered.";

    var errorCode;
    var errorMessage;
    var finalValidRes = true;
    var isTxnTypeIdInteger = false;
    var missingOrEmptyArg = [];

    function validate(params) {
        try {
            var commonValidations =
                isCustomTransactionFeatureEnabled() &&
                hasValidInputParams(params);
            if (commonValidations) {
                if (params.hasOwnProperty(REQUESTTYPE)) {
                    finalValidRes = isValidForDeRegistration(params);
                } else {
                    finalValidRes = isValidTransactionTypeId(params);
                }
            } else {
                finalValidRes = false;
            }

            return {
                success: finalValidRes,
                errorDetails: {
                    code: errorCode,
                    message: errorMessage,
                },
            };
        } catch (exp) {
            log.error(exp.stack);
            return {
                success: false,
                errorDetails: {
                    code: "EICTTREG_VALIDATION_UNEXPECTED_ERROR",
                    message: FAILED_VALIDATION_MESSAGE + exp.message,
                },
            };
        }
    }

    /* To check if "CUSTOM TRANSACTION" feature is enabled in the target account or not, if not then show error */
    function isCustomTransactionFeatureEnabled() {
        var featureInEffect = runtime.isFeatureInEffect({
            feature: CUSTOM_TRANSACTION_FEATURE,
        });
        if (!featureInEffect) {
            errorCode = "CTTREG_ERROR_CTT_NOT_ENABLED";
            errorMessage = CTT_NOT_ENABLED;
        }

        return featureInEffect;
    }

    /* To validate if all the required parameters are present in the request or not */
    function areAllMandatoryFieldsPresent(params) {
        var isValid = true;
        for (var i in INPUT_PARAMS) {
            if (INPUT_PARAMS[i] in params) {
                if (params[INPUT_PARAMS[i]] === "") {
                    isValid = false;
                    missingOrEmptyArg.push(INPUT_PARAMS[i]);
                }
            } else {
                isValid = false;
                missingOrEmptyArg.push(INPUT_PARAMS[i]);
            }
        }

        return isValid;
    }

    /* To Validate the custom transaction type's value passed in param, if the id is invalid it shows an error */
    function isValidTransactionTypeId(params) {
        var isValid = true;
        var txnTypeId = params.tranTypeId;
        var isCustTransTypIdValid;
        isTxnTypeIdInteger = !isNaN(parseInt(txnTypeId)) ? true : false;
        isCustTransTypIdValid = cttManager.getCTTDetails(txnTypeId).success;
        if (isTxnTypeIdInteger || !isCustTransTypIdValid) {
            isValid = false;
            errorCode = "CTTREG_ERROR_INVALID_PARAMETER";
            errorMessage = CTT_INPUT_TXNTYPE_ERROR.replace("FIELDS", txnTypeId);
        }
        return isValid;
    }

    /* This function is used to check if all parameters used in Input parameters are valid or not */
    function hasValidInputParams(params) {
        var isValid = true;
        var wrongParamsArr = [];
        var paramsLen = Object.keys(params).length;
        if (areAllMandatoryFieldsPresent(params)) {
            if (params.hasOwnProperty(REQUESTTYPE)) {
                if (params.requestType !== DEREGISTER) {
                    isValid = false;
                    errorCode = "CTTDEREG_INVALID_REQUEST_TYP_VAL_ERROR";
                    errorMessage = CTT_INPUT_WRONG_PARAM_VAL_ERROR;
                } else if (paramsLen > 4 && params.requestType === DEREGISTER) {
                    isValid = false;
                    wrongParamsArr = getElements(params);
                    errorCode = "CTTREG_ERROR_INVALID_PARAMETER";
                    errorMessage = CTT_WRONG_PARAM_ADDED_ERROR.replace(
                        "FIELDS",
                        wrongParamsArr.toString()
                    );
                }
            } else if (!params.hasOwnProperty(REQUESTTYPE) && paramsLen >= 4) {
                // for anything apart from bundleId,bundleName,tranTypeId and requestType
                wrongParamsArr = getElements(params);
                isValid = false;
                errorCode = "CTTREG_ERROR_INVALID_PARAMETER";
                errorMessage = CTT_WRONG_PARAM_ADDED_ERROR.replace(
                    "FIELDS",
                    wrongParamsArr.toString()
                );
            }
        } else {
            isValid = false;
            errorCode = "CTTREG_ERROR_INVALID_PARAMETER";
            errorMessage = CTT_INPUT_ERROR.replace(
                "FIELDS",
                missingOrEmptyArg.toString()
            );
        }
        missingOrEmptyArg.length = 0;
        return isValid;
    }

    /* Returns array of invalid parameters used in Input Parameters */
    function getElements(params) {
        var wrongParams = [];
        var inputParamsArr = Object.keys(params);
        inputParamsArr.sort();
        INPUT_PARAMS_DEREG.sort();
        for (var i = 0; i < inputParamsArr.length; i += 1) {
            if (INPUT_PARAMS_DEREG.indexOf(inputParamsArr[i]) == -1) {
                wrongParams.push(inputParamsArr[i]);
            }
        }
        return wrongParams;
    }

    /* To check if the custom transaction type is valid for de registration or not. */
    function isValidForDeRegistration(params) {
        var isValid = true;
        var txnTypeId = params.tranTypeId;
        isTxnTypeIdInteger = !isNaN(parseInt(txnTypeId)) ? true : false;
        var registeredCTTs = cttManager.getRegisteredCTTIntIdArray();
        var isCustTransTypIdValid = cttManager.getCTTDetails(txnTypeId).success;
        var cttInternalId =
            !isTxnTypeIdInteger && isCustTransTypIdValid
                ? cttManager.getInternalIdOfCTTFromStringId(txnTypeId)
                : 0;
        var isCTTRegistered =
            cttInternalId !== 0 &&
            registeredCTTs.indexOf(cttInternalId.toString()) !== -1
                ? true
                : false;

        if (isTxnTypeIdInteger || !isCTTRegistered) {
            isValid = false;
            errorCode = "CTTREG_ERROR_INVALID_PARAMETER";
            errorMessage = CTT_INPUT_DEREGISTER_TXNTYPE_ERROR.replace(
                "FIELDS",
                txnTypeId.toString()
            );
        }
        return isValid;
    }

    return {
        validate: validate,
    };
});
