/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Handles processes for E-Invoice Template validations and warning/confirmation messages
 *
 * Version    Date            Author           Remarks
 * 1.00       27 Dec 2022     lahari.lagadapati
 *
 * @NModuleScope TargetAccount
 */
define([
    "../../app/einvoice/app_einvoice_template_validator",
    "N/runtime",
    "../../lib/translator",
    "../../lib/wrapper/ns_wrapper_template_renderer",
    "N/render",
    "../../lib/validation_result",
    "N/file",
], function (
    templateValidator,
    runtime,
    translator,
    renderer,
    render,
    validationResult,
    file
) {
    var JSON_CONTENT_TYPE_TEXT = "JSON";
    var XSD_INVALID_FILE = "template.invalidxsdfile";
    var CONFIRM_POPUP = "CONFIRM";
    var ERROR = "ERROR";

    function validateServerTemplateFields(paramaters) {
        var contentValidationResult = validationResult.create();
        contentValidationResult.setValidity(true);

        var inboundXsdFilename = retrieveXSDFilename(
            paramaters.execContext,
            paramaters.inboundXsd
        );
        var outboundXsdFilename = retrieveXSDFilename(
            paramaters.execContext,
            paramaters.outboundXsd
        );

        validateXsdFile(inboundXsdFilename, contentValidationResult);
        validateXsdFile(outboundXsdFilename, contentValidationResult);
        if (
            !contentValidationResult.isValid() &&
            paramaters.execContext === runtime.ContextType.USER_INTERFACE
        ) {
            return {
                message: contentValidationResult.getMessage(),
                validity: contentValidationResult.isValid(),
                type: ERROR
            };
        }

        var templateString = paramaters.templateContent;
        var jsonValidationResult = validationResult.create();
        jsonValidationResult.setValidity(true);
        jsonValidationResult.setMessage("");

        //performs validation(confirmation) if JSON is malformed (only for UI context)
        if (paramaters.execContext === runtime.ContextType.USER_INTERFACE) {
            if (paramaters.hasOutbound === "true" || templateString !== "") {
                var contentTypeText = paramaters.contentType;
                if (contentTypeText === JSON_CONTENT_TYPE_TEXT) {
                    renderer.setTemplateContents(templateString);
                    var sampleJson = "{}";
                    renderer.addCustomDataSource(
                        "transaction",
                        render.DataSource.JSON,
                        sampleJson
                    );
                    var content;
                    try {
                        content = renderer.renderAsString();
                    } catch (e) {
                        jsonValidationResult.setMessage(e.name);
                        jsonValidationResult.setValidity(false);
                    }
                    jsonValidationResult =
                        templateValidator.isValidJSON(content);
                }
            }
        }
        return {
            message: jsonValidationResult.getMessage(),
            validity: jsonValidationResult.isValid(),
            type: CONFIRM_POPUP
        };
    }

    function retrieveXSDFilename(execContext, field) {
        if (execContext === runtime.ContextType.USER_INTERFACE) {
            return field;
        } else {
            var xsd = field;
            if (xsd) {
                var xsdFile = file.load({
                    id: xsd,
                });
                return xsdFile.name;
            }
        }
        return null;
    }

    function validateXsdFile(xsdFilename, contentValidationResult) {
        var xsdFileFormat = /.xsd$/i;
        var messageCode = [XSD_INVALID_FILE];
        var map = translator.getStringMap(messageCode);
        if (xsdFilename && !xsdFileFormat.test(xsdFilename)) {
            contentValidationResult.setValidity(false);
            contentValidationResult.setMessage(map[XSD_INVALID_FILE]);
        }
    }

    return {
        validateServerTemplateFields: validateServerTemplateFields,
    };
});
