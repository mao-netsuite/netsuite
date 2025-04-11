define([], function () {
    return {
        ERR_CODES: {
            ERR_CODE_BILL_IS_APPROVED_GEN: {
                NAME: "ERR_VENDOR_BILL_ALREADY_APPROVED_GEN",
                MESSAGE_TRANSLATION_CODE:
                    "trans.res.bill.approved.error.generate",
                MESSAGE:
                    "Cannot generate Transaction Response content as Vendor Bill '{ID}' is already approved.",
            },
            ERR_CODE_BILL_IS_APPROVED_SEND: {
                NAME: "ERR_VENDOR_BILL_ALREADY_APPROVED_SEND",
                MESSAGE_TRANSLATION_CODE: "trans.res.bill.approved.error.send",
                MESSAGE:
                    "Cannot send Transaction Response content as Vendor Bill '{ID}' is already approved.",
            },
            ERR_CODE_MANDATE_NOT_ACTIVE: {
                NAME: "ERR_MANDATE_NOT_ACTIVE",
                MESSAGE_TRANSLATION_CODE: "trans.res.mandate.not.active.error",
                MESSAGE:
                    "E-Invoicing Mandate '{MANDATE_NAME}' is not activated. Please contact your Avalara manager.",
            },
            ERR_CODE_TEMPLATE_NOT_FOUND: {
                NAME: "ERR_TEMPLATE_NOT_FOUND",
                MESSAGE_TRANSLATION_CODE: "trans.res.template.not.found",
                MESSAGE: "Transaction Response template not found",
            },
            ERR_CODE_TEMPLATE_NOT_FOUND_OR_INACTIVE: {
                NAME: "ERR_TEMPLATE_NOT_FOUND_OR_INACTIVE",
                MESSAGE_TRANSLATION_CODE:
                    "trans.res.template.not.found.or.active",
                MESSAGE: "Transaction Response Template not found or inactive.",
            },
            ERR_CODE_SUBSIDIARY_INACTIVE: {
                NAME: "SUBSIDIARY_INACTIVE",
                MESSAGE_TRANSLATION_CODE: "trans.res.sub.inactive.error",
                MESSAGE:
                    "Subsidiary associated with the transaction linked to the transaction response is inactive. Please use an active subsidiary.",
            },
            ERR_CODE_TRANS_RES_NOT_SUPPORTED: {
                NAME: "NO_TR_SUPPORT_SUBS_PREF",
                MESSAGE_TRANSLATION_CODE: "trans.res.not.supported.error",
                MESSAGE:
                    "Transaction Response Support is not present for the corresponding subsidiary preference. Please enable Transaction Response support for the corresponding subsidiary preference",
            },
            ERR_SUB_NOT_FOUND: {
                NAME: "ERR_SUB_NOT_FOUND",
                MESSAGE_TRANSLATION_CODE: "trans.res.sub.not.found",
                MESSAGE:
                    "Cannot send Transaction Response content as no subsidiary is found.",
            },
            ERR_CODE_TR_TRANS_NOT_LINKED: {
                NAME: "NO_TRANS_LINKED_TO_TR",
                MESSAGE_TRANSLATION_CODE: "trans.res.no.tran.linked.error",
                MESSAGE:
                    "No Transaction is linked to the Transaction Response record.",
            },
            ERR_CODE_TRANS_RESP_TEMPLATE_INACTIVE: {
                NAME: "ERR_TEMPLATE_INACTIVE",
                MESSAGE_TRANSLATION_CODE: "trans.res.template.inactive",
                MESSAGE: "Transaction Response template is inactive",
            },
            ERR_CODE_TRANS_RESP_INVALID_STATUS: {
                NAME: "ERR_TRANS_RESP_INVALID_STATUS",
                MESSAGE_TRANSLATION_CODE: "trans.res.status.invalid",
                MESSAGE:
                    "Generation failed because TR not created with 'Ready for Generation' status",
            },
            ERR_CODE_REQUIRED_FIELD_MISSING: {
                NAME: "ERR_REQUIRED_FIELD_MISSING",
                MESSAGE_TRANSLATION_CODE: "util.err.msg.required.field.missing",
                MESSAGE: "'{FIELDLABEL}' cannot be empty",
            },
            ERR_CODE_TRANS_RES_RECORD_MISSING: {
                NAME: "TRANS_RESP_REC_NOT_FOUND",
                MESSAGE_TRANSLATION_CODE: "trans.res.rec.not.found",
                MESSAGE: "Transaction Response record not found while sending.",
            },
            ERR_CODE_TRANS_RES_SEND_METH_INACTIVE: {
                NAME: "TRANS_RESP_SEND_METH_INACTIVE",
                MESSAGE_TRANSLATION_CODE:
                    "ei.sending.subsidiary.method.notpresent",
                MESSAGE:
                    "The e-document transaction response sending method is either inactive or not available for the subsidiary.",
            },
            ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE_INDIVIDUAL: {
                CUSTOMER: {
                    NAME: "TRANS_RES_SEND_NO_RECIPIENTS",
                    MESSAGE_TRANSLATION_CODE: "ei.sending.indivcustnoemail.tr",
                    MESSAGE:
                        "The transaction response cannot be sent because the customer has no email address. Before you can send this transaction response by email, an email address must be provided on the customer record.",
                },
                VENDOR: {
                    NAME: "TRANS_RES_SEND_NO_RECIPIENTS",
                    MESSAGE_TRANSLATION_CODE: "ei.sending.indivvendnoemail.tr",
                    MESSAGE:
                        "The transaction response content cannot be sent because the vendor has no email address. Before you can send this transaction response content by email, an email address must be provided on the vendor record.",
                },
            },
            ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_ISSUE: {
                CUSTOMER: {
                    NAME: "TRANS_RES_SEND_NO_RECIPIENTS",
                    MESSAGE_TRANSLATION_CODE: "ei.sending.norecipients.tr",
                    MESSAGE:
                        "The transaction response content cannot be sent because the customer has no e-document recipients. Before you can send this transaction response content by email, e-document recipients must first be selected on the customer record.",
                },
                VENDOR: {
                    NAME: "TRANS_RES_SEND_NO_RECIPIENTS",
                    MESSAGE_TRANSLATION_CODE:
                        "ei.sending.norecipients.vendor.tr",
                    MESSAGE:
                        "The transaction response content cannot be sent because the vendor has no e-document recipients. Before you can send this transaction response content by email, e-document recipients must first be selected on the vendor record.",
                },
            },
            ERR_CODE_TRANS_RES_SEND_METH_RECIPIENT_NO_EMAIL: {
                CUSTOMER: {
                    NAME: "TRANS_RES_SENDING_RECIPIENT_NO_EMAIL",
                    MESSAGE_TRANSLATION_CODE: "ei.sending.recipientnoemail.tr",
                    MESSAGE:
                        "One or more recipients of the transaction response content associated with this transaction response does not have an email address. Verify that the recipients for this customer have valid email addresses.",
                },
                VENDOR: {
                    NAME: "TRANS_RES_SENDING_RECIPIENT_NO_EMAIL",
                    MESSAGE_TRANSLATION_CODE:
                        "ei.sending.recipientnoemail.vendor.tr",
                    MESSAGE:
                        "One or more recipients of the transaction response content associated with this transaction response does not have an email address. Verify that the recipients for this vendor have valid email addresses.",
                },
            },
            ERR_CODE_ENTITY_INACTIVE: {
                CUSTOMER: {
                    NAME: "TRANS_RES_ENTITY_INACTIVE",
                    MESSAGE_TRANSLATION_CODE: "ei.sending.inactivecustomer.manager.tr",
                    MESSAGE:
                        "Transaction Responses with inactive customers are not supported by Electronic Invoicing.",
                },
                VENDOR: {
                    NAME: "TRANS_RES_ENTITY_INACTIVE",
                    MESSAGE_TRANSLATION_CODE:
                        "ei.sending.inactivevendor.manager.tr",
                    MESSAGE:
                        "Transaction Responses with inactive vendors are not supported by Electronic Invoicing.",
                },
            },
            ERR_CODE_CDS_FAILURE: {
                NAME: "CDS_FAILURE_ERROR",
                MESSAGE:
                    "Execution of custom data source plug-in implementation has failed.",
            },
            ERR_CODE_COPY_TR: {
                NAME: "TR_CANNOT_BE_COPIED",
                MESSAGE_TRANSLATION_CODE: "trans.res.cannot.copy",
                MESSAGE: "Transaction response record cannot be copied.",
            },
            ERR_CODE_DELETE_TR: {
                NAME: "TR_CANNOT_BE_DELETED",
                MESSAGE_TRANSLATION_CODE: "trans.res.cannot.delete",
                MESSAGE: "Transaction response record cannot be deleted.",
            },
        },
        MAILS: {
            NO_LICENSE: {
                USER_ACTION_BULK_GEN: {
                    MESSAGE_TRANSLATION_CODE: "useraction.license.notpresent.bulkgen",
                    MESSAGE: ""
                },
                USER_ACTION_BULK_CERT: {
                    MESSAGE_TRANSLATION_CODE: "useraction.license.notpresent.bulkcert",
                    MESSAGE: ""
                },
            },
        },
    };
});
