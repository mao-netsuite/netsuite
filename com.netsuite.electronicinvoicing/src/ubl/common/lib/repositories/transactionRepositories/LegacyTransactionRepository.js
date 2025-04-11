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
define(["require", "exports", "./TransactionRepository", "../../../../utils/string", "../../constants"], function (require, exports, TransactionRepository_1, string_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegacyTransactionRepository = void 0;
    var TRANSACTION_MAIN_DATA_QUERY = "\n    SELECT\n        t.id,\n        TO_CHAR(t.trandate, '".concat(constants_1.DB_DATE_FORMAT, "') AS transactionDate,\n        t.type AS transactionType,\n        tl.memo AS memo,\n        cus.companyname AS customerName,\n        tl.subsidiary AS subsidiaryId,\n        sub.federalidnumber AS subsidiaryVATNumber,\n        ABS(tal.amount) AS netAmount,\n        ABS(na.total_tax_amount) AS taxtotal,\n        ABS(tal.amount) - ABS(na.total_tax_amount) AS netAmountNoTax\n    FROM\n        transaction t \n        JOIN transactionLine tl \n            ON t.id = tl.transaction\n        LEFT JOIN customer cus\n            ON t.entity = cus.id\n        LEFT JOIN Subsidiary sub\n            ON tl.subsidiary = sub.id\n        LEFT JOIN TransactionAccountingLine tal\n            ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n        LEFT JOIN (\n            SELECT\n                SUM(ABS(tal.amount)) AS total_tax_amount,\n                tal.transaction,\n                tal.accountingbook\n            FROM \n                TransactionLine tl \n                JOIN TransactionAccountingLine tal \n                    ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n            WHERE \n                tl.taxline = 'T'\n            GROUP BY\n                tal.transaction, tal.accountingbook\n        ) na\n            ON na.transaction = t.id AND tal.accountingbook = na.accountingbook\n    WHERE \n        tl.mainline = 'T'\n        AND t.id = ?\n        AND tal.accountingbook = ?\n");
    var TRANSACTION_LINE_QUERY = "\n    SELECT\n        tl.linesequencenumber AS lineNumber,\n        item.itemid AS itemId,\n        item.description AS itemDescription,\n        ABS(tl.quantity) AS quantity,\n        ABS(tal.amount) AS netAmountNoTax,\n        ABS(tal.amount) / ABS(tl.quantity) AS baseprice\n    FROM\n        transaction t \n        JOIN transactionLine tl \n            ON t.id = tl.transaction\n        LEFT JOIN item\n            ON tl.item = item.id\n        LEFT JOIN TransactionAccountingLine tal\n            ON tl.id = tal.transactionline AND tl.transaction = tal.transaction\n    WHERE \n        (\n            tl.mainline = 'F' \n            AND tl.itemtype NOT IN (".concat(constants_1.UNSUPPORTED_ITEM_TYPE.join(","), ")\n        )\n        AND t.id = ?\n        AND tal.accountingbook = ?\n");
    var LegacyTransactionRepository = /** @class */ (function (_super) {
        __extends(LegacyTransactionRepository, _super);
        function LegacyTransactionRepository(db, ublTransactionLineSearchBuilder) {
            var _this = _super.call(this, db) || this;
            _this.ublTransactionLineSearchBuilder = ublTransactionLineSearchBuilder;
            return _this;
        }
        LegacyTransactionRepository.prototype.getTransactionData = function (transactionId, accountingBookId, transType) {
            var mainTransactionData = this.getMainTransactionData(transactionId, accountingBookId, transType);
            var transactionLineData = this.getTransactionLineData(transactionId, accountingBookId);
            var transactionData = {
                mainTransaction: mainTransactionData,
                transactionLines: transactionLineData
            };
            this.overrideFieldsValues(transactionId, transactionData);
            return transactionData;
        };
        LegacyTransactionRepository.prototype.getMainTransactionData = function (transactionId, accountingBookId, transType) {
            var mainTransactionQueryResults = this.db.query(TRANSACTION_MAIN_DATA_QUERY, [transactionId, accountingBookId]);
            if (mainTransactionQueryResults.length !== 1)
                return undefined;
            var qrResult = mainTransactionQueryResults[0];
            return {
                transactionDate: qrResult.transactiondate,
                transactionType: transType,
                netAmount: qrResult.netamount,
                netAmountNoTax: qrResult.netamountnotax,
                taxTotal: qrResult.taxtotal,
                customerName: qrResult.customername,
                customerVATNumber: "",
                subsidiaryVATNumber: qrResult.subsidiaryvatnumber,
                memo: qrResult.memo,
                id: qrResult.id
            };
        };
        LegacyTransactionRepository.prototype.getTransactionLineData = function (transactionId, accountingBookId) {
            var transactionLineQueryResults = this.db.query(TRANSACTION_LINE_QUERY, [transactionId, accountingBookId]);
            var transactionLineDBSearchResult = this.db.search(this.ublTransactionLineSearchBuilder, [transactionId]);
            return this.joinQuerySearchLineData(transactionLineQueryResults, transactionLineDBSearchResult);
        };
        LegacyTransactionRepository.prototype.joinQuerySearchLineData = function (queryResults, searchResults) {
            var mergedResults = [];
            var joinData = function (qResult, sResult) { return ({
                basePrice: qResult.baseprice,
                lineNumber: qResult.linenumber,
                itemId: qResult.itemid,
                itemDescription: qResult.itemdescription,
                netAmountNoTax: qResult.netamountnotax,
                taxRate: sResult.taxRate,
                quantity: qResult.quantity
            }); };
            var _loop_1 = function (qResult) {
                var sResults = searchResults.filter(function (searchResult) {
                    return (0, string_1.parseString)(searchResult.lineSequenceNumber) === (0, string_1.parseString)(qResult.linenumber);
                });
                if (sResults.length === 0)
                    sResults.push({});
                sResults.forEach(function (searchResult) { return mergedResults.push(joinData(qResult, searchResult)); });
            };
            for (var _i = 0, queryResults_1 = queryResults; _i < queryResults_1.length; _i++) {
                var qResult = queryResults_1[_i];
                _loop_1(qResult);
            }
            return mergedResults;
        };
        LegacyTransactionRepository.prototype.overrideFieldsValues = function (transactionId, dbTransactionData) {
            if (!dbTransactionData.mainTransaction)
                return dbTransactionData;
            var transactionType = (0, string_1.parseString)(dbTransactionData.mainTransaction.transactionType);
            var transactionRecord = this.db.loadRecordSync({
                id: transactionId,
                type: transactionType,
            });
            return this.addCustomerVATNumber(transactionRecord, dbTransactionData.mainTransaction);
        };
        LegacyTransactionRepository.prototype.addCustomerVATNumber = function (transactionRecord, mainTransactionData) {
            mainTransactionData.customerVATNumber = this.getCustomerVATNumber(transactionRecord);
        };
        LegacyTransactionRepository.prototype.getCustomerVATNumber = function (transaction) {
            return (0, string_1.parseString)(transaction.getValue("vatregnum"));
        };
        return LegacyTransactionRepository;
    }(TransactionRepository_1.TransactionRepository));
    exports.LegacyTransactionRepository = LegacyTransactionRepository;
});
