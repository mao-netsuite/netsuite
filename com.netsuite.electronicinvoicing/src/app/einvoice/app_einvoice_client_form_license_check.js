/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2016         ldimayuga
 *
 *	@NModuleScope TargetAccount
 */
define([
    "N/url",
    "N/https",
    "./app_einvoice_license_check_for_urlparams",
], function (url, https, licenseCheckForUrlParams) {
    var LICENSE_INFO_SU_SCRIPT = "customscript_ei_license_info_service_su";
    var LICENSE_INFO_SU_DEPLOY = "customdeploy_ei_license_info_service_su";
    var NO_LICENSE_CLIENT_CODE = "license.notinstalled";

    function validateLicense(formCountry) {
        var valid = true;
        var suiteletURL = url.resolveScript({
            scriptId: LICENSE_INFO_SU_SCRIPT,
            deploymentId: LICENSE_INFO_SU_DEPLOY,
        });
        var licenseInfo = {};
        try {
            var response = https.post({
                url: suiteletURL,
                body: {},
            });
            licenseInfo =
                response && response.body ? JSON.parse(response.body) : {};
        } catch (e) {
            log.error(e.name, e.message + " " + e.stack);
            licenseInfo.hasLicense = false;
            licenseInfo.errorCode = NO_LICENSE_CLIENT_CODE;
            licenseInfo.freeCountry = "";
        }
        var hasLicenseClient = checkLicenseClient(licenseInfo);
        var hasLicense = licenseInfo.hasLicense;
        var countrySetup = licenseInfo.freeCountry;
        if (!hasLicenseClient) {
            valid = false;
        } else if (licenseCheckForUrlParams.isOWAccount()) {
            if (
                !hasLicense &&
                (!countrySetup || countrySetup !== formCountry)
            ) {
                valid = false;
            }
        }
        return valid;
    }

    function checkLicenseClient(licenseInfo) {
        var hasLicenseClientValue = false;
        if (
            licenseInfo.hasLicense ||
            (!licenseInfo.hasLicense &&
                licenseInfo.errorCode != NO_LICENSE_CLIENT_CODE)
        ) {
            hasLicenseClientValue = true;
        }
        return hasLicenseClientValue;
    }

    return {
        validateLicense: validateLicense,
    };
});
