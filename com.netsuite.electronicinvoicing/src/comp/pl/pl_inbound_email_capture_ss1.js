/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This is the Email Capture Plugin Implementation Script for Inbound E-Documents
 *
 * Version    Date            Author           Remarks
 * 1.00       23 Nov 2016     ssantiago
 *
 */

var XML_FILE_FORMAT = /^[^\\/:"*?<>|]+.xml$/i;
var PDF_FILE_FORMAT = /^[^\\/:"*?<>|]+.pdf$/i;
var EMAIL_CAPTURE_ERROR_CODE = "EI_EMAIL_CAPTURE_ERROR";
var VENDOR_BILL_TYPE = 17;
var VENDOR_CREDIT_TYPE = 20;
var SALES_ORDER_TYPE = 31;
var INBOUND_EDOC_RECORD_TYPE = "customrecord_psg_ei_inbound_edoc";
var INBOUND_SOURCE_EMAIL = 2;
var EMAIL_FIELD = "email";
var INTERNAL_ID = "internalid";
var PARENT_FIELD = "parent";
var SUBSIDIARY_TYPE = "subsidiary";
var EMPLOYEE_TYPE = "employee";
var DOMAIN_FIELD = "custentity_edoc_sender_domain";
var ADMIN_ROLE = 3;
var PDF_DOCUMENT_FOLDER_NAME = "Inbound PDF E-Documents";
var BILL_CREDIT = "BillCredit";
var BILL = "Bill";
var SALES_ORDER = "SalesOrder";
var SUBSIDIARY_PREFERENCES_RECORD = "customrecord_psg_ei_sub_prefs_data";
var SUBSIDIARY_FIELD = "custrecord_psg_ei_sub_subsidiary";
var NOTIF_RECIPIENT_FLD = "custrecord_psg_ei_sub_notif_recipient";

var locale = nlapiGetContext().getPreference("LANGUAGE");
var translator = new SS1Translator(locale);

/**
 * This function loops through the attachments to get the file name and XML/PDF content
 * @param {Array} attachments Array of attachment file objects
 * @returns {Object} Object containing the file name and content of the XML/PDF file
 */
function retrieveFile(attachments, fileformat) {
    var files = [];

    for (var i = 0; i < attachments.length; i++) {
        var file = attachments[i];
        var fileName = file.getName();
        var isValidName = fileformat.test(fileName);
        if (isValidName) {
            files.push({
                name: fileName,
                content: file.getValue(),
            });
        }
    }

    var errorMsg;
    switch (fileformat) {
        case XML_FILE_FORMAT:
            if (files.length !== 1) {
                errorMsg = translator.getString(
                    "inbound.emailcapture.error.xmlattachment"
                );
                throw nlapiCreateError(EMAIL_CAPTURE_ERROR_CODE, errorMsg);
            }
            break;
        case PDF_FILE_FORMAT:
            if (files.length > 1) {
                errorMsg = translator.getString(
                    "inbound.emailcapture.error.pdfattachment"
                );
                throw nlapiCreateError(EMAIL_CAPTURE_ERROR_CODE, errorMsg);
            }
            break;
    }

    return files[0] || null;
}

/**
 * This function searches active employee records that has an Administrator role.
 * @returns {Array} Array of objects containing employee Id and their email address
 */
function getActiveAdmins() {
    var activeAdmins = [];

    var filters = [];
    var columns = [];

    filters.push(new nlobjSearchFilter(INTERNAL_ID, "role", "is", ADMIN_ROLE));
    filters.push(new nlobjSearchFilter("isinactive", null, "is", "F"));

    var internalIdColumn = new nlobjSearchColumn(INTERNAL_ID);
    var emailColumn = new nlobjSearchColumn(EMAIL_FIELD);
    internalIdColumn.setSort();
    columns.push(internalIdColumn);
    columns.push(emailColumn);

    var searchResults = nlapiSearchRecord(
        EMPLOYEE_TYPE,
        null,
        filters,
        columns
    );

    for (var i = 0; i < searchResults.length; i++) {
        var emailAddress = searchResults[i].getValue(emailColumn);
        activeAdmins.push({
            id: searchResults[i].getId(),
            email: emailAddress,
        });
    }

    return activeAdmins;
}

/**
 * Function to send email to active admins or recipient email
 * @param {String} errorContent
 * @returns void
 */
function sendEmail(errorContent) {
    var activeAdmins = getActiveAdmins();

    var sender = activeAdmins[0].id;

    var emailSubject = translator.getString(
        "inbound.emailcapture.notification.subject"
    );
    var emailBody = errorContent;

    var recipients = [];
    var edocRecipient = "";
    var subsidiaryPrefsfilters = [];
    var subsidiaryPrefscolumns = [];
    var parentCompanySubsidiaryId = getParentSubsidiaryId();
    subsidiaryPrefsfilters.push(
        new nlobjSearchFilter(
            SUBSIDIARY_FIELD,
            null,
            "is",
            parentCompanySubsidiaryId
        )
    );
    var notificationRecipientColumn = new nlobjSearchColumn(
        NOTIF_RECIPIENT_FLD
    );
    subsidiaryPrefscolumns.push(notificationRecipientColumn);

    var subsidiaryPrefsResults = nlapiSearchRecord(
        SUBSIDIARY_PREFERENCES_RECORD,
        null,
        subsidiaryPrefsfilters,
        subsidiaryPrefscolumns
    );
    if (subsidiaryPrefsResults && subsidiaryPrefsResults.length > 0) {
        edocRecipient = subsidiaryPrefsResults[0].getValue(
            notificationRecipientColumn
        );
    }

    if (edocRecipient) {
        recipients.push(edocRecipient);
    } else {
        for (var i = 0; i < activeAdmins.length; i++) {
            recipients.push(activeAdmins[i].email);
        }

        emailBody +=
            "\n\n" + translator.getString("email.adminwarningmsg.body");
    }

    var records = [];
    records[EMPLOYEE_TYPE] = sender;

    nlapiSendEmail(
        sender,
        recipients,
        emailSubject,
        emailBody,
        null,
        null,
        records
    );
}

/**
 * This function searches for vendor with the specified email address
 * and returns the internal Id of the vendor
 * @param {String} fromAddress From Email address
 * @returns {String} Internal Id of Vendor or "multiple"
 */
function identifyVendor(fromAddress) {
    var atIndex = fromAddress.indexOf("@");
    var senderDomain = fromAddress.substring(atIndex + 1);
    var vendorResults = [];

    var domainFilterExpression = [
        ["custentity_edoc_use_sender_list", "is", "F"],
        "and",
        [DOMAIN_FIELD, "is", senderDomain],
        "and",
        ["custentity_psg_ei_entity_edoc_standard", "noneof", "@NONE@"],
    ];
    var domainSearchColumns = [new nlobjSearchColumn(DOMAIN_FIELD)];
    var domainSearchResults = nlapiSearchRecord(
        "vendor",
        null,
        domainFilterExpression,
        domainSearchColumns
    );
    if (domainSearchResults) {
        if (domainSearchResults.length === 1) {
            vendorResults.push(domainSearchResults[0].getId());
        } else if (domainSearchResults.length > 1) {
            vendorResults.push("multiple");
        }
    }

    var senderFilterExpression = [
        ["custrecord_psg_ei_email_sender_email", "is", fromAddress],
        "and",
        ["custrecord_psg_ei_email_sender_checkbox", "is", "T"],
        "and",
        ["custrecord_psg_ei_email_sender_standard", "noneof", "@NONE@"],
    ];
    var senderSearchColumns = [
        new nlobjSearchColumn("custrecord_psg_ei_email_sender_vendor"),
    ];
    var senderSearchResults = nlapiSearchRecord(
        "customrecord_psg_ei_email_sender_vend",
        null,
        senderFilterExpression,
        senderSearchColumns
    );
    if (senderSearchResults) {
        if (senderSearchResults.length === 1) {
            vendorResults.push(
                senderSearchResults[0].getValue(senderSearchColumns[0])
            );
        } else if (senderSearchResults.length > 1) {
            vendorResults.push("multiple");
        }
    }

    if (vendorResults.length < 1) {
        throw nlapiCreateError(
            EMAIL_CAPTURE_ERROR_CODE,
            translator.getString("inbound.emailcapture.error.vendorerror")
        );
    } else if (vendorResults.length > 1) {
        return "multiple";
    } else {
        return vendorResults[0];
    }
}

/**
 * This function searches for customer with the specified email address
 * and returns the internal Id of the customer
 * @param {String} fromAddress From Email address
 * @returns {String} Internal Id of Customer or "multiple"
 */
function identifyCustomer(fromAddress) {
    var atIndex = fromAddress.indexOf("@");
    var senderDomain = fromAddress.substring(atIndex + 1);
    var customerResults = [];
    var NO_CUSTOMER = "No such customer is associated with the email sender.";

    var domainFilterExpression = [
        ["custentity_edoc_use_sender_list", "is", "F"],
        "and",
        [DOMAIN_FIELD, "is", senderDomain],
        "and",
        ["custentity_psg_ei_entity_edoc_standard", "noneof", "@NONE@"],
    ];
    var domainSearchColumns = [new nlobjSearchColumn(DOMAIN_FIELD)];
    var domainSearchResults = nlapiSearchRecord(
        "customer",
        null,
        domainFilterExpression,
        domainSearchColumns
    );
    if (domainSearchResults) {
        if (domainSearchResults.length === 1) {
            customerResults.push(domainSearchResults[0].getId());
        } else if (domainSearchResults.length > 1) {
            customerResults.push("multiple");
        }
    }

    var senderFilterExpression = [
        ["custrecord_psg_ei_cust_sender_email", "is", fromAddress],
        "and",
        ["custrecord_psg_ei_cust_email_sender_cb", "is", "T"],
        "and",
        ["custrecord_psg_ei_cust_email_sender_std", "noneof", "@NONE@"],
    ];
    var senderSearchColumns = [
        new nlobjSearchColumn("custrecord_psg_ei_email_sender_customer"),
    ];
    var senderSearchResults = nlapiSearchRecord(
        "customrecord_psg_ei_email_sender_cust",
        null,
        senderFilterExpression,
        senderSearchColumns
    );

    if (senderSearchResults) {
        if (senderSearchResults.length === 1) {
            customerResults.push(
                senderSearchResults[0].getValue(senderSearchColumns[0])
            );
        } else if (senderSearchResults.length > 1) {
            customerResults.push("multiple");
        }
    }

    if (customerResults.length < 1) {
        throw nlapiCreateError(
            EMAIL_CAPTURE_ERROR_CODE,
            translator.getString("inbound.emailcapture.error.customererror") ||
            NO_CUSTOMER
        );
    } else if (customerResults.length > 1) {
        return "multiple";
    } else {
        return customerResults[0];
    }
}

/**
 * Main entry point of Email Capture Plugin script
 * @param {Object} email Email Object from NS
 * @returns void
 */
function process(email) {
    var fromAddress = email.getFrom();
    var attachments = email.getAttachments();
    var subject = email.getSubject();
    var recordLink = "";
    var recordType = BILL;
    var purchaseTransactions = [BILL, BILL_CREDIT];
    var salesTransactions = [SALES_ORDER];
    var vendor;
    var customer;
    var templateId;
    var MULTIPLE_CUSTOMERS =
        "No such customer can be identified in the inbound e-document. Modify the customer records to avoid duplicate email addresses.";

    try {
        var xmlFile = retrieveFile(attachments, XML_FILE_FORMAT);
        var pdfFile = retrieveFile(attachments, PDF_FILE_FORMAT);

        var rec = nlapiCreateRecord(INBOUND_EDOC_RECORD_TYPE);
        rec.setFieldValue(
            "custrecord_psg_ei_inbound_source",
            INBOUND_SOURCE_EMAIL
        );
        rec.setFieldValue("custrecord_psg_ei_inbound_content", xmlFile.content);

        // If Subject contains the string "BillCredit" then create an Inbound E-Document with transaction type "BillCredit" or create "SalesOrder" type if transaction type "SalesOrder"
        // else create an Inbound E-Document of transaction type "Bill"
        // TODO: After automatic selection of Templates is introduced in Email Capture plugin, this logic needs to change
        if (subject) {
            if (subject.indexOf(BILL_CREDIT) != -1) {
                rec.setFieldValue(
                    "custrecord_psg_ei_inbound_transtype",
                    VENDOR_CREDIT_TYPE
                );
                recordType = BILL_CREDIT;
            } else if (subject.indexOf(SALES_ORDER) != -1) {
                rec.setFieldValue(
                    "custrecord_psg_ei_inbound_transtype",
                    SALES_ORDER_TYPE
                );
                recordType = SALES_ORDER;
            } else {
                rec.setFieldValue(
                    "custrecord_psg_ei_inbound_transtype",
                    VENDOR_BILL_TYPE
                );
            }
        } else {
            rec.setFieldValue(
                "custrecord_psg_ei_inbound_transtype",
                VENDOR_BILL_TYPE
            );
        }
        rec.setFieldValue("name", xmlFile.name);
        if (purchaseTransactions.indexOf(recordType) != -1) {
            vendor = identifyVendor(fromAddress.getEmail());
            if (vendor !== "multiple") {
                rec.setFieldValue("custrecord_psg_ei_inbound_vendor", vendor);
            }
            templateId = "custrecord_psg_ei_inbound_template";
        } else if (salesTransactions.indexOf(recordType) != -1) {
            customer = identifyCustomer(fromAddress.getEmail());
            if (customer !== "multiple") {
                rec.setFieldValue(
                    "custrecord_psg_ei_inbound_customer",
                    customer
                );
            }
            templateId = "custrecord_psg_ei_inbound_temp_customer";
        }

        // ignoreMandatoryFields = true for now because auto template selection is still not implemented
        var id = nlapiSubmitRecord(rec, true, true);

        if (pdfFile) {
            var pdfFileId = createPDFFile(id, pdfFile);
            if (pdfFileId) {
                nlapiSubmitField(
                    INBOUND_EDOC_RECORD_TYPE,
                    id,
                    "custrecord_psg_ei_attach_pdf",
                    pdfFileId
                );
            }
        }
        recordLink = nlapiResolveURL(
            "RECORD",
            INBOUND_EDOC_RECORD_TYPE,
            id,
            "EDIT"
        );

        if (vendor === "multiple") {
            throw nlapiCreateError(
                EMAIL_CAPTURE_ERROR_CODE,
                translator.getString(
                    "inbound.emailcapture.error.multiplevendorerror"
                )
            );
        } else if (customer === "multiple") {
            throw nlapiCreateError(
                EMAIL_CAPTURE_ERROR_CODE,
                translator.getString(
                    "inbound.emailcapture.error.multiplecustomererror"
                ) || MULTIPLE_CUSTOMERS
            );
        }

        var template = nlapiLookupField(
            INBOUND_EDOC_RECORD_TYPE,
            id,
            templateId
        );
        if (!template) {
            throw nlapiCreateError(
                EMAIL_CAPTURE_ERROR_CODE,
                translator.getString("inbound.emailcapture.error.notemplate")
            );
        }
    } catch (e) {
        nlapiLogExecution("ERROR", e.getCode(), e.getDetails());

        var errorEmail;

        if (recordLink !== "") {
            errorEmail = translator.getString(
                "inbound.emailcapture.notification.bodywithlink"
            );
            errorEmail = errorEmail.replace("{LINK}", recordLink);
        } else {
            errorEmail = translator.getString(
                "inbound.emailcapture.notification.body"
            );
        }

        errorEmail = errorEmail.replace("{SENDER}", fromAddress);
        errorEmail = errorEmail.replace("{SUBJECT}", email.getSubject());
        errorEmail = errorEmail.replace(
            "{ERROR}",
            e.getCode() + ": " + e.getDetails()
        );

        sendEmail(errorEmail);
    }
}

function createPDFFile(inboundEdocId, pdfFile) {
    var fname = pdfFile.name;
    var name =
        fname.substring(0, fname.lastIndexOf(".")) +
        "_" +
        inboundEdocId +
        ".pdf";
    var content = pdfFile.content;

    var file = nlapiCreateFile(name, "PDF", content);
    var folderId = getPDFFolder();
    file.setFolder(folderId);
    var fileId = nlapiSubmitFile(file);
    nlapiLogExecution(
        "DEBUG",
        "Created PDF File on File Cabinet",
        "File ID: " + fileId
    );
    return fileId;
}

function getPDFFolder() {
    var folder = getFolderIdByName(PDF_DOCUMENT_FOLDER_NAME);
    return folder ? folder.id : createPDFFolder(PDF_DOCUMENT_FOLDER_NAME);
}

function getFolderIdByName(folderName) {
    var folder;
    var fileNameFilter = new nlobjSearchFilter(
        "name",
        null,
        "is",
        PDF_DOCUMENT_FOLDER_NAME
    );
    var searchResults = nlapiSearchRecord("folder", null, [fileNameFilter], []);

    if (searchResults && searchResults.length > 0) {
        folder = {};
        folder.id = searchResults[0].id;
    }

    return folder;
}

function createPDFFolder(folderName) {
    var folderRec = nlapiCreateRecord("folder");
    folderRec.setFieldValue("name", folderName);

    return nlapiSubmitRecord(folderRec);
}

function getParentSubsidiaryId() {
    var parentSubsidiaryId = null;
    var parentSubsidiaryFilters = [];
    var parentSubsidiaryColumns = [];
    parentSubsidiaryFilters.push(
        new nlobjSearchFilter(PARENT_FIELD, null, "isempty")
    );
    var parentInternalId = new nlobjSearchColumn(INTERNAL_ID);
    parentSubsidiaryColumns.push(parentInternalId);

    var parentSubsidiarySearchResults = nlapiSearchRecord(
        SUBSIDIARY_TYPE,
        null,
        parentSubsidiaryFilters,
        parentSubsidiaryColumns
    );
    if (parentSubsidiarySearchResults && parentSubsidiarySearchResults.length) {
        parentSubsidiaryId = parseInt(
            parentSubsidiarySearchResults[0].getValue(INTERNAL_ID)
        );
    }

    return parentSubsidiaryId;
}
