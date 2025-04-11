/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../lib/validators/AvalaraMandateValidator", "./avalaraMandateRepository", "./errorService"], function (require, exports, AvalaraMandateValidator_1, avalaraMandateRepository_1, errorService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avalaraMandateValidator = void 0;
    exports.avalaraMandateValidator = new AvalaraMandateValidator_1.AvalaraMandateValidator(avalaraMandateRepository_1.avalaraMandateRepository, errorService_1.errorService);
});
