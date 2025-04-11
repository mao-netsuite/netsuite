/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define([
    "../../app/einvoice/app_einvoice_edoc_process_manager",
    "./../../app/einvoice/app_einvoice_edoc_process_adapter.js",
], function (EdocumentProcess, ProcessAdapter) {
    function onRequest(context) {
        var transId = context.request.parameters.transId;
        var transType = context.request.parameters.transType;
        var userId = context.request.parameters.userId;
        var locale = context.request.parameters.locale;
        var certSendingMethodId =
            context.request.parameters.certSendingMethodId;
        if (certSendingMethodId === "undefined" || certSendingMethodId === "") {
            certSendingMethodId = undefined;
        }

        var processContext = {
            transId: transId,
            transType: transType,
            userId: userId,
            certSendingMethodId: certSendingMethodId,
            locale: locale,
        };

        var processAdapter = new ProcessAdapter(processContext);
        var edocProcessResponse = new EdocumentProcess(processAdapter).start();
        context.response.write(JSON.stringify(edocProcessResponse));
    }

    return {
        onRequest: onRequest,
    };
});
