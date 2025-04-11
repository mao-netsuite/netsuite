/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This class sends the e-document to the customer.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015         ldimayuga
 *
 */
define([
    "N/record",
    "N/file",
    "../audit/app_audit_manager",
    "N/search",
    "./app_einvoice_sending_plugin_manager",
    "../../data/dao_customer",
    "../../data/dao_vendor",
    "N/error",
    "../../lib/string_formatter",
    "N/runtime",
    "../../lib/translator",
    "../../lib/app/app_transaction_type_map",
    "./app_einvoice_subsidiary_pref_getter",
], function (
    record,
    file,
    auditManager,
    search,
    pluginMgr,
    customerDAO,
    vendorDAO,
    error,
    stringFormatter,
    runtime,
    translator,
    transactionMap,
    subsidiaryPrefGetter
) {
    var SENDING_METHOD = "custbody_psg_ei_sending_method";
    var SENDING_METHOD_REC = "customrecord_ei_sending_method";
    var IMPLEMENTATION_REC = "custrecord_ei_sending_plugin_impl";
    var CHANNEL_REC = "custrecord_ei_sending_method_channel";
    var SENDING_CHANNEL =
        SENDING_METHOD + ".custrecord_ei_sending_method_channel";
    var PLUGIN_SCRIPT = SENDING_METHOD + ".custrecord_ei_sending_method_script";
    var PLUGIN_IMPLEMENTATION =
        SENDING_METHOD + ".custrecord_ei_sending_plugin_impl";
    var TRANSACTION_PDF_DOCUMENT = "custbody_edoc_generated_pdf";
    var CERTIFIED_EDOCUMENT = "custbody_psg_ei_certified_edoc";
    var RECIPIENT_FIELD = "custbody_psg_ei_edoc_recipient";
    var ENTITY = "entity";
    var TRANID = "tranid";
    var PO_NUMBER = "otherrefnum";
    var TYPE = "type";
    var INV_CONTENT_FIELD = "custbody_psg_ei_content";
    var STATUS = "custbody_psg_ei_status";
    var SUBSIDIARY = "subsidiary";
    var SENDER = "custrecord_psg_ei_sub_sender";
    var EMAIL = "email";
    var CREATED_FROM = "createdfrom";
    var ORDER_TYPE = "ordertype";
    var SALES_ORDER = "SalesOrd";
    var ITEM_FULFILLMENT = "itemship";
    var VENDOR_RETURN_AUTHORIZATION = "vendauth";
    var TRANSFER_ORDER = "TrnfrOrd";
    var READY_FOR_SENDING = "3";
    var SENT_STATUS = "7";
    var SENDING_FAILED = "8";
    var SENDING_STATUS = "10";
    var READY_FOR_CERTIFICATION = "19";
    var CERTIFICATION_FAILED = "22";
    var IS_INDIVIDUAL = true;
    var IS_INACTIVE = true;
    var EI_CURRENTLY_SENDING = "EI_CURRENTLY_SENDING";
    var EI_NOT_READY_FOR_SENDING = "EI_NOT_READY_FOR_SENDING";
    var EI_ALREADY_SENT = "EI_ALREADY_SENT";
    var NETWORK_REFERENCE_ID = "custbody_ei_network_id";

    var MSG_EI_CURRENTLY_SENDING;
    var MSG_EI_NOT_READY_FOR_SENDING;
    var MSG_EI_ALREADY_SENT;
    var MSG_INVALID_SENDING_METHOD;
    var MSG_NO_EDOCUMENT_RECIPIENTS;
    var MSG_EDOC_RECIPIENT_NO_EMAIL;
    var MSG_RECIPIENT_NO_EMAIL;
    var MSG_NO_RECIPIENTS;
    var MSG_INDIV_CUST_NO_EMAIL;
    var MSG_EI_INACTIVE_CUSTOMER_MGR;
    var MSG_RECIPIENT_NO_EMAIL_VENDOR;
    var MSG_NO_RECIPIENTS_VENDOR;
    var MSG_INDIV_VEND_NO_EMAIL;
    var MSG_EI_INACTIVE_VENDOR_MGR;

    function getTranslations(locale) {
        if (locale) {
            translator.setLocale(locale);
        }

        MSG_EI_CURRENTLY_SENDING = translator.getString(
            "ei.sending.currentlysending"
        );
        MSG_EI_NOT_READY_FOR_SENDING = translator.getString(
            "ei.sending.notready"
        );
        MSG_EI_ALREADY_SENT = translator.getString("ei.sending.alreadysent");
        MSG_INVALID_SENDING_METHOD = translator.getString(
            "ei.sending.invalidmethod"
        );
        MSG_NO_EDOCUMENT_RECIPIENTS = translator.getString(
            "transaction.norecipients"
        );
        MSG_EDOC_RECIPIENT_NO_EMAIL = translator.getString(
            "transaction.contactnoemail"
        );
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

    /**
     * send - This function sends the e-document to the recipients.
     * @param transId {String/Number} - transaction Id
     * @param transType {String/Number} - transaction Type
     * @param batchOwner {String/Number} - User ID (employee)
     * @param certSendingMethod {String/Number} - internal ID of certification E-Document Sending Method record
     * @param locale {String} - User's locale
     * @returns {params.id} - internal Id of the errored transaction
     * @returns {params.details} - details of the errored transaction
     */
    function send(transId, transType, batchOwner, certSendingMethod, locale, isAvalara) {
        // using lookupFields rather than record.load (1 unit vs 10 units)
        var tranColumns = [
            ENTITY,
            TRANID,
            INV_CONTENT_FIELD,
            PO_NUMBER,
            TYPE,
            STATUS,
            SENDING_METHOD,
            PLUGIN_IMPLEMENTATION,
            SENDING_CHANNEL,
            PLUGIN_SCRIPT,
            TRANSACTION_PDF_DOCUMENT,
            RECIPIENT_FIELD,
            CERTIFIED_EDOCUMENT,
        ];
        getTranslations(locale);
        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
        if (isOW) {
            tranColumns.push(SUBSIDIARY);
        }
        var tranDetails = search.lookupFields({
            type: transType,
            id: transId,
            columns: tranColumns,
        });
        var entityId = "";
        if (
            tranDetails.entity !== null &&
            tranDetails.entity[0] !== null &&
            typeof tranDetails.entity[0] !== "undefined"
        ) {
            entityId = tranDetails.entity[0].value;
        }
        var currStatus = tranDetails[STATUS][0].value;
        var tranId = tranDetails.tranid;
        var poNum = tranDetails.otherrefnum;
        var transTypeText = tranDetails.type[0].text;
        var certifiedXmlReceived =
            typeof tranDetails.custbody_psg_ei_certified_edoc !== "undefined" &&
            tranDetails.custbody_psg_ei_certified_edoc.length !== 0;
        var content = certifiedXmlReceived
            ? getCertifiedXML(
                  tranDetails.custbody_psg_ei_certified_edoc[0].value
              )
            : tranDetails.custbody_psg_ei_content;
        var subsidiary =
            tranDetails[SUBSIDIARY] !== undefined
                ? tranDetails[SUBSIDIARY][0].value
                : ""; //if prop is absent, object always returns undefined.
        var channel = tranDetails[SENDING_CHANNEL];
        var scriptId = tranDetails[PLUGIN_SCRIPT][0]
            ? tranDetails[PLUGIN_SCRIPT][0].value
            : 0;
        var certificationActive = isCertificationActive(certSendingMethod);
        var sendMethodId;
        if (certificationActive) sendMethodId = certSendingMethod;
        else if (!isAvalara)
            sendMethodId = tranDetails[SENDING_METHOD][0]
                ? tranDetails[SENDING_METHOD][0].value
                : null;
        var pluginImplementationId = tranDetails[PLUGIN_IMPLEMENTATION];
        var transObj = record.load({
            id: transId,
            type: transType,
        });
        if (certificationActive && !isAvalara) {
            var sendingMethodLookup = search.lookupFields({
                type: SENDING_METHOD_REC,
                id: sendMethodId,
                columns: [IMPLEMENTATION_REC, CHANNEL_REC],
            });
            pluginImplementationId = sendingMethodLookup[IMPLEMENTATION_REC];
            channel = sendingMethodLookup[CHANNEL_REC];
        }
        var transactionPDFFileId =
            tranDetails[TRANSACTION_PDF_DOCUMENT].length > 0
                ? tranDetails[TRANSACTION_PDF_DOCUMENT][0].value
                : null;
        var sender = batchOwner;
        var subsidiaryFieldScriptIds = [SENDER];
        var parentCompanySubsidiaryId =
            subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryId = isOW ? subsidiary : parentCompanySubsidiaryId;
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                subsidiaryId,
                subsidiaryFieldScriptIds
            );
        if (subsidiaryPreferencesObj[SENDER]) {
            sender = subsidiaryPreferencesObj[SENDER];
        }
        var resultDetails = {
            success: true,
            message: "",
        };
        var errorDetails = "";
        var senderDetails = getSenderDetails(sender);
        var newStatus = SENT_STATUS;
        var sentDetails = null;
        if (currStatus === SENDING_STATUS) {
            throw error.create({
                name: EI_CURRENTLY_SENDING,
                message: MSG_EI_CURRENTLY_SENDING,
                notifyOff: true,
            });
        } else if (currStatus === SENT_STATUS) {
            throw error.create({
                name: EI_ALREADY_SENT,
                message: MSG_EI_ALREADY_SENT,
                notifyOff: true,
            });
        } else if (
            currStatus !== READY_FOR_SENDING &&
            currStatus !== SENDING_FAILED &&
            currStatus !== READY_FOR_CERTIFICATION &&
            currStatus !== CERTIFICATION_FAILED
        ) {
            throw error.create({
                name: EI_NOT_READY_FOR_SENDING,
                message: MSG_EI_NOT_READY_FOR_SENDING,
                notifyOff: true,
            });
        }
        var networkReferenceIdFld = transObj.getField({
            fieldId: NETWORK_REFERENCE_ID,
        });
        var containsNetworkFields = networkReferenceIdFld ? true : false;
        try {
            var recipientList = [];
            if (!isAvalara) {
                if (
                    entityId !== null &&
                    entityId !== "" &&
                    typeof entityId !== "undefined"
                ) {
                    //Entity-based transactions
                    if (transType === record.Type.ITEM_FULFILLMENT) {
                        var sourceOrderId = transObj.getValue(CREATED_FROM);
                        var sourceOrderType = transObj.getValue(ORDER_TYPE);
                        var sourceEntityId;
                        if (sourceOrderType === SALES_ORDER) {
                            var lookupSearch = search.lookupFields({
                                type: search.Type.SALES_ORDER,
                                id: sourceOrderId,
                                columns: [ENTITY],
                            });
                            sourceEntityId =
                                lookupSearch[ENTITY].length > 0
                                    ? lookupSearch[ENTITY][0].value
                                    : "";
                            entityId = sourceEntityId;
                        }
                    }
                    /*
                     * transType results to "purchaseorder" type format
                     * tranDetails.type[0].value results to "PurchOrd" type format
                     *
                     * We want "PurchOrd" type format to be the parameter of transactionMap.isSalesTransaction
                     * */
                    var entityType;
                    var transactionType = tranDetails.type[0].value;
                    var sourceOrderType1 = record
                        .load({ id: transId, type: transType })
                        .getValue(ORDER_TYPE);
                    if (transactionMap.isSalesStyleCTT(transType)) {
                        entityType = record.Type.CUSTOMER;
                    } else if (transactionMap.isPurchaseStyleCTT(transType)) {
                        entityType = record.Type.VENDOR;
                    } else {
                        if (
                            sourceOrderType1 &&
                            transactionType.toLowerCase() === ITEM_FULFILLMENT &&
                            sourceOrderType1.toLowerCase() ===
                                VENDOR_RETURN_AUTHORIZATION
                        ) {
                            entityType = record.Type.VENDOR;
                        } else if (
                            transactionMap.isSalesTransaction(transactionType)
                        ) {
                            entityType = record.Type.CUSTOMER;
                        } else {
                            entityType = record.Type.VENDOR;
                        }
                    }
                    var entityDetails = getEntityDetails(entityId, entityType);
                    if (entityDetails.isinactive === IS_INACTIVE) {
                        var EI_INACTIVE_ENTITY = "EI_INACTIVE_ENTITY";
                        var message;
                        if (entityType === record.Type.CUSTOMER) {
                            message = MSG_EI_INACTIVE_CUSTOMER_MGR;
                        } else {
                            message = MSG_EI_INACTIVE_VENDOR_MGR;
                        }
                        resultDetails.success = false;
                        resultDetails.message = EI_INACTIVE_ENTITY + ": " + message;
                        resultDetails.entityType = entityType;
                        return resultDetails;
                    }
                    if (!certificationActive) {
                        setInvoiceStatus(transId, transType, SENDING_STATUS);
                    }
                    if (channel === "") {
                        invalidSendingMethod(transTypeText, tranId);
                    } else {
                        if (channel === EMAIL) {
                            if (entityDetails.isperson === IS_INDIVIDUAL) {
                                if (entityDetails.email === "") {
                                    var messageForIndividual;
                                    if (entityType === record.Type.CUSTOMER) {
                                        messageForIndividual =
                                            MSG_INDIV_CUST_NO_EMAIL;
                                    } else {
                                        messageForIndividual =
                                            MSG_INDIV_VEND_NO_EMAIL;
                                    }
                                    throw error.create({
                                        name: "EI_SENDING_NO_RECIPIENTS",
                                        message: messageForIndividual,
                                        notifyOff: true,
                                    });
                                } else {
                                    recipientList.push(entityDetails.email);
                                }
                            } else {
                                if (
                                    (sourceOrderType1 &&
                                        transactionType.toLowerCase() ===
                                            ITEM_FULFILLMENT &&
                                        sourceOrderType1.toLowerCase() ===
                                            VENDOR_RETURN_AUTHORIZATION) ||
                                    entityType === record.Type.VENDOR
                                ) {
                                    recipientList =
                                        vendorDAO.loadEIRecipients(entityId);
                                } else if (entityType === record.Type.CUSTOMER) {
                                    recipientList =
                                        customerDAO.loadEIRecipients(entityId);
                                }
    
                                if (recipientList.length === 0) {
                                    var noRecipientListMessage;
                                    if (entityType === record.Type.CUSTOMER) {
                                        noRecipientListMessage = MSG_NO_RECIPIENTS;
                                    } else {
                                        noRecipientListMessage =
                                            MSG_NO_RECIPIENTS_VENDOR;
                                    }
                                    throw error.create({
                                        name: "EI_SENDING_NO_RECIPIENTS",
                                        message: noRecipientListMessage,
                                        notifyOff: true,
                                    });
                                } else if (recipientList.indexOf("") !== -1) {
                                    //for instances that a recipient list contains a blank email address
                                    var noEmailMessage;
                                    if (entityType === record.Type.CUSTOMER) {
                                        noEmailMessage = MSG_RECIPIENT_NO_EMAIL;
                                    } else {
                                        noEmailMessage =
                                            MSG_RECIPIENT_NO_EMAIL_VENDOR;
                                    }
                                    throw error.create({
                                        name: "EI_SENDING_RECIPIENT_NO_EMAIL",
                                        message: noEmailMessage,
                                        notifyOff: true,
                                    });
                                }
                            }
                        }
                    }
                } else {
                    if (!certificationActive) {
                        setInvoiceStatus(transId, transType, SENDING_STATUS);
                    }
                    //Entity-less transactions
                    if (channel === "") {
                        invalidSendingMethod(transTypeText, tranId);
                    } else if (channel === EMAIL && !certificationActive) {
                        var transRecipients = getRecipients(
                            transId,
                            transType,
                            tranDetails
                        );
                        recipientList = getEmailDetails(transRecipients);
                    }
                }
            }
            var attachmentFileIds = [];
            if (transactionPDFFileId) {
                attachmentFileIds.push(transactionPDFFileId);
            }
            var plugInContext = {
                scriptId: scriptId,
                sendMethodId: sendMethodId,
                eInvoiceContent: content,
                attachmentFileIds: attachmentFileIds,
                customPluginImpId: pluginImplementationId,
                batchOwner: batchOwner,
                customer: {
                    id: entityId,
                    recipients: recipientList,
                },
                transaction: {
                    number: tranId,
                    id: transId,
                    type: transTypeText,
                    poNum: poNum,
                    tranType: transType,
                    subsidiary: subsidiary,
                },
                sender: {
                    id: senderDetails.value,
                    name: senderDetails.text,
                    email: senderDetails.email,
                },
                userId: batchOwner,
                isAvalara: isAvalara,
            };
            Object.seal(plugInContext);
            sentDetails = pluginMgr.runPlugin(
                plugInContext,
                containsNetworkFields
            );
        } catch (e) {
            log.error(e.name, e.message);
            newStatus = SENDING_FAILED;
            if (e.name !== "") {
                errorDetails = e.name + ": " + e.message;
            } else {
                errorDetails = e.message;
            }
            resultDetails.success = false;
            resultDetails.message = errorDetails;
        }
        try {
            if (!certificationActive && !isAvalara) {
                try {
                    if (!resultDetails.success) {
                        auditManager.logSendingFailed({
                            transaction: transId,
                            entity: entityId,
                            owner: batchOwner,
                            details: errorDetails,
                        });
                    } else {
                        auditManager.logSent({
                            transaction: transId,
                            entity: entityId,
                            owner: batchOwner,
                            details: sentDetails,
                        });
                    }
                } catch (e) {
                    log.error(
                        "EI_AUDIT_TRAIL_UPDATE_FAILURE",
                        e.name + "\n" + e.message + "\n" + e.stack
                    );
                    throw error.create({
                        name: "EI_AUDIT_TRAIL_UPDATE_FAILURE",
                        message: e.name + "\n" + e.message + "\n" + e.stack,
                        notifyOff: true,
                    });
                }
            }
            // update transaction. using submitFields vs record.save, 10 units vs 20 units
            if (!certificationActive && !isAvalara) {
                setInvoiceStatus(transId, transType, newStatus);
            }
        } catch (e) {
            resultDetails.success = false;
            resultDetails.message = e.name + " : " + e.message;
        }
        return resultDetails;
    }

    function isCertificationActive(certSendingMethod) {
        return (
            certSendingMethod !== "" &&
            certSendingMethod !== "undefined" &&
            typeof certSendingMethod !== "undefined"
        );
    }

    function setInvoiceStatus(transId, transType, newStatus) {
        try {
            record.submitFields({
                type: transType,
                id: transId,
                values: {
                    custbody_psg_ei_status: newStatus,
                },
            });
        } catch (e) {
            log.error(
                "EI_EDOC_STATUS_UPDATE_FAILURE",
                e.name + "\n" + e.message + "\n" + e.stack
            );
            throw error.create({
                name: "EI_EDOC_STATUS_UPDATE_FAILURE",
                message: e.name + "\n" + e.message + "\n" + e.stack,
                notifyOff: true,
            });
        }
    }
    /**
     * getSenderDetails - This function retrieves the employee details for sending
     * @param empId Employee Id
     * @returns details Object containing employee internal id, entityid, and email
     */
    function getSenderDetails(empId) {
        var empFields = search.lookupFields({
            type: record.Type.EMPLOYEE,
            id: empId,
            columns: ["internalid", "entityid", EMAIL],
        });
        return {
            value: empFields.internalid[0].value,
            text: empFields.entityid,
            email: empFields[EMAIL],
        };
    }

    function invalidSendingMethod(transTypeText, tranId) {
        var parameters = {
            TYPE: transTypeText,
            INVOICENUMBER: tranId,
        };
        stringFormatter.setString(MSG_INVALID_SENDING_METHOD);
        stringFormatter.replaceParameters(parameters);
        throw error.create({
            name: "EI_SENDING_INVALID_METHOD",
            message: stringFormatter.toString(),
            notifyOff: true,
        });
    }

    function getRecipients(transId, transType, tranDetails) {
        if (transType === record.Type.ITEM_FULFILLMENT) {
            var transObj = record.load({ id: transId, type: transType });
            var sourceOrderId = transObj.getValue(CREATED_FROM);
            var sourceOrderType = transObj.getValue(ORDER_TYPE);
            log.debug(
                "sourceOrderType",
                sourceOrderId +
                    " === " +
                    sourceOrderType +
                    "=== " +
                    record.Type.TRANSFER_ORDER
            );
            if (sourceOrderType === TRANSFER_ORDER) {
                var params = {
                    type: record.Type.TRANSFER_ORDER,
                    id: sourceOrderId,
                    columns: [RECIPIENT_FIELD],
                };
                var lookUpValues = search.lookupFields(params);
                return lookUpValues[RECIPIENT_FIELD];
            }
        } else {
            return tranDetails[RECIPIENT_FIELD];
        }
    }

    function getEmailDetails(recipientsList) {
        var contactIds = [];
        //START : validate if recipient list is not empty
        if (recipientsList.length < 1) {
            throw error.create({
                name: "",
                message: MSG_NO_EDOCUMENT_RECIPIENTS,
                notifyOff: true,
            });
        }
        //END : validate if recipient list is not empty
        for (var i = 0; i < recipientsList.length; i++) {
            contactIds.push(recipientsList[i].value);
        }
        var contacts = [];
        var noEmailContact = [];
        search
            .create({
                type: record.Type.CONTACT,
                columns: ["entityid", EMAIL],
                filters: ["internalid", "anyof", contactIds],
            })
            .run()
            .each(function (result) {
                var emailId = result.getValue(EMAIL);
                if (!emailId) {
                    noEmailContact.push(result.getValue("entityid"));
                } else {
                    contacts.push(emailId);
                }
                return true;
            });
        //START : validate if any recipient doesn't have email address
        if (noEmailContact.length > 0) {
            MSG_EDOC_RECIPIENT_NO_EMAIL = MSG_EDOC_RECIPIENT_NO_EMAIL.replace(
                "CONTACTNAMES",
                noEmailContact.join(", ")
            );
            throw error.create({
                name: "",
                message: MSG_EDOC_RECIPIENT_NO_EMAIL,
                notifyOff: true,
            });
        }
        return contacts;
    }

    function getCertifiedXML(fileId) {
        var fileObj;
        var content;
        try {
            fileObj = file.load({ id: fileId });
            content = fileObj.getContents();
        } catch (ex) {
            log.error(ex.name, ex.message);
        }
        return content;
    }

    /**
     * Retrieves the entity in order to check if it is a company or individual.
     *
     * @param entityId Customer ID/Vendor ID
     * @param entityType Customer /Vendor
     *
     * @returns type of Entity
     */
    function getEntityDetails(entityId, entityType) {
        return search.lookupFields({
            type: entityType,
            id: entityId,
            columns: ["isperson", "email", "isinactive"],
        });
    }

    /**
     * Get the outbound e-document record.
     *
     * @param {Number} recId internal id of the outbound e-document record
     * @param {String} recType outbound e-document record type
     *
     * @returns outbound e-document record
     */
    function getOutboundEDocRecord(recId, recType) {
        var errorParams;
        if (!recId) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Internal Id of outbound e-document record is a required parameter for retrieving the outbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!recType) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Record type is a required parameter for retrieving the outbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        return record.load({
            type: recType,
            id: recId,
        });
    }

    return {
        send: send,
        getSenderDetails: getSenderDetails,
        getOutboundEDocRecord: getOutboundEDocRecord,
        getEntityDetails: getEntityDetails,
    };
});
