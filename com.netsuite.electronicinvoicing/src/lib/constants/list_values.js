define(["./main_constants"], function (mainConstants) {
    var CUSTOM_LISTS = mainConstants.CUSTOM_LISTS
    var listValues = {};

    listValues[CUSTOM_LISTS.TRANSACTION_RESPONSE_STATUS] = {
        READY_FOR_GENERATION: "VAL_RESPONSE_STATUS_READY_FOR_GEN",
        GENERATION_FAILED: "VAL_RESPONSE_STATUS_GEN_FAILED",
        READY_FOR_SENDING: "VAL_RESPONSE_STATUS_READY_FOR_SEND",
        SENDING_FAILED: "VAL_RESPONSE_STATUS_SEND_FAILED",
        IN_ERROR: "VAL_RESPONSE_STATUS_IN_ERROR",
        PROCESSING: "VAL_RESPONSE_STATUS_IN_PROCESS",
        NOT_SENT: "VAL_RESPONSE_STATUS_NOT_SENT",
        SENT: "VAL_RESPONSE_STATUS_SENT",
        CANCELLED: "VAL_RESPONSE_STATUS_CANCELLED",
        REQ_COMPLETED: "VAL_RESPONSE_STATUS_REQ_COMPLETED",
    };
    
    listValues[mainConstants.CUSTOM_LISTS.EDOC_STATUS_LIST] = {
        CANCELLATION_IN_PROGRESS_EDOC_STATUS:
            "val_ei_status_cancellation_in_progress",
        REJECTION_IN_PROGRESS_EDOC_STATUS:
            "val_ei_status_rejection_in_progress",
    };

    listValues[mainConstants.CUSTOM_LISTS.AUDIT_TRAIL_LIST] = {
        CANCELLATION_IN_PROGRESS_AUDIT_TRAIL_EVENT:
            "val_tranres_cancellation_in_progress",
        REJECTED_IN_PROGRESS_AUDIT_TRAIL_EVENT:
            "val_tranres_rejection_in_progress",
    };

    listValues[CUSTOM_LISTS.DIRECTION_TYPE] = {
        OUTBOUND: "VAL_DIRECTION_OUTBOUND",
    };

    return listValues;
});
