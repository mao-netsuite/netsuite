var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../ubl/common/components/db", "N/translation", "../ubl/common/components/eiAuditTrailEventsListRepository", "../ubl/common/components/Transaction", "./transactionUtils", "../ubl/common/components/LogAuditTrail", "../ubl/common/lib/constants", "../ubl/common/components/eiStatusListRepository", "../ubl/common/components/trSentStatusListRepository"], function (require, exports, db_1, translation_1, eiAuditTrailEventsListRepository_1, Transaction_1, transactionUtils_1, LogAuditTrail_1, constants_1, eiStatusListRepository_1, trSentStatusListRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processForCustomRecordTransactions = exports.processForTransactionResponse = exports.getFieldsFromTR = exports.getTransactionResponseValues = exports.parseGetInputDataValueToTransactionResponse = void 0;
    translation_1 = __importDefault(translation_1);
    var ERROR_STATUS = "error";
    function fetchErrorDetailsFromPluginResponse(result) {
        var _a;
        return (_a = result.eiFieldsForUpdate) === null || _a === void 0 ? void 0 : _a.trFields;
    }
    /**
     *
     * @param result
     * @returns Returns true if TR status is to be put as "In Error"
     */
    function isDocumentStatusInError(result) {
        var _a, _b;
        return !result.processStatusSuccess || ((_b = (_a = result.eiFieldsForUpdate.trFields) === null || _a === void 0 ? void 0 : _a.payloadStatus) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === ERROR_STATUS;
    }
    function parseGetInputDataValueToTransactionResponse(queryRow) {
        var queryValues = JSON.parse(queryRow).values;
        return {
            id: queryValues[0],
            record_type: constants_1.TRANSACTION_FIELDS.TR_RECORD_TYPE,
            type: constants_1.TRANSACTION_FIELDS.CUSTOM_RECORD_TYPE,
            mandate_name: queryValues[1],
        };
    }
    exports.parseGetInputDataValueToTransactionResponse = parseGetInputDataValueToTransactionResponse;
    /**
     * This function will return the errorCode, errorMessage and TR status based on the result
     * @param result
     * @param IN_ERROR
     * @returns
     */
    function getTransactionResponseValues(result, IN_ERROR) {
        var _a;
        var errorDetails = fetchErrorDetailsFromPluginResponse(result);
        return _a = {},
            _a[constants_1.TRANSACTION_FIELDS.TR_ERROR_CODE] = errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.errorCode,
            _a[constants_1.TRANSACTION_FIELDS.TR_ERROR_MESSAGE] = (errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.errorMessage) ||
                translation_1.default.get({
                    collection: constants_1.EI_TRANSLATION_COLLECTION,
                    key: "val_audit_trail_msg_tr_failed",
                })(),
            _a[constants_1.TRANSACTION_FIELDS.TR_STATUS] = IN_ERROR,
            _a;
    }
    exports.getTransactionResponseValues = getTransactionResponseValues;
    /**
     * This function returns the required fields from the TR record
     * @param id
     * @param fields
     * @returns
     */
    function getFieldsFromTR(id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldValues, transactionRecord, id_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug("transactionResponseUtils.ts: getFieldsFromTR started", id);
                        fieldValues = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.db.loadRecord({
                                type: constants_1.TRANSACTION_FIELDS.TR_RECORD_TYPE,
                                id: id,
                            })];
                    case 2:
                        transactionRecord = _a.sent();
                        for (id_1 in fields) {
                            fieldValues[id_1] = transactionRecord.getValue(fields[id_1]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        log.error("transactionResponseUtils.ts: getFieldsFromTR Failed", "Error while fetching the values from the Custom record");
                        return [3 /*break*/, 4];
                    case 4:
                        log.debug("transactionResponseUtils.ts: getFieldsFromTR ended", fieldValues);
                        return [2 /*return*/, fieldValues];
                }
            });
        });
    }
    exports.getFieldsFromTR = getFieldsFromTR;
    /**
     * This function process the document status for Transaction response.
     * Returns true if the processing is successful
     * @param result
     * @param transaction
     * @param avalaraId
     * @returns {response}
     */
    function processForTransactionResponse(result, transaction, avalaraId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, auditTrailEventType, auditTrailMessage, fields, _b, transactionId, responseType, transactionDetails, auditTrailEventsList, eiStatusList, trSentStatusList, transactionResponseValues, transactionValues, trStatusList, forCancellationInternalId, forRejectionInternalId, error_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        log.debug("transactionResponseUtils.ts: processForTransactionResponse started with data", result);
                        response = false;
                        auditTrailEventType = "", auditTrailMessage = null;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, , 12]);
                        fields = {
                            transactionId: constants_1.TRANSACTION_FIELDS.TR_TRANSACTION_ID,
                            responseType: constants_1.TRANSACTION_FIELDS.TR_RESPONSE_TYPE,
                        };
                        return [4 /*yield*/, getFieldsFromTR(transaction.id, fields)];
                    case 2:
                        _b = _d.sent(), transactionId = _b.transactionId, responseType = _b.responseType;
                        return [4 /*yield*/, (0, Transaction_1.fetchTransactionDetails)(transactionId)];
                    case 3:
                        transactionDetails = _d.sent();
                        log.debug("Transaction Details linked to the TR", transactionDetails);
                        auditTrailEventsList = eiAuditTrailEventsListRepository_1.eiAuditTrailEventsListRepository.list();
                        eiStatusList = eiStatusListRepository_1.eiStatusListRepository.list();
                        trSentStatusList = trSentStatusListRepository_1.trSentStatusListRepository.list();
                        transactionResponseValues = {};
                        transactionValues = {};
                        if (!isDocumentStatusInError(result)) return [3 /*break*/, 4];
                        auditTrailEventType = auditTrailEventsList.IN_ERROR;
                        auditTrailMessage =
                            ((_a = result.eiFieldsForUpdate.trFields) === null || _a === void 0 ? void 0 : _a.errorMessage) ||
                                translation_1.default.get({
                                    collection: constants_1.EI_TRANSLATION_COLLECTION,
                                    key: "val_audit_trail_msg_tr_failed",
                                })();
                        transactionResponseValues = getTransactionResponseValues(result, trSentStatusList.IN_ERROR);
                        return [3 /*break*/, 7];
                    case 4:
                        // In case, previously the TR status was "IN ERROR"
                        // Set the status and error fields to empty if the process status is success
                        transactionResponseValues[constants_1.TRANSACTION_FIELDS.TR_ERROR_CODE] = "";
                        transactionResponseValues[constants_1.TRANSACTION_FIELDS.TR_ERROR_MESSAGE] = "";
                        transactionResponseValues[constants_1.TRANSACTION_FIELDS.TR_STATUS] =
                            trSentStatusList.PROCESSING;
                        if (!(0, transactionUtils_1.isMessageContentComplete)(result)) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, Transaction_1.fetchTransactionResponseStatus)()];
                    case 5:
                        trStatusList = _d.sent();
                        forCancellationInternalId = trStatusList.get(constants_1.TR_STATUS_LIST.FOR_CANCELLATION.toUpperCase());
                        forRejectionInternalId = trStatusList.get(constants_1.TR_STATUS_LIST.FOR_REJECTION.toUpperCase());
                        if (Number(responseType) === forCancellationInternalId) {
                            // Response type is For Cancellation
                            // Update the Status to Cancelled
                            transactionResponseValues[constants_1.TRANSACTION_FIELDS.TR_STATUS] =
                                trSentStatusList.CANCELLED;
                            transactionValues[constants_1.TRANSACTION_FIELDS.EI_DOC_STATUS] =
                                eiStatusList.CANCELLED;
                            auditTrailEventType = auditTrailEventsList.CANCELLED;
                            auditTrailMessage = translation_1.default.get({
                                collection: constants_1.EI_TRANSLATION_COLLECTION,
                                key: "val_audit_trail_msg_tr_cancelled",
                            })();
                        }
                        else if (Number(responseType) === forRejectionInternalId) {
                            // Response type is For Rejection
                            // Update the status to Request completed
                            transactionResponseValues[constants_1.TRANSACTION_FIELDS.TR_STATUS] =
                                trSentStatusList.REQUEST_COMPLETED;
                            transactionValues[constants_1.TRANSACTION_FIELDS.EI_DOC_STATUS] =
                                eiStatusList.REQUEST_COMPLETED;
                            auditTrailEventType =
                                auditTrailEventsList.REQUEST_COMPLETED;
                            auditTrailMessage = translation_1.default.get({
                                collection: constants_1.EI_TRANSLATION_COLLECTION,
                                key: "val_audit_trail_msg_tr_request_completed",
                            })();
                        }
                        else {
                            // Currently we support document processing when TR is in "for cancellation" or "for rejection"
                            return [2 /*return*/, true];
                        }
                        // Update the Transaction linked to Transaction Response
                        log.debug("Values to be updated on the Transaction Linked to TR", transactionValues);
                        return [4 /*yield*/, (0, Transaction_1.updateTransaction)(transactionDetails, __assign(__assign({}, transactionValues), result.locFieldsForUpdate))];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        // Update the transaction Response record
                        log.debug("Values to be updated on the Transaction Response", transactionResponseValues);
                        return [4 /*yield*/, (0, Transaction_1.updateTransaction)(transaction, __assign((_c = {}, _c[constants_1.TRANSACTION_FIELDS.TR_AVALARA_ID] = avalaraId, _c), transactionResponseValues))];
                    case 8:
                        _d.sent();
                        if (!(!(0, transactionUtils_1.isMessageSuccessfullyEvaluated)(result) ||
                            (0, transactionUtils_1.isMessageContentComplete)(result))) return [3 /*break*/, 10];
                        return [4 /*yield*/, (0, LogAuditTrail_1.logEventMessageForTR)(transactionDetails, {
                                auditTrailEventType: auditTrailEventType,
                                auditTrailMessage: auditTrailMessage,
                            })];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10:
                        response = true;
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _d.sent();
                        log.error("transactionResponseUtils.ts: processForTransactionResponse failed", error_2);
                        return [3 /*break*/, 12];
                    case 12:
                        log.debug("transactionResponseUtils.ts: processForTransactionResponse ended", response);
                        return [2 /*return*/, response];
                }
            });
        });
    }
    exports.processForTransactionResponse = processForTransactionResponse;
    function processForCustomRecordTransactions(result, transaction, avalaraId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, transactionType, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug("transactionResponseUtils.ts: processForCustomRecordTransactions started", result);
                        response = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        transactionType = (0, transactionUtils_1.getTransactionType)(transaction);
                        if (!(transactionType === constants_1.TRANSACTION_FIELDS.TR_RECORD_TYPE)) return [3 /*break*/, 3];
                        return [4 /*yield*/, processForTransactionResponse(result, transaction, avalaraId)];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        log.error("transactionResponseUtils.ts: processForCustomRecordTransactions failed", response);
                        return [3 /*break*/, 5];
                    case 5:
                        log.debug("transactionResponseUtils.ts: processForCustomRecordTransactions ended", response);
                        return [2 /*return*/, response];
                }
            });
        });
    }
    exports.processForCustomRecordTransactions = processForCustomRecordTransactions;
});
