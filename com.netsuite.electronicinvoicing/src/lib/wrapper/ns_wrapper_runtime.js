/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       20 Oct 2015     ssantiago
 *
 * @NModuleScope TargetAccount
 */
define(["N/runtime"], function (runtime) {
    /**
     * Check if a feature is turned on and in effect
     * @param {Object} options
     * @param { string } options.feature id of the feature
     * @return {boolean}
     */
    function isFeatureInEffect(feature) {
        return runtime.isFeatureInEffect(feature);
    }

    /**
     * Check if account is OW by checking SUBSIDIARIES feature.
     * @return {boolean}
     */
    function isOW() {
        return isFeatureInEffect("SUBSIDIARIES");
    }

    /**
     * Get the current log in user object
     * @return {User}
     */
    function getCurrentUser() {
        return runtime.getCurrentUser();
    }

    /**
     * Get the current executing Script object
     * @return {Script}
     */
    function getCurrentScript() {
        return runtime.getCurrentScript();
    }

    function getCurrentSession() {
        return runtime.getCurrentSession();
    }

    return {
        ContextType: runtime.ContextType,
        EnvType: runtime.EnvType,
        Permission: runtime.Permission,
        executionContext: runtime.executionContext,
        version: runtime.version,
        isFeatureInEffect: isFeatureInEffect,
        isOW: isOW,
        getCurrentUser: getCurrentUser,
        getCurrentScript: getCurrentScript,
        getCurrentSession: getCurrentSession,
    };
});
