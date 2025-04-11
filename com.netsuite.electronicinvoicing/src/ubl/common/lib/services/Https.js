define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Https = void 0;
    var Https = /** @class */ (function () {
        function Https(https) {
            this.https = https;
        }
        Https.prototype.post = function (options) {
            return this.https.post(options);
        };
        return Https;
    }());
    exports.Https = Https;
});
