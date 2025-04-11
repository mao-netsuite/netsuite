define(["./main_constants"], function (mainConstants) {
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var recordFields = {};

    recordFields[RECORD_TYPES.INBOUND_EDOCUMENT] = {
        CUSTOMER: "custrecord_psg_ei_inbound_customer",
        VENDOR: "custrecord_psg_ei_inbound_vendor",
    };

    recordFields[RECORD_TYPES.TRANSACTION_RESPONSE] = {
        RESPONSE_TYPE: "custrecord_psg_ei_trans_res_status",
        TRANSACTION_ID: "custrecord_psg_ei_trans_res_tran_id",
        TEMPLATE_SCRIPT_ID: "custrecord_psg_ei_trans_res_temp_id",
        RESPONSE_LINK: "custrecord_psg_ei_trans_res_link",
        RESPONSE_STATUS: "custrecord_psg_ei_trans_res_sent",
        AVALARA_MANDATE: "custrecord_psg_ei_trans_res_av_mandate",
        REASON: "custrecord_psg_ei_trans_res_cn_re_reason",
        INBOUND_EDOCUMENT: "custrecord_psg_ei_trans_res_inbound",
        OBN_DOC_ID: "custrecord_psg_ei_trans_res_obn_id",
        AVALARA_DOC_ID: "custrecord_psg_ei_trans_res_av_doc_id",
        RESPONSE_ISSUE_DATE: "custrecord_psg_ei_trans_res_date",
        RESPONSE_BODY: "custrecord_psg_ei_trans_res_body",
        DIRECTION: "custrecord_psg_ei_trans_res_direction",
        ERR_CODE: "custrecord_psg_ei_trans_res_err_code",
        ERR_MSG: "custrecord_psg_ei_trans_res_err_message",
        RESPONSE_CONTENT_LINK: "custrecord_psg_ei_trans_res_content",
    };

    recordFields[RECORD_TYPES.TRANSACTION_RESPONSE_TEMPLATE] = {
        TEMPLATE_MAPPING: "custrecord_psg_ei_transres_content",
        OUTBOUND_PLUGIN: "custrecord_psg_ei_transres_outplug",
        TRANSACTION_TYPE: "custrecord_psg_ei_transres_trans_type",
        SUBSIDIARY: "custrecord_psg_ei_transres_subsidiary",
    };
    
    recordFields[RECORD_TYPES.EDOCUMENT_TEMPLATE] = {
        IS_AVALARA: "custrecord_psg_ei_is_avalara_template",
    };

    recordFields[RECORD_TYPES.EI_SENDING_METHOD] = {
        IMPLEMENTATION_REC: "custrecord_ei_sending_plugin_impl",
        CHANNEL_REC: "custrecord_ei_sending_method_channel",
        SCRIPT_ID: "custrecord_ei_sending_method_script",
    };

    recordFields[RECORD_TYPES.SUBSIDIARY_PREF] = {
        TR_SUPPORT: "custrecord_psg_ei_supp_trans_res",
        TR_SEND_METH: "custrecord_psg_ei_send_meth_trans_res",
        SENDER: "custrecord_psg_ei_sub_sender",
    };

    return recordFields;
});
