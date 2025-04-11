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
define(["require", "exports", "../ubl/common/components/Transaction", "../ubl/common/components/LogAuditTrail", "../ubl/common/lib/constants", "../ubl/common/components/documentStatusMessageStatusListRepository", "../app/license/CacheManager"], function (require, exports, Transaction_1, LogAuditTrail_1, constants_1, documentStatusMessageStatusListRepository_1, CacheManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.markTransactionPendingDSAsIgnored = exports.processForCoreTransaction = exports.processCoreTransaction = exports.getTransactionType = exports.getCertificationInProgressValues = exports.createNewTransactionValuesObject = exports.isMessageContentComplete = exports.isMessageSuccessfullyEvaluated = exports.validateRequestBody = exports.getTransactionDetails = void 0;
    function getTransactionDetails(requestBody) {
        var transaction = requestBody.record;
        return {
            id: transaction.id,
            type: transaction.type,
            record_type: transaction.record_type,
            mandate_name: requestBody.mandate,
        };
    }
    exports.getTransactionDetails = getTransactionDetails;
    function validateRequestBody(requestBody) {
        if (Object.keys(requestBody).length === 0 &&
            (requestBody.constructor === Object ||
                requestBody.constructor === Function)) {
            throw new Error("Empty payload");
        }
        if (requestBody.length === 0 && requestBody.constructor === String) {
            throw new Error("Empty payload");
        }
    }
    exports.validateRequestBody = validateRequestBody;
    /**
     * Returns true if the Plugin Implementation was able to read & evaluate the message,
     * false otherwise.
     * @param result
     */
    function isMessageSuccessfullyEvaluated(result) {
        return result.processStatusSuccess;
    }
    exports.isMessageSuccessfullyEvaluated = isMessageSuccessfullyEvaluated;
    /**
     * Returns true if the plugin implementation marked the message as complete,
     * false otherwise.
     * @param result
     */
    function isMessageContentComplete(result) {
        return result.isMessageContentComplete;
    }
    exports.isMessageContentComplete = isMessageContentComplete;
    /**
     * Creates an object containing all new values that must be set into the transaction,
     * like the new EI status and any other field value returned by plugin implementation.
     * @param result
     */
    function createNewTransactionValuesObject(result) {
        return __assign(__assign({}, result.locFieldsForUpdate), { custbody_psg_ei_status: result.eiFieldsForUpdate.eDocStatus });
    }
    exports.createNewTransactionValuesObject = createNewTransactionValuesObject;
    /**
     * Creates an object containing the certification in progress status value for EI status field.
     */
    function getCertificationInProgressValues() {
        return {
            custbody_psg_ei_status: constants_1.EI_STATUS.CERTIFICATION_IN_PROGRESS,
        };
    }
    exports.getCertificationInProgressValues = getCertificationInProgressValues;
    /**
     * This function returns the record_type of the transaction
     * @param transaction
     * @returns
     */
    function getTransactionType(transaction) {
        return transaction.record_type;
    }
    exports.getTransactionType = getTransactionType;
    function processCoreTransaction(result, transaction, avalaraId) {
        return __awaiter(this, void 0, void 0, function () {
            var valuesFromResult, newTransactionValues, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log.debug("transactionUtils.ts: processCoreTransaction Started", result);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        valuesFromResult = isMessageContentComplete(result)
                            ? createNewTransactionValuesObject(result)
                            : getCertificationInProgressValues();
                        newTransactionValues = __assign((_a = {}, _a[constants_1.TRANSACTION_FIELDS.TRANSACTION_AVALARA_ID] = avalaraId, _a), valuesFromResult);
                        return [4 /*yield*/, (0, Transaction_1.updateTransaction)(transaction, newTransactionValues)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        log.error("transactionUtils.ts: processCoreTransaction failed while updating the transaction", error_1);
                        throw new Error("Failed while processing for the core transaction");
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    exports.processCoreTransaction = processCoreTransaction;
    /**
     * This function process the document status for the core transaction
     * @param result
     * @param transaction
     * @param avalaraId
     * @returns {boolean}
     */
    function processForCoreTransaction(result, transaction, avalaraId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug("transactionUtils.ts: processForCoreTransaction", "Processing for Core Transaction Started");
                        response = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!isMessageSuccessfullyEvaluated(result)) return [3 /*break*/, 3];
                        return [4 /*yield*/, processCoreTransaction(result, transaction, avalaraId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, (0, LogAuditTrail_1.logEventMessage)(transaction, result)];
                    case 4:
                        _a.sent();
                        if (LogAuditTrail_1.endEventStatuses.includes(result.eiFieldsForUpdate.eDocStatus)) {
                            (0, CacheManager_1.decreaseCount)(1);
                        }
                        response = true;
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        log.error("transactionUtils.ts: processForCoreTransaction failed", error_2);
                        return [3 /*break*/, 6];
                    case 6:
                        log.debug("transactionUtils.ts: processForCoreTransaction", "Processing for Core Transaction Ended");
                        return [2 /*return*/, response];
                }
            });
        });
    }
    exports.processForCoreTransaction = processForCoreTransaction;
    /**
     * Write in the context the id of the transaction with, as value, the passed status for document status message.
     * This key-value map will be consumed in reduce step.
     * @param mapContext
     * @param transactionId
     */
    function markTransactionPendingDSAsIgnored(mapContext, transactionId) {
        mapContext.write({
            key: transactionId.toString(),
            value: documentStatusMessageStatusListRepository_1.documentStatusMessageStatusListRepository.list().IGNORED,
        });
    }
    exports.markTransactionPendingDSAsIgnored = markTransactionPendingDSAsIgnored;
});
