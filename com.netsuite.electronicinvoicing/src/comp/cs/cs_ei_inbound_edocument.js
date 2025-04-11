/**
 * @preserve
 *
 * @NApiVersion 2.1
 * @NScriptName Inbound E-Document CS
 * @NScriptId _ei_inbound_edocument_cs
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

define([
    "../../app/einvoice/app_einvoice_inbound_edocument_validator",
    "N/ui/message",
    "N/url",
    "N/https",
    "../../lib/wrapper/ns_wrapper_currentrecord",
    "../../lib/edocfile_loading_service_caller",
    "N/runtime",
    "../../lib/app/app_transaction_type_map",
    "../../lib/translator",
    "../../lib/string_formatter",
], function (
    inboundEdocValidator,
    message,
    url,
    https,
    currentRecordModule,
    edocFileLoadService,
    runtime,
    transactionTypeMap,
    translator,
    stringFormatter
) {
    var INBOUND_RECORD_TYPE = "customrecord_psg_ei_inbound_edoc";
    var VENDOR_FLD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FLD = "custrecord_psg_ei_inbound_customer";
    var TRANSACTION_TYPE_FLD = "custrecord_psg_ei_inbound_transtype";
    var EDOCUMENT_TEMPLATE_FLD_VENDOR = "custrecord_psg_ei_inbound_template";
    var EDOCUMENT_TEMPLATE_FLD_CUSTOMER =
        "custrecord_psg_ei_inbound_temp_customer";
    var FILENAME_FLD = "name";
    var EDOCUMENT_CONTENT_FLD = "custrecord_psg_ei_inbound_content";
    var ATTACH_EDOC_FLD = "custrecord_psg_ei_attach_edoc";
    var ATTACH_PDF_FLD = "custrecord_psg_ei_attach_pdf";
    var EDOC_PACKAGE_ENTITY_FLD_VENDOR =
        "custrecord_psg_ei_edoc_standard_vendor";
    var EDOC_PACKAGE_ENTITY_FLD_CUSTOMER =
        "custrecord_psg_ei_edoc_standard_customer";

    var CONVERT_SU_SCRIPT = "customscript_ei_conversion_service_su";
    var CONVERT_SU_DEPLOY = "customdeploy_ei_conversion_service_su";
    var CANCEL_SU_SCRIPT = "customscript_ei_cancellation_service_su";
    var CANCEL_SU_DEPLOY = "customdeploy_ei_cancellation_service_su";
    var SOURCE_TEMPLATE_SU_SCRIPT = "customscript_ei_xsdvalidation_service_su";
    var SOURCE_TEMPLATE_SU_DEPLOY = "customdeploy_ei_xsdvalidation_service_su";
    var PREVIEW_SU_SCRIPT = "customscript_ei_content_service_su";
    var PREVIEW_SU_DEPLOY = "customdeploy_ei_content_service_su";

    var CONVERT_INFORMATION_CODE = "inboundedocument.convert.information";
    var CONVERT_INFORMATION_MSG =
        "Conversion of this inbound E-Document is in progress.";
    var CONVERT_ALREADY_INPROGRESS_INFORMATION_CODE =
        "inboundedocument.convert.alreadyinprogress.information";
    var CONVERT_ALREADY_INPROGRESS_INFORMATION_MSG =
        "Conversion of this inbound E-Document is already in progress.";

    var DUPLICATE_SO_CONFIRMATION_CODE =
        "inboundedocument.convert.duplicate.so.confirmation";
    var DUPLICATE_SO_CONFIRMATION_MSG =
        "Sales order with the same PO# already exists. Do you want to create a new sales order with the same PO#?";

    var CANCEL_CONFIRMATION_CODE = "inboundedocument.cancel.confirmation";
    var CANCEL_CONFIRMATION_MSG =
        "Are you sure you want to cancel this inbound e-document?";

    var VERSION_2017_2 = "2017.2";
    var DOC_TYPE = "inbound";
    var TRANS_TYPE_FLD_ON_FORM = "custpage_psg_ei_inbound_transtype";

    var stringMap = [];
    var converting = false;

    /**
     * Calls the translation service and puts values inside stringMap
     */
    function getTranslations() {
        if (stringMap.length === 0) {
            stringMap = translator.getStringMap([
                CONVERT_INFORMATION_CODE,
                CONVERT_ALREADY_INPROGRESS_INFORMATION_CODE,
                CANCEL_CONFIRMATION_CODE,
            ]);
            CONVERT_INFORMATION_MSG =
                stringMap[CONVERT_INFORMATION_CODE] || CONVERT_INFORMATION_MSG;
            DUPLICATE_SO_CONFIRMATION_MSG =
                stringMap[DUPLICATE_SO_CONFIRMATION_CODE] ||
                DUPLICATE_SO_CONFIRMATION_MSG;
            CONVERT_ALREADY_INPROGRESS_INFORMATION_MSG =
                stringMap[CONVERT_ALREADY_INPROGRESS_INFORMATION_CODE] ||
                CONVERT_ALREADY_INPROGRESS_INFORMATION_MSG;
            CANCEL_CONFIRMATION_MSG =
                stringMap[CANCEL_CONFIRMATION_CODE] || CANCEL_CONFIRMATION_MSG;
        }
    }

    function pageInit(context) {
        var currentRec = context.currentRecord;
        var tranType = currentRec.getValue(TRANS_TYPE_FLD_ON_FORM);
        var customerField = currentRec.getField(CUSTOMER_FLD);
        var vendorField = currentRec.getField(VENDOR_FLD);
        var customerTemplateFld = currentRec.getField(
            EDOCUMENT_TEMPLATE_FLD_CUSTOMER
        );
        var vendorTemplateFld = currentRec.getField(
            EDOCUMENT_TEMPLATE_FLD_VENDOR
        );

        vendorTemplateFld.label =
            translator.getString(
                "label.ui.custrecord.psg.ei.inbound.template.entity"
            ) || "E-Document Template";
        customerTemplateFld.label =
            translator.getString(
                "label.ui.custrecord.psg.ei.inbound.template.entity"
            ) || "E-Document Template";
        if (transactionTypeMap.isSalesTransaction(tranType)) {
            showOrHideFlds(vendorField, vendorTemplateFld, false);
            customerField.isMandatory = true;
            customerTemplateFld.isMandatory = true;
        } else {
            showOrHideFlds(customerField, customerTemplateFld, false);
            vendorField.isMandatory = true;
            vendorTemplateFld.isMandatory = true;
        }
    }

    function fieldChanged(context) {
        var currentRec = context.currentRecord;
        var vendor = currentRec.getValue(VENDOR_FLD);
        var customer = currentRec.getValue(CUSTOMER_FLD);
        var attachEdoc = currentRec.getValue(ATTACH_EDOC_FLD);
        var edocTemplate = currentRec.getValue(EDOCUMENT_TEMPLATE_FLD_VENDOR);
        var customerField = currentRec.getField(CUSTOMER_FLD);
        var vendorField = currentRec.getField(VENDOR_FLD);
        var customerTemplateFld = currentRec.getField(
            EDOCUMENT_TEMPLATE_FLD_CUSTOMER
        );
        var vendorTemplateFld = currentRec.getField(
            EDOCUMENT_TEMPLATE_FLD_VENDOR
        );

        if (context.fieldId === TRANS_TYPE_FLD_ON_FORM) {
            var transTypeOnFrom = currentRec.getValue(TRANS_TYPE_FLD_ON_FORM);

            currentRec.setValue({
                fieldId: TRANSACTION_TYPE_FLD,
                value: transTypeOnFrom,
            });

            if (transactionTypeMap.isSalesTransaction(transTypeOnFrom)) {
                showOrHideFlds(vendorField, vendorTemplateFld, false);
                currentRec.setValue(VENDOR_FLD, "");
                showOrHideFlds(customerField, customerTemplateFld, true);
                edocTemplate = currentRec.getValue(
                    EDOCUMENT_TEMPLATE_FLD_CUSTOMER
                );
            } else {
                showOrHideFlds(customerField, customerTemplateFld, false);
                currentRec.setValue(CUSTOMER_FLD, "");
                showOrHideFlds(vendorField, vendorTemplateFld, true);
            }
        }

        if (
            [TRANSACTION_TYPE_FLD, ATTACH_EDOC_FLD].indexOf(context.fieldId) !==
            -1
        ) {
            if (context.fieldId === ATTACH_EDOC_FLD) {
                currentRec.setValue({
                    fieldId: EDOCUMENT_CONTENT_FLD,
                    value: "",
                });
            }

            var edocContent = currentRec.getValue(EDOCUMENT_CONTENT_FLD);
            var hasFileOrContent = attachEdoc || edocContent;
            var hasEntity = customer || vendor;
            if (hasFileOrContent && !edocTemplate && hasEntity) {
                sourceEdocTemplate(currentRec);
            }
        }
    }

    function saveRecord(context) {
        var currentRec = context.currentRecord;
        var transType = currentRec.getValue(TRANSACTION_TYPE_FLD);
        var customerFld = currentRec.getField(CUSTOMER_FLD);
        var vendorFld = currentRec.getField(VENDOR_FLD);
        var xmlFld = currentRec.getField(ATTACH_EDOC_FLD);
        var missingFields = [];
        var popUpMessage =
            translator.getString("alert.ui.custrecord.psg.ei.inbound") ||
            "Please enter value(s) for: {FIELDS_LIST}";

        if (transactionTypeMap.isSalesTransaction(transType)) {
            if (!currentRec.getValue(CUSTOMER_FLD)) {
                missingFields.push(customerFld.label);
            }
            if (!currentRec.getValue(EDOCUMENT_TEMPLATE_FLD_CUSTOMER)) {
                missingFields.push(
                    translator.getString(
                        "label.ui.custrecord.psg.ei.inbound.template.entity"
                    ) || "E-Document Template"
                );
            }
        } else {
            if (!currentRec.getValue(VENDOR_FLD)) {
                missingFields.push(vendorFld.label);
            }
            if (!currentRec.getValue(EDOCUMENT_TEMPLATE_FLD_VENDOR)) {
                missingFields.push(
                    translator.getString(
                        "label.ui.custrecord.psg.ei.inbound.template.entity"
                    ) || "E-Document Template"
                );
            }
        }

        if (
            !(
                currentRec.getValue(ATTACH_EDOC_FLD) ||
                currentRec.getValue(EDOCUMENT_CONTENT_FLD)
            )
        ) {
            missingFields.push(xmlFld.label);
        }

        if (missingFields.length) {
            var params = {
                FIELDS_LIST: missingFields.join(", "),
            };
            stringFormatter.setString(popUpMessage);
            stringFormatter.replaceParameters(params);
            popUpMessage = stringFormatter.toString();
            alert(popUpMessage);
            return false;
        }

        var isValid = true;
        var result;

        var edocFileId = currentRec.getValue({
            fieldId: ATTACH_EDOC_FLD,
        });

        var pdfFileId = currentRec.getValue({
            fieldId: ATTACH_PDF_FLD,
        });

        // Call service for loading EDoc file information.
        var edocFile = edocFileLoadService.loadEdocFile(edocFileId);
        var pdfFile = pdfFileId
            ? edocFileLoadService.loadEdocFile(pdfFileId)
            : null;

        // Validate Filename
        var filename = edocFile.name;

        var pdfFileName;
        if (pdfFile) {
            pdfFileName = pdfFile.name;
        }

        if (filename) {
            result = inboundEdocValidator.validateFilename(
                filename,
                pdfFileName
            );
            if (!result.isSuccessful()) {
                alert(result.getMessage());
                isValid = false;
            } else {
                currentRec.setValue({
                    fieldId: FILENAME_FLD,
                    value: filename,
                });
            }

            // Validate E-Document Content
            if (isValid) {
                var edocContent = edocFile.content;
                result =
                    inboundEdocValidator.validateEDocumentContent(edocContent);
                if (!result.isSuccessful()) {
                    alert(result.getMessage());
                    isValid = false;
                } else {
                    currentRec.setValue({
                        fieldId: EDOCUMENT_CONTENT_FLD,
                        value: edocContent,
                    });
                }
            }
        }

        return isValid;
    }

    /**
     * Automatically sets the template based on record values
     *
     * @param {Object} currentRec Record Object
     */
    function sourceEdocTemplate(currentRec) {
        var suiteletURL = url.resolveScript({
            scriptId: SOURCE_TEMPLATE_SU_SCRIPT,
            deploymentId: SOURCE_TEMPLATE_SU_DEPLOY,
        });
        var edocPackage = currentRec.getValue(EDOC_PACKAGE_ENTITY_FLD_VENDOR);
        var tranType = currentRec.getValue(TRANSACTION_TYPE_FLD);
        var entityId = currentRec.getValue(VENDOR_FLD);
        var templateField = EDOCUMENT_TEMPLATE_FLD_VENDOR;

        if (transactionTypeMap.isSalesTransaction(tranType)) {
            entityId = currentRec.getValue(CUSTOMER_FLD);
            edocPackage = currentRec.getValue(EDOC_PACKAGE_ENTITY_FLD_CUSTOMER);
            templateField = EDOCUMENT_TEMPLATE_FLD_CUSTOMER;
        }

        https.post
            .promise({
                url: suiteletURL,
                body: {
                    entityId,
                    edocPackage,
                    tranType,
                    xmlFile: currentRec.getValue(ATTACH_EDOC_FLD),
                    xmlContent: currentRec.getValue(EDOCUMENT_CONTENT_FLD),
                },
            })
            .then(function (response) {
                var result = JSON.parse(response.body);

                currentRec.setValue({
                    fieldId: templateField,
                    value: result.id,
                });
            });
    }

    function convert(recId, recType, tranType) {
        getTranslations();

        if (converting) {
            alert(CONVERT_ALREADY_INPROGRESS_INFORMATION_MSG);
        } else {
            converting = true;
            var currentRec = currentRecordModule.get();
            showProcessMessage(currentRec, CONVERT_INFORMATION_MSG);

            var suiteletURL = url.resolveScript({
                scriptId: CONVERT_SU_SCRIPT,
                deploymentId: CONVERT_SU_DEPLOY,
            });
            https.post
                .promise({
                    url: suiteletURL,
                    body: {
                        recId: recId,
                        recType: recType,
                        tranType: tranType,
                        isParseEdoc: true,
                    },
                })
                .then(function (parseResponse) {
                    var responseObj = JSON.parse(parseResponse.body);
                    if (responseObj.success) {
                        if (
                            responseObj.data.duplicateSoArr.length &&
                            !confirm(DUPLICATE_SO_CONFIRMATION_MSG)
                        ) {
                            throw responseObj;
                        }
                    } else {
                        throw responseObj;
                    }
                    return {
                        content: responseObj.data.content,
                        duplicateSoArr: responseObj.data.duplicateSoArr,
                    };
                })
                .then(function (parsedContentObj) {
                    return https.post.promise({
                        url: suiteletURL,
                        body: {
                            recId: recId,
                            recType: recType,
                            tranType: tranType,
                            parsedContent: JSON.stringify(
                                parsedContentObj.content
                            ),
                            duplicateSoData: JSON.stringify(
                                parsedContentObj.duplicateSoArr
                            ),
                        },
                    });
                })
                .then(function (createTransactionResult) {
                    var responseObj = JSON.parse(createTransactionResult.body);
                    if (
                        responseObj.success &&
                        (responseObj.data.messageType === "c" ||
                            responseObj.data.messageType === "i")
                    ) {
                        var urlParameters = {};
                        if (responseObj.data.duplicateSoArr.length) {
                            urlParameters = {
                                ei_process: "conversion",
                                ei_bid: responseObj.data.bundleId,
                                ei_mc: responseObj.data.messageCode,
                                ei_t: responseObj.data.messageType,
                            };
                        }
                        // Redirect to created inbound transaction
                        var tranUrl = url.resolveRecord({
                            recordType: responseObj.data.transactionType,
                            recordId: responseObj.data.transactionId,
                            isEditMode: false,
                            params: urlParameters,
                        });
                        window.location = tranUrl + "&whence=";
                    } else {
                        throw responseObj;
                    }
                })
                .catch(function (response) {
                    var responseObj = response;
                    var urlParameters = {};

                    if (!responseObj.data.reload) {
                        urlParameters = {
                            ei_process: "conversion",
                            ei_bid: responseObj.data.bundleId,
                            ei_mc: responseObj.data.messageCode,
                            ei_t: responseObj.data.messageType,
                        };
                    }

                    // Redirect to inbound e-document record.
                    var recordURL = url.resolveRecord({
                        recordType: recType,
                        recordId: recId,
                        isEditMode: false,
                        params: urlParameters,
                    });
                    window.location = recordURL + "&whence=";
                });
        }
    }

    function cancel(recId, recType) {
        getTranslations();

        if (converting) {
            alert(CONVERT_INFORMATION_MSG);
        } else {
            var toCancel = confirm(CANCEL_CONFIRMATION_MSG);
            if (toCancel) {
                var suiteletURL = url.resolveScript({
                    scriptId: CANCEL_SU_SCRIPT,
                    deploymentId: CANCEL_SU_DEPLOY,
                });

                var response = https.post({
                    url: suiteletURL,
                    body: {
                        recId: recId,
                        recType: recType,
                    },
                });

                var result = JSON.parse(response.body);

                var urlParameters = {
                    ei_process: "cancel",
                    ei_bid: result.data.bundleId,
                    ei_mc: result.data.messageCode,
                    ei_t: result.data.messageType,
                };

                // Redirect to inbound e-document record.
                var recordURL = url.resolveRecord({
                    recordId: recId,
                    recordType: recType,
                    isEditMode: false,
                    params: urlParameters,
                });

                window.location = recordURL + "&whence=";
            }
        }
    }

    function preview(recId, fileType) {
        var parameters = {
            edocId: recId,
            fileFormat: fileType,
            doctype: DOC_TYPE,
            type: INBOUND_RECORD_TYPE,
            command: "preview",
        };

        var suiteletURL = url.resolveScript({
            scriptId: PREVIEW_SU_SCRIPT,
            deploymentId: PREVIEW_SU_DEPLOY,
            params: parameters,
        });

        window.open(
            suiteletURL,
            "previewWindow",
            "location=no,width=600,height=500,menubar=yes,scrollbars=yes,resizable=yes"
        );
    }

    /**
     * Show generated own 'banner' for conversion in progress
     *
     * @param {Object} currentRec Current Record object
     * @param {String} bannerMessage Banner message
     */
    function showProcessMessage(currentRec, bannerMessage) {
        if (runtime.version === VERSION_2017_2) {
            var bannerMessageField = "custpage_psg_ei_inbound_banner_msg";

            var htmlStringArray = [];

            htmlStringArray.push(
                '<div style="border: 1px solid #417ed9;background-color: #CFEEFC;;width: 1000px;margin: 1em 0;padding: 1em; font-size: 1.1em;">'
            );
            htmlStringArray.push(bannerMessage);
            htmlStringArray.push("</div>");

            var htmlString = htmlStringArray.join("");

            currentRec.setValue({
                fieldId: bannerMessageField,
                value: htmlString,
            });
        } else {
            message
                .create({
                    type: message.Type.INFORMATION,
                    message: bannerMessage,
                })
                .show();
        }
    }
    /**
     * Hides or shows the entity field depending on the boolean value
     *
     * @param entityField Entity field
     * @param value Boolean value
     */
    function showOrHideFlds(entityField, templateField, value) {
        entityField.isVisible = value;
        entityField.isDisplay = value;
        templateField.isVisible = value;
        templateField.isDisplay = value;
        entityField.isMandatory = value;
        templateField.isMandatory = value;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        saveRecord: saveRecord,
        convert: convert,
        cancel: cancel,
        preview: preview,
    };
});
