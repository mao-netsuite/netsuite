/**
 * Copyright 2015 NetSuite Inc.  User may not copy, modify, distribute, or re-bundle or otherwise make available this code
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Dec 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 *
 *
 * NOTE: PLEASE KEEP ALL THE KEYS IN LOWER CASE.
 */
define([], function () {
    var translation = {};
    //START LICENSE
    translation["license.notinstalled"] =
        "The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.";
    //END LICENSE
    //START OUTBOUND SENDING PAGE
    translation["outbound.formtitle"] = "Send Failed E-Documents";
    translation["outbound.search"] = "Search";
    translation["outbound.send"] = "Send";
    translation["outbound.return"] = "Return to Criteria";
    translation["outbound.customer"] = "Customer";
    translation["outbound.vendor"] = "Vendor";
    translation["outbound.subsidiary"] = "Subsidiary";
    translation["outbound.type"] = "Transaction Type";
    translation["outbound.datefrom"] = "Transaction Date From";
    translation["outbound.dateto"] = "Transaction Date To";
    translation["outbound.subshelp"] =
        "Select a subsidiary to display only the transactions belonging to the subsidiary.";
    translation["outbound.custhelp"] =
        "Select a customer to display only the transactions belonging to that customer. If no customer is selected, the search results will show all transactions belonging to the subsidiary, regardless of customer.";
    translation["outbound.vendorhelp"] =
        "Select a vendor to display only the transactions belonging to that vendor. If no vendor is selected, the search results will show all transactions belonging to the subsidiary, regardless of the vendor.";
    translation["outbound.entitytypehelp"] =
        "Choose either Customer or Vendor entity type. This enables the corresponding dropdown list below.";
    translation["outbound.typehelp"] =
        "Select one or more transaction types for each e-document you want to send. To select multiple transaction types, press and hold the Ctrl key while selecting each transaction type.<br /><br />" +
        "If no transaction type is selected, the search results will show all e-documents that are ready for sending, regardless of transaction type.";
    translation["outbound.datefromhelp"] =
        "To view a list of transactions created within a specific date range, select a date to define the beginning of the date range.";
    translation["outbound.datetohelp"] =
        "To view a list of transactions created within a specific date range, select a date to define the end of the date range.";
    translation["outbound.entityfieldgroup"] = "Entity Search Filters";
    translation["outbound.filtersfieldgroup"] = "Transaction Search Filters";
    translation["outbound.entitytypeinlinehelp"] = "Select entity type:";
    translation["outbound.invalidtypetitle"] = "Invalid Transaction Types";
    translation["outbound.invalidtype"] =
        "The following transaction types are currently not supported: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "The following transaction types are not valid for the chosen entity: {TRANSACTIONTYPES}. Select the appropriate transaction types for the entity you have chosen.";
    translation["outbound.invaliddates"] =
        "The Transaction Date From must not be later than the Transaction Date To. Change the dates so that the Transaction Date From is earlier than the Transaction Date To.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "You cannot perform the search with the selected criteria because e-document sending is already in progress for transactions within the date range ({TRANDATE_FROM} - {TRANDATE_TO}) for subsidiary ({SUBSIDIARY}). You must change your search criteria or try again after sending this e-document.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "You cannot perform the search with the selected criteria because e-document sending is already in progress for transactions within the date range ({TRANDATE_FROM} - {TRANDATE_TO}). You must change your search criteria or try again after sending this e-document.";
    translation["outbound.sublist.trannum"] = "Transaction Number";
    translation["outbound.sublist.trantype"] = "Transaction Type";
    translation["outbound.sublist.customer"] = "Customer";
    translation["outbound.sublist.vendor"] = "Vendor";
    translation["outbound.sublist.subsidiary"] = "Subsidiary";
    translation["outbound.sublist.trandate"] = "Transaction Date";
    translation["outbound.sublist.memo"] = "Memo";
    translation["outbound.sublist.template"] = "Template";
    translation["outbound.sublist.sendingmethod"] = "Sending Method";
    translation["outbound.sublist.sublistname"] =
        "Results of Failed Outbound E-Documents to be Sent";
    translation["outbound.msg.sendingongoing"] =
        "The e-document is currently being sent. You will receive an email when the process is complete.";
    translation["outbound.configurefreecountry"] =
        "This account does not have an active license for multi-country use of Electronic Invoicing. To send e-documents by bulk, please contact your account administrator to configure the E-Document Country for Free Use in the company information page.";
    translation["outbound.entitysend"] = "Send to Entity";
    translation["outbound.certifysend"] = "Send for Certification";
    translation["outbound.sendingtypehelp"] =
        "Choose either Send to Entity or Send for Certification. It will list corresponding transactions for sending.";
    //END OUTBOUND SENDING PAGE
    //START ENTITY VALIDATION
    translation["customer.noemail"] =
        "There is no email address for this customer. Enter a valid email address to the customer record to enable sending e-documents by email.";
    translation["customer.contactnoemail"] =
        "The following e-document recipients do not have an email address on their contact records: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "There are no e-document recipients for this customer. To send electronic documents by email to this customer, at least one contact must be added to the list of e-document recipients.";
    translation["customer.arrayrequired"] =
        "Contacts array required for validation.";
    translation["customer.parameternotarray"] =
        "Contacts parameter is not an array.";
    translation["customer.maxrecipientexceeded"] =
        "You have exceeded the maximum number of email recipients. Select a maximum of 10 email recipients only.";
    translation["vendor.noemail"] =
        "There is no email address for this vendor. Enter a valid email address to the vendor record to enable sending e-documents by email.";
    translation["vendor.contactnoemail"] =
        "The following e-document recipients do not have an email address on their contact records: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "There are no e-document recipients for this vendor. To send electronic documents by email to this vendor, at least one contact must be added to the list of e-document recipients.";
    translation["vendor.maxrecipientexceeded"] =
        "You have exceeded the maximum number of email recipients. Select a maximum of 10 email recipients only.";
    translation["vendor.nosenders"] =
        "There is no e-document email sender for this vendor. To receive e-documents through email from this vendor, you must enter at least one email address in the Vendor E-Document Email Sender list.";
    translation["vendor.existingsender"] =
        "The sender email address already exists.";
    translation["vendor.existingdomain"] =
        "The sender email domain is already being used by a different vendor.";
    translation["vendor.existingidentifier"] =
        "The Web Service ID is already being used by another vendor. Enter a different Web Service ID.";
    //END ENTITY VALIDATION
    //START EMAIL RECIPIENT RECORD VALIDATION
    translation["customeremailrecipient.contextunsupported"] =
        "Customer E-Document Email Recipient only supports the following contexts: UI, CSV, SuiteScript and Web Services.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Vendor E-Document Email Recipient only supports the following contexts: UI, CSV, SuiteScript and Web Services.";
    //
    //START EMAIL SENDER RECORD VALIDATION
    translation["vendoremailsender.contextunsupported"] =
        "Vendor E-Document Email Sender only supports the following contexts: UI, CSV, SuiteScript and Web Services.";
    //END EMAIL SENDER RECORD VALIDATION
    //START TEMPLATE VALIDATION
    translation["template.incorrectregex"] =
        "The REGEX field contains an incorrect regular expression. Proper syntax must be used.";
    translation["template.invalidjson"] =
        "You did not provide a well-formed JSON in the Template for Outbound E-Documents field. Click OK to continue, or Cancel to stay on the current page.";
    translation["template.invalidxml"] =
        "The XML template contains errors. XML format must be well-formed.";
    translation["template.templaterequired"] =
        "The template content is missing for the selected outbound transaction type. Provide a valid XML or JSON template content in the Outbound E-Documents field, then try again.";
    translation["template.mappingrequired"] =
        "You selected an inbound transaction type, but the JSON content of the field mapping is missing. Enter the JSON content in the Field Mapping For Inbound E-Documents field.";
    translation["template.templateorjsonrequired"] =
        "There are missing field values. For an outbound transaction, specify a valid XML or JSON content in the Template for Outbound E-Documents field. For an inbound transaction, specify the JSON content in the Field Mapping for Inbound E-Document field.";
    translation["template.invalidxsdfile"] =
        "The selected XSD file is not a valid XSD file. Ensure that the file you select has the .xsd extension.";
    translation["template.contextunsupported"] =
        "E-Document Template only supports UI and SuiteScript contexts.";
    translation["template.supportedtranstypefldhelp"] =
        "Select one or more transaction types to be supported by this template. To select multiple transaction types, press and hold the Ctrl key while selecting the transaction types.<br /><br />" +
        "If transaction types cannot be selected, it means the template is already assigned to one or more transaction records of the same transaction type. To enable selection of transaction type, remove the template from the transaction record.<br /><br />" +
        "You can assign this template also to inbound e-documents, and doing so will disable the Transaction Type field.";
    translation["template.eistatus"] =
        "Restrict Editing of Transactions with E-Document Status";
    translation["template.supportedeistatusfieldhelp"] =
        "Transactions with the e-document status you selected will not be editable when this template is associated with them. You can select multiple e-document statuses.";
    translation["template.invalidschemaordependency"] =
        "Schema is an incorrectly structured XSD or the dependent schema cannot be found.";
    translation["template.xmldoesnotconformtoschema"] =
        "The XML of template does not conform to provided XSD or schema.";
    translation["template.xmldomexception"] =
        "The input XML string is malformed.";
    translation["template.missingreqdargument"] =
        "The XSD for outbound validation is missing.";
    translation["template.xsdvalidationexception"] =
        "Unknown exception occurred during XSD validation.";
    translation["template.xsdmissingdependencyfolder"] =
        "The XSD schema folder is invalid or missing.";
    //END TEMPLATE VALIDATION
    //START TRANSACTION (UE)
    translation["invoice.generatebtn"] = "Generate E-Document";
    translation["invoice.sendbtn"] = "Send E-Document";
    translation["invoice.sendcertifybtn"] = "Certify E-Document";
    translation["invoice.eipbtn"] = "Process E-Document";
    translation["invoice.loguntagged"] =
        "E-document template was removed. Transaction is untagged for e-document generation.";
    translation["invoice.logforgenerate"] =
        "Transaction is ready for e-document generation.";
    translation["invoice.invalidtemplatesub"] =
        "The subsidiary of the transaction is not valid for the selected e-document template. Select a different e-document template.";
    translation["invoice.templateremovalerror"] =
        "Removing the e-document template for sent e-documents is not allowed.";
    //END INVOICE
    //START EINVOICE SENDING
    translation["ei.sending.currentlysending"] =
        "The e-document is currently being sent. This might take a few minutes to complete. You must not interrupt the processing by clicking the Send E-Document button again. After the e-document has been sent, the page will reload.";
    translation["ei.sending.notready"] =
        "This e-document is not ready for sending. You must first click Generate E-Document to generate an e-document.";
    translation["ei.sending.alreadysent"] =
        "This transaction was already sent.";
    translation["ei.sending.norecipients"] =
        "The e-document cannot be sent because the customer has no e-document recipients. Before you can send this e-document by email, e-document recipients must first be selected on the customer record.";
    translation["ei.sending.indivcustnoemail"] =
        "The e-document cannot be sent because the customer has no email address. Before you can send this e-document by email, an email address must be provided on the customer record.";
    translation["ei.sending.norecipients.vendor"] =
        "The e-document cannot be sent because the vendor has no e-document recipients. Before you can send this e-document by email, e-document recipients must first be selected on the vendor record.";
    translation["ei.sending.indivvendnoemail"] =
        "The e-document cannot be sent because the vendor has no email address. Before you can send this e-document by email, an email address must be provided on the vendor record.";
    translation["ei.sending.invalidmethod"] =
        "Select a valid sending method for {TYPE} #{INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Sender: {SENDER}\nRecipients: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "The e-document sender ({EMPLOYEENAME}) has no email address. Enter a valid email address on the employee record.";
    translation["ei.sending.recipientnoemail"] =
        "One or more recipients of the e-document associated with this transaction does not have an email address. Verify that the recipients for this customer have valid email addresses. ";
    translation["ei.sending.recipientnoemail.vendor"] =
        "One or more recipients of the e-document associated with this transaction does not have an email address. Verify that the recipients for this vendor have valid email addresses. ";
    translation["ei.sending.defaulterror"] =
        "An error occurred during sending of the e-document. Check the E-Document Audit Trail on the E-Document subtab for details.";
    translation["ei.sending.inactivecustomer"] =
        "Unable to send the e-document for this transaction because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try sending the e-document again.";
    translation["ei.sending.inactivevendor"] =
        "Unable to send the e-document for this transaction because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try sending the e-document again.";
    translation["ei.sending.msg.processcomplete"] =
        "The e-document has been sent.";
    translation["ei.sending.configurefreecountry"] =
        "Your account must have an active license to use Electronic Invoicing for multiple countries. To send e-documents by bulk to a single country, you must select the country from the E-Document Country for Free Use field in the Company Information page.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transactions with inactive customers are not supported by e-document.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transactions with inactive vendors are not supported by e-document.";
    //EINVOICE CERTIFICATION
    translation["ei.sending.certification.defaulterror"] =
        "An error occurred during certification of the e-document. Check the E-Document Audit Trail on the E-Document subtab for details.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "The e-document has been sent for certification.";
    //END EINVOICE SENDING
    //START EINVOICE GENERATION
    translation["ei.generation.generationlogbulk"] =
        "The e-document was generated in bulk, using the e-document template '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "The e-document was generated using the e-document template '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "The e-document and PDF file were generated in bulk, using the e-document template '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "The e-document and PDF file were generated using the e-document template '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "The e-document was generated in bulk, using the e-document template '{TEMPLATENAME}'. The previously generated PDF file of this transaction was deleted.";
    translation["ei.generation.generationremovedpdflog"] =
        "The e-document was generated using the e-document template '{TEMPLATENAME}'. The previously generated PDF file of this transaction was deleted.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Bulk generation process\nE-document template used: {TEMPLATENAME}\n" +
        "Error during PDF Generation in BULK: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "E-document template used: {TEMPLATENAME}\n" +
        "Error during PDF Generation: {ERROR}";
    translation["ei.generation.failedpdfgenerationlogbulk"] =
        "Bulk Generation Process\nThe E-Document was generated using e-document template '{TEMPLATENAME}'\n" +
        "Error during PDF Generation in BULK: ";
    translation["ei.generation.failedpdfgenerationlog"] =
        "The E-Document was generated using e-document template '{TEMPLATENAME}'\n" +
        "Error during PDF Generation: ";
    translation["ei.generation.defaulterror"] =
        "An error occurred during generation. Check the E-Document Audit Trail on the E-Document subtab for details.";
    translation["ei.generation.inactivecustomer"] =
        "Unable to generate an e-document for this transaction because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try generating the e-document again.";
    translation["ei.generation.inactivevendor"] =
        "Unable to generate an e-document for this transaction because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try generating the e-document again.";
    translation["ei.generation.msg.processcomplete"] =
        "The e-document has been generated.";
    translation["ei.generation.configurefreecountry"] =
        "Your account must have an active license to use Electronic Invoicing for multiple countries. To generate e-documents by bulk to a single country, you must select the country from the E-Document Country for Free Use field in the Company Information page.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transactions with inactive customers are not supported by e-document.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transactions with inactive vendors are not supported by e-document.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "The e-document is generated and digitally signed successfully.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Generation failed because the resulting e-document is neither a well-formed XML nor a well-formed JSON.";
    //END EINVOICE GENERATION
    //START EMAIL NOTIF
    translation["notify.batchownersubject"] = "E-document Sending Finished";
    translation["notify.batchownerbody"] = [
        "Hi, <br/>",
        "Your request to send e-documents is finished.",
        "{SENT} out of {TOTAL} were sent. Please see attached file for details. <br/>",
        "Thank you,",
        "NetSuite",
    ].join("<br/>");
    translation["notify.recipientposubj"] =
        "E-document Generated for PO #{PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-document Generated from {COMPANYNAME}";
    translation["notify.recipientbody"] = [
        "Greetings! <br />",
        "{MESSAGE}",
        "Please see attached for the e-document file.<br />",
        "Thank you,",
        "{COMPANYNAME}",
    ].join("<br />");
    translation["notify.generationerrorsubj"] =
        "Error encountered during e-document generation";
    translation["notify.generationerrorbody"] =
        "There were errors encountered during e-document generation." +
        "<br/>Please see the attached file for the list of transactions and error details.";
    //END EMAIL NOTIF
    //START TRANSACTION CS
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "An e-document has already been sent for this transaction. Generating a new e-document will overwrite the previous e-document. Are you sure you want to generate a new e-document?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Removing the e-document template for sent e-documents is not allowed.";
    translation["transaction.msg.generate.information"] =
        "Generation of this E-Document is in progress.";
    translation["transaction.msg.send.information"] =
        "Sending of this E-Document is in progress.";
    translation["transaction.msg.send.certify.information"] =
        "Certification of this E-Document is in progress.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Generation of this E-Document is already in progress.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Sending of this E-Document is already in progress.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Certification of this E-Document is already in progress.";
    translation["transaction.msg.uncheckpdf"] =
        "A PDF file of this transaction was created during the last e-document generation. Clearing this box will delete that PDF file in the next e-document generation.";
    translation["transaction.msg.nofreecountry"] =
        "This account does not have an active license for multi-country use of Electronic Invoicing. To generate an e-document for this transaction, please contact your account administrator to specify a country in the E-Document Country for Free Use field on the Company Information page.";
    translation["transaction.msg.txncountrydifferentthanfreecountry"] =
        "This account does not have an active license for multi-country use of Electronic Invoicing. To generate an e-document for this transaction, please contact your NetSuite account manager to purchase a license.";
    translation["transaction.msg.blockededittransaction"] =
        "Editing the transaction is blocked for current E-Doc Status. Please refer the attached EI template.";
    //END TRANSACTION CS
    //START TEMPLATE
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Changing the value in the Content Type field from XML to a different type will remove all XML validators. Are you sure you want to change the content type?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Only validators for XML content type can be added.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "This validator is already in the list.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "E-Document Template Validators only support UI and SuiteScript contexts.";
    //END TEMPLATE
    //START PACKAGE DOCUMENT
    translation["standarddocument.default.alreadyexist"] =
        "The {DEFAULT_DOCUMENT_STANDARD} record already exists. You cannot create a document package record with the same name. Rename your document package record and try again.";
    translation["standarddocument.default.editnotallowed"] =
        "Editing the {DEFAULT_DOCUMENT_STANDARD} record Name or Description is not allowed.";
    translation["standarddocument.default.deletenotallowed"] =
        "Deleting the {DEFAULT_DOCUMENT_STANDARD} record is not allowed.";
    translation["standarddocument.contextunsupported"] =
        "E-Document Package only supports UI, CSV Import and SuiteScript contexts.";
    //END PACKAGE DOCUMENT
    //START SENDING METHOD
    translation["sendingmethod.default.alreadyexist"] =
        "The {DEFAULT_SENDING_METHOD_NAME} sending method record already exists. You cannot create a sending method record with the same name. Rename your sending method record and try again.";
    translation["sendingmethod.default.editnotallowed"] =
        "Editing the {DEFAULT_SENDING_METHOD_NAME} sending method record is not allowed.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Deleting the {DEFAULT_SENDING_METHOD_NAME} sending method record is not allowed.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "The Transaction Type field has been disabled because this sending method is assigned to one or more transaction records. To edit this sending method, remove the sending method from the transaction record to enable the Transaction Type field and try again.";
    translation["sendingmethod.contextunsupported"] =
        "E-Document Sending Method only supports UI and SuiteScript contexts.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Select one or more transaction types to be supported by this sending method. To select multiple transaction types, press and hold the Ctrl key while selecting the transaction types.<br /><br />" +
        "If one or more transaction types cannot be selected, the sending method has been assigned to one or more transaction records of that transaction type. You must first remove the sending method from the transaction record to enable selection of the transaction type.";
    translation["sendingmethod.pluginimplementation"] =
        "E-Document Sending Method Plugin Implementation";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Select a Sending Method Plugin Implementation";
    translation["sendingmethod.scriptbannermessage"] =
        'Sending methods should be custom plug-in implementations. Please recreate existing sending method scripts as new custom plug-in implementations of the type "Sending Plugin".';
    //END SENDING METHOD
    //CUSTOM DATA START
    translation["customdatasource.pluginimplementation"] =
        "Custom Data Source Plugin Implementation";
    translation["customdatasource.pluginimplementationhelp"] =
        "Select the Custom Data Source Plugin Implementation";
    //CUSTOM DATA END
    //Digital Signature Plugin Implementation
    translation["digitalsignature.pluginimplementation"] =
        "Digital Signature Plugin Implementation";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Select a plug-in implementation. This field is required if you want to digitally sign e-documents.";
    translation["digitalsignature.identifierlabel"] =
        "This e-document is digitally signed";
    translation["digitalsignature.successlog"] =
        "The generated e-document is digitally signed.";
    translation["digitalsignature.failurelog"] =
        "The generated e-document is not digitally signed.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Digital Signature plugin implementation returned fail status.";
    translation["digitalsignature.plugininvalidresult"] =
        "The result returned from Digital Signature plugin implementation is not valid.";
    //INBOUND CUSTOM DATA START
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Inbound Custom Data Source Plugin Implementation";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Select an inbound custom data source plugin implementation.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "The Inbound Custom Data Source plugin implementation result is invalid.";
    //Outbound Validation Plugin Implementation
    translation["outboundvalidation.pluginimplementation"] =
        "Outbound Validation Plugin Implementation";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Select an outbound e-document validation plugin implementation. This validates outbound e-documents.";
    translation["outboundvalidation.successlog"] =
        "Outbound Validation Successful.";
    translation["outboundvalidation.failurelog"] =
        "Outbound Validation Failed.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Outbound Validation plugin implementation returned fail status.";
    translation["outboundvalidation.plugininvalidresult"] =
        "The result from the Outbound Validation plugin implementation is invalid.";
    //START TEMPLATE
    translation["template.msg.cannotedittransactiontype"] =
        "The Transaction Type field has been disabled because this template is already assigned to one or more transaction records. To edit this template, remove the template from the transaction record to enable the Transaction Type field and then try again. You can assign this template also to inbound e-documents, and doing so will disable the Transaction Type field.";
    translation["template.msg.forcetocopymessage"] =
        "You cannot edit the default e-document template. You can either copy it using the Make Copy option from Actions, or create a new one.";
    translation["template.msg.warningoneditmessage"] =
        "This is a default e-document template. Any changes made to this template will be lost or will be overwritten when the SuiteApp is updated.";
    //END TEMPLATE
    //START EMAIL
    translation["email.batchownernotification.subject"] =
        "E-Document Sending Finished";
    translation["email.batchownernotification.body"] =
        "Hi, <br/><br/>Your e-documents have been sent.<br/>{SENT} out of {TOTAL} were sent. Please see the attached file for details. <br/><br/>Thank you,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "E-Document Conversion Finished";
    translation["email.batchownerconvertnotification.body"] =
        "Hi, <br/><br/>Your e-documents have been converted.<br/>{CONVERTED} out of {TOTAL} were converted. Please see the attached file for details. <br/><br/>Thank you,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-document Generated for PO #{PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-document from {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-document Generated for {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Greetings! <br /><br />The e-document for PO #{PONUM} has been generated.<br />Please see the attached e-document file for details.<br /><br />Thank you,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Greetings! <br /><br />The e-document for {TYPE} #{TRANID} has been generated.<br />Please see the attached e-document file for details.<br /><br />Thank you,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Error encountered during e-document generation";
    translation["email.generationerrornotification.body"] =
        "There were errors encountered during e-document generation.<br/>Please see the attached file for the list of transactions and error details.";
    translation["email.sendingerrornotification.subject"] =
        "Error encountered during e-document sending";
    translation["email.sendingerrornotification.body"] =
        "There were errors encountered during e-document sending.<br/>Please see the attached file for the list of transactions and error details.";
    translation["email.webserviceerror.subject"] =
        "Inbound E-Document Web Service Notification";
    translation["email.webserviceerror.body"] =
        "<p>Hi,</p>" +
        "<p>Errors were encountered in processing the inbound e-document using web service.<br/>Please see the following details.</p>" +
        "{DETAIL_TABLE}" +
        "<p>Thank you,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transaction Number";
    translation["email.attachment.collabel.details"] = "Details";
    translation["email.attachment.collabel.transactiontype"] =
        "Transaction Type";
    translation["email.attachment.collabel.internalid"] = "Internal Id";
    translation["email.attachment.collabel.vendor"] = "Vendor";
    translation["email.conversionerrornotification.subject"] =
        "Error encountered during inbound e-document conversion";
    translation["email.conversionerrornotification.body"] =
        "There were errors encountered during inbound e-document conversion.<br/>Please see the attached file for the list of records with errors and their details.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Note: If you want a different user to receive the notifications instead of your account administrators, enter the email address of the user in the Recipient of E-Document Notifications field in your parent subsidiary record.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Inbound E-Document ID";
    translation["email.table.collabel.details"] = "Details";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Error encountered during license check of the account";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "This account does not have an active license for multi-country use of Electronic Invoicing.</br>To process e-documents by bulk, please configure the E-Document Country for Free Use in the company information page.";
    //END EMAIL
    //START INBOUND E-DOCUMENT
    translation["inboundedocument.logforconversion"] =
        "The inbound e-document is ready for conversion.";
    translation["inboundedocument.logincomplete"] =
        "The inbound e-document is incomplete. No {FIELD} was selected.";
    translation["inboundedocument.deletenotallowed"] =
        "Deleting an inbound e-document is not allowed.";
    translation["inboundedocument.copynotallowed"] =
        "Copying an inbound e-document is not allowed.";
    translation["inboundedocument.contextunsupported"] =
        "Inbound e-document only supports UI and SuiteScript contexts.";
    translation["inboundedocument.invalidxmlfile"] =
        "The selected XML File Reference is not a valid XML file. Ensure that the file you select has the .xml extension.";
    translation["inboundedocument.invalidpdffile"] =
        "The selected PDF File Reference is not a valid PDF file. Ensure that the file you select has the .pdf extension.";
    translation["inboundedocument.invalidxml"] =
        "The selected XML File Reference is not a well-formed XML document.";
    translation["inboundedocument.convert.button"] = "Convert";
    translation["inboundedocument.convert.information"] =
        "Conversion of this inbound E-document is in progress.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Conversion of this inbound E-Document is already in progress.";
    translation["inboundedocument.cancel.button"] = "Cancel E-Document";
    translation["inboundedocument.cancel.confirmation"] =
        "Are you sure you want to cancel this inbound e-document?";
    translation["inboundedocument.cancel.failed"] =
        "Cancellation failed because the status of the inbound e-document record is '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "An error occurred during cancellation. Check the E-Document Audit Trail on the E-Document subtab for details.";
    translation["inboundedocument.cancel.complete"] =
        "The e-document has been canceled.";
    translation["inboundedocument.preview.button"] = "View XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "This account does not have an active license to use the Electronic Invoicing SuiteApp in multiple countries. To convert this e-document to a transaction, please contact your account administrator to specify a country in the E-Document Country for Free Use field on the Company Information page.";
    translation["inboundedocument.msg.txncountrydifferentthanfreecountry"] =
        "This account does not have an active license to use the Electronic Invoicing SuiteApp in multiple countries. To convert this e-document to a transaction, please contact your NetSuite account manager to purchase a license.";
    //END INBOUND E-DOCUMENT
    //START INBOUND VALIDATION PLUGIN
    translation["validationplugin.contextunsupported"] =
        "Inbound E-Document Validation Plugin only supports UI and SuiteScript contexts.";
    translation["validationplugin.pluginimplementation"] =
        "Inbound E-Document Validation Plugin Implementation";
    translation["validationplugin.pluginimplementationhelp"] =
        "Select an Inbound E-Document Validation Plugin Implementation.";
    translation["validationplugin.scriptbannermessage"] =
        'Inbound e-document validation should be custom plug-in implementations. Please recreate existing validation scripts as new custom plug-in implementations of the type "Inbound Validation Plugin"';
    //END INBOUND VALIDATION PLUGIN
    //START E-DOCUMENT CONVERSION
    translation["ei.conversion.defaulterror"] =
        "An error occurred during conversion. Check the E-Document Audit Trail on the E-Document subtab for details.";
    translation["ei.conversion.inactivevendor"] =
        "Unable to convert this inbound e-document because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try converting the e-document again.";
    translation["ei.conversion.inactivecustomer"] =
        "Unable to convert this inbound e-document because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try converting the e-document again.";
    translation["ei.conversion.conversioncomplete"] =
        "The e-document has been converted.";
    translation["ei.conversion.conversionlogbulk"] =
        "The inbound e-document was included in the bulk conversion and was converted into the transaction with internal ID: {INTERNALID} of Type: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "The inbound e-document was converted to the transaction with internal ID: {INTERNALID} of Type: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Bulk conversion process\nE-document template used: {TEMPLATENAME}\n" +
        "Error scope: {ERRORSCOPE}\n" +
        "Error details: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "E-document template used: {TEMPLATENAME}\n" +
        "Error scope: {ERRORSCOPE}\n" +
        "Error details: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Parsing failure. Check the Field Mapping for Inbound E-documents.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Conversion failure.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Validation failure.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Conversion failed because the status of the inbound e-document record is '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Inbound e-documents with inactive customers are not supported for conversion.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Inbound e-documents with inactive vendors are not supported for conversion.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "The following vendor codes: {ITEMLIST}, are not associated with any item records.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "The following vendor name/codes: {ITEMLIST}, are not associated with any item records.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "The following vendor codes: {ITEMLIST}, are associated with multiple item records. Modify the item records and ensure that vendor codes are unique for each item per vendor.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "The following vendor name/codes: {ITEMLIST}, are associated with multiple item records. Modify the item records and ensure that vendor name/codes are unique for each item per vendor.";
    translation["ei.conversion.refnumnotfound"] =
        "The required reference number is missing in the inbound e-document. Cancel this e-document and submit another e-document that includes an XML element for the reference number, mapped to the tranid field.";
    translation["ei.conversion.refnumexists"] =
        "A vendor bill with the same reference number already exists. Cancel this e-document and submit another e-document with the correct reference number value for the XML element mapped to the tranid field.";
    translation["ei.conversion.vendorcodenotfound"] =
        "The vendorcode field is missing in the e-document template. Modify the e-document template or select another template that includes vendorcode field mapping.";
    translation["ei.conversion.novendorcodevalue"] =
        "At least one of the items has no vendor code. Cancel this e-document and submit another e-document with the correct value for the XML element mapped to the vendor code field.";
    translation["ei.conversion.vendornamenotfound"] =
        "The vendorname field is missing in the e-document template. Modify the e-document template or select another template that includes vendorname field mapping.";
    translation["ei.conversion.novendornamevalue"] =
        "At least one of the items has no vendor name/code. Cancel this e-document and submit another e-document with the correct value for the XML element mapped to the vendor name/code field.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Record ({TRANSTYPE}#{TRANSID}) was not found in the system. Cancel this e-document and submit another e-document with the correct value for the XML element mapped to the createdfrom field.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Record ({TRANSTYPE}#{TRANSID}) is assigned to a different entity. Select the correct entity and convert this e-document.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "The vendor has no default expense account, which is required to convert bills with expenses. To proceed with conversion, set a value in the Default Expense Account field in the vendor record.";
    translation["ei.conversion.nolinktopo"] =
        "The inbound e-document has no item or expense that is included in the referenced purchase order. Check the status of the referenced purchase order if it can be converted. If it can be converted, cancel this e-document and submit another e-document with the correct value for the XML element mapped to the createdfrom field.";
    //END E-DOCUMENT CONVERSION
    //START FAILED E-DOCUMENT BULK CONVERSION
    translation["inbound.formtitle"] = "Convert Inbound E-Documents";
    translation["inbound.search"] = "Search";
    translation["inbound.convert"] = "Convert";
    translation["inbound.return"] = "Return to Criteria";
    translation["inbound.vendor"] = "Vendor";
    translation["inbound.datefrom"] = "Date Created From";
    translation["inbound.dateto"] = "Date Created To";
    translation["inbound.vendorhelp"] =
        "Select the vendor whose failed inbound e-documents will be included in the search result.";
    translation["inbound.datefromhelp"] =
        "Select a start date to define a period during which failed inbound e-documents created within that period will be included in the search result.";
    translation["inbound.datetohelp"] =
        "Select an end date to define a period during which failed inbound e-documents created within that period will be included in the search result.";
    translation["inbound.inboundedocfieldgroup"] =
        "Failed Inbound E-Document Search Filters ";
    translation["inbound.sublist.sublistname"] =
        "Results of Failed Inbound E-Document Search";
    translation["inbound.sublist.internalid"] = "Internal ID";
    translation["inbound.sublist.vendor"] = "Vendor";
    translation["inbound.sublist.refnum"] = "Reference Number";
    translation["inbound.sublist.ponum"] = "PO Number";
    translation["inbound.sublist.datecreated"] = "Date Created";
    translation["inbound.sublist.edoctemplate"] = "E-Document Template";
    translation["inbound.msg.conversionongoing"] =
        "The e-document is currently being converted. You will receive an email when the process is completed.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "You cannot perform the search with the selected criteria because the inbound e-document conversion is already in progress for the date range ({DATECREATED_FROM} - {DATECREATED_TO}). You must change your search criteria or try again after converting this e-document.";
    translation["inbound.invaliddates"] =
        "The Date Created From must not be later than the Date Created To. Change the dates so that the Date Created From is earlier than the Date Created To.";
    translation["inbound.configurefreecountry"] =
        "This account does not have an active license to use the Electronic Invoicing SuiteApp in multiple countries. To convert e-documents in bulk, please contact your account administrator to configure the E-Document Country for Free Use on the Company Information page.";
    //END FAILED E-DOCUMENT BULK CONVERSION
    //START DASHBOARD PORTLET
    translation["portlet.title"] = "Electronic Documents";
    translation["portlet.outboundforgeneration"] =
        "Outbound E-Documents for Generation";
    translation["portlet.outboundforsending"] =
        "Outbound E-Documents for Sending";
    translation["portlet.outboundwitherrors"] =
        "Outbound E-Documents with Errors";
    translation["portlet.outboundsendinglink"] =
        "Send Failed Outbound E-Documents";
    translation["portlet.inboundforconversion"] =
        "Inbound E-Documents for Conversion";
    translation["portlet.inboundconvertfailed"] =
        "Convert Failed Inbound E-Documents";
    translation["portlet.inboundincomplete"] = "Incomplete Inbound E-Documents";
    translation["portlet.inbounduploadlink"] = "Upload Inbound E-Document";
    translation["portlet.outboundforcertification"] =
        "Outbound E-Documents for Certification";
    translation["portlet.outboundcertifiedforsending"] =
        "Outbound E-Documents for Sending";
    //END DASHBOARD PORTLET
    //START INBOUND WEB SERVICE
    translation["inbound.webservice.response.success"] =
        "The inbound e-document with ID: {ID} was successfully created.";
    translation["inbound.webservice.response.novendor"] =
        "No vendor is associated with the Web Service ID: {IDENTIFIER}. Ensure that the correct Web Service ID is used.";
    translation["inbound.webservice.response.multiplevendor"] =
        "The inbound e-document with ID: {ID} was successfully created. However, multiple vendors are associated with Web Service ID: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "The inbound e-document is incomplete, as the correct template cannot be determined. Either select a template in the inbound e-document record, or set up the XSD in the e-document template record to enable template autoselection.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "The inbound e-document is incomplete, as the correct vendor cannot be determined. Either select a vendor in the inbound e-document record, or set the Web Service ID in the associated vendor record.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "The following keys are missing: {KEYS}, which you must provide in the web service request.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "The body of the web service request must be a JSON object or an array of JSON objects using Content-Type: 'application/json'.";
    //END INBOUND WEB SERVICE
    //START TRANSACTION EMAIL VALIDATION
    translation["transaction.contactnoemail"] =
        "The following e-document recipients do not have an email address in their contact records: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "There are no e-document recipients for this transaction. To send e-documents by email, at least one contact must be added to the list of e-document recipients.";
    translation["transaction.maxrecipientexceeded"] =
        "The number of email recipients you added have exceeded the limit. You can add maximum of 10 email recipients.";
    //END TRANSACTION EMAIL VALIDATION
    //START BULK GENERATION CUSTOM TRANSACTION VALIDATION
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Only the following transaction types are processed:";
    //END BULK GENERATION CUSTOM TRANSACTION VALIDATION

    //E-Document Preferences Automation
    translation["ei.prefs.formtitle"] = "E-Document Preferences";
    translation["ei.prefs.information.about.certify.skip"] =
        "Certify step is skipped if certification sending method is not defined or applicable for the transaction.";
    translation["ei.prefs.label.sublist.automati.ei"] = "Automatic E-Invoicing";
    translation["ei.prefs.label.automatic.type.selected"] =
        "E-Document Automation Type";
    translation["ei.prefs.text.option.comb.disabled"] = "Disable";
    translation["ei.prefs.text.option.comb.gcs"] = "Generate, Certify, Send";
    translation["ei.prefs.text.option.comb.gc"] = "Generate, Certify";
    translation["ei.prefs.text.option.comb.cs"] = "Certify, Send";
    translation["ei.prefs.btn.label.cancel"] = "Cancel";
    translation["ei.prefs.btn.label.save"] = "Save";
    translation["ei.prefs.msg.confirm.save"] =
        "Do you want to save the changes to E-Document preferences?";
    translation["ei.prefs.msg.success.save"] =
        "Saving of E-Document preferences is successful.";
    translation["ei.prefs.msg.failed.save"] =
        "Saving of E-Document preferences failed.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Permission to access to this page is restricted. To request access contact Administrator.";

    //start EIP
    translation["ei.eip.msg.completed"] = "E-document processing completed.";
    translation["ei.eip.msg.failed"] =
        "E-Document processing failed. See E-Document Audit Trail for more details.";
    translation["ei.eip.msg.processing"] = "The E-Document is being processed.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "The E-Document is already being processed.";
    //end EIP

    return translation;
});
