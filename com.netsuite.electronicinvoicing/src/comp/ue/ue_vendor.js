/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       28 Jul 2016     mjaurigue
 *
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Vendor UE
 * @NScriptId _ei_vendor_ue
 * @NScriptType usereventscript
 */
define([
    "../../app/einvoice/app_einvoice_vendor_manager",
    "../../app/einvoice/app_einvoice_entity_recipient_validator",
    "../../app/einvoice/app_einvoice_peppol_manager",
    "N/error",
    "N/runtime",
], function (vendorManager, recipientValidator, peppolManager, error, runtime) {
    var RECIPIENT_SUBLIST_ID =
        "recmachcustrecord_psg_ei_email_recipient_vendor";
    var RECIPIENT_CONTACT_FIELD_ID = "custrecord_psg_v_ei_email_recipient_cont";
    var IS_INDIVIDUAL = "T";
    var E_DOC_STANDARD_FIELD = "custentity_psg_ei_entity_edoc_standard";
    var SENDER_SUBLIST_ID = "recmachcustrecord_psg_ei_email_sender_vendor";
    var SENDER_SUBLIST_EMAIL_FIELD = "custrecord_psg_ei_email_sender_email";
    var USE_SENDER_LIST_FIELD = "custentity_edoc_use_sender_list";
    var SENDER_DOMAIN_FIELD = "custentity_edoc_sender_domain";
    var WS_IDENTIFIER_FIELD = "custentity_edoc_ws_id";
    var PEPPOL_ID = "custentity_psg_ei_peppol_id";

    //TODO: break down in smaller functions
    function beforeSubmit(context) {
        var execContext = runtime.executionContext;
        peppolManager.validatePeppolId(context, PEPPOL_ID);

        if (execContext !== runtime.ContextType.USER_INTERFACE) {
            var currRecord = context.newRecord;
            var eDocStandard = currRecord.getValue(E_DOC_STANDARD_FIELD);
            var isUsingSenderList = currRecord.getValue(USE_SENDER_LIST_FIELD);

            if (eDocStandard) {
                var hasEmailMethod =
                    recipientValidator.hasEmailSendingMethod(eDocStandard);

                if (hasEmailMethod) {
                    var result = {
                        success: true,
                        message: "",
                    };

                    var vendorType = currRecord.getValue("isperson");

                    if (vendorType === IS_INDIVIDUAL) {
                        var individualValidationResult =
                            vendorManager.validateIndividualVendor(currRecord);
                        result.success =
                            individualValidationResult.isSuccessful();
                        result.message =
                            individualValidationResult.getMessage();
                    } else if (validateInContext(execContext)) {
                        var recipientValidationResult =
                            vendorManager.validateRecipients(
                                currRecord,
                                RECIPIENT_SUBLIST_ID,
                                RECIPIENT_CONTACT_FIELD_ID
                            );
                        result.success =
                            recipientValidationResult.isSuccessful();
                        result.message = recipientValidationResult.getMessage();
                    }

                    if (!result.success) {
                        var vendorError = error.create({
                            name: "EI_VENDOR_ERROR",
                            message: result.message,
                            notifyOff: true,
                        });

                        throw new Error(
                            vendorError.name + ": " + vendorError.message
                        );
                    }
                }
            }

            if (isUsingSenderList && validateInContext(execContext)) {
                var senderValidationResult = vendorManager.validateSenders(
                    currRecord,
                    SENDER_SUBLIST_ID
                );
                if (!senderValidationResult.isSuccessful()) {
                    var senderError = error.create({
                        name: "EI_VENDOR_ERROR",
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
                    senderValidationResult = vendorManager.validateSenderEmail(
                        currRecord,
                        SENDER_SUBLIST_ID,
                        SENDER_SUBLIST_EMAIL_FIELD,
                        i,
                        runtime.executionContext
                    );
                    if (!senderValidationResult.isSuccessful()) {
                        var senderEmailError = error.create({
                            name: "EI_VENDOR_ERROR",
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

            var senderDomain = currRecord.getValue(SENDER_DOMAIN_FIELD);
            if (senderDomain) {
                var domainValidationResult =
                    vendorManager.validateSenderDomain(currRecord);

                if (!domainValidationResult.isSuccessful()) {
                    var domainError = error.create({
                        name: "EI_VENDOR_ERROR",
                        message: domainValidationResult.getMessage(),
                        notifyOff: true,
                    });

                    throw new Error(
                        domainError.name + ": " + domainError.message
                    );
                }
            }

            var wsIdentifier = currRecord.getValue(WS_IDENTIFIER_FIELD);
            if (wsIdentifier) {
                var wsIdentifierValidationResults =
                    vendorManager.validateWebServiceIdentifier(currRecord);

                if (!wsIdentifierValidationResults.isSuccessful()) {
                    var identifierError = error.create({
                        name: "EI_VENDOR_ERROR",
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
