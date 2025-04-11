/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       28 Jul 2016     mjaurigue
 *
 */

define([
    "./app_einvoice_entity_validator",
    "../../data/dao_vendor",
    "../../lib/process_result",
    "N/runtime",
], function (entityValidator, vendorDAO, processResult, runtime) {
    var VENDOR = "vendor";

    /**
     * This validates if the email field of the individual vendor is populated.
     * @param {Object} currentRecord vendor record object
     * @returns {Object} processResult validation result
     */
    function validateIndividualVendor(currentRecord) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];
        var customerEmail = currentRecord.getValue("email");
        if (!customerEmail) {
            validationResults.push(entityValidator.hasNoEmail());
        }

        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    /**
     * This validates the recipients by checking if it has at least 1 recipient
     * and also checking their email addresses using the vendor validators
     * @param {Object} currentRecord The vendor record object
     * @param {String} sublistId The id of the recipient sublist
     * @param {String} fieldID The field id which holds the contact Id
     * @returns {Object} processResult Validation result
     */
    function validateRecipients(currentRecord, sublistId, fieldId) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];
        var recipientCount = currentRecord.getLineCount(sublistId);

        if (recipientCount > 10) {
            validationResults.push(entityValidator.hasExceededRecipients());
        } else if (recipientCount > 0) {
            var recipientIds = [];
            for (var i = 0; i < recipientCount; i++) {
                var contactId = currentRecord.getSublistValue({
                    sublistId: sublistId,
                    fieldId: fieldId,
                    line: i,
                });
                recipientIds.push(contactId);
            }
            var contacts = vendorDAO.loadContacts(recipientIds);

            validationResults.push(
                entityValidator.validateContactsEmails(contacts)
            );
        } else {
            validationResults.push(entityValidator.hasNoRecipients());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    /**
     * This validates the senders by checking if it has at least 1 sender
     * @param {Object} currentRecord The vendor record object
     * @param {String} sublistId The id of the sender sublist
     * @returns {Object} processResult Validation result
     */
    function validateSenders(currentRecord, sublistId) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];
        var senderCount = currentRecord.getLineCount(sublistId);

        if (senderCount < 1) {
            validationResults.push(entityValidator.hasNoSenders());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    /**
     * This validates the current sender line by checking if it is already
     * present in the sender sublist
     * @param {Object} currentRecord The current record object
     * @param {String} sublistId The id of the sender sublist
     * @param {String} fieldId The field id which holds the email address
     * @param {Integer} currentLine The current line in the sublist
     * @param {String} contextType Current script's context type
     * @returns {Object} processResult Validation result
     */
    function validateSenderEmail(
        currentRecord,
        sublistId,
        fieldId,
        currentLine,
        contextType
    ) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];

        var currentEmailValue;
        if (contextType === runtime.ContextType.USER_INTERFACE) {
            currentEmailValue = currentRecord.getCurrentSublistValue({
                sublistId: sublistId,
                fieldId: fieldId,
            });
        } else {
            currentEmailValue = currentRecord.getSublistValue({
                sublistId: sublistId,
                fieldId: fieldId,
                line: currentLine,
            });
        }

        var duplicateLine = currentRecord.findSublistLineWithValue({
            sublistId: sublistId,
            fieldId: fieldId,
            value: currentEmailValue,
        });

        if (duplicateLine !== -1 && duplicateLine !== currentLine) {
            validationResults.push(entityValidator.senderExists());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    /**
     * This validates if the domain field of the vendor is unique.
     * @param {Object} currentRecord vendor record object
     * @returns {Object} processResult validation result
     */
    function validateSenderDomain(currentRecord) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];
        var vendorDomain = currentRecord.getValue(
            "custentity_edoc_sender_domain"
        );
        if (vendorDomain) {
            var vendors = vendorDAO.getVendorsUsingSenderDomain(
                vendorDomain,
                currentRecord.id
            );
            if (vendors.length > 0) {
                validationResults.push(entityValidator.domainExists());
            }
        }

        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    /**
     * This validates if the vendor web service identifier field of the vendor is unique.
     * @param {Object} currentRecord vendor record object
     * @returns {Object} processResult validation result
     */
    function validateWebServiceIdentifier(currentRecord) {
        entityValidator.setEntityType(VENDOR);
        var validationResults = [];
        var wsIdentifier = currentRecord.getValue("custentity_edoc_ws_id");
        if (wsIdentifier) {
            var vendors = vendorDAO.getVendorsUsingWebServiceIdentifier(
                wsIdentifier,
                currentRecord.id
            );
            if (vendors.length > 0) {
                validationResults.push(
                    entityValidator.webServiceIdentifierExists()
                );
            }
        }

        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    return {
        validateIndividualVendor: validateIndividualVendor,
        validateRecipients: validateRecipients,
        validateSenders: validateSenders,
        validateSenderEmail: validateSenderEmail,
        validateSenderDomain: validateSenderDomain,
        validateWebServiceIdentifier: validateWebServiceIdentifier,
    };
});
