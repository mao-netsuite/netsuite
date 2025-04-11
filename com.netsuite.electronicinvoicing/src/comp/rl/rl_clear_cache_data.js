/**
 * @NApiVersion 2.1
 * @NScriptType restlet
 */

define(["N/cache"], function (cache) {

    var EI_LICENSE_CACHE_NAME = "PSG_EI_LICENSE_CACHE";
    var keys = ["EI", "NSEB", "Avalara"];

    function get() {
        var responseObj = {
            success: false,
            details: '',
        };
        try {
            var licenseCache = cache.getCache({
                name: EI_LICENSE_CACHE_NAME,
                scope: cache.Scope.PROTECTED
            });
            keys.map(function (key) {
                licenseCache.remove({
                    key: key,
                });
                return true;
            })
            responseObj.success = true;
            responseObj.details = 'License cache cleared';
        } catch (err) {
            responseObj.details = err.message;
        }
        return JSON.stringify(responseObj);

    }

    return {
        get: get,
    };
});