/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 *

 * This class notifies the user who triggered the sending of e-document about the status of the sending.

 * This email most likely will contain the number of e-document processed.

 *

 * Version    Date            Author           Remarks

 * 1.00       19 Oct 2015         ldimayuga

 *

 * @NModuleScope TargetAccount

 */

define([
    "../../data/dao_employee",

    "N/email",

    "N/error",

    "N/file",

    "N/config",

    "N/search",

    "N/url",

    "../../lib/translator",

    "../../lib/string_formatter",

    "../../lib/batch_email_sender",

    "./app_einvoice_outbound_rendered_content_manager",
    "./app_einvoice_subsidiary_pref_getter",
], function (
    employeeDao,
    email,
    error,
    file,
    config,
    search,
    url,
    translator,
    stringFormatter,
    batchSender,
    contentManager,
    subsidiaryPrefGetter
) {
    var NOTIF_RECIPIENT_FLD = "custrecord_psg_ei_sub_notif_recipient";
    var EMAIL_CUSTOMIZATION_FLD = "custrecord_psg_ei_sub_email_custom";

    /**

         * notifySending - This function notifies the creator of the batch regarding the details of the e-document sending

         * @param batchId {String/Number} - internal Id of the batchOwner

         * @param details {Array} -  details for the batch [{trannum: transactionnumber,

         *							error: e.name : e.message}

         *                            }]

         * @params errorCount {Number} - total number of errors

         */

    function notifyBatchOwner(batchOwner, details, errorCount) {
        var BATCH_ID_REQ_MSG =
            "Batch Owner is a required parameter for validating the e-document content.";

        var BATCH_OWNER_EMAIL_SUBJECT = translator.getString(
            "email.batchownernotification.subject"
        );

        var BATCH_OWNER_EMAIL_BODY = translator.getString(
            "email.batchownernotification.body"
        );

        if (!batchOwner) {
            log.error("REQUIRED_PARAM_MISSING", BATCH_ID_REQ_MSG);

            throw error.create({
                name: "REQUIRED_PARAM_MISSING",

                message: BATCH_ID_REQ_MSG,

                notifyOff: true,
            });
        }

        var sent = details.length - errorCount;

        var attachment = [];

        var parameters = {
            SENT: sent,

            TOTAL: details.length,
        };

        stringFormatter.setString(BATCH_OWNER_EMAIL_BODY);

        stringFormatter.replaceParameters(parameters);

        BATCH_OWNER_EMAIL_BODY = stringFormatter.toString();

        var csvConfig = {
            filename: "EDocument_Sending_Details.csv",

            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactionnumber"
                    ),

                    resultKey: "trannum",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactiontype"
                    ),

                    resultKey: "type",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.details"
                    ),

                    resultKey: "error",
                },
            ],
        };

        try {
            var detailsFile = createCSV(
                csvConfig.filename,
                details,
                csvConfig.columns
            );

            attachment.push(detailsFile);

            var adminUser = getFirstActiveAdmin();

            email.send({
                author: adminUser,

                recipients: batchOwner,

                subject: BATCH_OWNER_EMAIL_SUBJECT,

                body: BATCH_OWNER_EMAIL_BODY,

                attachments: attachment,

                relatedRecords: {
                    entityId: adminUser,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**

         * notifyConversion - This function notifies the creator of the batch regarding the details of the e-document conversion.

         *

         * @param batchId {String/Number} - internal Id of the batchOwner

         * @param details {Array} -  details for the batch [{trannum: transactionnumber,

         *							error: e.name : e.message}

         *                            }]

         * @params errorCount {Number} - total number of errors

         */

    function notifyConversionBatchOwner(batchOwner, details, errorCount) {
        var BATCH_ID_REQ_MSG =
            "Batch Owner is a required parameter for validating the e-document content.";

        var BATCH_OWNER_EMAIL_SUBJECT = translator.getString(
            "email.batchownerconvertnotification.subject"
        );

        var BATCH_OWNER_EMAIL_BODY = translator.getString(
            "email.batchownerconvertnotification.body"
        );

        if (!batchOwner) {
            log.error("REQUIRED_PARAM_MISSING", BATCH_ID_REQ_MSG);

            throw error.create({
                name: "REQUIRED_PARAM_MISSING",

                message: BATCH_ID_REQ_MSG,

                notifyOff: true,
            });
        }

        var converted = details.length - errorCount;

        var parameters = {
            CONVERTED: converted,

            TOTAL: details.length,
        };

        stringFormatter.setString(BATCH_OWNER_EMAIL_BODY);

        stringFormatter.replaceParameters(parameters);

        BATCH_OWNER_EMAIL_BODY = stringFormatter.toString();

        var csvConfig = {
            filename: "EDocument_Conversion_Details.csv",

            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.internalid"
                    ),

                    resultKey: "recId",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.vendor"
                    ),

                    resultKey: "vendorName",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.customer"
                    ) || "Customer",

                    resultKey: "customerName",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.details"
                    ),

                    resultKey: "error",
                },
            ],
        };

        try {
            var attachment = [];

            var detailsFile = createCSV(
                csvConfig.filename,
                details,
                csvConfig.columns
            );

            attachment.push(detailsFile);

            var adminUser = getFirstActiveAdmin();

            email.send({
                author: adminUser,

                recipients: batchOwner,

                subject: BATCH_OWNER_EMAIL_SUBJECT,

                body: BATCH_OWNER_EMAIL_BODY,

                attachments: attachment,

                relatedRecords: {
                    entityId: adminUser,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**

         * notifyRecipient - This function sends an email to the customer that an e-document was generated for his

         * transaction.

         * @param batchOwner {String} - id of the batch owner (sender)

         * @param recipientList {Object} - recipients of the email, Interal ID or array of Email Addresses.

         * @param invoiceDetails {Object} -  invoiceDetails = {

         *						number: transaction number,

         *						poNumber: po number,

         *						eInvoiceContent: content

         * 					};

         *

         */

    function notifyRecipient(batchOwner, recipientList, invoiceDetails) {
        var attachments = [];

        var poNum;

        var tranId;

        var transType;

        var attachmentFileIds;

        var transactionSubsidiary;

        var companyInfo = config.load(config.Type.COMPANY_INFORMATION);

        var companyName = companyInfo.getValue("companyname");

        if (invoiceDetails) {
            var fileContents = invoiceDetails.eInvoiceContent;

            poNum = invoiceDetails.poNumber;

            tranId = invoiceDetails.number;

            transType = invoiceDetails.transactionType;

            transactionSubsidiary = invoiceDetails.subsidiary;

            attachmentFileIds = invoiceDetails.attachmentFileIds;

            attachments.push(createEDocAttachmentFile(fileContents));

            for (var i = 0; i < attachmentFileIds.length; i++) {
                attachments.push(getFile(attachmentFileIds[i]));
            }
        }

        var emailData = {
            transType: transType,

            tranId: tranId,

            companyName: companyName,

            poNum: poNum,

            transactionSubsidiary: transactionSubsidiary,
        };

        var customTemplates = getCustomTemplateStrings(
            transactionSubsidiary,
            companyInfo
        );
        emailData.customTemplates = customTemplates;

        var subject = getEmailSubjectString(emailData);

        var message = getEmailBodyString(emailData);
        try {
            batchSender.send({
                author: batchOwner,

                recipients: recipientList,

                subject: subject,

                body: message,

                attachments: attachments,
            });
        } catch (e) {
            throw error.create({
                name: "EINVOICE_NOTIFIER_ERROR",

                message: e.name + ": " + e.message,

                notifyOff: true,
            });
        }
    }

    function getEmailSubjectString(emailData) {
        var transType = emailData.transType;

        var tranId = emailData.tranId;

        var companyName = emailData.companyName;

        var poNum = emailData.poNum;

        var subjectTemplate = emailData.customTemplates.subjectTemplate;

        var params;

        if (subjectTemplate !== "") {
            //subject is customized

            params = {
                TRANTYPE: transType,
                TRANID: tranId,
                COMPANYNAME: companyName,
                PONUM: poNum,
            };
        } else {
            subjectTemplate = translator.getString(
                "email.recipientnotification.subject"
            ); //E-document from {COMPANYNAME}

            params = { COMPANYNAME: companyName };

            if (poNum) {
                subjectTemplate = translator.getString(
                    "email.recipientnotification.po.subject"
                ); //E-document Generated for PO #{PONUM}

                params = { PONUM: poNum };
            }
        }

        var subject = getFinalString(subjectTemplate, params);

        log.debug("Subject", subject);

        return subject;
    }

    function getEmailBodyString(emailData) {
        var transType = emailData.transType;

        var tranId = emailData.tranId;

        var companyName = emailData.companyName;

        var poNum = emailData.poNum;

        var bodyTemplate = emailData.customTemplates.bodyTemplate;

        var params;

        if (bodyTemplate !== "") {
            //body is customized

            params = {
                TRANTYPE: transType,
                TRANID: tranId,
                COMPANYNAME: companyName,
                PONUM: poNum,
            };
        } else {
            bodyTemplate = translator.getString(
                "email.recipientnotification.body"
            ); //Greetings! <br /><br />The e-document for {TYPE} #{TRANID} has been generated.<br />Please see the attached e-document file for details.<br /><br />Thank you,<br />{COMPANYNAME}

            params = {
                TYPE: transType,
                TRANID: tranId,
                COMPANYNAME: companyName,
            };

            if (poNum) {
                bodyTemplate = translator.getString(
                    "email.recipientnotification.po.body"
                ); //Greetings! <br /><br />The e-document for PO #{PONUM} has been generated.<br />Please see the attached e-document file for details.<br /><br />Thank you,<br />{COMPANYNAME}

                params = { PONUM: poNum, COMPANYNAME: companyName };
            }
        }

        var message = getFinalString(bodyTemplate, params);

        log.debug("Body", message);

        return message;
    }

    var SUBJECT_TEMPLATE_FLD = "custrecord_psg_ei_subject_template";

    var BODY_TEMPLATE_FLD = "custrecord_psg_ei_body_template";

    var EMAIL_CUSTOM_RECORD = "customrecord_psg_ei_email_custom";

    function getCustomTemplateStrings(transactionSubsidiary, companyInfo) {
        var emailCustomId = 0;
        var subsidiaryFieldScriptIds = [EMAIL_CUSTOMIZATION_FLD];
        var subsidiaryPreferencesObj = {};
        if (transactionSubsidiary) {
            subsidiaryPreferencesObj =
                subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                    transactionSubsidiary,
                    subsidiaryFieldScriptIds
                );
            emailCustomId = subsidiaryPreferencesObj[EMAIL_CUSTOMIZATION_FLD];
        }

        if (!emailCustomId) {
            //if no customization at subsidiary level, should check at company info level
            var parentCompanySubsidiaryId =
                subsidiaryPrefGetter.getParentSubsidiaryId();
            subsidiaryPreferencesObj =
                subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                    parentCompanySubsidiaryId,
                    subsidiaryFieldScriptIds
                );
            emailCustomId = subsidiaryPreferencesObj[EMAIL_CUSTOMIZATION_FLD];
        }

        var stringTemplates = {
            subjectTemplate: "",

            bodyTemplate: "",
        };

        if (emailCustomId) {
            var emailCustomLookup = search.lookupFields({
                type: EMAIL_CUSTOM_RECORD,

                id: emailCustomId,

                columns: ["name", SUBJECT_TEMPLATE_FLD, BODY_TEMPLATE_FLD],
            });
            stringTemplates.subjectTemplate =
                emailCustomLookup[SUBJECT_TEMPLATE_FLD];

            stringTemplates.bodyTemplate = emailCustomLookup[BODY_TEMPLATE_FLD];
        }
        return stringTemplates;
    }

    /*

         * This function returns final string after replacing the placeholders keys in stringTemplate with values from params

         */

    function getFinalString(stringTemplate, params) {
        stringFormatter.setString(stringTemplate);

        stringFormatter.replaceParameters(params);

        return stringFormatter.toString();
    }

    /**

         * createEDocAttachmentFile - This function creates the e-Invoice email attachment.

         * @param content {String} - e-document content

         * @returns eiFile {Object} - file object to be attached to the email

         */

    function createEDocAttachmentFile(content) {
        var FILENAME = "E-document";

        var extension = contentManager.getExtensionForContent(content);

        extension = extension === "" ? contentManager.XML_EXTENSION : extension; //defaulting to xml extension

        FILENAME += "." + extension;

        var fileType = file.Type.XMLDOC;

        if (extension === contentManager.JSON_EXTENSION) {
            fileType = file.Type.JSON;
        }

        return file.create({
            name: FILENAME,

            fileType: fileType,

            contents: content,
        });
    }

    function getFile(fileId) {
        return file.load({ id: fileId });
    }

    /**

         *  notifyGenerationError - This function notifies the creator of the transaction when there are errors

         *  encountered in the generation of e-document.

         *

         *  NOTE: this should ideally be the user who last modified the transaction but

         *  that field is not yet exposed.

         *

         * @param owner

         * @param errorValues

         * @returns undefined

         */

    function notifyGenerationError(owner, errorValues) {
        var EMAIL_SUBJECT = translator.getString(
            "email.generationerrornotification.subject"
        );

        var EMAIL_BODY = translator.getString(
            "email.generationerrornotification.body"
        );

        var EMAIL_ADMIN_WARNING_MSG = translator.getString(
            "email.adminwarningmsg.body"
        );

        var csvConfig = {
            filename: "EDocument_Generation_Error_List.csv",

            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactionnumber"
                    ),

                    resultKey: "trannum",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactiontype"
                    ),

                    resultKey: "type",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.details"
                    ),

                    resultKey: "error",
                },
            ],
        };

        try {
            var errorFile = createCSV(
                csvConfig.filename,
                errorValues,
                csvConfig.columns
            );

            var notifRecipientObj = getNotificationRecipient();

            if (notifRecipientObj.isAdministrators) {
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }

            batchSender.send({
                author: owner,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                attachments: [errorFile],

                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**

         *  notifyConversionError - This function notifies the recipient when there are errors

         *  encountered in the conversion of inbound e-document.

         *

         * @param recipient

         * @param details

         */

    function notifyConversionError(owner, details) {
        var EMAIL_SUBJECT = translator.getString(
            "email.conversionerrornotification.subject"
        );

        var EMAIL_BODY = translator.getString(
            "email.conversionerrornotification.body"
        );

        var EMAIL_ADMIN_WARNING_MSG = translator.getString(
            "email.adminwarningmsg.body"
        );

        var csvConfig = {
            filename: "EDocument_Conversion_Error_List.csv",

            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.internalid"
                    ),

                    resultKey: "id",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.vendor"
                    ),

                    resultKey: "vendorName",
                },
                {
                    label:
                        translator.getString(
                            "email.attachment.collabel.customer"
                        ) || "Customer",
                    resultKey: "customerName",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.details"
                    ),

                    resultKey: "message",
                },
            ],
        };

        try {
            var errorFile = createCSV(
                csvConfig.filename,
                details,
                csvConfig.columns
            );

            var notifRecipientObj = getNotificationRecipient();

            if (notifRecipientObj.isAdministrators) {
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }

            batchSender.send({
                author: owner,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                attachments: [errorFile],

                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**
         *  notifyConversionError - This function notifies the recipient when there are errors
         *  encountered in the conversion of NSEB inbound document to inbound e-document.
         *
         * @param recipient
         * @param details
         */
    function notifyNSEBinboundConversionError(owner, details) {
        var EMAIL_SUBJECT = translator.getString(
            "email.nsebinboundconversionerrornotification.subject"
        );
        var EMAIL_BODY = translator.getString(
            "email.nsebinboundconversionerrornotification.body"
        );
        var EMAIL_ADMIN_WARNING_MSG = translator.getString(
            "email.adminwarningmsg.body"
        );
        var csvConfig = {
            filename: "NSEB_Inbound_Conversion_Error_List.csv",
            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.nsebinboundinternalid"
                    ),
                    resultKey: "nsebInboundDocId",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.errordetails"
                    ),
                    resultKey: "errorDetails",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.nsebinboundrecordurl"
                    ),
                    resultKey: "linkToNSEBDoc",
                },
            ],
        };
        try {
            var errorFile = createCSV(
                csvConfig.filename,
                details,
                csvConfig.columns
            );
            var notifRecipientObj = getNotificationRecipient();
            log.debug("notifRecipientObj", notifRecipientObj);
            if (notifRecipientObj.isAdministrators) {
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }
            batchSender.send({
                author: owner,
                recipients: notifRecipientObj.recipient,
                subject: EMAIL_SUBJECT,
                body: EMAIL_BODY,
                attachments: [errorFile],
                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**

         *  notifySendingError - This function notifies the recipient when there are errors

         *  encountered in the sending of e-document.

         *

         * @param recipient

         * @param errorValues

         */

    function notifySendingError(owner, errorValues) {
        var EMAIL_SUBJECT = translator.getString(
            "email.sendingerrornotification.subject"
        );

        var EMAIL_BODY = translator.getString(
            "email.sendingerrornotification.body"
        );

        var EMAIL_ADMIN_WARNING_MSG = translator.getString(
            "email.adminwarningmsg.body"
        );

        var csvConfig = {
            filename: "EDocument_Sending_Error_List.csv",

            columns: [
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactionnumber"
                    ),

                    resultKey: "trannum",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.transactiontype"
                    ),

                    resultKey: "type",
                },
                {
                    label: translator.getString(
                        "email.attachment.collabel.details"
                    ),

                    resultKey: "error",
                },
            ],
        };

        try {
            var errorFile = createCSV(
                csvConfig.filename,
                errorValues,
                csvConfig.columns
            );

            var notifRecipientObj = getNotificationRecipient();

            if (notifRecipientObj.isAdministrators) {
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }

            batchSender.send({
                author: owner,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                attachments: [errorFile],

                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    /**

         *  notifyLicenseCheckError - This function notifies the recipient when it is found that no active license is present

         *  and no free country is set in the account

         *

         * @param recipient

         */

    function notifyLicenseCheckError(owner) {
        var EMAIL_SUBJECT = translator.getString(
            "email.nolicensenofreecountry.errornotification.subject"
        );

        var EMAIL_BODY = translator.getString(
            "email.nolicensenofreecountry.errornotification.body"
        );

        var EMAIL_ADMIN_WARNING_MSG = translator.getString(
            "email.adminwarningmsg.body"
        );

        try {
            var notifRecipientObj = getNotificationRecipient();

            if (notifRecipientObj.isAdministrators) {
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }

            batchSender.send({
                author: owner,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_LICENSE_CHECK_NOTIFIER_ERROR", e);
        }
    }

    /**
     *  notifyAvalaraLicenseIsAbsent - This function notifies the e-document recipient/administrators when nseb/avalara license(s) are not present
     *  and there are avalara transactions which need to be processed by bulk MR's
     *
     * @param owner
     * @param parameters
     * @param isGenerate
     */
    function notifyAvalaraLicenseIsAbsent(owner, EMAIL_BODY) {
        var EMAIL_SUBJECT = translator.getString(
            "email.noavalaralicense.errornotification.subject"
        );

        try {
            var notifRecipientObj = getNotificationRecipient();

            if (notifRecipientObj.isAdministrators) {
                var EMAIL_ADMIN_WARNING_MSG = translator.getString(
                    "email.adminwarningmsg.body"
                );
                EMAIL_BODY = EMAIL_BODY + EMAIL_ADMIN_WARNING_MSG;
            }

            batchSender.send({
                author: owner,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                relatedRecords: {
                    entityId: owner,
                },
            });
        } catch (e) {
            log.error("EINVOICE_AVALARA_LICENSE_CHECK_NOTIFIER_ERROR", e);
        }
    }

    /**

         * createCSV -This function creates the CSV file that contains the list of

         * transactions and their errors

         *

         * @param fileName {String} - filename

         * @param errorValues {Array} - containing {trannum: xx, error: xx}

         * @param columns - CSV columns configuration

         * @return fileObj {Object} - the file Object

         */

    function createCSV(fileName, errorValues, columns) {
        var content = createContent(errorValues, columns);

        return file.create({
            name: fileName,

            fileType: file.Type.CSV,

            contents: content,
        });
    }

    /**

         * createContent -This function creates the content of the CSV file

         *

         * @param errorValues {Array} - containing {trannum: xx, error: xx}

         * @param columns - {Object} CSV columns configuration

         * @return content {String} - the contents of the file

         */

    function createContent(errorValues, columns) {
        var content = [];

        var columnHeaders = [];

        for (var k = 0; k < columns.length; k++) {
            columnHeaders.push(columns[k].label);
        }

        var columnHeadersString = columnHeaders.join(",");

        content.push(columnHeadersString);

        for (var i = 0; i < errorValues.length; i++) {
            var values = JSON.parse(errorValues[i]);

            var lineValues = [];

            for (var j = 0; j < columns.length; j++) {
                var valueKey = columns[j].resultKey;

                lineValues.push('"' + values[valueKey] + '"');
            }

            var lineValuesString = lineValues.join(",");

            content.push(lineValuesString);
        }

        return content.join("\n");
    }

    /**

         * Retrieve the first active administrator to be used for audit trail records.

         *

         * @returns internal Id of first active administrator.

         */

    function getFirstActiveAdmin() {
        var activeAdmin = null;

        var activeAdminList = employeeDao.getActiveAdministrators();

        if (activeAdminList.length > 0) {
            activeAdmin = activeAdminList[0];
        }

        return activeAdmin;
    }

    /**

         * Retrieve the corresponding email notification recipient. If the Recipient of E-Document Notifications

         * field has an email address, use this as the recipient. Otherwise, use all of the active administrators

         * as recipients.

         *

         * @returns an object containing the corresponding email notification recipient/s and indicator if recipients

         * are administrators.

         */

    function getNotificationRecipient() {
        var notifRecipientObj = {
            recipient: [],

            isAdministrators: false,
        };
        var recipient = [];
        var subsidiaryFieldScriptIds = [NOTIF_RECIPIENT_FLD];
        var parentCompanySubsidiaryId =
            subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        var notifRecipient = subsidiaryPreferencesObj[NOTIF_RECIPIENT_FLD];
        if (notifRecipient) {
            recipient.push(notifRecipient);
        } else {
            recipient = employeeDao.getActiveAdministrators();

            notifRecipientObj.isAdministrators = true;
        }

        notifRecipientObj.recipient = recipient;

        return notifRecipientObj;
    }

    /**

         * notifyWebServiceEDocumentIncompletion - This function notifies

         * the recipient when there incompletion on the created E-Document

         * record.

         *

         * @param recipient

         * @param details

         */

    function notifyWebServiceError(details) {
        var EMAIL_SUBJECT = translator.getString(
            "email.webserviceerror.subject"
        );

        var EMAIL_BODY = translator.getString("email.webserviceerror.body");

        var detailTable =
            "<table cellspacing='0' cellpadding='2' style='border: 1px solid'>" +
            "<tr>" +
            "<td width='200' style='border: 1px solid;background-color: #CCCCCC'>" +
            translator.getString("email.table.collabel.inboundedocumentid") +
            "</td>" +
            "<td width='500' style='border: 1px solid;background-color: #CCCCCC'>" +
            translator.getString("email.table.collabel.details") +
            "</td>" +
            "</tr>";

        for (var i = 0; i < details.length; i++) {
            var detail = details[i];

            var recordLink = url.resolveRecord({
                recordType: "customrecord_psg_ei_inbound_edoc",

                recordId: detail.id,
            });

            var tablerow =
                "<tr>" +
                "<td style='border: 1px solid;'>" +
                "<a href='" +
                recordLink +
                "' style='color: #000;'>" +
                detail.id +
                "</a>" +
                "</td>" +
                "<td style='border: 1px solid;'>" +
                detail.message +
                "</td>" +
                "</tr>";

            detailTable = detailTable + tablerow;
        }

        detailTable = detailTable + "</table>";

        stringFormatter.setString(EMAIL_BODY);

        stringFormatter.replaceParameters({ DETAIL_TABLE: detailTable });

        EMAIL_BODY = stringFormatter.toString();

        try {
            var notifRecipientObj = getNotificationRecipient();

            var adminUser = getFirstActiveAdmin();

            batchSender.send({
                author: adminUser,

                recipients: notifRecipientObj.recipient,

                subject: EMAIL_SUBJECT,

                body: EMAIL_BODY,

                relatedRecords: {
                    entityId: adminUser,
                },
            });
        } catch (e) {
            log.error("EINVOICE_NOTIFIER_ERROR", e);
        }
    }

    return {
        notifyBatchOwner: notifyBatchOwner,

        notifyConversionBatchOwner: notifyConversionBatchOwner,

        notifyRecipient: notifyRecipient,

        notifyGenerationError: notifyGenerationError,

        notifySendingError: notifySendingError,

        notifyConversionError: notifyConversionError,

        getFirstActiveAdmin: getFirstActiveAdmin,

        notifyWebServiceError: notifyWebServiceError,

        getEmailBodyString: getEmailBodyString,

        getEmailSubjectString: getEmailSubjectString,

        getFinalString: getFinalString,

        notifyLicenseCheckError: notifyLicenseCheckError,

        notifyAvalaraLicenseIsAbsent: notifyAvalaraLicenseIsAbsent,

        notifyNSEBinboundConversionError:notifyNSEBinboundConversionError,
    };
});
