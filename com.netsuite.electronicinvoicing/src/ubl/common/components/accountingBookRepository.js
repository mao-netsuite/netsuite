define(["require", "exports", "../lib/repositories/AccountingBookRepository", "./db"], function (require, exports, AccountingBookRepository_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.accountingBookRepository = void 0;
    exports.accountingBookRepository = new AccountingBookRepository_1.AccountingBookRepository(db_1.db);
});
