/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 * @NModuleScope TargetAccount
 */

define(["N/xml"], function (xml) {
    /**
     * returns an xml object given a string
     *
     * @param xmlInput - an xml string
     * @returns {XML}
     *
     * */
    function parseFromString(xmlInput) {
        return xml.Parser.fromString(xmlInput);
    }

    /**
     * Returns an Array of Nodes matching the provided XPath expression.
     *
     * @param {xml.Node} options.node XML node being queried
     * @param {string} options.xpath an XPath expression
     * @returns {xml.Node[]} nodes associated with the current result
     *
     * @since 2015.2
     */
    function select(options) {
        return xml.XPath.select(options);
    }

    /**
     * Validates a supplied XML document against a supplied XML Schema (XSD Document).
     *
     * @param {xml.Document} options.xml the XML document object
     * @param {int|string} options.xsdFilePathOrId ID or path to the XSD file to validate the XML object against
     * @param {int|string} options.importFolderPathOrId (optional) ID or path to a folder in the file cabinet containing additional XSD schemas which are imported by the parent XSD provided via "xsdFilePathOrId"
     * @throws {error.SuiteScriptError} SSS_XML_DOES_NOT_CONFORM_TO_SCHEMA if XML provided is invalid with respect to the provided schema
     * @throws {error.SuiteScriptError} SSS_INVALID_XML_SCHEMA_OR_DEPENDENCY if schema is an incorrectly structured XSD, or a dependent schema could not be found
     * @returns {void}
     *
     * @since 2015.2
     */
    function validate(options) {
        return xml.validate(options);
    }

    return {
        parseFromString: parseFromString,
        select: select,
        validate: validate,
    };
});
