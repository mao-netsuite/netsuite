/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Handles window pop-up box for warning and confirmation messages
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 *
 * @NModuleScope TargetAccount
 */

define(["./string_formatter"], function (stringFormatter) {
    function showConfirmationMessage(message, parameters) {
        stringFormatter.setString(message);
        stringFormatter.replaceParameters(parameters);
        return confirm(stringFormatter.toString());
    }

    function showMessage(message, parameters) {
        stringFormatter.setString(message);
        stringFormatter.replaceParameters(parameters);
        alert(stringFormatter.toString());
    }

    return {
        showConfirmationMessage: showConfirmationMessage,
        showMessage: showMessage,
    };
});
