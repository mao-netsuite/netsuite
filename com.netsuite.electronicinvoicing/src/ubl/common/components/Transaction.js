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
define(["require", "exports", "./db", "N/query", "../lib/constants"], function (require, exports, db_1, query_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchTransactionResponseStatus = exports.fetchTransactionDetails = exports.updateTransaction = exports.parseGetInputDataValueToTransaction = void 0;
    query_1 = __importDefault(query_1);
    /**
     * Creates an object of type Transaction by getting information from a getInputData row result.
     * @param queryRow
     */
    function parseGetInputDataValueToTransaction(queryRow) {
        var queryValues = JSON.parse(queryRow).values;
        return {
            id: queryValues[0],
            record_type: queryValues[4],
            type: queryValues[5],
            mandate_name: queryValues[1],
        };
    }
    exports.parseGetInputDataValueToTransaction = parseGetInputDataValueToTransaction;
    /**
     * Updates a transaction record with new values specified in newTransactionValues object.
     * @param transaction
     * @param newTransactionValues
     */
    function updateTransaction(transaction, newTransactionValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db_1.db.submitRecordFields({
                        id: transaction.id,
                        type: transaction.record_type,
                        values: newTransactionValues,
                    })];
            });
        });
    }
    exports.updateTransaction = updateTransaction;
    function fetchTransactionDetails(transRespTranId) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionQuery, idMatchCondition, mainLineTrueCondition, results;
            return __generator(this, function (_a) {
                log.debug("Transaction.ts: fetchTransactionDetails started", transRespTranId);
                try {
                    transactionQuery = query_1.default.create({
                        type: query_1.default.Type.TRANSACTION,
                    });
                    idMatchCondition = transactionQuery.createCondition({
                        fieldId: "id",
                        operator: query_1.default.Operator.EQUAL,
                        values: [Number(transRespTranId)],
                    });
                    mainLineTrueCondition = transactionQuery.createCondition({
                        fieldId: "transactionlines.mainline",
                        operator: query_1.default.Operator.IS,
                        values: true,
                    });
                    transactionQuery.condition = transactionQuery.and(mainLineTrueCondition, idMatchCondition);
                    // TODO: include subsidiary field
                    transactionQuery.columns = [
                        transactionQuery.createColumn({
                            fieldId: "type",
                        }),
                        transactionQuery.createColumn({
                            fieldId: "recordType",
                        }),
                        transactionQuery.createColumn({
                            fieldId: "entity",
                        }),
                    ];
                    results = transactionQuery.run().asMappedResults();
                    log.debug("Transaction.ts: Transaction Linked to Transaction Response", results);
                    return [2 /*return*/, {
                            id: transRespTranId,
                            record_type: results[0].recordType,
                            type: results[0].type,
                            entity: results[0].entity,
                        }];
                }
                catch (error) {
                    log.error({
                        title: "Querying Transaction record to fetch details ",
                        details: "error" + JSON.stringify(error),
                    });
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    exports.fetchTransactionDetails = fetchTransactionDetails;
    function fetchTransactionResponseStatus() {
        return __awaiter(this, void 0, void 0, function () {
            var transactionResponseStatus, transactionResponseStatusQuery, scriptIdMatchCondition, results, _i, results_1, item;
            return __generator(this, function (_a) {
                log.debug("Transaction.ts: fetchTransactionResponseStatus", "Started");
                transactionResponseStatus = new Map();
                try {
                    transactionResponseStatusQuery = query_1.default.create({
                        type: "customrecord_psg_ei_response_status",
                    });
                    scriptIdMatchCondition = transactionResponseStatusQuery.createCondition({
                        fieldId: "scriptid",
                        operator: query_1.default.Operator.ANY_OF,
                        values: [
                            constants_1.TR_STATUS_LIST.FOR_CANCELLATION,
                            constants_1.TR_STATUS_LIST.FOR_REJECTION,
                        ],
                    });
                    transactionResponseStatusQuery.condition =
                        transactionResponseStatusQuery.and(scriptIdMatchCondition);
                    transactionResponseStatusQuery.columns = [
                        transactionResponseStatusQuery.createColumn({
                            fieldId: "id",
                        }),
                        transactionResponseStatusQuery.createColumn({
                            fieldId: "scriptid",
                        }),
                    ];
                    results = transactionResponseStatusQuery.run().asMappedResults();
                    log.debug("Transaction.ts: Transaction Response Status Map", results);
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        item = results_1[_i];
                        transactionResponseStatus.set(String(item.scriptid).toUpperCase(), Number(item.id));
                    }
                    return [2 /*return*/, transactionResponseStatus];
                }
                catch (error) {
                    log.error({
                        title: "Querying Transaction Response Status record Failed ",
                        details: "error" + JSON.stringify(error),
                    });
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    exports.fetchTransactionResponseStatus = fetchTransactionResponseStatus;
});
