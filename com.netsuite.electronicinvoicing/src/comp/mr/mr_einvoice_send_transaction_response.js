/**
​
 * @NApiVersion 2.x
​
 * @NScriptType mapreducescript
​
 */

define([
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "../../app/einvoice/app_einvoice_transaction_response",
    "../../app/einvoice/app_einvoice_sending_manager",
    "../../app/einvoice/app_einvoice_sending_plugin_manager",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../app/audit/app_audit_manager",
    "N/runtime",
    "N/record",
    "N/error",
    "../../app/einvoice/app_einvoice_notifier",
    "../../data/dao_customer",
    "../../data/dao_vendor",
    "../../lib/app/app_transaction_type_map",
    "../../lib/translator",
    "../../lib/utils",
    "N/search",
    "N/query",
], function (
    subsidiaryPrefGetter,
    transResponse,
    sendingMgr,
    pluginMgr,
    freeCountryCheckHelper,
    auditManager,
    runtime,
    record,
    error,
    notifier,
    customerDAO,
    vendorDAO,
    transactionMap,
    translator,
    utils,
    search,
    query
) {
    var SENDING_METHOD = "custrecord_psg_ei_send_meth_trans_res";
    var SENDER = "custrecord_psg_ei_sub_sender";
    var SENDING_METHOD_REC = "customrecord_ei_sending_method";
    var IMPLEMENTATION_REC = "custrecord_ei_sending_plugin_impl";
    var CHANNEL_REC = "custrecord_ei_sending_method_channel";
    var SCRIPT_ID = "custrecord_ei_sending_method_script";
    var INBOUND_RECORD = "customrecord_psg_ei_inbound_edoc";
    var INBOUND_RECORD_VENDOR = "custrecord_psg_ei_inbound_vendor";
    var INBOUND_RECORD_CUSTOMER = "custrecord_psg_ei_inbound_customer";
    var INBOUND_TRANSACTION_TYPE = "custrecord_psg_ei_inbound_transtype";
    var TRANSACTION_RESPONSE = "customrecord_psg_ei_trans_res";
    var ISINACTIVE_FIELD = "isinactive";
    var SENT_SCRIPT_ID = "val_response_status_sent";
    var IN_ERROR_SCRIPT_ID = "val_response_status_in_error";
    var CUSTOM_LIST_SENT_STATUS = "customlist_psg_ei_sent_status";
    var EMAIL = "email";
    var IS_INDIVIDUAL = true;
    var IS_INACTIVE = true;
    var MSG_RECIPIENT_NO_EMAIL;
    var MSG_NO_RECIPIENTS;
    var MSG_INDIV_CUST_NO_EMAIL;
    var MSG_RECIPIENT_NO_EMAIL_VENDOR;
    var MSG_NO_RECIPIENTS_VENDOR;
    var MSG_INDIV_VEND_NO_EMAIL;
    var NOT_SENT = 2;
    var MSG_EI_INACTIVE_CUSTOMER_MGR;
    var MSG_EI_INACTIVE_VENDOR_MGR;
    var SEND_METHOD_NOT_PRESENT;

    function getTranslations() {
        MSG_RECIPIENT_NO_EMAIL = translator.getString(
            "ei.sending.recipientnoemail"
        );
        MSG_NO_RECIPIENTS = translator.getString("ei.sending.norecipients");
        MSG_INDIV_CUST_NO_EMAIL = translator.getString(
            "ei.sending.indivcustnoemail"
        );
        MSG_EI_INACTIVE_CUSTOMER_MGR = translator.getString(
            "ei.sending.inactivecustomer.manager"
        );
        MSG_RECIPIENT_NO_EMAIL_VENDOR = translator.getString(
            "ei.sending.recipientnoemail.vendor"
        );
        MSG_NO_RECIPIENTS_VENDOR = translator.getString(
            "ei.sending.norecipients.vendor"
        );
        MSG_INDIV_VEND_NO_EMAIL = translator.getString(
            "ei.sending.indivvendnoemail"
        );
        MSG_EI_INACTIVE_VENDOR_MGR = translator.getString(
            "ei.sending.inactivevendor.manager"
        );
    }

    function getInputData() {
        var tranResQuery = query.create({
            type: TRANSACTION_RESPONSE,
        });

        tranResQuery.condition = tranResQuery.and(
            tranResQuery.createCondition({
                fieldId: "isinactive",
                operator: query.Operator.IS,
                values: false,
            }),
            tranResQuery.createCondition({
                fieldId: "custrecord_psg_ei_trans_res_sent",
                operator: query.Operator.EQUAL,
                values: NOT_SENT,
            })
        );
        tranResQuery.columns = [
            tranResQuery.createColumn({
                fieldId: "id",
            }),
            tranResQuery.createColumn({
                fieldId: "custrecord_psg_ei_trans_res_tran_id",
            }),
            tranResQuery.createColumn({
                fieldId: "custrecord_psg_ei_trans_res_inbound",
            }),
            tranResQuery.createColumn({
                fieldId: "custrecord_psg_ei_trans_res_body",
            }),
        ];

        return tranResQuery;
    }

    function map(context) {
        try {
            var contextVal = JSON.parse(context.value);

            var tranResId = contextVal.values[0];

            var transId = contextVal.values[1];
            var transType = "";
            var transCode = "";

            var inbId = contextVal.values[2];
            var entityId;
            var owner = notifier.getFirstActiveAdmin();
            if (inbId) {
                var inboundlookup = search.lookupFields({
                    type: INBOUND_RECORD,
                    id: inbId,
                    columns: [
                        INBOUND_RECORD_VENDOR,
                        INBOUND_RECORD_CUSTOMER,
                        INBOUND_TRANSACTION_TYPE,
                    ],
                });
                transType = transactionMap.getTransactionTypeFromId(
                    inboundlookup[INBOUND_TRANSACTION_TYPE][0].value
                );
                entityId = transactionMap.isSalesTransaction(
                    inboundlookup[INBOUND_TRANSACTION_TYPE][0].value,
                    false
                )
                    ? inboundlookup[INBOUND_RECORD_CUSTOMER][0].value
                    : inboundlookup[INBOUND_RECORD_VENDOR][0].value;
            } else {
                var tranlookup = search.lookupFields({
                    type: search.Type.TRANSACTION,
                    id: transId,
                    columns: ["entity", "type"],
                });
                entityId = tranlookup.entity[0].value;
                transType = transactionMap.getTransactionTypeFromCode(
                    tranlookup.type[0].value
                );
                transCode =  tranlookup.type[0].value;
            }
            var entityType = transactionMap.isSalesTransaction(
                transCode,
                false
            )
                ? record.Type.CUSTOMER
                : record.Type.VENDOR;
            var entityDetails = sendingMgr.getEntityDetails(
                entityId,
                entityType
            );

            var subsidiary = "1";
            if (freeCountryCheckHelper.isOwAccount()) {
                var entitySubsidiary = search.lookupFields({
                    type: entityType,
                    id: entityId,
                    columns: "subsidiary",
                });
                subsidiary = entitySubsidiary.subsidiary[0].value;
            }
            if (
                utils.transRespAllowedData(subsidiary).isTransRespSupportEnabled
            ) {
                var subsidiaryFieldScriptIds = [SENDING_METHOD, SENDER];
                var parentCompanySubsidiaryId =
                    subsidiaryPrefGetter.getParentSubsidiaryId();
                var subsidiaryId = runtime.isFeatureInEffect("SUBSIDIARIES")
                    ? subsidiary
                    : parentCompanySubsidiaryId;
                var subsidiaryPreferencesObj =
                    subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                        subsidiaryId,
                        subsidiaryFieldScriptIds
                    );
                var sender = owner;
                if (subsidiaryPreferencesObj[SENDER]) {
                    sender = subsidiaryPreferencesObj[SENDER];
                }
                var senderDetails = sendingMgr.getSenderDetails(sender);
                var sendingMethodRec = null;
                if (subsidiaryPreferencesObj[SENDING_METHOD]) {
                    sendingMethodRec = record.load({
                        type: SENDING_METHOD_REC,
                        id: subsidiaryPreferencesObj[SENDING_METHOD],
                    });
                }
                if (
                    sendingMethodRec &&
                    !sendingMethodRec.getValue(ISINACTIVE_FIELD)
                ) {
                    var pluginImplementationId =
                        sendingMethodRec.getValue(IMPLEMENTATION_REC);
                    var channel = sendingMethodRec.getValue(CHANNEL_REC);
                    var scriptId = sendingMethodRec.getValue(SCRIPT_ID);
                    if (entityDetails.isinactive === IS_INACTIVE) {
                        var inactiveMessage =
                            entityType === record.Type.CUSTOMER
                                ? MSG_EI_INACTIVE_CUSTOMER_MGR
                                : MSG_EI_INACTIVE_VENDOR_MGR;
                        throw error.create({
                            name: "EI_INACTIVE_ENTITY",
                            message: inactiveMessage,
                            notifyOff: true,
                        });
                    }
                    var recipientList = getRecipientList(
                        channel,
                        entityDetails,
                        entityId,
                        entityType
                    );
                    var plugInContext = {
                        scriptId: scriptId,
                        sendMethodId: subsidiaryPreferencesObj[SENDING_METHOD],
                        eInvoiceContent: contextVal.values[3],
                        attachmentFileIds: [],
                        customPluginImpId: pluginImplementationId,
                        batchOwner: owner,
                        customer: {
                            id: entityId,
                            recipients: recipientList,
                        },
                        transaction: {
                            number: transId,
                            id: transId,
                            type: transType,
                            poNum: null,
                            tranType: transType,
                            subsidiary: subsidiary,
                        },
                        sender: {
                            id: senderDetails.value,
                            name: senderDetails.text,
                            email: senderDetails.email,
                        },
                        userId: owner,
                    };
                    Object.seal(plugInContext);
                    try {
                        pluginMgr.runPlugin(plugInContext, false);
                        var sentInternalId = utils.getInternalIdUsingScriptId(
                            CUSTOM_LIST_SENT_STATUS,
                            SENT_SCRIPT_ID
                        );
                        record.submitFields({
                            type: TRANSACTION_RESPONSE,
                            id: tranResId,
                            values: {
                                custrecord_psg_ei_trans_res_sent:
                                    sentInternalId,
                                custrecord_psg_ei_trans_res_sent_date:
                                    new Date(),
                                custrecord_psg_ei_trans_res_err_message: "",
                                custrecord_psg_ei_trans_res_err_code: "",
                            },
                        });
                    } catch (e) {
                        log.error(
                            "mr_einvoice_send_transaction_response : map",
                            "error occured in map stage"
                        );
                        logAuditTrail(
                            transId,
                            inbId,
                            entityId,
                            owner,
                            e.name + ": " + e.message
                        );
                        var inErrorId = utils.getInternalIdUsingScriptId(
                            CUSTOM_LIST_SENT_STATUS,
                            IN_ERROR_SCRIPT_ID
                        );
                        record.submitFields({
                            type: TRANSACTION_RESPONSE,
                            id: tranResId,
                            values: {
                                custrecord_psg_ei_trans_res_err_message:
                                    e.message,
                                custrecord_psg_ei_trans_res_sent: inErrorId,
                                custrecord_psg_ei_trans_res_err_code:
                                    "ERR_TR_SENDING_FAILED",
                            },
                        });
                    }
                } else {
                    SEND_METHOD_NOT_PRESENT = translator.getString(
                        "ei.sending.subsidiary.method.notpresent"
                    );
                    logAuditTrail(
                        transId,
                        inbId,
                        entityId,
                        owner,
                        SEND_METHOD_NOT_PRESENT
                    );
                }
            }
        } catch (ex) {
            log.debug("Error in Map Stage", ex.message);
        }
    }

    function getRecipientList(channel, entityDetails, entityId, entityType) {
        getTranslations();
        var recipientList = [];
        if (channel === EMAIL) {
            if (entityDetails.isperson === IS_INDIVIDUAL) {
                if (entityDetails.email === "") {
                    var messageForIndividual;
                    messageForIndividual =
                        entityType === record.Type.CUSTOMER
                            ? MSG_INDIV_CUST_NO_EMAIL
                            : MSG_INDIV_VEND_NO_EMAIL;
                    throw error.create({
                        name: "EI_SENDING_NO_RECIPIENTS",
                        message: messageForIndividual,
                        notifyOff: true,
                    });
                } else {
                    recipientList.push(entityDetails.email);
                }
            } else {
                recipientList =
                    entityType === record.Type.VENDOR
                        ? vendorDAO.loadEIRecipients(entityId)
                        : customerDAO.loadEIRecipients(entityId);
                if (!recipientList.length) {
                    var noRecipientListMessage =
                        entityType === record.Type.CUSTOMER
                            ? MSG_NO_RECIPIENTS
                            : MSG_NO_RECIPIENTS_VENDOR;
                    throw error.create({
                        name: "EI_SENDING_NO_RECIPIENTS",
                        message: noRecipientListMessage,
                        notifyOff: true,
                    });
                } else if (recipientList.indexOf("") !== -1) {
                    //for instances that a recipient list contains a blank email address
                    var noEmailMessage =
                        entityType === record.Type.CUSTOMER
                            ? MSG_RECIPIENT_NO_EMAIL
                            : MSG_RECIPIENT_NO_EMAIL_VENDOR;
                    throw error.create({
                        name: "EI_SENDING_RECIPIENT_NO_EMAIL",
                        message: noEmailMessage,
                        notifyOff: true,
                    });
                }
            }
        }
        return recipientList;
    }

    function logAuditTrail(transId, inbId, entityId, owner, details) {
        try {
            if (transId) {
                auditManager.logTransactionResponseSendingFailed({
                    transaction: transId,
                    entity: entityId,
                    owner: owner,
                    details: details,
                });
            }
            if (inbId) {
                auditManager.logTransactionResponseSendingFailed({
                    inboundEDoc: inbId,
                    entity: entityId,
                    owner: owner,
                    details: details,
                });
            }
        } catch (e) {
            log.error(
                "EI_AUDIT_TRAIL_UPDATE_FAILURE",
                e.name + "\n" + e.message + "\n" + e.stack
            );
        }
    }

    return {
        getInputData: getInputData,
        map: map,
    };
});
