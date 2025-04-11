/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
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
define(["require", "exports", "./SearchBuilder"], function (require, exports, SearchBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLTransactionLineLegacySearchBuilder = void 0;
    var UBLTransactionLineLegacySearchBuilder = /** @class */ (function (_super) {
        __extends(UBLTransactionLineLegacySearchBuilder, _super);
        function UBLTransactionLineLegacySearchBuilder(search, runtime) {
            var _this = _super.call(this, "transaction", search) || this;
            _this.runtime = runtime;
            return _this;
        }
        UBLTransactionLineLegacySearchBuilder.prototype.buildSettings = function () {
            if (!this.runtime.isSubsidiariesEnabled() ||
                !this.runtime.isFeatureEnabled("multicurrency")) {
                return [];
            }
            return [
                this.search.createSetting({
                    name: "consolidationtype",
                    value: "NONE",
                }),
            ];
        };
        UBLTransactionLineLegacySearchBuilder.prototype.buildFilters = function (params) {
            return [
                ["internalid", "is", params[0]],
                "and",
                [
                    ["mainline", "is", "F"],
                    "and",
                    [
                        ["itemtype", "isnot", "EndGroup"],
                        "and",
                        ["itemtype", "isnot", "Group"],
                        "and",
                        ["itemtype", "isnot", "TaxItem"],
                        "and",
                        ["itemtype", "isnot", "TaxGroup"],
                        "and",
                        ["itemtype", "isnot", "Discount"],
                        "and",
                        ["itemtype", "isnot", "Description"],
                        "and",
                        // exclude lines with empty amount for inventory items
                        ["taxitem.itemid", "isnotempty", ""],
                    ],
                ],
            ];
        };
        UBLTransactionLineLegacySearchBuilder.prototype.buildColumns = function () {
            var columns = {
                lineSequenceNumber: this.search.createColumn({
                    name: "line",
                }),
                taxRate: this.search.createColumn({
                    name: "formulatext",
                    formula: "ABS({taxItem.rate})",
                    label: "taxrate",
                }),
            };
            return columns;
        };
        return UBLTransactionLineLegacySearchBuilder;
    }(SearchBuilder_1.SearchBuilder));
    exports.UBLTransactionLineLegacySearchBuilder = UBLTransactionLineLegacySearchBuilder;
});
