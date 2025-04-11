/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EI_TRANSLATION_COLLECTION = exports.EI_STATUS = exports.AUDIT_TRAIL_EVENT_TYPE = exports.TR_STATUS_LIST = exports.TRANSACTION_FIELDS = exports.NSEB_SUITEAPP_ID = exports.EI_LICENSE_CACHE_NAME = exports.NO_AVALARA_LICENSE = exports.NO_NSEB = exports.NO_LICENSE_CLIENT_CODE = exports.AVALARA_BUNDLE_KEY = exports.NSEB_BUNDLE_KEY = exports.EI_BUNDLE_KEY = exports.eiStatusList = exports.PROCESS_REQUEST_STATUS_PLUGIN_TYPE = exports.CUSTOM_RECORD_TRANSACTIONS = exports.DB_DATE_FORMAT = exports.UNSUPPORTED_ITEM_TYPE = exports.FEATURE_SUITETAX = exports.AVALARA_MANDATE_ACTIVATION_ERROR_NAME = exports.DEFAULT_TAX_SCHEME = exports.DEFAULT_UNIT_OF_MEASURE = exports.AVALARA_CUSTOM_DATA_SOURCE_ALIAS = exports.UBL_2_1_TEMPLATE_PATH_FROM_APP_GUID = exports.GENERIC_INBOUND_TEMPLATE_PATH_FROM_APP_GUID = exports.APP_GUID = void 0;
    exports.APP_GUID = "c26045f3-f0be-4a97-94c6-91be546a1431";
    exports.GENERIC_INBOUND_TEMPLATE_PATH_FROM_APP_GUID = "resources/ubl_generic_inbound_template.json";
    exports.UBL_2_1_TEMPLATE_PATH_FROM_APP_GUID = "resources/ubl_2.1_template.xml";
    exports.AVALARA_CUSTOM_DATA_SOURCE_ALIAS = "avalara_cds";
    exports.DEFAULT_UNIT_OF_MEASURE = "Units";
    exports.DEFAULT_TAX_SCHEME = "VAT";
    exports.AVALARA_MANDATE_ACTIVATION_ERROR_NAME = "AVALARA_MANDATE_ACTIVATION_ERROR";
    exports.FEATURE_SUITETAX = "tax_overhauling";
    exports.UNSUPPORTED_ITEM_TYPE = [
        "'TaxItem'",
        "'Discount'",
        "'Group'",
        "'EndGroup'",
        "'Description'",
        "'TaxGroup'"
    ];
    exports.DB_DATE_FORMAT = "YYYY-MM-DD";
    exports.CUSTOM_RECORD_TRANSACTIONS = ["customrecord_psg_ei_trans_res"];
    exports.PROCESS_REQUEST_STATUS_PLUGIN_TYPE = "customscript_ei_pl_process_doc_status";
    exports.eiStatusList = "customlist_psg_ei_status";
    exports.EI_BUNDLE_KEY = "EI";
    exports.NSEB_BUNDLE_KEY = "NSEB";
    exports.AVALARA_BUNDLE_KEY = "Avalara";
    exports.NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";
    exports.NO_NSEB = "EI_NO_NSEB";
    exports.NO_AVALARA_LICENSE = "NO_LICENSE_AVALARA";
    exports.EI_LICENSE_CACHE_NAME = "PSG_EI_LICENSE_CACHE";
    exports.NSEB_SUITEAPP_ID = "com.netsuite.nsebusiness";
    exports.TRANSACTION_FIELDS = {
        TR_RECORD_TYPE: "customrecord_psg_ei_trans_res",
        TR_STATUS: "custrecord_psg_ei_trans_res_sent",
        TR_ERROR_CODE: "custrecord_psg_ei_trans_res_err_code",
        TR_ERROR_MESSAGE: "custrecord_psg_ei_trans_res_err_message",
        TR_TRANSACTION_ID: "custrecord_psg_ei_trans_res_tran_id",
        TR_RESPONSE_TYPE: "custrecord_psg_ei_trans_res_status",
        TRANSACTION_MANDATE: "custbody_nseb_avalara_mandate",
        TRANSACTION_AVALARA_ID: "custbody_nseb_avalara_doc_id",
        EI_DOC_STATUS: "custbody_psg_ei_status",
        TR_AVALARA_ID: "custrecord_psg_ei_trans_res_av_doc_id",
        CUSTOM_RECORD_TYPE: "custrecordentry",
    };
    exports.TR_STATUS_LIST = {
        FOR_CANCELLATION: "val_for_cancellation",
        FOR_REJECTION: "val_for_rejection",
    };
    exports.AUDIT_TRAIL_EVENT_TYPE = {
        GENERATION_FAILED: "6",
        VALIDATION_FAILED: "7",
        SENT: "4",
    };
    exports.EI_STATUS = {
        READY_FOR_SENDING: "3",
        GENERATION_FAILED: "5",
        VALIDATION_FAILED: "6",
        SENT: "7",
        CERTIFICATION_IN_PROGRESS: "20",
        CERTIFICATION_DATA_ERROR: "21",
    };
    exports.EI_TRANSLATION_COLLECTION = "custcollection_ei_translations";
});
