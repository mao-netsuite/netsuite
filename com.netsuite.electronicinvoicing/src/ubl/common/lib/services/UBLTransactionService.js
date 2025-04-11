define(["require", "exports", "../../../utils/string", "../../../utils/number", "../constants"], function (require, exports, string_1, number_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLTransactionService = void 0;
    var UBLTransactionService = /** @class */ (function () {
        function UBLTransactionService(transactionRepositoryFactory, subsidiaryPreferencesRepository, currencyRepository, runtime) {
            this.transactionRepositoryFactory = transactionRepositoryFactory;
            this.subsidiaryPreferencesRepository = subsidiaryPreferencesRepository;
            this.currencyRepository = currencyRepository;
            this.runtime = runtime;
            this.DEFAULT_ACCOUNTING_BOOK = "1";
        }
        UBLTransactionService.prototype.getUBLTransaction = function (transactionId, transType) {
            var subsidiaryId = this.getSubsidiaryId(transactionId);
            var accountingBook = this.getAccountingBook(subsidiaryId);
            var transactionData = this.transactionRepositoryFactory.getTransactionRepository().getDBTransactionData(transactionId, accountingBook.id, transType);
            return this.toUBLTransaction(transactionData, accountingBook);
        };
        UBLTransactionService.prototype.getSubsidiaryId = function (transactionId) {
            return this.transactionRepositoryFactory.getTransactionRepository().getSubsidiaryIdFromTransaction(transactionId);
        };
        UBLTransactionService.prototype.getAccountingBook = function (subsidiaryId) {
            var accountingBookId = this.getAccountingBookId(subsidiaryId);
            var currency = accountingBookId === this.DEFAULT_ACCOUNTING_BOOK ?
                this.currencyRepository.getCurrencySymbolForSubsidiary(subsidiaryId) :
                this.currencyRepository.getCurrencySymbolForSubsidiaryAccountingBook(subsidiaryId, accountingBookId);
            if (!currency) {
                throw new Error("Unable to find the currency for the subsidiary");
            }
            return {
                id: accountingBookId,
                currency: currency
            };
        };
        UBLTransactionService.prototype.getAccountingBookId = function (subsidiaryId) {
            if (!this.runtime.isMultiBookAccountingEnabled() || !this.runtime.isForeignCurrencyManagementEnabled()) {
                return this.DEFAULT_ACCOUNTING_BOOK;
            }
            var subsidiaryPreferences = this.subsidiaryPreferencesRepository.getSubsidiaryPreferenceBySubsidiaryId(subsidiaryId);
            if (!subsidiaryPreferences)
                return this.DEFAULT_ACCOUNTING_BOOK;
            var accountingBookId = subsidiaryPreferences.accountingBookId;
            return accountingBookId !== "" ? accountingBookId : this.DEFAULT_ACCOUNTING_BOOK;
        };
        UBLTransactionService.prototype.toUBLTransaction = function (_a, accountingBook) {
            var mainTransaction = _a.mainTransaction, transactionLines = _a.transactionLines;
            return {
                customerName: (0, string_1.parseString)(mainTransaction.customerName),
                customerVATNumber: (0, string_1.parseString)(mainTransaction.customerVATNumber),
                id: (0, string_1.parseString)(mainTransaction.id),
                memo: (0, string_1.parseString)(mainTransaction.memo),
                netAmount: (0, number_1.parseNumber)(mainTransaction.netAmount),
                netAmountNoTax: (0, number_1.parseNumber)(mainTransaction.netAmountNoTax),
                subsidiaryVATNumber: (0, string_1.parseString)(mainTransaction.subsidiaryVATNumber),
                accountingBook: accountingBook,
                taxTotal: (0, number_1.parseNumber)(mainTransaction.taxTotal),
                transactionDate: (0, string_1.parseString)(mainTransaction.transactionDate),
                transactionType: (0, string_1.parseString)(mainTransaction.transactionType),
                transactionLines: transactionLines.map(function (transactionLine) { return ({
                    basePrice: (0, number_1.parseNumber)(transactionLine.basePrice),
                    itemDescription: (0, string_1.parseString)(transactionLine.itemDescription),
                    itemId: (0, string_1.parseString)(transactionLine.itemId),
                    lineNumber: (0, string_1.parseString)(transactionLine.lineNumber),
                    netAmountNoTax: (0, number_1.parseNumber)(transactionLine.netAmountNoTax),
                    quantity: (0, number_1.parseNumber)(transactionLine.quantity),
                    taxRate: (0, number_1.parseNumber)(transactionLine.taxRate),
                    taxScheme: constants_1.DEFAULT_TAX_SCHEME,
                    unitOfMeasure: constants_1.DEFAULT_UNIT_OF_MEASURE,
                }); }),
            };
        };
        return UBLTransactionService;
    }());
    exports.UBLTransactionService = UBLTransactionService;
});
