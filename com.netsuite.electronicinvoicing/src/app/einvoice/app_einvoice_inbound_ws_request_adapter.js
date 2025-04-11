/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This module checks the request data and converts it into an array
 *
 * Version    Date            Author           Remarks
 * 1.00       05 Jul 2017     ssantiago
 *
 */

define([
    "N/util",
    "../../lib/string_formatter",
    "../../lib/translator",
], function (util, stringFormatter, translator) {
    var MISSING_KEY_CODE = "inbound.webservice.error.missingkeyerror";
    var INVALID_PARAM_CODE = "inbound.webservice.error.invalidparamerror";

    /**
     * Extracts the request parameters to an object
     *
     * @param {Array} The request parameters object
     * @returns resultObj Resulting object from parameters
     */
    function extract(params) {
        var resultObj = {
            resultType: "",
            resultArray: [],
        };

        var invalidRequestMessage =
            "EI_INVALID_REQUEST: " + translator.getString(INVALID_PARAM_CODE);

        if (util.isArray(params)) {
            if (params.length > 0) {
                resultObj.resultType = "Array";
                for (var i = 0; i < params.length; i++) {
                    resultObj.resultArray.push(constructInboundObj(params[i]));
                }
            } else {
                resultObj.resultType = "Object";
                resultObj.resultArray.push({
                    details: invalidRequestMessage,
                });
            }
        } else if (util.isObject(params)) {
            resultObj.resultType = "Object";
            resultObj.resultArray.push(constructInboundObj(params));
        } else {
            resultObj.resultType = "Text";
            resultObj.resultArray.push({
                details: invalidRequestMessage,
            });
        }

        return resultObj;
    }

    /**
     * Function to construct the JSON object for inbound e-document creation
     * @param {Object} JSON object
     * @returns {Object} constructed JSON object
     */
    function constructInboundObj(paramObj) {
        var resultObj = {
            identifier: "",
            fileName: "",
            content: "",
            details: "",
            tranType: "",
        };

        var missingKeys = [];
        var missingKeyString =
            "EI_INVALID_REQUEST: " + translator.getString(MISSING_KEY_CODE);
        stringFormatter.setString(missingKeyString);

        if (
            paramObj.hasOwnProperty("identifier") &&
            paramObj.identifier !== ""
        ) {
            resultObj.identifier = paramObj.identifier;
        } else {
            missingKeys.push("identifier");
        }

        if (paramObj.hasOwnProperty("fileName") && paramObj.fileName !== "") {
            resultObj.fileName = paramObj.fileName;
        } else {
            missingKeys.push("fileName");
        }

        if (paramObj.hasOwnProperty("content") && paramObj.content !== "") {
            resultObj.content = paramObj.content;
        } else {
            missingKeys.push("content");
        }
        if (paramObj.hasOwnProperty("tranType") && paramObj.tranType !== "") {
            resultObj.tranType = paramObj.tranType;
        } else {
            resultObj.tranType = "Bill";
        }

        if (missingKeys.length > 0) {
            stringFormatter.replaceParameters({
                KEYS: missingKeys.join(", "),
            });
            resultObj.details = stringFormatter.toString();
        }

        return resultObj;
    }

    return {
        extract: extract,
    };
});
