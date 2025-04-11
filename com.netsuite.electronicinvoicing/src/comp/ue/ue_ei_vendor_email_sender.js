/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This is the user event for Vendor E-Document Email Sender.
 *
 * Version    Date            Author           Remarks
 * 1.00       25 Jan 2017     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType usereventscript
 *
 */
define([
    "N/runtime",
    "N/error",
    "../../lib/translator",
    "../../app/einvoice/app_einvoice_vendor_sender_manager",
], function (runtime, error, translator, senderManager) {
    var VENDOR = "vendor";

    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var senderError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "vendoremailsender.contextunsupported"
                ),
                notifyOff: true,
            });

            throw new Error(senderError.name + ": " + senderError.message);
        }

        var activeRecord;
        if (!isDeleteRecord(context)) {
            activeRecord = context.newRecord;
        } else {
            activeRecord = context.oldRecord;
        }

        var result;
        if (isDeleteRecord(context)) {
            result = validateSenderDeletion(activeRecord);
        } else {
            result = validateSender(activeRecord);
        }

        if (!result.isSuccessful()) {
            var vendorSenderError = error.create({
                name: "EI_VENDOR_SENDER_ERROR",
                message: result.getMessage(),
                notifyOff: true,
            });

            throw new Error(
                vendorSenderError.name + ": " + vendorSenderError.message
            );
        }
    }

    /**
     * This function handles the actual validation of email senders
     * @param {Object} senderRecord Sender Record
     * @returns {Object} result validation Result
     */
    function validateSender(senderRecord) {
        return senderManager.validateSender(senderRecord, VENDOR);
    }

    /**
     * This function handles the actual validation of email senders deletion
     * @param {Object} senderRecord Sender Record
     * @returns {Object} result validation Result
     */
    function validateSenderDeletion(senderRecord) {
        return senderManager.validateSenderDeletion(senderRecord, VENDOR);
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

    /**
     * Checks the context type if delete
     * @param {Object} context Context object
     * @returns {Boolean}
     */
    function isDeleteRecord(context) {
        return context.UserEventType.DELETE === context.type;
    }

    return {
        beforeSubmit: beforeSubmit,
    };
});
