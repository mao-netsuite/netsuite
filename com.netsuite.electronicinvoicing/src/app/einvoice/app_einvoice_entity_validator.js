/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       28 Jul 2016     mjaurigue
 *
 * @NModuleScope Public
 */

define([
    "../../lib/validation_result",
    "../../lib/string_formatter",
    "N/error",
    "../../lib/translator",
], function (
    validationResultClass,
    stringFormatter,
    error,
    translator
) {
    var CODE_CUST_NO_EMAIL = "customer.noemail";
    var CODE_CUST_CONTACT_NO_EMAIL = "customer.contactnoemail";
    var CODE_CUST_NO_RECIPIENTS = "customer.norecipients";
    var CODE_CUST_EXCEEDED_RECIPIENTS = "customer.maxrecipientexceeded";
    var CODE_CUST_NO_SENDERS = "customer.nosenders";
    var CODE_CUST_EXISTING_SENDER = "customer.existingsender";
    var CODE_CUST_EXISTING_DOMAIN = "customer.existingdomain";
    var CODE_CUST_EXISTING_WS_IDENTIFIER = "customer.existingidentifier";

    var CODE_VEND_NO_EMAIL = "vendor.noemail";
    var CODE_VEND_CONTACT_NO_EMAIL = "vendor.contactnoemail";
    var CODE_VEND_NO_RECIPIENTS = "vendor.norecipients";
    var CODE_VEND_EXCEEDED_RECIPIENTS = "vendor.maxrecipientexceeded";
    var CODE_VEND_NO_SENDERS = "vendor.nosenders";
    var CODE_VEND_EXISTING_SENDER = "vendor.existingsender";
    var CODE_VEND_EXISTING_DOMAIN = "vendor.existingdomain";
    var CODE_VEND_EXISTING_WS_IDENTIFIER = "vendor.existingidentifier";

    var MSG_NO_EMAIL = "msg_no_email";
    var MSG_CONTACT_NO_EMAIL = "msg_contact_no_email";
    var MSG_NO_RECIPIENTS = "msg_no_recipients";
    var MSG_EXCEEDED_RECIPIENTS = "msg_exceeded_recipients";
    var MSG_NO_SENDERS = "msg_no_senders";
    var MSG_EXISTING_SENDER = "msg_existing_sender";
    var MSG_EXISTING_DOMAIN = "msg_existing_domain";
    var MSG_EXISTING_WS_IDENTIFIER = "msg_existing_vendor_id";

    var MESSAGEMAP;

    var entityType;

    function setEntityType(type) {
        MESSAGEMAP = null;
        entityType = type;
    }

    function initializeMessageTranslationMap() {
        var messageCodes = [
            CODE_CUST_NO_EMAIL,
            CODE_CUST_CONTACT_NO_EMAIL,
            CODE_CUST_NO_RECIPIENTS,
            CODE_CUST_EXCEEDED_RECIPIENTS,
            CODE_CUST_NO_SENDERS,
            CODE_CUST_EXISTING_SENDER,
            CODE_CUST_EXISTING_DOMAIN,
            CODE_CUST_EXISTING_WS_IDENTIFIER,
            CODE_VEND_NO_EMAIL,
            CODE_VEND_CONTACT_NO_EMAIL,
            CODE_VEND_NO_RECIPIENTS,
            CODE_VEND_EXCEEDED_RECIPIENTS,
            CODE_VEND_NO_SENDERS,
            CODE_VEND_EXISTING_SENDER,
            CODE_VEND_EXISTING_DOMAIN,
            CODE_VEND_EXISTING_WS_IDENTIFIER,
        ];
        var map = translator.getStringMap(messageCodes);

        MESSAGEMAP = {};

        if (entityType == "vendor") {
            MESSAGEMAP[MSG_NO_EMAIL] = map[CODE_VEND_NO_EMAIL];
            MESSAGEMAP[MSG_CONTACT_NO_EMAIL] = map[CODE_VEND_CONTACT_NO_EMAIL];
            MESSAGEMAP[MSG_NO_RECIPIENTS] = map[CODE_VEND_NO_RECIPIENTS];
            MESSAGEMAP[MSG_EXCEEDED_RECIPIENTS] =
                map[CODE_VEND_EXCEEDED_RECIPIENTS];
            MESSAGEMAP[MSG_NO_SENDERS] = map[CODE_VEND_NO_SENDERS];
            MESSAGEMAP[MSG_EXISTING_SENDER] = map[CODE_VEND_EXISTING_SENDER];
            MESSAGEMAP[MSG_EXISTING_DOMAIN] = map[CODE_VEND_EXISTING_DOMAIN];
            MESSAGEMAP[MSG_EXISTING_WS_IDENTIFIER] =
                map[CODE_VEND_EXISTING_WS_IDENTIFIER];
        } else {
            MESSAGEMAP[MSG_NO_EMAIL] = map[CODE_CUST_NO_EMAIL];
            MESSAGEMAP[MSG_CONTACT_NO_EMAIL] = map[CODE_CUST_CONTACT_NO_EMAIL];
            MESSAGEMAP[MSG_NO_RECIPIENTS] = map[CODE_CUST_NO_RECIPIENTS];
            MESSAGEMAP[MSG_EXCEEDED_RECIPIENTS] =
                map[CODE_CUST_EXCEEDED_RECIPIENTS];
            MESSAGEMAP[MSG_NO_SENDERS] = map[CODE_CUST_NO_SENDERS];
            MESSAGEMAP[MSG_EXISTING_SENDER] = map[CODE_CUST_EXISTING_SENDER];
            MESSAGEMAP[MSG_EXISTING_DOMAIN] = map[CODE_CUST_EXISTING_DOMAIN];
            MESSAGEMAP[MSG_EXISTING_WS_IDENTIFIER] =
                map[CODE_CUST_EXISTING_WS_IDENTIFIER];
        }
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function hasNoEmail() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_NO_EMAIL]);
        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function hasNoRecipients() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_NO_RECIPIENTS]);
        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function hasNoSenders() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_NO_SENDERS]);
        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function senderExists() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_EXISTING_SENDER]);
        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function domainExists() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_EXISTING_DOMAIN]);
        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function webServiceIdentifierExists() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_EXISTING_WS_IDENTIFIER]);
        return validationResult;
    }

    /**
     * This checks the contacts if they have an email address to them.
     * @param contacts Array containing Contacts search results
     * @returns validationResult The validation result object
     */
    function validateContactsEmails(contacts) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var errorParams;
        if (!contacts) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message: "Contacts array required for validation.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        } else if (!util.isArray(contacts)) {
            errorParams = {
                name: "PARAM_IS_NOT_AN_ARRAY",
                message: "Contacts parameter is not an array.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }

        var isValid = true;
        var validationResult = validationResultClass.create();

        var contactsWithErrors = [];
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
            var email = contact.getValue("email");
            var name = contact.getValue("entityid");
            if (!email) {
                isValid = false;
                contactsWithErrors.push(name);
            }
        }

        validationResult.setValidity(isValid);
        if (!validationResult.isValid()) {
            var params = {
                CONTACTNAMES: contactsWithErrors.join(", "),
            };
            stringFormatter.setString(MESSAGEMAP[MSG_CONTACT_NO_EMAIL]);
            stringFormatter.replaceParameters(params);
            validationResult.setMessage(stringFormatter.toString());
        }

        return validationResult;
    }

    /**
     * Method for returning validation result object w/ message
     * @returns validationResult The validation result object
     */
    function hasExceededRecipients() {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();
        validationResult.setValidity(false);
        validationResult.setMessage(MESSAGEMAP[MSG_EXCEEDED_RECIPIENTS]);

        return validationResult;
    }

    return {
        hasNoEmail: hasNoEmail,
        hasNoRecipients: hasNoRecipients,
        hasNoSenders: hasNoSenders,
        senderExists: senderExists,
        domainExists: domainExists,
        webServiceIdentifierExists: webServiceIdentifierExists,
        validateContactsEmails: validateContactsEmails,
        hasExceededRecipients: hasExceededRecipients,
        setEntityType: setEntityType,
    };
});
