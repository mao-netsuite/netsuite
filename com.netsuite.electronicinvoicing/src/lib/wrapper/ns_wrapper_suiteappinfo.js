/**

 * @NModuleScope TargetAccount

 */
define(["N/suiteAppInfo"], function (suiteAppInfo) {
    function listBundlesContainingScripts(params) {
        return suiteAppInfo.listBundlesContainingScripts({
            scriptIds: [params],
        });
    }

    function isBundleInstalled(params) {
        return suiteAppInfo.isBundleInstalled(params);
    }

    function listInstalledBundles() {
        return suiteAppInfo.listInstalledBundles();
    }

    return {
        listBundlesContainingScripts: listBundlesContainingScripts,

        isBundleInstalled: isBundleInstalled,

        listInstalledBundles: listInstalledBundles,
    };
});
