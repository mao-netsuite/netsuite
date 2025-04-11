/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 *

 * Version    Date            Author           Remarks

 * 1.00       07 Jan 2016         ldimayuga

 *

 * @NApiVersion 2.x

 * @NScriptName E-Document Sending Map Reduce

 * @NScriptId _ei_mr_edoc_sending

 * @NScriptType mapreducescript

 */

define([
    "../../app/einvoice/app_einvoice_sending_manager",

    "../../app/einvoice/app_einvoice_notifier",

    "../../data/dao_einvoice_batch",

    "N/task",

    "N/record",

    "N/search",

    "N/runtime",

    "N/format",

    "../../lib/app/app_transaction_type_map",

    "../../app/einvoice/app_einvoice_license_manager",

    "../../app/einvoice/app_einvoice_outbound_certification",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
], function (
    sendingMgr,
    notifier,
    batchDAO,
    task,
    record,
    search,
    runtime,
    formatter,
    transactionTypeMap,
    licenseManager,
    certification,
    subsidiaryPrefGetter
) {
    //invoice record related

    var SENDING_FAILED = "8";

    var CERTIFICATION_FAILED = "22";

    //batch record related

    var RECORD_TYPE = "customrecord_psg_ei_sending_batch";

    var SUBS_FIELD = "custrecord_psg_ei_sending_batch_sub";

    var CUST_FIELD = "custrecord_psg_ei_sending_batch_cust";

    var VEND_FIELD = "custrecord_psg_ei_sending_batch_vendor";

    var START_DATE_FIELD = "custrecord_psg_ei_sending_batch_start_da";

    var END_DATE_FIELD = "custrecord_psg_ei_sending_batch_end_date";

    var TRAN_TYPE_FIELD = "custrecord_psg_ei_sending_batch_trantype";

    var SENDING_TYPE_FIELD = "custrecord_psg_ei_sending_batch_snd_type";

    var PROCESSED_STATUS = "2";

    var FREE_COUNTRY_FIELD = "custrecord_psg_ei_sub_edoc_free_country";

    //E Document Filter Related

    var SCRIPT_PARAM_BATCH_ID = "custscript_ei_sending_batch_id";

    var SCRIPT_PARAM_BATCH_OWNER = "custscript_ei_sending_batch_owner";

    var STATUS;

    var EI_STATUS = "custbody_psg_ei_status";

    var CERTIFY_SEND_TYPE = "certifySend";

    var NSEB_AVALARA_MANDATE_FIELD = "custbody_nseb_avalara_mandate";

    var LANGUAGE_PREFERENCE_CODE = "LANGUAGE";

    function getInputData() {
        var data = [];

        var scriptObj = runtime.getCurrentScript();

        var batchId = scriptObj.getParameter({ name: SCRIPT_PARAM_BATCH_ID });

        log.debug("Processing Batch Id: " + batchId);

        var batchRecord = record.load({
            type: RECORD_TYPE,

            id: batchId,
        });

        if (batchRecord) {
            batchId = batchRecord.id;

            var startDate = formatter.format({
                value: batchRecord.getValue(START_DATE_FIELD),
                type: formatter.Type.DATE,
            });

            var endDate = formatter.format({
                value: batchRecord.getValue(END_DATE_FIELD),
                type: formatter.Type.DATE,
            });

            var subsidiary = batchRecord.getValue(SUBS_FIELD);

            var customer = batchRecord.getValue(CUST_FIELD);

            var vendor = batchRecord.getValue(VEND_FIELD);

            var tranType = batchRecord.getValue(TRAN_TYPE_FIELD);

            var sendingType = batchRecord.getValue(SENDING_TYPE_FIELD);

            if (sendingType === CERTIFY_SEND_TYPE)
                STATUS = CERTIFICATION_FAILED;
            else STATUS = SENDING_FAILED;

            var allowedCountry;

            var licenseInfo = licenseManager.getLicenseInfo();

            if (!licenseInfo.hasLicense) {
                allowedCountry = getAllowedCountry();
            }

            var standardTxnFilter = transactionTypeMap.getTransactionFilters(
                allowedCountry,
                [STATUS],
                tranType
            );

            standardTxnFilter.push("AND");

            standardTxnFilter.push([
                "trandate",
                search.Operator.WITHIN,
                [startDate, endDate],
            ]);

            //add entity filter if available

            var entity;

            if (customer) {
                entity = customer;
            } else if (vendor) {
                entity = vendor;
            }

            if (entity) {
                standardTxnFilter.push("AND");

                standardTxnFilter.push(["entity", search.Operator.IS, entity]);
            }

            var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

            if (isOW) {
                standardTxnFilter.push("AND");

                standardTxnFilter.push([
                    "subsidiary",
                    search.Operator.IS,
                    subsidiary,
                ]);
            }

            log.debug(
                "standard transaction filters for send failed suitlet",
                standardTxnFilter
            );

            var filtersToApplyInSearch = finalFilterToApplyInSearch(
                tranType,
                standardTxnFilter,
                subsidiary,
                entity,
                startDate,
                endDate,
                STATUS
            );

            log.debug(
                "Final Transaction filters for send failed suitelet",
                filtersToApplyInSearch
            );

            //actual search

            var transSearch = search.create({
                type: search.Type.TRANSACTION,

                filters: filtersToApplyInSearch,

                columns: ["tranid"],

                endIndex: Infinity,
            });

            if (transSearch && filtersToApplyInSearch.length > 0) {
                if (
                    transSearch.runPaged({
                        pageSize: 10,
                    }).count === 0
                ) {
                    batchDAO.update(batchId, {
                        custrecord_psg_ei_sending_batch_status:
                            PROCESSED_STATUS,
                    });
                }

                data = transSearch;
            }
        }

        log.debug("data", data);

        return data;
    }

    function finalFilterToApplyInSearch(
        tranType,
        standardTxnFilter,
        subsidiaryVal,
        entityValues,
        startDate,
        endDate,
        eiStatusArr
    ) {
        var customTranFilters = [];

        var finalFilterToApply = [];

        var standardTransArr = [];

        var customTransArr = [];

        var isCustomTransactionEnabled = runtime.isFeatureInEffect({
            feature: "CUSTOMTRANSACTIONS",
        });

        if (tranType.length === 0) {
            if (
                isCustomTransactionEnabled &&
                transactionTypeMap.getAllOutboundCttCodes().length > 0
            ) {
                customTranFilters = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );

                finalFilterToApply = constructAllTxnTypeFilters(
                    standardTxnFilter,
                    customTranFilters
                );
            } else {
                finalFilterToApply = standardTxnFilter;
            }
        } else {
            for (var i in tranType) {
                if (transactionTypeMap.isCustomTransactionType(tranType[i])) {
                    customTransArr.push(tranType[i]);
                } else {
                    standardTransArr.push(tranType[i]);
                }
            }

            if (customTransArr.length !== 0 && standardTransArr.length !== 0) {
                customTranFilters = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );

                finalFilterToApply = constructAllTxnTypeFilters(
                    standardTxnFilter,
                    customTranFilters
                );
            } else if (standardTransArr.length !== 0) {
                finalFilterToApply = standardTxnFilter;
            } else if (customTransArr.length !== 0) {
                finalFilterToApply = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );
            }
        }

        return finalFilterToApply;
    }

    // Filters for both standard and custom transactions are combined.

    function constructAllTxnTypeFilters(standardTxnFilter, customTxnFilter) {
        var filtersCombined = [];

        filtersCombined.push(standardTxnFilter);

        filtersCombined.push("OR");

        filtersCombined.push(customTxnFilter);

        return filtersCombined;
    }

    function getCustomTransactionFilters(
        tranType,
        subsidiary,
        entity,
        startDate,
        endDate,
        status
    ) {
        var customTransactionFilters =
            transactionTypeMap.getCustomTransactionFilters([status], tranType);

        customTransactionFilters.push("AND");

        customTransactionFilters.push([
            "trandate",
            search.Operator.WITHIN,
            [startDate, endDate],
        ]);

        if (entity) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push([
                "entity",
                search.Operator.IS,
                entity,
            ]);
        }

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW && subsidiary) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push([
                "subsidiary",
                search.Operator.IS,
                subsidiary,
            ]);
        }

        return customTransactionFilters;
    }

    function getAllowedCountry() {
        var subsidiaryFieldScriptIds = [FREE_COUNTRY_FIELD];
        var parentCompanySubsidiaryId =
            subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldTexts(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        return subsidiaryPreferencesObj[FREE_COUNTRY_FIELD];
    }

    function map(context) {
        var contextVal = JSON.parse(context.value);

        var transId = contextVal.id;

        var transType = contextVal.recordType;

        var tranNum = contextVal.values.tranid;

        var scriptObj = runtime.getCurrentScript();

        var batchId = scriptObj.getParameter({ name: SCRIPT_PARAM_BATCH_ID });

        var batchOwner = scriptObj.getParameter({
            name: SCRIPT_PARAM_BATCH_OWNER,
        });

        var INV_STATUS_FIELD = "custbody_psg_ei_status";

        var transLookup = search.lookupFields({
            type: transType,

            id: transId,

            columns: [INV_STATUS_FIELD],
        });

        var eStatus = transLookup[INV_STATUS_FIELD][0].value;

        var certSendingMethodId = "";

        //Load the record to get the certification Sending method ID

        var transRec = record.load({
            id: transId,

            type: transType,
        });
        var isAvalara = transRec.getValue(NSEB_AVALARA_MANDATE_FIELD) ? true : false;

        if (transRec.getValue(EI_STATUS) === CERTIFICATION_FAILED) {
            certSendingMethodId =
                certification.getCertSendingMethodId(transRec);
        }

        var sendingDetails = {
            trannum: tranNum,

            type: transType,

            error: null,
        };

        try {
            if (
                eStatus === SENDING_FAILED ||
                eStatus === CERTIFICATION_FAILED
            ) {
                var locale = runtime
                    .getCurrentUser()
                    .getPreference(LANGUAGE_PREFERENCE_CODE);

                var details = sendingMgr.send(
                    transId,
                    transType,
                    batchOwner,
                    certSendingMethodId,
                    locale,
                    isAvalara
                );

                if (!details.success) {
                    sendingDetails.error = details.message;
                } else {
                    sendingDetails.error = "Sent";
                }
            }
        } catch (e) {
            log.error("EI_SS_SENDING_ERROR", e);

            sendingDetails.error = e;
        }

        log.debug("In Map", sendingDetails);

        context.write(batchId, sendingDetails);
    }

    function reduce(context) {
        var batchId = context.key;

        log.debug("batchId", batchId);

        var sendingDetails = context.values;

        var result = search.lookupFields({
            type: "customrecord_psg_ei_sending_batch",

            id: batchId,

            columns: "owner",
        });

        var batchOwner = result.owner[0].value;

        var errorCount = 0;

        log.debug("original sendingDetails", sendingDetails);

        var finalSendingDetails =
            constructArrayOfUniqueSendingDetails(sendingDetails); // added to filter out the duplicate objects and get unique ones for Journal CTT

        log.debug(
            "finalSendingDetails after removing duplicates: ",
            finalSendingDetails
        );

        var detailCount = finalSendingDetails.length;

        for (var i = 0; i < detailCount; i++) {
            var details = JSON.parse(finalSendingDetails[i]);

            var errorMsg = details.error;

            if (errorMsg) {
                if (errorMsg.indexOf("Sent") === -1) {
                    errorCount++;
                }
            }
        }

        //At least one e-document was sent

        if (detailCount > 0 && errorCount < detailCount) {
            licenseManager.lockFreeCountry();
        }

        notifier.notifyBatchOwner(batchOwner, finalSendingDetails, errorCount);

        batchDAO.update(batchId, {
            custrecord_psg_ei_sending_batch_status: PROCESSED_STATUS,
        });
    }

    /* Added this function to remove the duplicate objects from sending details based on transaction number */

    function constructArrayOfUniqueSendingDetails(sendingDetails) {
        var obj = {};

        var len = sendingDetails.length;

        var uniqueItemsArr = [];

        try {
            for (var i = 0; i < len; i++) {
                var currItem = JSON.parse(sendingDetails[i]);

                if (currItem.trannum) {
                    var stringIdOfCtt = currItem.type;

                    currItem.uniquekey = stringIdOfCtt.concat(currItem.trannum);

                    var identifier = currItem.uniquekey;

                    log.debug("Unique Key", identifier);

                    if (currItem.error !== null) {
                        obj[identifier] = currItem;
                    }
                } else {
                    uniqueItemsArr.push(JSON.stringify(currItem));
                }
            }

            for (var j in obj) {
                uniqueItemsArr.push(JSON.stringify(obj[j]));
            }

            log.debug("Unique items in sending details", uniqueItemsArr);
        } catch (e) {
            log.error(
                "Error stack in constructUniqueArrayOfSendingDetails",
                e.stack
            );

            log.error(
                "Unexpected error occurred in constructUniqueArrayOfSendingDetails",
                e.message
            );
        }

        return uniqueItemsArr;
    }

    function summarize() {
        var SCRIPT_ID = "customscript_ei_sending_rescheduler";

        var DEPLOYMENT_ID = "customdeploy_ei_sending_rescheduler";

        var batches = batchDAO.getBatch();

        if (batches.length > 0) {
            var ssTask = task.create({
                taskType: task.TaskType.SCHEDULED_SCRIPT,
            });

            ssTask.scriptId = SCRIPT_ID;

            ssTask.deploymentId = DEPLOYMENT_ID;

            try {
                ssTask.submit();
            } catch (e) {
                log.audit(
                    "MANUAL_SENDING_MR",
                    "Concurrent run detected. Details: " + e.stack
                );
            }
        }
    }

    return {
        getInputData: getInputData,

        map: map,

        reduce: reduce,

        summarize: summarize,
    };
});
