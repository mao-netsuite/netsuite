/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Dec 2015     ssantiago
 *
 */
define([
    "../../lib/string_formatter",
    "N/error",
    "N/config",
    "N/email",
    "N/file",
    "../../app/einvoice/app_einvoice_notifier",
    "../../lib/translator",
], function (
    stringFormatter,
    error,
    config,
    email,
    file,
    notifier,
    translator
) {
    /**
     * send - This function is the entry point of our plugin script
     * @param {Object} plugInContext
     * @param {String} plugInContext.scriptId
     * @param {String} plugInContext.sendMethodId
     * @param {String} plugInContext.eInvoiceContent
     * @param {Object} plugInContext.customer
     * @param {String} plugInContext.customer.id
     * @param {Array}  plugInContext.customer.recipients
     * @param {Object} plugInContext.transaction
     * @param {String} plugInContext.transaction.number
     * @param {String} plugInContext.transaction.id
     * @param {String} plugInContext.transaction.poNum
     * @param {String} plugInContext.transaction.type
     * @param {String} plugInContext.transaction.tranType
     * @param {String} plugInContext.transaction.subsidiary
     * @param {Object} plugInContext.sender
     * @param {String} plugInContext.sender.id
     * @param {String} plugInContext.sender.name
     * @param {String} plugInContext.sender.email
     * @param {Array} plugInContext.attachmentFileIds
     *
     * @returns {Object} result
     * @returns {Boolean} result.success
     * @returns {String} result.message
     */
    function send(pluginContext) {
        var senderDetails = pluginContext.sender;
        var customer = pluginContext.customer;
        var transaction = pluginContext.transaction;
        var recipientList = customer.recipients;
        var result = {};
        var parameters;
        if (!senderDetails.email) {
            parameters = {
                EMPLOYEENAME: senderDetails.name,
            };
            stringFormatter.setString(
                translator.getString("ei.sending.sendernoemail")
            );
            stringFormatter.replaceParameters(parameters);
            result = {
                success: false,
                message: stringFormatter.toString(),
            };
        } else {
            var invoiceSendDetails = {
                number: transaction.number,
                poNumber: transaction.poNum,
                transactionType: transaction.type,
                subsidiary: transaction.subsidiary,
                eInvoiceContent: pluginContext.eInvoiceContent,
                attachmentFileIds: pluginContext.attachmentFileIds,
            };
            notifier.notifyRecipient(
                senderDetails.id,
                recipientList,
                invoiceSendDetails
            );

            parameters = {
                SENDER: senderDetails.email,
                RECIPIENTS: recipientList.join(", "),
            };
            stringFormatter.setString(
                translator.getString("ei.sending.sentdetails")
            );
            stringFormatter.replaceParameters(parameters);

            result = {
                success: true,
                message: stringFormatter.toString(),
            };
        }

        return result;
    }

    return {
        send: send,
    };
});
