/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Nov 2022     prasannanjaneyulu.ga
 *
 * @NApiVersion 2.x
 * @NScriptName E-Document Get Network Status SU
 * @NScriptId _su_get_network_status_transaction
 * @NModuleScope public
 * @NScriptType Suitelet
 */
define([
    "N/runtime",
    "../../app/einvoice/app_einvoice_network_status_manager",
    "../../app/einvoice/app_einvoice_notifier",
], function (runtime, getNetworkStatusManger, notifier) {
    var DEFAULT_ERROR_CODE = "ei.network.status.defaulterror";
    var GET_NETWORK_STATUS_CODE = "ei.network.status.msg";
    var METHOD_NOT_IMPLEMENT_CODE = "ei.network.status.method.not.implemented";

    function onRequest(context) {
        var result = {
            success: true,
            data: {},
        };
        var bundleId = runtime.getCurrentScript().bundleIds[0];
        result.data.bundleId = bundleId;
        var request = context.request;
        var parameters = request.parameters;
        var transId = parameters.transId;
        var transType = parameters.transType;
        var certSendinMethodId = parameters.certSendingMethodId;
        var userIdInReq = parameters.userId;

        var currentUserId = userIdInReq
            ? userIdInReq
            : runtime.getCurrentUser().id;
        if (currentUserId == -4) {
            currentUserId = notifier.getFirstActiveAdmin();
        }

        var errorDetails = getNetworkStatusManger.getNetworkStatus(
            transId,
            transType,
            currentUserId,
            certSendinMethodId,
            true
        );
        if (!errorDetails.success) {
            result.success = false;
            if (errorDetails.errorCode === "SSS_METHOD_NOT_IMPLEMENTED") {
                result.data.messageCode = METHOD_NOT_IMPLEMENT_CODE;
                result.data.messageType = "i";
            } else {
                result.data.messageCode = DEFAULT_ERROR_CODE;
                result.data.messageType = "e";
            }
        } else {
            result.data.messageCode = GET_NETWORK_STATUS_CODE;
            result.data.messageType = "c";
        }
        context.response.write(JSON.stringify(result));
    }

    return {
        onRequest: onRequest,
    };
});
