/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../lib/repositories/SubsidiaryRepository", "./db"], function (require, exports, SubsidiaryRepository_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subsidiaryRepository = void 0;
    exports.subsidiaryRepository = new SubsidiaryRepository_1.SubsidiaryRepository(db_1.db);
});
