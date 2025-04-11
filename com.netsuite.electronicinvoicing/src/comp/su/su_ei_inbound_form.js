/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Page for conversion of failed inbound e-documents.
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Nov 2016     esia
 *
 * @NApiVersion 2.1
 * @NScriptType suitelet
 *
 */

define([
    "../../app/einvoice/app_einvoice_inbound_form_manager",
    "../../app/einvoice/app_einvoice_inbound_post_request_adapter",
    "../../app/einvoice/app_einvoice_inbound_manager",
    "../../data/dao_convert_batch",
    "N/redirect",
    "N/error",
    "../../lib/string_formatter",
    "../../lib/translator",
], function (
    inboundFormMgr,
    postRequestAdapter,
    inboundMgr,
    batchDao,
    redirect,
    error,
    stringFormatter,
    translator
) {
    var SCRIPT_ID = "customscript_ei_inbound_form_su";
    var DEPLOYMENT_ID = "customdeploy_ei_inbound_form_su";

    var DATE_CREATED_START_FLD = "custrecord_psg_ei_convert_batch_start_da";
    var DATE_CREATED_END_FLD = "custrecord_psg_ei_convert_batch_end_date";

    var SI_CONCURRENCY_MESSAGE =
        "You cannot perform the search with the selected criteria because the inbound e-document conversion is already in progress for the date range ({DATECREATED_FROM} - {DATECREATED_TO}). You must change your search criteria or try again after converting this e-document.";

    function getTranslations() {
        SI_CONCURRENCY_MESSAGE =
            translator.getString("inbound.msg.batchalreadyinprogress.si") ||
            SI_CONCURRENCY_MESSAGE;
    }

    function onRequest(context) {
        var extractedParams = postRequestAdapter.extract(context.request);

        if (context.request.method === "GET") {
            /* GET */
            if (extractedParams.is_result_mode) {
                checkConcurrency(extractedParams);
            }

            showForm(context);
        } else {
            /* POST, convert (submit)*/
            inboundMgr.create(extractedParams);
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
            var batchObj = existingBatchIds[0];
            var parameters = {
                DATECREATED_FROM: batchObj.getValue(DATE_CREATED_START_FLD),
                DATECREATED_TO: batchObj.getValue(DATE_CREATED_END_FLD),
            };

            getTranslations();

            message = SI_CONCURRENCY_MESSAGE;
            stringFormatter.setString(message);
            stringFormatter.replaceParameters(parameters);
            var sendingError = error.create({
                name: "EI_CONVERSION_IN_PROGRESS",
                message: stringFormatter.toString(),
                notifyOff: true,
            });

            log.error(sendingError.name, sendingError.message);
            throw new Error(sendingError.name + ": " + sendingError.message);
        }
    }

    function showForm(context) {
        var request = context.request;

        var form = inboundFormMgr.generateForm(request);
        context.response.writePage(form.getFormObject());
    }

    return {
        onRequest: onRequest,
    };
});
