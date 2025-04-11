/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2015     mjaurigue
 *
 * @NApiVersion 2.1
 * @NScriptName Outbound E-Document Form SU
 * @NScriptId _ei_outbound_form_su
 * @NScriptType Suitelet
 */

define([
    "../../app/einvoice/app_einvoice_outbound_form_manager",
    "N/redirect",
    "../../app/einvoice/app_einvoice_outbound_post_request_adapter",
    "../../app/einvoice/app_einvoice_outbound_manager",
    "../../data/dao_einvoice_batch",
    "N/error",
    "../../lib/string_formatter",
    "N/runtime",
    "../../lib/translator",
], function (
    outboundFormManager,
    redirect,
    postRequestAdapter,
    eInvoiceOutboundManager,
    batchDao,
    error,
    stringFormatter,
    runtime,
    translator
) {
    var SCRIPT_ID = "customscript_ei_outbound_form_su";
    var DEPLOYMENT_ID = "customdeploy_ei_outbound_form_su";

    var OW_CONCURRENCY_MESSAGE =
        "You cannot perform the search with the selected criteria because e-document sending is already in progress for transactions within the date range ({TRANDATE_FROM} - {TRANDATE_TO}) for subsidiary ({SUBSIDIARY}). You must change your search criteria or try again after sending this e-document.";

    var SI_CONCURRENCY_MESSAGE =
        "You cannot perform the search with the selected criteria because e-document sending is already in progress for transactions within the date range ({TRANDATE_FROM} - {TRANDATE_TO}). You must change your search criteria or try again after sending this e-document.";

    function getTranslations() {
        OW_CONCURRENCY_MESSAGE =
            translator.getString("outbound.msg.batchalreadyinprogress.ow") ||
            OW_CONCURRENCY_MESSAGE;
        SI_CONCURRENCY_MESSAGE =
            translator.getString("outbound.msg.batchalreadyinprogress.si") ||
            SI_CONCURRENCY_MESSAGE;
    }

    function onRequest(context) {
        if (context.request.method === "GET") {
            /* GET */
            var extractedParams = postRequestAdapter.extract(context.request);

            if (extractedParams.is_result_mode) {
                checkConcurrency(extractedParams);
            }

            showForm(context);
        } else {
            /* POST, send (submit)*/
            var managerParams = postRequestAdapter.extract(context.request);

            eInvoiceOutboundManager.create(managerParams);

            var redirectParams = {
                scriptId: SCRIPT_ID,
                deploymentId: DEPLOYMENT_ID,
                parameters: { ongoing: "T" },
            };

            redirect.toSuitelet(redirectParams);
        }
    }

    function checkConcurrency(extractedParams) {
        var existingBatchIds = batchDao.getExistingBatch(extractedParams);
        if (existingBatchIds.length > 0) {
            var message;
            var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
            var batchObj = existingBatchIds[0];
            var parameters = {
                TRANDATE_FROM: batchObj.getValue(
                    "custrecord_psg_ei_sending_batch_start_da"
                ),
                TRANDATE_TO: batchObj.getValue(
                    "custrecord_psg_ei_sending_batch_end_date"
                ),
            };
            getTranslations();
            if (isOW) {
                parameters.SUBSIDIARY = batchObj.getValue({
                    name: "name",
                    join: "custrecord_psg_ei_sending_batch_sub",
                });
                message = OW_CONCURRENCY_MESSAGE;
            } else {
                message = SI_CONCURRENCY_MESSAGE;
            }
            stringFormatter.setString(message);
            stringFormatter.replaceParameters(parameters);
            var sendingError = error.create({
                name: "EI_SENDING_IN_PROGRESS",
                message: stringFormatter.toString(),
                notifyOff: true,
            });

            log.error(sendingError.name, sendingError.message);
            throw new Error(sendingError.name + ": " + sendingError.message);
        }
    }

    function showForm(context) {
        var request = context.request;

        var form = outboundFormManager.generateForm(request);
        context.response.writePage(form.getFormObject());
    }

    return {
        onRequest: onRequest,
    };
});
