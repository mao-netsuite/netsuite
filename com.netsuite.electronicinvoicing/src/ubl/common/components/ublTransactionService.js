define(["require", "exports", "../lib/services/UBLTransactionService", "./transactionRepositoryFactory", "./subsidiaryPreferencesRepository", "./currencyRepository", "./runtime"], function (require, exports, UBLTransactionService_1, transactionRepositoryFactory_1, subsidiaryPreferencesRepository_1, currencyRepository_1, runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ublTransactionService = void 0;
    exports.ublTransactionService = new UBLTransactionService_1.UBLTransactionService(transactionRepositoryFactory_1.transactionRepositoryFactory, subsidiaryPreferencesRepository_1.subsidiaryPreferencesRepository, currencyRepository_1.currencyRepository, runtime_1.runtime);
});
