/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseString = void 0;
    function parseString(value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        if (typeof value === "string") {
            return value || defaultValue;
        }
        if (typeof value === "number" && !isNaN(value)) {
            return String(value);
        }
        return defaultValue;
    }
    exports.parseString = parseString;
});
