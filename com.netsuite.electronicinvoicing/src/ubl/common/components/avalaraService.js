/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../lib/services/AvalaraService", "./avalaraMandateValidator"], function (require, exports, AvalaraService_1, avalaraMandateValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avalaraService = void 0;
    exports.avalaraService = new AvalaraService_1.AvalaraService(avalaraMandateValidator_1.avalaraMandateValidator);
});
