define(["require", "exports", "../lib/factories/TransactionRepositoryFactory", "./runtime", "./suiteTaxTransactionRepository", "./legacyTransactionRepository"], function (require, exports, TransactionRepositoryFactory_1, runtime_1, suiteTaxTransactionRepository_1, legacyTransactionRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transactionRepositoryFactory = void 0;
    exports.transactionRepositoryFactory = new TransactionRepositoryFactory_1.TransactionRepositoryFactory(runtime_1.runtime, suiteTaxTransactionRepository_1.suiteTaxTransactionRepository, legacyTransactionRepository_1.legacyTransactionRepository);
});
