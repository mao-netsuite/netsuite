/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Oct 2015     mjaurigue
 *
 */

define([
    "N/ui/serverWidget",
    "N/runtime",
    "../../lib/translator",
    "N/search",
], function (serverWidget, runtime, translator, search) {
    var FLD_LBL_HIDDEN_COUNTRY = "country";
    var FLD_LBL_HIDDEN_HAS_LICENSE = "has license";
    var FLD_LBL_HIDDEN_HAS_LICENSE_CLIENT = "has license client";

    var CUSTOMER_FIELD_ID = "custpage_outbound_cust";
    var VENDOR_FIELD_ID = "custpage_outbound_vendor";
    var SUBSIDIARY_FIELD_ID = "custpage_outbound_subs";
    var TRAN_TYPE_FIELD_ID = "custpage_outbound_tran_type";
    var TRAN_DATE_FROM_FIELD_ID = "custpage_outbound_tran_date_start";
    var TRAN_DATE_TO_FIELD_ID = "custpage_outbound_tran_date_end";
    var FREE_COUNTRY_FIELD_ID = "custpage_outbound_free_country";
    var HAS_LICENSE_FIELD_ID = "custpage_outbound_has_license";
    var HAS_LICENSE_CLIENT_FIELD_ID = "custpage_outbound_has_license_client";
    var ENTITY_TYPE_RADIO_GROUP = "custpage_outbound_e_type";
    var SENDING_TYPE_RADIO_GROUP = "custpage_outbound_sending_type";

    var ENTITY_FIELD_GROUP = "entity_filter_field_group";
    var FILTERS_FIELD_GROUP = "transaction_filters_field_group";
    var CUSTOMER_ENTITY_TYPE = "customertype";
    var VENDOR_ENTITY_TYPE = "vendortype";
    var ENTITY_TYPE_INLINE_HELP = "custpage_e_help";

    var ENTITY_SEND_TYPE = "entitySend";
    var CERTIFY_SEND_TYPE = "certifySend";

    var FLD_SRC_CUSTOMER = "customer";
    var FLD_SRC_VENDOR = "vendor";
    var FLD_SRC_SUBSIDIARY = "subsidiary";
    var FLD_SRC_TRANSACTION_TYPE = "transactiontype";

    var FLD_LBL_CUST;
    var FLD_LBL_VENDOR;
    var FLD_LBL_SUB;
    var FLD_LBL_TRAN_TYPE;
    var FLD_LBL_TRAN_DATE_FROM;
    var FLD_LBL_TRAN_DATE_TO;
    var FLD_LBL_ENTITY_SEND;
    var FLD_LBL_CERTIFY_SEND;
    var SUBSIDIARY_HELP;
    var CUSTOMER_HELP;
    var VENDOR_HELP;
    var TRANTYPE_HELP;
    var TRANDATE_FROM_HELP;
    var TRANDATE_TO_HELP;
    var ENTITY_FIELD_GROUP_NAME;
    var FILTERS_FIELD_GROUP_NAME;
    var ENTITY_TYPE_INLINE_HELP_NAME;
    var ENTITY_TYPE_HELP;
    var SENDING_TYPE_HELP;

    function initTranslations() {
        FLD_LBL_CUST =
            FLD_LBL_CUST || translator.getString("outbound.customer");
        FLD_LBL_VENDOR =
            FLD_LBL_VENDOR || translator.getString("outbound.vendor");
        FLD_LBL_SUB =
            FLD_LBL_SUB || translator.getString("outbound.subsidiary");
        FLD_LBL_TRAN_TYPE =
            FLD_LBL_TRAN_TYPE || translator.getString("outbound.type");
        FLD_LBL_TRAN_DATE_FROM =
            FLD_LBL_TRAN_DATE_FROM || translator.getString("outbound.datefrom");
        FLD_LBL_TRAN_DATE_TO =
            FLD_LBL_TRAN_DATE_TO || translator.getString("outbound.dateto");
        FLD_LBL_ENTITY_SEND =
            FLD_LBL_ENTITY_SEND || translator.getString("outbound.entitySend");
        FLD_LBL_CERTIFY_SEND =
            FLD_LBL_CERTIFY_SEND ||
            translator.getString("outbound.certifySend");

        SUBSIDIARY_HELP =
            SUBSIDIARY_HELP || translator.getString("outbound.subshelp");
        CUSTOMER_HELP =
            CUSTOMER_HELP || translator.getString("outbound.custhelp");
        VENDOR_HELP =
            VENDOR_HELP || translator.getString("outbound.vendorhelp");
        TRANTYPE_HELP =
            TRANTYPE_HELP || translator.getString("outbound.typehelp");
        TRANDATE_FROM_HELP =
            TRANDATE_FROM_HELP || translator.getString("outbound.datefromhelp");
        TRANDATE_TO_HELP =
            TRANDATE_TO_HELP || translator.getString("outbound.datetohelp");
        ENTITY_FIELD_GROUP_NAME =
            ENTITY_FIELD_GROUP_NAME ||
            translator.getString("outbound.entityfieldgroup");
        FILTERS_FIELD_GROUP_NAME =
            FILTERS_FIELD_GROUP_NAME ||
            translator.getString("outbound.filtersfieldgroup");
        ENTITY_TYPE_INLINE_HELP_NAME =
            ENTITY_TYPE_INLINE_HELP_NAME ||
            translator.getString("outbound.entitytypeinlinehelp");
        ENTITY_TYPE_HELP =
            ENTITY_TYPE_HELP || translator.getString("outbound.entityTypeHelp");
        SENDING_TYPE_HELP =
            SENDING_TYPE_HELP ||
            translator.getString("outbound.sendingTypeHelp");
    }

    function getFieldGroups() {
        initTranslations();
        var formFieldGroups = [];

        var entityfieldGroup = {};
        entityfieldGroup.id = ENTITY_FIELD_GROUP;
        entityfieldGroup.label = ENTITY_FIELD_GROUP_NAME;
        formFieldGroups.push(entityfieldGroup);

        var filtersfieldGroup = {};
        filtersfieldGroup.id = FILTERS_FIELD_GROUP;
        filtersfieldGroup.label = FILTERS_FIELD_GROUP_NAME;
        formFieldGroups.push(filtersfieldGroup);

        return formFieldGroups;
    }

    function getFilterFields(parameters) {
        initTranslations();
        var formFields = [];

        /* ENTITY FIELD GROUP /*

        /* Help for entity search selection */
        var entitySelectionHelpField = {};
        entitySelectionHelpField.label = ENTITY_TYPE_INLINE_HELP_NAME;
        entitySelectionHelpField.id = ENTITY_TYPE_INLINE_HELP;
        entitySelectionHelpField.type = serverWidget.FieldType.HELP;
        entitySelectionHelpField.displayType =
            serverWidget.FieldDisplayType.NORMAL;
        entitySelectionHelpField.container = ENTITY_FIELD_GROUP;
        entitySelectionHelpField.updateBreakType =
            serverWidget.FieldBreakType.STARTCOL;
        formFields.push(entitySelectionHelpField);

        /* Customer Radio */
        var customerRadioField = {};
        customerRadioField.label = FLD_LBL_CUST;
        customerRadioField.id = ENTITY_TYPE_RADIO_GROUP;
        customerRadioField.type = serverWidget.FieldType.RADIO;
        customerRadioField.source = CUSTOMER_ENTITY_TYPE;
        customerRadioField.help = createHelp(ENTITY_TYPE_HELP);
        customerRadioField.displayType = serverWidget.FieldDisplayType.NORMAL;
        customerRadioField.container = ENTITY_FIELD_GROUP;
        if (
            !parameters[ENTITY_TYPE_RADIO_GROUP] ||
            parameters[ENTITY_TYPE_RADIO_GROUP] === CUSTOMER_ENTITY_TYPE
        ) {
            customerRadioField.defaultValue = CUSTOMER_ENTITY_TYPE;
        }
        formFields.push(customerRadioField);

        /* Vendor Radio */
        var vendorRadioField = {};
        vendorRadioField.label = FLD_LBL_VENDOR;
        vendorRadioField.id = ENTITY_TYPE_RADIO_GROUP;
        vendorRadioField.type = serverWidget.FieldType.RADIO;
        vendorRadioField.source = VENDOR_ENTITY_TYPE;
        vendorRadioField.help = createHelp(ENTITY_TYPE_HELP);
        vendorRadioField.displayType = serverWidget.FieldDisplayType.NORMAL;
        vendorRadioField.container = ENTITY_FIELD_GROUP;
        if (parameters[ENTITY_TYPE_RADIO_GROUP] === VENDOR_ENTITY_TYPE) {
            vendorRadioField.defaultValue = VENDOR_ENTITY_TYPE;
        }
        formFields.push(vendorRadioField);

        /* Customer */
        var customerField = {};
        customerField.label = FLD_LBL_CUST;
        customerField.id = CUSTOMER_FIELD_ID;
        customerField.defaultValue = parameters[CUSTOMER_FIELD_ID];
        customerField.type = serverWidget.FieldType.SELECT;
        customerField.source = FLD_SRC_CUSTOMER;
        customerField.help = createHelp(CUSTOMER_HELP);
        customerField.displayType = serverWidget.FieldDisplayType.NORMAL;
        customerField.container = ENTITY_FIELD_GROUP;
        formFields.push(customerField);

        /* Vendor */
        var vendorField = {};
        vendorField.label = FLD_LBL_VENDOR;
        vendorField.id = VENDOR_FIELD_ID;
        vendorField.defaultValue = parameters[VENDOR_FIELD_ID];
        vendorField.type = serverWidget.FieldType.SELECT;
        vendorField.source = FLD_SRC_VENDOR;
        vendorField.help = createHelp(VENDOR_HELP);
        vendorField.displayType = serverWidget.FieldDisplayType.NORMAL;
        vendorField.container = ENTITY_FIELD_GROUP;
        formFields.push(vendorField);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
        if (isOW) {
            /* Subsidiary */
            var subsidiaryField = {};
            subsidiaryField.label = FLD_LBL_SUB;
            subsidiaryField.id = SUBSIDIARY_FIELD_ID;
            subsidiaryField.defaultValue = parameters[SUBSIDIARY_FIELD_ID];
            subsidiaryField.type = serverWidget.FieldType.SELECT;
            subsidiaryField.source = FLD_SRC_SUBSIDIARY;
            subsidiaryField.help = createHelp(SUBSIDIARY_HELP);
            subsidiaryField.isMandatory = true;
            subsidiaryField.displayType = serverWidget.FieldDisplayType.NORMAL;
            subsidiaryField.container = ENTITY_FIELD_GROUP;
            formFields.push(subsidiaryField);
        }

        /* FILTERS FIELD GROUP /*

        /* Transaction Date from */
        var tranDateFromField = {};
        tranDateFromField.label = FLD_LBL_TRAN_DATE_FROM;
        tranDateFromField.id = TRAN_DATE_FROM_FIELD_ID;
        tranDateFromField.defaultValue = parameters[TRAN_DATE_FROM_FIELD_ID];
        tranDateFromField.type = serverWidget.FieldType.DATE;
        tranDateFromField.help = createHelp(TRANDATE_FROM_HELP);
        tranDateFromField.isMandatory = true;
        tranDateFromField.displayType = serverWidget.FieldDisplayType.NORMAL;
        tranDateFromField.container = FILTERS_FIELD_GROUP;
        formFields.push(tranDateFromField);

        /* Transaction Date to */
        var tranDateToField = {};
        tranDateToField.label = FLD_LBL_TRAN_DATE_TO;
        tranDateToField.id = TRAN_DATE_TO_FIELD_ID;
        tranDateToField.defaultValue = parameters[TRAN_DATE_TO_FIELD_ID];
        tranDateToField.type = serverWidget.FieldType.DATE;
        tranDateToField.help = createHelp(TRANDATE_TO_HELP);
        tranDateToField.isMandatory = true;
        tranDateToField.displayType = serverWidget.FieldDisplayType.NORMAL;
        tranDateToField.container = FILTERS_FIELD_GROUP;
        formFields.push(tranDateToField);

        /* Transaction Type (Original) */
        var origTranTypeField = {};
        origTranTypeField.label = "Orig Transaction Type";
        origTranTypeField.id = "custpage_orig_trantype";
        origTranTypeField.type = serverWidget.FieldType.MULTISELECT;
        origTranTypeField.source = FLD_SRC_TRANSACTION_TYPE;
        origTranTypeField.displayType = serverWidget.FieldDisplayType.HIDDEN;
        origTranTypeField.container = FILTERS_FIELD_GROUP;
        formFields.push(origTranTypeField);

        /* Transaction Type (Filtered-UI) */
        var transTypeValues = parameters[TRAN_TYPE_FIELD_ID];
        var tranTypeField = {};
        tranTypeField.label = FLD_LBL_TRAN_TYPE;
        tranTypeField.id = TRAN_TYPE_FIELD_ID;
        tranTypeField.defaultValue = transTypeValues
            ? transTypeValues.split(",")
            : [];
        tranTypeField.type = serverWidget.FieldType.MULTISELECT;
        tranTypeField.help = createHelp(TRANTYPE_HELP);
        tranTypeField.displayType = serverWidget.FieldDisplayType.NORMAL;
        tranTypeField.displaySize = {
            width: 400,
            height: 5,
        };
        tranTypeField.container = FILTERS_FIELD_GROUP;
        formFields.push(tranTypeField);

        var countryField = {};
        countryField.label = FLD_LBL_HIDDEN_COUNTRY;
        countryField.id = FREE_COUNTRY_FIELD_ID;
        countryField.defaultValue = parameters[FREE_COUNTRY_FIELD_ID];
        countryField.type = serverWidget.FieldType.TEXT;
        countryField.displayType = serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(countryField);

        var hasLicenseField = {};
        hasLicenseField.label = FLD_LBL_HIDDEN_HAS_LICENSE;
        hasLicenseField.id = HAS_LICENSE_FIELD_ID;
        hasLicenseField.defaultValue = parameters[HAS_LICENSE_FIELD_ID];
        hasLicenseField.type = serverWidget.FieldType.CHECKBOX;
        hasLicenseField.displayType = serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(hasLicenseField);

        var hasLicenseClientField = {};
        hasLicenseClientField.label = FLD_LBL_HIDDEN_HAS_LICENSE_CLIENT;
        hasLicenseClientField.id = HAS_LICENSE_CLIENT_FIELD_ID;
        hasLicenseClientField.defaultValue =
            parameters[HAS_LICENSE_CLIENT_FIELD_ID];
        hasLicenseClientField.type = serverWidget.FieldType.CHECKBOX;
        hasLicenseClientField.displayType =
            serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(hasLicenseClientField);

        /* Entity Send Radio */
        var entitySendRadioField = {};
        entitySendRadioField.label = FLD_LBL_ENTITY_SEND;
        entitySendRadioField.id = SENDING_TYPE_RADIO_GROUP;
        entitySendRadioField.type = serverWidget.FieldType.RADIO;
        entitySendRadioField.source = ENTITY_SEND_TYPE;
        entitySendRadioField.help = createHelp(SENDING_TYPE_HELP);
        entitySendRadioField.displayType = serverWidget.FieldDisplayType.NORMAL;
        entitySendRadioField.container = FILTERS_FIELD_GROUP;
        if (
            !parameters[SENDING_TYPE_RADIO_GROUP] ||
            parameters[SENDING_TYPE_RADIO_GROUP] === ENTITY_SEND_TYPE
        ) {
            entitySendRadioField.defaultValue = ENTITY_SEND_TYPE;
        }
        formFields.push(entitySendRadioField);

        /* Certify Send Radio */
        var certifySendRadioField = {};
        certifySendRadioField.label = FLD_LBL_CERTIFY_SEND;
        certifySendRadioField.id = SENDING_TYPE_RADIO_GROUP;
        certifySendRadioField.type = serverWidget.FieldType.RADIO;
        certifySendRadioField.source = CERTIFY_SEND_TYPE;
        certifySendRadioField.help = createHelp(SENDING_TYPE_HELP);
        certifySendRadioField.displayType =
            serverWidget.FieldDisplayType.NORMAL;
        certifySendRadioField.container = FILTERS_FIELD_GROUP;
        if (parameters[SENDING_TYPE_RADIO_GROUP] === CERTIFY_SEND_TYPE) {
            certifySendRadioField.defaultValue = CERTIFY_SEND_TYPE;
        }

        if (!checkSendCertificationEnabled()) {
            certifySendRadioField.displayType =
                serverWidget.FieldDisplayType.HIDDEN;
            entitySendRadioField.defaultValue = ENTITY_SEND_TYPE;
            entitySendRadioField.displayType =
                serverWidget.FieldDisplayType.HIDDEN;
        }

        formFields.push(certifySendRadioField);

        return formFields;
    }

    function checkSendCertificationEnabled() {
        var forCertificationSearchCheck = search.load({
            id: "customsearch_ei_sending_methods_certific",
        });

        try {
            return (
                forCertificationSearchCheck.runPaged({
                    pageSize: 10,
                }).count > 0
            );
        } catch (e) {
            if (e.name === "INSUFFICIENT_PERMISSION") {
                return false;
            } else {
                throw e;
            }
        }
    }

    function createHelp(text) {
        var helpView = {};
        helpView.help = text;

        return helpView;
    }

    return {
        getFilterFields: getFilterFields,
        getFieldGroups: getFieldGroups,
    };
});
