/**
 * Copyright (c) 2019, Oracle NetSuite and/or its affiliates. All rights reserved.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 * @NScriptType plugintypeimpl
 */
define([], function () {
    /**
     *
     * @param {Object} pluginContext
     * @param {String} pluginContext.edocString
     * @param {String} pluginContext.transactionInfo.transactionId
     * @param {String} pluginContext.transactionInfo.transactionType
     *
     * @returns {Object} result
     * @returns {string} result.success
     * @returns {String} result.message
     */
    function validate(pluginContext) {
        var result = {
            success: false,
            message: "Validation failed.",
        };

        try {
            /**
             * Extract the values from pluginContext
             */

            // var edocString = pluginContext.edocString;

            // Connect to validation service and get response.

            /**
             * Use this information to fetch the transaction data
             */

            /*
             var transactionType = pluginContext.transactionInfo.transactionType;
             var transactionId = pluginContext.transactionInfo.transactionId;
             var transObj = record.load({
                    type: transactionType,
                    id: transactionId
                });
            */

            // If successful
            result.success = true;
            result.message = "Validation successful!";

            // Sample result if not successful
            // result.success = false;
            // result.message = "Validation failed.";

            return result;
        } catch (e) {
            result.success = false;
            result.message = e.message;
        }

        return result;
    }

    return {
        validate: validate,
    };
});
