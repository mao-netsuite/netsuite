define([], function () {
    return {
        FEATURES: {
            SUBSIDIARIES: "subsidiaries",
        },
        RECORD_TYPES: {
            INBOUND_EDOCUMENT: "customrecord_psg_ei_inbound_edoc",
            TRANSACTION_RESPONSE: "customrecord_psg_ei_trans_res",
            TRANSACTION_RESPONSE_TYPE: "customrecord_psg_ei_response_status",
            TRANSACTION_RESPONSE_TEMPLATE:
                "customrecord_psg_ei_transres_template",
            EI_SENDING_METHOD: "customrecord_ei_sending_method",
            SUBSIDIARY_PREF: "customrecord_psg_ei_sub_prefs_data",
            EDOCUMENT_TEMPLATE: "custbody_psg_ei_template",
        },
        CUSTOM_LISTS: {
            DIRECTION_TYPE: "customlist_psg_ei_direction_type",
            TRANSACTION_RESPONSE_STATUS: "customlist_psg_ei_sent_status",
            EDOC_STATUS_LIST: "customlist_psg_ei_status",
            AUDIT_TRAIL_LIST: "customlist_psg_ei_audit_trail_events",
        },
        SCRIPTS: {
            GENERATE_TRANSACTION_RESPONSE:
                "customscript_psg_ei_generate_trans_resp",
            SEND_TRANSACTION_RESPONSE: "customscript_psg_ei_send_trans_res_su",
            PREVIEW_DOWNLOAD: "customscript_ei_content_service_su",
        },
        CUSTPAGE_BUTTONS: {
            GENERATE_TRANSACTION_RESPONSE: "custpage_generate_ar_ei_button",
            SEND_TRANSACTION_RESPONSE: "custpage_send_ar_ei_button",
        },
        CORE_FIELDS: {
            INTERNAL_ID: "internalid",
            SCRIPT_ID: "scriptid",
            ID: "id",
            INACTIVE: "isinactive",
            SUBSIDIARY: "subsidiary",
            ENTITY: "entity",
            CUSTOM_STANDARD: "customstandard",
            TYPE: "type",
            TRAN_ID: "tranid",
            RECORD_TYPE: "recordType",
            APPROVAL_STATUS: "approvalstatus",
            TRANSACTION_STYLE: "transactionstyle",
        },
        SUITEAPPS: {
            EI: {
                ID: "436209",
                NAME: "Electronic Invoicing",
            },
        },
        LICENSES: {
            EI: "Electronic Invoicing",
            NSEB: "Netsuite Electronic Business",
            Avalara: "Avalara Processing For Netsuite Electronic Invoicing",
        },
        ROLE_PERMISSIONS: {
            GEN_AND_SEND_AR: "custrecord_permission_gen_and_send_ar",
        },
        TRANSLATE_TYPES: {
            MESSAGE: "message",
            TITLE: "title",
            LABEL: "label",
        },
        CUSTOM_TRANSACTION_STYLE: {
            BASIC: "BASIC",
            JOURNAL: "JOURNAL",
            PURCHASE: "PURCHASE",
            SALES: "SALES",
        },
    };
});
