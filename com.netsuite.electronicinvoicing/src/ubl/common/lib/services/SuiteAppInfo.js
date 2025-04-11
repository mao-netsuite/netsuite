define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SuiteAppInfo = void 0;
    var SuiteAppInfo = /** @class */ (function () {
        function SuiteAppInfo(suiteAppInfo) {
            this.suiteAppInfo = suiteAppInfo;
        }
        SuiteAppInfo.prototype.listBundlesContainingScripts = function (options) {
            return this.suiteAppInfo.listBundlesContainingScripts(options);
        };
        SuiteAppInfo.prototype.isSuiteAppInstalled = function (options) {
            return this.suiteAppInfo.isSuiteAppInstalled(options);
        };
        return SuiteAppInfo;
    }());
    exports.SuiteAppInfo = SuiteAppInfo;
});
