/**
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.booleanOrDefault = void 0;
    function booleanOrDefault(value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        if (typeof value === "boolean") {
            return value;
        }
        return defaultValue;
    }
    exports.booleanOrDefault = booleanOrDefault;
});
