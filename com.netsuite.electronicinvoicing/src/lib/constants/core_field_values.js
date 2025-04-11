define(["./main_constants"], function (mainConstants) {
    var CORE_FIELDS = mainConstants.CORE_FIELDS;
    var coreFieldValues = {};

    coreFieldValues[
        CORE_FIELDS.APPROVAL_STATUS
    ] = {
       APPROVED: 2
    };

    coreFieldValues[CORE_FIELDS.CUSTOM_STANDARD] = {
        STANDARD: "Standard"
    }

    return coreFieldValues;
});
