/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This is the user event for the Inbound E-Document Custom Record.
 *
 * Version    Date            Author           Remarks
 * 1.00       28 Jul 2016     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType usereventscript
 *
 */

define([
    "../../app/einvoice/app_einvoice_transaction_response",
    "N/search",
    "../../app/audit/app_audit_manager",
    "../../lib/translator",
    "N/runtime",
    "N/error",
    "N/ui/serverWidget",
    "../../lib/string_formatter",
    "../../app/einvoice/app_einvoice_inbound_edocument_manager",
    "../../app/einvoice/app_einvoice_inbound_edocument_validator",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../lib/utils",
    "require",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "N/record",
    "../../lib/app/app_transaction_type_map",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_instances",
], function (
    transResponse,
    search,
    auditManager,
    translator,
    runtime,
    error,
    serverWidget,
    stringFormatter,
    inboundEdocManager,
    inboundEdocValidator,
    notifier,
    licenseManager,
    utils,
    require,
    freeCountryCheckHelper,
    record,
    transactionTypeMap,
    mainConstants,
    recordInstances
) {
    var FOR_CONVERSION = "11";
    var CONVERTED = "15";
    var CONVERTING = "16";
    var CANCELLED = "17";
    var INCOMPLETE = "18";
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;
    var ACKNOWLEDGED_RESPONSE_STATUS_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].ACKNOWLEDGED;

    var INBOUND_EDOC_TYPE = "inbound";
    var STATUS_FIELD = "custrecord_psg_ei_inbound_status";
    var VENDOR_FIELD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FIELD = "custrecord_psg_ei_inbound_customer";
    var ATTACH_EDOC_FIELD = "custrecord_psg_ei_attach_edoc";
    var ATTACH_PDF_FIELD = "custrecord_psg_ei_attach_pdf";
    var EDOC_FILENAME_FIELD = "name";
    var TRANSACTION_TYPE_FIELD = "custrecord_psg_ei_inbound_transtype";
    var SOURCE_FIELD = "custrecord_psg_ei_inbound_source";
    var EDOCUMENT_TEMPLATE_FLD_CUSTOMER =
        "custrecord_psg_ei_inbound_temp_customer";
    var EDOCUMENT_TEMPLATE_FLD_VENDOR = "custrecord_psg_ei_inbound_template";
    var CONTENT_FIELD = "custrecord_psg_ei_inbound_content";
    var BYPASSED_PO_VALIDATION_FIELD = "custrecord_psg_ei_bypassed_po_valid";
    var EDOC_PACKAGE_FLD_CUSTOMER = "custrecord_psg_ei_edoc_standard_customer";
    var EDOC_PACKAGE_FLD_VENDOR = "custrecord_psg_ei_edoc_standard_vendor";

    var INBOUND_SOURCE_MANUAL = "1";
    var TRANS_TYPE_VENDOR_BILL = "17";
    var VERSION_2017_2 = "2017.2";

    var SUBSIDIARY = "subsidiary";
    var NO_LICENSE_CLIENT_MSG_CODE = "license.notinstalled";
    var NO_FREE_COUNTRY_MSG_CODE = "inboundedocument.msg.nofreecountry";
    var TXN_COUNTRY_DIFFERENT_THAN_FREE_COUNTRY_MSG_CODE =
        "inboundedocument.msg.txncountrydifferentthanfreecountry";
    var CONVERT_INFORMATION_CODE = "inboundedocument.convert.information";
    var EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER =
        "A vendor bill was created for the inbound e-document. The purchase order number present in the inbound e-document does not exist in the account. Check the audit trail for more information.";
    var EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER_MSG_CODE =
        "ei.po_validation_bypassed_inbound_edocument_banner";
    var NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";
    var TRANSACTION_FIELD = "custrecord_psg_ei_inbound_transtype";
    var TRANS_TYPE_FLD_ON_FORM = "custpage_psg_ei_inbound_transtype";

    function beforeLoad(context) {
        var currRecord = context.newRecord;
        var bannerMessage = "";
        var bannerType = "";
        var transType = currRecord.getValue(TRANSACTION_FIELD);

        if (context.type === context.UserEventType.COPY) {
            var errorMsg = error.create({
                name: "EI_CANNOT_COPY_INBOUND_EDOCUMENT",
                message: translator.getString(
                    "inboundedocument.copynotallowed"
                ),
                notifyOff: true,
            });

            throw new Error(errorMsg.name + ": " + errorMsg.message);
        }

        var form = context.form;
        var edocFileFld = form.getField({
            id: EDOC_FILENAME_FIELD,
        });
        var attachEdocFld = form.getField({
            id: ATTACH_EDOC_FIELD,
        });
        var attachPDFFld = form.getField({
            id: ATTACH_PDF_FIELD,
        });
        var vendorField = form.getField({
            id: VENDOR_FIELD,
        });
        var customerField = form.getField({
            id: CUSTOMER_FIELD,
        });
        var customerTemplateField = form.getField({
            id: EDOCUMENT_TEMPLATE_FLD_CUSTOMER,
        });
        var vendorTemplateField = form.getField({
            id: EDOCUMENT_TEMPLATE_FLD_VENDOR,
        });

        if (runtime.version == VERSION_2017_2) {
            createBannerHolder(form);
        }

        //Add temporary field for Transaction type
        var transactionField = form.getField(TRANSACTION_FIELD);
        var tempTransactionField = form.addField({
            id: TRANS_TYPE_FLD_ON_FORM,
            type: serverWidget.FieldType.SELECT,
            label: translator.getString(
                "label.custrecord_psg_ei_inbound_transtype"
            ),
        });
        tempTransactionField.isMandatory = true;
        tempTransactionField.setHelpText({
            help: translator.getString(
                "help.custrecord_psg_ei_inbound_transtype"
            ),
        });
        form.insertField({
            field: tempTransactionField,
            nextfield: VENDOR_FIELD,
        });

        var inboundTransTypeOptions = {};
        var allTranTypeOptions = transactionField.getSelectOptions();
        inboundTransTypeOptions =
            transactionTypeMap.getSupportedTransTypeLabels(
                allTranTypeOptions,
                INBOUND_EDOC_TYPE,
                true
            );

        for (var tran in inboundTransTypeOptions) {
            tempTransactionField.addSelectOption({
                value: inboundTransTypeOptions[tran].value,
                text: inboundTransTypeOptions[tran].text,
            });
        }

        tempTransactionField.defaultValue =
            currRecord.getValue(TRANSACTION_FIELD);

        var bypassedPOValidation = currRecord.getValue(
            BYPASSED_PO_VALIDATION_FIELD
        );

        if (context.type === context.UserEventType.CREATE) {
            // Hides E-Document File text field.
            edocFileFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });

            currRecord.setValue({
                fieldId: TRANSACTION_TYPE_FIELD,
                value: TRANS_TYPE_VENDOR_BILL,
            });

            currRecord.setValue({
                fieldId: SOURCE_FIELD,
                value: INBOUND_SOURCE_MANUAL,
            });
        } else if (context.type === context.UserEventType.EDIT) {
            if (bypassedPOValidation === true) {
                bannerType = "INFORMATION";
                bannerMessage =
                    translator.getString(
                        EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER_MSG_CODE
                    ) || EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER;
            }
            // Hides E-Document File list field.
            attachEdocFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });

            // Disables E-Document File text field.
            edocFileFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED,
            });

            // Disables PDF File Reference
            attachPDFFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED,
            });
        } else if (context.type === context.UserEventType.VIEW) {
            var entityId = currRecord.getValue(VENDOR_FIELD);
            var entityType = record.Type.VENDOR;

            if (transactionTypeMap.isSalesTransaction(transType)) {
                vendorField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });
                vendorTemplateField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });
                customerTemplateField.label =
                    translator.getString(
                        "label.ui.custrecord.psg.ei.inbound.template.entity"
                    ) || "E-Document Template";

                entityId = currRecord.getValue(CUSTOMER_FIELD);
                entityType = record.Type.CUSTOMER;
            } else {
                customerField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });
                customerTemplateField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });
                vendorTemplateField.label =
                    translator.getString(
                        "label.ui.custrecord.psg.ei.inbound.template.entity"
                    ) || "E-Document Template";
            }

            if (bypassedPOValidation === true) {
                bannerType = "INFORMATION";
                bannerMessage =
                    translator.getString(
                        EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER_MSG_CODE
                    ) || EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER;
            }
            // Hides E-Document File list field
            attachEdocFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN,
            });

            form.clientScriptModulePath =
                "../../comp/cs/dist/cs_ei_inbound_edocument";

            var status = currRecord.getValue(STATUS_FIELD);

            if ([CONVERTED, CONVERTING, CANCELLED].indexOf(status) === -1) {
                var licensingBanner = {
                    hasLicenseBanner: false,
                };
                var subsidiaryId = "1";

                if (freeCountryCheckHelper.isOwAccount()) {
                    var entitySubsidiary = search.lookupFields({
                        type: entityType,
                        id: entityId,
                        columns: SUBSIDIARY,
                    });
                    subsidiaryId = entitySubsidiary.subsidiary[0].value;
                }

                if (entityId) {
                    licensingBanner = getLicenseBanner(subsidiaryId);
                    if (licensingBanner.hasLicenseBanner) {
                        bannerMessage = licensingBanner.bannerMessage;
                        bannerType = licensingBanner.bannerType;
                    }
                }

                constructActionButtons(
                    form,
                    currRecord,
                    status,
                    licensingBanner.hasLicenseBanner
                );
            } else if (status === CONVERTING) {
                bannerType = "INFORMATION";
                bannerMessage = translator.getString(CONVERT_INFORMATION_CODE);
            }

            // Create Preview Button
            var previewButton = {
                id: "custpage_preview_ei_button",
                label: translator.getString("inboundedocument.preview.button"),
                functionName: "preview(" + currRecord.id + ", 'xml');",
            };
            form.addButton(previewButton);

            var requestParameters = context.request.parameters;
            var paramsBanner = createBannerFromParams(requestParameters);
            if (bypassedPOValidation === true) {
                bannerType = "INFORMATION";
                bannerMessage =
                    translator.getString(
                        EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER_MSG_CODE
                    ) || EI_PO_VALIDATION_BYPASSED_INBOUND_EDOCUMENT_BANNER;
            } else if (paramsBanner.type) {
                bannerType = paramsBanner.type;
                bannerMessage = paramsBanner.message;
            }
        }

        if (bannerMessage !== "") {
            showResultMessage(form, currRecord, bannerType, bannerMessage);
        }
    }

    function beforeSubmit(context) {
        log.debug("ue_ei_inbound_edocument: beforeSubmit", "started");
        if (!isSupportedContext()) {
            var errorObj = error.create({
                name: "EI_CONTEXT_UNSUPPORTED",
                message: translator.getString(
                    "inboundedocument.contextunsupported"
                ),
                notifyOff: true,
            });

            throw new Error(errorObj.name + ": " + errorObj.message);
        }

        var newRecord = context.newRecord;
        var tranType = newRecord.getValue(TRANSACTION_TYPE_FIELD);

        if (context.type === context.UserEventType.DELETE) {
            var errorMsg = error.create({
                name: "EI_CANNOT_DELETE_INBOUND_EDOCUMENT",
                message: translator.getString(
                    "inboundedocument.deletenotallowed"
                ),
                notifyOff: true,
            });

            throw new Error(errorMsg.name + ": " + errorMsg.message);
        }

        if (
            [context.UserEventType.CREATE, context.UserEventType.EDIT].indexOf(
                context.type
            ) !== -1
        ) {
            var entity = newRecord.getValue(VENDOR_FIELD);
            var templateField = EDOCUMENT_TEMPLATE_FLD_VENDOR;
            var edocPackage = newRecord.getValue(EDOC_PACKAGE_FLD_VENDOR);
            if (transactionTypeMap.isSalesTransaction(tranType)) {
                entity = newRecord.getValue(CUSTOMER_FIELD);
                templateField = EDOCUMENT_TEMPLATE_FLD_CUSTOMER;
                edocPackage = newRecord.getValue(EDOC_PACKAGE_FLD_CUSTOMER);
            }
            // Validations to run if not from UI
            if (
                runtime.executionContext !== runtime.ContextType.USER_INTERFACE
            ) {
                // Validate content
                var edocContent = newRecord.getValue(CONTENT_FIELD);
                var result =
                    inboundEdocValidator.validateEDocumentContent(edocContent);
                var isEdocValid = result.isSuccessful();
                log.debug("ue_ei_inbound_edocument: isEdocValid", isEdocValid);
                if (!isEdocValid) {
                    var invalidXMLError = error.create({
                        name: "EI_INVALID_XML_CONTENT",
                        message: result.getMessage(),
                        notifyOff: true,
                    });

                    throw new Error(
                        invalidXMLError.name + ": " + invalidXMLError.message
                    );
                }

                // code to auto select template goes here
                if (entity && tranType) {
                    var edocTemplate = inboundEdocManager.getEdocTemplate(
                        edocPackage,
                        tranType,
                        edocContent
                    );
                    if (edocTemplate) {
                        newRecord.setValue({
                            fieldId: templateField,
                            value: edocTemplate,
                        });
                    }
                }
            }

            var status = newRecord.getValue(STATUS_FIELD);
            if (["", INCOMPLETE].indexOf(status) !== -1) {
                if (entity && newRecord.getValue(templateField)) {
                    newRecord.setValue({
                        fieldId: STATUS_FIELD,
                        value: FOR_CONVERSION,
                    });
                } else {
                    newRecord.setValue({
                        fieldId: STATUS_FIELD,
                        value: INCOMPLETE,
                    });
                }
            }
        }
        log.debug("ue_ei_inbound_edocument: beforeSubmit", "ended");
    }

    function afterSubmit(context) {
        var currUser = runtime.getCurrentUser();

        var oldRecord = context.oldRecord;
        var newRecord = context.newRecord;

        var inboundStatus = newRecord.getValue(STATUS_FIELD);
        var template = newRecord.getValue(EDOCUMENT_TEMPLATE_FLD_VENDOR);
        var transType = newRecord.getValue(TRANSACTION_TYPE_FIELD);
        var entity = newRecord.getValue(VENDOR_FIELD);
        var entityField = newRecord.getField(VENDOR_FIELD);
        var entityType = record.Type.VENDOR;

        if (transactionTypeMap.isSalesTransaction(transType)) {
            entity = newRecord.getValue(CUSTOMER_FIELD);
            entityField = newRecord.getField(CUSTOMER_FIELD);
            template = newRecord.getValue(EDOCUMENT_TEMPLATE_FLD_CUSTOMER);
            entityType = record.Type.CUSTOMER;
        }

        var auditUser =
            runtime.executionContext !== runtime.ContextType.USER_INTERFACE
                ? notifier.getFirstActiveAdmin()
                : currUser.id;
        var auditEntity;

        if (inboundStatus === INCOMPLETE) {
            var logDetails = translator.getString(
                "inboundedocument.logincomplete"
            );
            var logParams = {};

            if (!entity) {
                logParams.FIELD = entityField.label;
            } else if (!template) {
                logParams.FIELD =
                    translator.getString(
                        "label.ui.custrecord.psg.ei.inbound.template.entity"
                    ) || "E-Document Template";
            }

            stringFormatter.setString(logDetails);
            stringFormatter.replaceParameters(logParams);
            logDetails = stringFormatter.toString();

            auditEntity = entity ? checkIfInactiveEntity(entity) : "";
            auditManager.logIncomplete({
                inboundEDoc: newRecord.id,
                entity: auditEntity,
                owner: auditUser,
                details: logDetails,
            });
        }

        if (
            inboundStatus === FOR_CONVERSION &&
            !isAlreadySetForConversionOrConverting(oldRecord)
        ) {
            auditEntity = checkIfInactiveEntity(entity);
            auditManager.logForConversion({
                inboundEDoc: newRecord.id,
                entity: auditEntity,
                owner: auditUser,
                details: translator.getString(
                    "inboundedocument.logforconversion"
                ),
            });

            var subsidiaryId = "1";
            if (freeCountryCheckHelper.isOwAccount()) {
                var entitySubsidiary = search.lookupFields({
                    type: entityType,
                    id: entity,
                    columns: SUBSIDIARY,
                });
                subsidiaryId = entitySubsidiary.subsidiary[0].value;
            }
            if (
                utils.transRespAllowedData(subsidiaryId)
                    .isTransRespSupportEnabled
            ) {
                var responseTransType = {
                    17: "CustInvc",
                    20: "CustCred",
                    31: "PurchOrd",
                };
                transResponse.createTransactionResponse(
                    newRecord.id,
                    newRecord.type,
                    utils.getInternalIdUsingScriptIdQuery(
                        TRANSACTION_RESPONSE_TYPE_REC_TYPE,
                        ACKNOWLEDGED_RESPONSE_STATUS_SCRIPT_ID
                    ),
                    responseTransType[transType]
                );
            }
        }
    }

    /**
     * Function to get correct banner from parameters
     *
     * @param {Object} requestParameters Request Parameters
     * @returns {Object} bannerDetails Details of the banner to be shown
     */
    function createBannerFromParams(requestParameters) {
        var bannerDetails = {
            type: "",
            message: "",
        };

        if (requestParameters.ei_process) {
            var proc = requestParameters.ei_process;
            var messageCode = requestParameters.ei_mc;
            var t = requestParameters.ei_t;

            /* Determining banner type */
            if (!t || t === "c") {
                bannerDetails.type = "CONFIRMATION";
            } else if (t === "e") {
                bannerDetails.type = "ERROR";
            } else if (t === "w") {
                bannerDetails.type = "WARNING";
            }

            if (proc) {
                /* Translation and showing of banner */
                bannerDetails.message = translator.getString(messageCode);
            }
        }

        return bannerDetails;
    }

    /**
     * Function to create the form action buttons
     *
     * @param {Object} form Form object
     * @param {Object} currRecord Record object
     * @param {String} status Record status
     * @param {Boolean} hasLicenseBanner Flag if form has license banner
     * @returns {Void}
     */
    function constructActionButtons(
        form,
        currRecord,
        status,
        hasLicenseBanner
    ) {
        var convertButton = {
            id: "custpage_convert_ei_button",
            label: translator.getString("inboundedocument.convert.button"),
            functionName:
                "convert(" +
                currRecord.id +
                ",'" +
                currRecord.type +
                "'," +
                currRecord.getValue(TRANSACTION_TYPE_FIELD) +
                ");",
        };
        convertButton = form.addButton(convertButton);
        //Greyout Convert Button, if transaction type is not selected
        var tranType = currRecord.getValue(TRANSACTION_FIELD);

        if (status === INCOMPLETE || hasLicenseBanner || !tranType) {
            convertButton.isDisabled = true;
        }

        var cancelButton = {
            id: "custpage_cancel_ei_button",
            label: translator.getString("inboundedocument.cancel.button"),
            functionName:
                "cancel(" + currRecord.id + ", '" + currRecord.type + "');",
        };
        form.addButton(cancelButton);
    }

    /**
     * Banner Holder Creator
     *
     * @param {Object} form Server Widget Form Object
     */
    function createBannerHolder(form) {
        var bannerMessageField = form.addField({
            id: "custpage_psg_ei_inbound_banner_msg",
            label: "Banner Message Holder",
            type: serverWidget.FieldType.INLINEHTML,
        });
        bannerMessageField.updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.OUTSIDEABOVE,
        });
        bannerMessageField.defaultValue = "<div></div>";
    }

    /**
     * Function to check the license and get the banner details
     *
     * @returns {Object}
     */
    function getLicenseBanner(subsidiaryId) {
        var hasLicenseBanner = false;
        var bannerMessage = "";
        var bannerType = "";
        var licenseInfo = licenseManager.getLicenseInfo();
        if (!licenseInfo.hasLicense) {
            var companyInfoCountry =
                freeCountryCheckHelper.getValueOfAllowedFreeCountry();

            if (licenseInfo.errorCode === NO_LICENSE_CLIENT_CODE) {
                hasLicenseBanner = true;
                bannerMessage = translator.getString(
                    NO_LICENSE_CLIENT_MSG_CODE
                );
            } else if (freeCountryCheckHelper.isOwAccount()) {
                if (!companyInfoCountry || companyInfoCountry.length === 0) {
                    hasLicenseBanner = true;
                    bannerMessage = translator.getString(
                        NO_FREE_COUNTRY_MSG_CODE
                    );
                } else if (
                    !freeCountryCheckHelper.ifFreeCountrySameAsInTxn(
                        subsidiaryId
                    )
                ) {
                    hasLicenseBanner = true;
                    bannerMessage = translator.getString(
                        TXN_COUNTRY_DIFFERENT_THAN_FREE_COUNTRY_MSG_CODE
                    );
                }
            }

            if (hasLicenseBanner) {
                bannerType = "WARNING";
            }
        }

        return {
            hasLicenseBanner: hasLicenseBanner,
            bannerMessage: bannerMessage,
            bannerType: bannerType,
        };
    }

    /**
     * Checks if the old status is already set to For Conversion / Converting
     *
     * @param oldRecord {Object} Old Record object
     * @returns {Boolean}
     */
    function isAlreadySetForConversionOrConverting(oldRecord) {
        var flag = false;
        if (
            oldRecord &&
            [FOR_CONVERSION, CONVERTING].indexOf(
                oldRecord.getValue(STATUS_FIELD)
            ) !== -1
        ) {
            flag = true;
        }

        return flag;
    }

    /**
     * Function checks if the entity is active, if not, will return "".
     * This is for audit trail logging purposes when entity is inactive
     *
     * @param entityId {String}
     * @returns {String}
     */
    function checkIfInactiveEntity(entityId) {
        var result = search.lookupFields({
            type: search.Type.ENTITY,
            id: entityId,
            columns: "isinactive",
        });

        var isInactive = result.isinactive;

        return isInactive ? "" : entityId;
    }

    /**
     * Banner Message Script Creator
     *
     * @param {String} bannerType The type of banner Info/Error/Warning
     * @param {String} message The message to show in the banner
     * @returns {String} The script string
     */
    function createBannerScript(bannerType, message) {
        var scriptStringArray = [];

        var borderColor = "";
        var backgroundColor = "";

        if (bannerType === "CONFIRMATION") {
            borderColor = "#2acc14";
            backgroundColor = "#D7FCCF";
        } else if (bannerType === "WARNING") {
            borderColor = "#ffc000";
            backgroundColor = "#FCF9CF";
        } else if (bannerType === "ERROR") {
            borderColor = "#d94141";
            backgroundColor = "#FCCFCF";
        } else if (bannerType === "INFORMATION") {
            borderColor = "#417ed9";
            backgroundColor = "#CFEEFC";
        }

        scriptStringArray.push(
            '<div style="border: 1px solid ' +
                borderColor +
                ";background-color: " +
                backgroundColor +
                ';width: 1000px;margin: 1em 0;padding: 1em; font-size: 1.1em;">'
        );
        scriptStringArray.push(message);
        scriptStringArray.push("</div>");

        return scriptStringArray.join("");
    }

    /**
     * Show the result of generation or sending of E-Document
     * @param {Object} form Server Widget Form Object
     * @param {Object} currRecord Current Record Object
     * @param {String} bannerType Indicates the type of banner
     * @param {String} bannerMessage The message to show in the banner
     */

    function showResultMessage(form, currRecord, bannerType, bannerMessage) {
        if (runtime.version === VERSION_2017_2) {
            //use html place holder to show banner message
            var bannerMessageHolderString = createBannerScript(
                bannerType,
                bannerMessage
            );
            var bannerMessageField = "custpage_psg_ei_inbound_banner_msg";
            currRecord.setValue({
                fieldId: bannerMessageField,
                value: bannerMessageHolderString,
            });
        } else {
            //use "N/ui/message" to send the message to client (supported from 2018.1 onwards)
            require(["N/ui/message"], function (message) {
                var messageType;

                if (bannerType === "CONFIRMATION") {
                    messageType = message.Type.CONFIRMATION;
                } else if (bannerType === "WARNING") {
                    messageType = message.Type.WARNING;
                } else if (bannerType === "ERROR") {
                    messageType = message.Type.ERROR;
                } else if (bannerType === "INFORMATION") {
                    messageType = message.Type.INFORMATION;
                }

                message
                    .create({
                        type: messageType,
                        message: bannerMessage,
                    })
                    .show({ sendToClient: true });
            });
        }
    }

    /**
     * Checks if current context does not belong to unsupported contexts.
     *
     * @returns {Boolean}
     */
    function isSupportedContext() {
        return (
            [
                runtime.ContextType.CSV_IMPORT,
                runtime.ContextType.CUSTOM_MASSUPDATE,
                runtime.ContextType.WEBSERVICES,
                runtime.ContextType.WEBSTORE,
            ].indexOf(runtime.executionContext) === -1
        );
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit,
    };
});
