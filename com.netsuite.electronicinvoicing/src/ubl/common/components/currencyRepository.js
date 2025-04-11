define(["require", "exports", "../lib/repositories/CurrencyRepository", "./db"], function (require, exports, CurrencyRepository_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.currencyRepository = void 0;
    exports.currencyRepository = new CurrencyRepository_1.CurrencyRepository(db_1.db);
});
