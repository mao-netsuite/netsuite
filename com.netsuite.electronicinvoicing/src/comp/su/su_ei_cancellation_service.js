/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Service call for cancelling inbound e-documents.
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Sep 2016     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType suitelet
 */

define([
    "N/runtime",
    "../../app/einvoice/app_einvoice_inbound_edocument_manager",
], function (runtime, inboundManager) {
    var DEFAULT_ERROR_CODE = "inboundedocument.cancel.defaulterror";
    var CANCEL_COMPLETE_CODE = "inboundedocument.cancel.complete";

    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var result = {
            success: true,
            message: "",
            data: {},
        };

        var bundleId = runtime.getCurrentScript().bundleIds[0];
        result.data.bundleId = bundleId;

        var recId = parameters.recId;
        var recType = parameters.recType;
        var cancellationResult = cancel(recId, recType);
        if (!cancellationResult.success) {
            result.success = false;
            result.message = cancellationResult.message;
            var notifDef = { code: DEFAULT_ERROR_CODE, type: "e" };
            result.data.messageCode = notifDef.code;
            result.data.messageType = notifDef.type;
        } else {
            result.data.messageCode = CANCEL_COMPLETE_CODE;
            result.data.messageType = "c";
        }

        response.write(JSON.stringify(result));
    }

    /**
     * Cancel an inbound e-document.
     *
     * @params {String} recId - the internal Id of the inbound e-document
     * @params {String} recType - the record type of the inbound e-document
     * @returns {Object} cancellation status and error message if cancellation failed
     */
    function cancel(recId, recType) {
        var currUser = runtime.getCurrentUser();
        return inboundManager.cancelEDocument(recId, recType, currUser.id);
    }

    return {
        onRequest: onRequest,
    };
});
