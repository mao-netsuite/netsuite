/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Inbound E-Document Conversion Sublist UI components.
 *
 * Version    Date            Author           Remarks
 * 1.00       10 Nov 2016     esia
 *
 */

define(["N/ui/serverWidget", "../../lib/translator"], function (
    serverwidget,
    translator
) {
    var SUBLIST_ID = "custpage_edoc_inbound";

    function getSublistFields(parameters) {
        var COL_LBL_INTERNALID = translator.getString(
            "inbound.sublist.internalid"
        );
        var COL_LBL_VENDOR = translator.getString("inbound.sublist.vendor");
        var COL_LBL_CUSTOMER = translator.getString("inbound.sublist.customer");
        var COL_LBL_REF_NUM = translator.getString("inbound.sublist.refnum");
        var COL_LBL_PO_NUM = translator.getString("inbound.sublist.ponum");
        var COL_LBL_TRANS_TYPE = translator.getString(
            "inbound.sublist.transtype"
        );
        var COL_LBL_DATECREATED = translator.getString(
            "inbound.sublist.datecreated"
        );
        var COL_LBL_EDOC_TEMPLATE = translator.getString(
            "inbound.sublist.edoctemplate"
        );
        var fields = [];

        // Internal ID
        var internalIdField = {};
        internalIdField.id = "internalid_sub";
        internalIdField.label = COL_LBL_INTERNALID;
        internalIdField.type = serverwidget.FieldType.TEXT;
        fields.push(internalIdField);

        // Date Created
        var dateCreatedField = {};
        dateCreatedField.id = "date_created_sub";
        dateCreatedField.label = COL_LBL_DATECREATED;
        dateCreatedField.type = serverwidget.FieldType.TEXT;
        fields.push(dateCreatedField);

        //Entity Field
        var entityField = {};
        entityField.id = "entity_sub";
        entityField.type = serverwidget.FieldType.TEXT;
        if (parameters.custpage_inbound_e_type === "customertype") {
            entityField.label = COL_LBL_CUSTOMER;
        } else {
            entityField.label = COL_LBL_VENDOR;
        }
        fields.push(entityField);

        //Transaction Type
        var transTypeField = {};
        transTypeField.id = "trans_type_sub";
        transTypeField.label = COL_LBL_TRANS_TYPE;
        transTypeField.type = serverwidget.FieldType.TEXT;
        fields.push(transTypeField);

        // Reference Number
        var refNumField = {};
        refNumField.id = "ref_num_sub";
        refNumField.label = COL_LBL_REF_NUM;
        refNumField.type = serverwidget.FieldType.TEXT;
        fields.push(refNumField);

        // PO Number
        var poNumField = {};
        poNumField.id = "po_num_sub";
        poNumField.label = COL_LBL_PO_NUM;
        poNumField.type = serverwidget.FieldType.TEXT;
        fields.push(poNumField);

        // E-Document Template
        var templateField = {};
        templateField.id = "edoc_template_sub";
        templateField.label = COL_LBL_EDOC_TEMPLATE;
        templateField.type = serverwidget.FieldType.TEXT;
        fields.push(templateField);

        return fields;
    }

    function getDefinitionInstance(parameters) {
        var SUBLIST_NAME = translator.getString("inbound.sublist.sublistname");

        return {
            name: SUBLIST_ID,
            label: SUBLIST_NAME,
            fields: getSublistFields(parameters),
            type: serverwidget.SublistType.STATICLIST,
        };
    }

    return {
        getDefinitionInstance: getDefinitionInstance,
    };
});
