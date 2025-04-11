/**
 * @NApiVersion 2.1
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define([], function () {
    function processRequestStatus(params) {
        var result = {};
        result.eiFieldsForUpdate = { eDocStatus: "1"};
        result.locFieldsForUpdate = {};
        result.processStatusSuccess = false;
        result.processStatusMessage = "";
        result.isMessageContentComplete = false;

        return result;
    }

    return {
        processRequestStatus: processRequestStatus,
    };
});
