/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 */

define([], function () {
    const E_DOC_SENDER_FLD = "custrecord_psg_ei_sub_sender";
    const E_DOC_COUNTRY_FOR_FREE_USE_FLD =
        "custrecord_psg_ei_sub_edoc_free_country";
    const FILTERED_COUNTRY_FIELD = "custpage_psg_ei_sub_filtered_free_country";
    const FILTERED_EDOC_SENDER_FIELD = "custpage_psg_ei_filtered_edoc_sender";
    const SUPPORT_TR_FLD = "custrecord_psg_ei_supp_trans_res";
    const TRANS_RES_SM_FLD = "custrecord_psg_ei_send_meth_trans_res";

    function pageInit(context) {
        const currRecord = context.currentRecord;
        var supportTransRes = currRecord.getValue({
            fieldId: SUPPORT_TR_FLD,
        })
        if (!supportTransRes) {
            var sendingMethodField = currRecord.getField({
                fieldId: TRANS_RES_SM_FLD,
            });
            sendingMethodField.isDisabled = true;
        }
    }

    function fieldChanged(context) {
        const currRecord = context.currentRecord;
        const changedFieldId = context.fieldId;

        if (changedFieldId === FILTERED_COUNTRY_FIELD) {
            currRecord.setText({
                fieldId: E_DOC_COUNTRY_FOR_FREE_USE_FLD,
                text: currRecord.getValue(FILTERED_COUNTRY_FIELD),
            });
        }

        if (changedFieldId === FILTERED_EDOC_SENDER_FIELD) {
            currRecord.setValue({
                fieldId: E_DOC_SENDER_FLD,
                value: currRecord.getValue(FILTERED_EDOC_SENDER_FIELD),
            });
        }

        if (changedFieldId === SUPPORT_TR_FLD) {
            var sendingMethodField = currRecord.getField({
                fieldId: TRANS_RES_SM_FLD,
            });
            var supportTransRes = currRecord.getValue({
                fieldId: SUPPORT_TR_FLD,
            })
            if (supportTransRes) {
                sendingMethodField.isDisabled = false;
            } else {
                currRecord.setValue({
                    fieldId: TRANS_RES_SM_FLD,
                    value: "",
                });
                sendingMethodField.isDisabled = true;
            }
        }
    }

    return {
        pageInit,
        fieldChanged,
    };
});
