/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Form fields for inbound bulk conversion for failed e-documents page.
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Nov 2016     esia
 *
 */

define(["N/ui/serverWidget", "../../lib/translator"], function (
    serverWidget,
    translator
) {
    var FLD_LBL_HIDDEN_COUNTRY = "country";
    var FLD_LBL_HIDDEN_HAS_LICENSE = "has license";
    var FLD_LBL_HIDDEN_HAS_LICENSE_CLIENT = "has license client";

    var CUSTOMER_FIELD_ID = "custpage_inbound_cust";
    var DATE_CREATED_FROM_FIELD_ID = "custpage_inbound_date_created_start";
    var DATE_CREATED_TO_FIELD_ID = "custpage_inbound_date_created_end";
    var VENDOR_FIELD_ID = "custpage_inbound_vendor";
    var TRAN_TYPE_FIELD_ID = "custpage_inbound_trans_type";
    var FREE_COUNTRY_FIELD_ID = "custpage_inbound_free_country";
    var HAS_LICENSE_FIELD_ID = "custpage_inbound_has_license";
    var HAS_LICENSE_CLIENT_FIELD_ID = "custpage_inbound_has_license_client";
    var ENTITY_TYPE_RADIO_GROUP = "custpage_inbound_e_type";

    var INBOUND_EDOC_FIELD_GROUP = "inbound_edoc_filter_field_group";
    var INBOUND_ENTITY_FIELD_GROUP = "inbound_entity_filter_field_group";
    var CUSTOMER_ENTITY_TYPE = "customertype";
    var VENDOR_ENTITY_TYPE = "vendortype";

    var FLD_SRC_CUSTOMER = "customer";
    var FLD_SRC_VENDOR = "vendor";
    var FLD_TRANS_TYPE_LIST = "transactiontype";
    var ENTITY_TYPE_INLINE_HELP = "custpage_e_help";

    function getFieldGroups() {
        var INBOUND_EDOC_FIELD_GROUP_NAME = translator.getString(
            "inbound.inboundedocfieldgroup"
        );
        var INBOUND_ENTITY_FIELD_GROUP_NAME = translator.getString(
            "inbound.entityfieldgroup"
        );
        var formFieldGroups = [];

        var entityfieldGroup = {};
        entityfieldGroup.id = INBOUND_ENTITY_FIELD_GROUP;
        entityfieldGroup.label = INBOUND_ENTITY_FIELD_GROUP_NAME;
        formFieldGroups.push(entityfieldGroup);

        var inboundEdocfieldGroup = {};
        inboundEdocfieldGroup.id = INBOUND_EDOC_FIELD_GROUP;
        inboundEdocfieldGroup.label = INBOUND_EDOC_FIELD_GROUP_NAME;
        formFieldGroups.push(inboundEdocfieldGroup);

        return formFieldGroups;
    }

    function getFilterFields(parameters) {
        var FLD_LBL_DATE_CREATED_FROM =
            translator.getString("inbound.datefrom");
        var FLD_LBL_DATE_CREATED_TO = translator.getString("inbound.dateto");
        var FLD_LBL_VENDOR = translator.getString("inbound.vendor");
        var FLD_LBL_CUST = translator.getString("inbound.customer");
        var FLD_LBL_TRANS_TYPE = translator.getString(
            "inbound.transactiontype"
        );
        var DATE_CREATED_FROM_HELP = translator.getString(
            "inbound.datefromhelp"
        );
        var DATE_CREATED_TO_HELP = translator.getString("inbound.datetohelp");
        var VENDOR_HELP = translator.getString("inbound.vendorhelp");
        var CUSTOMER_HELP = translator.getString("inbound.custhelp");
        var TRANS_TYPE_HELP = translator.getString(
            "inbound.transactiontypehelp"
        );
        var ENTITY_TYPE_INLINE_HELP_NAME = translator.getString(
            "inbound.entitytypeinlinehelp"
        );
        var ENTITY_TYPE_HELP = translator.getString("inbound.entitytypehelp");

        var formFields = [];

        /* ENTITY FIELD GROUP /*

        /* Help for entity search selection */
        var entitySelectionHelpField = {};
        entitySelectionHelpField.label = ENTITY_TYPE_INLINE_HELP_NAME;
        entitySelectionHelpField.id = ENTITY_TYPE_INLINE_HELP;
        entitySelectionHelpField.type = serverWidget.FieldType.HELP;
        entitySelectionHelpField.displayType =
            serverWidget.FieldDisplayType.NORMAL;
        entitySelectionHelpField.container = INBOUND_ENTITY_FIELD_GROUP;
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
        customerRadioField.container = INBOUND_ENTITY_FIELD_GROUP;
        if (parameters[ENTITY_TYPE_RADIO_GROUP] === CUSTOMER_ENTITY_TYPE) {
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
        vendorRadioField.container = INBOUND_ENTITY_FIELD_GROUP;
        if (
            !parameters[ENTITY_TYPE_RADIO_GROUP] ||
            parameters[ENTITY_TYPE_RADIO_GROUP] === VENDOR_ENTITY_TYPE
        ) {
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
        customerField.container = INBOUND_ENTITY_FIELD_GROUP;
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
        vendorField.container = INBOUND_ENTITY_FIELD_GROUP;
        formFields.push(vendorField);

        /* INBOUND E-DOCUMENT FIELD GROUP */
        // Date Created From
        var dateCreatedFromField = {};
        dateCreatedFromField.label = FLD_LBL_DATE_CREATED_FROM;
        dateCreatedFromField.id = DATE_CREATED_FROM_FIELD_ID;
        dateCreatedFromField.defaultValue =
            parameters[DATE_CREATED_FROM_FIELD_ID];
        dateCreatedFromField.type = serverWidget.FieldType.DATE;
        dateCreatedFromField.help = createHelp(DATE_CREATED_FROM_HELP);
        dateCreatedFromField.isMandatory = true;
        dateCreatedFromField.displayType = serverWidget.FieldDisplayType.NORMAL;
        dateCreatedFromField.container = INBOUND_EDOC_FIELD_GROUP;
        formFields.push(dateCreatedFromField);

        // /* Transaction Type (Original) */
        var origTranTypeFieldInb = {};
        origTranTypeFieldInb.label = "Orig Transaction Type Inb";
        origTranTypeFieldInb.id = "custpage_orig_trantype";
        origTranTypeFieldInb.type = serverWidget.FieldType.MULTISELECT;
        origTranTypeFieldInb.source = FLD_TRANS_TYPE_LIST;
        origTranTypeFieldInb.displayType = serverWidget.FieldDisplayType.HIDDEN;
        origTranTypeFieldInb.container = INBOUND_EDOC_FIELD_GROUP;
        formFields.push(origTranTypeFieldInb);

        /* Transaction Type (Filtered-UI) */
        var InbTransTypeValues = parameters[TRAN_TYPE_FIELD_ID];
        var tranTypeFieldInb = {};
        tranTypeFieldInb.label = FLD_LBL_TRANS_TYPE;
        tranTypeFieldInb.id = TRAN_TYPE_FIELD_ID;
        tranTypeFieldInb.defaultValue = InbTransTypeValues
            ? InbTransTypeValues.split(",")
            : [];
        tranTypeFieldInb.type = serverWidget.FieldType.MULTISELECT;
        tranTypeFieldInb.help = createHelp(TRANS_TYPE_HELP);
        tranTypeFieldInb.displayType = serverWidget.FieldDisplayType.NORMAL;
        tranTypeFieldInb.displaySize = {
            width: 200,
            height: 3,
        };
        tranTypeFieldInb.container = INBOUND_EDOC_FIELD_GROUP;
        formFields.push(tranTypeFieldInb);

        // Date Created To
        var dateCreatedToField = {};
        dateCreatedToField.label = FLD_LBL_DATE_CREATED_TO;
        dateCreatedToField.id = DATE_CREATED_TO_FIELD_ID;
        dateCreatedToField.defaultValue = parameters[DATE_CREATED_TO_FIELD_ID];
        dateCreatedToField.type = serverWidget.FieldType.DATE;
        dateCreatedToField.help = createHelp(DATE_CREATED_TO_HELP);
        dateCreatedToField.isMandatory = true;
        dateCreatedToField.displayType = serverWidget.FieldDisplayType.NORMAL;
        dateCreatedToField.container = INBOUND_EDOC_FIELD_GROUP;
        formFields.push(dateCreatedToField);

        // Free Country
        var countryField = {};
        countryField.label = FLD_LBL_HIDDEN_COUNTRY;
        countryField.id = FREE_COUNTRY_FIELD_ID;
        countryField.defaultValue = parameters[FREE_COUNTRY_FIELD_ID];
        countryField.type = serverWidget.FieldType.TEXT;
        countryField.displayType = serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(countryField);

        // Has License
        var hasLicenseField = {};
        hasLicenseField.label = FLD_LBL_HIDDEN_HAS_LICENSE;
        hasLicenseField.id = HAS_LICENSE_FIELD_ID;
        hasLicenseField.defaultValue = parameters[HAS_LICENSE_FIELD_ID];
        hasLicenseField.type = serverWidget.FieldType.CHECKBOX;
        hasLicenseField.displayType = serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(hasLicenseField);

        // Has License Client
        var hasLicenseClientField = {};
        hasLicenseClientField.label = FLD_LBL_HIDDEN_HAS_LICENSE_CLIENT;
        hasLicenseClientField.id = HAS_LICENSE_CLIENT_FIELD_ID;
        hasLicenseClientField.defaultValue =
            parameters[HAS_LICENSE_CLIENT_FIELD_ID];
        hasLicenseClientField.type = serverWidget.FieldType.CHECKBOX;
        hasLicenseClientField.displayType =
            serverWidget.FieldDisplayType.HIDDEN;
        formFields.push(hasLicenseClientField);

        return formFields;
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
