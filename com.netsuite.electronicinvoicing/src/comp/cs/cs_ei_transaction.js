/**
 * @preserve
 *
 * @NApiVersion 2.1
 * @NScriptName E-Document Sales Transaction CS
 * @NScriptId _edoc_sales_transaction_cs
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

define([
    "N/https",
    "N/url",
    "../../lib/translator",
    "N/ui/message",
    "N/search",
    "N/runtime",
    "../../lib/app/app_transaction_type_map",
    "N/log",
], function (
    https,
    url,
    translator,
    message,
    search,
    runtime,
    transactionMap,
    log
) {
    var EI_STATUS = "custbody_psg_ei_status";
    var EI_TEMPLATE = "custbody_psg_ei_template";
    var EI_GENERATE_PDF_CHK_BOX = "custbody_edoc_gen_trans_pdf";
    var EI_GENERATED_PDF = "custbody_edoc_generated_pdf";
    var SEND_SU_SCRIPT = "customscript_su_send_e_invoice";
    var SEND_SU_DEPLOY = "customdeploy_su_send_e_invoice";
    var NETWORK_STATUS_SU_SCRIPT = "customscript_get_network_status_su";
    var NETWORK_STATUS_SU_DEPLOY = "customdeploy_get_network_status_su";
    var GENERATE_SU_SCRIPT = "customscript_ei_generation_service_su";
    var GENERATE_SU_DEPLOY = "customdeploy_ei_generation_service_su";
    var EDOC_PROCESS_SU_SCRIPT = "customscript_ei_processing_service_su";
    var EDOC_PROCESS_SU_DEPLOY = "customdeploy_ei_processing_service_su";
    var ENTITY_AUTO_SELECT_SM_TEMPLATE =
        "custentity_psg_ei_auto_select_temp_sm";
    var EI_CERTIFIED_EDOCUMENT = "custbody_psg_ei_certified_edoc";
    var EI_GENERATED_EDOCUMENT = "custbody_psg_ei_generated_edoc";
    var SENT = "7";
    var EI_ENTITY_FIELD = "entity";
    var CUSTOMER_FIELD = "customer";
    var EI_SENDING_METHOD = "custbody_psg_ei_sending_method";    
    var ITEM_FULFILLMENT = "itemfulfillment";
    var TRANSFER_ORDER = "TrnfrOrd";
    var VENDOR_RETURN_AUTHORIZATION = "vendauth";
    var SALES_ORDER = "salesord";
    var REC_TRANSFER_ORDER = "transferorder";
    var REC_VENDOR_RETURN_AUTHORIZATION = "vendorreturnauthorization";
    var REC_SALES_ORDER = "salesorder";
    var TEMPLATE_PACKAGE = "custrecord_psg_ei_template_edoc_standard";
    var TEMPLATE_SUBSIDIARY = "custrecord_psg_ei_template_subsidiary";
    var TEMPLATE_TRANSACTION = "custrecord_psg_ei_template_trans_type";
    var SENDING_METHOD_PACKAGE = "custrecord_psg_ei_edoc_standard";
    var SENDING_METHOD_SUBSIDIARY = "custrecord_psg_ei_sm_subsidiary";
    var SENDING_METHOD_TRANSACTION = "custrecord_psg_ei_trans_type";
    var ISINACTIVE_FIELD = "isinactive";
    var ALREADY_SENT_GENERATION_CONFIRMATION_CODE =
        "transaction.msg.alreadysentgenerationconfirm";
    var REMOVE_TEMPLATE_ALREADY_SENT_CODE =
        "transaction.msg.removetemplatealreadysent";

    var EIP_INFORMATION_MSG_CODE = "ei.eip.msg.processing";
    var GENERATE_INFORMATION_MSG_CODE = "transaction.msg.generate.information";
    var SEND_INFORMATION_MSG_CODE = "transaction.msg.send.information";
    var CERTIFY_INFORMATION_MSG_CODE =
        "transaction.msg.send.certify.information";

    var EIP_ALREADY_INPROGRESS_INFORMATION_MSG_CODE =
        "ei.eip.msg.processing.alreadyinprogress";
    var GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG_CODE =
        "transaction.msg.generate.alreadyinprogress.information";
    var SEND_ALREADY_INPROGRESS_INFORMATION_MSG_CODE =
        "transaction.msg.send.alreadyinprogress.information";
    var CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG_CODE =
        "transaction.msg.send.alreadyinprogress.certify.information";
    var GET_NETWORK_STATUS_INPROGRESS_MSG_CODE =
        "transaction.msg.network.status.in.progress";

    var UNCHECK_PDF_MSG_CODE = "transaction.msg.uncheckpdf";
    var EXCEEDED_RECIPIENTS_MSG_CODE = "transaction.maxrecipientexceeded";
    var ALREADY_SENT_GENERATION_CONFIRMATION_MSG =
        "An e-document has already been sent for this transaction. " +
        "Generating a new e-document will overwrite the previous e-document. Are you sure you want to generate a new e-document?";
    var REMOVE_TEMPLATE_ALREADY_SENT_MSG =
        "Removing the e-document template for sent e-documents is not allowed.";

    var EIP_INFORMATION_MSG = "The E-Document is being processed.";
    var GENERATE_INFORMATION_MSG =
        "Generation of this E-Document is in progress.";
    var SEND_INFORMATION_MSG = "Sending of this E-Document is in progress.";
    var CERTIFY_INFORMATION_MSG =
        "Certification of this E-Document is in progress.";
    var GET_NETWORK_STATUS_INPROGRESS_MSG =
        "Getting the e-document network status.";

    var EIP_ALREADY_INPROGRESS_INFORMATION_MSG =
        "The E-Document is already being processed.";
    var GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG =
        "Generation of this E-Document is already in progress.";
    var SEND_ALREADY_INPROGRESS_INFORMATION_MSG =
        "Sending of this E-Document is already in progress.";
    var CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG =
        "Certification of this E-Document is already in progress.";

    var UNCHECK_PDF_MSG =
        "A PDF file of this transaction was created during the last e-document generation. " +
        "Clearing this box will delete that PDF file in the next e-document generation.";
    var EXCEEDED_RECIPIENTS_MSG =
        "You have exceeded the maximum number of email recipients. Select a maximum of 10 email recipients only.";
    var ENTITY_PACKAGE = "custentity_psg_ei_entity_edoc_standard";
    var PACKAGE_FIELD = "custbody_psg_ei_trans_edoc_standard";
    var RECIPIENT_FIELD = "custbody_psg_ei_edoc_recipient";
    var SUBSIDIARY_FIELD = "subsidiary";
    var stringMap = [];
    var generating = false;
    var certifying = false;
    var sending = false;
    var eiProcessing = false;
    var gettingNetworkStatus = false;
    var COPY = "copy";
    var CREATED_FROM_FIELD = "createdfrom";
    var autoPopulate = false;
    var ORDER_TYPE = "ordertype";
    var LANGUAGE_PREFERENCE_CODE = "LANGUAGE";

    /**
     * Calls the translation service and puts values inside stringMap
     */
    function getTranslations() {
        if (stringMap.length === 0) {
            stringMap = translator.getStringMap([
                ALREADY_SENT_GENERATION_CONFIRMATION_CODE,
                REMOVE_TEMPLATE_ALREADY_SENT_CODE,
                EIP_INFORMATION_MSG_CODE,
                GENERATE_INFORMATION_MSG_CODE,
                SEND_INFORMATION_MSG_CODE,
                CERTIFY_INFORMATION_MSG_CODE,
                EIP_ALREADY_INPROGRESS_INFORMATION_MSG_CODE,
                GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG_CODE,
                SEND_ALREADY_INPROGRESS_INFORMATION_MSG_CODE,
                CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG_CODE,
                UNCHECK_PDF_MSG_CODE,
                EXCEEDED_RECIPIENTS_MSG_CODE,
                GET_NETWORK_STATUS_INPROGRESS_MSG_CODE,
            ]);
            ALREADY_SENT_GENERATION_CONFIRMATION_MSG =
                stringMap[ALREADY_SENT_GENERATION_CONFIRMATION_CODE] ||
                ALREADY_SENT_GENERATION_CONFIRMATION_MSG;
            REMOVE_TEMPLATE_ALREADY_SENT_MSG =
                stringMap[REMOVE_TEMPLATE_ALREADY_SENT_CODE] ||
                REMOVE_TEMPLATE_ALREADY_SENT_MSG;
            EIP_INFORMATION_MSG =
                stringMap[EIP_INFORMATION_MSG_CODE] || EIP_INFORMATION_MSG;
            GENERATE_INFORMATION_MSG =
                stringMap[GENERATE_INFORMATION_MSG_CODE] ||
                GENERATE_INFORMATION_MSG;
            SEND_INFORMATION_MSG =
                stringMap[SEND_INFORMATION_MSG_CODE] || SEND_INFORMATION_MSG;
            CERTIFY_INFORMATION_MSG =
                stringMap[CERTIFY_INFORMATION_MSG_CODE] ||
                CERTIFY_INFORMATION_MSG;
            EIP_ALREADY_INPROGRESS_INFORMATION_MSG =
                stringMap[EIP_ALREADY_INPROGRESS_INFORMATION_MSG_CODE] ||
                EIP_ALREADY_INPROGRESS_INFORMATION_MSG;
            GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG =
                stringMap[GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG_CODE] ||
                GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG;
            SEND_ALREADY_INPROGRESS_INFORMATION_MSG =
                stringMap[SEND_ALREADY_INPROGRESS_INFORMATION_MSG_CODE] ||
                SEND_ALREADY_INPROGRESS_INFORMATION_MSG;
            CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG =
                stringMap[CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG_CODE] ||
                CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG;
            UNCHECK_PDF_MSG =
                stringMap[UNCHECK_PDF_MSG_CODE] || UNCHECK_PDF_MSG;
            EXCEEDED_RECIPIENTS_MSG =
                stringMap[EXCEEDED_RECIPIENTS_MSG_CODE] ||
                EXCEEDED_RECIPIENTS_MSG;
            GET_NETWORK_STATUS_INPROGRESS_MSG =
                stringMap[GET_NETWORK_STATUS_INPROGRESS_MSG_CODE] ||
                GET_NETWORK_STATUS_INPROGRESS_MSG;
        }
    }

    function autoSetTemplateAndSMForThisTransaction(record, edocPackage) {
        var TEMPLATE_REC = "customrecord_psg_ei_template";
        var templateFilters = createFiltersForAutoPopulateTemplate(
            record,
            edocPackage
        );
        var SENDING_METHOD_REC = "customrecord_ei_sending_method";
        var smFilters = createFiltersForAutoPopulateSM(record, edocPackage);
        var templates = [];
        var sendingMethods = [];
        var templateParams = {
            type: TEMPLATE_REC,
            columns: [
                search.createColumn({
                    name: "internalid",
                }),
            ],
            filters: templateFilters,
        };
        var sendingMethodParams = {
            type: SENDING_METHOD_REC,
            columns: [
                search.createColumn({
                    name: "internalid",
                }),
            ],
            filters: smFilters,
        };
        try {
            search.create
                .promise(templateParams)
                .then(function (tempRecSearch) {
                    return tempRecSearch.run().each.promise(function (row) {
                        templates.push(row.id);
                        return true;
                    });
                })
                .then(function onResolve(resolve) {
                    if (templates.length === 1) {
                        record.setValue(EI_TEMPLATE, templates[0]);
                    }
                    return resolve;
                })
                .catch(function onReject(reject) {
                    return reject;
                });
            search.create
                .promise(sendingMethodParams)
                .then(function (smRecSearch) {
                    return smRecSearch.run().each.promise(function (smRow) {
                        sendingMethods.push(smRow.id);
                        return true;
                    });
                })
                .then(function onResolve(resolve) {
                    if (sendingMethods.length === 1) {
                        record.setValue(EI_SENDING_METHOD, sendingMethods[0]);
                    }
                    return resolve;
                })
                .catch(function onReject(reject) {
                    return reject;
                });
        } catch (e) {
            log.error(
                "Error during searching of E-Document Template/Sending Method on Entity load"
            );
            log.error(e.name, e.message + "\n" + e.stack);
        }
    }

    function createFiltersForAutoPopulateTemplate(record, edocPackage) {
        var filters = [];
        var recType = record.getValue("ntype");
        var subsidiaries = record.getValue("subsidiary");
        filters.push([ISINACTIVE_FIELD, search.Operator.IS, "F"]);
        filters.push("AND");
        filters.push([TEMPLATE_PACKAGE, search.Operator.IS, edocPackage]);
        var subsidiaryFilter = [];
        var transactionFilter = [
            TEMPLATE_TRANSACTION,
            search.Operator.ANYOF,
            recType,
        ];
        filters.push("AND");
        if (
            runtime.isFeatureInEffect("SUBSIDIARIES") &&
            subsidiaries.length > 0
        ) {
            subsidiaryFilter.push([
                TEMPLATE_SUBSIDIARY,
                search.Operator.ANYOF,
                subsidiaries,
            ]);
            filters.push([subsidiaryFilter, "AND", transactionFilter]);
        } else {
            filters.push(transactionFilter);
        }
        return filters;
    }

    function createFiltersForAutoPopulateSM(record, edocPackage) {
        var filters = [];
        var recType = record.getValue("ntype");
        var subsidiaries = record.getValue("subsidiary");
        filters.push([ISINACTIVE_FIELD, search.Operator.IS, "F"]);
        filters.push("AND");
        filters.push([SENDING_METHOD_PACKAGE, search.Operator.IS, edocPackage]);
        var subsidiaryFilter = [];
        var transactionFilter = [
            SENDING_METHOD_TRANSACTION,
            search.Operator.ANYOF,
            recType,
        ];
        filters.push("AND");
        if (
            runtime.isFeatureInEffect("SUBSIDIARIES") &&
            subsidiaries.length > 0
        ) {
            subsidiaryFilter.push([
                SENDING_METHOD_SUBSIDIARY,
                search.Operator.ANYOF,
                subsidiaries,
            ]);
            filters.push([subsidiaryFilter, "AND", transactionFilter]);
        } else {
            filters.push(transactionFilter);
        }
        return filters;
    }

    function pageInit(context) {
        var EI_CONTENT = "custbody_psg_ei_content";
        var CREATE = "create";
        var EDIT = "edit";
        var currentRecord = context.currentRecord;
        var entity = currentRecord.getValue(EI_ENTITY_FIELD);// TODO: why we need to take entity & customer both in a record
        var customer = currentRecord.getValue(CUSTOMER_FIELD);
        var mode = context.mode;
        getTranslations();
        if (//TODO: Better to replace with if(entity)
            (entity !== "" || typeof customer !== "undefined") &&
            (customer !== "" || typeof entity !== "undefined") &&
            mode === CREATE
        ) {
            setEntityPackage(currentRecord);
        }
        var entityPackage = currentRecord.getText(PACKAGE_FIELD);
        var sourceOrderType = currentRecord.getValue(ORDER_TYPE);
        /**
         * When an Item Fulfillment record is created/transformed from Transfer Order, fetch the package details from source transaction and set it for current txn.
         */
        if (
            (mode === EDIT || mode === COPY) &&
            currentRecord.type === ITEM_FULFILLMENT &&
            sourceOrderType === TRANSFER_ORDER
        ) {
            // For sourced entity-less transactions
            setValuesFromSourceTxn(mode, currentRecord);
        } else if (
            (mode === EDIT || mode === COPY) &&
            (entityPackage === "" || typeof entityPackage === "undefined")
        ) {
            // To set Package value for existing transactions & retaining Template and SM selection
            /**
             * Following code is required for transactions created before the change of E-Document Package's "Store Value"  to true.
             * As they are no more sourced, we need to re-set them in case the transaction is opened in Edit mode.
             * It also sets Package value for such transactions.
             */
            var prevTemp = currentRecord.getValue(EI_TEMPLATE);
            var prevSM = currentRecord.getValue(EI_SENDING_METHOD);
            retrieveEntityDetails(sourceOrderType, currentRecord);
            if (mode === EDIT) {
                currentRecord.setValue(EI_TEMPLATE, prevTemp);
                currentRecord.setValue(EI_SENDING_METHOD, prevSM);
            }
        }
        /* This covers both Copy and Transform */
        if (context.mode === COPY) {
            currentRecord.setValue(EI_CONTENT, "");
            currentRecord.setValue(EI_STATUS, "");
            currentRecord.setValue(EI_GENERATED_EDOCUMENT, "");
            currentRecord.setValue(EI_CERTIFIED_EDOCUMENT, "");
            var createdFrom = currentRecord.getValue(CREATED_FROM_FIELD);
            if (createdFrom && sourceOrderType !== TRANSFER_ORDER) {
                currentRecord.setValue(EI_TEMPLATE, "");
                currentRecord.setValue(EI_SENDING_METHOD, "");
                setEntityGeneratePDFSetup(currentRecord);
            }
        }
    }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord;
        var entityPackage = currentRecord.getValue(PACKAGE_FIELD);
        if (context.fieldId === EI_GENERATE_PDF_CHK_BOX) {
            if (
                currentRecord.getValue(EI_GENERATED_PDF) !== "" &&
                !currentRecord.getValue(EI_GENERATE_PDF_CHK_BOX)
            ) {
                alert(UNCHECK_PDF_MSG);
            }
        } else if (context.fieldId === PACKAGE_FIELD) {
            updateTemplateAndSendingMethod(currentRecord);
        } else if (
            context.fieldId === SUBSIDIARY_FIELD &&
            (currentRecord.type === REC_TRANSFER_ORDER ||
                transactionMap.isBasicStyleCTT(currentRecord.type) ||
                transactionMap.isJournalStyleCTT(currentRecord.type))
        ) {
            currentRecord.setValue(PACKAGE_FIELD, "");
        } else if (context.fieldId === SUBSIDIARY_FIELD && entityPackage) {
            var entityField = transactionMap.getEntityFieldIDFromTransactionRecord(currentRecord);
            var entity = currentRecord.getValue(entityField);
            try {
                if (
                    entity !== null &&
                    entity !== "" &&
                    typeof entity !== "undefined"
                ) {
                    var params = {
                        type: entityField,
                        id: entity,
                        columns: [ENTITY_AUTO_SELECT_SM_TEMPLATE],
                    };
                    search.lookupFields
                        .promise(params)
                        .then(function onResolve(lookUpValues) {
                            if (
                                lookUpValues !== null &&
                                lookUpValues !== "" &&
                                typeof lookUpValues !== "undefined"
                            ) {
                                if (
                                    lookUpValues[
                                    ENTITY_AUTO_SELECT_SM_TEMPLATE
                                    ] !== undefined
                                ) {
                                    autoPopulate =
                                        lookUpValues[
                                        ENTITY_AUTO_SELECT_SM_TEMPLATE
                                        ];
                                }
                            }
                        })
                        .catch(function onReject(reject) {
                            return reject;
                        });
                }
            } catch (e) {
                log.error(e.name, e.message + "\n" + e.stack);
            }
            updateTemplateAndSendingMethod(currentRecord);
        }
    }

    function setEntityGeneratePDFSetup(currentRecord) {
        var ENTITY_GENERATE_PDF_FIELD = "custentity_edoc_gen_trans_pdf";
        try {
            var entityId = currentRecord.getValue("entity");
            var params = {
                type: "entity",
                id: entityId,
                columns: [ENTITY_GENERATE_PDF_FIELD],
            };
            search.lookupFields
                .promise(params)
                .then(function onResolve(resolve) {
                    currentRecord.setValue(
                        EI_GENERATE_PDF_CHK_BOX,
                        resolve[ENTITY_GENERATE_PDF_FIELD] !== undefined
                            ? resolve[ENTITY_GENERATE_PDF_FIELD]
                            : false
                    );
                })
                .catch(function onReject(reject) {
                    return reject;
                });
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
            return false;
        }
    }

    function saveRecord(context) {
        var isValid = true;
        var currentRecord = context.currentRecord;
        var eiTemplate = currentRecord.getValue({
            fieldId: EI_TEMPLATE,
        });
        var eiStatus = currentRecord.getValue({
            fieldId: EI_STATUS,
        });
        if (eiStatus === SENT && !eiTemplate) {
            alert(REMOVE_TEMPLATE_ALREADY_SENT_MSG);
            isValid = false;
        }
        var recipientList = currentRecord.getValue({
            fieldId: RECIPIENT_FIELD,
        });
        if (
            typeof recipientList !== "undefined" &&
            recipientList !== null &&
            recipientList !== "" &&
            recipientList.length > 10
        ) {
            alert(EXCEEDED_RECIPIENTS_MSG);
            isValid = false;
        }
        return isValid;
    }

    function eiStepAlreadyOngoing() {
        return (
            generating ||
            certifying ||
            sending ||
            eiProcessing ||
            gettingNetworkStatus
        );
    }

    function proceedEvenIfStatusIsSent(eiStatus) {
        if (eiStatus === SENT) {
            return confirm(ALREADY_SENT_GENERATION_CONFIRMATION_MSG);
        } else {
            return true;
        }
    }

    function generate(transId, eiStatus, transType, certSendingMethodId) {
        getTranslations();

        if (eiStepAlreadyOngoing()) {
            alert(getProcessMessage());
            return;
        }

        var toGenerate = true;
        if (eiStatus === SENT) {
            toGenerate = confirm(ALREADY_SENT_GENERATION_CONFIRMATION_MSG);
        }
        if (toGenerate) {
            generating = true;
            showProcessMessage(GENERATE_INFORMATION_MSG);
            var suiteletURL = url.resolveScript({
                scriptId: GENERATE_SU_SCRIPT,
                deploymentId: GENERATE_SU_DEPLOY,
            });
            https.post
                .promise({
                    url: suiteletURL,
                    body: {
                        transId: transId,
                        transType: transType,
                        certSendingMethodId: certSendingMethodId,
                    },
                })
                .then(function (response) {
                    var result = JSON.parse(response.body);
                    redirectAfterProcess(
                        result,
                        transId,
                        transType,
                        "generation"
                    );
                });
        }
    }

    function send(transId, transType, certSendingMethodId, isAvalara) {
        getTranslations();

        if (eiStepAlreadyOngoing()) {
            alert(getProcessMessage());
            return;
        }

        if (
            (certSendingMethodId !== "" &&
                typeof certSendingMethodId !== "undefined") ||
            isAvalara
        ) {
            certifying = true;
            showProcessMessage(CERTIFY_INFORMATION_MSG);
        } else {
            sending = true;
            showProcessMessage(SEND_INFORMATION_MSG);
        }
        var suiteletURL = url.resolveScript({
            scriptId: SEND_SU_SCRIPT,
            deploymentId: SEND_SU_DEPLOY,
        });
        https.post
            .promise({
                url: suiteletURL,
                body: {
                    transId: transId,
                    transType: transType,
                    certSendingMethodId: certSendingMethodId,
                    isAvalara: isAvalara ? true : false,
                },
            })
            .then(function (response) {
                var result = JSON.parse(response.body);
                redirectAfterProcess(result, transId, transType, "sending");
            });
    }

    /**
     * getNetworkStatus - This function gets the latest network status of E-Document.
     * @param transId {String/Number} - transaction Id
     * @param transType {String/Number} - transaction Type
     * @param certSendingMethodId {String/Number} - internal ID of certification E-Document Sending Method record
     */
    function getNetworkStatus(transId, transType, certSendingMethodId) {
        getTranslations();
        if (eiStepAlreadyOngoing()) {
            alert(getProcessMessage());
            return;
        }
        gettingNetworkStatus = true;
        showProcessMessage(GET_NETWORK_STATUS_INPROGRESS_MSG);
        var suiteletURL = url.resolveScript({
            scriptId: NETWORK_STATUS_SU_SCRIPT,
            deploymentId: NETWORK_STATUS_SU_DEPLOY,
        });
        https.post
            .promise({
                url: suiteletURL,
                body: {
                    transId: transId,
                    transType: transType,
                    certSendingMethodId: certSendingMethodId,
                },
            })
            .then(function (response) {
                var result = JSON.parse(response.body);
                redirectAfterProcess(
                    result,
                    transId,
                    transType,
                    "networkStatus"
                );
            });
    }

    function processEdoc(
        transId,
        eiStatus,
        transType,
        certSendingMethodId,
    ) {
        getTranslations();
        if (certSendingMethodId === "undefined" || certSendingMethodId === "") {
            certSendingMethodId = undefined;
        }

        if (eiStepAlreadyOngoing()) {
            alert(getProcessMessage());
            return;
        }

        if (!proceedEvenIfStatusIsSent(eiStatus)) return;

        //will proceed from now:
        eiProcessing = true; //no need to reset this later, because page reload will take care.

        showProcessMessage(EIP_INFORMATION_MSG);

        //Service Call
        var eipSuiteletURL = url.resolveScript({
            scriptId: EDOC_PROCESS_SU_SCRIPT,
            deploymentId: EDOC_PROCESS_SU_DEPLOY,
        });
        var locale = runtime
            .getCurrentUser()
            .getPreference(LANGUAGE_PREFERENCE_CODE);
        var userId = runtime.getCurrentUser().id;
        console.log("Runtime current user id: " + userId);
        console.log("certSendingMethodId: " + certSendingMethodId);

        https.post
            .promise({
                url: eipSuiteletURL,
                body: {
                    transId: transId,
                    transType: transType,
                    certSendingMethodId: certSendingMethodId,
                    userId: userId,
                    locale: locale,
                },
            })
            .then(function (response) {
                var result = JSON.parse(response.body);
                console.log(result);
                redirectAfterProcess(result, transId, transType, "eip");
            });
    }

    /**
     * Show generated own 'banner' for generating/sending in progress
     *
     * @param {String} bannerMessage Banner message
     */
    function showProcessMessage(bannerMessage) {
        message
            .create({
                type: message.Type.INFORMATION,
                message: bannerMessage,
            })
            .show();
    }

    /**
     * Gets the correct process message for alert
     *
     * @returns {String} The current process message
     */
    function getProcessMessage() {
        if (generating) {
            return GENERATE_ALREADY_INPROGRESS_INFORMATION_MSG;
        } else if (sending) {
            return SEND_ALREADY_INPROGRESS_INFORMATION_MSG;
        } else if (certifying) {
            return CERTIFY_ALREADY_INPROGRESS_INFORMATION_MSG;
        } else if (eiProcessing) {
            return EIP_ALREADY_INPROGRESS_INFORMATION_MSG;
        } else if (gettingNetworkStatus) {
            return GET_NETWORK_STATUS_INPROGRESS_MSG;
        }
    }

    /**
     * Performs redirection/reload after generation/sending
     *
     * @param {Object} result Https response
     * @param {Number} transId Transaction Id
     * @param {String} transType Transaction Type
     * @param {String} process Generation/sending
     */
    function redirectAfterProcess(result, transId, transType, process) {
        var urlParameters = {
            ei_process: process,
            ei_bid: result.data.bundleId,
            ei_mc: result.data.messageCode,
            ei_t: result.data.messageType,
        };
        var recordURL = url.resolveRecord({
            recordType: transType,
            recordId: transId,
            isEditMode: false,
            params: urlParameters,
        });
        window.location = recordURL;
    }   

    function loadDataFromEntity(entity, entityField) {
        try {
            if (
                entity !== null &&
                entity !== "" &&
                typeof entity !== "undefined"
            ) {
                var params = {
                    type: entityField,
                    id: entity,
                    columns: [ENTITY_AUTO_SELECT_SM_TEMPLATE, ENTITY_PACKAGE],
                };
                return search.lookupFields(params);
            }
        } catch (e) {
            log.error("Error during search on entity");
            log.error(e.name, e.message + "\n" + e.stack);
        }
        return null;
    }
    /**
     * Setting package value from Entity-less source transaction.
     * @param mode
     * @param currentRecord
     */
    function setValuesFromSourceTxn(mode, currentRecord) {
        var sourceOrderId = currentRecord.getValue(CREATED_FROM_FIELD);
        var params = {
            type: REC_TRANSFER_ORDER,
            id: sourceOrderId,
            columns: [PACKAGE_FIELD, EI_GENERATE_PDF_CHK_BOX],
        };
        try {
            search.lookupFields
                .promise(params)
                .then(function onResolve(lookUpValues) {
                    if (
                        lookUpValues !== null &&
                        lookUpValues !== "" &&
                        typeof lookUpValues !== "undefined"
                    ) {
                        var entityPackage = lookUpValues[PACKAGE_FIELD];
                        if (mode === COPY) {
                            currentRecord.setValue(
                                EI_GENERATE_PDF_CHK_BOX,
                                lookUpValues[EI_GENERATE_PDF_CHK_BOX] !==
                                    undefined
                                    ? lookUpValues[EI_GENERATE_PDF_CHK_BOX]
                                    : false
                            );
                            updateTemplateAndSendingMethod(currentRecord);
                        } else if (
                            entityPackage !== "" &&
                            entityPackage !== undefined &&
                            entityPackage.length > 0
                        ) {
                            if (
                                entityPackage[0].value !==
                                currentRecord.getValue(PACKAGE_FIELD)
                            ) {
                                currentRecord.setValue(
                                    PACKAGE_FIELD,
                                    entityPackage[0].value
                                );
                            }
                        } else {
                            currentRecord.setValue(PACKAGE_FIELD, "");
                        }
                    }
                })
                .catch(function onReject(reject) {
                    return reject;
                });
        } catch (e) {
            log.error(e.name, e.message);
        }
    }
    /**
     *
     * Setting package value from Entity based source transaction.
     *
     * This method fetches the Entity Id from source transactions like Sales Order, Vendor Return Authorizations.
     * Also uses this ID to get package assigned and autoPopulate configuration.
     *
     * If no source transaction is available, then directly sets the Package value from Entity to the transaction.
     *
     * @param sourceOrderType
     * @param currentRecord
     * @returns {null}
     */
    function retrieveEntityDetails(sourceOrderType, currentRecord) {
        try {
            if (
                sourceOrderType !== "" &&
                typeof sourceOrderType !== "undefined"
            ) {
                // Added for handling SO -> IF && VRO -> IF && SO -> Invoice :::: For sourced entity-based transactions
                var createdFromId = currentRecord.getValue(CREATED_FROM_FIELD);
                var sourceRecord;
                if (sourceOrderType.toLowerCase() === SALES_ORDER) {
                    sourceRecord = REC_SALES_ORDER;
                } else if (
                    sourceOrderType.toLowerCase() ===
                    VENDOR_RETURN_AUTHORIZATION
                ) {
                    sourceRecord = REC_VENDOR_RETURN_AUTHORIZATION;
                } else {
                    log.debug(
                        "loadEntityFrmParentTxn",
                        "sourceOrderType::" +
                        sourceOrderType +
                        " && currentRecord.type::" +
                        currentRecord.type
                    );
                    return null;
                }
                var params = {
                    type: sourceRecord,
                    id: createdFromId,
                    columns: [EI_ENTITY_FIELD],
                };
                search.lookupFields
                    .promise(params)
                    .then(function onResolve(lookupSearch) {
                        if (
                            lookupSearch !== null &&
                            lookupSearch !== "" &&
                            typeof lookupSearch !== "undefined"
                        ) {
                            var entity = lookupSearch[EI_ENTITY_FIELD];
                            if (entity !== undefined) {
                                entity =
                                    entity.length > 0 ? entity[0].value : "";
                                if (entity !== "") {
                                    var lookUpValues = loadDataFromEntity(
                                        entity,
                                        EI_ENTITY_FIELD
                                    );
                                    /**
                                     * Maintain the order: Set the auto-populate value followed by package field.
                                     */
                                    var edocPackage =
                                        lookUpValues[ENTITY_PACKAGE];
                                    if (
                                        lookUpValues[
                                        ENTITY_AUTO_SELECT_SM_TEMPLATE
                                        ] !== undefined
                                    ) {
                                        autoPopulate =
                                            lookUpValues[
                                            ENTITY_AUTO_SELECT_SM_TEMPLATE
                                            ];
                                    }
                                    if (edocPackage !== undefined) {
                                        var entityPackage =
                                            edocPackage.length > 0
                                                ? edocPackage[0].value
                                                : "";
                                        currentRecord.setValue(
                                            PACKAGE_FIELD,
                                            entityPackage
                                        );
                                    }
                                }
                            }
                        }
                    })
                    .catch(function onReject(reject) {
                        return reject;
                    });
            } else {
                setEntityPackage(currentRecord);
            }
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
        }
    }

    function postSourcing(context) {
        var currentRecord = context.currentRecord;
        if (
            context.fieldId === EI_ENTITY_FIELD ||
            context.fieldId === CUSTOMER_FIELD
        ) {
            setEntityPackage(currentRecord);
        }
    }

    function setEntityPackage(currentRecord) {
        var entityField = transactionMap.getEntityFieldIDFromTransactionRecord(currentRecord);
        var entity = currentRecord.getValue(entityField);
        try {
            if (
                entity !== null &&
                entity !== "" &&
                typeof entity !== "undefined"
            ) {
                var params = {
                    type: entityField,
                    id: entity,
                    columns: [ENTITY_AUTO_SELECT_SM_TEMPLATE, ENTITY_PACKAGE],
                };
                search.lookupFields
                    .promise(params)
                    .then(function onResolve(lookUpValues) {
                        if (
                            lookUpValues !== null &&
                            lookUpValues !== "" &&
                            typeof lookUpValues !== "undefined"
                        ) {
                            var edocPackage = lookUpValues[ENTITY_PACKAGE];
                            /**
                             * Maintain the order: Set the auto-populate value followed by package field.
                             */
                            if (
                                lookUpValues[ENTITY_AUTO_SELECT_SM_TEMPLATE] !==
                                undefined
                            ) {
                                autoPopulate =
                                    lookUpValues[
                                    ENTITY_AUTO_SELECT_SM_TEMPLATE
                                    ];
                            }
                            if (edocPackage !== undefined) {
                                var entityPackage =
                                    edocPackage.length > 0
                                        ? edocPackage[0].value
                                        : "";
                                currentRecord.setValue(
                                    PACKAGE_FIELD,
                                    entityPackage
                                );
                            }
                        }
                    })
                    .catch(function onReject(reject) {
                        return reject;
                    });
            }
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
        }
    }
    /**
     * This method sets the template and sending method of the current transaction, if auto-populate is enabled.
     *
     * @param currentRecord
     */
    function updateTemplateAndSendingMethod(currentRecord) {
        var entityPackage = currentRecord.getValue(PACKAGE_FIELD);
        var srcOdrType = currentRecord.getValue(ORDER_TYPE);

        var isTransferOrderOrSrcTOTxn =
            currentRecord.type === REC_TRANSFER_ORDER ||
            srcOdrType === TRANSFER_ORDER;
        if (
            (isTransferOrderOrSrcTOTxn ||
                transactionMap.isBasicStyleCTT(currentRecord.type) ||
                transactionMap.isJournalStyleCTT(currentRecord.type) ||
                autoPopulate) &&
            entityPackage !== ""
        ) {
            try {
                autoSetTemplateAndSMForThisTransaction(
                    currentRecord,
                    entityPackage
                );
            } catch (e) {
                log.error(e.name, e.message + "\n" + e.stack);
            }
        }
    }

    return {
        saveRecord: saveRecord,
        processEdoc: processEdoc,
        generate: generate,
        send: send,
        getNetworkStatus: getNetworkStatus,
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
    };
});
