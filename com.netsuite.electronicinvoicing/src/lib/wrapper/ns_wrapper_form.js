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

define(["N/ui/serverWidget", "./ns_wrapper_sublist"], function (
    serverWidget,
    sublistWrapper
) {
    var nsForm;

    function createForm(obj) {
        nsForm = serverWidget.createForm(obj);
    }

    function addSubmitButton(obj, disabled) {
        var button = nsForm.addSubmitButton(obj);
        button.isDisabled = disabled;
    }

    function getFormObject() {
        return nsForm;
    }

    function addClientScriptFileId(id) {
        nsForm.clientScriptFileId = id;
    }

    function clientScriptModulePath(clientScript) {
        nsForm.clientScriptModulePath = clientScript;
    }

    function addFieldGroup(obj) {
        var fieldGroup = nsForm.addFieldGroup(obj);
        if (obj.isSingleColumn) {
            fieldGroup.isSingleColumn = obj.isSingleColumn;
        }

        if (obj.isBorderHidden) {
            fieldGroup.isBorderHidden = obj.isBorderHidden;
        }
    }

    function addField(obj) {
        var field = nsForm.addField(obj);
        if (obj.help) {
            field.setHelpText(obj.help);
        }

        if (obj.defaultValue) {
            field.defaultValue = obj.defaultValue;
        }

        if (obj.isMandatory) {
            field.isMandatory = obj.isMandatory;
        }

        if (obj.displayType) {
            field.updateDisplayType({ displayType: obj.displayType });
        }

        if (obj.displaySize) {
            field.updateDisplaySize(obj.displaySize);
        }

        if (obj.updateBreakType) {
            field.updateBreakType({ breakType: obj.updateBreakType });
        }

        return field;
    }

    function addButton(obj) {
        nsForm.addButton(obj);
    }

    function addSubList(subListModel) {
        var subList = nsForm.addSublist(subListModel);
        return sublistWrapper.wrap(subList);
    }

    function addPageLink(obj) {
        nsForm.addPageLink(obj);
    }

    return {
        createForm: createForm,
        addSubmitButton: addSubmitButton,
        getFormObject: getFormObject,
        addFieldGroup: addFieldGroup,
        addField: addField,
        addButton: addButton,
        addSubList: addSubList,
        addClientScriptFileId: addClientScriptFileId,
        clientScriptModulePath: clientScriptModulePath,
        addPageLink: addPageLink,
    };
});
