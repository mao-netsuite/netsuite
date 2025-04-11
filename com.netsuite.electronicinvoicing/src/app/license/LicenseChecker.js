define(["require", "exports", "../../ubl/common/components/cache", "../../ubl/common/components/db", "../../ubl/common/components/https", "../../ubl/common/components/suiteAppInfo", "../../ubl/common/components/url", "../../ubl/common/lib/constants"], function (require, exports, cache_1, db_1, https_1, suiteAppInfo_1, url_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLicenseInfo = void 0;
    var SU_SCRIPT = "customscript_8299_su_get_license";
    var SU_DEPLOY = "customdeploy_8299_su_get_license";
    var ACTIVE_STATUS = "Active";
    //error code
    var INACTIVE_LICENSE_CODE = "INACTIVE_LICENSE";
    var QUANTITY_MULTIPLIER = 1000;
    var bundleIdMapping = {
        License_Client_Feature_Dev: 64271,
        License_Client_Feature_QA: 64270,
        License_Client_MainLine_Dev: 115413,
        License_Client_MainLine_QA: 115411,
        License_Client_Live_Dev: 116136,
        License_Client_Live_QA: 116134,
        License_Client_Prod: 116144,
    };
    var bundleIdArr = [
        bundleIdMapping.License_Client_Feature_Dev,
        bundleIdMapping.License_Client_Feature_QA,
        bundleIdMapping.License_Client_MainLine_Dev,
        bundleIdMapping.License_Client_MainLine_QA,
        bundleIdMapping.License_Client_Live_Dev,
        bundleIdMapping.License_Client_Live_QA,
        bundleIdMapping.License_Client_Prod,
    ];
    var bundleInfo = {
        EI: "ELECTRONIC INVOICES",
        NSEB: "NETSUITE ELECTRONIC BUSINESS",
        Avalara: "AVALARA PROCESSING FOR NETSUITE ELECTRONIC INVOICING",
    };
    function isLicenseCheckFromValidSource() {
        var bundlesContainingScripts = suiteAppInfo_1.suiteAppInfo.listBundlesContainingScripts({
            scriptIds: [SU_SCRIPT],
        });
        var validBundleIds = bundlesContainingScripts[SU_SCRIPT];
        for (var i in bundleIdArr) {
            for (var j in validBundleIds) {
                if (bundleIdArr[i] === validBundleIds[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    function getLicenseUsageCount(licenseKey) {
        var auditTrailQuery = "SELECT id from customrecord_psg_ei_audit_trail auditTrailRecord where auditTrailRecord.isinactive = 'F' and auditTrailRecord.custrecord_psg_ei_audit_license_key LIKE ?";
        var auditTrailResults = db_1.db.query(auditTrailQuery, [licenseKey]);
        return auditTrailResults.length;
    }
    function getLicenseSuiteScriptUrl() {
        return url_1.url.resolveScript({
            scriptId: SU_SCRIPT,
            deploymentId: SU_DEPLOY,
            returnExternalUrl: true,
        });
    }
    function updateAvalaraLicenseInfo() {
        var licenseInfo = {
            hasLicense: false,
            licenseId: constants_1.NO_AVALARA_LICENSE,
            availableVolume: 0,
        };
        var suiteletURL = getLicenseSuiteScriptUrl();
        var response = https_1.https.post({
            url: suiteletURL,
            body: {
                licensedetailsforbundleid: bundleInfo["Avalara"],
            },
        });
        var result = JSON.parse(response.body)["licenses"];
        if (result.length) {
            licenseInfo.hasLicense = true;
        }
        result.sort(function (a, b) { return new Date(a.enddate).getTime() - new Date(b.enddate).getTime(); });
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var license = result_1[_i];
            var licenseId = license.licenseid, quantity = license.quantity;
            var licenseVolume = Number(quantity) * QUANTITY_MULTIPLIER;
            var currCount = getLicenseUsageCount(licenseId);
            if (currCount < licenseVolume) {
                licenseInfo.licenseId = licenseId;
                licenseInfo.availableVolume = licenseVolume - currCount;
                break;
            }
        }
        return JSON.stringify(licenseInfo);
    }
    function licenseDataLoader(context) {
        log.debug("license checker", "get license loader called");
        var isLicenseCheckFromValidBundle = false;
        isLicenseCheckFromValidBundle = isLicenseCheckFromValidSource();
        if (!isLicenseCheckFromValidBundle)
            throw new Error("EI_NO_NSLC: NetSuite SuiteApps License Client is not installed in this account.");
        if (context["key"] === constants_1.AVALARA_BUNDLE_KEY) {
            return updateAvalaraLicenseInfo();
        }
        else {
            var suiteletURL = getLicenseSuiteScriptUrl();
            var response = https_1.https.post({
                url: suiteletURL,
                body: {
                    bundleid: String(bundleInfo[context["key"]]),
                },
            });
            var result = JSON.parse(response.body);
            return String(result.status === ACTIVE_STATUS);
        }
    }
    /**
     * This function makes a call to the NetSuite SuiteApp License Client to retrieve license information.
     *  @returns licenseResponse.hasLicense Boolean - indicates if the account has an active license
     *  		 licenseResponse.message String - additional message/information
     *  @throws {error.SuiteScriptError} EI_LICENSE_RETRIEVER
     */
    function getLicenseInfo(bundleKey) {
        if (bundleKey === constants_1.NSEB_BUNDLE_KEY &&
            !suiteAppInfo_1.suiteAppInfo.isSuiteAppInstalled({
                suiteAppId: constants_1.NSEB_SUITEAPP_ID,
            })) {
            return {
                hasLicense: false,
                errorCode: constants_1.NO_NSEB,
            };
        }
        try {
            var licenseInfoFetchStartTime = Date.now();
            var eiLicenseCache = cache_1.cache.getCache({
                name: constants_1.EI_LICENSE_CACHE_NAME,
                scope: cache_1.cache.Scope.PROTECTED,
            });
            var licenseInfo = eiLicenseCache.get({
                key: bundleKey,
                loader: licenseDataLoader,
                ttl: 1800, //30 minutes
            });
            var licenseInfoFetchEndTime = Date.now();
            log.debug("license checker", "fetched license info in " +
                (licenseInfoFetchEndTime - licenseInfoFetchStartTime) +
                "ms");
            if (bundleKey !== constants_1.AVALARA_BUNDLE_KEY) {
                var licenseResponse = {
                    hasLicense: false,
                    errorCode: INACTIVE_LICENSE_CODE,
                };
                if (licenseInfo === "true") {
                    licenseResponse.hasLicense = true;
                    licenseResponse.errorCode = "";
                }
                return licenseResponse;
            }
            else {
                var licenseResponse = JSON.parse(licenseInfo);
                if (licenseResponse.licenseId !== constants_1.NO_AVALARA_LICENSE &&
                    Number(licenseResponse.availableVolume) <= 0) {
                    licenseInfo = updateAvalaraLicenseInfo();
                    eiLicenseCache.put({
                        key: constants_1.AVALARA_BUNDLE_KEY,
                        value: licenseInfo,
                    });
                }
                return JSON.parse(licenseInfo);
            }
        }
        catch (err) {
            log.error(err.name, err.message + " " + err.stack);
            if (bundleKey === constants_1.AVALARA_BUNDLE_KEY)
                return {
                    hasLicense: false,
                    licenseId: constants_1.NO_AVALARA_LICENSE,
                    availableVolume: 0,
                };
            return {
                hasLicense: false,
                errorCode: constants_1.NO_LICENSE_CLIENT_CODE,
            };
        }
    }
    exports.getLicenseInfo = getLicenseInfo;
});
