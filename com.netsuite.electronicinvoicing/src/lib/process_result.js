/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This module is being used to consolidate multiple validation results.
 *
 * Version    Date            Author           Remarks
 * 1.00       06 Oct 2015     mjaurigue
 *
 * @NModuleScope TargetAccount
 */

define([], function () {
    var success = true;
    var consolidatedMessages;

    function isSuccessful() {
        return success;
    }

    function getMessage() {
        return consolidatedMessages;
    }

    function consolidateValidationResults(validationResults) {
        var isSuccess = true;
        var messages = [];

        for (var i = 0; i < validationResults.length; i++) {
            var result = validationResults[i];
            isSuccess = isSuccess && result.isValid();

            if (result.getMessage()) {
                messages.push(result.getMessage());
            }
        }

        success = isSuccess;
        consolidatedMessages = messages.join("\n");
    }

    return {
        consolidateValidationResults: consolidateValidationResults,
        isSuccessful: isSuccessful,
        getMessage: getMessage,
    };
});
