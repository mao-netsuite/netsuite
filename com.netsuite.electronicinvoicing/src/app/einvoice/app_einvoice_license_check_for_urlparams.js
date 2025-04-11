/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(["N/runtime"], function (runtime) {
    var SUBSIDIARIES = "SUBSIDIARIES";

    function isOWAccount() {
        return runtime.isFeatureInEffect(SUBSIDIARIES);
    }

    function areAllConditionsFulfilledForSearch(hasLicense, countrySetup) {
        var isValid = false;
        if ((isOWAccount() && (hasLicense || countrySetup)) || !isOWAccount()) {
            isValid = true;
        }
        return isValid;
    }

    /* As we are now not considering any license checks for SI account so we will always pass hasLicense = True for
     * SI accounts in the URL parameters */
    function hasLicenseValueForURLParameters(hasLicense) {
        var hasLicenseVal;
        if (!isOWAccount()) {
            hasLicenseVal = "T";
        } else if (isOWAccount()) {
            if (typeof hasLicense === "boolean") {
                hasLicenseVal = hasLicense === true ? "T" : "F";
            } else {
                hasLicenseVal = hasLicense;
            }
        }
        return hasLicenseVal;
    }

    return {
        isOWAccount: isOWAccount,
        areAllConditionsFulfilledForSearch: areAllConditionsFulfilledForSearch,
        hasLicenseValueForURLParameters: hasLicenseValueForURLParameters,
    };
});
