define(["require", "exports", "../lib/repositories/transactionRepositories/SuiteTaxTransactionRepository", "./db"], function (require, exports, SuiteTaxTransactionRepository_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.suiteTaxTransactionRepository = void 0;
    exports.suiteTaxTransactionRepository = new SuiteTaxTransactionRepository_1.SuiteTaxTransactionRepository(db_1.db);
});
