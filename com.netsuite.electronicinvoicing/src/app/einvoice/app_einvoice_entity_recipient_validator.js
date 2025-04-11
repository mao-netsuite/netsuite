/**  @NModuleScope Public */

define([
    "N/runtime",
    "N/record",
    "N/error",
    "../../lib/translator",
    "../../data/dao_einvoice_sending_method",
    "../../app/einvoice/app_einvoice_entity_recipient_manager",
], function (
    runtime,
    record,
    error,
    translator,
    sendingMethodDao,
    recipientManager
) {
    var CUSTOMER_FIELD = "custrecord_psg_ei_email_recipient_cust";
    var VENDOR_FIELD = "custrecord_psg_ei_email_recipient_vendor";
    var ENTITY_EDOC_STANDARD = "custentity_psg_ei_entity_edoc_standard";
    var EMAIL_CHANNEL = "email";
    var VENDOR = "vendor";
    var CUSTOMER = "customer";

    function validateContext(context, entityType) {
        if (!isSupportedContext()) {
            var errorMsg;
            if (entityType === VENDOR) {
                errorMsg = translator.getString(
                    "vendoremailrecipient.contextunsupported"
                );
            } else {
                errorMsg = translator.getString(
                    "customeremailrecipient.contextunsupported"
                );
            }

            var recipientError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: errorMsg,
                notifyOff: true,
            });
            throw new Error(
                recipientError.name + ": " + recipientError.message
            );
        }

        var activeRecord;
        if (!isDeleteRecord(context)) {
            activeRecord = context.newRecord;
        } else {
            activeRecord = context.oldRecord;
        }

        log.error("entityType", entityType);
        var entityField = CUSTOMER_FIELD;
        if (entityType === VENDOR) {
            entityField = VENDOR_FIELD;
        }
        log.error("entityField", entityField);

        var entity = activeRecord.getValue(entityField);
        if (entity) {
            var entityRecord = record.load({
                type:
                    entityType === VENDOR
                        ? record.Type.VENDOR
                        : record.Type.CUSTOMER,
                id: entity,
            });

            var eDocStandard = entityRecord.getValue(ENTITY_EDOC_STANDARD);
            if (eDocStandard && hasEmailSendingMethod(eDocStandard)) {
                var result;
                if (isDeleteRecord(context)) {
                    result = validateEmailRecipientDeletion(
                        activeRecord,
                        entityType
                    );
                } else {
                    result = validateEmailRecipient(activeRecord, entityType);
                }

                if (!result.isSuccessful()) {
                    if (entityType === CUSTOMER) {
                        var customerError = error.create({
                            name: "EI_CUSTOMER_RECIPIENT_ERROR",
                            message: result.getMessage(),
                            notifyOff: true,
                        });
                        throw new Error(
                            customerError.name + ": " + customerError.message
                        );
                    } else {
                        var vendorError = error.create({
                            name: "EI_VENDOR_RECIPIENT_ERROR",
                            message: result.getMessage(),
                            notifyOff: true,
                        });
                        throw new Error(
                            vendorError.name + ": " + vendorError.message
                        );
                    }
                }
            }
        }
    }

    /**
     * This function handles the actual validation of email recipients
     * @param {String} eDocStandard E-Document Package Id
     * @param {Object} recipient Recipient Record
     * @returns void
     */

    function validateEmailRecipient(recipientRecord, entityType) {
        return recipientManager.validateRecipient(recipientRecord, entityType);
    }

    /**
     * This function handles the actual validation of email recipients deletion
     * @param {String} eDocStandard E-Document Package Id
     * @param {Object} recipient Recipient Record
     * @returns void
     */

    function validateEmailRecipientDeletion(recipientRecord, entityType) {
        return recipientManager.validateRecipientDeletion(
            recipientRecord,
            entityType
        );
    }

    /**
     * Checks if current context does not belong to unsupported contexts
     * @returns {Boolean}
     */

    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.USER_INTERFACE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.SCHEDULED,
                runtime.ContextType.SUITELET,
                runtime.ContextType.USEREVENT,
            ].indexOf(runtime.executionContext) !== -1
        );
    }

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

    function isDeleteRecord(context) {
        return context.UserEventType.DELETE === context.type;
    }

    return {
        validateContext: validateContext,
        hasEmailSendingMethod: hasEmailSendingMethod,
    };
});
