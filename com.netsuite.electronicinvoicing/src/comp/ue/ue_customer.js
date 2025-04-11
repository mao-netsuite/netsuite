/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2015     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Customer UE
 * @NScriptId _ei_customer_ue
 * @NScriptType usereventscript
 */
define([
    "../../app/einvoice/app_einvoice_customer_manager",
    "../../app/einvoice/app_einvoice_entity_recipient_validator",
    "N/error",
    "N/runtime",
    "../../app/einvoice/app_einvoice_peppol_manager",
], function (
    customerManager,
    recipientValidator,
    error,
    runtime,
    peppolManager
) {
    var RECIPIENT_SUBLIST_ID = "recmachcustrecord_psg_ei_email_recipient_cust";
    var RECIPIENT_CONTACT_FIELD_ID = "custrecord_psg_ei_email_recipient_cont";
    var IS_INDIVIDUAL = "T";
    var E_DOC_STANDARD_FIELD = "custentity_psg_ei_entity_edoc_standard";
    var SENDER_SUBLIST_ID = "recmachcustrecord_psg_ei_email_sender_customer";
    var SENDER_SUBLIST_EMAIL_FIELD = "custrecord_psg_ei_cust_sender_email";
    var USE_SENDER_LIST_FIELD = "custentity_edoc_use_sender_list";
    var SENDER_DOMAIN_FIELD = "custentity_edoc_sender_domain";
    var WS_IDENTIFIER_FIELD = "custentity_edoc_ws_id";
    var PEPPOL_ID = "custentity_psg_ei_peppol_id";

    function beforeSubmit(context) {
        var execContext = runtime.executionContext;

        peppolManager.validatePeppolId(context, PEPPOL_ID);
        if (execContext !== runtime.ContextType.USER_INTERFACE) {
            var currRecord = context.newRecord;
            var eDocStandard = currRecord.getValue(E_DOC_STANDARD_FIELD);
            var isUsingSenderList = currRecord.getValue(USE_SENDER_LIST_FIELD);
            var senderDomain = currRecord.getValue(SENDER_DOMAIN_FIELD);
            var wsIdentifier = currRecord.getValue(WS_IDENTIFIER_FIELD);

            if (eDocStandard) {
                var hasEmailMethod =
                    recipientValidator.hasEmailSendingMethod(eDocStandard);

                if (hasEmailMethod) {
                    var result = {
                        success: true,
                        message: "",
                    };

                    var customerType = currRecord.getValue("isperson");

                    if (customerType == IS_INDIVIDUAL) {
                        var individualValidationResult =
                            customerManager.validateIndividualCustomer(
                                currRecord
                            );
                        result.success =
                            individualValidationResult.isSuccessful();
                        result.message =
                            individualValidationResult.getMessage();
                    } else if (validateInContext(execContext)) {
                        var recipientValidationResult =
                            customerManager.validateRecipients(
                                currRecord,
                                RECIPIENT_SUBLIST_ID,
                                RECIPIENT_CONTACT_FIELD_ID
                            );
                        result.success =
                            recipientValidationResult.isSuccessful();
                        result.message = recipientValidationResult.getMessage();
                    }

                    if (!result.success) {
                        var customerError = error.create({
                            name: "EI_CUSTOMER_ERROR",
                            message: result.message,
                            notifyOff: true,
                        });

                        throw new Error(
                            customerError.name + ": " + customerError.message
                        );
                    }
                }
            }

            if (isUsingSenderList && validateInContext(execContext)) {
                var senderValidationResult = customerManager.validateSenders(
                    currRecord,
                    SENDER_SUBLIST_ID
                );
                if (!senderValidationResult.isSuccessful()) {
                    var senderError = error.create({
                        name: "EI_CUSTOMER_ERROR",
                        message: senderValidationResult.getMessage(),
                        notifyOff: true,
                    });

                    throw new Error(
                        senderError.name + ": " + senderError.message
                    );
                }

                for (
                    var i = 0;
                    i < currRecord.getLineCount(SENDER_SUBLIST_ID);
                    i++
                ) {
                    senderValidationResult =
                        customerManager.validateSenderEmail(
                            currRecord,
                            SENDER_SUBLIST_ID,
                            SENDER_SUBLIST_EMAIL_FIELD,
                            i,
                            runtime.executionContext
                        );
                    if (!senderValidationResult.isSuccessful()) {
                        var senderEmailError = error.create({
                            name: "EI_CUSTOMER_ERROR",
                            message: senderValidationResult.getMessage(),
                            notifyOff: true,
                        });

                        throw new Error(
                            senderEmailError.name +
                            ": " +
                            senderEmailError.message
                        );
                    }
                }
            }

            if (senderDomain) {
                var domainValidationResult =
                    customerManager.validateSenderDomain(currRecord);

                if (!domainValidationResult.isSuccessful()) {
                    var domainError = error.create({
                        name: "EI_CUSTOMER_ERROR",
                        message: domainValidationResult.getMessage(),
                        notifyOff: true,
                    });

                    throw new Error(
                        domainError.name + ": " + domainError.message
                    );
                }
            }

            if (wsIdentifier) {
                var wsIdentifierValidationResults =
                    customerManager.validateWebServiceIdentifier(currRecord);

                if (!wsIdentifierValidationResults.isSuccessful()) {
                    var identifierError = error.create({
                        name: "EI_CUSTOMER_ERROR",
                        message: wsIdentifierValidationResults.getMessage(),
                        notifyOff: true,
                    });

                    throw new Error(
                        identifierError.name + ": " + identifierError.message
                    );
                }
            }
        }
    }

    function validateInContext(execContext) {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.REST_WEBSERVICES,
            ].indexOf(execContext) === -1
        );
    }

    return {
        beforeSubmit: beforeSubmit,
    };
});
