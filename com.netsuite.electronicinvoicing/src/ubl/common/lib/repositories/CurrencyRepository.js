define(["require", "exports", "../../../utils/string"], function (require, exports, string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CurrencyRepository = void 0;
    var CurrencyRepository = /** @class */ (function () {
        function CurrencyRepository(db) {
            this.db = db;
            this.queryCurrencyAccountingBook = "\n        SELECT\n            c.symbol as currencysymbol\n            , c.name as currencyname\n        FROM\n            AccountingBookSubsidiaries abs\n            JOIN currency c ON abs.currency = c.id \n            \n        WHERE\n            abs.subsidiary = ?\n            AND abs.accountingbook = ?\n    ";
            this.querySubsidiaryCurrency = "\n        SELECT\n            c.symbol as currencysymbol\n            , c.name as currencyname\n        FROM\n            subsidiary s\n            JOIN currency c ON s.currency = c.id\n        WHERE \n            s.id = ? \n    ";
            this.queryCurrencyBySymbol = "\n        SELECT \n            c.symbol as currencysymbol\n            , c.name as currencyname\n        FROM\n            currency c\n            INNER JOIN VendorCurrencyBalance vcb\n                ON vcb.currency = c.id\n            INNER JOIN Vendor v\n                ON v.id = vcb.vendor\n        WHERE\n            v.id = ?\n            AND c.symbol = ?\n    ";
        }
        CurrencyRepository.prototype.getCurrencySymbolForSubsidiaryAccountingBook = function (subsidiaryId, accountingBookId) {
            var _a, _b;
            var result = this.db.query(this.queryCurrencyAccountingBook, [subsidiaryId, accountingBookId]);
            if (result.length !== 1) {
                return undefined;
            }
            return {
                symbol: (0, string_1.parseString)((_a = result[0]) === null || _a === void 0 ? void 0 : _a.currencysymbol),
                name: (0, string_1.parseString)((_b = result[0]) === null || _b === void 0 ? void 0 : _b.currencyname)
            };
        };
        CurrencyRepository.prototype.getCurrencySymbolForSubsidiary = function (subsidiaryId) {
            var _a, _b;
            var result = this.db.query(this.querySubsidiaryCurrency, [subsidiaryId]);
            if (result.length !== 1) {
                return undefined;
            }
            return {
                symbol: (0, string_1.parseString)((_a = result[0]) === null || _a === void 0 ? void 0 : _a.currencysymbol),
                name: (0, string_1.parseString)((_b = result[0]) === null || _b === void 0 ? void 0 : _b.currencyname)
            };
        };
        CurrencyRepository.prototype.getCurrencyForVendorBySymbol = function (vendorId, currencySymbol) {
            var _a;
            var result = this.db.query(this.queryCurrencyBySymbol, [vendorId, currencySymbol]);
            if (result.length !== 1) {
                return undefined;
            }
            return {
                symbol: currencySymbol,
                name: (0, string_1.parseString)((_a = result[0]) === null || _a === void 0 ? void 0 : _a.currencyname)
            };
        };
        return CurrencyRepository;
    }());
    exports.CurrencyRepository = CurrencyRepository;
});
