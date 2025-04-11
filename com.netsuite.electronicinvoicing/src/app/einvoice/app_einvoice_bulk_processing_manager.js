/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    "../../lib/app/app_transaction_type_map",
    "../../lib/translator",
    "N/search",
    "N/query",
    "N/error",
    "N/runtime",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../utils/queryUtils",
    "../../ubl/common/lib/constants",
    "../../lib/constants/main_constants",
    "../../lib/constants/record_fields",
    "../../lib/constants/message_translations_map"
], function (
    transactionMap,
    translator,
    search,
    query,
    error,
    runtime,
    notifier,
    freeCountryCheckHelper,
    subsidiaryPrefGetter,
    licenseManager,
    queryUtils,
    constants,
    mainConstants,
    recordFields,
    messageTranslations
) {
    var LICENSE_CLIENT_UNAVAILABLE_MSG =
        "The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.";

    var CONFIGURE_FREE_COUNTRY_MSG_FOR_GENERATE =
        "Your account must have an active license to use Electronic Invoicing for multiple countries. To generate e-documents by bulk to a single country, you must select the country from the E-Document Country for Free Use field under the parent company record in Electronic Invoicing Preferences page.";

    var CONFIGURE_FREE_COUNTRY_MSG_FOR_SEND_AND_CERTIFY =
        "Your account must have an active license to use Electronic Invoicing for multiple countries. To send e-documents by bulk to a single country, you must select the country from the E-Document Country for Free Use field under the parent company record in Electronic Invoicing Preferences page.";

    var TRANSACTIONS_PROCESSED_MSG =
        "Only the following transaction types are processed:";

    var LICENSE_CLIENT_UNAVAILABLE_CODE = "license.notinstalled";

    var CONFIGURE_FREE_COUNTRY_CODE_SEND = "ei.sending.configurefreecountry";

    var CONFIGURE_FREE_COUNTRY_CODE_GENERATE =
        "ei.generation.configurefreecountry";

    var CUSTOM_TRANSACTIONS_PROCESSED_CODE =
        "bulkgeneration.onlycusttxnsprocessed";

    var NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";

    var FREE_COUNTRY_FIELD = "custrecord_psg_ei_sub_edoc_free_country";

    var LICENSE_NOT_PRESENT_USER_ACTION_BULK_GEN = messageTranslations.MAILS.NO_LICENSE.USER_ACTION_BULK_GEN.MESSAGE_TRANSLATION_CODE;

    var LICENSE_NOT_PRESENT_USER_ACTION_BULK_CER = messageTranslations.MAILS.NO_LICENSE.USER_ACTION_BULK_CERT.MESSAGE_TRANSLATION_CODE;

    /**

         * Function to get translation strings from translator module

         * @returns void

         */

    function getTranslations() {
        LICENSE_CLIENT_UNAVAILABLE_MSG =
            translator.getString(LICENSE_CLIENT_UNAVAILABLE_CODE) ||
            LICENSE_CLIENT_UNAVAILABLE_MSG;

        CONFIGURE_FREE_COUNTRY_MSG_FOR_SEND_AND_CERTIFY =
            translator.getString(CONFIGURE_FREE_COUNTRY_CODE_SEND) ||
            CONFIGURE_FREE_COUNTRY_MSG_FOR_SEND_AND_CERTIFY;

        CONFIGURE_FREE_COUNTRY_MSG_FOR_GENERATE =
            translator.getString(CONFIGURE_FREE_COUNTRY_CODE_GENERATE) ||
            CONFIGURE_FREE_COUNTRY_MSG_FOR_GENERATE;

        TRANSACTIONS_PROCESSED_MSG =
            translator.getString(CUSTOM_TRANSACTIONS_PROCESSED_CODE) ||
            TRANSACTIONS_PROCESSED_MSG;
    }

    /**

         * This function checks if an active license is present for the account or not, if not then

         * checks if free country is set or not if not set then log an error.

         * if License server is not available then also logs an error.

         * @returns {boolean}

         */

    function hasPassedLicenseValidationForStdTxn(
        licenseInfo,
        isForGeneration,
        isForCertify,
        isForSending
    ) {
        var isValid = true;

        var errorCode;

        var errorMsg = "";

        if (isForGeneration) {
            errorCode = "EI_BULK_GENERATION_ERROR";

            errorMsg = CONFIGURE_FREE_COUNTRY_MSG_FOR_GENERATE;
        } else if (isForCertify) {
            errorCode = "EI_AUTOMATIC_CERTIFY_ERROR";

            errorMsg = CONFIGURE_FREE_COUNTRY_MSG_FOR_SEND_AND_CERTIFY;
        } else if (isForSending) {
            errorCode = "EI_AUTOMATIC_SENDING_ERROR";

            errorMsg = CONFIGURE_FREE_COUNTRY_MSG_FOR_SEND_AND_CERTIFY;
        }

        var errorParams = {
            name: errorCode,

            message: errorMsg,

            notifyOff: false, // intended to send to all admins
        };

        if (
            !licenseInfo.hasLicense &&
            licenseInfo.errorCode === NO_LICENSE_CLIENT_CODE
        ) {
            errorParams.message = LICENSE_CLIENT_UNAVAILABLE_MSG;

            log.error(errorParams.name, errorParams.message);

            throw error.create(errorParams);
        } else if (freeCountryCheckHelper.isOwAccount()) {
            if (!licenseInfo.hasLicense) {
                var allowedCountry = getValueOfAllowedFreeCountry();

                if (!allowedCountry) {
                    var isCustomTransactionEnabled = runtime.isFeatureInEffect({
                        feature: "CUSTOMTRANSACTIONS",
                    });

                    if (isCustomTransactionEnabled) {
                        var cttNames = [];

                        cttNames = getRegisteredCttNames().toString();

                        errorParams.message = cttNames
                            ? errorMsg
                                .concat(" ")
                                .concat(TRANSACTIONS_PROCESSED_MSG)
                                .concat(" ")
                                .concat(cttNames)
                            : errorMsg;

                        log.error(errorParams.name, errorParams.message);

                        isValid = false;

                        sendNotificationEmail();
                    } else {
                        errorParams.message = errorMsg;

                        log.error(errorParams.name, errorParams.message);

                        throw error.create(errorParams);
                    }
                }
            }
        }

        return isValid;
    }

    function getValueOfAllowedFreeCountry() {
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

    /**
    * This function returns the transaction query object after adding the required columns for bulk processes
    * @returns {query}
    */
    function getTransactionQueryObject() {
        var transQuery = query.create({
            type: query.Type.TRANSACTION,
        });
        transQuery.columns = [
            transQuery.createColumn({
                fieldId: mainConstants.CORE_FIELDS.ID,
            }),
            transQuery.createColumn({
                fieldId: mainConstants.CORE_FIELDS.TRAN_ID,
            }),
            transQuery.createColumn({
                fieldId: mainConstants.CORE_FIELDS.RECORD_TYPE
            })
        ];
        return transQuery;
    }

    /**
     * avalaraTransactionQuery- returns the query to get the avalara transactions for the subsidiary, allowed country and the e-document statuses
     *
     * @param {String} subsidiaryId
     * @param {String} allowedCountry
     * @param {Array} invStatus - e-document statuses to query the transactions
     * 
     * @returns {query}
     */
    function avalaraTransactionQuery(subsidiaryId, allowedCountry, invStatus, isGenerate) {
        var avalaraTransQuery = getTransactionQueryObject();
        var filters = transactionMap.getTransactionFiltersQuery(avalaraTransQuery, subsidiaryId, allowedCountry, invStatus);
        if (isGenerate)
            filters.push(avalaraTransQuery.createCondition({
                fieldId: mainConstants.RECORD_TYPES.EDOCUMENT_TEMPLATE + "." + recordFields[mainConstants.RECORD_TYPES.EDOCUMENT_TEMPLATE].IS_AVALARA, operator: query.Operator.IS, values: true
            }));
        else
            filters.push(avalaraTransQuery.createCondition({
                fieldId: constants.TRANSACTION_FIELDS.TRANSACTION_MANDATE, operator: query.Operator.EMPTY_NOT
            }));
        avalaraTransQuery.condition = avalaraTransQuery.and(filters);
        return avalaraTransQuery;
    }

    /**
     * sendAvalaraLicenseNotification- sends Notification Email to recipient in case avalara/nseb license(s) are not present and avalara transactions
     * need to be processed
     *
     * @param {Boolean} avalaraLicenseActive - license status for Avalara
     * @param {Boolean} nsebLicenseActive - license status for NSEB
     * @param {String} subsidiaryId
     * @param {String} allowedCountry
     * @param {Array} invStatus - e-document statuses to query the transactions
     * @param {Boolean} isGenerate - true for generate MR/ false for certify MR
     */
    function sendAvalaraLicenseNotification(avalaraLicenseActive, nsebLicenseActive, subsidiaryId, allowedCountry, invStatus, isGenerate) {
        try {
            var avalaraTransQuery = avalaraTransactionQuery(subsidiaryId, allowedCountry, invStatus, true);
            var resultCount = avalaraTransQuery.runPaged({
                pageSize: 10
            }).count;

            if (resultCount) {
                var owner = notifier.getFirstActiveAdmin();
                var userActionString = translator.getString(
                    isGenerate ? LICENSE_NOT_PRESENT_USER_ACTION_BULK_GEN : LICENSE_NOT_PRESENT_USER_ACTION_BULK_CER
                );
                var licenseAbsentMessage = licenseManager.getInactiveLicenseString({ hasLicense: true }, avalaraLicenseActive, nsebLicenseActive, subsidiaryId, userActionString);
                if (owner) {
                    notifier.notifyAvalaraLicenseIsAbsent(owner, licenseAbsentMessage);
                }
            }
        } catch (ex) {
            log.error("Error in sendAvalaraLicenseNotification", ex);
        }
    }

    /**
     * getAvalaraTransactions- function which runs query and returns Avalara transactions
     *
     * @param {Boolean} nsebLicenseActive - license status for NSEB
     * @param {Object} licenseInfoAvalara - license Info object for Avalara
     * @param {String} subsidiaryId
     * @param {String} allowedCountry
     * @param {Array} invStatus - e-document statuses to query the transactions
     * @param {Boolean} isGenerate - true for generate MR/ false for certify MR
     */
    function getAvalaraTransactions(nsebLicenseActive, licenseInfoAvalara, subsidiaryId, allowedCountry, invStatus, isGenerate) {
        try {
            var avalaraLicenseActive = licenseManager.isAvalaraLicenseActive(licenseInfoAvalara);
            if (!nsebLicenseActive || !avalaraLicenseActive) {
                sendAvalaraLicenseNotification(avalaraLicenseActive, nsebLicenseActive, subsidiaryId, allowedCountry, invStatus, isGenerate);
            } else if (hasPassedLicenseValidationForStdTxn || allowedCountry) {
                var avalaraQuery = avalaraTransactionQuery(subsidiaryId, allowedCountry, invStatus, isGenerate);
                return queryUtils.getQueryResults(avalaraQuery, licenseInfoAvalara.availableVolume);
            }
        } catch (ex) {
            log.error("Error in getAvalaraTransactions", ex);
        }
        return [];
    }

    function sendNotificationEmail() {
        var owner = notifier.getFirstActiveAdmin();

        if (owner) {
            notifier.notifyLicenseCheckError(owner);
        }
    }

    /**
         Returns an array containing names of all the CTTs registered in the account.

         Eg: [Basic CTT 1, Test Sales, Purchase Test 1]

         */

    function getRegisteredCttNames() {
        var EICTTMAP_REC_TYPE = "customrecord_ei_ctt_map";

        var EICTTMAP_REGISTERED_CTT_FIELD_ID = "custrecord_ei_registered_ctt";

        var cttLookupResult = search.lookupFields({
            type: EICTTMAP_REC_TYPE,

            id: 1,

            columns: EICTTMAP_REGISTERED_CTT_FIELD_ID,
        });

        var cttMultiselectFieldValue =
            cttLookupResult[EICTTMAP_REGISTERED_CTT_FIELD_ID];

        var result = [];

        for (var i = 0; i < cttMultiselectFieldValue.length; i++) {
            result.push(cttMultiselectFieldValue[i].text);
        }

        return result;
    }

    return {
        hasPassedLicenseValidationForStdTxn:
            hasPassedLicenseValidationForStdTxn,

        getTransactionQueryObject: getTransactionQueryObject,

        sendAvalaraLicenseNotification: sendAvalaraLicenseNotification,

        getTranslations: getTranslations,

        getRegisteredCttNames: getRegisteredCttNames,

        getValueOfAllowedFreeCountry: getValueOfAllowedFreeCountry,

        getAvalaraTransactions: getAvalaraTransactions,
    };
});
