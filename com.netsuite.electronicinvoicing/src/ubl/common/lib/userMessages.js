/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avalara_mandate_activation_error_message = void 0;
    var avalara_mandate_activation_error_message = function (mandate) {
        return "Generation Failed. E-Invoicing Mandate ".concat(mandate, " is not activated. Please contact your Avalara Manager.");
    };
    exports.avalara_mandate_activation_error_message = avalara_mandate_activation_error_message;
});
