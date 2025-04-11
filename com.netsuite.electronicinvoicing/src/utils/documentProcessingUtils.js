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
define(["require", "exports", "./documentStatusUtils", "./mandateUtils", "../ubl/common/components/ProcessRequestStatus", "../ubl/common/components/documentStatusMessageStatusListRepository", "./transactionUtils"], function (require, exports, documentStatusUtils_1, mandateUtils_1, ProcessRequestStatus_1, documentStatusMessageStatusListRepository_1, transactionUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateDocumentStatus = exports.processUpdateTransaction = void 0;
    function processUpdateTransaction(mapContext, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var documentStatusRow, details, documentStatusMessageStatus, documentStatus, err_1, mandate, locAppPlgImpl, params, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            documentStatusRow = (0, documentStatusUtils_1.getLatestDocumentStatusForTransaction)(transaction);
                        }
                        catch (err) {
                            log.error({
                                title: "documentProcessingUtils.ts - Loading Document Status",
                                details: err,
                            });
                            throw new Error("Failed while loading the document status");
                        }
                        if (!documentStatusRow) {
                            throw new Error("No document status to process");
                        }
                        documentStatusMessageStatus = documentStatusMessageStatusListRepository_1.documentStatusMessageStatusListRepository.list();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 2, , 4]);
                        documentStatus = (0, documentStatusUtils_1.convertQueryRowToDocumentStatus)(documentStatusRow);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        //If conversion fails it means that the message was not well-formed (JSON parse failed)
                        details = "Message for Document Status ".concat(documentStatusRow.id, " for transaction ").concat(transaction.id, " is not well-formed.");
                        log.error({
                            title: "documentProcessingUtils.ts - Loading Document Status",
                            details: details,
                        });
                        return [4 /*yield*/, (0, documentStatusUtils_1.updateDSStatus)(documentStatusRow.id, documentStatusMessageStatus.FAILED)];
                    case 3:
                        _a.sent();
                        throw new Error(details);
                    case 4:
                        mandate = (0, mandateUtils_1.parseGetInputDataValueToMandate)(mapContext.value);
                        if (!mandate.plugin_implementation) {
                            details = "Certification cannot be processed due to mandate record ".concat(mandate.name, " having empty plugin implementation");
                            log.error({
                                title: "documentProcessingUtils.ts - Loading mandate plugin implementation",
                                details: details,
                            });
                            throw new Error(details);
                        }
                        try {
                            locAppPlgImpl = (0, ProcessRequestStatus_1.loadPluginImplementation)(mandate);
                        }
                        catch (err) {
                            log.error({
                                title: "documentProcessingUtils.ts - Unable to load plugin implementation",
                                details: err,
                            });
                            throw new Error("Unable to load plugin implemenation");
                        }
                        params = {
                            transaction: transaction,
                            docStatusPayload: documentStatus.message,
                        };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 6, , 8]);
                        result = locAppPlgImpl.processRequestStatus(params);
                        return [3 /*break*/, 8];
                    case 6:
                        err_2 = _a.sent();
                        return [4 /*yield*/, (0, documentStatusUtils_1.updateDSStatus)(documentStatus.id, documentStatusMessageStatus.FAILED)];
                    case 7:
                        _a.sent();
                        throw new Error("Failed while processing the plugin request");
                    case 8: return [2 /*return*/, {
                            result: result,
                            transaction: transaction,
                            documentStatus: documentStatus,
                        }];
                }
            });
        });
    }
    exports.processUpdateTransaction = processUpdateTransaction;
    function updateDocumentStatus(result, mapContext, transaction, documentStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var documentStatusMessageStatus, dsStatus, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        documentStatusMessageStatus = documentStatusMessageStatusListRepository_1.documentStatusMessageStatusListRepository.list();
                        dsStatus = documentStatusMessageStatus.PROCESSED;
                        if (!(0, transactionUtils_1.isMessageSuccessfullyEvaluated)(result)) {
                            dsStatus = documentStatusMessageStatus.FAILED;
                        }
                        else if ((0, transactionUtils_1.isMessageContentComplete)(result)) {
                            (0, transactionUtils_1.markTransactionPendingDSAsIgnored)(mapContext, transaction.id);
                        }
                        return [4 /*yield*/, (0, documentStatusUtils_1.updateDSStatus)(documentStatus.id, dsStatus)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        log.error({
                            title: "documentProcessingUtils.ts - Failed while updating the document status record",
                            details: error_1,
                        });
                        throw new Error("Failed while updating the document status record for transaction ".concat(transaction.id));
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    exports.updateDocumentStatus = updateDocumentStatus;
});
