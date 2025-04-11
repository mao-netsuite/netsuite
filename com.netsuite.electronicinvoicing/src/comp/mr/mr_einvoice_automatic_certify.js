/**

 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.

 *

 * @NApiVersion 2.x

 * @NScriptType mapreducescript

 */

define([
    "../../app/einvoice/app_einvoice_sending_manager",
    "N/runtime",
    "../../app/einvoice/app_einvoice_notifier",
    "N/search",
    "N/query",
    "../../lib/app/app_transaction_type_map",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../app/einvoice/app_einvoice_outbound_certification",
    "../../app/einvoice/app_einvoice_bulk_processing_manager",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../utils/queryUtils",
    "../../ubl/common/lib/constants",
], function (
    sendingMgr,
    runtime,
    notifier,
    search,
    query,
    transactionMap,
    licenseManager,
    certification,
    bulkProcessingMgr,
    freeCountryCheckHelper,
    queryUtils,
    constants
) {
    //Transaction record related

    var INV_STATUS_FIELD = "custbody_psg_ei_status";

    var READY_FOR_CERTIFICATION = "19";

    var SCRIPT_PARAM_SUBSIDIARY_ID = "custscript_ei_subsidiary_mr_certify";

    var NSEB_AVALARA_MANDATE_FIELD = "custbody_nseb_avalara_mandate";

    var LANGUAGE_PREFERENCE_CODE = "LANGUAGE";

    // Variables related to filters

    var licenseInfo;
    var licenseInfoNseb;
    var licenseInfoAvalara;
    var subsidiaryId;
    var filtersForCTT;
    var allowedCountry;
    var hasPassedLicenseValidationForStdTxn;

    function getInputData() {
        try {
            var scriptObj = runtime.getCurrentScript();

            subsidiaryId = scriptObj.getParameter({
                name: SCRIPT_PARAM_SUBSIDIARY_ID,
            });
            allowedCountry = freeCountryCheckHelper.getInternalIdOfAllowedFreeCountry();

            var transactions = [];

            [licenseInfo, licenseInfoNseb, licenseInfoAvalara] = licenseManager.getLicenseInfos([constants.EI_BUNDLE_KEY, constants.NSEB_BUNDLE_KEY, constants.AVALARA_BUNDLE_KEY]);

            hasPassedLicenseValidationForStdTxn =
                bulkProcessingMgr.hasPassedLicenseValidationForStdTxn(
                    licenseInfo,
                    false,
                    true,
                    false
                );

            log.debug("Processing Certification for Subsidiary: " + subsidiaryId);

            bulkProcessingMgr.getTranslations();

            var transQuery = bulkProcessingMgr.getTransactionQueryObject();
            constructFilterForCertifyBasedOnConditions(transQuery);
            if (transQuery.condition) {
                transactions = transactions.concat(queryUtils.getQueryResults(transQuery));
            }

            transactions = transactions.concat(bulkProcessingMgr.getAvalaraTransactions(licenseInfoNseb.hasLicense, licenseInfoAvalara, subsidiaryId, allowedCountry, [
                READY_FOR_CERTIFICATION
            ], false));

            return transactions;
        } catch (ex) {
            log.error("Error in Get Input Data stage: " + ex.name, ex);
        }
    }

    // Based on the License status, free country set, Custom Transactions feature's status
    // and registered CTTs the filters are constructed

    function constructFilterForCertifyBasedOnConditions(transQuery) {
        var filterBasedOnCondition = [];

        var isCustomTransactionEnabled = runtime.isFeatureInEffect({
            feature: "CUSTOMTRANSACTIONS",
        });

        if (hasPassedLicenseValidationForStdTxn || allowedCountry) {
            if (
                isCustomTransactionEnabled &&
                transactionMap.getAllOutboundCttCodes().length > 0
            ) {
                transQuery.condition = transQuery.or(transQuery.and(getStandardTransactionFilters(transQuery)), transQuery.and(getCustomTransactionFilters(transQuery)));
            } else {
                transQuery.condition = transQuery.and(getStandardTransactionFilters(transQuery));
            }
        } else if (
            !allowedCountry &&
            isCustomTransactionEnabled &&
            transactionMap.getAllOutboundCttCodes().length > 0
        ) {
            transQuery.condition = transQuery.and(getCustomTransactionFilters(transQuery));
        }

        return filterBasedOnCondition;
    }


    function getStandardTransactionFilters(transQuery) {
        var filters = transactionMap.getTransactionFiltersQuery(transQuery, subsidiaryId, allowedCountry, [
            READY_FOR_CERTIFICATION
        ]);

        if (licenseInfoNseb.errorCode !== constants.NO_NSEB) {
            filters.push(transQuery.createCondition({
                fieldId: NSEB_AVALARA_MANDATE_FIELD, operator: query.Operator.EMPTY
            }));
        }

        return filters;
    }

    function getCustomTransactionFilters(transQuery) {
        filtersForCTT = transactionMap.getCustomTransactionFiltersQuery(transQuery, [
            READY_FOR_CERTIFICATION,
        ]);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW && subsidiaryId) {
            filtersForCTT.push(transQuery.createCondition({
                fieldId: "transactionlines.subsidiary", operator: query.Operator.EQUAL, values: subsidiaryId
            }));
            filtersForCTT.push(transQuery.createCondition({
                fieldId: "transactionlines.mainline", operator: query.Operator.IS, values: true
            }));
        }

        return filtersForCTT;
    }

    function map(context) {
        try {
            var contextVal = JSON.parse(context.value);

            log.debug("contextVal", contextVal.values);

            var transId = contextVal.values[0];

            var tranNum = contextVal.values[1];

            var transType = contextVal.values[2];

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
                if (eStatus === READY_FOR_CERTIFICATION) {
                    var transObj = sendingMgr.getOutboundEDocRecord(
                        transId,
                        transType
                    );
                    var isAvalara = transObj.getValue(NSEB_AVALARA_MANDATE_FIELD)
                        ? true
                        : false;

                    var certSendingMethodId =
                        certification.getCertSendingMethodId(transObj);
                    var locale = runtime
                        .getCurrentUser()
                        .getPreference(LANGUAGE_PREFERENCE_CODE);

                    var details = sendingMgr.send(
                        transId,
                        transType,
                        owner,
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
                log.error("EI_SS_CERTIFICATION_ERROR", e);

                sendingDetails.error = e.message;
            }

            if (sendingDetails.error) {
                context.write(owner, sendingDetails);
            }
        } catch (ex) {
            log.error("Error in Map stage: " + ex.name, ex);
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
