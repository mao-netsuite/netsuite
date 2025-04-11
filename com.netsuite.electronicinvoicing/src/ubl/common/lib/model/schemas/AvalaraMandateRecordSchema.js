/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVALARA_MANDATE_RECORD_SCHEMA = void 0;
    exports.AVALARA_MANDATE_RECORD_SCHEMA = {
        fields: {
            countryMandate: "custrecord_nseb_country_mandate_id",
            description: "custrecord_nseb_mandate_desc",
            id: "id",
            isEnabled: "custrecord_nseb_mandate_enabled",
            processStatusPluginImplementation: "custrecord_nseb_mandate_proc_status_pi",
        },
        type: "customrecord_nseb_av_mandate"
    };
});
