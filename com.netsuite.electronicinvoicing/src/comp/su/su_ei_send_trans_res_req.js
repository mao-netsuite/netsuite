/**
 * @NApiVersion 2.x
 * @NModuleScope public
 * @NScriptName Send Transaction Response SU
 * @NScriptId _psg_ei_send_trans_res_su
 * @NScriptType suitelet
 */
define([
    "../../app/einvoice/app_einvoice_obn_caller",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "../../app/einvoice/app_einvoice_transaction_response_helper",
    "../../data/dao_audit_trail",
    "../../lib/utils",
    "../../lib/constants",
    "N/runtime",
    "N/search",
    "N/record",
    "N/error",
    "../../lib/constants/main_constants",
    "../../lib/constants/list_values",
    "../../lib/constants/message_translations_map",
    "../../lib/constants/record_fields",
    "../../lib/constants/record_instances",
    "../../app/einvoice/app_einvoice_sending_manager",
    "../../app/einvoice/app_einvoice_sending_plugin_manager",
    "../../lib/app/app_transaction_type_map",
], function (
    obnCaller,
    subsidiaryPrefGetter,
    trHelper,
    daoAuditTrail,
    utils,
    constants,
    runtime,
    search,
    record,
    error,
    mainConstants,
    listValues,
    messageTranslationMap,
    recordFields,
    recordInstances,
    sendingMgr,
    pluginMgr,
    appTransMap
) {
    // Record Types
    var TRANS_RES = mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE;
    var TRANS_RES_TYPE = mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;

    // Custom Lists
    var TRANSACTION_RESPONSE_STATUS_LIST_TYPE =
        mainConstants.CUSTOM_LISTS.TRANSACTION_RESPONSE_STATUS;
    var EDOC_STATUS_LIST = mainConstants.CUSTOM_LISTS.EDOC_STATUS_LIST;
    var AUDIT_TRAIL_LIST = mainConstants.CUSTOM_LISTS.AUDIT_TRAIL_LIST;

    // List Values
    var PROCESSING_STATUS =
        listValues[TRANSACTION_RESPONSE_STATUS_LIST_TYPE].PROCESSING;
    var SENT_STATUS = listValues[TRANSACTION_RESPONSE_STATUS_LIST_TYPE].SENT;
    var SEND_FAILED_STATUS =
        listValues[TRANSACTION_RESPONSE_STATUS_LIST_TYPE].SENDING_FAILED;
    var CANCELLATION_IN_PROGRESS_EDOC_STATUS =
        listValues[EDOC_STATUS_LIST].CANCELLATION_IN_PROGRESS_EDOC_STATUS;
    var REJECTION_IN_PROGRESS_EDOC_STATUS =
        listValues[EDOC_STATUS_LIST].REJECTION_IN_PROGRESS_EDOC_STATUS;
    var CANCELLATION_IN_PROGRESS_AUDIT_TRAIL_EVENT =
        listValues[AUDIT_TRAIL_LIST].CANCELLATION_IN_PROGRESS_AUDIT_TRAIL_EVENT;
    var REJECTION_IN_PROGRESS_ADUIT_TRAIL_EVENT =
        listValues[AUDIT_TRAIL_LIST].REJECTED_IN_PROGRESS_AUDIT_TRAIL_EVENT;

    //ERROR Codes
    var ERR_CODES = messageTranslationMap.ERR_CODES;
    var ERR_CODE_OBJ_TRANS_RESP_NOT_FOUND =
        ERR_CODES.ERR_CODE_TRANS_RES_RECORD_MISSING;

    //Record Fields
    var ERROR_CODE_FLD_ID = recordFields[TRANS_RES].ERR_CODE;
    var ERROR_MSG_FLD_ID = recordFields[TRANS_RES].ERR_MSG;
    var RESPONSE_STATUS_FLD_ID = recordFields[TRANS_RES].RESPONSE_STATUS;
    var OBN_DOC_ID_FLD_ID = recordFields[TRANS_RES].OBN_DOC_ID;
    var RESPONSE_BODY = recordFields[TRANS_RES].RESPONSE_BODY;

    //Miscellaneous Constants
    var CODES = constants.ResultCodes;
    var ERR_CODE_VAL = CODES.ERR_CODE;
    var ERR_MSG_VAL = CODES.ERR_MSG;
    var ERR_CODE_SEND_FAILED = CODES.ERR_CODE_SEND_FAILED;
    var MISC_CODES = constants.TransactionResponseConstants;
    var SUCCESS = MISC_CODES.SUCCESS;
    var MESSAGE = MISC_CODES.MESSAGE;
    var EI_STATUS = MISC_CODES.EI_STATUS;
    var EVENT_TYPE = MISC_CODES.EVENT_TYPE;
    var EDOC_STATUS = MISC_CODES.EDOC_STATUS;
    var FIELDS_FOR_UPDATE = MISC_CODES.FIELDS_FOR_UPDATE;
    var OBN_DOC_ID_SCRIPT_ID = MISC_CODES.OBN_DOC_ID_SCRIPT_ID;

    //Record Instances
    var FOR_CANCELLATION = recordInstances[TRANS_RES_TYPE].FOR_CANCELLATION;
    var FOR_REJECTION = recordInstances[TRANS_RES_TYPE].FOR_REJECTION;

    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        log.debug("SEND TR SU: parameters", parameters);
        var result = {};

        var transResId = parameters.transRespId;
        if (!transResId) {
            handleTRNotFoundError();
        } else {
            var isAvalara = parameters.avalaraMandate ? true : false;
            var responseType = parameters.transRespType;
            var responseBody = getResponseBody(transResId);
            if (isAvalara) {
                result = executeAvalaraTRSending(
                    parameters,
                    transResId,
                    responseBody,
                    responseType
                );
            } else {
                result = executeNonAvalaraTRSending(
                    parameters,
                    transResId,
                    responseBody
                );
            }
            response.write(JSON.stringify(result));
        }
    }

    /**
     * This function executes the operation of sending transaction response for Avalara users
     * @param {*} parameters
     * @param {*} transResId
     * @param {*} responseBody
     * @param {*} responseType
     * @returns {Object} result
     */

    function executeAvalaraTRSending(
        parameters,
        transResId,
        responseBody,
        responseType
    ) {
        var result = {};
        var obnDocId = null;
        var validatedDataToBeSent = validateAndReturnDataToSendForAvalara(
            parameters,
            responseBody,
            transResId
        );
        if (
            validatedDataToBeSent.validationResult &&
            validatedDataToBeSent.validationResult.isValidToSend
        ) {
            result = obnCaller.sendToOBN(validatedDataToBeSent.plugInContext);
            if (result[SUCCESS]) {
                obnDocId = getObnDocId(result);
                handleSendSuccess(transResId, obnDocId);
                recordAuditTrailAndUpdateEdocStatus(responseType, result);
            } else {
                handleSendFailed(transResId, result);
            }
        } else {
            handleValidationFailure(
                validatedDataToBeSent.validationResult,
                transResId
            );
            result = { SUCCESS: false };
        }
        return result;
    }

    /**
     * This function executes the operation of sending transaction response for Non Avalara users
     * @param {*} parameters
     * @param {*} transResId
     * @param {*} responseBody
     * @returns {Object} result
     */
    function executeNonAvalaraTRSending(parameters, transResId, responseBody) {
        var result = { success: false };
        var validatedDataToBeSent = validateAndReturnDataToSendForNonAvalara(
            parameters,
            responseBody,
            transResId
        );
        if (validatedDataToBeSent.sendMethodId) {
            log.debug("pluginContext after validation", validatedDataToBeSent);
            try {
                result = pluginMgr.runPlugin(validatedDataToBeSent, false);
                handleSendSuccess(transResId, "");
            } catch (err) {
                handleSendFailed(transResId, err);
            }
        }

        return result;
    }

    /**
     * This function validates the data received for sending and then return it to the calling
     * function to send it for Non Avalara users.
     * @param {*} parameters
     * @param {*} responseBody
     * @param {*} transResId
     * @returns {Object} plugInContext
     */
    function validateAndReturnDataToSendForNonAvalara(
        parameters,
        responseBody,
        transResId
    ) {
        log.debug(
            "validateAndReturnDataToSendForNonAvalara Params" +
                parameters +
                "responseBody " +
                responseBody +
                "transResId" +
                transResId
        );

        var plugInContext = {};
        var transactionId = parameters.transRespTranId;
        var transType = parameters.tranType;
        var subsidiaryId = parameters.subsidiaryId;
        var subsidiaryVal = getSubsidiaryId(subsidiaryId);
        var avalaraMandate = parameters.avalaraMandate;
        var entityId = parameters.entity;
        var validationResult = trHelper.validateBeforeSending(
            transactionId,
            subsidiaryVal,
            avalaraMandate,
            transType,
            entityId
        );
        if (validationResult.isValidToSend) {
            plugInContext = preparePlugInContextForNonAvalara(
                parameters,
                responseBody
            );
            Object.seal(plugInContext);
        } else {
            handleValidationFailure(validationResult, transResId);
        }
        log.debug("PlugInContext sent to Non Avalara users", plugInContext);
        return plugInContext;
    }

    /**
     * This function actually prepares the plugInContext which is needed to run the send plugin
     * for Non avalara users.
     * @param {*} parameters
     * @param {*} responseBody
     * @returns {Object} plugInContext
     */
    function preparePlugInContextForNonAvalara(parameters, responseBody) {
        var plugInContext = {};
        try {
            var subsidiaryPreferencesObj = utils.transRespAllowedData(
                parameters.subsidiaryId
            );
            var tranType = appTransMap.getTransactionTypeFromCode(
                parameters.tranType
            );
            var entityId = parameters.entity;
            var transId = parameters.transRespTranId;
            var sendMethDetails = utils.getTRSendMethdDetails(
                subsidiaryPreferencesObj.sendMethId
            );
            var senderDetails = trHelper.getSenderDetails(
                subsidiaryPreferencesObj.sender
            );
            var entityType = trHelper.getEntityType(tranType);
            var entityDetails = sendingMgr.getEntityDetails(
                entityId,
                entityType
            );

            var recipientList = trHelper.getRecipientListByEntity(
                entityType,
                entityId,
                entityDetails.isperson,
                entityDetails
            );
            var subsidiaryVal = getSubsidiaryId(parameters.subsidiaryId);

            plugInContext = {
                scriptId: sendMethDetails.scriptId,
                sendMethodId: subsidiaryPreferencesObj.sendMethId,
                eInvoiceContent: responseBody,
                attachmentFileIds: [],
                customPluginImpId: sendMethDetails.pluginImpl,
                batchOwner: utils.getOwner(),
                customer: {
                    id: parameters.entity,
                    recipients: recipientList,
                },
                transResponseId: parameters.transRespId,
                transaction: {
                    number: transId,
                    id: transId,
                    type: TRANS_RES,
                    poNum: null,
                    tranType: tranType,
                    subsidiary: subsidiaryVal,
                },
                sender: {
                    id: senderDetails.value,
                    name: senderDetails.text,
                    email: senderDetails.email,
                },
                userId: utils.getOwner(),
            };
            return plugInContext;
        } catch (err) {
            log.error(
                "Error occurred in preparePlugInContextForNonAvalara",
                err + " " + err.stack
            );
            throw err;
        }
    }

    /**
     * This function validates the data received for sending and then return it to the calling
     * function to send it for Avalara users.
     * @param {*} parameters
     * @param {*} responseBody
     * @param {*} transResId
     * @returns {Object} result
     * @returns {Object} result.validationResult
     * @returns {Object} result.plugInContext
     */
    function validateAndReturnDataToSendForAvalara(
        parameters,
        responseBody,
        transResId
    ) {
        log.debug(
            "validateAndReturnDataToSendForAvalara Params -> parameters" +
                parameters +
                "responseBody " +
                responseBody +
                "transResId" +
                transResId
        );
        var plugInContext = {};
        var transactionId = parameters.transRespTranId;
        var transType = parameters.tranType;
        var subsidiaryId = parameters.subsidiaryId;
        var subsidiaryVal = getSubsidiaryId(subsidiaryId);
        var entity = parameters.entity;
        var avalaraMandate = parameters.avalaraMandate;
        var entityId = parameters.entity;
        var validationResult = trHelper.validateBeforeSending(
            transactionId,
            subsidiaryVal,
            avalaraMandate,
            transType,
            entityId
        );
        if (validationResult.isValidToSend) {
            plugInContext = {
                eInvoiceContent: responseBody,
                batchOwner: utils.getOwner(),
                customer: {
                    id: entity,
                },
                transResponseId: transResId,
                transaction: {
                    number: transactionId,
                    id: transactionId,
                    type: TRANS_RES,
                    poNum: null,
                    tranType: appTransMap.getRecordType(transType),
                    subsidiary: subsidiaryVal,
                },
            };
            Object.seal(plugInContext);
        } else {
            handleValidationFailure(validationResult, transResId);
        }
        return {
            validationResult: validationResult,
            plugInContext: plugInContext,
        };
    }

    /**
     * This function is used to throw an error when while sending the TR record is not found.
     * Just to handle an edge case where between generation and sending the TR record is deleted.
     */
    function handleTRNotFoundError() {
        throw error.create({
            name: ERR_CODE_OBJ_TRANS_RESP_NOT_FOUND.NAME,
            message:
                ERR_CODE_OBJ_TRANS_RESP_NOT_FOUND.MESSAGE_TRANSLATION_CODE ||
                ERR_CODE_OBJ_TRANS_RESP_NOT_FOUND.MESSAGE,
            notifyOff: true,
        });
    }

    /**
     * This function is used to update the Trnasaction Response record's fields when
     * request sending failed
     * @param {*} transResId
     * @param {*} result
     */
    function handleSendFailed(transResId, result) {
        var fieldsWithValToUpdate = {};
        var errorCode = result.name ? result.name : ERR_CODE_SEND_FAILED;
        fieldsWithValToUpdate[ERROR_CODE_FLD_ID] = errorCode;
        fieldsWithValToUpdate[ERROR_MSG_FLD_ID] = result[MESSAGE];
        fieldsWithValToUpdate[RESPONSE_STATUS_FLD_ID] =
            utils.getInternalIdUsingScriptId(
                TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                SEND_FAILED_STATUS
            );
        utils.updateFieldValues(TRANS_RES, transResId, fieldsWithValToUpdate);
    }

    /**
     * This function is used to update the Transaction Response record's fields when request
     * send successfully to OBN
     * @param {*} obnDocId
     * @param {*} transResId
     */
    function handleSendSuccess(transResId, obnDocId) {
        log.debug("handleSendSuccess: Params-> TR ID:", transResId);
        log.debug("handleSendSuccess: Params-> Obn Doc ID:", obnDocId);
        var fieldsWithValToUpdate = {};
        fieldsWithValToUpdate[ERROR_CODE_FLD_ID] = "";
        fieldsWithValToUpdate[ERROR_MSG_FLD_ID] = "";
        fieldsWithValToUpdate[OBN_DOC_ID_FLD_ID] = obnDocId;
        fieldsWithValToUpdate[RESPONSE_STATUS_FLD_ID] = obnDocId
            ? utils.getInternalIdUsingScriptId(
                  TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                  PROCESSING_STATUS
              )
            : utils.getInternalIdUsingScriptId(
                  TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                  SENT_STATUS
              );
        log.debug(
            "handleSendSuccess: fieldsWithValToUpdate",
            fieldsWithValToUpdate
        );
        utils.updateFieldValues(TRANS_RES, transResId, fieldsWithValToUpdate);
    }

    /**
     * This function updates the Transaction Response record's fields when the validations
     * run before sending fails.
     * @param {*} validationResult
     * @param {*} transResId
     */
    function handleValidationFailure(validationResult, transResId) {
        log.debug(
            "handleValidationFailure: validationResult",
            validationResult
        );
        log.debug("handleValidationFailure: transResId", transResId);

        var fieldsWithValToUpdate = {};
        fieldsWithValToUpdate[ERROR_CODE_FLD_ID] =
            validationResult[ERR_CODE_VAL];
        fieldsWithValToUpdate[ERROR_MSG_FLD_ID] = validationResult[ERR_MSG_VAL];
        fieldsWithValToUpdate[RESPONSE_STATUS_FLD_ID] =
            utils.getInternalIdUsingScriptId(
                TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                SEND_FAILED_STATUS
            );
        utils.updateFieldValues(TRANS_RES, transResId, fieldsWithValToUpdate);
    }

    /**
     *
     * @param {*} internalId
     * @returns transaction response content value from the TR record.
     */
    function getResponseBody(id) {
        return search.lookupFields({
            type: TRANS_RES,
            id: id,
            columns: RESPONSE_BODY,
        })[RESPONSE_BODY];
    }

    /**
     *
     * @param {*}  result
     * @returns the OBN document ID returned by OBN after sending them the Application Response.
     */
    function getObnDocId(result) {
        return result[EI_STATUS][FIELDS_FOR_UPDATE][OBN_DOC_ID_SCRIPT_ID];
    }

    function getSubsidiaryId(subsidiaryId) {
        var parentCompanySubsidiaryId =
            subsidiaryPrefGetter.getParentSubsidiaryId();
        return runtime.isFeatureInEffect("SUBSIDIARIES")
            ? subsidiaryId
            : parentCompanySubsidiaryId;
    }

    /**
     *
     * @param {*} responseType
     * @param {*} result
     * @returns updated the E-Document status and records an audit trail to the linked Transaction
     */
    function recordAuditTrailAndUpdateEdocStatus(responseType, result) {
        log.debug(
            "recordAuditTrailAndUpdateEdocStatus: params -> responseType" +
                responseType
        );
        log.debug(
            "recordAuditTrailAndUpdateEdocStatus: params -> result",
            result
        );
        var TRANS_ID = "transactionId";
        var ENTITY = "entity";
        var OWNER = "owner";
        var ID = "id";
        var TRANS_TYPE = "transactionType";
        var DETAILS = "details";

        var edocStatusToUpdate, auditTrailEventToUpdate;
        try {
            if (result[EI_STATUS]) {
                if (responseType === FOR_CANCELLATION) {
                    edocStatusToUpdate = utils.getInternalIdUsingScriptId(
                        EDOC_STATUS_LIST,
                        CANCELLATION_IN_PROGRESS_EDOC_STATUS
                    );
                    auditTrailEventToUpdate = utils.getInternalIdUsingScriptId(
                        AUDIT_TRAIL_LIST,
                        CANCELLATION_IN_PROGRESS_AUDIT_TRAIL_EVENT
                    );
                } else if (responseType === FOR_REJECTION) {
                    edocStatusToUpdate = utils.getInternalIdUsingScriptId(
                        EDOC_STATUS_LIST,
                        REJECTION_IN_PROGRESS_EDOC_STATUS
                    );
                    auditTrailEventToUpdate = utils.getInternalIdUsingScriptId(
                        AUDIT_TRAIL_LIST,
                        REJECTION_IN_PROGRESS_ADUIT_TRAIL_EVENT
                    );
                }
                log.debug(
                    "recordAuditTrailAndUpdateEdocStatus -> auditTrailEventToUpdate",
                    auditTrailEventToUpdate
                );
                log.debug(
                    "recordAuditTrailAndUpdateEdocStatus -> edocStatusToUpdate",
                    edocStatusToUpdate
                );
                result[EI_STATUS][EVENT_TYPE] = auditTrailEventToUpdate;
                result[EI_STATUS][EDOC_STATUS] = edocStatusToUpdate;
                var auditTrailParams = {
                    transaction: result[EI_STATUS][TRANS_ID],
                    entity: result[EI_STATUS][ENTITY],
                    owner: result[EI_STATUS][OWNER],
                    eventType: result[EI_STATUS][EVENT_TYPE],
                    details: result[EI_STATUS][DETAILS],
                };
                log.debug(
                    "recordAuditTrailAndUpdateEdocStatus -> auditTrailParams",
                    auditTrailParams
                );
                daoAuditTrail.create(auditTrailParams);
                record.submitFields({
                    type: result[EI_STATUS][TRANS_TYPE],
                    id: result[EI_STATUS][TRANS_ID],
                    values: {
                        custbody_psg_ei_status: result[EI_STATUS][EDOC_STATUS],
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields: true,
                    },
                });
            } else {
                log.error(
                    "recordAuditTrailAndUpdateEdocStatus: Audit trail could not get added.",
                    result
                );
            }
        } catch (err) {
            log.error(
                "recordAuditTrailAndUpdateEdocStatus: Error happened while adding audit trail and updating edoc status",
                err + " " + err.stack
            );
            throw err;
        }
    }

    return {
        onRequest: onRequest,
    };
});
