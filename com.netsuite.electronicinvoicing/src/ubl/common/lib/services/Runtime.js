/**
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Runtime = void 0;
    var Runtime = /** @class */ (function () {
        function Runtime(runtime) {
            this.runtime = runtime;
            this.features = {};
        }
        Runtime.prototype.isFeatureEnabled = function (feature) {
            if (this.features[feature] === undefined) {
                this.features[feature] = this.runtime.isFeatureInEffect({
                    feature: feature,
                });
            }
            return this.features[feature];
        };
        Runtime.prototype.isSuiteTaxEnabled = function () {
            return this.isFeatureEnabled("tax_overhauling");
        };
        Runtime.prototype.isMultiBookAccountingEnabled = function () {
            return this.isFeatureEnabled("fullmultibook");
        };
        Runtime.prototype.isForeignCurrencyManagementEnabled = function () {
            return this.isFeatureEnabled("foreigncurrencymanagement");
        };
        Runtime.prototype.isMulticurrencyFeatureEnabled = function () {
            return this.isFeatureEnabled("multicurrency");
        };
        Runtime.prototype.isSubsidiariesEnabled = function () {
            return this.isFeatureEnabled("subsidiaries");
        };
        return Runtime;
    }());
    exports.Runtime = Runtime;
});
