define([
    "N/record",
    "N/search",
    "N/query",
    "N/ui/message",
    "N/error",
    "N/url",
    "./app_einvoice_outbound_rendered_content_manager",
    "./app_einvoice_free_country_check_helper",
    "./app_einvoice_license_manager",
    "../../lib/utils",
    "../../lib/translator",
    "../../lib/string_formatter",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_fields",
    "../../lib/constants/core_field_values",
    "../../lib/constants/record_instances",
    "../../lib/constants/list_values",
    "../../lib/constants/ui_translations_map",
    "../../lib/constants/message_translations_map",
    "./app_einvoice_sending_manager",
    "../../lib/app/app_transaction_type_map",
    "../../data/dao_customer",
    "../../data/dao_vendor",
    "../../lib/constants/script_deployments",
    "../../ubl/common/lib/constants",
], function (
    record,
    search,
    query,
    message,
    error,
    url,
    contentManager,
    freeCountryCheckHelper,
    licenseManager,
    utils,
    translator,
    stringFormatter,
    mainConstants,
    recordFields,
    coreFieldValues,
    recordInstances,
    listValues,
    uiTranslationsMap,
    messageTranslationsMap,
    sendingMgr,
    appTransMap,
    daoCustomer,
    daoVendor,
    scriptDeployments,
    constants
) {
    // Record Types
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;
    var TRANSACTION_RESPONSE_REC_TYPE = RECORD_TYPES.TRANSACTION_RESPONSE;
    var TRANSACTION_RESPONSE_TEMPLATE_REC_TYPE =
        RECORD_TYPES.TRANSACTION_RESPONSE_TEMPLATE;

    // Custom Lists
    var TRANSACTION_RESPONSE_STATUS_LIST_TYPE =
        mainConstants.CUSTOM_LISTS.TRANSACTION_RESPONSE_STATUS;

    // Core Fields
    var CORE_FIELDS = mainConstants.CORE_FIELDS;
    var APPROVAL_STATUS_FLD_ID = CORE_FIELDS.APPROVAL_STATUS;
    var SCRIPT_ID_FLD = CORE_FIELDS.SCRIPT_ID;
    var INACTIVE_FLD_ID = CORE_FIELDS.INACTIVE;

    // Button Ids
    var BUTTONS = mainConstants.CUSTPAGE_BUTTONS;
    var GENERATE_EI_BUTTON_ID = BUTTONS.GENERATE_TRANSACTION_RESPONSE;
    var SEND_EI_BUTTON_ID = BUTTONS.SEND_TRANSACTION_RESPONSE;

    // Transaction Response Template Record fields
    var TRANS_RESP_TEMPLATE_REC_FIELDS =
        recordFields[TRANSACTION_RESPONSE_TEMPLATE_REC_TYPE];
    // Transaction Response Record fields
    var TRANS_RESP_REC_FIELDS = recordFields[TRANSACTION_RESPONSE_REC_TYPE];

    // Record Instances
    var FOR_CANCELLATION_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].FOR_CANCELLATION;
    var FOR_REJECTION_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].FOR_REJECTION;
    var REJECTED_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].REJECTED;

    // Core Field Values
    var APPROVED_INTERNAL_ID = coreFieldValues[APPROVAL_STATUS_FLD_ID].APPROVED;

    // Transaction Response Status List Values
    var TRANS_RESP_STATUS_LIST_VAL =
        listValues[TRANSACTION_RESPONSE_STATUS_LIST_TYPE];

    // Valid response types of Transaction response record
    var VALID_RESP_TYPE_SCRIPT_IDS = [
        FOR_CANCELLATION_SCRIPT_ID,
        FOR_REJECTION_SCRIPT_ID,
        REJECTED_SCRIPT_ID,
    ];

    // Labels
    var FIELDS = uiTranslationsMap.FIELDS;
    var REASON_FOR_CANCELLATION_OBJ = FIELDS.REASON_FOR_CANCELLATION;
    var REASON_FOR_REJECTION_OBJ = FIELDS.REASON_FOR_REJECTION;

    // Banners
    var BANNERS = uiTranslationsMap.BANNERS;
    var GEN_SUCCESS_BANNER_OBJ = BANNERS.GENERATE_TRANSACTION_RESPONSE_SUCCESS;
    var GEN_FAILURE_BANNER_OBJ = BANNERS.GENERATE_TRANSACTION_RESPONSE_FAILURE;
    var SEND_SUCCESS_BANNER_OBJ = BANNERS.SEND_TRANSACTION_RESPONSE_SUCCESS;
    var SEND_FAILURE_BANNER_OBJ = BANNERS.SEND_TRANSACTION_RESPONSE_FAILURE;
    var REQ_LICENSES_MISSING_BANNER_OBJ = BANNERS.REQ_LICENSES_MISSING;

    // Error Codes
    var ERR_CODES = messageTranslationsMap.ERR_CODES;
    var ERR_CODE_OBJ_SUB_NOT_FOUND = ERR_CODES.ERR_SUB_NOT_FOUND;
    var ERR_CODE_OBJ_MANDATE_NOT_ACTIVE = ERR_CODES.ERR_CODE_MANDATE_NOT_ACTIVE;
    var ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED =
        ERR_CODES.ERR_CODE_TRANS_RES_NOT_SUPPORTED;
    var ERR_CODE_OBJ_TRANS_NOT_LINKED = ERR_CODES.ERR_CODE_TR_TRANS_NOT_LINKED;
    var ERR_CODE_OBJ_SUBSIDIARY_INACTIVE =
        ERR_CODES.ERR_CODE_SUBSIDIARY_INACTIVE;
    var ERR_CODE_OBJ_BILL_IS_APPROVED_SEND =
        ERR_CODES.ERR_CODE_BILL_IS_APPROVED_SEND;
    var ERR_CODE_OBJ_TRANS_RESP_TEMPLATE_INACTIVE =
        ERR_CODES.ERR_CODE_TRANS_RESP_TEMPLATE_INACTIVE;
    var ERR_CODE_OBJ_TRANS_RESP_INVALID_STATUS =
        ERR_CODES.ERR_CODE_TRANS_RESP_INVALID_STATUS;
    var ERR_CODE_TRANS_RES_SEND_METH_INACTIVE_OR_MISSING =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_INACTIVE;
    var ERR_CODE_OBJ_CUSTOMER_INACTIVE =
        ERR_CODES.ERR_CODE_ENTITY_INACTIVE.CUSTOMER;
    var ERR_CODE_OBJ_VENDOR_INACTIVE =
        ERR_CODES.ERR_CODE_ENTITY_INACTIVE.VENDOR;

    //Error Codes related to TR Send Method Recipient
    var ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_CUSTOMER =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL
            .CUSTOMER;
    var ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_VENDOR =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL
            .VENDOR;
    var ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_CUSTOMER =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE.CUSTOMER;
    var ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_VENDOR =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE.VENDOR;
    var ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_CUSTOMER =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL.CUSTOMER;
    var ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_VENDOR =
        ERR_CODES.ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL.VENDOR;

    // Preview and Download script
    var PREVIEW_DOWNLOAD_SCRIPT = mainConstants.SCRIPTS.PREVIEW_DOWNLOAD;
    var PREVIEW_DOWNLOAD_DEPLOY =
        scriptDeployments[PREVIEW_DOWNLOAD_SCRIPT].DEFAULT_DEPLOYMENT;

    var LICENSES = mainConstants.LICENSES;

    var PREVIEW = "preview";
    var DOWNLOAD = "download";
    var tranFNamePrefix = "transaction_";
    var inboundEdocFNamePrefix = "inbound_edoc_";
    var tranRespFNameContent = "_response_content.";

    /**
     * Returns true if bill is approved
     * @param tranRecType
     * @param tranId
     * @returns boolean
     */
    function isBillApproved(tranId) {
        log.debug("trHelper: isBillApproved(): tranId", tranId);

        var approvalStatus = search.lookupFields({
            type: record.Type.VENDOR_BILL,
            id: tranId,
            columns: [APPROVAL_STATUS_FLD_ID],
        })[APPROVAL_STATUS_FLD_ID][0];

        log.debug("trHelper: isBillApproved(): approvalStatus", approvalStatus);

        return (
            (approvalStatus && parseInt(approvalStatus.value)) ===
            APPROVED_INTERNAL_ID
        );
    }

    /**
     * Returns template mapping content and plugin script id for the passed script id of the template
     * @param templateScriptId
     * @returns {outboundTemp, outboundPlug} object
     */
    function getTransRespTemplateData(options, usingScriptId) {
        log.debug("trHelper: getTransRespTemplateData(): options", options);
        log.debug(
            "trHelper: getTransRespTemplateData(): usingScriptId",
            usingScriptId
        );
        var responseTemplate = {
            outboundTemp: "",
            outboundPlug: "",
        };
        var respTemplateQuery = query.create({
            type: TRANSACTION_RESPONSE_TEMPLATE_REC_TYPE,
        });

        setTrTempCondition(respTemplateQuery, options, usingScriptId);

        respTemplateQuery.columns = [
            respTemplateQuery.createColumn({
                fieldId: INACTIVE_FLD_ID,
            }),
            respTemplateQuery.createColumn({
                fieldId: TRANS_RESP_TEMPLATE_REC_FIELDS.TEMPLATE_MAPPING,
            }),
            respTemplateQuery.createColumn({
                fieldId: TRANS_RESP_TEMPLATE_REC_FIELDS.OUTBOUND_PLUGIN,
            }),
        ];
        var respTemplateResult = respTemplateQuery.run().asMappedResults();

        if (respTemplateResult.length) {
            var respTemplateResultObj = respTemplateResult[0];

            log.debug(
                "trHelper: getTransRespTemplateData(): respTemplateResultObj",
                respTemplateResultObj
            );

            var isTemplateInactive = respTemplateResultObj[INACTIVE_FLD_ID];

            if (isTemplateInactive) {
                throw error.create({
                    name: ERR_CODE_OBJ_TRANS_RESP_TEMPLATE_INACTIVE.NAME,
                    message:
                        translator.getString(
                            ERR_CODE_OBJ_TRANS_RESP_TEMPLATE_INACTIVE.MESSAGE_TRANSLATION_CODE
                        ) || ERR_CODE_OBJ_TRANS_RESP_TEMPLATE_INACTIVE.MESSAGE,
                });
            }

            responseTemplate.outboundTemp =
                respTemplateResultObj[
                    TRANS_RESP_TEMPLATE_REC_FIELDS.TEMPLATE_MAPPING
                ];
            responseTemplate.outboundPlug =
                respTemplateResultObj[
                    TRANS_RESP_TEMPLATE_REC_FIELDS.OUTBOUND_PLUGIN
                ];
        }
        log.debug(
            "trHelper: getTransRespTemplateData(): responseTemplate",
            responseTemplate
        );

        return responseTemplate;
    }

    /**
     * Sets transaction response template condition(s) to given queryObject based on params
     * @param respTemplateQuery
     * @param options
     * @param usingScriptId
     */
    function setTrTempCondition(respTemplateQuery, options, usingScriptId) {
        if (usingScriptId) {
            respTemplateQuery.condition = respTemplateQuery.createCondition({
                fieldId: SCRIPT_ID_FLD,
                operator: query.Operator.IS,
                values: options.templateScriptId,
            });
        } else {
            var subsidiaryFilter;
            var inactiveFilter = respTemplateQuery.createCondition({
                fieldId: INACTIVE_FLD_ID,
                operator: query.Operator.IS,
                values: false,
            });
            var transactionFilter = respTemplateQuery.createCondition({
                fieldId: TRANS_RESP_TEMPLATE_REC_FIELDS.TRANSACTION_TYPE,
                operator: query.Operator.INCLUDE_ANY,
                values: [options.transType],
            });
            if (utils.isOWAccount()) {
                subsidiaryFilter = respTemplateQuery.createCondition({
                    fieldId: TRANS_RESP_TEMPLATE_REC_FIELDS.SUBSIDIARY,
                    operator: query.Operator.INCLUDE_ANY,
                    values: [options.subsidiaryId],
                });
                respTemplateQuery.condition = respTemplateQuery.and(
                    inactiveFilter,
                    subsidiaryFilter,
                    transactionFilter
                );
            } else {
                respTemplateQuery.condition = respTemplateQuery.and(
                    inactiveFilter,
                    transactionFilter
                );
            }
        }
    }

    /**
     * Returns true if given transaction response type is in valid response types array
     * @param {*} transRespTypeValue
     * @returns boolean
     */
    function isValidResponseType(transRespTypeValue) {
        log.debug(
            "trHelper: isValidResponseType(): transRespTypeValue",
            transRespTypeValue
        );

        var transRespTypeScriptId = utils.getScriptIdUsingInternalIdQuery(
            TRANSACTION_RESPONSE_TYPE_REC_TYPE,
            transRespTypeValue
        );

        log.debug(
            "trHelper: isValidResponseType(): transRespTypeScriptId",
            transRespTypeScriptId
        );

        if (!transRespTypeScriptId) {
            return false;
        }

        return VALID_RESP_TYPE_SCRIPT_IDS.indexOf(transRespTypeScriptId) !== -1;
    }

    /**
     * Returns label of Reason field based on transaction response type value
     * @param transRespTypeValue
     * @returns string
     */
    function getReasonFldLabel(transRespTypeValue) {
        log.debug(
            "trHelper: getReasonFldLabel(): transRespTypeValue",
            transRespTypeValue
        );

        var fldLabel = "";
        switch (
            utils.getScriptIdUsingInternalIdQuery(
                TRANSACTION_RESPONSE_TYPE_REC_TYPE,
                transRespTypeValue
            )
        ) {
            case FOR_CANCELLATION_SCRIPT_ID:
                fldLabel =
                    translator.getString(
                        REASON_FOR_CANCELLATION_OBJ.LABEL_TRANSLATION_CODE
                    ) || REASON_FOR_CANCELLATION_OBJ.LABEL;
                break;
            case FOR_REJECTION_SCRIPT_ID:
            case REJECTED_SCRIPT_ID:
                fldLabel =
                    translator.getString(
                        REASON_FOR_REJECTION_OBJ.LABEL_TRANSLATION_CODE
                    ) || REASON_FOR_REJECTION_OBJ.LABEL;
        }

        log.debug("trHelper: getReasonFldLabel(): fldLabel", fldLabel);

        return fldLabel;
    }

    /**
     * Updates Reason field label in the given form object if present
     * @param transRespTypeValue
     * @param form
     */
    function updateReasonFldLabel(transRespTypeValue, form) {
        log.debug(
            "trHelper: updateReasonFldLabel(): transRespTypeValue",
            transRespTypeValue
        );
        log.debug("trHelper: updateReasonFldLabel(): form", form);

        var reasonFldLabel = getReasonFldLabel(transRespTypeValue);
        if (reasonFldLabel) {
            var reasonFld = form.getField({
                id: TRANS_RESP_REC_FIELDS.REASON,
            });
            if (reasonFld) {
                reasonFld.label = reasonFldLabel;
            }
        }
    }

    /**
     * Returns true if given transaction response status is valid for that given button id
     * @param transRespStatusScriptId
     * @param btnId
     * @returns boolean
     */
    function isValidStatusForBtn(transRespStatusScriptId, btnId) {
        log.debug(
            "trHelper: isValidStatusForBtn(): transRespStatusScriptId",
            transRespStatusScriptId
        );
        log.debug("trHelper: isValidStatusForBtn(): btnId", btnId);

        switch (btnId) {
            case GENERATE_EI_BUTTON_ID:
                return (
                    [
                        TRANS_RESP_STATUS_LIST_VAL.READY_FOR_GENERATION,
                        TRANS_RESP_STATUS_LIST_VAL.GENERATION_FAILED,
                        TRANS_RESP_STATUS_LIST_VAL.READY_FOR_SENDING,
                        TRANS_RESP_STATUS_LIST_VAL.SENDING_FAILED,
                        TRANS_RESP_STATUS_LIST_VAL.IN_ERROR,
                        TRANS_RESP_STATUS_LIST_VAL.PROCESSING,
                    ].indexOf(transRespStatusScriptId) !== -1
                );
            case SEND_EI_BUTTON_ID:
                return (
                    [
                        TRANS_RESP_STATUS_LIST_VAL.READY_FOR_SENDING,
                        TRANS_RESP_STATUS_LIST_VAL.SENDING_FAILED,
                        TRANS_RESP_STATUS_LIST_VAL.IN_ERROR,
                        TRANS_RESP_STATUS_LIST_VAL.PROCESSING,
                    ].indexOf(transRespStatusScriptId) !== -1
                );
        }

        return false;
    }

    /**
     * Shows required banner based on response status passed
     * @param responseStatusScriptId
     */
    function showBannerBasedOnStatus(responseStatusScriptId) {
        log.debug(
            "trHelper: showBannerBasedOnStatus(): responseStatusScriptId",
            responseStatusScriptId
        );

        switch (responseStatusScriptId) {
            case TRANS_RESP_STATUS_LIST_VAL.READY_FOR_SENDING:
                utils.displayBanner(
                    message.Type.CONFIRMATION,
                    "",
                    translator.getString(
                        GEN_SUCCESS_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
                    ) || GEN_SUCCESS_BANNER_OBJ.MESSAGE,
                    {
                        sendToClient: true,
                    }
                );
                break;
            case TRANS_RESP_STATUS_LIST_VAL.GENERATION_FAILED:
                utils.displayBanner(
                    message.Type.ERROR,
                    translator.getString(
                        GEN_FAILURE_BANNER_OBJ.TITLE_TRANSLATION_CODE
                    ) || GEN_FAILURE_BANNER_OBJ.TITLE,
                    translator.getString(
                        GEN_FAILURE_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
                    ) || GEN_FAILURE_BANNER_OBJ.MESSAGE,
                    {
                        sendToClient: true,
                    }
                );
                break;
            case TRANS_RESP_STATUS_LIST_VAL.SENDING_FAILED:
                utils.displayBanner(
                    message.Type.ERROR,
                    translator.getString(
                        SEND_FAILURE_BANNER_OBJ.TITLE_TRANSLATION_CODE
                    ) || SEND_FAILURE_BANNER_OBJ.TITLE,
                    translator.getString(
                        SEND_FAILURE_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
                    ) || SEND_FAILURE_BANNER_OBJ.MESSAGE,
                    {
                        sendToClient: true,
                    }
                );
                break;
            case TRANS_RESP_STATUS_LIST_VAL.SENT:
            case TRANS_RESP_STATUS_LIST_VAL.PROCESSING:
                utils.displayBanner(
                    message.Type.CONFIRMATION,
                    "",
                    translator.getString(
                        SEND_SUCCESS_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
                    ) || SEND_SUCCESS_BANNER_OBJ.MESSAGE,
                    {
                        sendToClient: true,
                    }
                );
        }
    }

    /**
     * Hides fields based on transaction response type
     * @param transRespTypeValue
     * @param form
     */
    function hideFieldsBasedOnType(transRespTypeValue, form) {
        log.debug(
            "trHelper: hideFieldsBasedOnType(): transRespTypeValue",
            transRespTypeValue
        );
        log.debug("trHelper: hideFieldsBasedOnType(): form", form);

        var transRespTypeScriptId = utils.getScriptIdUsingInternalIdQuery(
            TRANSACTION_RESPONSE_TYPE_REC_TYPE,
            transRespTypeValue
        );
        log.debug(
            "trHelper: hideFieldsBasedOnType(): transRespTypeScriptId",
            transRespTypeScriptId
        );
        var hideFieldsArr = [];

        switch (transRespTypeScriptId) {
            case FOR_CANCELLATION_SCRIPT_ID:
            case FOR_REJECTION_SCRIPT_ID:
                hideFieldsArr = [TRANS_RESP_REC_FIELDS.INBOUND_EDOCUMENT];
                break;
            case REJECTED_SCRIPT_ID:
                hideFieldsArr = [
                    TRANS_RESP_REC_FIELDS.INBOUND_EDOCUMENT,
                    TRANS_RESP_REC_FIELDS.OBN_DOC_ID,
                    TRANS_RESP_REC_FIELDS.AVALARA_DOC_ID,
                    TRANS_RESP_REC_FIELDS.AVALARA_MANDATE,
                ];
                break;
            default:
                hideFieldsArr = [
                    TRANS_RESP_REC_FIELDS.OBN_DOC_ID,
                    TRANS_RESP_REC_FIELDS.AVALARA_DOC_ID,
                    TRANS_RESP_REC_FIELDS.AVALARA_MANDATE,
                    TRANS_RESP_REC_FIELDS.REASON,
                ];
        }

        log.debug(
            "trHelper: hideFieldsBasedOnType(): hideFieldsArr",
            hideFieldsArr
        );

        if (hideFieldsArr.length) {
            utils.hideFields(hideFieldsArr, form);
        }
    }

    /**
     * Returns URL of transaction response record in view mode
     * @param transRespId
     * @returns string
     */
    function getTransactionResponseRecUrl(transRespId) {
        log.debug(
            "trHelper: getTransactionResponseRecUrl(): transRespId",
            transRespId
        );

        return url.resolveRecord({
            recordType: TRANSACTION_RESPONSE_REC_TYPE,
            recordId: transRespId,
        });
    }

    /**
     * Validates required TR fields if value is present else error will be thrown
     * If isCreateMode is passed as true, transaction response status will also be validated
     * @param trRec
     * @param isCreateMode
     * @returns boolean
     */
    function validateTRFields(trRec, isCreateMode) {
        log.debug("trHelper: validateTRFields(): trRec", trRec);
        log.debug("trHelper: validateTRFields(): isCreateMode", isCreateMode);

        utils.validateFieldsAreNotEmpty(
            [
                TRANS_RESP_REC_FIELDS.TRANSACTION_ID,
                TRANS_RESP_REC_FIELDS.RESPONSE_ISSUE_DATE,
                TRANS_RESP_REC_FIELDS.REASON,
                TRANS_RESP_REC_FIELDS.DIRECTION,
                TRANS_RESP_REC_FIELDS.RESPONSE_STATUS,
            ],
            trRec
        );

        if (isCreateMode) {
            var statusVal = trRec.getValue(
                TRANS_RESP_REC_FIELDS.RESPONSE_STATUS
            );
            var statusScriptId = utils.getScriptIdUsingInternalId(
                TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                statusVal
            );
            if (
                statusScriptId !==
                TRANS_RESP_STATUS_LIST_VAL.READY_FOR_GENERATION
            ) {
                throw error.create({
                    name: ERR_CODE_OBJ_TRANS_RESP_INVALID_STATUS.NAME,
                    message:
                        translator.getString(
                            ERR_CODE_OBJ_TRANS_RESP_INVALID_STATUS.MESSAGE_TRANSLATION_CODE
                        ) || ERR_CODE_OBJ_TRANS_RESP_INVALID_STATUS.MESSAGE,
                    notifyOff: true,
                });
            }
        }
        log.debug("trHelper: validateTRFields(): validation succesful", true);

        return true;
    }

    /**
     * Validates few conditions before sending a cancellation or rejection request
     * @param tranId
     * @param subId
     * @param avalaraMandate
     * @param tranType
     */
    function validateBeforeSending(
        tranId,
        subId,
        avalaraMandate,
        tranType,
        entityId
    ) {
        var result = {
            err_code: "",
            err_msg: "",
            isValidToSend: true,
        };
        // To check if subsidiary is linked or not and if linked it is active or not and
        // transaction response support is presnet for that or not
        try {
            if (!tranId) {
                var noLinkedTransMsg =
                    translator.getString(
                        ERR_CODE_OBJ_TRANS_NOT_LINKED.MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_TRANS_NOT_LINKED.MESSAGE;
                returnErrorObject(
                    ERR_CODE_OBJ_TRANS_NOT_LINKED.NAME,
                    noLinkedTransMsg
                );
            }

            //Check subsidiary and subsidiary pref related validations
            validateSubsidiaryPrefData(
                subId,
                avalaraMandate,
                entityId,
                tranType
            );
            // Check if Mandate used is active or not.
            validateMandateStatus(avalaraMandate, subId);

            // Condition to check if Bill is approved or not
            validateBillApprovalStatus(tranId, tranType);

            // Validate the entity
            validateEntity(entityId, tranType);
            log.debug("trHelper_validateBeforeSending result", result);
        } catch (err) {
            log.error(
                "Error occured in validateBeforeSending",
                err.name + "  " + err.stack
            );
            result.err_code = err.name;
            result.err_msg = err.message;
            result.isValidToSend = false;
            return result;
        }
        log.debug("trHelper: validateBeforeSending", result);
        return result;
    }

    /**
     * Updates fields for update based on transaction response generation result
     * @param trGenResult
     * @param fieldsForUpdate
     */
    function updateFieldsForUpdateOnGeneration(trGenResult, fieldsForUpdate) {
        if (trGenResult.success) {
            // Reset error fields on successful generation of transaction response
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.ERR_CODE] = "";
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.ERR_MSG] = "";
            // Below fields to update on successful generation of transaction response
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.RESPONSE_STATUS] =
                utils.getInternalIdUsingScriptId(
                    TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                    TRANS_RESP_STATUS_LIST_VAL.READY_FOR_SENDING
                );
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.RESPONSE_BODY] =
                trGenResult.data;
        } else if (
            trGenResult.errDetails.name &&
            trGenResult.errDetails.message
        ) {
            // Below fields to update on unsuccessful generation of transaction response
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.ERR_CODE] =
                trGenResult.errDetails.name;
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.ERR_MSG] =
                trGenResult.errDetails.message;
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.RESPONSE_STATUS] =
                utils.getInternalIdUsingScriptId(
                    TRANSACTION_RESPONSE_STATUS_LIST_TYPE,
                    TRANS_RESP_STATUS_LIST_VAL.GENERATION_FAILED
                );
        }
    }

    /**
     * Submit fields for update based on transaction response generation result
     * @param trGenResult
     * @param fieldsForUpdate
     * @param avalaraMandate
     */
    function submitFieldsAfterGeneration(
        trGenResult,
        fieldsForUpdate,
        avalaraMandate
    ) {
        log.debug("submitFieldsAfterGeneration(): trGenResult", trGenResult);

        if (trGenResult.data || trGenResult.errDetails !== null) {
            updateFieldsForUpdateOnGeneration(trGenResult, fieldsForUpdate);
        }

        if (trGenResult.isCreateMode && trGenResult.transRespId) {
            fieldsForUpdate[TRANS_RESP_REC_FIELDS.RESPONSE_LINK] =
                getTransactionResponseRecUrl(trGenResult.transRespId);
        }

        log.debug(
            "submitFieldsAfterGeneration(): fieldsForUpdate",
            fieldsForUpdate
        );

        if (Object.keys(fieldsForUpdate).length) {
            var parentRecInternalId = utils.updateFieldValues(
                TRANSACTION_RESPONSE_REC_TYPE,
                trGenResult.transRespId,
                fieldsForUpdate
            );
            log.debug(
                "submitFieldsAfterGeneration(): updated TR record",
                parentRecInternalId
            );
        }

        if (avalaraMandate && trGenResult.success) {
            licenseManager.lockFreeCountry();
        }
    }

    /**
     * This function is used only to validate a subsidiary and its related data before sending
     * a transaction response.
     * @param {*} subId
     * @param {*} avalaraMandate
     * @param {*} entityId
     * @param {*} tranType
     */
    function validateSubsidiaryPrefData(
        subId,
        avalaraMandate,
        entityId,
        tranType
    ) {
        if (subId) {
            var transRespSubPrefData = utils.transRespAllowedData(subId);
            if (!transRespSubPrefData.isSubActive) {
                var subInactiveMsg =
                    translator.getString(
                        ERR_CODE_OBJ_SUBSIDIARY_INACTIVE.MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_SUBSIDIARY_INACTIVE.MESSAGE;

                returnErrorObject(
                    ERR_CODE_OBJ_SUBSIDIARY_INACTIVE.NAME,
                    subInactiveMsg
                );
            }
            if (!transRespSubPrefData.isTransRespSupportEnabled) {
                var transResNotSupportedMsg =
                    translator.getString(
                        ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED.MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED.MESSAGE;
                returnErrorObject(
                    ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED.NAME,
                    transResNotSupportedMsg
                );
            }
            if (!avalaraMandate) {
                var entityType = getEntityType(tranType);
                validateTRSendingMethod(
                    transRespSubPrefData.sendMethId,
                    entityId,
                    entityType
                );
            }
        } else {
            var subNotFoundErrMsg =
                translator.getString(
                    ERR_CODE_OBJ_SUB_NOT_FOUND.MESSAGE_TRANSLATION_CODE
                ) || ERR_CODE_OBJ_SUB_NOT_FOUND.MESSAGE;
            returnErrorObject(
                ERR_CODE_OBJ_SUB_NOT_FOUND.NAME,
                subNotFoundErrMsg
            );
        }
    }

    /**
     * This function creates an object with error code, message and a boolean and returns it.
     * @param {*} errCode
     * @param {*} errMsg
     * @returns
     */
    function returnErrorObject(errCode, errMsg) {
        throw error.create({
            name: errCode,
            message: errMsg,
            notifyOff: true,
        });
    }

    /** Returns preview download script link with query parameters
     * @param  params
     * @returns string
     */
    function getPreviewOrDownloadLink(params) {
        return url.resolveScript({
            scriptId: PREVIEW_DOWNLOAD_SCRIPT,
            deploymentId: PREVIEW_DOWNLOAD_DEPLOY,
            params: params,
        });
    }

    /**
     * This function validates the Entity associated with the Transaction of the transaction response
     * @param {*} entityId
     * @param {*} tranType
     * @returns errorObject
     */
    function validateEntity(entityId, tranType) {
        log.debug("validateEntity -> entityId", entityId);
        log.debug("validateEntity -> tranType", tranType);
        var entityType = appTransMap.isSalesTransaction(tranType, false)
            ? record.Type.CUSTOMER
            : record.Type.VENDOR;
        log.debug("validateEntity -> entityType", entityType);
        var entityDetails = sendingMgr.getEntityDetails(entityId, entityType);
        log.debug("validateEntity -> entityDetails", entityDetails);
        if (entityDetails.isinactive) {
            var customerInactiveMessage =
                translator.getString(
                    ERR_CODE_OBJ_CUSTOMER_INACTIVE.MESSAGE_TRANSLATION_CODE
                ) || ERR_CODE_OBJ_CUSTOMER_INACTIVE.MESSAGE;
            var vendorInactiveMessage =
                translator.getString(
                    ERR_CODE_OBJ_VENDOR_INACTIVE.MESSAGE_TRANSLATION_CODE
                ) || ERR_CODE_OBJ_VENDOR_INACTIVE.message;
            var inactiveMessage =
                entityType === record.Type.CUSTOMER
                    ? customerInactiveMessage
                    : vendorInactiveMessage;
            returnErrorObject(
                ERR_CODE_OBJ_VENDOR_INACTIVE.NAME,
                inactiveMessage
            );
        }
    }

    /**
     * This function validates the Transaction Response sending method selected at
     * the subsidiary pref
     * @param {*} sendMethId
     * @param {*} entityId
     * @param {*} entityType
     */
    function validateTRSendingMethod(sendMethId, entityId, entityType) {
        var EMAIL = "email";
        if (sendMethId) {
            var trSendMethResult = utils.getTRSendMethdDetails(sendMethId);
            if (trSendMethResult.isInactive) {
                trSendMethodErrorMessage();
            } else if (trSendMethResult.channel === EMAIL) {
                validateRecipientList(entityId, entityType);
            }
        } else {
            trSendMethodErrorMessage();
        }
    }

    /**
     * This function evaluates the error message for TR Sending method and return the error object
     */
    function trSendMethodErrorMessage() {
        var trSendMethNotFoundErrMsg =
            translator.getString(
                ERR_CODE_TRANS_RES_SEND_METH_INACTIVE_OR_MISSING.MESSAGE_TRANSLATION_CODE
            ) || ERR_CODE_TRANS_RES_SEND_METH_INACTIVE_OR_MISSING.MESSAGE;
        returnErrorObject(
            ERR_CODE_TRANS_RES_SEND_METH_INACTIVE_OR_MISSING.NAME,
            trSendMethNotFoundErrMsg
        );
    }

    /**
     * This function validates if the transaction is Bill or not, if it is Bill it validates if
     * its approved or not, if approved then returns the error object.
     * returns error object
     * @param {*} tranId
     */
    function validateBillApprovalStatus(tranId, tranType) {
        if (
            appTransMap.getRecordType(tranType) === record.Type.VENDOR_BILL &&
            isBillApproved(tranId)
        ) {
            stringFormatter.setString(
                translator.getString(
                    ERR_CODE_OBJ_BILL_IS_APPROVED_SEND.MESSAGE_TRANSLATION_CODE
                ) || ERR_CODE_OBJ_BILL_IS_APPROVED_SEND.MESSAGE
            );
            stringFormatter.replaceParameters({
                ID: tranId,
            });
            returnErrorObject(
                ERR_CODE_OBJ_BILL_IS_APPROVED_SEND.NAME,
                stringFormatter.toString()
            );
        }
    }

    /**
     * This function returns the entity type depending on the tranType
     * @param {*} tranType
     * @returns Entity Type - Customer Or Vendor
     */
    function getEntityType(tranType) {
        return appTransMap.isSalesTransaction(tranType, false)
            ? record.Type.CUSTOMER
            : record.Type.VENDOR;
    }

    /**
     * This function validates the Mandate status, whether it is active or inactive
     * and returns the errorObject if it is inactive
     * @param {*} avalaraMandate
     * @param {*} subId
     */
    function validateMandateStatus(avalaraMandate, subId) {
        if (
            avalaraMandate &&
            !utils.isMandateStatusActive(subId, avalaraMandate)
        ) {
            stringFormatter.setString(
                translator.getString(
                    ERR_CODE_OBJ_MANDATE_NOT_ACTIVE.MESSAGE_TRANSLATION_CODE
                ) || ERR_CODE_OBJ_MANDATE_NOT_ACTIVE.MESSAGE
            );
            stringFormatter.replaceParameters({
                MANDATE_NAME: avalaraMandate,
            });
            returnErrorObject(
                ERR_CODE_OBJ_MANDATE_NOT_ACTIVE.NAME,
                stringFormatter.toString()
            );
        }
    }

    /**
     * This function validates the recipient list for Non Avalara users where TR Sending method
     * is used for sending the Transaction Response Content. If there is some problem with the
     * entityList then it returns the error object.
     * @param {*} entityId
     * @param {*} entityType
     */
    function validateRecipientList(entityId, entityType) {
        var errMsg;
        var errCode;
        var entityDetails = sendingMgr.getEntityDetails(entityId, entityType);
        if (entityDetails.isperson && !entityDetails.email) {
            errMsg = getTranslatedErrorMessageForEntity(
                entityType,
                ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_CUSTOMER,
                ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_VENDOR
            );
            errCode = getTranslatedErrorCodeForEntity(
                entityType,
                ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_CUSTOMER,
                ERR_CODE_TR_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL_VENDOR
            );
            returnErrorObject(errCode, errMsg);
        } else if (!entityDetails.isperson) {
            var recipientList = getRecipientListByEntity(
                entityType,
                entityId,
                false,
                entityDetails
            );
            if (!recipientList.length) {
                errMsg = getTranslatedErrorMessageForEntity(
                    entityType,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_CUSTOMER,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_VENDOR
                );
                errCode = getTranslatedErrorCodeForEntity(
                    entityType,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_CUSTOMER,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_VENDOR
                );
                returnErrorObject(errCode, errMsg);
            } else if (recipientList.indexOf("") !== -1) {
                errMsg = getTranslatedErrorMessageForEntity(
                    entityType,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_CUSTOMER,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_VENDOR
                );
                errCode = getTranslatedErrorCodeForEntity(
                    entityType,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_CUSTOMER,
                    ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL_VENDOR
                );
                returnErrorObject(errCode, errMsg);
            }
        }
    }

    /**
     * This function returns the translated Error Message for Entity.
     * @param {*} entityType
     * @param {*} messageObjCust
     * @param {*} messageObjVend
     * @returns Error Message
     */
    function getTranslatedErrorMessageForEntity(
        entityType,
        messageObjCust,
        messageObjVend
    ) {
        return entityType === record.Type.CUSTOMER
            ? translator.getString(messageObjCust.MESSAGE_TRANSLATION_CODE) ||
                  messageObjCust.MESSAGE
            : translator.getString(messageObjVend.MESSAGE_TRANSLATION_CODE) ||
                  messageObjVend.MESSAGE;
    }

    /**
     * This function returns the translated Error Message for Entity.
     * @param {*} entityType
     * @param {*} messageObjCust
     * @param {*} messageObjVend
     * @returns Error Code
     */
    function getTranslatedErrorCodeForEntity(
        entityType,
        messageObjCust,
        messageObjVend
    ) {
        return entityType === record.Type.CUSTOMER
            ? messageObjCust.NAME
            : messageObjVend.NAME;
    }

    /**
     * This function returns the relevant recipient list by entity
     * @param {*} entityType
     * @param {*} entityId
     * @param {*} isIndividual
     * @param {*} entityDetails
     * @returns array
     */
    function getRecipientListByEntity(
        entityType,
        entityId,
        isIndividual,
        entityDetails
    ) {
        var recipientList = [];
        if (!isIndividual) {
            recipientList =
                entityType === record.Type.VENDOR
                    ? daoVendor.loadEIRecipients(entityId)
                    : daoCustomer.loadEIRecipients(entityId);
        } else {
            recipientList.push(entityDetails.email);
        }
        log.debug("trHelper: getRecipientListByEntity", recipientList);
        return recipientList;
    }

    /**
     * This function return an object which contains the details of the Sender.
     * @returns Object
     */
    function getSenderDetails(sender) {
        var owner = utils.getOwner();
        return sender
            ? sendingMgr.getSenderDetails(sender)
            : sendingMgr.getSenderDetails(owner);
    }

    /** Returns file name of transaction response based on transaction linked or not and options passed
     * @param options
     * @param isTranLinked
     * @returns string
     */
    function getTransRespFileName(options, isTranLinked) {
        var fileNameSuffix =
            options.recId + tranRespFNameContent + options.extension;

        if (isTranLinked) return tranFNamePrefix + fileNameSuffix;

        return inboundEdocFNamePrefix + fileNameSuffix;
    }

    /**
     * Returns rich text url for preview and download based on the parameters
     * @param options
     * @param isTranLinked
     * @returns string
     */
    function getPreviewAndDownloadLinkRichText(options, isTranLinked) {
        var fileName = getTransRespFileName(
            {
                recId: options.id,
                extension: options.extension,
            },
            isTranLinked
        );
        var previewParams = {
            fileFormat: options.extension,
            fileContent: options.data,
            command: PREVIEW,
        };
        var previewUrl = getPreviewOrDownloadLink(previewParams);

        var downloadParams = {
            fileName: fileName,
            fileFormat: options.extension,
            fileContent: options.data,
            command: DOWNLOAD,
        };
        var downloadUrlVal = getPreviewOrDownloadLink(downloadParams);

        var linkTextParams = {
            urlVal: previewUrl,
            fileName: fileName,
            downloadUrlVal: downloadUrlVal,
        };

        return contentManager.getLinkRichText(linkTextParams);
    }

    function isValidStatusToRestrictDelete(transRespStatusScriptId) {
        log.debug(
            "trHelper: isValidStatusToRestrictDelete(): transRespStatusScriptId",
            transRespStatusScriptId
        );

        return (
            [
                TRANS_RESP_STATUS_LIST_VAL.PROCESSING,
                TRANS_RESP_STATUS_LIST_VAL.IN_ERROR,
                TRANS_RESP_STATUS_LIST_VAL.CANCELLED,
                TRANS_RESP_STATUS_LIST_VAL.REQ_COMPLETED,
                TRANS_RESP_STATUS_LIST_VAL.SENT,
            ].indexOf(transRespStatusScriptId) !== -1
        );
    }

    /**
     * Returns array of licenses keys based on transaction response script ID
     * @param responseStatusScriptId
     */
    function getReqLicencesList(responseStatusScriptId) {
        var reqLicencesList = [];

        switch (responseStatusScriptId) {
            case TRANS_RESP_STATUS_LIST_VAL.READY_FOR_SENDING:
            case TRANS_RESP_STATUS_LIST_VAL.SENDING_FAILED:
            case TRANS_RESP_STATUS_LIST_VAL.IN_ERROR:
                reqLicencesList.push(constants.EI_BUNDLE_KEY);
                reqLicencesList.push(constants.NSEB_BUNDLE_KEY);
                reqLicencesList.push(constants.AVALARA_BUNDLE_KEY);
                break;
            case TRANS_RESP_STATUS_LIST_VAL.READY_FOR_GENERATION:
            case TRANS_RESP_STATUS_LIST_VAL.GENERATION_FAILED:
                reqLicencesList.push(constants.EI_BUNDLE_KEY);
                break;
        }

        return reqLicencesList;
    }

    /**
     * Returns license information based on the parameters sent
     * @param responseStatusScriptId
     * @param avalaraMandate
     * @param subsidiaryId
     * @returns { hasLicense: boolean, warnMsg: string, genBtnDisable: boolean, sendBtnDisable: boolean}
     */
    function getReqLicensesInfo(
        responseStatusScriptId,
        avalaraMandate,
        subsidiaryId
    ) {
        var trReqLicenseInfo = {
            hasLicense: false,
            warnMsg: "",
            genBtnDisable: false,
            sendBtnDisable: false,
        };

        var reqLicencesList = getReqLicencesList(responseStatusScriptId);
        log.debug("getReqLicensesInfo(): reqLicencesList", reqLicencesList);

        if (!avalaraMandate || reqLicencesList.length === 0) {
            trReqLicenseInfo.hasLicense = true;
            log.debug(
                "getReqLicensesInfo(): trReqLicenseInfo",
                trReqLicenseInfo
            );

            return trReqLicenseInfo;
        }

        var licensesInfo = licenseManager.getLicenseInfos(reqLicencesList);
        var missingLicenses = [];

        for (var i = 0; i < reqLicencesList.length; i++) {
            var licenseInfo = licensesInfo[i];

            log.debug(
                "getReqLicensesInfo(): licenseInfo " + reqLicencesList[i],
                licenseInfo
            );
            if (licenseInfo.hasLicense) {
                continue;
            }
            if (licenseInfo.errorCode === constants.NO_LICENSE_CLIENT_CODE) {
                trReqLicenseInfo.genBtnDisable = true;
                trReqLicenseInfo.sendBtnDisable = true;
                trReqLicenseInfo.warnMsg = utils.getTranslatedContent(
                    REQ_LICENSES_MISSING_BANNER_OBJ.NO_LC_BUNDLE,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                );
                return trReqLicenseInfo;
            }
            if (reqLicencesList[i] === constants.EI_BUNDLE_KEY) {
                trReqLicenseInfo.warnMsg = getEILicenseWarnMsg(
                    licenseInfo,
                    subsidiaryId
                );
                if (trReqLicenseInfo.warnMsg) {
                    trReqLicenseInfo.genBtnDisable = true;
                }
            } else {
                trReqLicenseInfo.sendBtnDisable = true;
                missingLicenses.push(LICENSES[reqLicencesList[i]]);
            }
        }

        trReqLicenseInfo.warnMsg += getMissingLicensesWarnMsg(
            missingLicenses,
            trReqLicenseInfo.warnMsg
        );

        trReqLicenseInfo.hasLicense = !Boolean(trReqLicenseInfo.warnMsg);

        log.debug("getReqLicensesInfo(): trReqLicenseInfo", trReqLicenseInfo);

        return trReqLicenseInfo;
    }

    /**
     * Returns missing licenses warning message based on missing Licenses array
     * @param missingLicenses
     * @param warnMsg
     * @returns string
     */
    function getMissingLicensesWarnMsg(missingLicenses, warnMsg) {
        if (!missingLicenses.length) {
            return "";
        }

        var missingLicensesWarnMsg = warnMsg ? "&lt;br&gt;" : "";

        stringFormatter.setString(
            utils.getTranslatedContent(
                REQ_LICENSES_MISSING_BANNER_OBJ,
                mainConstants.TRANSLATE_TYPES.MESSAGE
            )
        );
        stringFormatter.replaceParameters({
            REQ_LICENSES: missingLicenses.join(", "),
        });
        missingLicensesWarnMsg += stringFormatter.toString();

        return missingLicensesWarnMsg;
    }

    /**
     * Returns EI license warning message if Free country is not set or not matching for OW account
     * @param licenseInfo
     * @param subsidiaryId
     */
    function getEILicenseWarnMsg(licenseInfo, subsidiaryId) {
        var eiWarnMsg = "";
        if (licenseManager.isOWWithInactiveEILicense(licenseInfo)) {
            var companyInfoCountry =
                freeCountryCheckHelper.getValueOfAllowedFreeCountry();
            if (!companyInfoCountry || companyInfoCountry.length === 0) {
                eiWarnMsg = utils.getTranslatedContent(
                    REQ_LICENSES_MISSING_BANNER_OBJ.EI.FC_NOT_SET,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                );
            } else if (
                !freeCountryCheckHelper.ifFreeCountrySameAsInTxn(subsidiaryId)
            ) {
                eiWarnMsg = utils.getTranslatedContent(
                    REQ_LICENSES_MISSING_BANNER_OBJ.EI.FC_NOT_MATCHING,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                );
            }
        }
        return eiWarnMsg;
    }

    return {
        isBillApproved: isBillApproved,
        getTransRespTemplateData: getTransRespTemplateData,
        isValidResponseType: isValidResponseType,
        isValidStatusForBtn: isValidStatusForBtn,
        showBannerBasedOnStatus: showBannerBasedOnStatus,
        hideFieldsBasedOnType: hideFieldsBasedOnType,
        updateReasonFldLabel: updateReasonFldLabel,
        validateTRFields: validateTRFields,
        validateBeforeSending: validateBeforeSending,
        submitFieldsAfterGeneration: submitFieldsAfterGeneration,
        getRecipientListByEntity: getRecipientListByEntity,
        getSenderDetails: getSenderDetails,
        getEntityType: getEntityType,
        getPreviewAndDownloadLinkRichText: getPreviewAndDownloadLinkRichText,
        isValidStatusToRestrictDelete: isValidStatusToRestrictDelete,
        getReqLicensesInfo: getReqLicensesInfo,
    };
});
