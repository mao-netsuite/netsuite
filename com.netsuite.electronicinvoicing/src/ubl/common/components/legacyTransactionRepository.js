define(["require", "exports", "../lib/repositories/transactionRepositories/LegacyTransactionRepository", "./db", "./ublTransactionLineLegacySearchBuilder"], function (require, exports, LegacyTransactionRepository_1, db_1, ublTransactionLineLegacySearchBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyTransactionRepository = void 0;
    exports.legacyTransactionRepository = new LegacyTransactionRepository_1.LegacyTransactionRepository(db_1.db, ublTransactionLineLegacySearchBuilder_1.ublTransactionLineLegacySearchBuilder);
});
