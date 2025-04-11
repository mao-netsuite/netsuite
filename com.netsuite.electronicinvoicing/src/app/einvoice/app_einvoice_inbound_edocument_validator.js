/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This validates fields in Inbound E-Document record.
 *
 * Version    Date            Author           Remarks
 * 1.00       29 Jul 2016     esia
 *
 * @NModuleScope TargetAccount
 */

define([
    "../../lib/validation_result",
    "N/xml",
    "N/error",
    "../../lib/translator",
    "../../lib/process_result",
], function (validationResultClass, xml, error, translator, processResult) {
    var CODE_INBOUND_INVALID_XML = "inboundedocument.invalidxml";
    var CODE_INBOUND_INVALID_XML_FILE = "inboundedocument.invalidxmlfile";
    var CODE_INBOUND_INVALID_PDF_FILE = "inboundedocument.invalidpdffile";

    var MSG_INVALID_XML = "msg_invalid_xml";
    var MSG_INVALID_XML_FILE = "msg_invalid_xml_file";
    var MSG_INVALID_PDF_FILE = "msg_invalid_pdf_file";

    var MESSAGEMAP;

    function initializeMessageTranslationMap() {
        var messageCodes = [
            CODE_INBOUND_INVALID_XML,
            CODE_INBOUND_INVALID_XML_FILE,
            CODE_INBOUND_INVALID_PDF_FILE,
        ];
        var map = translator.getStringMap(messageCodes);

        MESSAGEMAP = {};
        MESSAGEMAP[MSG_INVALID_XML] = map[CODE_INBOUND_INVALID_XML];
        MESSAGEMAP[MSG_INVALID_XML_FILE] = map[CODE_INBOUND_INVALID_XML_FILE];
        MESSAGEMAP[MSG_INVALID_PDF_FILE] = map[CODE_INBOUND_INVALID_PDF_FILE];
    }

    /**
     * This validates if the e-document content is a valid XML document.
     *
     * @param content e-document content
     *
     * @returns processResult validation result
     */
    function validateEDocumentContent(content) {
        log.debug(
            "app_einvoice_inbound_edocument_validator: validateEDocumentContent",
            "started"
        );
        var validationResults = [];
        validationResults.push(isValidXml(content));

        processResult.consolidateValidationResults(validationResults);
        log.debug(
            "app_einvoice_inbound_edocument_validator: validateEDocumentContent",
            "ended"
        );
        return processResult;
    }

    /**
     * This validates if the filename is valid.
     *
     * @param filename inbound e-document filename
     *
     * @returns processResult validation result
     */
    function validateFilename(filename, pdfFile) {
        var validationResults = [];
        validationResults.push(isValidFilename(filename));
        if (pdfFile) {
            validationResults.push(isValidPDF(pdfFile));
        }
        processResult.consolidateValidationResults(validationResults);
        return processResult;
    }

    /**
     * This checks the validity of the inbound e-document content.
     *
     * @param content e-document content
     *
     * @returns validationResult The validation result object
     */
    function isValidXml(content) {
        log.debug(
            "app_einvoice_inbound_edocument_validator: isValidXml",
            "started"
        );
        var isValid = true;
        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var validationResult = validationResultClass.create();

        try {
            xml.Parser.fromString(content);
        } catch (e) {
            log.error(
                "app_einvoice_inbound_edocument_validator: isValidXml: error",
                e
            );
            isValid = false;
        }

        validationResult.setValidity(isValid);
        if (!validationResult.isValid()) {
            validationResult.setMessage(MESSAGEMAP[MSG_INVALID_XML]);
        }
        log.debug(
            "app_einvoice_inbound_edocument_validator: isValidXml",
            "ended"
        );

        return validationResult;
    }

    /**
     * This checks the validity of the inbound e-document filename.
     *
     * @param filename inbound e-document filename
     *
     * @returns validationResult The validation result object
     */
    function isValidFilename(filename) {
        var isValid = true;

        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }

        var errorParams;
        if (!filename) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Inbound e-document filename is required for validation.",
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }

        var validationResult = validationResultClass.create();

        var xmlFileFormat = /.xml$/i;
        isValid = xmlFileFormat.test(filename);

        validationResult.setValidity(isValid);
        if (!validationResult.isValid()) {
            validationResult.setMessage(MESSAGEMAP[MSG_INVALID_XML_FILE]);
        }

        return validationResult;
    }

    /**
     * This checks the validity of the PDF filename.
     *
     * @param filename PDF filename
     *
     * @returns validationResult The validation result object
     */
    function isValidPDF(filename) {
        var isValid = true;

        if (!MESSAGEMAP) {
            initializeMessageTranslationMap();
        }
        var validationResult = validationResultClass.create();

        var pdfFileFormat = /.pdf$/i;
        isValid = pdfFileFormat.test(filename);

        validationResult.setValidity(isValid);
        if (!validationResult.isValid()) {
            validationResult.setMessage(MESSAGEMAP[MSG_INVALID_PDF_FILE]);
        }

        return validationResult;
    }

    return {
        validateEDocumentContent: validateEDocumentContent,
        validateFilename: validateFilename,
    };
});
