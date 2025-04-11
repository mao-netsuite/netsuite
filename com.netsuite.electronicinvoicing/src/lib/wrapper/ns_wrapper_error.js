/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       24 Sep 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 */
define(["N/error"], function (error) {
    /**
     * Instantiate an error object (specifying the name, message, and notify off) *
     * @param {Object} config
     * @param {string} config.name the error name
     * @param {string} [config.message=null] the error message
     * @param {boolean} [config.notifyOff=false] indicate if the email notification(configured on the script record page) will be suppressed or not.
     * @return {SuiteScriptError|UserEventError}
     *
     * @throws {error.SuiteScriptError} if the any mandatory argument (name or message) is missing
     *
     * @since 2015.1
     */
    function create(params) {
        return error.create(params);
    }

    return {
        create: create,
    };
});
