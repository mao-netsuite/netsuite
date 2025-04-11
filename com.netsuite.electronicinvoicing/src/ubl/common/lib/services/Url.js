define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Url = void 0;
    var Url = /** @class */ (function () {
        function Url(url) {
            this.url = url;
        }
        Url.prototype.resolveScript = function (options) {
            return this.url.resolveScript(options);
        };
        return Url;
    }());
    exports.Url = Url;
});
