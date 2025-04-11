/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 *

 * Version    Date            Author           Remarks

 * 1.00       03 Mar 2017     ssantiago

 *

 * @NApiVersion 2.x

 * @NScriptType mapreducescript

 */

define([
    "../../app/einvoice/app_einvoice_sending_manager",

    "N/runtime",

    "../../app/einvoice/app_einvoice_notifier",

    "N/search",

    "../../lib/app/app_transaction_type_map",

    "../../app/einvoice/app_einvoice_license_manager",

    "../../app/einvoice/app_einvoice_bulk_processing_manager",
], function (
    sendingMgr,
    runtime,
    notifier,
    search,
    transactionMap,
    licenseManager,
    bulkProcessingMgr
) {
    //Transaction record related

    var INV_STATUS_FIELD = "custbody_psg_ei_status";

    var READY_FOR_SENDING = "3";

    var SCRIPT_PARAM_SUBSIDIARY_ID = "custscript_ei_subsidiary_mr_send";

    var subsidiaryId;

    var filtersForCTT;

    var allowedCountry;

    function getInputData() {
        var scriptObj = runtime.getCurrentScript();

        subsidiaryId = scriptObj.getParameter({
            name: SCRIPT_PARAM_SUBSIDIARY_ID,
        });

        log.debug("Processing Sending for Subsidiary: " + subsidiaryId);

        bulkProcessingMgr.getTranslations();

        var data = [];

        var finalFiltersToApplyInSearch =
            constructFilterForSendBasedOnConditions();

        log.debug(
            "Automatic sending final filter",
            finalFiltersToApplyInSearch
        );

        var transSearch = search.create({
            type: search.Type.TRANSACTION,

            columns: ["tranid"],

            filters: finalFiltersToApplyInSearch,
        });

        if (transSearch && finalFiltersToApplyInSearch.length > 0) {
            var searchResult = transSearch.runPaged({ pageSize: 1000 });
            searchResult.pageRanges.forEach(function (pageRange) {
                var currPage = searchResult.fetch({ index: pageRange.index });
                currPage.data.forEach(function (result) {
                    data.push(result);
                });
            });
        }
        return data;
    }

    // Based on the License status, free country set, Custom Transactions feature's status
    // and registered CTTs the filters are constructed

    function constructFilterForSendBasedOnConditions() {
        var filterBasedOnCondition = [];

        var licenseInfo = licenseManager.getLicenseInfo();

        var hasPassedLicenseValidationForStdTxn =
            bulkProcessingMgr.hasPassedLicenseValidationForStdTxn(
                licenseInfo,
                false,
                false,
                true
            );

        var isCustomTransactionEnabled = runtime.isFeatureInEffect({
            feature: "CUSTOMTRANSACTIONS",
        });

        allowedCountry = bulkProcessingMgr.getValueOfAllowedFreeCountry();

        if (hasPassedLicenseValidationForStdTxn) {
            if (!isCustomTransactionEnabled) {
                filterBasedOnCondition = getStandardTransactionFilters();
            } else {
                if (transactionMap.getAllOutboundCttCodes().length > 0) {
                    filterBasedOnCondition = constructAllTxnTypeFilters();
                } else {
                    filterBasedOnCondition = getStandardTransactionFilters();
                }
            }
        } else if (
            !allowedCountry &&
            isCustomTransactionEnabled &&
            transactionMap.getAllOutboundCttCodes().length > 0
        ) {
            filterBasedOnCondition = getCustomTransactionFilters(subsidiaryId);
        } else if (allowedCountry) {
            if (
                isCustomTransactionEnabled &&
                transactionMap.getAllOutboundCttCodes().length > 0
            ) {
                filterBasedOnCondition = constructAllTxnTypeFilters();
            } else {
                filterBasedOnCondition = getStandardTransactionFilters();
            }
        }

        return filterBasedOnCondition;
    }

    // Filters for both standard and custom transactions are combined.

    function constructAllTxnTypeFilters() {
        var filtersCombined = [];

        filtersCombined.push(getStandardTransactionFilters());

        filtersCombined.push("OR");

        filtersCombined.push(getCustomTransactionFilters(subsidiaryId));

        return filtersCombined;
    }

    function getStandardTransactionFilters() {
        allowedCountry = bulkProcessingMgr.getValueOfAllowedFreeCountry();

        var filters = transactionMap.getTransactionFilters(allowedCountry, [
            READY_FOR_SENDING,
        ]);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW && subsidiaryId) {
            filters.push("AND");

            filters.push(["subsidiary", search.Operator.IS, subsidiaryId]);
        }

        log.debug(
            "Automatic sending filter for standard transactions",
            JSON.stringify(filters)
        );

        return filters;
    }

    function getCustomTransactionFilters(subsidiaryVal) {
        filtersForCTT = transactionMap.getCustomTransactionFilters([
            READY_FOR_SENDING,
        ]);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW && subsidiaryVal) {
            filtersForCTT.push("AND");

            filtersForCTT.push([
                "subsidiary",
                search.Operator.IS,
                subsidiaryVal,
            ]);
        }

        log.debug(
            "Automatic sending filter for custom transactions",
            filtersForCTT
        );

        return filtersForCTT;
    }

    function map(context) {
        var contextVal = JSON.parse(context.value);

        var transId = contextVal.id;

        var transType = contextVal.recordType;

        var tranNum = contextVal.values.tranid;

        var owner = notifier.getFirstActiveAdmin();

        var sendingDetails = {
            trannum: tranNum,

            type: transType,

            error: null,
        };

        var transLookup = search.lookupFields({
            type: transType,

            id: transId,

            columns: [INV_STATUS_FIELD],
        });

        var eStatus = transLookup[INV_STATUS_FIELD][0].value;

        try {
            if (eStatus === READY_FOR_SENDING) {
                var details = sendingMgr.send(transId, transType, owner, ""); //passing empty string for certSendingMethod as this send is NOT intended for certification.

                if (!details.success) {
                    sendingDetails.error = details.message;
                } else {
                    sendingDetails.error = "Sent";
                }
            }
        } catch (e) {
            log.error("EI_SS_SENDING_ERROR", e);

            sendingDetails.error = e.message;
        }

        if (sendingDetails.error) {
            context.write(owner, sendingDetails);
        }
    }

    function reduce(context) {
        var owner = context.key;

        var sendingDetails = context.values;

        var errorTransactions = [];

        var detailCount = sendingDetails.length;

        for (var i = 0; i < detailCount; i++) {
            var details = JSON.parse(sendingDetails[i]);

            var errorMsg = details.error;

            if (errorMsg !== "Sent") {
                errorTransactions.push(sendingDetails[i]);
            }
        }

        //At least one e-document was sent

        if (detailCount > 0 && errorTransactions.length < detailCount) {
            licenseManager.lockFreeCountry();
        }

        if (owner && errorTransactions.length > 0) {
            notifier.notifySendingError(owner, errorTransactions);
        }
    }

    return {
        getInputData: getInputData,

        map: map,

        reduce: reduce,
    };
});
