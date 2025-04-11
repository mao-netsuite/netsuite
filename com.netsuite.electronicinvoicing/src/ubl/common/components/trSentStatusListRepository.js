define(["require", "exports", "../lib/repositories/CustomListRepository"], function (require, exports, CustomListRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trSentStatusListRepository = void 0;
    var trSentStatusList = "customlist_psg_ei_sent_status";
    var sentStatusMap = {
        CANCELLED: "val_response_status_cancelled",
        IN_ERROR: "val_response_status_in_error",
        REQUEST_COMPLETED: "val_response_status_req_completed",
        PROCESSING: "val_response_status_in_process",
    };
    exports.trSentStatusListRepository = new CustomListRepository_1.CustomListRepository(trSentStatusList, sentStatusMap);
});
