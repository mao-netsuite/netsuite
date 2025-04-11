define(["require", "exports", "../lib/repositories/CustomListRepository"], function (require, exports, CustomListRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eiAuditTrailEventsListRepository = void 0;
    var eiAuditTrailEventsList = "customlist_psg_ei_audit_trail_events";
    var auditTrailMap = {
        CANCELLED: "val_4917_4346104_903",
        IN_ERROR: "val_tranres_in_error",
        REQUEST_COMPLETED: "val_tranres_request_completed",
        CERTIFICATION_IN_PROGRESS: "val_7386_4346104_166",
    };
    exports.eiAuditTrailEventsListRepository = new CustomListRepository_1.CustomListRepository(eiAuditTrailEventsList, auditTrailMap);
});
