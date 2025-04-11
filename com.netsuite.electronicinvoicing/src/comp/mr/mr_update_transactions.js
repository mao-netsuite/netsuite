/**
 * @NApiVersion 2.1
 * @NScriptType mapreducescript
 */
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
define(["require", "exports", "../../utils/documentStatusUtils", "../../utils/transactionUtils", "../../utils/documentProcessingUtils", "../../ubl/common/components/LogAuditTrail", "../../app/license/CacheManager", "../../ubl/common/components/Transaction"], function (require, exports, documentStatusUtils_1, transactionUtils_1, documentProcessingUtils_1, LogAuditTrail_1, CacheManager_1, Transaction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reduce = exports.map = exports.getInputData = void 0;
    // This query gets all transaction in "certification in progress" status and custbody_nseb_avalara_mandate not empty
    // Left join w/ mandates - to check if we're missing information
    var transactionQuery = "SELECT \n        tran.id, tran.custbody_nseb_avalara_mandate, mandate.custrecord_nseb_mandate_proc_status_pi AS plugin_implementation, mandate.id AS mandate_id, tran.recordType, tran.type\n    FROM transaction tran \n    LEFT JOIN customrecord_nseb_av_mandate mandate \n        ON mandate.custrecord_nseb_country_mandate_id = tran.custbody_nseb_avalara_mandate\n    WHERE\n        tran.custbody_psg_ei_status = 20\n        AND tran.custbody_nseb_avalara_mandate IS NOT NULL";
    var endEvent = "END_EVENT";
    function getInputData(_inputContext) {
        return {
            type: "suiteql",
            query: transactionQuery,
        };
    }
    exports.getInputData = getInputData;
    function map(mapContext) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, _a, result, documentStatus, responseFromCoreTransactionProcessing, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        transaction = (0, Transaction_1.parseGetInputDataValueToTransaction)(mapContext.value);
                        return [4 /*yield*/, (0, documentProcessingUtils_1.processUpdateTransaction)(mapContext, transaction)];
                    case 1:
                        _a = _b.sent(), result = _a.result, documentStatus = _a.documentStatus;
                        return [4 /*yield*/, (0, transactionUtils_1.processForCoreTransaction)(result, transaction, documentStatus.message.id)];
                    case 2:
                        responseFromCoreTransactionProcessing = _b.sent();
                        if (responseFromCoreTransactionProcessing === false) {
                            log.error("mr_update_transaction.ts: Document Processing Failed for the transaction ", transaction);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, documentProcessingUtils_1.updateDocumentStatus)(result, mapContext, transaction, documentStatus)];
                    case 3:
                        _b.sent();
                        if (LogAuditTrail_1.endEventStatuses.includes(result.eiFieldsForUpdate.eDocStatus))
                            mapContext.write({
                                key: endEvent,
                                value: "1",
                            });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        log.error({
                            title: "mr_update_transaction.ts: Failed while Processing the Transaction",
                            details: error_1,
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    exports.map = map;
    /**
     * This step will run for each transaction marked as completed in map stage and will
     * mark all pending message related to the transaction as ignored.
     * @param context
     */
    function reduce(context) {
        return __awaiter(this, void 0, void 0, function () {
            var key, values, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = context.key, values = context.values;
                        if (!(key === endEvent)) return [3 /*break*/, 1];
                        (0, CacheManager_1.decreaseCount)(values.length);
                        return [3 /*break*/, 3];
                    case 1:
                        messages = (0, documentStatusUtils_1.getDocumentStatusForTransaction)(parseInt(key));
                        return [4 /*yield*/, Promise.all(messages.map(function (_a) {
                                var id = _a.id;
                                return (0, documentStatusUtils_1.updateDSStatus)(id, values[0]);
                            }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    exports.reduce = reduce;
});
