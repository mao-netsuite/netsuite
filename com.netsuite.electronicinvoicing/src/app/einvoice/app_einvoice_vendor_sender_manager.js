/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       25 Jan 2017     ssantiago
 *
 *  @NModuleScope Public
 */

define([
    "./app_einvoice_entity_validator",
    "../../lib/process_result",
    "../../data/dao_vendor_sender",
], function (entityValidator, processResult, vendorSenderDao) {
    var VENDOR_FIELD = "custrecord_psg_ei_email_sender_vendor";
    var EMAIL_FIELD = "custrecord_psg_ei_email_sender_email";
    var USE_SENDER_LIST_FIELD = "custrecord_psg_ei_email_sender_checkbox";

    /**
     * Handles validation of sender record upon creation/edit
     * @param {Object} senderRecord Sender record
     * @param {String} entityType Vendor
     * @returns {Object} processResult validation result
     */
    function validateSender(senderRecord, entityType) {
        entityValidator.setEntityType(entityType);
        var validationResults = [];

        var entityId = senderRecord.getValue(VENDOR_FIELD);
        var email = senderRecord.getValue(EMAIL_FIELD);

        var senders = getSenders(entityId);

        var senderEmails = [];
        for (var i = 0; i < senders.length; i++) {
            var senderResult = senders[i];
            senderEmails.push(
                senderResult.getValue({
                    name: EMAIL_FIELD,
                })
            );
        }

        if (senderEmails.indexOf(email) !== -1) {
            validationResults.push(entityValidator.senderExists());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    /**
     * Checks if sender record can be deleted
     * @param {Object} senderRecord Sender record
     * @param {String} entityType Vendor
     * @returns {Object} processResult validation result
     */
    function validateSenderDeletion(senderRecord, entityType) {
        entityValidator.setEntityType(entityType);
        var validationResults = [];

        var entityId = senderRecord.getValue(VENDOR_FIELD);
        var isUsingSenderList = senderRecord.getValue(USE_SENDER_LIST_FIELD);

        var senders = getSenders(entityId);
        var senderCount = senders.length;

        if (senderCount === 1 && isUsingSenderList) {
            validationResults.push(entityValidator.hasNoSenders());
        }

        processResult.consolidateValidationResults(validationResults);

        return processResult;
    }

    /**
     * Searches senders by vendor id
     * @param {Integer} entityId Vendor Internal Id
     * @returns {Array} Array of search results
     */
    function getSenders(entityId) {
        return vendorSenderDao.getAllSendersByVendor(entityId);
    }

    return {
        validateSender: validateSender,
        validateSenderDeletion: validateSenderDeletion,
    };
});
