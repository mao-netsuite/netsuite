define(["require", "exports", "../../ubl/common/components/cache", "../../ubl/common/lib/constants", "./LicenseChecker"], function (require, exports, cache_1, constants_1, LicenseChecker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decreaseCount = exports.getLicenseId = void 0;
    function getLicenseId() {
        try {
            return (0, LicenseChecker_1.getLicenseInfo)(constants_1.AVALARA_BUNDLE_KEY).licenseId;
        }
        catch (err) {
            log.error("Unable to get Avalara License Id", err);
        }
    }
    exports.getLicenseId = getLicenseId;
    function decreaseCount(count) {
        try {
            var licenseInfoAvalara = (0, LicenseChecker_1.getLicenseInfo)(constants_1.AVALARA_BUNDLE_KEY);
            licenseInfoAvalara.availableVolume =
                licenseInfoAvalara.availableVolume - count;
            try {
                var eiCache = cache_1.cache.getCache({
                    name: constants_1.EI_LICENSE_CACHE_NAME,
                    scope: cache_1.cache.Scope.PROTECTED,
                });
                eiCache.put({
                    key: constants_1.AVALARA_BUNDLE_KEY,
                    value: JSON.stringify(licenseInfoAvalara),
                });
                return true;
            }
            catch (err) {
                log.error("Unable to update Avalara License Count for ".concat(licenseInfoAvalara.licenseId), err);
                return false;
            }
        }
        catch (err) {
            log.error("Unable to get license Id", err);
            return false;
        }
    }
    exports.decreaseCount = decreaseCount;
});
