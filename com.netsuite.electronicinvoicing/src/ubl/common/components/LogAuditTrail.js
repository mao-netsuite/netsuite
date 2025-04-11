var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../../data/dao_employee", "./db", "../lib/constants", "../../../app/license/CacheManager"], function (require, exports, dao_employee_1, db_1, constants_1, CacheManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logEventMessageForTR = exports.logEventMessage = exports.endEventStatuses = void 0;
    var LOG_AUDIT_TRAIL_RECORD_TYPE = "customrecord_psg_ei_audit_trail";
    var FIELD_MAP = {
        transaction: "custrecord_psg_ei_audit_transaction",
        entity: "custrecord_psg_ei_audit_entity",
        eventType: "custrecord_psg_ei_audit_event",
        owner: "custrecord_psg_ei_audit_owner",
        details: "custrecord_psg_ei_audit_details",
        licenseKey: "custrecord_psg_ei_audit_license_key",
    };
    exports.endEventStatuses = [
        constants_1.EI_STATUS.READY_FOR_SENDING,
        constants_1.EI_STATUS.SENT,
        constants_1.EI_STATUS.CERTIFICATION_DATA_ERROR,
    ];
    /**
     * Create a log event audit trail entry for the specified transaction
     * by picking information from the process status result object.
     * @param transaction
     * @param processResult
     */
    function logEventMessage(transaction, processResult) {
        return __awaiter(this, void 0, void 0, function () {
            var licenseId, values, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        licenseId = "";
                        if (exports.endEventStatuses.includes(processResult.eiFieldsForUpdate.eDocStatus)) {
                            licenseId = (0, CacheManager_1.getLicenseId)();
                        }
                        _a = {
                            transaction: transaction.id
                        };
                        return [4 /*yield*/, getTransactionEntityId(transaction)];
                    case 1:
                        values = (_a.entity = _b.sent(),
                            _a.eventType = getEventType(processResult),
                            _a.details = processResult.processStatusMessage
                                ? processResult.processStatusMessage
                                : "",
                            _a.owner = getOwner(),
                            _a.licenseKey = licenseId,
                            _a);
                        return [4 /*yield*/, createAndStoreLogRecord(values)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        log.error("Unable to store audit log record", err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    exports.logEventMessage = logEventMessage;
    /**
     * Get entity id of the transaction.
     * @param transaction
     */
    function getTransactionEntityId(transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.loadRecord({
                            type: transaction.record_type,
                            id: transaction.id,
                        })];
                    case 1:
                        transactionRecord = _a.sent();
                        return [2 /*return*/, transactionRecord.getValue("entity")];
                }
            });
        });
    }
    /**
     * Get the event type code based on process result.
     * @param processResult
     */
    function getEventType(processResult) {
        if (!processResult.isMessageContentComplete) {
            return constants_1.EI_STATUS.CERTIFICATION_IN_PROGRESS;
        }
        return fixEventType(processResult.eiFieldsForUpdate.eDocStatus);
    }
    function getOwner() {
        var ids = (0, dao_employee_1.getActiveAdministrators)();
        return ids[0];
    }
    /**
     * Match the correct event type status for log audit trail with
     * the one for the transaction.
     * @param eDocStatus
     */
    function fixEventType(eDocStatus) {
        switch (eDocStatus) {
            case constants_1.EI_STATUS.GENERATION_FAILED:
                return constants_1.AUDIT_TRAIL_EVENT_TYPE.GENERATION_FAILED;
            case constants_1.EI_STATUS.VALIDATION_FAILED:
                return constants_1.AUDIT_TRAIL_EVENT_TYPE.VALIDATION_FAILED;
            case constants_1.EI_STATUS.SENT:
                return constants_1.AUDIT_TRAIL_EVENT_TYPE.SENT;
            default:
                return eDocStatus;
        }
    }
    /**
     * Creates and stores a new record of type Log Audit Trail by picking the
     * information from the passed object.
     * @param values
     */
    function createAndStoreLogRecord(values) {
        var logRecord = db_1.db.createRecord({
            type: LOG_AUDIT_TRAIL_RECORD_TYPE,
        });
        Object.keys(FIELD_MAP).forEach(function (key) {
            var columnName = FIELD_MAP[key];
            var value = values[key];
            if (value !== undefined) {
                logRecord.setValue({
                    fieldId: columnName,
                    value: value,
                });
            }
        });
        return logRecord.save.promise();
    }
    /**
     * Create a log event audit trail entry for the specified transaction
     * by picking information from the process status result object.
     * @param transaction
     * @param processResult
     */
    function logEventMessageForTR(transaction, auditTrailDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var values, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        values = {
                            transaction: transaction.id,
                            entity: transaction.entity,
                            eventType: auditTrailDetails.auditTrailEventType,
                            details: auditTrailDetails.auditTrailMessage,
                            owner: getOwner(),
                            licenseKey: "",
                        };
                        return [4 /*yield*/, createAndStoreLogRecord(values)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        log.error("Unable to store audit log record", err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    exports.logEventMessageForTR = logEventMessageForTR;
});
