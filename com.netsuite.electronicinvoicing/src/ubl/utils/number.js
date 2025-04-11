/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseNumber = void 0;
    function parseNumber(value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        if (typeof value === "string") {
            value = parseFloat(value);
        }
        return typeof value === "number" && isFinite(value) ? value : defaultValue;
    }
    exports.parseNumber = parseNumber;
});
