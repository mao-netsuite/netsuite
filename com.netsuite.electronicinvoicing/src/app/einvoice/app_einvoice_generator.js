/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       17 Sep 2015         ldimayuga
 *
 */
define([
    "N/record",
    "N/error",
    "../../lib/wrapper/ns_wrapper_template_renderer",
    "../../data/dao_folder",
    "../../lib/translator",
    "./app_einvoice_ctt_manager",
    "../../ubl/common/components/ublService",
    "../../lib/constants/main_constants"
], function (record, error, renderer, folderDao, translator, cttManager, ublServiceModule, mainConstants) {
    var TRANSACTION = "transaction";
    var DOCUMENT_NUMBER_FLD = "tranid";
    var EI_INACTIVE_CUSTOMER_CODE = "ei.generation.inactivecustomer.generator";
    var EI_INACTIVE_VENDOR_CODE = "ei.generation.inactivevendor.generator";
    var EI_CUSTOM_DATA_SOURCE_INVALID_RESULT =
        "EI_CUSTOM_DATA_SOURCE_INVALID_RESULT";
    var OUTBOUND_PDF_DOCUMENTS_FOLDER_NAME = "Outbound PDF Documents";
    var ENTITYPATCH = "ENTITYPATCH";
    var ublSupportedCTTStyle = [mainConstants.CUSTOM_TRANSACTION_STYLE.SALES, mainConstants.CUSTOM_TRANSACTION_STYLE.PURCHASE];


    /**
     *  getContent - This function retrieves the content of the e-document generated
     *
     * @params {String} template - templateId
     * @params {Object} transactionObj - transaction object
     * @returns {String} content - string contents of the e-document
     */
    function getContent(
        templateContent,
        transactionObj,
        entityObj,
        customJson,
        locale
    ) {
        var content;
        if (!templateContent) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "E-document Template is a required parameter for generating the e-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "E-document Template is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        }
        if (!transactionObj) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Transaction Object is a required parameter for generating the e-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction Object is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        }
        if (!entityObj) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Entity Object is a required parameter for generating the e-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Entity Object is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        } else if (entityObj.getValue("isinactive")) {
            var msgCode;
            if (entityObj.type === record.Type.CUSTOMER) {
                msgCode = EI_INACTIVE_CUSTOMER_CODE;
            } else {
                msgCode = EI_INACTIVE_VENDOR_CODE;
            }
            if (locale) {
                translator.setLocale(locale);
            }
            var newError = error.create({
                name: "EI_INACTIVE_ENTITY",
                message: translator.getString(msgCode),
                notifyOff: true,
            });
            log.error(newError.name, newError.message);
            throw newError;
        }
        customJson = typeof customJson === "undefined" ? {} : customJson;
        try {
            if (JSON.stringify(customJson) !== "{}") {
                var alias =
                    customJson.customDataSources.length > 0
                        ? customJson.customDataSources[0].alias
                        : "";
                var format =
                    customJson.customDataSources.length > 0
                        ? customJson.customDataSources[0].format
                        : "";
                var data =
                    customJson.customDataSources.length > 0
                        ? customJson.customDataSources[0].data
                        : "";
                renderer.addCustomDataSource(alias, format, data);
            }
        } catch (ex) {
            throw error.create({
                name: EI_CUSTOM_DATA_SOURCE_INVALID_RESULT,
                message:
                    "The plug-in failed to return valid custom data source",
                notifyOff: true,
            });
        }
        renderer.setTemplateContents(templateContent);
        if (Object.keys(transactionObj).length) {
            renderer.addRecord(TRANSACTION, transactionObj);
        }
        if (entityObj.type !== ENTITYPATCH) {
            renderer.addRecord(entityObj.type, entityObj);
        }
        content = renderer.renderAsString();
        return content;
    }

    // PrintTemplateId is the id of the advanced pdf template selected in subsidiary
    function getPDFFileId(tranId, tranType, printTemplateId) {
        var pdfFileParams = {};
        pdfFileParams.pdfFileId = "";
        pdfFileParams.pdfGenerationError = "";
        try {
            var pdfFile;

            // Generating the pdf based on the APT selected under subsidiary for Invoice and CM transaction
            if (
                printTemplateId &&
                (tranType === record.Type.INVOICE ||
                    tranType === record.Type.CREDIT_MEMO)
            ) {
                var tranRecord = record.load({
                    type: tranType,
                    id: tranId,
                });

                var renderObj = renderer.create();

                log.debug("Adv pdf template Id", printTemplateId);
                renderObj.setTemplateById(printTemplateId);
                renderObj.addRecord("record", tranRecord);
                var documentNumber = tranRecord.getValue(DOCUMENT_NUMBER_FLD);
                pdfFile = renderObj.renderAsPdf();
                pdfFile.name = tranType + "_" + documentNumber;
            } else {
                var params = {
                    entityId: tranId,
                    printMode: renderer.getPrintMode().PDF,
                };
                pdfFile = renderer.transaction(params);
            }

            pdfFile.folder = getTransactionPDFFolder();
            pdfFileParams.pdfFileId = pdfFile.save();
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
            pdfFileParams.pdfGenerationError = e.message;
        }
        return pdfFileParams;
    }

    function getTransactionPDFFolder() {
        var folderId;
        var folderParams = { name: OUTBOUND_PDF_DOCUMENTS_FOLDER_NAME };
        var folder = folderDao.retrieveByNameAndParent(folderParams);
        if (!folder) {
            folderId = folderDao.create(folderParams);
        } else {
            folderId = folder.id;
        }
        return folderId;
    }

    function getUBLContent(transId, transType, isAvalaraTemplate) {
        var generateUBL = true;
        var transStyle = cttManager.getCTTTransStyle(transType);
        generateUBL = transStyle ? ublSupportedCTTStyle.indexOf(transStyle) !== -1 : true ;

        var ublTransactionRecord = isAvalaraTemplate && generateUBL
            ? ublServiceModule.ublService.buildUBLDefaultTransaction(
                transId,
                transType
            )
            : undefined;
        return ublTransactionRecord;
    }

    return {
        getContent: getContent,
        getPDFFileId: getPDFFileId,
        getUBLContent: getUBLContent
    };
});
