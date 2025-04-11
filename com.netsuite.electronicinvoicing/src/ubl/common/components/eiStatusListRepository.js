define(["require", "exports", "../lib/repositories/CustomListRepository", "../lib/constants"], function (require, exports, CustomListRepository_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eiStatusListRepository = void 0;
    var eiStatusMap = {
        CANCELLED: "val_4916_4346104_145",
        REQUEST_COMPLETED: "val_ei_status_request_completed",
        CERTIFICATION_IN_PROGRESS: "val_7382_4346104_777",
    };
    exports.eiStatusListRepository = new CustomListRepository_1.CustomListRepository(constants_1.eiStatusList, eiStatusMap);
});
