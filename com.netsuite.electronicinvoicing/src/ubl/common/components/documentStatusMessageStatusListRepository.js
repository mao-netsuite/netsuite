define(["require", "exports", "../lib/repositories/CustomListRepository"], function (require, exports, CustomListRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.documentStatusMessageStatusListRepository = void 0;
    var DSStatusCustomListName = "customlist_nseb_out_stsmsg_proc_sts";
    var DSStatusMap = {
        PROCESSED: "val_nseb_out_stsmsg_processed",
        PENDING: "val_nseb_out_stsmsg_pending",
        FAILED: "val_nseb_out_stsmsg_failed",
        IGNORED: "val_nseb_out_stsmsg_ignored"
    };
    exports.documentStatusMessageStatusListRepository = new CustomListRepository_1.CustomListRepository(DSStatusCustomListName, DSStatusMap);
});
