/**
 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 *
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */
define([], function () {
    return Object.freeze({
        Result: {
            FAIL: 0,
            SUCCESS: 1,
        },
        TransactionResponseConstants: {
          SUCCESS: "success",
          MESSAGE: "message",
          FIELDS_FOR_UPDATE: "extraFieldsForUpdate",
          OBN_DOC_ID_SCRIPT_ID: "custrecord_psg_ei_trans_res_obn_id",
          EI_STATUS: "eiStatus",
          EVENT_TYPE: "eventType",
          EDOC_STATUS: "eDocStatus", 
        },
        ResultCodes: {
            ERR_MSG: "err_msg",
            ERR_CODE: "err_code",
            ERR_CODE_SEND_FAILED: "ERR_TR_SEND_FAILED"
        },
        ErrorCodes: {
            EI_COMP_FILE_ERROR: "EI_COMP_FILE_ERROR",
            EI_LOAD_FILE_ERROR: "EI_LOAD_FILE_ERROR",
            EI_INPUT_ERROR: "EI_INPUT_ERROR",
            EI_PARAMETER_VALIDATION: "EI_PARAMETER_VALIDATION",
            EI_MISSING_PARAMETER: "EI_MISSING_PARAMETER",
            EI_EMPTY_PARAMETER: "EI_EMPTY_PARAMETER",
            EI_TEMPLATE_ERROR: "EI_TEMPLATE_ERROR",
            EI_STATUS_VALIDATION: "EI_STATUS_VALIDATION",
            EI_AUDIT_TRAIL_EVENTS_VALIDATION:
                "EI_AUDIT_TRAIL_EVENTS_VALIDATION",
            INSERT_UPDATE_ERROR: "INSERT_UPDATE_ERROR",
            EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS:
                "EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS",
        },
        EdocAutomationMode: Object.freeze({
            DISABLED: 1,
            GCS: 2,
            GC: 3,
            CS: 4,
        }),
        EDOC_PROCESS: Object.freeze({
            GENERATION: "GENERATION",
            CERTIFICATION: "CERTIFICATION",
            SENDING: "SENDING",
        }),
    });
});
