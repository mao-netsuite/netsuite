define(["require", "exports", "../../../../utils/string"], function (require, exports, string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionRepository = void 0;
    var SUBSIDIARY_ID_QUERY = "\n    SELECT\n        tl.subsidiary AS subsidiaryId\n    FROM \n        transactionLine tl\n    WHERE\n        tl.transaction = ?\n        AND tl.mainline = 'T'\n";
    var TransactionRepository = /** @class */ (function () {
        function TransactionRepository(db) {
            this.db = db;
        }
        TransactionRepository.prototype.getDBTransactionData = function (transactionId, accountingBookId, transType) {
            log.debug("TransactionRepository.getUBLTransaction", { transactionId: transactionId });
            var transactionData = this.getTransactionData(transactionId, accountingBookId, transType);
            var dbTransactionMainLine = transactionData.mainTransaction;
            var dbTransactionLines = transactionData.transactionLines;
            if (!dbTransactionMainLine) {
                throw new Error("Transaction not found");
            }
            if ((dbTransactionLines === null || dbTransactionLines === void 0 ? void 0 : dbTransactionLines.length) === 0) {
                throw new Error("Transaction found without lines");
            }
            log.debug("TransactionRepository.getUBLTransaction", {
                transactionData: transactionData,
            });
            return transactionData;
        };
        TransactionRepository.prototype.getSubsidiaryIdFromTransaction = function (transactionId) {
            var _a;
            //run a query and return the subsidiary id - transactionLine query
            var queryResults = this.db.query(SUBSIDIARY_ID_QUERY, [transactionId]);
            return (0, string_1.parseString)((_a = queryResults[0]) === null || _a === void 0 ? void 0 : _a.subsidiaryid);
        };
        return TransactionRepository;
    }());
    exports.TransactionRepository = TransactionRepository;
});
