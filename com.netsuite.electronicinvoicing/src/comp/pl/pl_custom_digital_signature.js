/**
 * Copyright (c) 2019, Oracle NetSuite and/or its affiliates. All rights reserved.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 * @NScriptType plugintypeimpl
 */

define(["N/crypto/certificate", "N/file"], function (certificate, file) {
    /**
     * @param {Object} pluginContext
     * @param {String} pluginContext.unsignedString
     * @param {String} pluginContext.subsidiaryId
     * @param {String} pluginContext.tranType
     * @param {String} pluginContext.tranId
     *
     * @returns {Object} result
     * @returns {string} result.success
     * @returns {String} result.signedString
     * @returns {String} result.message
     */

    function signDocument(pluginContext) {
        var unsignedString = pluginContext.unsignedString;

        /* Extract the other required values from pluginContext:
                        var subsidiaryId = pluginContext.subsidiaryId;
                        var tranType = pluginContext.tranType;
                        var tranId = pluginContext.tranId;
                */

        /* Sample params for N/certificate.signXml()
                    var rootTag = "RootTag";
                    var certificateId = "custcertificatesfd";
                    var algorithm = "SHA1";
                */

        var result = {
            success: true,
            signedString: unsignedString,
            message: "This is a sample implementation of Digital Signature.",
        };

        /**
         * Call services to sign the string
         */
        try {
            /*
                          var signedXML = certificate.signXml({
                              algorithm : algorithm,
                              certId : certificateId,
                              rootTag : rootTag,
                              xmlString : unsignedString
                          });
      
                          result.success  = true;
                          result.signedString = signedXML.asString();
                          result.message = "Document signed successfully";
                      */
        } catch (e) {
            result.success = false;
            result.signedString = "";
            result.message = e.message;
        }

        return result;
    }

    return {
        signDocument: signDocument,
    };
});
