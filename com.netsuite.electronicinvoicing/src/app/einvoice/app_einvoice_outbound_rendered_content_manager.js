/**
 * Contains helper logic related to rendered string content in outbound process
 *
 * Version    Date            Author           Remarks
 * 1.00       31 Mar 2020     apandey
 *
 * @NModuleScope public
 * @NApiVersion 2.x
 */

define(["N/xml", "N/error"], function (xml, error) {
    var CONTENT_FIELD_ID = "custbody_psg_ei_content";
    var ERROR_NAME_REQUIRED_PARAM_MISSING = "Required parameter is missing";
    var ERROR_MSG_NO_EDOCUMENT_CONTENT =
        "The generated E-Document content is missing.";
    var XML_EXTENSION = "xml";
    var JSON_EXTENSION = "json";

    //Accepts a transaction record and based on value of content in TBF custbody_psg_ei_content, returns the applicable file extension for the content.
    function getExtensionForEdocContentOfTxn(thisRecord) {
        var content = thisRecord.getValue({ fieldId: CONTENT_FIELD_ID });
        return getExtensionForContent(content);
    }

    //Accepts a string and returns the type of content(XML_CONTENT, JSON_CONTENT, or an empty string if content is neither xml nor json)
    function getExtensionForContent(content) {
        log.debug("Content", content);
        if (!content) {
            var errorParams = {
                name: ERROR_NAME_REQUIRED_PARAM_MISSING,
                message: ERROR_MSG_NO_EDOCUMENT_CONTENT,
                notifyOff: true,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }

        var extension = "";

        if (isXMLContent(content)) {
            extension = XML_EXTENSION;
        } else if (isJSONContent(content)) {
            extension = JSON_EXTENSION;
        }
        //if neither xml nor json, returns empty string.
        return extension;
    }

    function getLinkRichText(linkTextParams) {
        var label =
            linkTextParams.fileName ||
            linkTextParams.currRecord.type +
                "_" +
                linkTextParams.generatedDate +
                "." +
                linkTextParams.extension;

        return (
            '<a href="' +
            linkTextParams.urlVal +
            '">preview ' +
            label +
            '</a>&nbsp;&nbsp;<a href="' +
            linkTextParams.downloadUrlVal +
            '">download</a>'
        );
    }

    function isXMLContent(content) {
        var isXML;
        try {
            isXML = xml.Parser.fromString(content) ? true : false;
        } catch (e) {
            isXML = false;
        }
        return isXML;
    }

    function isJSONContent(content) {
        var isJSON;
        try {
            isJSON = JSON.parse(content) ? true : false;
        } catch (e) {
            isJSON = false;
        }
        return isJSON;
    }

    return {
        getExtensionForEdocContentOfTxn: getExtensionForEdocContentOfTxn,
        getExtensionForContent: getExtensionForContent,
        getLinkRichText: getLinkRichText,
        XML_EXTENSION: XML_EXTENSION,
        JSON_EXTENSION: JSON_EXTENSION,
    };
});
