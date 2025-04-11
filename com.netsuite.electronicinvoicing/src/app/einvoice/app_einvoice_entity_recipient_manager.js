/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Sep 2016     mjaurigue
 *
 *  @NModuleScope Public
 */

define([
    "./app_einvoice_entity_validator",
    "../../data/dao_vendor",
    "../../data/dao_customer",
    "../../lib/process_result",
    "../../data/dao_vendor_recipient",
    "../../data/dao_customer_recipient",
], function (
    entityValidator,
    vendorDAO,
    customerDAO,
    processResult,
    vendorRecipientDao,
    customerRecipientDao
) {
    var VENDOR_ENTITY_FIELD = "custrecord_psg_ei_email_recipient_vendor";
    var VENDOR_CONTACT_FIELD = "custrecord_psg_v_ei_email_recipient_cont";

    var CUSTOMER_ENTITY_FIELD = "custrecord_psg_ei_email_recipient_cust";
    var CUSTOMER_CONTACT_FIELD = "custrecord_psg_ei_email_recipient_cont";

    var entityField;
    var contactField;

    function validateRecipient(recipientRecord, entityType) {
        entityValidator.setEntityType(entityType);
        var validationResults = [];

        initRecipientFields(entityType);

        var entityId = recipientRecord.getValue(entityField);
        var contactId = recipientRecord.getValue(contactField);

        var recipients = getRecipients(entityType, entityId);
        var recipientCount = recipients.length;

        if (recipientCount == 10) {
            /* If the entity already has 10 recipients */
            validationResults.push(entityValidator.hasExceededRecipients());
        } else {
            var entityDao = getEntityDao(entityType);
            var contacts = entityDao.loadContacts(contactId);
            validationResults.push(
                entityValidator.validateContactsEmails(contacts)
            );
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    function initRecipientFields(entityType) {
        if (entityType == "vendor") {
            entityField = VENDOR_ENTITY_FIELD;
            contactField = VENDOR_CONTACT_FIELD;
        } else {
            entityField = CUSTOMER_ENTITY_FIELD;
            contactField = CUSTOMER_CONTACT_FIELD;
        }
    }

    function validateRecipientDeletion(recipientRecord, entityType) {
        entityValidator.setEntityType(entityType);
        var validationResults = [];

        initRecipientFields(entityType);

        var entityId = recipientRecord.getValue(entityField);

        var recipients = getRecipients(entityType, entityId);
        var recipientCount = recipients.length;

        if (recipientCount == 1) {
            validationResults.push(entityValidator.hasNoRecipients());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    function getEntityDao(entityType) {
        var entityDao;

        if (entityType == "vendor") {
            entityDao = vendorDAO;
        } else {
            entityDao = customerDAO;
        }

        return entityDao;
    }

    function getRecipients(entityType, entityId) {
        var recipients;

        if (entityType == "vendor") {
            recipients = vendorRecipientDao.getAllRecipientsByVendor(entityId);
        } else {
            recipients =
                customerRecipientDao.getAllRecipientsByCustomer(entityId);
        }

        return recipients;
    }

    return {
        validateRecipient: validateRecipient,
        validateRecipientDeletion: validateRecipientDeletion,
    };
});
