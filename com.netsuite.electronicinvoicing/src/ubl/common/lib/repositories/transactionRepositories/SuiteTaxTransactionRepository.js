var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./TransactionRepository", "../../constants"], function (require, exports, TransactionRepository_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SuiteTaxTransactionRepository = void 0;
    var TRANSACTION_MAIN_DATA_QUERY = "\n    SELECT\n        t.id,\n        TO_CHAR(t.trandate, '".concat(constants_1.DB_DATE_FORMAT, "') AS transactionDate,\n        t.type AS transactionType,\n        tl.memo AS memo,\n        ABS(tal.amount) AS netAmount,\n        ABS(tal.amount) - ABS(TaxAmounts.total_tax_amount) AS netAmountNoTax,\n        ABS(TaxAmounts.total_tax_amount) AS taxtotal,\n        cus.companyname AS customerName,\n        etr.taxRegistrationNumber AS customerVATNumber,\n        tl.subsidiary AS subsidiaryId,\n        str.taxregistrationnumber AS subsidiaryVATNumber\n    FROM\n        transaction t \n        JOIN transactionLine tl \n            ON t.id = tl.transaction\n        LEFT JOIN customer cus\n            ON t.entity = cus.id\n        LEFT JOIN EntityTaxRegistration etr\n            ON t.entitytaxregnum = etr.id\n        LEFT JOIN subsidiaryTaxRegistration str\n            ON t.subsidiaryTaxRegNum = str.id\n        LEFT JOIN TransactionAccountingLine tal\n            ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n        LEFT JOIN (\n            SELECT\n                SUM(ABS(tal.amount)) AS total_tax_amount,\n                tal.transaction,\n                tal.accountingbook\n            FROM \n                TransactionLine tl \n                JOIN TransactionAccountingLine tal \n                    ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n            WHERE \n                tl.taxline = 'T'\n            GROUP BY\n                tal.transaction, tal.accountingbook\n        ) TaxAmounts\n            ON TaxAmounts.transaction = t.id AND tal.accountingbook = TaxAmounts.accountingbook\n    WHERE \n        tl.mainline = 'T'\n        AND t.id = ?\n        AND tal.accountingbook = ?\n");
    var TRANSACTION_LINE_QUERY = "\n    SELECT\n        tl.linesequencenumber AS lineNumber,\n        item.itemid AS itemId,\n        item.description AS itemDescription,\n        ABS(tl.quantity) AS quantity,\n        ABS(tal.amount) AS netAmountNoTax,\n        ABS(tal.amount) / ABS(tl.quantity) AS baseprice,\n        ttd.taxrate * 100 AS taxRate\n    FROM\n        transaction t \n        JOIN transactionLine tl \n            ON t.id = tl.transaction\n        LEFT JOIN item\n            ON tl.item = item.id\n        LEFT JOIN transactionTaxDetail ttd\n            ON tl.id = ttd.line AND\n                tl.transaction = ttd.transaction\n        LEFT JOIN TransactionAccountingLine tal\n            ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n    WHERE \n        (\n            tl.mainline = 'F' \n            AND tl.itemtype NOT IN (".concat(constants_1.UNSUPPORTED_ITEM_TYPE.join(","), ")\n        )\n        AND t.id = ?\n        AND tal.accountingbook = ?\n");
    var SuiteTaxTransactionRepository = /** @class */ (function (_super) {
        __extends(SuiteTaxTransactionRepository, _super);
        function SuiteTaxTransactionRepository() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SuiteTaxTransactionRepository.prototype.getTransactionData = function (transactionId, accountingBookId, transType) {
            var mainTransactionQueryResults = this.getMainTransactionData(transactionId, accountingBookId, transType);
            var transactionLineQueryResults = this.getTransactionLineData(transactionId, accountingBookId);
            return {
                mainTransaction: mainTransactionQueryResults,
                transactionLines: transactionLineQueryResults
            };
        };
        SuiteTaxTransactionRepository.prototype.getMainTransactionData = function (transactionId, accountingBookId, transType) {
            var results = this.db.query(TRANSACTION_MAIN_DATA_QUERY, [transactionId, accountingBookId]);
            if (results.length !== 1)
                return undefined;
            var result = results[0];
            return {
                transactionDate: result.transactiondate,
                transactionType: transType,
                netAmount: result.netamount,
                netAmountNoTax: result.netamountnotax,
                taxTotal: result.taxtotal,
                customerName: result.customername,
                customerVATNumber: result.customervatnumber,
                subsidiaryVATNumber: result.subsidiaryvatnumber,
                memo: result.memo,
                id: result.id
            };
        };
        SuiteTaxTransactionRepository.prototype.getTransactionLineData = function (transactionId, accountingBookId) {
            var results = this.db.query(TRANSACTION_LINE_QUERY, [transactionId, accountingBookId]);
            return results.map(function (result) { return ({
                basePrice: result.baseprice,
                lineNumber: result.linenumber,
                itemId: result.itemid,
                itemDescription: result.itemdescription,
                netAmountNoTax: result.netamountnotax,
                taxRate: result.taxrate,
                quantity: result.quantity
            }); });
        };
        return SuiteTaxTransactionRepository;
    }(TransactionRepository_1.TransactionRepository));
    exports.SuiteTaxTransactionRepository = SuiteTaxTransactionRepository;
});
