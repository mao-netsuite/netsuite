/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.percentageOf = exports.quantityOf = exports.amountOf = void 0;
    function amountOf(amount, currency) {
        return { _value: amount.toFixed(2), currencyId: currency };
    }
    exports.amountOf = amountOf;
    function quantityOf(quantity, unitCode) {
        return { _value: quantity.toString(), unitCode: unitCode };
    }
    exports.quantityOf = quantityOf;
    function percentageOf(percentage) {
        return percentage.toString();
    }
    exports.percentageOf = percentageOf;
});
