/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Vendor CS
 * @NScriptId _ei_vendor_cs
 * @NScriptType clientscript
 * @NModuleScope Public
 */

define([
    "../../app/einvoice/app_einvoice_vendor_manager",
    "../../data/dao_einvoice_sending_method",
    "N/runtime",
], function (vendorManager, sendingMethodDao, runtime) {
    var RECIPIENT_SUBLIST_ID =
        "recmachcustrecord_psg_ei_email_recipient_vendor";
    var RECIPIENT_CONTACT_FIELD_ID = "custrecord_psg_v_ei_email_recipient_cont";
    var EMAIL_CHANNEL = "email";
    var IS_INDIVIDUAL = "T";
    var E_DOC_STANDARD_FIELD = "custentity_psg_ei_entity_edoc_standard";
    var SENDER_SUBLIST_ID = "recmachcustrecord_psg_ei_email_sender_vendor";
    var SENDER_SUBLIST_EMAIL_FIELD = "custrecord_psg_ei_email_sender_email";
    var USE_SENDER_LIST_FIELD = "custentity_edoc_use_sender_list";
    var SENDER_DOMAIN_FIELD = "custentity_edoc_sender_domain";
    var WS_IDENTIFIER_FIELD = "custentity_edoc_ws_id";

    function validateLine(context) {
        var currRecord = context.currentRecord;
        var sublistId = context.sublistId;
        var isValid = true;

        if (sublistId === SENDER_SUBLIST_ID) {
            var currentLine =
                currRecord.getCurrentSublistIndex(SENDER_SUBLIST_ID);
            var senderValidationResult = vendorManager.validateSenderEmail(
                currRecord,
                SENDER_SUBLIST_ID,
                SENDER_SUBLIST_EMAIL_FIELD,
                currentLine,
                runtime.executionContext
            );
            if (!senderValidationResult.isSuccessful()) {
                alert(senderValidationResult.getMessage());
                isValid = false;
            }
        }

        return isValid;
    }

    function saveRecord(context) {
        var valid = true;

        var currRecord = context.currentRecord;
        var eDocStandard = currRecord.getValue(E_DOC_STANDARD_FIELD);
        var senderDomain = currRecord.getValue(SENDER_DOMAIN_FIELD);
        var isUsingSenderList = currRecord.getValue(USE_SENDER_LIST_FIELD);
        var wsIdentifier = currRecord.getValue(WS_IDENTIFIER_FIELD);

        if (eDocStandard) {
            var hasEmailMethod = hasEmailSendingMethod(eDocStandard);

            if (hasEmailMethod) {
                var result;
                var customerType = currRecord.getValue("isperson");

                if (customerType === IS_INDIVIDUAL) {
                    result = vendorManager.validateIndividualVendor(currRecord);
                } else {
                    result = vendorManager.validateRecipients(
                        currRecord,
                        RECIPIENT_SUBLIST_ID,
                        RECIPIENT_CONTACT_FIELD_ID
                    );
                }

                if (!result.isSuccessful()) {
                    alert(result.getMessage());
                    valid = false;
                }
            }
        }

        if (isUsingSenderList === true) {
            var senderValidationResult = vendorManager.validateSenders(
                currRecord,
                SENDER_SUBLIST_ID
            );

            if (!senderValidationResult.isSuccessful()) {
                alert(senderValidationResult.getMessage());
                valid = false;
            }
        }

        if (senderDomain) {
            var domainValidationResult =
                vendorManager.validateSenderDomain(currRecord);

            if (!domainValidationResult.isSuccessful()) {
                alert(domainValidationResult.getMessage());
                valid = false;
            }
        }

        if (wsIdentifier) {
            var wsIdentifierValidationResult =
                vendorManager.validateWebServiceIdentifier(currRecord);

            if (!wsIdentifierValidationResult.isSuccessful()) {
                alert(wsIdentifierValidationResult.getMessage());
                valid = false;
            }
        }

        return valid;
    }

    /**
     * Checks if E-Document Package has Sending Method with email channel
     * @param {Integer} eDocStandard E-Document Package Id
     * @returns {Boolean} hasEmailChannel
     */
    function hasEmailSendingMethod(eDocStandard) {
        var hasEmailChannel = false;

        var params = {
            edocumentstandard: eDocStandard,
            sendingchannel: EMAIL_CHANNEL,
        };

        var sendingMethod = sendingMethodDao.getSendingMethods(params);

        if (sendingMethod.length > 0) {
            hasEmailChannel = true;
        }

        return hasEmailChannel;
    }

    return {
        saveRecord: saveRecord,
        validateLine: validateLine,
    };
});
