/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       17 Sep 2015         ldimayuga
 *
 */

define([
    "N/file",
    "N/record",
    "N/search",
    "./app_einvoice_generator",
    "../audit/app_audit_manager",
    "N/error",
    "../../data/dao_einvoice_template",
    "./app_einvoice_validator",
    "../../lib/translator",
    "../../lib/string_formatter",
    "../../lib/app/app_transaction_type_map",
    "./app_ei_digital_sign_plugin_manager",
    "./app_ei_outbound_validation_plugin_manager",
    "./app_einvoice_outbound_rendered_content_manager",
    "N/runtime",
    "./app_einvoice_subsidiary_pref_getter",
    "../../../src/ubl/common/components/avalaraService",
], function (
    file,
    record,
    search,
    generator,
    auditManager,
    error,
    eInvoiceTemplateDAO,
    validator,
    translator,
    stringFormatter,
    transactionMap,
    digitalSignPlManager,
    outboundValidationPlManager,
    contentManager,
    runtime,
    subsidiaryPrefGetter,
    avalaraServiceModule
) {
    var PDF_TEMPLATE_FIELD = "custrecord_psg_ei_sub_advanced_pdf";
    var INV_TEMPLATE_FIELD = "custbody_psg_ei_template";
    var PSG_EI_TRANSACTION_EDOC_STATUS = "custbody_psg_ei_status";
    var PSG_EI_TRANSACTION_EDOC_CONTENT = "custbody_psg_ei_content";
    var ENTITY_FIELD = "entity";
    var CUSTOMER_FIELD = "customer";
    var TYPE_FIELD = "type";
    var INTERNAL_ID = "id";
    var GENERATE_PDF_FIELD = "custbody_edoc_gen_trans_pdf";
    var GENERATED_PDF_DOCUMENT_FIELD = "custbody_edoc_generated_pdf";
    var ITEM_FULFILLMENT = "itemship";
    var VENDOR_RETURN_AUTHORIZATION = "vendauth";
    var CREATED_FROM = "createdfrom";
    var ORDER_TYPE = "ordertype";
    var SALES_ORDER = "salesord";
    var DIGITALLY_SIGNED_IDNTIFIER_FIELD = "custbody_ei_ds_txn_identifier";
    var NSEB_AVALARA_MANDATE_FIELD = 'custbody_nseb_avalara_mandate';
    var ENTITYPATCH = "ENTITYPATCH";
    var SUBSIDIARY = "subsidiary";
    var FAILED_STATUS = 5;
    var READY_FOR_SENDING = 3;
    var READY_FOR_CERTIFICATION = "19";

    var DIGITAL_SIGNATURE_ERROR = "DIGITAL_SIGNATURE_ERROR";
    var FAILED_RESULT = "FAILED_RESULT";
    var OUTBOUND_VALIDATION_ERROR = "OUTBOUND_VALIDATION_ERROR";
    var FINAL_STRING_IS_MALFORMED_ERROR =
        "GENERATION_FAILED_MALFORMED_EDOCUMENT";
    var CDS_FAILURE_ERROR = "CUSTOM DATASOURCE PLUGIN FAILURE";

    var GENERATION_LOG_BULK_MSG;
    var GENERATION_LOG_MSG;
    var GENERATION_PDF_LOG_BULK_MSG;
    var GENERATION_PDF_LOG_MSG;
    var GENERATION_REMOVED_PDF_LOG_BULK_MSG;
    var GENERATION_REMOVED_PDF_LOG_MSG;
    var FAILED_GENERATION_LOG_BULK_MSG;
    var FAILED_GENERATION_LOG_MSG;
    var FAILED_PDF_GENERATION_LOG_BULK_MSG;
    var FAILED_PDF_GENERATION_LOG_MSG;
    var DIGITAL_SIGNATURE_SUCCESS_LOG;
    var DIGITAL_SIGNATURE_FAILURE_LOG;
    var FAILED_RESULT_MESSAGE;
    var OUTBOUND_VALIDATION_SUCCESS_LOG;
    var OUTBOUND_VALIDATION_FAILURE_LOG;
    var OV_FAILED_RESULT_MESSAGE;
    var FINAL_STRING_IS_MALFORMED_ERROR_MESSAGE;
    var CDS_FAILURE_DEFAULT_ERROR_MESSAGE;
    var CDS_SUCCESS_DEFAULT_MESSAGE;

    function getTranslations(locale) {
        if (locale) {
            translator.setLocale(locale);
        }

        GENERATION_LOG_BULK_MSG = translator.getString(
            "ei.generation.generationlogbulk"
        );
        GENERATION_LOG_MSG = translator.getString(
            "ei.generation.generationlog"
        );
        GENERATION_PDF_LOG_BULK_MSG = translator.getString(
            "ei.generation.generationwithPDFlogbulk"
        );
        GENERATION_PDF_LOG_MSG = translator.getString(
            "ei.generation.generationwithPDFlog"
        );
        GENERATION_REMOVED_PDF_LOG_BULK_MSG = translator.getString(
            "ei.generation.generationremovedPDFlogbulk"
        );
        GENERATION_REMOVED_PDF_LOG_MSG = translator.getString(
            "ei.generation.generationremovedPDFlog"
        );
        FAILED_GENERATION_LOG_BULK_MSG = translator.getString(
            "ei.generation.failedgenerationlogbulk"
        );
        FAILED_GENERATION_LOG_MSG = translator.getString(
            "ei.generation.failedgenerationlog"
        );

        FAILED_PDF_GENERATION_LOG_BULK_MSG = translator.getString(
            "ei.generation.failedpdfgenerationlogbulk"
        );

        FAILED_PDF_GENERATION_LOG_MSG = translator.getString(
            "ei.generation.failedpdfgenerationlog"
        );
        DIGITAL_SIGNATURE_SUCCESS_LOG = translator.getString(
            "digitalSignature.successlog"
        );
        DIGITAL_SIGNATURE_FAILURE_LOG = translator.getString(
            "digitalSignature.failurelog"
        );
        FAILED_RESULT_MESSAGE = translator.getString(
            "digitalSignature.pluginfailedmessage"
        );
        OUTBOUND_VALIDATION_SUCCESS_LOG = translator.getString(
            "outboundvalidation.successlog"
        );
        OUTBOUND_VALIDATION_FAILURE_LOG = translator.getString(
            "outboundvalidation.failurelog"
        );
        OV_FAILED_RESULT_MESSAGE = translator.getString(
            "outboundvalidation.pluginfailedmessage"
        );
        FINAL_STRING_IS_MALFORMED_ERROR_MESSAGE = translator.getString(
            "ei.generation.msg.failedgenerationfinalmalformed"
        );
        CDS_FAILURE_DEFAULT_ERROR_MESSAGE = translator.getString(
            "cds.failure.default.error.message"
        );
        CDS_SUCCESS_DEFAULT_MESSAGE = translator.getString(
            "cds.success.default.message"
        );
    }

    /**
     * Retrieves the transaction object
     * @param {String} id - transaction id
     * @param {String} transType - transaction type
     */
    function getTransaction(id, transType) {
        if (!id) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Transaction internal ID  is a required parameter for retrieving invoice record."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction internal ID  is a required parameter for retrieving invoice record.",
                notifyOff: true,
            });
        }
        if (!transType) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Transaction Type  is a required parameter for retrieving invoice record."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction Type  is a required parameter for retrieving invoice record.",
                notifyOff: true,
            });
        }
        return record.load({
            type: transType,
            id: id,
        });
    }

    //returns the entityObj for given transaction.
    function getEntityObj(transObj) {
        var entityObj;
        var entityId = getEntityId(transObj);
        if (
            entityId !== null &&
            entityId !== "" &&
            typeof entityId !== "undefined"
        ) {
            var entityType = getTypeOfEntity(transObj);
            var transactionType = transObj.getValue(TYPE_FIELD);
            var sourceOrderType = transObj.getValue(ORDER_TYPE);
            if (
                transactionType.toLowerCase() === ITEM_FULFILLMENT &&
                sourceOrderType.toLowerCase() === SALES_ORDER
            ) {
                entityObj = loadEntityFromParentTxn(transObj);
            } else {
                entityObj = record.load({
                    type: entityType,
                    id: entityId,
                });
            }
        } else {
            entityObj = {
                getValue: function (arg) {
                    return false;
                },
                isinactive: false,
                type: ENTITYPATCH,
            };
        }
        return entityObj;
    }

    //returns entity object from parent transaction.
    function loadEntityFromParentTxn(transObj) {
        var entityId;
        var entityObj;
        var createdFromId = transObj.getValue(CREATED_FROM);
        var lookupSearch = search.lookupFields({
            type: record.Type.SALES_ORDER,
            id: createdFromId,
            columns: [ENTITY_FIELD],
        });
        var entityIds = lookupSearch[ENTITY_FIELD];
        entityId = entityIds.length > 0 ? entityIds[0].value : "";
        if (entityId != "") {
            entityObj = record.load({
                type: CUSTOMER_FIELD,
                id: entityId,
            });
        }
        return entityObj;
    }

    //loads the entityId from either the customer field, or from the more frequent 'entity' field, as applicable.
    function getEntityId(transObj) {
        return transObj.getValue(transactionMap.getEntityFieldIDFromTransactionRecord(transObj))
    }

    //returns the type of entity applicable for this transaction: 'customer' or 'vendor'
    function getTypeOfEntity(transObj) {
        var entityType;
        var transactionType = transObj.getValue(TYPE_FIELD);
        var sourceOrderType = transObj.getValue(ORDER_TYPE);
        if (
            transactionType.toLowerCase() === ITEM_FULFILLMENT &&
            sourceOrderType.toLowerCase() === VENDOR_RETURN_AUTHORIZATION
        ) {
            entityType = record.Type.VENDOR;
        } else if (transactionMap.isSalesTransaction(transactionType)) {
            entityType = record.Type.CUSTOMER;
        } else {
            entityType = record.Type.VENDOR;
        }
        return entityType;
    }

    /**
     * generateEDocument- Generate e-document for the transaction
     *
     * @param {Object} transObj - The transaction object
     * @param {String} transType - The transaction type
     * @param {Number} actionOwner - ID of the action owner
     * @param {boolean} isBulkProcess - flag for bulk processing
     * @param {String} customJson - the JSON string for custom data source
     * @param {String} certSendingMethodId - internal id of certification sending method record
     * @param {String} locale - locale of user
     * @returns {Object}
     */
    function generateEDocument(
        transObj,
        transType,
        actionOwner,
        isBulkProcess,
        customJson,
        certSendingMethodId,
        locale
    ) {
        // validations
        if (!transObj) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Transaction Record object is a required parameter for generating the e-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction Record object is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        }
        if (!transType) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "Transaction Type is a required parameter for generating the e-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Transaction Type is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        }
        if (!actionOwner) {
            log.error(
                "REQUIRED_PARAM_MISSING",
                "User Id is a required parameter for generating the E-document."
            );
            throw error.create({
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "User Id is a required parameter for generating the e-document.",
                notifyOff: true,
            });
        }
        getTranslations(locale);

        var template;
        var entityObj;
        var resultDetails = {
            success: true,
            message: "",
        };

        //creating a log.
        var entityId;
        entityId = getEntityId(transObj);
        var transaction = transObj.getValue(INTERNAL_ID);
        var logParams = {
            transaction: transaction,
            entity: entityId,
            owner: actionOwner,
        };
        var digitalSigningEnabled = false;
        var digitalSigningSuccess = false;
        var outboundValidationEnabled = false;
        var outboundValidationSuccess = false;
        var ovPluginMsg = "";
        try {
            entityObj = getEntityObj(transObj);
            var templateId = transObj.getValue(INV_TEMPLATE_FIELD);
            template = getTemplate(templateId);
            var templateContent = template.generatorTemplate;
            if (customJson && customJson.result) {
                var cdsResult = customJson.result;
                var cdsMsg = cdsResult.eiAuditTrailMsg;
                if (!cdsResult.success) {
                    throw error.create({
                        name: CDS_FAILURE_ERROR,
                        message: cdsMsg || CDS_FAILURE_DEFAULT_ERROR_MESSAGE,
                        notifyOff: true,
                    });
                } else {
                    logParams.details = cdsMsg || CDS_SUCCESS_DEFAULT_MESSAGE;
                    auditManager.logGeneration(logParams);
                }
            }

            var fieldsForUpdate = {};
            var isSubsEnabled = runtime.isFeatureInEffect({
                feature: "SUBSIDIARIES",
            });
            var transactionSubsidiary = transObj.getValue(SUBSIDIARY)
                ? transObj.getValue(SUBSIDIARY)
                : "";
            var avalaraService = avalaraServiceModule.avalaraService;
            if (avalaraService.isAvalaraCustomJson(customJson, template)) {
                avalaraService.processAvalaraCustomJson({
                    customJson: customJson,
                    isOW: isSubsEnabled,
                    subsidiaryId: transactionSubsidiary,
                    transactionFieldsToUpdate: fieldsForUpdate,
                });
            }

            /**
             * getContent may change parameters in the future depending on the records that we need
             * to load for e-document generation
             */
            //does the generation.
            var content = generator.getContent(
                templateContent,
                transObj,
                entityObj,
                customJson,
                locale
            );
            //validation done after the generation.
            validator.validateContent(content, template, locale);

            /**
             * Check if Digital Signature Plugin Implementation is selected in the attached template.
             * If Yes, execute the implementation attached, else continue as it is.
             */
            var dsPluginId = template.customPLDigitalSignature;
            var pluginMessage = "";
            if (
                dsPluginId !== "" &&
                typeof dsPluginId !== "undefined" &&
                dsPluginId
            ) {
                digitalSigningEnabled = true;
                var pluginParam = {
                    unsignedString: content,
                    subsidiaryId: transactionSubsidiary,
                    tranId: transaction,
                    tranType: transType,
                    locale: locale,
                    userId: actionOwner,
                };
                try {
                    var pluginResult = digitalSignPlManager.runPlugin(
                        pluginParam,
                        dsPluginId
                    );
                    pluginMessage = pluginResult["message"];
                    if (pluginResult.success) {
                        content = pluginResult["signedString"];
                        digitalSigningSuccess = true;
                    } else {
                        throw error.create({
                            name: FAILED_RESULT,
                            message:
                                FAILED_RESULT_MESSAGE + "\n" + pluginMessage,
                            notifyOff: true,
                        });
                    }
                } catch (e) {
                    throw error.create({
                        name: DIGITAL_SIGNATURE_ERROR,
                        message: [e.name, e.message].join("\n"),
                        notifyOff: true,
                    });
                }
            }
            var ovPluginID = template.customPLOutboundValidation;
            if (
                ovPluginID !== "" &&
                typeof ovPluginID !== "undefined" &&
                ovPluginID
            ) {
                outboundValidationEnabled = true;
                var transInfo = {
                    transactionId: transObj.id,
                    transactionType: transObj.type,
                };
                var pluginParamValidation = {
                    content: content,
                    transactionInfo: transInfo,
                    locale: locale,
                    userId: actionOwner,
                };
                try {
                    var pluginResultValidation =
                        outboundValidationPlManager.runPlugin(
                            pluginParamValidation,
                            ovPluginID
                        );
                    ovPluginMsg = pluginResultValidation.message;
                    if (pluginResultValidation.success) {
                        outboundValidationSuccess = true;
                    } else {
                        throw error.create({
                            name: FAILED_RESULT,
                            message: OV_FAILED_RESULT_MESSAGE,
                            notifyOff: true,
                        });
                    }
                } catch (e) {
                    throw error.create({
                        name: OUTBOUND_VALIDATION_ERROR,
                        message: [e.name, e.message].join("\n"),
                        notifyOff: true,
                    });
                }
            }
            var extension = contentManager.getExtensionForContent(content);
            if (extension === "") {
                throw error.create({
                    name: FINAL_STRING_IS_MALFORMED_ERROR,
                    message: FINAL_STRING_IS_MALFORMED_ERROR_MESSAGE,
                    notifyOff: true,
                });
            }
            //updating the fields in txn: status and content.
            fieldsForUpdate[PSG_EI_TRANSACTION_EDOC_STATUS] =
                typeof certSendingMethodId !== "undefined" &&
                    certSendingMethodId !== ""
                    ? READY_FOR_CERTIFICATION
                    : READY_FOR_SENDING;
            var isAvalara = fieldsForUpdate[NSEB_AVALARA_MANDATE_FIELD]
            if (isAvalara) {
                fieldsForUpdate[PSG_EI_TRANSACTION_EDOC_STATUS] = READY_FOR_CERTIFICATION
            }

            fieldsForUpdate[PSG_EI_TRANSACTION_EDOC_CONTENT] = content;
            //Set the digitally signed transaction identifier field
            if (digitalSigningEnabled && digitalSigningSuccess)
                fieldsForUpdate[DIGITALLY_SIGNED_IDNTIFIER_FIELD] = true;
            else fieldsForUpdate[DIGITALLY_SIGNED_IDNTIFIER_FIELD] = false;
            //removing the old pdf file.
            var pdfFileParams = {};
            var oldPDF = transObj.getValue(GENERATED_PDF_DOCUMENT_FIELD);
            if (oldPDF) {
                file.delete({
                    id: oldPDF,
                });
            }
            var toGeneratePDF = false;

            // If subsidiary is enabled(OW) then takes transaction subsidiary as preferences subsidiary else takes parent company
            var preferencesSubsidiaryId = isSubsEnabled
                ? transactionSubsidiary
                : 1;
            var subsidiaryFieldScriptIds = [PDF_TEMPLATE_FIELD];
            var subsidiaryPreferencesObj =
                subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                    preferencesSubsidiaryId,
                    subsidiaryFieldScriptIds
                );
            var pdfTemplateId = subsidiaryPreferencesObj[PDF_TEMPLATE_FIELD];
            log.debug("Advanced PDF Template ID", pdfTemplateId);
            toGeneratePDF = transObj.getValue(GENERATE_PDF_FIELD); //checking if the checkbox to generate PDF is selected and based on that, generating the PDF, and updating the fieldsForUpdate.
            if (toGeneratePDF) {
                pdfFileParams = generator.getPDFFileId(
                    transObj.id,
                    transObj.type,
                    pdfTemplateId
                );
            }
            fieldsForUpdate[GENERATED_PDF_DOCUMENT_FIELD] =
                pdfFileParams.pdfFileId;
            if (pdfFileParams.pdfFileId === "") {
                pdfFileParams.pdfFileId = "pdfNotGenerated";
            }

            //saving the record (txn) with the updated fields: fieldsForUpdate
            record.submitFields({
                type: transType,
                id: transaction,
                values: fieldsForUpdate,
            });

            //checking if old pdf was removed for logging.
            var removedPDF = oldPDF && !toGeneratePDF ? true : false;
            //generating the log details.
            var details = getGenerationLogDetails(
                isBulkProcess,
                toGeneratePDF,
                removedPDF,
                pdfFileParams
            );

            var parameters = {
                TEMPLATENAME: template.name,
            };
            stringFormatter.setString(details);
            stringFormatter.replaceParameters(parameters);
            details = stringFormatter.toString() + "\n" + pluginMessage;
            logParams.details = details;
            if (
                (typeof certSendingMethodId !== "undefined" &&
                    certSendingMethodId !== "") || isAvalara
            ) {
                auditManager.logReadyForCertification(logParams);
            } else {
                auditManager.logReadyForSending(logParams);
            }
            //Log Digital Signature status in audit trail.
            if (digitalSigningEnabled && digitalSigningSuccess) {
                logParams.details = DIGITAL_SIGNATURE_SUCCESS_LOG;
                auditManager.logEdocDigitalSignature(logParams);
                resultDetails.digitalSigningSuccess = digitalSigningSuccess;
            }
            //log Outbound Validation status in audit trial
            if (outboundValidationEnabled && outboundValidationSuccess) {
                logParams.details =
                    OUTBOUND_VALIDATION_SUCCESS_LOG + "\n" + ovPluginMsg;
                auditManager.logGenerated(logParams);
                resultDetails.outboundValidationSuccess =
                    outboundValidationSuccess;
            }
        } catch (e) {
            // Added for easier debugging
            log.error(e.name, e.message + "\n" + e.stack);
            var errorDetails = "";
            if (isBulkProcess) {
                errorDetails = FAILED_GENERATION_LOG_BULK_MSG;
            } else {
                errorDetails = FAILED_GENERATION_LOG_MSG;
            }
            var errorParameters = {
                TEMPLATENAME: template ? template.name : "",
                ERROR: e.message ? e.message : e,
            }
            generateLogErrorMsg(template, errorDetails, errorParameters, logParams);
            if (e.name === "EI_INACTIVE_ENTITY") {
                errorDetails = e.name + ": " + e.message;
            } else {
                auditManager.logGenerationFailed(logParams);
                if (digitalSigningEnabled && !digitalSigningSuccess) {
                    logParams.details = DIGITAL_SIGNATURE_FAILURE_LOG;
                    auditManager.logEdocDigitalSignature(logParams);
                }
                if (outboundValidationEnabled && !outboundValidationSuccess) {
                    logParams.details =
                        OUTBOUND_VALIDATION_FAILURE_LOG + "\n" + ovPluginMsg;
                    auditManager.logGenerationFailed(logParams);
                }
                //setting failed status in transaction.
                record.submitFields({
                    type: transType,
                    id: transaction,
                    values: {
                        custbody_psg_ei_status: FAILED_STATUS,
                        custbody_ei_ds_txn_identifier: false, //Setting the digitally signed transaction identifier to false in case of generation failure.
                    },
                });
            }
            //prepare the result for failed.
            var entityType = getTypeOfEntity(transObj);
            resultDetails.success = false;
            resultDetails.message = errorDetails;
            resultDetails.entityType = entityType;
        }

        return resultDetails;
    }

    /**
     * Get Generation Log Details
     *
     * @param {Boolean} isBulkProcess
     * @param {Boolean} toGeneratePDF
     * @param {Boolean} isPDFRemoved
     * @returns {String}
     */
    function getGenerationLogDetails(
        isBulkProcess,
        toGeneratePDF,
        isPDFRemoved,
        pdfFileParams
    ) {
        var details;
        if (isBulkProcess) {
            if (
                toGeneratePDF &&
                pdfFileParams.pdfFileId !== "pdfNotGenerated"
            ) {
                details = GENERATION_PDF_LOG_BULK_MSG;
            } else if (
                toGeneratePDF &&
                pdfFileParams.pdfFileId === "pdfNotGenerated"
            ) {
                details =
                    FAILED_PDF_GENERATION_LOG_BULK_MSG +
                    pdfFileParams.pdfGenerationError;
            } else if (isPDFRemoved) {
                details = GENERATION_REMOVED_PDF_LOG_BULK_MSG;
            } else {
                details = GENERATION_LOG_BULK_MSG;
            }
        } else {
            if (
                toGeneratePDF &&
                pdfFileParams.pdfFileId !== "pdfNotGenerated"
            ) {
                details = GENERATION_PDF_LOG_MSG;
            } else if (
                toGeneratePDF &&
                pdfFileParams.pdfFileId === "pdfNotGenerated"
            ) {
                details =
                    FAILED_PDF_GENERATION_LOG_MSG +
                    pdfFileParams.pdfGenerationError;
            } else if (isPDFRemoved) {
                details = GENERATION_REMOVED_PDF_LOG_MSG;
            } else {
                details = GENERATION_LOG_MSG;
            }
        }
        return details;
    }

    /**
     * Gets the template object using template Id
     *
     * @param {Number} templateId Internal Id of Template
     * @returns {Object} Template Object
     */
    function getTemplate(templateId) {
        var template;
        if (templateId) {
            template = eInvoiceTemplateDAO.retrieve(templateId);
        }
        return template;
    }
    function generateLogErrorMsg(template, errorDetails, errorParameters, logParams) {
        stringFormatter.setString(errorDetails);
        stringFormatter.replaceParameters(errorParameters);
        errorDetails = stringFormatter.toString();
        logParams.details = errorDetails;
    }

    return {
        getTransaction: getTransaction,
        generateEDocument: generateEDocument,
        getEntityId: getEntityId,
        getTemplate: getTemplate,
        generateLogErrorMsg: generateLogErrorMsg,
    };
})
