/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    "../src/app/einvoice/app_einvoice_transaction_type_reg_manager",
    "../src/data/dao_request",
    "../src/lib/validator_ctt_reg",
    "N/runtime",
], function (ttRegManager, requestDao, cttRegReqValidator, runtime) {
    var DEREGISTER = "DEREGISTER";
    var RES_MSG_SUCCESS_REGISTRATION =
        "Registration completed successfully for transaction type";
    var RES_MSG_SUCCESS_DEREGISTRATION =
        "Deregistration completed successfully for transaction type";
    var RES_MSG_FAILED_REGISTRATION =
        "Registration failed for transaction type";
    var RES_MSG_FAILED_DEREGISTRATION =
        "Deregistration failed for transaction type";
    var ERR_CODE_MISSING_PARAMS = "EICTTREG_PARAMS_MISSING";
    var ERR_CODE_CTT_REG_ERROR = "EICTTREG_REGISTRATION_ERROR";
    var ERR_MSG_MISSING_PARAMS = "Request failed. Parameters missing.";

    function registerCustomTranType(params) {
        return invokeRegistrationProcess(params);
    }

    function invokeRegistrationProcess(params) {
        var response = {};
        var logRecId;

        try {
            logRecId = logRequest(params);
            log.debug(
                "CTTREG",
                "Raw request logged, E-Invoicing Request record created, id: ".concat(
                    logRecId
                )
            );

            if (!params) {
                response.success = false;
                response.message = ERR_MSG_MISSING_PARAMS;
                response.errorDetails = {
                    code: ERR_CODE_MISSING_PARAMS,
                    message: ERR_MSG_MISSING_PARAMS,
                };
                logResponse(logRecId, JSON.stringify(response));
                return response;
            }

            log.debug("request params", params);
            var isDeregister = params.requestType === DEREGISTER;
            var validationResult = validateRequest(params);

            if (!validationResult.success) {
                log.debug(
                    "CTTREG",
                    "Registration of ".concat(params.tranTypeId, " failed. ")
                );
                response.success = false;
                var respMessageFailure = isDeregister
                    ? RES_MSG_FAILED_DEREGISTRATION
                    : RES_MSG_FAILED_REGISTRATION;
                response.message =
                    params.tranTypeId == null
                        ? "".concat(respMessageFailure)
                        : ""
                              .concat(respMessageFailure)
                              .concat(" ")
                              .concat(params.tranTypeId);
                response.errorDetails = {
                    code: validationResult.errorDetails.code,
                    message: validationResult.errorDetails.message,
                };
                logResponse(logRecId, JSON.stringify(response));
                return response;
            }

            log.debug(
                "CTTREG",
                "Validations passed, proceeding to register "
                    .concat(params.tranTypeId, ". ")
                    .concat(validationResult.message)
            );
            params.isDeregister = isDeregister;

            //Initiate Registration Process
            var registerResult = ttRegManager.updateRegistration(params);

            if (registerResult.success) {
                var _respMessageSuccess = isDeregister
                    ? RES_MSG_SUCCESS_DEREGISTRATION
                    : RES_MSG_SUCCESS_REGISTRATION;
                log.debug("Transaction Type Printing", params.tranTypeId);
                response.success = true;
                response.message = ""
                    .concat(_respMessageSuccess)
                    .concat(" ")
                    .concat(params.tranTypeId);
            } else {
                var respMessageFailure = isDeregister
                    ? RES_MSG_FAILED_DEREGISTRATION
                    : RES_MSG_FAILED_REGISTRATION;
                response.message =
                    params.tranTypeId == null
                        ? "".concat(respMessageFailure)
                        : ""
                              .concat(respMessageFailure)
                              .concat(" ")
                              .concat(params.tranTypeId);
                response.success = false;
                response.message = ""
                    .concat(respMessageFailure, " ")
                    .concat(params.tranTypeId);
                response.errorDetails = {
                    code: registerResult.errorDetails.code,
                    message: registerResult.errorDetails.message,
                };
            }
        } catch (e) {
            response.success = false;
            response.message = "Request failed for transaction type ".concat(
                params.tranTypeId
            );
            response.errorDetails = {
                code: "EICTTREG_UNEXPECTED_ERROR",
                message: "".concat(e.name, ". ").concat(e.message),
            };
            log.error(
                ERR_CODE_CTT_REG_ERROR,
                "CTT Registration Failed. Error details: "
                    .concat(e.name, ". ")
                    .concat(e.message, ". ")
                    .concat(e.stack)
            );
        }

        logResponse(logRecId, response);
        return response;
    }

    function validateRequest(params) {
        return cttRegReqValidator.validate(params);
    }

    function logRequest(params) {
        var origin = getRequestOrigin(params);
        return requestDao.create({
            rawRequest: JSON.stringify(params),
            origin: origin,
        });
    }

    function logResponse(logRecId, rawResponse) {
        return requestDao.updateRawResponse({
            id: logRecId,
            rawResponse: rawResponse,
        });
    }

    function getRequestOrigin(params) {
        if (!params) return;
        var user = runtime.getCurrentUser();
        var userDetails = "".concat(user.name, " ").concat(user.id);
        var bundleId = params.bundleId ? params.bundleId : "Missing Bundle ID";
        var bundleName = params.bundleName
            ? params.bundleName
            : "Missing Bundle Name";
        return ""
            .concat(bundleId, " | ")
            .concat(bundleName, " | ")
            .concat(userDetails);
    }

    return {
        registerCustomTranType: registerCustomTranType,
        DEREGISTER: DEREGISTER,
    };
});
