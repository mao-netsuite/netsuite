/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       25 Jan 2016     aalcabasa
 *
 * @NModuleScope TargetAccount
 */
define(["N/ui/serverWidget"], function (serverWidget) {
    function createForm(params) {
        return serverWidget.createForm(params);
    }

    return {
        createForm: createForm,
        FieldType: serverWidget.FieldType,
        SublistType: serverWidget.SublistType,
        FieldDisplayType: serverWidget.FieldDisplayType,
        FieldBreakType: serverWidget.FieldBreakType,
        SublistDisplayType: serverWidget.SublistDisplayType,
        FieldLayoutType: serverWidget.FieldLayoutType,
        FormPageLinkType: serverWidget.FormPageLinkType,
    };
});
