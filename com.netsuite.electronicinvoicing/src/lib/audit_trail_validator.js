/**
 *    Copyright 2018 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

define(["N/error", "./validator", "./constants"], function (
    error,
    Validator,
    constants
) {
    function AuditTrailValidator() {
        Validator.call(this);
        this.MANDATORY_FIELD_MAP = [
            "transactionId",
            "transactionType",
            "eDocStatus",
            "eventType",
            "details",
            "owner",
            "isUpdateFields",
            "bundleId",
            "bundleName",
        ];
        this.INPUT_FIELD_MAP = [
            "transactionId",
            "transactionType",
            "eDocStatus",
            "eventType",
            "details",
            "owner",
            "isUpdateFields",
            "extraFieldsForUpdate",
            "bundleId",
            "bundleName",
        ];
        this.VALID_EI_STATUS = ["3", "17", "19", "20", "21", "22"];
        this.VALID_AUDIT_EVENTS = ["3", "16", "19", "20", "21", "22"];
        this.EDOCSTATUS = "eDocStatus";
        this.EVENTTYPE = "eventType";

        this.AUDIT_ERROR_MESSAGES = {
            eDocStatus: "The given EI status {FIELDS} is not allowed.",
            eventType: "The given audit event {FIELDS} is not allowed.",
            transactionId: "Unable to load transaction {FIELDS}.",
        };
    }
    util.extend(AuditTrailValidator.prototype, Validator.prototype);

    AuditTrailValidator.prototype.validateEIStatus = function (jsonInput) {
        var type = "eDocStatus";
        if (jsonInput.hasOwnProperty(this.EDOCSTATUS)) {
            var eDocStatusId = jsonInput[this.EDOCSTATUS];
            if (this.VALID_EI_STATUS.indexOf(eDocStatusId) === -1) {
                var errorParams = {
                    name: "EI_STATUS_VALIDATION",
                    message: (
                        constants.ErrorCodes.EI_STATUS_VALIDATION +
                        " " +
                        this.AUDIT_ERROR_MESSAGES[type]
                    ).replace("FIELDS", eDocStatusId.toString()),
                };
                throw error.create(errorParams);
            }
        }
        return true;
    };
    AuditTrailValidator.prototype.validateAuditEvent = function (jsonInput) {
        var type = "eventType";
        if (jsonInput.hasOwnProperty(this.EVENTTYPE)) {
            var auditEventId = jsonInput[this.EVENTTYPE];
            if (this.VALID_AUDIT_EVENTS.indexOf(auditEventId) === -1) {
                var errorParams = {
                    name: "EI_AUDIT_TRAIL_EVENTS_VALIDATION",
                    message: (
                        constants.ErrorCodes.EI_AUDIT_TRAIL_EVENTS_VALIDATION +
                        " " +
                        this.AUDIT_ERROR_MESSAGES[type]
                    ).replace("FIELDS", auditEventId.toString()),
                };
                throw error.create(errorParams);
            }
        }
        return true;
    };

    AuditTrailValidator.prototype.validateAuditTrailInput = function (
        jsonInput
    ) {
        var isValidInput = this.validateInput(jsonInput);
        var isValidEIStatus = this.validateEIStatus(jsonInput);
        var isValidAuditEvent = this.validateAuditEvent(jsonInput);

        return isValidInput && isValidEIStatus && isValidAuditEvent;
    };

    return AuditTrailValidator;
});
