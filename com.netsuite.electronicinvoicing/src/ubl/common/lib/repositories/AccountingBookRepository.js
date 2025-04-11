define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AccountingBookRepository = void 0;
    var AccountingBookRepository = /** @class */ (function () {
        function AccountingBookRepository(db) {
            this.db = db;
            this.queryAccountingBooks = "\n        SELECT\n            abs.accountingbook, \n            ab.name,\n        From \n            accountingbooksubsidiaries abs\n        JOIN accountingbook ab \n        ON \n            ab.id = abs.accountingbook\n        WHERE\n            abs.subsidiary = ?\n        AND\n            abs.status = 'ACTIVE'\n        ORDER BY\n            abs.accountingbook";
            this.queryAccountingBookName = "\n        SELECT\n            ab.name\n        FROM \n            accountingbook ab \n        WHERE \n            ab.id = ?";
        }
        AccountingBookRepository.prototype.getAccountingBooksBySubsidiaryId = function (subsidiaryId) {
            return this.db.query(this.queryAccountingBooks, [subsidiaryId])
                .map(function (x) { return ({
                accountingBookId: x.accountingbook,
                accountingBookName: x.name,
            }); });
        };
        AccountingBookRepository.prototype.getAccountingBookById = function (accountingbookId) {
            return this.db.query(this.queryAccountingBookName, [accountingbookId])
                .map(function (x) { return ({
                name: x.name,
            }); });
        };
        return AccountingBookRepository;
    }());
    exports.AccountingBookRepository = AccountingBookRepository;
});
