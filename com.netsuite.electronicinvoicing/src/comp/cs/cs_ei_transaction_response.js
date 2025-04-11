/**
 * @preserve
 * @NApiVersion 2.x
 * @NScriptType clientscript
 */

define([
    "N/url",
    "N/https",
    "N/ui/dialog",
    "N/ui/message",
    "../../lib/translator",
    "../../lib/constants/main_constants",
    "../../lib/constants/script_deployments",
    "../../lib/constants/ui_translations_map",
    "../../lib/constants/record_instances",
], function (
    url,
    https,
    dialog,
    message,
    translator,
    mainConstants,
    scriptDeployments,
    uiTranslationsMap,
    recordInstances
) {
    // Scripts
    var SCRIPTS = mainConstants.SCRIPTS;
    var GENERATE_AR_SU_SCRIPT = SCRIPTS.GENERATE_TRANSACTION_RESPONSE;
    var SEND_TRANS_RES_SU_SCRIPT = SCRIPTS.SEND_TRANSACTION_RESPONSE;
    var RECORD_TYPES = mainConstants.RECORD_TYPES;

    // Script Deployments
    var GENERATE_AR_SU_DEPLOY =
        scriptDeployments[GENERATE_AR_SU_SCRIPT].DEFAULT_DEPLOYMENT;
    var SEND_TRANS_RES_SU_DEPLOY =
        scriptDeployments[SEND_TRANS_RES_SU_SCRIPT].DEFAULT_DEPLOYMENT;

    // Record Types
    var TRANSACTION_RESPONSE_REC_TYPE =
        mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE;
    var TRANSACTION_RESPONSE_TYPE_REC_TYPE =
        RECORD_TYPES.TRANSACTION_RESPONSE_TYPE;

    // Banners
    var BANNERS = uiTranslationsMap.BANNERS;
    var SEND_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ =
        BANNERS.SEND_TRANSACTION_RESPONSE_IN_PROGRESS;
    var GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ =
        BANNERS.GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS;

    // Alerts
    var ALERTS = uiTranslationsMap.ALERTS;
    var SENDING_IN_PROGRESS_ALERT_OBJ =
        ALERTS.SENDING_TR_IN_PROGRESS_ALERT_CODE;
    var GENERATION_IN_PROGRESS_ALERT_OBJ =
        ALERTS.GENERATION_TR_IN_PROGRESS_ALERT_CODE;
    const GENERATION_ERROR_IN_TR_ALERT_OBJ =
        ALERTS.GENERATION_ERROR_IN_TR_ALERT_CODE;
    const SENDING_ERROR_IN_TR_ALERT_OBJ = ALERTS.SENDING_ERROR_IN_TR_ALERT_CODE;

    // Dialogs
    var DIALOGS = uiTranslationsMap.DIALOGS;
    var SEND_TR_CANCELLATION_DIALOG_OBJ = DIALOGS.SEND_TR_CANCELLATION;
    var SEND_TR_CANCELLATION_DIALOG_BUTTONS_OBJ =
        SEND_TR_CANCELLATION_DIALOG_OBJ.BUTTONS;
    var SEND_TR_REJECTION_DIALOG_OBJ = DIALOGS.SEND_TR_REJECTION;
    var SEND_TR_REJECTED_DIALOG_OBJ = DIALOGS.SEND_TR_REJECTED;

    // Transaction Response Type Record Instances
    var FOR_CANCELLATION_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].FOR_CANCELLATION;
    var FOR_REJECTION_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].FOR_REJECTION;
    var REJECTED_SCRIPT_ID =
        recordInstances[TRANSACTION_RESPONSE_TYPE_REC_TYPE].REJECTED;

    var generating = false;
    var sending = false;

    /**
     * Generates Transaction Response and redirects to transaction response record
     * @param transRespId
     * @param transRespRecType
     */
    function generateTransactionResp(transRespId, transRespRecType) {
        log.debug(
            "cs_ei_transaction_response: generateTransactionResp(): transRespId",
            transRespId
        );
        log.debug(
            "cs_ei_transaction_response: generateTransactionResp(): transRespRecType",
            transRespRecType
        );

        if (generating) {
            return alert(
                translator.getString(
                    GENERATION_IN_PROGRESS_ALERT_OBJ.MESSAGE_TRANSLATION_CODE
                ) || GENERATION_IN_PROGRESS_ALERT_OBJ.MESSAGE
            );
        }

        generating = true;
        displayBanner(
            message.Type.INFORMATION,
            "",
            translator.getString(
                GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
            ) || GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ.MESSAGE
        );

        var generateSuiteletUrl = url.resolveScript({
            scriptId: GENERATE_AR_SU_SCRIPT,
            deploymentId: GENERATE_AR_SU_DEPLOY,
        });

        https.post
            .promise({
                url: generateSuiteletUrl,
                body: {
                    transRespId,
                    transRespRecType,
                },
            })
            .then(function redirectToTr() {
                redirectAfterProcess(transRespId);
            })
            .catch(function (err) {
                log.error(
                    "cs_ei_transaction_response: generateTransactionResp(): err",
                    err
                );
                alert(
                    translator.getString(
                        GENERATION_ERROR_IN_TR_ALERT_OBJ.MESSAGE_TRANSLATION_CODE
                    ) || GENERATION_ERROR_IN_TR_ALERT_OBJ.MESSAGE
                );
            });
    }

    /**
     * Sends Transaction Response based on Avalara Mandate field value
     * @param avalaraMandate
     * @param transRespTranId
     * @param transRespId
     * @param transRespType
     * @param transRespStatus
     * @param tranType
     * @param subsidiaryId
     * @param entity
     */
    function sendTransactionResp(
        avalaraMandate,
        transRespTranId,
        transRespId,
        transRespType,
        transRespStatus,
        tranType,
        subsidiaryId,
        entity
    ) {
        log.debug("sendTransactionResp(): avalaraMandate", avalaraMandate);
        log.debug("sendTransactionResp(): transRespTranId", transRespTranId);
        log.debug("sendTransactionResp(): transRespId", transRespId);
        log.debug("sendTransactionResp(): transRespType", transRespType);
        log.debug("sendTransactionResp(): transRespStatus", transRespStatus);
        log.debug("sendTransactionResp(): tranType", tranType);
        log.debug("sendTransactionResp(): subsidiaryId", subsidiaryId);
        log.debug("sendTransactionResp(): entity", entity);

        if (sending) {
            return alert(
                translator.getString(
                    SENDING_IN_PROGRESS_ALERT_OBJ.MESSAGE_TRANSLATION_CODE
                ) || SENDING_IN_PROGRESS_ALERT_OBJ.MESSAGE
            );
        }
        var dialogDetails = getDialogDetailsByResponseType(transRespType);
        var options = {
            title: dialogDetails.dialogTitle,
            message: dialogDetails.dialogMessage,
            buttons: [
                {
                    label: SEND_TR_CANCELLATION_DIALOG_BUTTONS_OBJ.SEND.LABEL,
                    value: 1,
                },
                {
                    label: SEND_TR_CANCELLATION_DIALOG_BUTTONS_OBJ.CANCEL.LABEL,
                    value: 0,
                },
            ],
        };
        dialog.create(options).then(success).catch();
        function success(result) {
            if (result == 1) {
                sending = true;
                displayBanner(
                    message.Type.INFORMATION,
                    "",
                    translator.getString(
                        SEND_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ.MESSAGE_TRANSLATION_CODE
                    ) ||
                        SEND_TRANSACTION_RESPONSE_IN_PROGRESS_BANNER_OBJ.MESSAGE
                );
                var suiteletURL = url.resolveScript({
                    scriptId: SEND_TRANS_RES_SU_SCRIPT,
                    deploymentId: SEND_TRANS_RES_SU_DEPLOY,
                });
                https.post
                    .promise({
                        url: suiteletURL,
                        body: {
                            avalaraMandate,
                            transRespTranId,
                            transRespId,
                            transRespType,
                            transRespStatus,
                            tranType,
                            subsidiaryId,
                            entity,
                        },
                    })
                    .then(function () {
                        redirectAfterProcess(transRespId);
                    })
                    .catch(function (err) {
                        log.error("error in sendTransactionResp", err);
                        alert(
                            translator.getString(
                                SENDING_ERROR_IN_TR_ALERT_OBJ.MESSAGE_TRANSLATION_CODE
                            ) || SENDING_ERROR_IN_TR_ALERT_OBJ.MESSAGE
                        );
                    });
            }
        }
    }

    function getDialogDetailsByResponseType(responseType) {
        var dialogTitle = "";
        var dialogMessage = "";
        switch (responseType) {
            case FOR_CANCELLATION_SCRIPT_ID:
                dialogTitle = translator.getString(
                    SEND_TR_CANCELLATION_DIALOG_OBJ.TITLE_TRANSLATION_CODE ||
                        SEND_TR_CANCELLATION_DIALOG_OBJ.TITLE
                );
                dialogMessage = translator.getString(
                    SEND_TR_CANCELLATION_DIALOG_OBJ.MESSAGE_TRANSLATION_CODE ||
                        SEND_TR_CANCELLATION_DIALOG_OBJ.MESSAGE
                );
                break;
            case FOR_REJECTION_SCRIPT_ID:
                dialogTitle = translator.getString(
                    SEND_TR_REJECTION_DIALOG_OBJ.TITLE_TRANSLATION_CODE ||
                        SEND_TR_REJECTION_DIALOG_OBJ.TITLE
                );
                dialogMessage = translator.getString(
                    SEND_TR_REJECTION_DIALOG_OBJ.MESSAGE_TRANSLATION_CODE ||
                        SEND_TR_REJECTION_DIALOG_OBJ.MESSAGE
                );
                break;
            case REJECTED_SCRIPT_ID:
                dialogTitle = translator.getString(
                    SEND_TR_REJECTED_DIALOG_OBJ.TITLE_TRANSLATION_CODE ||
                        SEND_TR_REJECTED_DIALOG_OBJ.TITLE
                );
                dialogMessage = translator.getString(
                    SEND_TR_REJECTED_DIALOG_OBJ.MESSAGE_TRANSLATION_CODE ||
                        SEND_TR_REJECTED_DIALOG_OBJ.MESSAGE
                );
                break;
        }
        return {
            dialogTitle: dialogTitle,
            dialogMessage: dialogMessage,
        };
    }

    /**
     * Redirects to transaction response record of id passed with ei_show_banner query parameter as true
     * @param transRespId
     */
    function redirectAfterProcess(transRespId) {
        log.debug(
            "cs_ei_transaction_response: redirectAfterProcess(): transRespId",
            transRespId
        );

        var urlParameters = {
            ei_show_banner: true,
        };
        var recordURL = url.resolveRecord({
            recordType: TRANSACTION_RESPONSE_REC_TYPE,
            recordId: transRespId,
            params: urlParameters,
        });

        log.debug(
            "cs_ei_transaction_response: redirectAfterProcess(): recordURL",
            recordURL
        );
        window.location = recordURL;
    }

    /**
     * Displays banner based on the required params passed
     * @param messageType
     * @param title
     * @param bannerMessage
     */
    function displayBanner(messageType, title, bannerMessage) {
        message
            .create({
                type: messageType,
                message: bannerMessage,
                title: title,
            })
            .show();
    }

    return {
        generateTransactionResp: generateTransactionResp,
        sendTransactionResp: sendTransactionResp,
    };
});
