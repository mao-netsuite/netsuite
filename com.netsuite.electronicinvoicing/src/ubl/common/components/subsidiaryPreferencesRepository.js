define(["require", "exports", "./db", "../lib/repositories/SubsidiaryPreferencesRepository"], function (require, exports, db_1, SubsidiaryPreferencesRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subsidiaryPreferencesRepository = void 0;
    exports.subsidiaryPreferencesRepository = new SubsidiaryPreferencesRepository_1.SubsidiaryPreferencesRepository(db_1.db);
});
