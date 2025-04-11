/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(["../../app/einvoice/app_einvoice_prefs_form_generator"], function (
    prefsFormGenerator
) {
    function onRequest(context) {
        if (context.request.method == "GET") {
            var form = prefsFormGenerator.getForm();
            context.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});
