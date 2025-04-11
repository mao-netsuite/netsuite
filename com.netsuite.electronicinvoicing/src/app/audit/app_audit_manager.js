/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       23 Sep 2015         ldimayuga
 * @NModuleScope public
 */

define(["../../data/dao_audit_trail.js"], function (daoAuditTrail) {
    var FOR_GENERATION = "1";
    var GENERATED = "2";
    var READY_FOR_SENDING = "3";
    var SENT = "4";
    var GENERATION_FAILED = "6";
    var VALIDATION_FAILED = "7";
    var SENDING_FAILED = "8";
    var UNTAGGED = "9";
    var FOR_CONVERSION = "10";
    var CONVERTED = "14";
    var CONVERSION_FAILED = "15";
    var CANCELLED = "16";
    var CANCELLATION_FAILED = "17";
    var INCOMPLETE = "18";
    var READY_FOR_CERTIFICATION = "19";
    var CERTIFICATION_IN_PROGRESS = "20";
    var CERTIFICATION_DATA_ERROR = "21";
    var CERTIFICATION_FAILED = "22";
    var EDOC_DIGITAL_SIGNATURE = "23";
    var GET_NETWORK_STATUS = "24";
    var GENERATION = "25";
    var TRANSACTION_RESPONSE_SENDING_FAILED = "26";

    /**
     * Create an audit trail for setting the e-invoice status to "For Generation"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logForGenerate(params) {
        params.eventType = FOR_GENERATION;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Generated"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logGenerated(params) {
        params.eventType = GENERATED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Generation Failed"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logGenerationFailed(params) {
        params.eventType = GENERATION_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Validation Failed"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logValidationFailed(params) {
        params.eventType = VALIDATION_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Ready for Sending"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logReadyForSending(params) {
        params.eventType = READY_FOR_SENDING;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Sent"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logSent(params) {
        params.eventType = SENT;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Sending Failed"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logSendingFailed(params) {
        params.eventType = SENDING_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for failed Sending of Transaction Response"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID/inbound E-Document ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logTransactionResponseSendingFailed(params) {
        params.eventType = TRANSACTION_RESPONSE_SENDING_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the e-invoice status to "Untagged for E-Invoice"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice / -5 for admin
     * @param {Number} params.owner - Employee ID of the person who triggered the sending
     */
    function logUntagged(params) {
        params.eventType = UNTAGGED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the inbound e-document status to "Incomplete"
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logIncomplete(params) {
        params.eventType = INCOMPLETE;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the inbound e-document status to "For Conversion"
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logForConversion(params) {
        params.eventType = FOR_CONVERSION;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the inbound e-document status to "Converted"
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logConverted(params) {
        params.eventType = CONVERTED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the inbound e-document status to "Conversion Failed"
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logConversionFailed(params) {
        params.eventType = CONVERSION_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for setting the inbound e-document status to "Cancelled"
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logCancelled(params) {
        params.eventType = CANCELLED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail when trying to Cancel but failed
     *
     * @param {Object} params
     * @param {Number} params.inboundEDoc - The Inbound E-Document Id
     * @param {Number} params.entity - ID of the Entity that owns the Inbound E-Document
     * @param {Number} params.owner - Employee ID of the person who edited the record
     *
     * */
    function logCancellationFailed(params) {
        params.eventType = CANCELLATION_FAILED;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail when eDoc is ready for certification
     *
     * @param params
     */
    function logReadyForCertification(params) {
        params.eventType = READY_FOR_CERTIFICATION;
        return daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail when certification of eDoc is in progress
     * @param params
     */

    function logCertificationInProgress(params) {
        params.eventType = CERTIFICATION_IN_PROGRESS;
        return daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail when certification failed due to transaction data error
     *
     * @param params
     */

    function logCertificationDataError(params) {
        params.eventType = CERTIFICATION_DATA_ERROR;
        return daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail when certification failed.
     *
     * @param params
     */
    function logCertificationFailed(params) {
        params.eventType = CERTIFICATION_FAILED;
        return daoAuditTrail.create(params);
    }
    /**
     * Create an audit trail when an e-document is being signed.
     *
     * @param params
     */
    function logEdocDigitalSignature(params) {
        params.eventType = EDOC_DIGITAL_SIGNATURE;
        return daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for event "Get Network Status"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice
     * @param {Number} params.owner - Employee ID of the person who edited the record
     * @param {String} params.details - Message to save in audit trail
     * */
    function logNetworkStatus(params) {
        params.eventType = GET_NETWORK_STATUS;
        daoAuditTrail.create(params);
    }

    /**
     * Create an audit trail for event "Generation"
     *
     * @param {Object} params
     * @param {Number} params.transaction - The invoice ID
     * @param {Number} params.entity - ID of the Customer that owns the invoice
     * @param {Number} params.owner - Employee ID of the person who edited the record
     * @param {String} params.details - Message to save in audit trail
     * */
    function logGeneration(params) {
        params.eventType = GENERATION;
        daoAuditTrail.create(params);
    }

    return {
        logForGenerate: logForGenerate,
        logGenerated: logGenerated,
        logGenerationFailed: logGenerationFailed,
        logValidationFailed: logValidationFailed,
        logReadyForSending: logReadyForSending,
        logSent: logSent,
        logSendingFailed: logSendingFailed,
        logTransactionResponseSendingFailed: logTransactionResponseSendingFailed,
        logUntagged: logUntagged,
        logIncomplete: logIncomplete,
        logForConversion: logForConversion,
        logConverted: logConverted,
        logConversionFailed: logConversionFailed,
        logCancelled: logCancelled,
        logCancellationFailed: logCancellationFailed,
        logReadyForCertification: logReadyForCertification,
        logCertificationInProgress: logCertificationInProgress,
        logCertificationDataError: logCertificationDataError,
        logCertificationFailed: logCertificationFailed,
        logEdocDigitalSignature: logEdocDigitalSignature,
        logNetworkStatus: logNetworkStatus,
        logGeneration: logGeneration
    };
});
