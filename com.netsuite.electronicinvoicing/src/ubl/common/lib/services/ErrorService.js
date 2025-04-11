/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorService = void 0;
    var ErrorService = /** @class */ (function () {
        function ErrorService(error) {
            this.error = error;
        }
        ErrorService.prototype.create = function (options) {
            return this.error.create(options);
        };
        return ErrorService;
    }());
    exports.ErrorService = ErrorService;
});
