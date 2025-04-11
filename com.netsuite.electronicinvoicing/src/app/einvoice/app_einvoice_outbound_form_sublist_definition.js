/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       16 Oct 2015     mjaurigue
 *
 */

define(["N/ui/serverWidget", "N/runtime", "../../lib/translator"], function (
    serverWidget,
    runtime,
    translator
) {
    var SUBLIST_ID = "custpage_einvoice_outbound";

    function getSublistFields(parameters) {
        var COL_LBL_TRAN_NUM = translator.getString("outbound.sublist.trannum");
        var COL_LBL_TRAN_TYPE = translator.getString(
            "outbound.sublist.trantype"
        );
        var COL_LBL_CUST = translator.getString("outbound.sublist.customer");
        var COL_LBL_VEND = translator.getString("outbound.sublist.vendor");
        var COL_LBL_SUB = translator.getString("outbound.sublist.subsidiary");
        var COL_LBL_TRAN_DATE = translator.getString(
            "outbound.sublist.trandate"
        );
        var COL_LBL_MEMO = translator.getString("outbound.sublist.memo");
        var COL_LBL_TEMPLATE = translator.getString(
            "outbound.sublist.template"
        );
        var COL_LBL_METHOD = translator.getString(
            "outbound.sublist.sendingmethod"
        );
        var fields = [];

        var tranNumberField = {};
        tranNumberField.id = "trans_number";
        tranNumberField.label = COL_LBL_TRAN_NUM;
        tranNumberField.type = serverWidget.FieldType.TEXT;
        fields.push(tranNumberField);

        var tranTypeField = {};
        tranTypeField.id = "trans_type";
        tranTypeField.label = COL_LBL_TRAN_TYPE;
        tranTypeField.type = serverWidget.FieldType.TEXT;
        fields.push(tranTypeField);

        var entityField = {};
        entityField.id = "entity";
        entityField.type = serverWidget.FieldType.TEXT;
        if (parameters.custpage_outbound_e_type === "customertype") {
            entityField.label = COL_LBL_CUST;
        } else {
            entityField.label = COL_LBL_VEND;
        }
        fields.push(entityField);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
        if (isOW) {
            var subsidiaryField = {};
            subsidiaryField.id = "subsidiary";
            subsidiaryField.label = COL_LBL_SUB;
            subsidiaryField.type = serverWidget.FieldType.TEXT;
            fields.push(subsidiaryField);
        }

        var trandateField = {};
        trandateField.id = "transaction_date";
        trandateField.label = COL_LBL_TRAN_DATE;
        trandateField.type = serverWidget.FieldType.DATE;
        fields.push(trandateField);

        var memoField = {};
        memoField.id = "memo";
        memoField.label = COL_LBL_MEMO;
        memoField.type = serverWidget.FieldType.TEXT;
        fields.push(memoField);

        var templateField = {};
        templateField.id = "template";
        templateField.label = COL_LBL_TEMPLATE;
        templateField.type = serverWidget.FieldType.TEXT;
        fields.push(templateField);

        var channelField = {};
        channelField.id = "method";
        channelField.label = COL_LBL_METHOD;
        channelField.type = serverWidget.FieldType.TEXT;
        fields.push(channelField);

        return fields;
    }

    function getDefinitionInstance(parameters) {
        var SUBLIST_NAME = translator.getString("outbound.sublist.sublistname");

        return {
            name: SUBLIST_ID,
            label: SUBLIST_NAME,
            fields: getSublistFields(parameters),
            type: serverWidget.SublistType.STATICLIST,
        };
    }

    return {
        getDefinitionInstance: getDefinitionInstance,
    };
});
