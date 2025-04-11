/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2015     ssantiago
 * @NModuleScope TargetAccount
 */
define([
    "./app_einvoice_entity_validator",
    "../../data/dao_customer",
    "../../lib/process_result",
    "N/runtime",
], function (entityValidator, customerDAO, processResult, runtime) {
    var CUSTOMER = "customer";
    /**
     * This validates if the email field of the individual customer is populated.
     *
     * @param currentRecord customer record object
     *
     * @returns processResult validation result
     */
    function validateIndividualCustomer(currentRecord) {
        entityValidator.setEntityType(CUSTOMER);
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
     * and also checking their email addresses using the customer validators
     * @param currentRecord The customer record object
     * @param sublistId The id of the recipient sublist
     * @param fieldID The field id which holds the contact Id
     * @returns isValid Validation result
     */
    function validateRecipients(currentRecord, sublistId, fieldId) {
        entityValidator.setEntityType(CUSTOMER);
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
            var contacts = customerDAO.loadContacts(recipientIds);

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
     * @param {Object} currentRecord The customer record object
     * @param {String} sublistId The id of the sender sublist
     * @returns {Object} processResult Validation result
     */
    function validateSenders(currentRecord, sublistId) {
        entityValidator.setEntityType(CUSTOMER);
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
        entityValidator.setEntityType(CUSTOMER);
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
     * This validates if the domain field of the customer is unique.
     * @param {Object} currentRecord customer record object
     * @returns {Object} processResult validation result
     */
    function validateSenderDomain(currentRecord) {
        entityValidator.setEntityType(CUSTOMER);
        var validationResults = [];
        var customerDomain = currentRecord.getValue(
            "custentity_edoc_sender_domain"
        );
        if (customerDomain) {
            var customersCount = customerDAO.getCustomersUsingSenderDomain(
                customerDomain,
                currentRecord.id
            );
            if (customersCount > 0) {
                validationResults.push(entityValidator.domainExists());
            }
        }

        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    /**
     * This validates if the customer web service identifier field of the customer is unique.
     * @param {Object} currentRecord customer record object
     * @returns {Object} processResult validation result
     */
    function validateWebServiceIdentifier(currentRecord) {
        entityValidator.setEntityType(CUSTOMER);
        var validationResults = [];
        var wsIdentifier = currentRecord.getValue("custentity_edoc_ws_id");
        if (wsIdentifier) {
            var customersCount =
                customerDAO.getCustomersUsingWebServiceIdentifier(
                    wsIdentifier,
                    currentRecord.id
                );
            if (customersCount > 0) {
                validationResults.push(
                    entityValidator.webServiceIdentifierExists()
                );
            }
        }

        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    return {
        validateIndividualCustomer: validateIndividualCustomer,
        validateRecipients: validateRecipients,
        validateSenders: validateSenders,
        validateSenderEmail: validateSenderEmail,
        validateSenderDomain: validateSenderDomain,
        validateWebServiceIdentifier: validateWebServiceIdentifier,
    };
});
