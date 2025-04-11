/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       07 Oct 2015         ldimayuga
 *
 * This is the user event for the Electronic Invoicing Template Validator; used primarily for the CSV import
 *
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Template Validator UE
 * @NScriptId _ei_template_validator_ue
 * @NScriptType usereventscript
 */

define([
    "../../app/einvoice/app_einvoice_template_validator",
    "N/runtime",
    "N/error",
    "../../lib/translator",
], function (validator, runtime, error, translator) {
    function beforeSubmit(context) {
        if (!isSupportedContext()) {
            var templateValidatorContextError = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "transaction.msg.xmlvalidatorcontextunsupported"
                ),
                notifyOff: true,
            });

            throw new Error(
                templateValidatorContextError.name +
                    ": " +
                    templateValidatorContextError.message
            );
        }

        var currentRecord = context.newRecord;
        var execContext = runtime.executionContext;
        var VALIDATOR_REGEX_FIELD = "custrecord_psg_ei_temp_validator_regex";

        if (
            [context.UserEventType.CREATE, context.UserEventType.EDIT].indexOf(
                context.type
            ) !== -1 &&
            execContext !== runtime.ContextType.USER_INTERFACE
        ) {
            var regExField = currentRecord.getValue({
                fieldId: VALIDATOR_REGEX_FIELD,
            });
            var result = validator.isValidRegEx(regExField);

            if (!result.isValid()) {
                var templateValidatorError = error.create({
                    name: "EI_TEMPLATE_VALIDATOR_ERROR",
                    message: result.getMessage(),
                    notifyOff: true,
                });

                throw new Error(
                    templateValidatorError.name +
                        ": " +
                        templateValidatorError.message
                );
            }
        }
    }

    /**
     * Checks if current context does not belong to unsupported contexts
     * @returns {Boolean}
     */
    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.WEBSTORE,
            ].indexOf(runtime.executionContext) === -1
        );
    }

    return {
        beforeSubmit: beforeSubmit,
    };
});
