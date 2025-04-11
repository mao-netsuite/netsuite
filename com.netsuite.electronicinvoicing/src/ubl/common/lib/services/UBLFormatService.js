define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLFormatService = void 0;
    var UBLFormatService = /** @class */ (function () {
        function UBLFormatService(format) {
            this.format = format;
        }
        UBLFormatService.prototype.formatDate = function (date) {
            return this.format.format({
                value: new Date(date.replace(/-/g, "/")),
                type: this.format.Type.DATE,
            });
        };
        return UBLFormatService;
    }());
    exports.UBLFormatService = UBLFormatService;
});
