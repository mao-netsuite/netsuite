/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TRANSACTION_RECORD_SCHEMA = void 0;
    exports.TRANSACTION_RECORD_SCHEMA = {
        fields: {
            avalaraMandate: "custbody_nseb_avalara_mandate",
            avalaraDataVersion: "custbody_nseb_avalara_data_format",
            id: "id",
        },
        type: "transaction",
    };
});
