/**
 * @copyright © 2023, Oracle and/or its affiliates. All rights reserved.
 *
 * @NApiVersion 2.1
 * @NModuleScope Public
 * @NScriptType UserEventScript
 */
define(["require", "exports", "../../fteShared/runtime", "N/ui/serverWidget", "../../lib/pluginSuiteTaxLib", "../../fteShared/translator/translator", "../../fteShared/const/translationKeys", "../../fteShared/dao/transactionDAO", "../../fteShared/lib/taxCustomizationLib", "../../fteShared/const/constants", "../../fteShared/lib/fieldLib"], function (require, exports, runtime_1, serverWidget_1, pluginSuiteTaxLib_1, translator_1, translationKeys_1, transactionDAO_1, taxCustomizationLib_1, constants_1, fieldLib_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBillableAndApplied = exports.shouldIgnoreLineSequence = exports.beforeLoad = exports.beforeSubmit = void 0;
    function beforeSubmit(context) {
        var lineSequence = { item: 0, expense: 0 };
        fillItemLineSequenceForSublist(context.newRecord, transactionDAO_1.BillableTimeSublistId, lineSequence);
        fillItemLineSequenceForSublist(context.newRecord, transactionDAO_1.BillableItemSublistId, lineSequence);
        fillItemLineSequenceForSublist(context.newRecord, transactionDAO_1.ItemSublistId, lineSequence);
        fillExpenseLineSequenceForSublist(context.newRecord, transactionDAO_1.BillableExpenseSublistId, lineSequence);
        fillExpenseLineSequenceForSublist(context.newRecord, transactionDAO_1.ExpenseSublistId, lineSequence);
    }
    exports.beforeSubmit = beforeSubmit;
    function beforeLoad(context) {
        if (runtime_1.Runtime.getExecutionContext() === "USERINTERFACE" /* ContextType.USER_INTERFACE */ &&
            context.type !== context.UserEventType.VIEW &&
            !isDisableTaxOverride()) {
            setupCustomFields(context);
        }
    }
    exports.beforeLoad = beforeLoad;
    function setupCustomFields(context) {
        var taxDetailsSublist = context.form.getSublist({ id: transactionDAO_1.TaxDetailsSublistId });
        taxDetailsSublist.addField({
            id: transactionDAO_1.TaxDetailsFields.CustomTaxBasis,
            type: serverWidget_1.FieldType.CURRENCY,
            label: (0, translator_1.translate)(translationKeys_1.TranslationKeys.CUSTPAGE_FTE_INST_T_CUSTOM_TAX_BASIS_LABEL)
        });
        taxDetailsSublist.addField({
            id: transactionDAO_1.TaxDetailsFields.CustomTaxRate,
            type: serverWidget_1.FieldType.PERCENT,
            label: (0, translator_1.translate)(translationKeys_1.TranslationKeys.CUSTPAGE_FTE_INST_P_CUSTOM_TAX_RATE_LABEL)
        });
        if (context.type === context.UserEventType.EDIT) {
            setCustomFieldsValues(context);
        }
    }
    function setCustomFieldsValues(context) {
        var _a, _b;
        var customData = context.newRecord.getValue({ fieldId: transactionDAO_1.TransactionCustomFields.TaxOverrideData }) || null;
        var taxDetailsCustomData = JSON.parse(customData) || {};
        if (Object.keys(taxDetailsCustomData).length > 0) {
            var taxDetailsSublistCount = context.newRecord.getLineCount({ sublistId: transactionDAO_1.TaxDetailsSublistId });
            for (var i = 0; i < taxDetailsSublistCount; i++) {
                var taxDetailsReference = context.newRecord.getSublistValue({
                    sublistId: transactionDAO_1.TaxDetailsSublistId,
                    line: i,
                    fieldId: transactionDAO_1.TaxDetailsFields.TaxDetailsReference
                });
                var lineType = context.newRecord.getSublistValue({
                    sublistId: transactionDAO_1.TaxDetailsSublistId,
                    line: i,
                    fieldId: transactionDAO_1.TaxDetailsFields.LineType
                });
                var itemLineSequence = (0, pluginSuiteTaxLib_1.getItemLineSequenceByTaxDetailsReference)(context.newRecord, taxDetailsReference, lineType);
                var taxType = context.newRecord.getSublistValue({
                    sublistId: transactionDAO_1.TaxDetailsSublistId,
                    line: i,
                    fieldId: transactionDAO_1.TaxDetailsFields.TaxType
                });
                var customDataKey = "".concat(itemLineSequence, "_").concat((0, taxCustomizationLib_1.getSublistIdByLineType)(lineType), "_").concat(taxType);
                context.newRecord.setSublistValue({
                    fieldId: transactionDAO_1.TaxDetailsFields.CustomTaxBasis,
                    sublistId: transactionDAO_1.TaxDetailsSublistId,
                    line: i,
                    value: ((_a = taxDetailsCustomData === null || taxDetailsCustomData === void 0 ? void 0 : taxDetailsCustomData[customDataKey]) === null || _a === void 0 ? void 0 : _a.taxBasis) || ""
                });
                context.newRecord.setSublistValue({
                    fieldId: transactionDAO_1.TaxDetailsFields.CustomTaxRate,
                    sublistId: transactionDAO_1.TaxDetailsSublistId,
                    line: i,
                    value: ((_b = taxDetailsCustomData === null || taxDetailsCustomData === void 0 ? void 0 : taxDetailsCustomData[customDataKey]) === null || _b === void 0 ? void 0 : _b.taxRate) || ""
                });
            }
        }
    }
    function shouldIgnoreLineSequence(itemType) {
        return ["DISCOUNT", "DESCRIPTION", "SUBTOTAL", "GROUP", "ENDGROUP", "MARKUP"].indexOf(itemType === null || itemType === void 0 ? void 0 : itemType.toUpperCase()) > -1;
    }
    exports.shouldIgnoreLineSequence = shouldIgnoreLineSequence;
    function isDisableTaxOverride() {
        return runtime_1.Runtime.getCurrentScript().getParameter({ name: constants_1.Constants.FTE_DISABLE_SUITETAX_TAX_OVERRIDE });
    }
    function isBillable(sublistId) {
        return (sublistId === transactionDAO_1.BillableItemSublistId ||
            sublistId === transactionDAO_1.BillableExpenseSublistId ||
            sublistId === transactionDAO_1.BillableTimeSublistId);
    }
    function isBillableAndApplied(newRecord, sublistId, line) {
        if (isBillable(sublistId)) {
            try {
                return newRecord.getSublistValue({
                    sublistId: sublistId,
                    fieldId: transactionDAO_1.TransactionApplySublistFields.Apply,
                    line: line
                });
            }
            catch (error) {
                return false;
            }
        }
        return false;
    }
    exports.isBillableAndApplied = isBillableAndApplied;
    function fillItemLineSequenceForSublist(newRecord, sublistId, sequence) {
        var count = newRecord.getLineCount({ sublistId: sublistId });
        for (var i = 0; i < count; i++) {
            var itemType = (0, fieldLib_1.getSublistValueIfFieldExist)(newRecord, sublistId, i, transactionDAO_1.ItemFields.ItemType);
            if (!shouldIgnoreLineSequence(itemType) &&
                (!isBillable(sublistId) || isBillableAndApplied(newRecord, sublistId, i))) {
                sequence.item++;
                newRecord.setSublistValue({
                    sublistId: sublistId,
                    fieldId: transactionDAO_1.TransactionItemFields.LineSequence,
                    value: sequence.item,
                    line: i
                });
            }
        }
    }
    function fillExpenseLineSequenceForSublist(newRecord, sublistId, sequence) {
        var count = newRecord.getLineCount({ sublistId: sublistId });
        for (var i = 0; i < count; i++) {
            if (!isBillable(sublistId) || isBillableAndApplied(newRecord, sublistId, i)) {
                sequence.expense++;
                newRecord.setSublistValue({
                    sublistId: sublistId,
                    fieldId: transactionDAO_1.TransactionItemFields.LineSequence,
                    value: sequence.expense,
                    line: i
                });
            }
        }
    }
});
