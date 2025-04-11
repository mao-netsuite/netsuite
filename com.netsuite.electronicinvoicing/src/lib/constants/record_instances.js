define(["./main_constants"], function (mainConstants) {
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var recordInstances = {};

    recordInstances[RECORD_TYPES.TRANSACTION_RESPONSE_TYPE] = {
        ACCEPTED: "VAL_ACCEPTED",
        FOR_CANCELLATION: "VAL_FOR_CANCELLATION",
        FOR_REJECTION: "VAL_FOR_REJECTION",
        REJECTED: "VAL_REJECTED",
        ACKNOWLEDGED: "VAL_ACKNOWLEDGED",
    };

    return recordInstances;
});
