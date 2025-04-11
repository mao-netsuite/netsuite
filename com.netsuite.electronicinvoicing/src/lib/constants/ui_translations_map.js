define([], function () {
    return {
        BUTTONS: {
            GENERATE_TRANSACTION_RESPONSE: {
                LABEL_TRANSLATION_CODE: "transres.generate.button.label",
                LABEL: "Generate",
            },
            SEND_TRANSACTION_RESPONSE: {
                LABEL_TRANSLATION_CODE: "transres.send.button.label",
                LABEL: "Send",
            },
        },
        FIELDS: {
            REASON_FOR_CANCELLATION: {
                LABEL_TRANSLATION_CODE:
                    "transresponse.reason.for.cancellation.label",
                LABEL: "Reason For Cancellation",
            },
            REASON_FOR_REJECTION: {
                LABEL_TRANSLATION_CODE:
                    "transresponse.reason.for.rejection.label",
                LABEL: "Reason For Rejection",
            },
        },
        BANNERS: {
            GENERATE_TRANSACTION_RESPONSE_SUCCESS: {
                MESSAGE_TRANSLATION_CODE: "transresponse.gen.success.msg",
                MESSAGE: "Transaction Response Content Ready to Be Sent",
            },
            GENERATE_TRANSACTION_RESPONSE_FAILURE: {
                TITLE_TRANSLATION_CODE: "transresponse.gen.failure.title",
                TITLE: "Generation Unsuccessful",
                MESSAGE_TRANSLATION_CODE: "transresponse.gen.failure.msg",
                MESSAGE:
                    "An error occurred during generation. See the Error Details tab for more information",
            },
            SEND_TRANSACTION_RESPONSE_SUCCESS: {
                MESSAGE_TRANSLATION_CODE: "transresponse.sending.success",
                MESSAGE: "Transaction Response Content has been sent.",
            },
            SEND_TRANSACTION_RESPONSE_FAILURE: {
                TITLE_TRANSLATION_CODE: "send.tr.unsuccess.title",
                TITLE: "Sending Unsuccessful",
                MESSAGE_TRANSLATION_CODE: "transresponse.sending.error",
                MESSAGE:
                    "Error occurred during sending. Please check the Error Details subtab for more details.",
            },
            SEND_TRANSACTION_RESPONSE_IN_PROGRESS: {
                MESSAGE_TRANSLATION_CODE: "transresponse.sending.in.progress",
                MESSAGE: "Transaction Response Content sending is in progress.",
            },
            GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS: {
                MESSAGE_TRANSLATION_CODE:
                    "transresponse.generation.in.progress",
                MESSAGE:
                    "Transaction Response Content generation is in progress.",
            },
            NO_GEN_AND_SEND_TR_PERMISSION: {
                TITLE_TRANSLATION_CODE:
                    "transresponse.no.gen.and.send.ar.access.title",
                TITLE: "Transaction Response Content cannot be Generated or Sent.",
                MESSAGE_TRANSLATION_CODE:
                    "transresponse.no.gen.and.send.ar.access.msg",
                MESSAGE:
                    "The transaction response content cannot be generated or sent due to insufficient permissions. Contact a user with the Administrator role.",
            },
            REQ_LICENSES_MISSING: {
                TITLE_TRANSLATION_CODE: "trans.res.req.license.missing.title",
                TITLE: "No Active License(s) present.",
                MESSAGE_TRANSLATION_CODE: "trans.res.req.license.missing.msg",
                MESSAGE:
                    "This account does not have active {REQ_LICENSES} license(s). To send transaction response content, please contact your account administrator to purchase the license(s)",
                EI: {
                    FC_NOT_SET: {
                        MESSAGE_TRANSLATION_CODE: "trans.res.ei.fc.not.set.msg",
                        MESSAGE:
                            "This account does not have an active license for multi-country use of Electronic Invoicing. To generate transaction response content, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page.",
                    },
                    FC_NOT_MATCHING: {
                        MESSAGE_TRANSLATION_CODE:
                            "trans.res.ei.fc.not.matching.msg",
                        MESSAGE:
                            "This account does not have an active license for multi-country use of Electronic Invoicing. To generate transaction response content, please contact your account administrator to purchase a license.",
                    },
                },
                NO_LC_BUNDLE: {
                    MESSAGE_TRANSLATION_CODE: "trans.res.lc.not.installed",
                    MESSAGE:
                        "The NetSuite SuiteApps License Client is not available in your account. To generate or send transaction response content, please install this SuiteApp.",
                },
            },
        },
        ALERTS: {
            SENDING_TR_IN_PROGRESS_ALERT_CODE: {
                MESSAGE_TRANSLATION_CODE:
                    "transresponse.sending.in.progress.alert",
                MESSAGE: "Sending is in progress.",
            },
            GENERATION_TR_IN_PROGRESS_ALERT_CODE: {
                MESSAGE_TRANSLATION_CODE:
                    "transresponse.generation.in.progress.alert",
                MESSAGE: "Generation is in progress.",
            },
            GENERATION_ERROR_IN_TR_ALERT_CODE: {
                MESSAGE_TRANSLATION_CODE:
                    "transresponse.generation.error.alert",
                MESSAGE:
                    "Error generating the transaction response. Please try again later.",
            },
            SENDING_ERROR_IN_TR_ALERT_CODE: {
                MESSAGE_TRANSLATION_CODE: "transresponse.sending.error.alert",
                MESSAGE:
                    "Error sending the transaction response. Please try again later.",
            },
        },
        DIALOGS: {
            SEND_TR_CANCELLATION: {
                TITLE_TRANSLATION_CODE:
                    "value.val.send.dialog.cancellation.title",
                TITLE: "Send Cancellation Request?",
                MESSAGE_TRANSLATION_CODE: "value.val.send.dialog.ok.cancel",
                MESSAGE:
                    "A cancellation request transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",
                BUTTONS: {
                    SEND: {
                        LABEL: "Send",
                    },
                    CANCEL: {
                        LABEL: "Cancel",
                    },
                },
            },
            SEND_TR_REJECTION: {
                TITLE_TRANSLATION_CODE: "value.val.send.dialog.rejection.title",
                TITLE: "Send Rejection Request?",
                MESSAGE_TRANSLATION_CODE: "value.val.send.dialog.ok.reject",
                MESSAGE:
                    "A rejection request transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",
                BUTTONS: {
                    SEND: {
                        LABEL_TRANSLATION_CODE: "",
                        LABEL: "Send",
                    },
                    CANCEL: {
                        LABEL_TRANSLATION_CODE: "",
                        LABEL: "Cancel",
                    },
                },
            },
            SEND_TR_REJECTED: {
                TITLE_TRANSLATION_CODE: "value.val.send.dialog.rejected.title",
                TITLE: "Send Rejected Request?",
                MESSAGE_TRANSLATION_CODE: "value.val.send.dialog.ok.rejected",
                MESSAGE:
                    "A rejected type transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",
                BUTTONS: {
                    SEND: {
                        LABEL_TRANSLATION_CODE: "",
                        LABEL: "Send",
                    },
                    CANCEL: {
                        LABEL_TRANSLATION_CODE: "",
                        LABEL: "Cancel",
                    },
                },
            },
        },
    };
});
