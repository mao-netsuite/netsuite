/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       24 Sep 2015         ldimayuga
 *
 */
define(["N/email"], function (email) {
    /**
     * Send email with bounce back
     *
     * @governance 20 units
     * @restriction Supported by all client and server side scirpts; The maximum number of total recipients (recipient + cc + bcc) allowed is 10
     *
     * RelatedRecords represents the NetSuite records to which an Email Message record should be attached.
     * @typedef {Object} RelatedRecords
     * @property {number} transactionId - Transaction record to attach Message record to.
     * @property {number} activityId - Activity record to attach Message record to.
     * @property {number} entityId - Entity record to attach Message record to.
     * @property {Object} customRecord - Custom record to attach Message record to.
     * @property {number} customRecord.id - Custom record instance ID to attach Message record to.
     * @property {string} customRecord.recordType - Custom Record record type to attach Message record to.
     *
     * @param {Object} options Email options
     * @param {number} options.author Sender of the email.
     * @param {number|string[]} options.recipients Recipients of the email, Interal ID or array of Email Addresses.
     * @param {string[]} options.cc CC (optional) recipients of the email, Interal ID or array of Email Addresses.
     * @param {string[]} options.bcc BCC (optional) recipients of the email as an EmailEntity, Interal ID or Email Address.
     * @param {string} options.subject Email subject.
     * @param {string} options.body Email Body/contents.
     * @param {string} options.replyTo (optional)
     * @param {file.File[]} options.attachments (optional) Email file attachments.
     * @param {RelatedRecords} options.relatedRecords (optional)
     * @param {internalOnly} options.isInternalOnly (optional) Do not show Message record when viewed from external Entity. Default to false
     * @returns {undefined}
     *
     * Sample: email.send({
     *			    author: -5,
     *			    recipients: [1234, 'fly@honey.com'],
     *			    replyTo: 'marketing@acme.corp',
     *			    cc: ['customer@wonderbread.com', 4536],
     *			    bcc: ['manager@wonderbread.com', 6643],
     *			    subject: 'email subject',
     *			    body: 'email body',
     *			    attachments: [statementFile, promoFile]
     *			    relatedRecords: {
     *			        transactionId: 1234,
     *			        activityId: 56,
     *			        entityId: 8754,
     *			        customRecord: {
     *			            recordType: 'custrecord_promo_audit',
     *			            id: 6572
     *			        }
     *			    },
     *			    internalOnly: true
     *			});
     */

    function send(params) {
        email.send(params);
    }

    return {
        send: send,
    };
});
