define([
    "N/record",
    "N/url",
    "N/search",
    "N/query",
    "./app_einvoice_cdata_plugin_manager",
    "./app_einvoice_generator",
    "../../data/dao_transaction_response",
    "N/error",
    "../../lib/app/app_transaction_type_map",
    "../../lib/utils",
    "../../lib/translator",
    "../../lib/string_formatter",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_fields",
    "../../lib/constants/record_instances",
    "../../lib/constants/list_values",
    "../../lib/constants/message_translations_map",
    "./app_einvoice_transaction_response_helper",
], function (
    record,
    url,
    search,
    query,
    customDataPluginMgr,
    generator,
    transactionResponseDAO,
    error,
    transactionTypeMap,
    utils,
    translator,
    stringFormatter,
    mainConstants,
    recordFields,
    recordInstances,
    listValues,
    messageTranslationsMap,
    trHelper
) {
    // Record Types
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var INBOUND_EDOC_RECORD_TYPE = RECORD_TYPES.INBOUND_EDOCUMENT;
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;
    var TRANSACTION_RESPONSE_REC_TYPE = RECORD_TYPES.TRANSACTION_RESPONSE;

    // Custom Lists
    var DIRECTION_TYPE_LIST = mainConstants.CUSTOM_LISTS.DIRECTION_TYPE;
    var TRANSACTION_RESPONSE_STATUS_LIST =
        mainConstants.CUSTOM_LISTS.TRANSACTION_RESPONSE_STATUS;

    // Core Fields
    var CORE_FIELDS = mainConstants.CORE_FIELDS;
    var SUBSIDIARY = CORE_FIELDS.SUBSIDIARY;
    var ENTITY = CORE_FIELDS.ENTITY;
    var TYPE_FLD_ID = CORE_FIELDS.TYPE;

    // Record Fields
    var INBOUND_RECORD_VENDOR = recordFields[INBOUND_EDOC_RECORD_TYPE].VENDOR;
    var INBOUND_RECORD_CUSTOMER =
        recordFields[INBOUND_EDOC_RECORD_TYPE].CUSTOMER;
    var TRANSACTION_RESPONSE_REC_FIELDS =
        recordFields[TRANSACTION_RESPONSE_REC_TYPE];

    // Record Instances
    var ACKNOWLEDGED_RESPONSE_STATUS_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].ACKNOWLEDGED;

    // List Values
    var OUTBOUND_DIRECTION_SCRIPT_ID = listValues[DIRECTION_TYPE_LIST].OUTBOUND;
    var TRANS_RESP_STATUS_LIST_VAL =
        listValues[TRANSACTION_RESPONSE_STATUS_LIST];

    // Error Codes
    var ERR_CODES = messageTranslationsMap.ERR_CODES;
    var ERR_CODE_OBJ_BILL_IS_APPROVED = ERR_CODES.ERR_CODE_BILL_IS_APPROVED_GEN;
    var ERR_CODE_OBJ_MANDATE_NOT_ACTIVE = ERR_CODES.ERR_CODE_MANDATE_NOT_ACTIVE;
    var ERR_CODE_OBJ_TEMPLATE_NOT_FOUND = ERR_CODES.ERR_CODE_TEMPLATE_NOT_FOUND;
    var ERR_CODE_OBJ_TEMPLATE_NOT_FOUND_OR_INACTIVE =
        ERR_CODES.ERR_CODE_TEMPLATE_NOT_FOUND_OR_INACTIVE;
    var ERR_CODE_OBJ_SUBSIDIARY_INACTIVE =
        ERR_CODES.ERR_CODE_SUBSIDIARY_INACTIVE;
    var ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED =
        ERR_CODES.ERR_CODE_TRANS_RES_NOT_SUPPORTED;
    var ERR_CODE_OBJ_ENTITY_INACTIVE = ERR_CODES.ERR_CODE_ENTITY_INACTIVE;
    var ERR_CODE_OBJ_CDS_FAILURE = ERR_CODES.ERR_CODE_CDS_FAILURE;

    /**
     * Returns Transaction response content based on the params passed
     * @param isTransRespLinkedToTran
     * @param entityObj
     * @param recId
     * @param recType
     * @param transactionResponseRecId
     * @param responseTemplate
     * @returns string
     */
    function generateTransRespContent(
        isTransRespLinkedToTran,
        entityObj,
        recId,
        recType,
        transactionResponseRecId,
        responseTemplate
    ) {
        var content = "";

        try {
            var transObj = {};
            var renderJson = {};
            var pluginImpl = responseTemplate.outboundPlug;
            var params;
            if (isTransRespLinkedToTran && pluginImpl) {
                transObj = record.load({
                    type: recType,
                    id: recId,
                });
                params = {
                    transactionRecord: transObj,
                    transactionId: recId,
                    transactionResponseRecId: transactionResponseRecId,
                };
            } else {
                params = {
                    transactionResponseRecId: transactionResponseRecId,
                };
            }
            if (pluginImpl) {
                try {
                    renderJson = customDataPluginMgr.runPlugin(
                        params,
                        pluginImpl
                    );
                    if (renderJson && renderJson.result) {
                        var cdsResult = renderJson.result;
                        var cdsMsg = cdsResult.eiAuditTrailMsg;
                        if (!cdsResult.success) {
                            throw error.create({
                                name: ERR_CODE_OBJ_CDS_FAILURE.NAME,
                                message:
                                    cdsMsg || ERR_CODE_OBJ_CDS_FAILURE.MESSAGE,
                                notifyOff: true,
                            });
                        }
                    }
                } catch (e) {
                    log.error("generateTransRespContent(): CDS error", e);
                    throw e;
                }
            }
            content = generator.getContent(
                responseTemplate.outboundTemp,
                transObj,
                entityObj,
                renderJson
            );
            log.debug("generateTransRespContent(): content", content);
        } catch (e) {
            log.error("generateTransRespContent(): error", e);
            throw e;
        }
        return content;
    }

    /**
     * Returns transaction response content by validating the params
     * @param params
     * @returns string
     */
    function getTransRespContent(params) {
        var transRespContent = "";
        try {
            log.debug("getTransRespContent(): params", params);

            var tranDetails = utils.getTransactionDetails(
                params.transRespTranId,
                [TYPE_FLD_ID, ENTITY, SUBSIDIARY]
            );

            var txnType = tranDetails[TYPE_FLD_ID];
            var txnRecType = transactionTypeMap.getRecordType(txnType);
            var entityId = tranDetails[ENTITY];
            var subsidiaryId = tranDetails[SUBSIDIARY];
            var avalaraMandate = params.avalaraMandate;

            if (
                txnRecType === record.Type.VENDOR_BILL &&
                trHelper.isBillApproved(params.transRespTranId)
            ) {
                stringFormatter.setString(
                    utils.getTranslatedContent(
                        ERR_CODE_OBJ_BILL_IS_APPROVED,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    )
                );
                stringFormatter.replaceParameters({
                    ID: params.transRespTranId,
                });
                var errMsgBillApproved = stringFormatter.toString();
                throw error.create({
                    name: ERR_CODE_OBJ_BILL_IS_APPROVED.NAME,
                    message: errMsgBillApproved,
                    notifyOff: true,
                });
            }

            log.debug("getTransRespContent(): avalaraMandate", avalaraMandate);
            if (
                avalaraMandate &&
                !utils.isMandateStatusActive(subsidiaryId, avalaraMandate)
            ) {
                stringFormatter.setString(
                    utils.getTranslatedContent(
                        ERR_CODE_OBJ_MANDATE_NOT_ACTIVE,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    )
                );
                stringFormatter.replaceParameters({
                    MANDATE_NAME: avalaraMandate,
                });
                var errMsgMandateNotActive = stringFormatter.toString();
                throw error.create({
                    name: ERR_CODE_OBJ_MANDATE_NOT_ACTIVE.NAME,
                    message: errMsgMandateNotActive,
                    notifyOff: true,
                });
            }

            var entityType = utils.getEntityRecTypeUsingTransCode(txnType);

            var entityRec;
            var responseTemplate;
            if (params.tranRespTemplateScriptId) {
                responseTemplate = trHelper.getTransRespTemplateData(
                    {
                        templateScriptId: params.tranRespTemplateScriptId,
                    },
                    true
                );
                if (!responseTemplate.outboundTemp) {
                    throw error.create({
                        name: ERR_CODE_OBJ_TEMPLATE_NOT_FOUND.NAME,
                        message: utils.getTranslatedContent(
                            ERR_CODE_OBJ_TEMPLATE_NOT_FOUND,
                            mainConstants.TRANSLATE_TYPES.MESSAGE
                        ),
                        notifyOff: true,
                    });
                }
            } else {
                responseTemplate = trHelper.getTransRespTemplateData(
                    {
                        subsidiaryId: subsidiaryId,
                        transType: getTrTemplateTransCode(txnType),
                    },
                    false
                );
                if (!responseTemplate.outboundTemp) {
                    throw error.create({
                        name: ERR_CODE_OBJ_TEMPLATE_NOT_FOUND_OR_INACTIVE.NAME,
                        message: utils.getTranslatedContent(
                            ERR_CODE_OBJ_TEMPLATE_NOT_FOUND_OR_INACTIVE,
                            mainConstants.TRANSLATE_TYPES.MESSAGE
                        ),
                        notifyOff: true,
                    });
                }
            }
            if (entityId && entityType) {
                entityRec = record.load({
                    type: entityType,
                    id: entityId,
                });
            }

           throwErrIfEntityInactive(entityRec);

            var transRespAllowedData = utils.transRespAllowedData(subsidiaryId);
            if (!transRespAllowedData.isSubActive) {
                throw error.create({
                    name: ERR_CODE_OBJ_SUBSIDIARY_INACTIVE.NAME,
                    message: utils.getTranslatedContent(
                        ERR_CODE_OBJ_SUBSIDIARY_INACTIVE,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    ),
                    notifyOff: true,
                });
            }
            if (!transRespAllowedData.isTransRespSupportEnabled) {
                throw error.create({
                    name: ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED.NAME,
                    message: utils.getTranslatedContent(
                        ERR_CODE_OBJ_TRANS_RES_NOT_SUPPORTED,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    ),
                    notifyOff: true,
                });
            }

            transRespContent = generateTransRespContent(
                true,
                entityRec,
                params.transRespTranId,
                txnRecType,
                params.transRespId,
                responseTemplate
            );
        } catch (e) {
            log.debug("getTransRespContent(): error", e);
            throw e;
        }

        return transRespContent;
    }

    /**
     * Returns transaction code which needs to be used in Transaction Response Template
     * @param transCode
     * @returns string
     */
    function getTrTemplateTransCode(transCode) {
        var TR_TEMPLATE_TRANS_CODES = {
            VendBill: "CustInvc",
            VendCred: "CustCred",
            SalesOrd: "PurchOrd",
        };

        return TR_TEMPLATE_TRANS_CODES[transCode] || transCode;
    }

    /**
     * createTransactionResponse - This function creates the transaction response for the given record and transtype.
     * @param recId {String/Number} - record Id
     * @param recType {String/Number} - record Type
     * @param status {String/Number} - status of the transaction response
     * @param transType {String/Number} - transaction type for which the transaction response should be created
     */
    function createTransactionResponse(recId, recType, status, transType) {
        var trFieldsForUpdate = {};
        var transactionResponseRecId = null;
        try {
            var entityId;
            var isTransRespLinkedToTran = false;
            var responseBody = "";
            var entityType = transactionTypeMap.isPurchaseTransaction(
                transType,
                false
            )
                ? record.Type.CUSTOMER
                : record.Type.VENDOR;
            if (recType === INBOUND_EDOC_RECORD_TYPE) {
                var inboundlookup = search.lookupFields({
                    type: INBOUND_EDOC_RECORD_TYPE,
                    id: recId,
                    columns: [INBOUND_RECORD_VENDOR, INBOUND_RECORD_CUSTOMER],
                });
                entityId = transactionTypeMap.isPurchaseTransaction(
                    transType,
                    false
                )
                    ? inboundlookup[INBOUND_RECORD_CUSTOMER][0].value
                    : inboundlookup[INBOUND_RECORD_VENDOR][0].value;
            } else {
                var tranlookup = search.lookupFields({
                    type: recType,
                    id: recId,
                    columns: [ENTITY],
                });
                entityId = tranlookup[ENTITY][0].value;
            }
            var entityRec = record.load({ id: entityId, type: entityType });
            var subsidiary = entityRec.getValue(SUBSIDIARY);
            var params = {
                transaction: "",
                status: status,
                responseIssueDate: new Date(),
                direction: utils.getInternalIdUsingScriptId(
                    DIRECTION_TYPE_LIST,
                    OUTBOUND_DIRECTION_SCRIPT_ID
                ),
                sentStatus: utils.getInternalIdUsingScriptId(
                    TRANSACTION_RESPONSE_STATUS_LIST,
                    TRANS_RESP_STATUS_LIST_VAL.NOT_SENT
                ),
                inboundEDoc: "",
            };

            if (
                status ===
                utils.getInternalIdUsingScriptIdQuery(
                    TRANSACTION_RESPONSE_TYPE_REC_TYPE,
                    ACKNOWLEDGED_RESPONSE_STATUS_SCRIPT_ID
                )
            ) {
                params.inboundEDoc = recId;
            } else {
                params.transaction = recId;
                isTransRespLinkedToTran = true;
            }
            var responseTemplate = trHelper.getTransRespTemplateData(
                {
                    subsidiaryId: subsidiary,
                    transType: transType,
                },
                false
            );

            if (responseTemplate.outboundTemp) {
                transactionResponseRecId =
                    transactionResponseDAO.create(params);
                responseBody = generateTransRespContent(
                    isTransRespLinkedToTran,
                    entityRec,
                    recId,
                    recType,
                    transactionResponseRecId,
                    responseTemplate
                );
            }
            if (responseBody !== "") {
                trFieldsForUpdate[
                    TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_BODY
                ] = responseBody;
            }
        } catch (e) {
            log.error(
                "createTransactionResponse(): error",
                e.name + "\n" + e.message + "\n" + e.stack
            );
            trFieldsForUpdate[TRANSACTION_RESPONSE_REC_FIELDS.ERR_CODE] =
                e.name;
            trFieldsForUpdate[TRANSACTION_RESPONSE_REC_FIELDS.ERR_MSG] =
                e.message;
            trFieldsForUpdate[TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_STATUS] =
                utils.getInternalIdUsingScriptId(
                    TRANSACTION_RESPONSE_STATUS_LIST,
                    TRANS_RESP_STATUS_LIST_VAL.IN_ERROR
                );
        }

        if (transactionResponseRecId) {
            var recordUrl = url.resolveRecord({
                recordType: TRANSACTION_RESPONSE_REC_TYPE,
                recordId: transactionResponseRecId,
                isEditMode: false,
            });
            trFieldsForUpdate[TRANSACTION_RESPONSE_REC_FIELDS.RESPONSE_LINK] =
                recordUrl;
            record.submitFields({
                type: TRANSACTION_RESPONSE_REC_TYPE,
                id: transactionResponseRecId,
                values: trFieldsForUpdate,
            });
        }
    }

    /**
     * storeInboundTransactionResponseinTransaction - This function assigns the transaction responses which have the given inbound id to the converted transaction.
     * @param inboundRecId {String/Number} - inbound record Id
     * @param transId {String/Number} - transaction Id
     */
    function storeInboundTransactionResponseinTransaction(
        inboundRecId,
        transId
    ) {
        try {
            var tranResQuery = query.create({
                type: TRANSACTION_RESPONSE_REC_TYPE,
            });

            tranResQuery.condition = tranResQuery.and(
                tranResQuery.createCondition({
                    fieldId: mainConstants.CORE_FIELDS.INACTIVE,
                    operator: query.Operator.IS,
                    values: false,
                }),
                tranResQuery.createCondition({
                    fieldId: TRANSACTION_RESPONSE_REC_FIELDS.INBOUND_EDOCUMENT,
                    operator: query.Operator.EQUAL,
                    values: inboundRecId,
                })
            );
            tranResQuery.columns = [
                tranResQuery.createColumn({
                    fieldId: "id",
                }),
            ];

            var tranResResults = tranResQuery.runPaged({
                pageSize: 1000,
            });
            var iterator = tranResResults.iterator();
            iterator.each(function (result) {
                var page = result.value;
                for (var i = 0; i < page.pageRange.size; i++) {
                    record.submitFields({
                        type: "customrecord_psg_ei_trans_res",
                        id: page.data.results[i].values[0],
                        values: {
                            custrecord_psg_ei_trans_res_tran_id: transId,
                        },
                    });
                }
                return true;
            });
        } catch (e) {
            log.error(
                "TRAN_RES_QUERY_FAILURE",
                e.name + "\n" + e.message + "\n" + e.stack
            );
            throw error.create({
                name: "TRAN_RES_QUERY_FAILURE",
                message: e.name + "\n" + e.message + "\n" + e.stack,
                notifyOff: true,
            });
        }
    }

    /**
     * Throws error object if entity record passed is inactive
     * @param entityRec 
     */
    function throwErrIfEntityInactive(entityRec) {
         if (entityRec.getValue(CORE_FIELDS.INACTIVE)) {
            var entityInactiveErrObj = {
                name: "",
                message: "",
            };
            if (entityRec.type === record.Type.CUSTOMER) {
                entityInactiveErrObj.name =
                    ERR_CODE_OBJ_ENTITY_INACTIVE.CUSTOMER.NAME;
                entityInactiveErrObj.message =
                    translator.getString(
                        ERR_CODE_OBJ_ENTITY_INACTIVE.CUSTOMER
                            .MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_ENTITY_INACTIVE.CUSTOMER.MESSAGE;
            } else {
                entityInactiveErrObj.name =
                    ERR_CODE_OBJ_ENTITY_INACTIVE.VENDOR.NAME;
                entityInactiveErrObj.message =
                    translator.getString(
                        ERR_CODE_OBJ_ENTITY_INACTIVE.VENDOR
                            .MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_ENTITY_INACTIVE.VENDOR.MESSAGE;
            }
            throw error.create({
                name: entityInactiveErrObj.name,
                message: entityInactiveErrObj.message,
                notifyOff: true,
            });
        }
    }

    return {
        createTransactionResponse: createTransactionResponse,
        storeInboundTransactionResponseinTransaction:
            storeInboundTransactionResponseinTransaction,
        getTransRespContent: getTransRespContent,
    };
});
