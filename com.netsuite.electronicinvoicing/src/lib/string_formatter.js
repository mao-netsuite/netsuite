/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This module assembles string with parameter replacements
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 *
 * @NModuleScope TargetAccount
 */

define(["N/error"], function (error) {
    var string;

    function setString(s) {
        if (!s) {
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Parameter of method setString of String Formatter must not be null or undefined.",
            });
        }
        string = s;
    }

    function replaceParameters(parameters) {
        for (var i in parameters) {
            var re = new RegExp("\\{" + i + "\\}", "g");
            string = string.replace(re, parameters[i]);
        }
    }

    function toString() {
        return string.toString();
    }

    return {
        setString: setString,
        replaceParameters: replaceParameters,
        toString: toString,
    };
});
