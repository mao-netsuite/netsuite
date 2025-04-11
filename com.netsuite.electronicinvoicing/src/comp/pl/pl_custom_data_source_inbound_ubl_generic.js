/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope SameAccount
 */
define(["require", "exports", "../../ubl/scripts/components/customDataSourceGenericInbound"], function (require, exports, customDataSourceGenericInbound_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inject = void 0;
    function inject(params) {
        return customDataSourceGenericInbound_1.customDataSourceGenericInbound.inject(params);
    }
    exports.inject = inject;
});
