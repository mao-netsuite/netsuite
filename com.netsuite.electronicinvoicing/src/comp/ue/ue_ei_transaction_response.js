/**
 * @NApiVersion 2.x
 * @NScriptName E-Invoicing Transaction Response
 * @NScriptId _ei_ue_tran_response
 * @NScriptType usereventscript
 */

define([
    "N/ui/message",
    "N/runtime",
    "N/error",
    "../../app/einvoice/app_einvoice_transaction_response",
    "../../app/einvoice/app_einvoice_transaction_response_helper",
    "../../lib/app/app_transaction_type_map",
    "../../lib/utils",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_fields",
    "../../lib/constants/record_instances",
    "../../lib/constants/list_values",
    "../../lib/constants/ui_translations_map",
    "../../lib/constants/message_translations_map",
    "../../lib/constants/core_field_values",
    "../../lib/constants",
], function (
    message,
    runtime,
    error,
    transactionResp,
    trHelper,
    transactionTypeMap,
    utils,
    mainConstants,
    recordFields,
    recordInstances,
    listValues,
    uiTranslationsMap,
    messageTranslationsMap,
    coreFieldValues,
    constants
) {
    // Record Types
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var TRANSACTION_RESPONSE_REC_TYPE = RECORD_TYPES.TRANSACTION_RESPONSE;
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;

    // Custom Lists
    var TRANSACTION_RESPONSE_STATUS_LIST_TYPE =
        mainConstants.CUSTOM_LISTS.TRANSACTION_RESPONSE_STATUS;

    // Transaction Response Status List Values
    var TRANS_RESP_STATUS_LIST_VAL =
        listValues[TRANSACTION_RESPONSE_STATUS_LIST_TYPE];

    // Core Fields
    var CORE_FIELDS = mainConstants.CORE_FIELDS;
    var TYPE_FLD_ID = CORE_FIELDS.TYPE;
    var SUBSIDIARY = CORE_FIELDS.SUBSIDIARY;
    var ENTITY = CORE_FIELDS.ENTITY;
    var CUSTOM_STANDARD = CORE_FIELDS.CUSTOM_STANDARD;

    // Core Field Value
    var STANDARD = coreFieldValues[CUSTOM_STANDARD].STANDARD;

    // Transaction Response Record Fields
    var TRANSACTION_RESPONSE_REC_FIELDS =
        recordFields[TRANSACTION_RESPONSE_REC_TYPE];

    // Buttons
    var BUTTONS_TRANSLATIONS = uiTranslationsMap.BUTTONS;
    var GENERATE_TR_BUTTON_OBJ =
        BUTTONS_TRANSLATIONS.GENERATE_TRANSACTION_RESPONSE;
    var SEND_TR_BUTTON_OBJ = BUTTONS_TRANSLATIONS.SEND_TRANSACTION_RESPONSE;
    var BUTTONS = mainConstants.CUSTPAGE_BUTTONS;
    var GENERATE_EI_BUTTON_ID = BUTTONS.GENERATE_TRANSACTION_RESPONSE;
    var SEND_EI_BUTTON_ID = BUTTONS.SEND_TRANSACTION_RESPONSE;

    // Banners
    var BANNERS = uiTranslationsMap.BANNERS;
    var NO_GEN_AND_SEND_AR_ACCESS_BANNER_OBJ =
        BANNERS.NO_GEN_AND_SEND_TR_PERMISSION;
    var REQ_LICENSES_MISSING_BANNER_OBJ = BANNERS.REQ_LICENSES_MISSING;

    // Error Codes
    var ERR_CODES = messageTranslationsMap.ERR_CODES;

    // Error Codes
    var ERR_CODES = messageTranslationsMap.ERR_CODES;

    var TRANSACTION_RESPONSE_CS_PATH = "../cs/dist/cs_ei_transaction_response";

    var GENERATE_FUNC_NAME = "generateTransactionResp";
    var SEND_FUNC_NAME = "sendTransactionResp";

    var GEN_AND_SEND_AR_CHECK_BOX =
        mainConstants.ROLE_PERMISSIONS.GEN_AND_SEND_AR;
    var ADMINISTRATOR = "administrator";
    var XML_EXTENSION = "xml";
    var genBtnDisable = false;
    var sendBtnDisable = false;

    function beforeLoad(context) {
        log.debug("beforeLoad(): context", context);

        if (context.type === context.UserEventType.COPY) {
            throw error.create({
                name: ERR_CODES.ERR_CODE_COPY_TR.NAME,
                message: utils.getTranslatedContent(
                    ERR_CODES.ERR_CODE_COPY_TR,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                ),
                notifyOff: true,
            });
        }

        try {
            var newRecord = context.newRecord;
            var form = context.form;
            var tranDetails = {};
            var tranType = null;
            var tranRecType = null;
            var subsidiaryId = null;
            var entity = null;
            var userObj = runtime.getCurrentUser();
            form.clientScriptModulePath = TRANSACTION_RESPONSE_CS_PATH;
            var isUI =
                runtime.executionContext === runtime.ContextType.USER_INTERFACE;

            if (!isUI) {
                log.debug("beforeLoad()", "Non UI context");
                return null;
            }

            var transactionRespRecValues = utils.getRecordFieldValues(
                newRecord,
                {
                    transRespTypeValue:
                        TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_TYPE,
                    transRespStatus:
                        TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_STATUS,
                    avalaraMandate:
                        TRANSACTION_RESPONSE_REC_FIELDS.AVALARA_MANDATE,
                    transRespTranId:
                        TRANSACTION_RESPONSE_REC_FIELDS.TRANSACTION_ID,
                    inboundEdocId:
                        TRANSACTION_RESPONSE_REC_FIELDS.INBOUND_EDOCUMENT,
                    respBody: TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_BODY,
                }
            );
            var recId =
                transactionRespRecValues.transRespTranId ||
                transactionRespRecValues.inboundEdocId;
            var isTranLinked = Boolean(
                transactionRespRecValues.transRespTranId
            );

            log.debug(
                "beforeLoad(): transRespTypeValue",
                transactionRespRecValues.transRespTypeValue
            );

            if (transactionRespRecValues.respBody) {
                var fieldsForUpdate = {};
                fieldsForUpdate[
                    TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_CONTENT_LINK
                ] = trHelper.getPreviewAndDownloadLinkRichText(
                    {
                        id: recId,
                        data: transactionRespRecValues.respBody,
                        extension: XML_EXTENSION,
                    },
                    isTranLinked
                );
                form.updateDefaultValues(fieldsForUpdate);
            }

            if (!transactionRespRecValues.transRespTypeValue) {
                log.error(
                    "beforeLoad(): transRespTypeValue",
                    "Response Type blank"
                );
                return null;
            }

            // Hides/Shows fields based on transaction response type (Ex: For Cancellation, For Rejection).
            trHelper.hideFieldsBasedOnType(
                transactionRespRecValues.transRespTypeValue,
                form
            );

            var responseType = utils.getScriptIdUsingInternalIdQuery(
                TRANSACTION_RESPONSE_TYPE_REC_TYPE,
                transactionRespRecValues.transRespTypeValue
            );

            if (
                !trHelper.isValidResponseType(
                    transactionRespRecValues.transRespTypeValue
                )
            ) {
                log.debug(
                    "beforeLoad(): transRespTypeValue",
                    "Response type not valid"
                );
                return null;
            }

            trHelper.updateReasonFldLabel(
                transactionRespRecValues.transRespTypeValue,
                form
            );

            if (!transactionRespRecValues.transRespStatus) {
                log.error("beforeLoad(): transRespStatus", "Status blank");
                return null;
            }

            if (context.type === context.UserEventType.VIEW) {
                if (transactionRespRecValues.transRespTranId) {
                    tranDetails = utils.getTransactionDetails(
                        transactionRespRecValues.transRespTranId,
                        [TYPE_FLD_ID, SUBSIDIARY, ENTITY]
                    );
                    tranType = tranDetails[TYPE_FLD_ID];
                    tranRecType = transactionTypeMap.getRecordType(tranType);
                    subsidiaryId = tranDetails[SUBSIDIARY];
                    entity = tranDetails[ENTITY];
                }

                var transRespStatusScriptId = utils.getScriptIdUsingInternalId(
                    TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                    transactionRespRecValues.transRespStatus
                );

                handleBanner(context.request.parameters, userObj, {
                    transRespStatusScriptId: transRespStatusScriptId,
                    avalaraMandate: transactionRespRecValues.avalaraMandate,
                    subsidiaryId: subsidiaryId,
                });

                // Insert Generate Button based on transaction response status
                insertTRButton(
                    {
                        id: GENERATE_EI_BUTTON_ID,
                        label: utils.getTranslatedContent(
                            GENERATE_TR_BUTTON_OBJ,
                            mainConstants.TRANSLATE_TYPES.LABEL
                        ),
                        functionName: GENERATE_FUNC_NAME,
                        btnArgs: [newRecord.id, newRecord.type],
                        isBtnDisable: genBtnDisable,
                    },
                    transRespStatusScriptId,
                    form
                );
                // Insert Send Button based on transaction response status
                insertTRButton(
                    {
                        id: SEND_EI_BUTTON_ID,
                        label: utils.getTranslatedContent(
                            SEND_TR_BUTTON_OBJ,
                            mainConstants.TRANSLATE_TYPES.LABEL
                        ),
                        functionName: SEND_FUNC_NAME,
                        btnArgs: [
                            transactionRespRecValues.avalaraMandate,
                            transactionRespRecValues.transRespTranId,
                            newRecord.id,
                            responseType,
                            transactionRespRecValues.transRespStatus,
                            tranType,
                            subsidiaryId,
                            entity,
                        ],
                        isBtnDisable: sendBtnDisable,
                    },
                    transRespStatusScriptId,
                    form
                );
            }
        } catch (e) {
            log.error("beforeLoad(): error", JSON.stringify(e));
        }
    }

    function beforeSubmit(context) {
        log.debug("beforeSubmit(): context", context);

        var newRecord = context.newRecord;
        var transRespStatus = newRecord.getValue(
            TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_STATUS
        );
        if (!transRespStatus) {
            log.debug("beforeSubmit(): transRespStatus", "Status blank");
            return null;
        }
        var transRespStatusScriptId = utils.getScriptIdUsingInternalId(
            TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
            transRespStatus
        );

        if (
            context.type === context.UserEventType.DELETE &&
            trHelper.isValidStatusToRestrictDelete(transRespStatusScriptId)
        ) {
            throw error.create({
                name: ERR_CODES.ERR_CODE_DELETE_TR.NAME,
                message: utils.getTranslatedContent(
                    ERR_CODES.ERR_CODE_DELETE_TR,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                ),
                notifyOff: true,
            });
        }
    }

    function afterSubmit(context) {
        log.debug("afterSubmit(): context", context);

        var newRecord = context.newRecord;
        var transRespId = newRecord.id;
        var fieldsForUpdate = {};
        var trGenResult = {
            success: false,
            data: null,
            errDetails: null,
            isCreateMode: true,
            transRespId: transRespId,
        };
        var userObj = runtime.getCurrentUser();
        var avalaraMandate = newRecord.getValue(
            TRANSACTION_RESPONSE_REC_FIELDS.AVALARA_MANDATE
        );

        log.debug("afterSubmit(): newRecord", newRecord);

        if (context.type === context.UserEventType.CREATE) {
            try {
                if (!validateUserAccess(userObj, avalaraMandate)) {
                    trHelper.submitFieldsAfterGeneration(
                        trGenResult,
                        fieldsForUpdate,
                        avalaraMandate
                    );
                    return null;
                }
                var transactionRespRecValues = utils.getRecordFieldValues(
                    newRecord,
                    {
                        tranRespTemplateScriptId:
                            TRANSACTION_RESPONSE_REC_FIELDS.TEMPLATE_SCRIPT_ID,
                        transRespTranId:
                            TRANSACTION_RESPONSE_REC_FIELDS.TRANSACTION_ID,
                        transRespTypeValue:
                            TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_TYPE,
                    }
                );

                log.debug(
                    "afterSubmit(): transactionRespRecValues",
                    transactionRespRecValues
                );

                if (
                    !trHelper.isValidResponseType(
                        transactionRespRecValues.transRespTypeValue
                    )
                ) {
                    log.debug(
                        "afterSubmit(): transRespTypeValue",
                        "Not valid type for transaction response generation in afterSubmit: " +
                            transactionRespRecValues.transRespTypeValue
                    );
                    return null;
                }

                trHelper.validateTRFields(newRecord, true);

                var subsidiaryId = utils.getTransactionDetails(
                    transactionRespRecValues.transRespTranId,
                    [SUBSIDIARY]
                )[SUBSIDIARY];

                var licenseInfo = trHelper.getReqLicensesInfo(
                    TRANS_RESP_STATUS_LIST_VAL.READY_FOR_GENERATION,
                    avalaraMandate,
                    subsidiaryId
                );

                if (licenseInfo.hasLicense) {
                    var transRespContent = transactionResp.getTransRespContent({
                        avalaraMandate: avalaraMandate,
                        transRespTranId:
                            transactionRespRecValues.transRespTranId,
                        transRespId: transRespId,
                        tranRespTemplateScriptId:
                            transactionRespRecValues.tranRespTemplateScriptId,
                    });
                    trGenResult.data = transRespContent;
                    trGenResult.success = true;
                }
            } catch (e) {
                log.error("afterSubmit(): error", e);
                trGenResult.errDetails = e;
            }
            log.debug(
                "ue_ei_transaction_response: afterSubmit(): trGenResult",
                trGenResult
            );

            trHelper.submitFieldsAfterGeneration(
                trGenResult,
                fieldsForUpdate,
                avalaraMandate
            );
        }
    }

    /**
     * Based on transRespStatusScriptId:
     * 1. TR button will be added to the form object passed.
     * 2. Inserted button will be disabled/enabled accordingly
     * @param btnInputData
     * @param transRespStatusScriptId
     * @param form
     */
    function insertTRButton(btnInputData, transRespStatusScriptId, form) {
        log.debug("insertTRButton(): btnInputData", btnInputData);
        log.debug(
            "insertTRButton(): transRespStatusScriptId",
            transRespStatusScriptId
        );
        log.debug("insertTRButton(): form", form);

        try {
            if (
                trHelper.isValidStatusForBtn(
                    transRespStatusScriptId,
                    btnInputData.id
                )
            ) {
                var buttonObj = utils.insertButton(btnInputData, form);
                if (
                    btnInputData.isBtnDisable ||
                    transRespStatusScriptId ===
                        TRANS_RESP_STATUS_LIST_VAL.PROCESSING
                ) {
                    buttonObj.isDisabled = true;
                }
            }
        } catch (e) {
            log.error(
                "insertTRButton(): error handling " +
                    btnInputData.id +
                    " button",
                e
            );
        }
    }

    /**
     * Based on responseStatus and other params required banner will be shown
     * @param requestParameters
     * @param userObj
     * @param options
     */
    function handleBanner(requestParameters, userObj, options) {
        log.debug("handleBanner(): requestParameters", requestParameters);
        log.debug("handleBanner(): userObj", userObj);
        log.debug("handleBanner(): options", options);

        var avalaraMandate = options.avalaraMandate;
        var transRespStatusScriptId = options.transRespStatusScriptId;

        try {
            if (!validateUserAccess(userObj, avalaraMandate)) {
                genBtnDisable = true;
                sendBtnDisable = true;
                utils.displayBanner(
                    message.Type.WARNING,
                    utils.getTranslatedContent(
                        NO_GEN_AND_SEND_AR_ACCESS_BANNER_OBJ,
                        mainConstants.TRANSLATE_TYPES.TITLE
                    ),
                    utils.getTranslatedContent(
                        NO_GEN_AND_SEND_AR_ACCESS_BANNER_OBJ,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    ),
                    {
                        sendToClient: true,
                    }
                );
                return null;
            }

            showBannerBasedOnParam(requestParameters, transRespStatusScriptId);

            var licenseInfo = trHelper.getReqLicensesInfo(
                transRespStatusScriptId,
                avalaraMandate,
                options.subsidiaryId
            );

            if (!licenseInfo.hasLicense && licenseInfo.warnMsg) {
                sendBtnDisable = licenseInfo.sendBtnDisable || false;
                genBtnDisable = licenseInfo.genBtnDisable || false;
                utils.displayBanner(
                    message.Type.WARNING,
                    utils.getTranslatedContent(
                        REQ_LICENSES_MISSING_BANNER_OBJ,
                        mainConstants.TRANSLATE_TYPES.TITLE
                    ),
                    licenseInfo.warnMsg,
                    {
                        sendToClient: true,
                    }
                );
            }
        } catch (e) {
            log.error("handleBanner(): error", e);
        }
    }

    /**
     * Returns true if given role internal id has permission to generate and send application response, else false
     * @param roleInternalId
     * @returns boolean
     */
    function hasGenerateSendARAccess(roleInternalId) {
        var rolePermission = {};

        try {
            rolePermission = utils.getRoleLookupResult(roleInternalId, [
                CUSTOM_STANDARD,
                GEN_AND_SEND_AR_CHECK_BOX,
            ]);

            // Standard role
            if (rolePermission[CUSTOM_STANDARD] === STANDARD) return true;
        } catch (e) {
            log.error("hasGenerateSendARAccess: error", e);
        }

        return rolePermission[GEN_AND_SEND_AR_CHECK_BOX] || false;
    }

    /**
     * Returns true if given user is allowed to generate transaction response, else false
     * @param userObj
     * @param avalaraMandate
     * @returns boolean
     */
    function validateUserAccess(userObj, avalaraMandate) {
        if (userObj.roleId === ADMINISTRATOR || !avalaraMandate) return true;

        return hasGenerateSendARAccess(userObj.role);
    }

    /**
     * Displays banner based on url query params
     * @param requestParameters
     * @param transRespStatusScriptId
     */
    function showBannerBasedOnParam(
        requestParameters,
        transRespStatusScriptId
    ) {
        try {
            if (
                requestParameters.ei_show_banner &&
                JSON.parse(requestParameters.ei_show_banner)
            ) {
                log.debug("showBannerBasedOnStatus(): show banner");
                trHelper.showBannerBasedOnStatus(transRespStatusScriptId);
            }
        } catch (e) {
            log.error("showBannerBasedOnParam(): error", e);
        }
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit,
    };
});
