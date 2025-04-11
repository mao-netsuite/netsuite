/**
 * @NApiVersion 2.x
 * @NScriptType mapreducescript
 */

define([
    "N/query",
    "N/xml",
    "N/record",
    "N/url",
    "N/config",
    "N/runtime",
    "N/error",
    "../../app/einvoice/app_einvoice_inbound_edocument_manager",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_inbound_cdata_plugin_manager",
    "../../lib/app/app_transaction_type_map",
    "../../lib/utils",
    "../../data/dao_inbound_edocument",
    "../../app/einvoice/app_einvoice_nseb_inbound_converter_helper",
    "../../lib/constants/main_constants",
], function (
    query,
    xml,
    record,
    url,
    config,
    runtime,
    error,
    inboundEdocManager,
    notifier,
    customDataPluginMgr,
    transactionMap,
    utils,
    inboundEdocDAO,
    nsebInboundConverter,
    mainConstants
) {
    var NSEB_INBOUND_DOCUMENT_TYPE = "customrecord_nseb_inbound_document";
    var NSEB_INBOUND_DOCUMENT_STATUS_FLD = "custrecord_nseb_inbound_status";
    var NSEB_INBOUND_DOCUMENT_RAW_DOC_FLD = "custrecord_nseb_inbound_raw_doc";
    var NSEB_INBOUND_DOCUMENT_DOC_TYPE_FLD = "custrecord_nseb_inbound_doc_type";
    var NSEB_INBOUND_DOCUMENT_DOC_SUBTYPE_FLD =
        "custrecord_nseb_inbound_doc_sub_type";
    var NSEB_INBOUND_DOCUMENT_ID_FLD = "id";
    var SCRIPT_PARAM_PLUGIN_IMPL_ID = "custscript_ei_inbound_cds";

    var NSEB_INBOUND_DOCUMENT_STATUS_LIST = "customlist_nseb_doc_status";
    var PROCESSED_STATUS_SCRIPT_ID = "val_nseb_inbound_status_processed";
    var PENDING_STATUS_SCRIPT_ID = "val_nseb_inbound_status_pending";
    var FAILED_STATUS_SCRIPT_ID = "val_nseb_inbound_status_failed";

    var EI_INBOUND_DOCUMENT_SOURCE_LIST = "customlist_psg_ei_inbound_source";
    var WEBSERVICE_SOURCE_SCRIPT_ID = "val_4893_4346104_454";

    var DOC_TYPE = "InvoiceDetailRequestUBL";
    var INVOICE_DOC_SUB_TYPE = "ubl-invoice";
    var CREDITNOTE_DOC_SUB_TYPE = "ubl-creditnote";

    var VENDOR_CREDIT_ID = 20;
    var VENDOR_BILL_ID = 17;

    var ERR_CODES = {
        PEPPOL_ELEMENT_NOT_FOUND: {
            NAME: "ERR_PEPPOL_ELEMENT_NOT_FOUND",
            MESSAGE_TRANSLATION_CODE: "peppol.element.not.found",
            MESSAGE: "The payload does not contain the PEPPOL value.",
        },
        PEPPOL_ELEMENT_NODE_NOT_FOUND: {
            NAME: "ERR_PEPPOL_ELEMENT_NODE_NOT_FOUND",
            MESSAGE_TRANSLATION_CODE: "peppol.element.node.not.found",
            MESSAGE:
                "The payload does not contain the PEPPOL element Xpath node.",
        },
        EDOCUMENT_PACKAGE_NOT_FOUND: {
            NAME: "ERR_EDOCUMENT_PACKAGE_NOT_FOUND",
            MESSAGE_TRANSLATION_CODE: "edocument.package.not.found",
            MESSAGE:
                "There is no E-Document Package associated with the vendor/customer.",
        },
        EDOCUMENT_TEMPLATE_NOT_FOUND: {
            NAME: "ERR_EDOCUMENT_TEMPLATE_NOT_FOUND",
            MESSAGE_TRANSLATION_CODE: "edocument.template.not.found",
            MESSAGE:
                "There is no E-Document Template associated with the package and transaction type.",
        },
        ENTITY_NOT_FOUND_IN_PLUGIN: {
            NAME: "ERR_ENTITY_NOT_FOUND_IN_PLUGIN",
            MESSAGE_TRANSLATION_CODE: "entity.not.found.in.plugin",
            MESSAGE:
                "Vendor/Customer Id not found in plugin result at expected path.",
        },
    };

    function getInputData() {
        log.debug(
            "mr_einvoice_nseb_inbound_converter.js: getInputData",
            "started"
        );
        return fetchNSEBInboundDocDetails();
    }

    function map(context) {
        log.debug("mr_einvoice_nseb_inbound_converter.js: map", "started");
        log.debug("map(): context", context);

        var nsebInboundDocObj = JSON.parse(context.value);
        var nsebInboundDocId = nsebInboundDocObj.id;
        var edocContent = nsebInboundDocObj.edocContent;
        var tranType = null;
        var edocTemplate = null;
        var inboundEdocId = null;
        var nsebFieldForUpdate = {};
        var isPurchaseType = false;
        var FAILED_STATUS_ID = utils.getInternalIdUsingScriptId(
            NSEB_INBOUND_DOCUMENT_STATUS_LIST,
            FAILED_STATUS_SCRIPT_ID
        );
        var entityDetails = {
            id: null,
            name: null,
            package: null,
        };

        try {
            var tranDocType = nsebInboundDocObj.docSubtype;
            tranType = fetchTranTypeUsingNSEBDocSubtype(tranDocType);
            if (transactionMap.isPurchaseTransaction(tranType)) {
                isPurchaseType = true;
            }

            if (nsebInboundDocObj.cdsPluginImpl) {
                // Custom logic using CDS PluginId
                var cdsParams = {
                    edocContent: edocContent,
                };
                var renderJson = customDataPluginMgr.runPlugin(
                    cdsParams,
                    nsebInboundDocObj.cdsPluginImpl
                );
                entityDetails.id =
                    renderJson.customDataSources[0].data.entityId;
                if (!entityDetails.id) {
                    throw error.create({
                        name: ERR_CODES.ENTITY_NOT_FOUND_IN_PLUGIN.NAME,
                        message: utils.getTranslatedContent(
                            ERR_CODES.ENTITY_NOT_FOUND_IN_PLUGIN,
                            mainConstants.TRANSLATE_TYPES.MESSAGE
                        ),
                        notifyOff: true,
                    });
                }
                entityDetails = nsebInboundConverter.fetchEntityDetails(
                    {
                        entityId: entityDetails.id,
                    },
                    isPurchaseType
                );
            } else {
                // Default logic using PEPPOL ID from constant XPATH
                var peppolId = getPeppolId(edocContent);
                log.debug("map(): Peppol Id", peppolId);

                if (!peppolId) {
                    throw error.create({
                        name: ERR_CODES.PEPPOL_ELEMENT_NOT_FOUND.NAME,
                        message: utils.getTranslatedContent(
                            ERR_CODES.PEPPOL_ELEMENT_NOT_FOUND,
                            mainConstants.TRANSLATE_TYPES.MESSAGE
                        ),
                        notifyOff: true,
                    });
                }
                entityDetails = nsebInboundConverter.fetchEntityDetails(
                    {
                        peppolId: peppolId,
                    },
                    isPurchaseType
                );
            }
            if (!entityDetails.package) {
                throw error.create({
                    name: ERR_CODES.EDOCUMENT_PACKAGE_NOT_FOUND.NAME,
                    message: utils.getTranslatedContent(
                        ERR_CODES.EDOCUMENT_PACKAGE_NOT_FOUND,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    ),
                    notifyOff: true,
                });
            }
            log.debug("map(): E-Document Package", entityDetails.package);
            edocTemplate = inboundEdocManager.getEdocTemplate(
                entityDetails.package,
                tranType,
                edocContent
            );
            log.debug("map(): E-Document Template", edocTemplate);
            if (!edocTemplate) {
                throw error.create({
                    name: ERR_CODES.EDOCUMENT_TEMPLATE_NOT_FOUND.NAME,
                    message: utils.getTranslatedContent(
                        ERR_CODES.EDOCUMENT_TEMPLATE_NOT_FOUND,
                        mainConstants.TRANSLATE_TYPES.MESSAGE
                    ),
                    notifyOff: true,
                });
            }
            var WEBSERVICE_SOURCE_ID = utils.getInternalIdUsingScriptId(
                EI_INBOUND_DOCUMENT_SOURCE_LIST,
                WEBSERVICE_SOURCE_SCRIPT_ID
            );
            var inboundEdocFileName = getFileName(
                entityDetails.name,
                nsebInboundDocId
            );
            //Inbound E-document creation
            var inboundParams = {
                name: inboundEdocFileName,
                content: edocContent,
                source: WEBSERVICE_SOURCE_ID,
                transtype: tranType,
                template: edocTemplate,
            };
            if (isPurchaseType) {
                inboundParams.vendor = entityDetails.id;
            }
            inboundEdocId = inboundEdocDAO.create(inboundParams, null, {
                enableSourcing: true,
                ignoreMandatoryFields: true,
            });
            if (inboundEdocId) {
                var PROCESSED_STATUS_ID = utils.getInternalIdUsingScriptId(
                    NSEB_INBOUND_DOCUMENT_STATUS_LIST,
                    PROCESSED_STATUS_SCRIPT_ID
                );
                nsebFieldForUpdate[NSEB_INBOUND_DOCUMENT_STATUS_FLD] =
                    PROCESSED_STATUS_ID;
            }
        } catch (err) {
            log.error("map(): error", err);
            nsebFieldForUpdate[NSEB_INBOUND_DOCUMENT_STATUS_FLD] =
                FAILED_STATUS_ID;
            var owner = notifier.getFirstActiveAdmin();
            var conversionResult = getConversionResult(err, nsebInboundDocId);
            context.write(owner, conversionResult);
        }
        log.debug("map(): Inbound E-Document Id", inboundEdocId);
        record.submitFields({
            type: NSEB_INBOUND_DOCUMENT_TYPE,
            id: nsebInboundDocId,
            values: nsebFieldForUpdate,
        });
    }

    function reduce(context) {
        log.debug("mr_einvoice_nseb_inbound_converter.js: reduce", "started");
        var owner = context.key;
        var errorValues = context.values;

        if (owner && errorValues) {
            notifier.notifyNSEBinboundConversionError(owner, errorValues);
        }
        log.debug("mr_einvoice_nseb_inbound_converter.js: reduce", "ended");
    }

    function summarize(context) {
        log.debug(
            "mr_einvoice_nseb_inbound_converter.js: summarize",
            "MR Execution Completed in " + context.seconds + " seconds"
        );
    }

    /**
     * Returns required field values from nseb inbound record and plugin id if set in MR parameters
     * @returns {edocContent, docSubtype, id, cdsPluginImpl} object
     */
    function fetchNSEBInboundDocDetails() {
        log.debug(
            "mr_einvoice_nseb_inbound_converter.js: fetchNSEBInboundDocDetails",
            "started"
        );
        var data = [];
        try {
            // Reading the plugin impl set in script parameters
            var scriptObj = runtime.getCurrentScript();
            var cdsPluginImpl = scriptObj.getParameter({
                name: SCRIPT_PARAM_PLUGIN_IMPL_ID,
            });

            var nsebInboundDocQuery = query.create({
                type: NSEB_INBOUND_DOCUMENT_TYPE,
            });

            var docTypeCondition = nsebInboundDocQuery.createCondition({
                fieldId: NSEB_INBOUND_DOCUMENT_DOC_TYPE_FLD,
                operator: query.Operator.IS,
                values: DOC_TYPE,
            });
            var docSubTypeCondition = nsebInboundDocQuery.createCondition({
                fieldId: NSEB_INBOUND_DOCUMENT_DOC_SUBTYPE_FLD,
                operator: query.Operator.ANY_OF,
                values: [INVOICE_DOC_SUB_TYPE, CREDITNOTE_DOC_SUB_TYPE],
            });
            var activeCondition = nsebInboundDocQuery.createCondition({
                fieldId: "isinactive",
                operator: query.Operator.IS,
                values: false,
            });
            var statusCondition = nsebInboundDocQuery.createCondition({
                fieldId: "custrecord_nseb_inbound_status.scriptid",
                operator: query.Operator.ANY_OF,
                values: [PENDING_STATUS_SCRIPT_ID, FAILED_STATUS_SCRIPT_ID],
            });
            nsebInboundDocQuery.condition = nsebInboundDocQuery.and(
                docTypeCondition,
                docSubTypeCondition,
                statusCondition,
                activeCondition
            );

            nsebInboundDocQuery.columns = [
                nsebInboundDocQuery.createColumn({
                    fieldId: NSEB_INBOUND_DOCUMENT_RAW_DOC_FLD,
                    alias: "rawDocument",
                }),
                nsebInboundDocQuery.createColumn({
                    fieldId: NSEB_INBOUND_DOCUMENT_ID_FLD,
                    alias: "id",
                }),
                nsebInboundDocQuery.createColumn({
                    fieldId: NSEB_INBOUND_DOCUMENT_DOC_SUBTYPE_FLD,
                    alias: "docSubtype",
                }),
            ];

            var nsebInboundDocResultSet = nsebInboundDocQuery.run().iterator();
            nsebInboundDocResultSet.each(function (resultItem) {
                var result = resultItem.value.asMap();
                var edocContent = result.rawDocument;
                if (edocContent) {
                    data.push({
                        edocContent: edocContent,
                        docSubtype: result.docSubtype,
                        id: result.id,
                        cdsPluginImpl: cdsPluginImpl,
                    });
                }
                return true;
            });
        } catch (err) {
            log.error("fetchNSEBInboundDocDetails(): error", err);
        }
        log.debug(
            "mr_einvoice_nseb_inbound_converter.js: fetchNSEBInboundDocDetails",
            "ended"
        );
        return data;
    }

    /**
     * Returns transaction type based on the document subtype
     * @param tranDocType
     * @returns tranType
     */
    function fetchTranTypeUsingNSEBDocSubtype(tranDocType) {
        var tranType = null;
        switch (tranDocType) {
            case INVOICE_DOC_SUB_TYPE:
                tranType = VENDOR_BILL_ID;
                break;
            case CREDITNOTE_DOC_SUB_TYPE:
                tranType = VENDOR_CREDIT_ID;
                break;
            default:
                throw new Error("DOC_SUBTYPE_NOT_FOUND");
        }
        return tranType;
    }

    /**
     * Returns inbound edocument file name
     * @param entityName
     * @param nsebInboundDocId
     * @returns inboundEdocFileName
     */
    function getFileName(entityName, nsebInboundDocId) {
        var fileType = "xml";
        return entityName + "-" + nsebInboundDocId + "." + fileType;
    }

    /**
     * Returns conversion result for email notification
     * @param err
     * @param nsebInboundDocId
     * @returns {success, nsebInboundDocId, errorDetails, linkToNSEBDoc} object
     */
    function getConversionResult(err, nsebInboundDocId) {
        var configRecObj = config.load({
            type: config.Type.COMPANY_INFORMATION,
        });
        var companyUrl = configRecObj.getValue({
            fieldId: "appurl",
        });
        var NSEBInboundDocUrl = url.resolveRecord({
            recordType: NSEB_INBOUND_DOCUMENT_TYPE,
            recordId: nsebInboundDocId,
            isEditMode: false,
        });
        var linkToNSEBDoc = companyUrl + NSEBInboundDocUrl;

        return {
            success: false,
            nsebInboundDocId: nsebInboundDocId,
            errorDetails: err.message,
            linkToNSEBDoc: linkToNSEBDoc,
        };
    }

    /**
     * Returns Peppol Id
     * @param edocContent
     * @returns peppolId
     */
    function getPeppolId(edocContent) {
        var PEPPOL_ELEMENT_PATH =
            "//cac:AccountingSupplierParty/cac:Party/cbc:EndpointID";
        var peppolElement = null;
        var peppolId = null;
        var peppolGlnId = null;
        var peppolCountryCode = null;
        var xmlDocument = xml.Parser.fromString({
            text: edocContent,
        });
        try {
            peppolElement = xml.XPath.select({
                node: xmlDocument,
                xpath: PEPPOL_ELEMENT_PATH,
            });
            peppolGlnId = peppolElement[0].textContent;
            peppolCountryCode = peppolElement[0].attributes.schemeID.value;
        } catch (e) {
            throw error.create({
                name: ERR_CODES.PEPPOL_ELEMENT_NODE_NOT_FOUND.NAME,
                message: utils.getTranslatedContent(
                    ERR_CODES.PEPPOL_ELEMENT_NODE_NOT_FOUND,
                    mainConstants.TRANSLATE_TYPES.MESSAGE
                ),
                notifyOff: true,
            });
        }
        if(peppolGlnId && peppolCountryCode) {
            peppolId = peppolCountryCode + ":" + peppolGlnId;
        }
        return peppolId;
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize,
    };
});
