/**
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isInvalidSearchTypeError = exports.isSuiteScriptError = void 0;
    function isSuiteScriptError(e) {
        return (((typeof e === "object" && e !== null) || typeof e === "function") &&
            e.type === "error.SuiteScriptError");
    }
    exports.isSuiteScriptError = isSuiteScriptError;
    function isInvalidSearchTypeError(error) {
        return isSuiteScriptError(error) && error.name === "INVALID_SEARCH_TYPE";
    }
    exports.isInvalidSearchTypeError = isInvalidSearchTypeError;
});
