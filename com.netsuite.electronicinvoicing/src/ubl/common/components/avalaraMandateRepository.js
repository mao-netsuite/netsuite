/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../lib/repositories/AvalaraMandateRepository", "./db"], function (require, exports, AvalaraMandateRepository_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avalaraMandateRepository = void 0;
    exports.avalaraMandateRepository = new AvalaraMandateRepository_1.AvalaraMandateRepository(db_1.db);
});
