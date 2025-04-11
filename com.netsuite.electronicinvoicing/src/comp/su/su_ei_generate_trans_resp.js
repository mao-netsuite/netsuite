/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define([
    "../../app/einvoice/app_einvoice_transaction_response",
    "../../app/einvoice/app_einvoice_transaction_response_helper",
    "N/record",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_fields",
], function (transactionResp, trHelper, record, mainConstants, recordFields) {
    // Transaction Response Record Type
    var TRANSACTION_RESPONSE_REC_TYPE =
        mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE;

    // Transaction Response Record fields
    var TRANS_RESP_REC_FIELDS = recordFields[TRANSACTION_RESPONSE_REC_TYPE];

    function onRequest(context) {
        log.debug("su_ei_generate_trans_resp: onRequest(): context", context);

        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;
        log.debug("su_ei_generate_trans_resp: onRequest(): parameters", parameters);

        var avalaraMandate = null;
        var fieldsForUpdate = {};
        var transRespRec = record.load({
            type: parameters.transRespRecType,
            id: parameters.transRespId,
        });
        var trGenResult = {
            success: false,
            data: null,
            errDetails: null,
            isCreateMode: false,
            transRespId: parameters.transRespId,
        };

        log.debug("su_ei_generate_trans_resp: onRequest(): transRespRec", transRespRec);

        try {
            if (trHelper.validateTRFields(transRespRec, false)) {
                avalaraMandate = transRespRec.getValue(
                    TRANS_RESP_REC_FIELDS.AVALARA_MANDATE
                );
                var transRespContent =
                    transactionResp.getTransRespContent({
                        avalaraMandate: avalaraMandate,
                        transRespTranId: transRespRec.getValue(
                            TRANS_RESP_REC_FIELDS.TRANSACTION_ID
                        ),
                        transRespId: parameters.transRespId,
                        tranRespTemplateScriptId: transRespRec.getValue(
                            TRANS_RESP_REC_FIELDS.TEMPLATE_SCRIPT_ID
                        ),
                    });

                trGenResult.data = transRespContent;
                trGenResult.success = true;
            }
        } catch (err) {
            log.error("su_ei_generate_trans_resp: onRequest(): error", err);
            trGenResult.errDetails = err;
        }

        log.debug("su_ei_generate_trans_resp: onRequest(): trGenResult", trGenResult);

        trHelper.submitFieldsAfterGeneration(trGenResult, fieldsForUpdate, avalaraMandate);

        response.write(JSON.stringify(trGenResult.success));
    }

    return {
        onRequest: onRequest,
    };
});
