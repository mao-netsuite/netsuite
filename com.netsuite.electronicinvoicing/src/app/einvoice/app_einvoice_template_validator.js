/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Responsible for validations for e-invoice templates
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 * @NModuleScope TargetAccount
 */

define([
    "N/xml",
    "N/error",
    "../../lib/translator",
], function (xml, error, translator) {
    var MESSAGEMAP;

    var INCORRECT_REGEX_CODE = "template.incorrectregex";
    var INVALID_JSON_CODE = "ei.outbound.template.invalidjson";
    var INVALID_XML_FORMAT_CODE = "template.invalidxml";

    function initializeMessageTranslationMap() {
        var messageCodes = [
            INCORRECT_REGEX_CODE,
            INVALID_JSON_CODE,
            INVALID_XML_FORMAT_CODE,
        ];

        var map = translator.getStringMap(messageCodes);

        MESSAGEMAP = {};
        MESSAGEMAP[INCORRECT_REGEX_CODE] = map[INCORRECT_REGEX_CODE];
        MESSAGEMAP[INVALID_JSON_CODE] = map[INVALID_JSON_CODE];
        MESSAGEMAP[INVALID_XML_FORMAT_CODE] = map[INVALID_XML_FORMAT_CODE];
    }

    var validationResultObj = function () {
        var validity;
        var message;

        function setValidity(v) {
            validity = v;
        }

        function isValid() {
            return validity;
        }

        function setMessage(m) {
            message = m;
        }

        function getMessage() {
            return message;
        }

        return {
            setValidity: setValidity,
            isValid: isValid,
            setMessage: setMessage,
            getMessage: getMessage,
        };
    };

    function isValidXMLFormat(xmlinput) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var validationResult = new validationResultObj();
        var isValid = true;
        var message;

        try {
            xml.Parser.fromString(xmlinput);
        } catch (e) {
            message = MESSAGEMAP[INVALID_XML_FORMAT_CODE];
            isValid = false;
        }

        validationResult.setValidity(isValid);
        validationResult.setMessage(message);

        return validationResult;
    }

    function isValidJSON(str) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var validationResult = new validationResultObj();
        var isValid = true;
        var message;

        try {
            JSON.parse(str);
        } catch (e) {
            message = MESSAGEMAP[INVALID_JSON_CODE];
            validationResult.setMessage(message);
            isValid = false;
        }
        validationResult.setValidity(isValid);
        return validationResult;
    }

    function isValidRegEx(exp) {
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        /*
         * NOTE:
         *  util.isRegExp() is not used to check the correctness of regex.
         *  util.isRegExp() accepts regex object only.
         *  We only have strings type of regex.
         * */

        var validationResult = new validationResultObj();

        var isValid = true;
        var message;

        try {
            var obj = retrieveRegExModifier(exp);
            new RegExp(obj.pattern, obj.modifier);
        } catch (e) {
            message = MESSAGEMAP[INCORRECT_REGEX_CODE];
            isValid = false;
        }

        validationResult.setValidity(isValid);
        validationResult.setMessage(message);

        return validationResult;
    }

    function retrieveRegExModifier(exp) {
        var out = {};
        var regexError = error.create({
            name: "INCORRECT_REGEX",
            message: MESSAGEMAP[INCORRECT_REGEX_CODE],
            notifyOff: true,
        });

        /* if starts with "/" */
        var front = exp[0];
        if (front != "/") {
            throw regexError;
        }

        exp = exp.substr(1);
        var rear = exp[exp.length - 1];

        /* if ends with "/" */
        if (rear == "/") {
            out.pattern = exp.substr(0, exp.length - 1);
            return out;
        }

        /* When execution reach this lines,
         * it means that the rear character of the expression is not "/" */
        /* modifier is expected */
        var modifier = exp.split("/")[exp.split("/").length - 1];
        var lastIndex = exp.lastIndexOf("/");
        var pattern = exp.substring(0, lastIndex);

        out.pattern = pattern;
        out.modifier = modifier;

        return out;
    }

    return {
        isValidXMLFormat: isValidXMLFormat,
        isValidJSON: isValidJSON,
        isValidRegEx: isValidRegEx,
    };
});
