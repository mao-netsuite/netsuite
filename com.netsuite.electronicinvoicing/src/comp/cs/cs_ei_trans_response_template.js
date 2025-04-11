/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 */

define([], function () {
    var INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD =
        "custpage_ei_custom_data_source";
    var INJECT_CUSTOM_DATA_PLUGIN_RECORD =
        "custrecord_psg_ei_transres_outplug";
    var TRANSACTION_TYPE_IMPLEMENTATION_FLD =
        "custpage_psg_ei_template_supported_transtype";
    var TRANSACTION_TYPE_RECORD =
        "custrecord_psg_ei_transres_trans_type";

    function fieldChanged(context) {
        const currRecord = context.currentRecord;
        const changedFieldId = context.fieldId;

        if (changedFieldId === INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD) {
            currRecord.setText({
                fieldId: INJECT_CUSTOM_DATA_PLUGIN_RECORD,
                text: currRecord.getValue(INJECT_CUSTOM_DATA_PLUGIN_IMPLEMENTATION_FLD),
            });
        } else if (changedFieldId === TRANSACTION_TYPE_IMPLEMENTATION_FLD) {
            // Set supported transaction type selected to the Transaction Type field.
            currRecord.setValue({
                fieldId: TRANSACTION_TYPE_RECORD,
                value: currRecord.getValue(TRANSACTION_TYPE_IMPLEMENTATION_FLD),
            });
        }
    }

    return {
        fieldChanged,
    };
});
