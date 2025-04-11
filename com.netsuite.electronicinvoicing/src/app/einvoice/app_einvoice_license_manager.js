/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       05 Apr 2016     aalcabasa
 *
 * @NModuleScope TargetAccount
 *
 */
define([
    "N/record",
    "../license/LicenseChecker",
    "./app_einvoice_free_country_check_helper",
    "./app_einvoice_subsidiary_pref_getter",
    "../../lib/translator",
    "../../ubl/common/lib/constants"
], function (record, licenseChecker, freeCountryCheckHelper, subsidiaryPrefGetter, translator, constants) {
    var SUBSIDIARY_PREFERENCES_RECORD = "customrecord_psg_ei_sub_prefs_data";
    var DISABLED_FREE_COUNTRY_FIELD = "custrecord_psg_ei_sub_disable_country";
    var FREE_COUNTRY = "custrecord_psg_ei_sub_edoc_free_country";
    var INTERNAL_ID_FIELD = "id";
    var NO_LICENSE_CLIENT_MSG_CODE = "license.notinstalled";
    var NO_FREE_COUNTRY_MSG_CODE = "transaction.msg.nofreecountry";
    var TXN_COUNTRY_DIFFERENT_THAN_FREE_COUNTRY_MSG_CODE =
        "transaction.msg.txncountrydifferentthanfreecountry";
    var EI_NSEB_LICENSE_NOT_PRESENT = "einseb.license.notpresent";
    var EI_LICENSE_NOT_PRESENT = "ei.license.notpresent";
    var NSEB_LICENSE_NOT_PRESENT = "nseb.license.notpresent";
    var AVALARA_LICENSE_NOT_PRESENT = "avalara.license.notpresent";
    var ONLY_AVALARA_LICENSE_NOT_PRESENT = "onlyavalara.license.notpresent";
    var LICENSE_NOT_PRESENT_USER_ACTION_INDIVIDUAL = "useraction.license.notpresent";
    var NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";

    function isAvalaraLicenseActive(licenseInfoAvalara) {
        return licenseInfoAvalara.licenseId !== constants.NO_AVALARA_LICENSE && licenseInfoAvalara.availableVolume > 0;
    }

    function isOWWithInactiveEILicense(licenseInfoMultiCountry) {
        return !licenseInfoMultiCountry.hasLicense && freeCountryCheckHelper.isOwAccount();
    }

    /**
    * This function returns the banner message after doing the license check
    * 
    * @param subsidiaryId - subsidiaryId for the transaction
    * @param isAvalaraTransaction - whether the transaction is Avalara transaction or not
    * 
    * @returns banner message for the transaction in case licenses are absent
    */
    function licenseCheckShowBanner(subsidiaryId, isAvalaraTransaction) {
        var bannerMessage = "";
        var licenseInfoMultiCountry = getLicenseInfo(constants.EI_BUNDLE_KEY);
        if (licenseInfoMultiCountry.errorCode === NO_LICENSE_CLIENT_CODE) {
            bannerMessage = translator.getString(
                NO_LICENSE_CLIENT_MSG_CODE
            );
            return bannerMessage;
        }
        var nsebLicenseActive;
        var avalaraLicenseActive;
        if (isAvalaraTransaction) {
            nsebLicenseActive = getLicenseInfo(constants.NSEB_BUNDLE_KEY).hasLicense;
            avalaraLicenseActive = isAvalaraLicenseActive(getLicenseInfo(constants.AVALARA_BUNDLE_KEY));
        }
        if (isOWWithInactiveEILicense(licenseInfoMultiCountry) && (!isAvalaraTransaction || (avalaraLicenseActive && nsebLicenseActive))) {
            var companyInfoCountry =
                freeCountryCheckHelper.getValueOfAllowedFreeCountry();
            if (
                !companyInfoCountry ||
                companyInfoCountry.length === 0
            ) {
                bannerMessage = translator.getString(
                    NO_FREE_COUNTRY_MSG_CODE
                );
                return bannerMessage;
            }
            if (
                !freeCountryCheckHelper.ifFreeCountrySameAsInTxn(
                    subsidiaryId
                )
            ) {
                bannerMessage = translator.getString(
                    TXN_COUNTRY_DIFFERENT_THAN_FREE_COUNTRY_MSG_CODE
                );
                return bannerMessage;
            }
        } else if (isAvalaraTransaction && (isOWWithInactiveEILicense(licenseInfoMultiCountry) || !avalaraLicenseActive || !nsebLicenseActive)) {
            var userActionString = translator.getString(
                LICENSE_NOT_PRESENT_USER_ACTION_INDIVIDUAL
            );
            return getInactiveLicenseString(licenseInfoMultiCountry, avalaraLicenseActive, nsebLicenseActive, subsidiaryId, userActionString);
        }
        return bannerMessage;
    }

    /**
    * This function returns the inactive license checks message for bulk and individual processes
    * 
    * @param licenseInfoMultiCountry - EI multi-country license Info
    * @param avalaraLicenseActive - avalara license check
    * @param nsebLicenseActive - nseb license check
    * @param subsidiaryId - subsidiaryId for the transaction
    * @param userActionString - string which specifies user action
    * 
    * @returns inactive license checks string for bulk and individual processes
    */
    function getInactiveLicenseString(licenseInfoMultiCountry, avalaraLicenseActive, nsebLicenseActive, subsidiaryId, userActionString) {
        var finalMessage = "";
        var multiCountryInactive = false;
        if (isOWWithInactiveEILicense(licenseInfoMultiCountry)) {
            var companyInfoCountry =
                freeCountryCheckHelper.getValueOfAllowedFreeCountry();
            if (
                !companyInfoCountry ||
                companyInfoCountry.length === 0 || !freeCountryCheckHelper.ifFreeCountrySameAsInTxn(
                    subsidiaryId
                )
            ) {
                multiCountryInactive = true;
            }
        }
        if (multiCountryInactive || !nsebLicenseActive) {
            var licenseInactiveMessage;
            if (multiCountryInactive && !nsebLicenseActive) {
                licenseInactiveMessage = translator.getString(
                    EI_NSEB_LICENSE_NOT_PRESENT
                );
            } else if (multiCountryInactive) {
                licenseInactiveMessage = translator.getString(
                    EI_LICENSE_NOT_PRESENT
                );
            } else if (!nsebLicenseActive) {
                licenseInactiveMessage = translator.getString(
                    NSEB_LICENSE_NOT_PRESENT
                );
            }
            finalMessage += licenseInactiveMessage;
            if (!avalaraLicenseActive) {
                finalMessage += ' ' + translator.getString(
                    AVALARA_LICENSE_NOT_PRESENT
                );
            }
        } else if (!avalaraLicenseActive) {
            finalMessage += translator.getString(
                ONLY_AVALARA_LICENSE_NOT_PRESENT
            );
        }
        finalMessage += ' ' + userActionString;
        return finalMessage;
    }

    function getLicenseInfo(bundleKey) {
        if (!bundleKey) {
            bundleKey = constants.EI_BUNDLE_KEY;
        }
        var licenseInfo = licenseChecker.getLicenseInfo(bundleKey);

        if (bundleKey == constants.EI_BUNDLE_KEY) {
            updateLicenseControls(licenseInfo.hasLicense);
        }

        return licenseInfo;
    }

    /**
    * This function returns the array containing information about the licenses for the bundle Keys passed as parameters
    * 
    * @param bundleKey - bundleKeys for which license Info is required
    * 
    * @returns arrays containing license information for the particular bundles
    */
    function getLicenseInfos(bundleKeys) {
        var licenseInfoArr = [];
        for (var i in bundleKeys) {
            licenseInfoArr.push(getLicenseInfo(bundleKeys[i]));
        }

        return licenseInfoArr;
    }

    /**
     * Updates the parent subsidiary's free country setup
     * */
    function updateLicenseControls(hasLicense) {
        var subsidiaryFieldScriptIds = [
            DISABLED_FREE_COUNTRY_FIELD,
            INTERNAL_ID_FIELD,
            FREE_COUNTRY,
        ];
        var parentCompanySubsidiaryId = subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        var isCountryEmpty = !subsidiaryPreferencesObj[FREE_COUNTRY];
        var disabled = subsidiaryPreferencesObj[DISABLED_FREE_COUNTRY_FIELD];
        var internalId = subsidiaryPreferencesObj[INTERNAL_ID_FIELD];

        var allowUpdate = false;
        if (hasLicense) {
            allowUpdate = !isCountryEmpty || (isCountryEmpty && !disabled);
        } else {
            allowUpdate = isCountryEmpty && disabled;
        }

        if (allowUpdate && internalId) {
            var fieldsForUpdate = {};
            fieldsForUpdate[DISABLED_FREE_COUNTRY_FIELD] = hasLicense;
            fieldsForUpdate[FREE_COUNTRY] = "";
            record.submitFields({
                type: SUBSIDIARY_PREFERENCES_RECORD,
                id: internalId,
                values: fieldsForUpdate,
            });
        }
    }

    function lockFreeCountry() {
        var subsidiaryFieldScriptIds = [
            DISABLED_FREE_COUNTRY_FIELD,
            INTERNAL_ID_FIELD,
        ];
        var parentCompanySubsidiaryId = subsidiaryPrefGetter.getParentSubsidiaryId();
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                parentCompanySubsidiaryId,
                subsidiaryFieldScriptIds
            );
        var disabled = subsidiaryPreferencesObj[DISABLED_FREE_COUNTRY_FIELD];
        var internalId = subsidiaryPreferencesObj[INTERNAL_ID_FIELD];
        if (!disabled && internalId) {
            var fieldsForUpdate = {};
            fieldsForUpdate[DISABLED_FREE_COUNTRY_FIELD] = true;
            record.submitFields({
                type: SUBSIDIARY_PREFERENCES_RECORD,
                id: internalId,
                values: fieldsForUpdate,
            });
        }
    }

    return {
        licenseCheckShowBanner: licenseCheckShowBanner,
        isOWWithInactiveEILicense: isOWWithInactiveEILicense,
        getInactiveLicenseString: getInactiveLicenseString,
        getLicenseInfo: getLicenseInfo,
        getLicenseInfos: getLicenseInfos,
        isAvalaraLicenseActive: isAvalaraLicenseActive,
        updateLicenseControls: updateLicenseControls,
        lockFreeCountry: lockFreeCountry,
    };
});
