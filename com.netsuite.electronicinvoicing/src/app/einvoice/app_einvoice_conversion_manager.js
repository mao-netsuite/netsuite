/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Functions for converting an inbound e-document to a transaction.
 *
 * Version    Date            Author           Remarks
 * 1.00       23 Aug 2016     esia
 *
 */
define([
    "./app_einvoice_converter",
    "./app_einvoice_validation_plugin_manager",
    "./app_einvoice_transaction_response",
    "../audit/app_audit_manager",
    "../../lib/app/app_transaction_type_map",
    "../../data/dao_einvoice_template",
    "N/record",
    "N/error",
    "N/search",
    "../../lib/string_formatter",
    "../../lib/translator",
    "./app_einvoice_inbound_cdata_plugin_manager",
    "N/query",
], function (
    converter,
    validationPluginManager,
    transResponse,
    auditManager,
    transactionMap,
    templateDAO,
    record,
    error,
    search,
    stringFormatter,
    translator,
    inboundCustomDataPluginMgr,
    query
) {
    var VENDOR_FLD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FLD = "custrecord_psg_ei_inbound_customer";
    var TRANS_TYPE_FLD = "custrecord_psg_ei_inbound_transtype";
    var EDOC_VENDOR_TEMPLATE_FLD = "custrecord_psg_ei_inbound_template";
    var EDOC_CUSTOMER_TEMPLATE_FLD = "custrecord_psg_ei_inbound_temp_customer";
    var STATUS_FLD = "custrecord_psg_ei_inbound_status";
    var VALIDATION_PLUGIN_FLD = "custrecord_psg_ei_inbound_plugin";
    var SOURCE_FLD = "custrecord_psg_ei_inbound_source";
    var VENDOR_STANDARD_FLD = "custrecord_psg_ei_edoc_standard_vendor";
    var CONTENT_FLD = "custrecord_psg_ei_inbound_content";

    var CONVERSION_LOG_BULK_MSG;
    var CONVERSION_LOG_MSG;
    var FAILED_CONVERSION_LOG_BULK_MSG;
    var FAILED_CONVERSION_LOG_MSG;
    var PARSING_FAILED_MSG;
    var CONVERSION_FAILED_MSG;
    var CONVERSION_STATUS_ERROR_MSG;
    var VALIDATION_FAILED_MSG;
    var PO_VALIDATION_BYPASSED_MSG;
    var PO_VALIDATION_BYPASSED_VEND_BILL_AUDIT_TRAIL;
    var DUPLICATE_SO_AUDIT_TRAIL_SINGULAR =
        "Salesorder with internal ID: {ID} has the same PO#.";
    var DUPLICATE_SO_AUDIT_TRAIL_PLURAL =
        "Salesorder with  Internal ID: {CSV_ID_LIST} have the same PO#.";
    var CDS_FAILURE_ERROR = "CUSTOM DATASOURCE PLUGIN FAILURE";
    var CDS_SUCCESS_DEFAULT_MESSAGE;

    var CONVERSION_FAILED_STATUS = 14;
    var CONVERTED_STATUS = 15;
    var CONVERTING_STATUS = 16;
    var CANCELLED_STATUS = 17;
    var INCOMPLETE_STATUS = 18;
    var REFERENCE_NUMBER_KEY = "tranid";
    var OTHER_REF_NUM_KEY = "otherrefnum";
    var CREATED_FROM_KEY = "createdfrom";

    var SALES_ORDER_ID = 31;

    function initTranslations() {
        CONVERSION_LOG_BULK_MSG =
            CONVERSION_LOG_BULK_MSG ||
            translator.getString("ei.conversion.conversionlogbulk");
        CONVERSION_LOG_MSG =
            CONVERSION_LOG_MSG ||
            translator.getString("ei.conversion.conversionlog");
        FAILED_CONVERSION_LOG_BULK_MSG =
            FAILED_CONVERSION_LOG_BULK_MSG ||
            translator.getString("ei.conversion.failedconversionlogbulk");
        FAILED_CONVERSION_LOG_MSG =
            FAILED_CONVERSION_LOG_MSG ||
            translator.getString("ei.conversion.failedconversionlog");
        PARSING_FAILED_MSG =
            PARSING_FAILED_MSG ||
            translator.getString(
                "ei.conversion.failedconversionlog.parsefailed"
            );
        CONVERSION_FAILED_MSG =
            CONVERSION_FAILED_MSG ||
            translator.getString(
                "ei.conversion.failedconversionlog.convertfailed"
            );
        CONVERSION_STATUS_ERROR_MSG =
            CONVERSION_STATUS_ERROR_MSG ||
            translator.getString(
                "ei.conversion.failedconversionlog.statusfailed"
            );
        VALIDATION_FAILED_MSG =
            VALIDATION_FAILED_MSG ||
            translator.getString(
                "ei.conversion.failedconversionlog.validationfailed"
            );
        PO_VALIDATION_BYPASSED_MSG =
            PO_VALIDATION_BYPASSED_MSG ||
            translator.getString(
                "ei.po.validation.bypassed.inbound.edocument.audit.trail"
            );
        PO_VALIDATION_BYPASSED_VEND_BILL_AUDIT_TRAIL =
            PO_VALIDATION_BYPASSED_VEND_BILL_AUDIT_TRAIL ||
            translator.getString(
                "ei_po_validation_bypassed_vendor_bill_audit_trail"
            );

        DUPLICATE_SO_AUDIT_TRAIL_SINGULAR =
            translator.getString("ei_duplicate_so_audit_trail_singular") ||
            DUPLICATE_SO_AUDIT_TRAIL_SINGULAR;

        DUPLICATE_SO_AUDIT_TRAIL_PLURAL =
            translator.getString("ei_duplicate_so_audit_trail_plural") ||
            DUPLICATE_SO_AUDIT_TRAIL_PLURAL;

        CDS_SUCCESS_DEFAULT_MESSAGE =
            translator.getString("cds.success.default.message");
    }

    /**
     * Get the inbound e-document record.
     *
     * @param {Number} recId internal id of the inbound e-document record
     * @param {String} recType inbound e-document record type
     *
     * @returns inbound e-document record
     */
    function getInboundEDocRecord(recId, recType) {
        initTranslations();
        var errorParams;
        if (!recId) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Internal Id of inbound e-document record is a required parameter for retrieving the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!recType) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Record type is a required parameter for retrieving the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        return record.load({
            type: recType,
            id: recId,
        });
    }

    /**
     * Parses Inbound E-document template content
     *
     * @params {Object} inboundEDocRec the inbound e-document record object
     * @params {Number} actionOwner id of the action owner
     * @params {boolean} isBulkProcess flag for bulk processing
     *
     * @returns parsed content or error message if failed to parse
     */
    function parseInboundEdoc(inboundEDocRec, actionOwner, isBulkProcess) {
        initTranslations();
        var parseInboundEdocResult = {
            success: true,
            message: "",
            entityType: "",
            content: {},
            duplicateSoArr: [],
        };
        var errorParams;
        if (!inboundEDocRec) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "The inbound e-document record object is a required parameter for converting the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!actionOwner) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Action owner is a required parameter for converting the inbound e-document record.",
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        var transType = inboundEDocRec.getValue(TRANS_TYPE_FLD);
        var entityId = inboundEDocRec.getValue(VENDOR_FLD);
        var entityType = record.Type.VENDOR;
        var templateId = inboundEDocRec.getValue(EDOC_VENDOR_TEMPLATE_FLD);

        if (transactionMap.isSalesTransaction(transType)) {
            entityId = inboundEDocRec.getValue(CUSTOMER_FLD);
            entityType = record.Type.CUSTOMER;
            templateId = inboundEDocRec.getValue(EDOC_CUSTOMER_TEMPLATE_FLD);
        }

        parseInboundEdocResult.entityType = entityType;
        var inboundEDocRecId = inboundEDocRec.id;
        var inboundEdocRecType = inboundEDocRec.type;
        var logParams = {
            inboundEDoc: inboundEDocRecId,
            entity: entityId,
            owner: actionOwner,
        };
        var errorDetails = "";
        var errorParameters = {};

        var status = parseInt(inboundEDocRec.getValue(STATUS_FLD), 10);
        var statusText = inboundEDocRec.getText(STATUS_FLD);
        if (
            [
                CONVERTED_STATUS,
                CONVERTING_STATUS,
                CANCELLED_STATUS,
                INCOMPLETE_STATUS,
            ].indexOf(status) === -1
        ) {
            record.submitFields({
                type: inboundEdocRecType,
                id: inboundEDocRecId,
                values: {
                    custrecord_psg_ei_inbound_status: CONVERTING_STATUS,
                },
            });
            // Start whole conversion process.
            var errorScope = "";
            var templateRec = {};
            try {
                var entityRec = record.load({
                    type: entityType,
                    id: entityId,
                });
                templateRec = templateId
                    ? templateDAO.retrieve(templateId)
                    : {};
                // Run validation plugin
                var validationPlugin = inboundEDocRec.getValue(
                    VALIDATION_PLUGIN_FLD
                );
                log.debug("validationPlugin= :: ", validationPlugin);
                if (validationPlugin) {
                    errorScope = VALIDATION_FAILED_MSG;
                    runValidationPlugin(
                        inboundEDocRec,
                        validationPlugin,
                        entityId,
                        transType,
                        templateId,
                        status,
                        statusText
                    );
                }
                // Run Inbound Custom Data Source Plugin
                var inboundCDSPluginImpl = "";
                var errorFromPlugin = "";
                if (templateId !== "" || typeof templateId !== "undefined") {
                    inboundCDSPluginImpl =
                        getTemplateInboundCDSPluginImpl(templateId);
                }
                var inboundCDSPluginResult = {};
                if (
                    inboundCDSPluginImpl !== "" &&
                    typeof inboundCDSPluginImpl !== "undefined"
                ) {
                    try {
                        var params = {
                            inboundEDocRec: inboundEDocRec,
                            templateRec: templateRec,
                            entityRec: entityRec,
                        };
                        inboundCDSPluginResult =
                            inboundCustomDataPluginMgr.runPlugin(
                                params,
                                inboundCDSPluginImpl
                            );
                        if (inboundCDSPluginResult && inboundCDSPluginResult.result) {
                            var cdsResult = inboundCDSPluginResult.result;
                            var cdsMsg = cdsResult.eiAuditTrailMsg;
                            if (!cdsResult.success) {
                                throw error.create({
                                    name: CDS_FAILURE_ERROR,
                                    message: cdsMsg || CONVERSION_FAILED_MSG,
                                    notifyOff: true,
                                });
                            } else {
                                logParams.details = cdsMsg || CDS_SUCCESS_DEFAULT_MESSAGE;
                                auditManager.logConverted(logParams);
                            }
                        }
                    } catch (ex) {
                        errorFromPlugin = ex.message;
                        log.error(ex.name, ex);
                    }
                }
                // Parse inbound e-document record using the selected template.
                if (!errorFromPlugin) {
                    var content = converter.parseInboundEDocument(
                        inboundEDocRec,
                        templateRec.fieldMapTemplate,
                        entityRec,
                        inboundCDSPluginResult
                    );
                    var contentObj = JSON.parse(content);
                    var referenceNumber = contentObj[REFERENCE_NUMBER_KEY];
                    var poNumber = contentObj[CREATED_FROM_KEY];

                    if (parseInt(transType) === SALES_ORDER_ID) {
                        referenceNumber = contentObj[OTHER_REF_NUM_KEY];
                        poNumber = contentObj[OTHER_REF_NUM_KEY];
                        parseInboundEdocResult.duplicateSoArr =
                            fetchDuplicateSO(poNumber, entityId);
                    }

                    record.submitFields({
                        type: inboundEdocRecType,
                        id: inboundEDocRecId,
                        values: {
                            custrecord_psg_ei_inbound_parsed_content: content,
                            custrecord_psg_ei_inbound_refnum: referenceNumber,
                            custrecord_psg_ei_inbound_po: poNumber,
                            custrecord_psg_ei_inbound_status: status,
                        },
                    });
                    parseInboundEdocResult.content = contentObj;
                } else {
                    throw errorFromPlugin;
                }
            } catch (e) {
                // Added for easier debugging
                log.error(e.name, e);
                if (isBulkProcess) {
                    errorDetails = FAILED_CONVERSION_LOG_BULK_MSG;
                } else {
                    errorDetails = FAILED_CONVERSION_LOG_MSG;
                }
                errorParameters = {
                    TEMPLATENAME: templateRec ? templateRec.name : "",
                    ERRORSCOPE: errorScope,
                    ERROR: e.message ? e.message : e,
                };
                stringFormatter.setString(errorDetails);
                stringFormatter.replaceParameters(errorParameters);
                errorDetails = stringFormatter.toString();
                logParams.details = errorDetails;
                if (e.name === "EI_INACTIVE_ENTITY") {
                    errorDetails = e.name + ": " + e.message;
                    record.submitFields({
                        type: inboundEdocRecType,
                        id: inboundEDocRecId,
                        values: {
                            custrecord_psg_ei_inbound_status: status,
                        },
                    });
                } else {
                    auditManager.logConversionFailed(logParams);
                    record.submitFields({
                        type: inboundEdocRecType,
                        id: inboundEDocRecId,
                        values: {
                            custrecord_psg_ei_inbound_status:
                                CONVERSION_FAILED_STATUS,
                        },
                    });
                }
                parseInboundEdocResult.success = false;
                parseInboundEdocResult.message = errorDetails;
            }
        } else {
            parseInboundEdocResult.success = false;
            errorDetails = CONVERSION_STATUS_ERROR_MSG;
            errorParameters = {
                STATUS: statusText,
            };
            stringFormatter.setString(errorDetails);
            stringFormatter.replaceParameters(errorParameters);
            parseInboundEdocResult.message = stringFormatter.toString();
            logParams.details = parseInboundEdocResult.message;
            auditManager.logConversionFailed(logParams);
        }

        return parseInboundEdocResult;
    }

    /**
     * Creates transaction using the parsed inbound e-document content
     *
     * @params {Object} inboundEDocRec the inbound e-document record object
     * @param {Object} parsedContentObj
     * @params {Number} actionOwner id of the action owner
     * @params {boolean} isBulkProcess flag for bulk processing
     *
     * @returns conversion status and error message if conversion failed
     */
    function createTransaction(
        inboundEDocRec,
        parsedContentObj,
        actionOwner,
        isBulkProcess
    ) {
        initTranslations();
        var inboundEDocRecId = inboundEDocRec.id;
        var inboundEdocRecType = inboundEDocRec.type;
        var parsedContent = parsedContentObj.content;
        var duplicateSoArr = parsedContentObj.duplicateSoArr;
        var resultDetails = {
            success: true,
            message: "",
            entityType: "",
        };

        var transType = inboundEDocRec.getValue(TRANS_TYPE_FLD);
        var entityId = inboundEDocRec.getValue(VENDOR_FLD);
        var entityType = record.Type.VENDOR;
        var templateId = inboundEDocRec.getValue(EDOC_VENDOR_TEMPLATE_FLD);
        var templateRec = {};

        if (transactionMap.isSalesTransaction(transType)) {
            entityType = record.Type.CUSTOMER;
            entityId = inboundEDocRec.getValue(CUSTOMER_FLD);
            templateId = inboundEDocRec.getValue(EDOC_CUSTOMER_TEMPLATE_FLD);
        }
        templateRec = templateId ? templateDAO.retrieve(templateId) : {};
        var logParams = {
            inboundEDoc: inboundEDocRecId,
            entity: entityId,
            owner: actionOwner,
        };

        record.submitFields({
            type: inboundEdocRecType,
            id: inboundEDocRecId,
            values: {
                custrecord_psg_ei_inbound_status: CONVERTING_STATUS,
            },
        });
        var errorDetails = "";
        var errorParameters = {};
        var errorScope = CONVERSION_FAILED_MSG;

        try {
            // Convert parsed inbound e-document record to the designated transaction type.
            var tranDetails = converter.convertToTransaction(
                inboundEDocRec,
                parsedContent
            );
            var bypassPOValidationAuditTrailDetails = "";
            var IS_PO_VALIDATION_BYPASSED = false;
            if (tranDetails.bypassPOValidation === true) {
                IS_PO_VALIDATION_BYPASSED = true;
                bypassPOValidationAuditTrailDetails =
                    PO_VALIDATION_BYPASSED_MSG;
                resultDetails.poValidationBypassed = true;
            }
            record.submitFields({
                type: inboundEdocRecType,
                id: inboundEDocRecId,
                values: {
                    custrecord_psg_ei_inbound_status: CONVERTED_STATUS,
                    custrecord_psg_ei_bypassed_po_valid:
                        IS_PO_VALIDATION_BYPASSED,
                },
            });
            transResponse.storeInboundTransactionResponseinTransaction(
                inboundEDocRecId,
                tranDetails.id
            );
            var details = "";
            if (isBulkProcess) {
                details = CONVERSION_LOG_BULK_MSG;
            } else {
                details = CONVERSION_LOG_MSG;
            }
            var params1 = {
                TYPE: tranDetails.type,
                INTERNALID: tranDetails.id,
            };
            stringFormatter.setString(details);
            stringFormatter.replaceParameters(params1);
            details = stringFormatter.toString();
            logParams.details = details;
            auditManager.logConverted(logParams);
            if (bypassPOValidationAuditTrailDetails) {
                stringFormatter.setString(bypassPOValidationAuditTrailDetails);
                stringFormatter.replaceParameters(params1);
                bypassPOValidationAuditTrailDetails =
                    stringFormatter.toString();
                logParams.details = bypassPOValidationAuditTrailDetails;
                auditManager.logConverted(logParams);
                // If conversion is successful and a new Vendor Bill is created after bypassing PO Validation then add
                // an audit trail into the newy created Vendor Bill.
                if (tranDetails.id) {
                    var vendBillAuditTrailDetails =
                        PO_VALIDATION_BYPASSED_VEND_BILL_AUDIT_TRAIL;
                    var logParamsForVendBill = {
                        transaction: tranDetails.id,
                        entity: entityId,
                        owner: actionOwner,
                    };
                    createAuditTrailForTran(
                        logParamsForVendBill,
                        vendBillAuditTrailDetails,
                        params1
                    );
                }
            } else if (duplicateSoArr.length && tranDetails.id) {
                var soAuditTrailMsg = DUPLICATE_SO_AUDIT_TRAIL_SINGULAR;
                var soAuditTrailMsgParams = {
                    ID: duplicateSoArr[0],
                };
                if (duplicateSoArr.length > 1) {
                    soAuditTrailMsg = DUPLICATE_SO_AUDIT_TRAIL_PLURAL;
                    soAuditTrailMsgParams = {
                        CSV_ID_LIST: duplicateSoArr.join(", "),
                    };
                }
                var logParamsForSalesOrd = {
                    transaction: tranDetails.id,
                    entity: entityId,
                    owner: actionOwner,
                };
                createAuditTrailForTran(
                    logParamsForSalesOrd,
                    soAuditTrailMsg,
                    soAuditTrailMsgParams
                );
            }
            resultDetails.transactionId = tranDetails.id;
            resultDetails.transactionType = tranDetails.type;
        } catch (e) {
            // Added for easier debugging
            log.error(e.name, e);
            if (isBulkProcess) {
                errorDetails = FAILED_CONVERSION_LOG_BULK_MSG;
            } else {
                errorDetails = FAILED_CONVERSION_LOG_MSG;
            }
            errorParameters = {
                TEMPLATENAME: templateRec ? templateRec.name : "",
                ERRORSCOPE: errorScope,
                ERROR: e.message ? e.message : e,
            };
            stringFormatter.setString(errorDetails);
            stringFormatter.replaceParameters(errorParameters);
            errorDetails = stringFormatter.toString();
            logParams.details = errorDetails;
            auditManager.logConversionFailed(logParams);

            record.submitFields({
                type: inboundEdocRecType,
                id: inboundEDocRecId,
                values: {
                    custrecord_psg_ei_inbound_status: CONVERSION_FAILED_STATUS,
                },
            });
            resultDetails.success = false;
            resultDetails.message = errorDetails;
            resultDetails.entityType = entityType;
        }

        return resultDetails;
    }

    // For adding an converted audit trail log to transaction
    function createAuditTrailForTran(logParams, logMsg, logMsgParams) {
        stringFormatter.setString(logMsg);
        stringFormatter.replaceParameters(logMsgParams);
        logParams.details = stringFormatter.toString();
        auditManager.logConverted(logParams);
    }

    /**
     * Function to run validation plugin
     *
     * @param {Object} inboundEDocRec Inbound E-Document record object
     * @param {Integer} validationPlugin Validation Plugin record Id
     * @param {Integer} entityId Entity Id of Vendor
     * @param {Integer} transType Transaction type Id
     * @param {Integer} templateId E-Document Template record Id
     * @param {Integer} status Status value Id
     * @param {String} statusText Status text
     * @returns {String} validationPluginResult Message if successful
     * @throws {Object} error object
     */
    function runValidationPlugin(
        inboundEDocRec,
        validationPlugin,
        entityId,
        transType,
        templateId,
        status,
        statusText
    ) {
        var validationPluginRecordType =
            "customrecord_psg_ei_validation_plugin";
        var scriptField = "custrecord_ei_validation_script";
        var PLUGIN_IMPLEMENTATION = "custrecord_ei_inbound_validation_pl_impl";
        var tranColumns = [scriptField, PLUGIN_IMPLEMENTATION];
        var scriptLookup = search.lookupFields({
            type: validationPluginRecordType,
            id: validationPlugin,
            columns: tranColumns,
        });
        var scriptId = scriptLookup[scriptField][0]
            ? scriptLookup[scriptField][0].value
            : 0;
        var pluginImplementationId = scriptLookup[PLUGIN_IMPLEMENTATION];
        var plugInContext = {
            eDocument: {
                id: inboundEDocRec.id,
                scriptId: scriptId,
                content: inboundEDocRec.getValue(CONTENT_FLD),
                source: {
                    id: inboundEDocRec.getValue(SOURCE_FLD),
                    text: inboundEDocRec.getText(SOURCE_FLD),
                },
                template: {
                    id: templateId,
                    text: inboundEDocRec.getText(EDOC_VENDOR_TEMPLATE_FLD),
                },
                status: {
                    id: status,
                    text: statusText,
                },
                package: {
                    id: inboundEDocRec.getValue(VENDOR_STANDARD_FLD),
                    text: inboundEDocRec.getText(VENDOR_STANDARD_FLD),
                },
                transactionType: {
                    id: transType,
                    text: inboundEDocRec.getText(TRANS_TYPE_FLD),
                },
                vendor: {
                    id: entityId,
                    text: inboundEDocRec.getText(VENDOR_FLD),
                },
                customPluginImpId: pluginImplementationId,
            },
        };
        Object.seal(plugInContext);
        return validationPluginManager.runPlugin(plugInContext);
    }

    function getTemplateInboundCDSPluginImpl(templateId) {
        var EI_TEMPLATE_RECORD = "customrecord_psg_ei_template";
        var INBOUND_CUSTOM_DATA_SOURCE_PLUGIN_IMPLEMENTATION =
            "custrecord_ei_in_inject_data_source_impl";
        var inboundCustomDataSourceLookup = search.lookupFields({
            type: EI_TEMPLATE_RECORD,
            id: templateId,
            columns: [INBOUND_CUSTOM_DATA_SOURCE_PLUGIN_IMPLEMENTATION],
        });
        return inboundCustomDataSourceLookup[
            INBOUND_CUSTOM_DATA_SOURCE_PLUGIN_IMPLEMENTATION
        ];
    }

    /**
     * Returns Sales order list with same PO number and entity passed as parameter
     * @param poNum
     * @param entityId
     * @returns []
     */
    function fetchDuplicateSO(poNum, entityId) {
        var results = [];
        if (!poNum) {
            return results;
        }
        var soMatchQuery = query.create({
            type: query.Type.TRANSACTION,
        });

        var salesOrderCondition = soMatchQuery.createCondition({
            fieldId: "type",
            operator: query.Operator.CONTAIN,
            values: "SalesOrd",
        });
        var poMatchCondition = soMatchQuery.createCondition({
            fieldId: "otherrefnum",
            operator: query.Operator.IS,
            values: poNum,
        });
        var statusCondition = soMatchQuery.createCondition({
            fieldId: "status",
            operator: query.Operator.CONTAIN_NOT,
            values: "C",
        });
        var customerCondition = soMatchQuery.createCondition({
            fieldId: "entity",
            operator: query.Operator.ANY_OF,
            values: entityId,
        });

        soMatchQuery.condition = soMatchQuery.and(
            salesOrderCondition,
            poMatchCondition,
            statusCondition,
            customerCondition
        );

        soMatchQuery.columns = [
            soMatchQuery.createColumn({
                fieldId: "id",
            }),
        ];

        var soMatchResultSet = soMatchQuery.run().iterator();

        soMatchResultSet.each(function (result) {
            var currentResult = result.value;
            results.push(currentResult.values[0]);
            return true;
        });
        return results;
    }

    return {
        getInboundEDocRecord: getInboundEDocRecord,
        parseInboundEdoc: parseInboundEdoc,
        createTransaction: createTransaction,
    };
});
