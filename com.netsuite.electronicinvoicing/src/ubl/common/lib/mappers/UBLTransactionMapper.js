define(["require", "exports", "../model/UBL2_1Transaction"], function (require, exports, UBL2_1Transaction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLTransactionMapper = void 0;
    var UBLTransactionMapper = /** @class */ (function () {
        function UBLTransactionMapper() {
        }
        UBLTransactionMapper.prototype.mergeTransactionLines = function (transactionLines) {
            var accumulatorOfTransactionLines = {};
            transactionLines
                .forEach(function (currentLine) {
                var lineNumber = currentLine.lineNumber;
                if (accumulatorOfTransactionLines[lineNumber] === undefined) {
                    accumulatorOfTransactionLines[lineNumber] = {
                        lineNumber: lineNumber,
                        basePrice: currentLine.basePrice,
                        itemDescription: currentLine.itemDescription,
                        itemId: currentLine.itemId,
                        netAmountNoTax: currentLine.netAmountNoTax,
                        quantity: currentLine.quantity,
                        unitOfMeasure: currentLine.unitOfMeasure,
                        classifiedTaxCategory: [],
                    };
                }
                accumulatorOfTransactionLines[lineNumber].classifiedTaxCategory.push({
                    percent: (0, UBL2_1Transaction_1.percentageOf)(currentLine.taxRate),
                    taxScheme: { id: currentLine.taxScheme },
                });
            });
            return Object.keys(accumulatorOfTransactionLines)
                .map(function (lineNumber) { return accumulatorOfTransactionLines[lineNumber]; });
        };
        UBLTransactionMapper.prototype.to = function (transaction) {
            var transactionCurrency = transaction.accountingBook.currency.symbol;
            var amountOrUndefined = function (amount, currency) { return (amount ? (0, UBL2_1Transaction_1.amountOf)(amount, currency) : undefined); };
            var transactionLines = this.mergeTransactionLines(transaction.transactionLines);
            return {
                id: transaction.id,
                documentCurrencyCode: { _value: transactionCurrency },
                accountingBookId: transaction.accountingBook.id,
                issueDate: transaction.transactionDate,
                transactionType: transaction.transactionType,
                note: transaction.memo ? [{ _value: transaction.memo }] : undefined,
                accountingSupplierParty: {
                    party: {
                        partyIdentification: transaction.subsidiaryVATNumber
                            ? [{ id: transaction.subsidiaryVATNumber }]
                            : undefined,
                    },
                },
                accountingCustomerParty: {
                    party: {
                        partyIdentification: transaction.customerVATNumber
                            ? [{ id: transaction.customerVATNumber }]
                            : undefined,
                        partyName: transaction.customerName
                            ? [{ name: { _value: transaction.customerName } }]
                            : undefined,
                    },
                },
                taxTotal: [
                    {
                        taxAmount: (0, UBL2_1Transaction_1.amountOf)(transaction.taxTotal, transactionCurrency),
                    },
                ],
                legalMonetaryTotal: {
                    lineExtensionAmount: amountOrUndefined(transaction.netAmountNoTax, transactionCurrency),
                    taxExclusiveAmount: amountOrUndefined(transaction.netAmountNoTax, transactionCurrency),
                    payableAmount: (0, UBL2_1Transaction_1.amountOf)(transaction.netAmount, transactionCurrency),
                    taxInclusiveAmount: amountOrUndefined(transaction.netAmount, transactionCurrency),
                },
                transactionLines: transactionLines.map(function (line) { return ({
                    id: line.lineNumber,
                    lineExtensionAmount: (0, UBL2_1Transaction_1.amountOf)(line.netAmountNoTax, transactionCurrency),
                    item: {
                        // this is optional (might be cases where is not defined)
                        standardItemIdentification: { id: line.itemId },
                        classifiedTaxCategory: line.classifiedTaxCategory,
                        description: line.itemDescription
                            ? [{ _value: line.itemDescription }]
                            : undefined,
                    },
                    transactionQuantity: (0, UBL2_1Transaction_1.quantityOf)(line.quantity, line.unitOfMeasure),
                    price: {
                        priceAmount: (0, UBL2_1Transaction_1.amountOf)(line.basePrice, transactionCurrency),
                    },
                }); }),
            };
        };
        return UBLTransactionMapper;
    }());
    exports.UBLTransactionMapper = UBLTransactionMapper;
});
