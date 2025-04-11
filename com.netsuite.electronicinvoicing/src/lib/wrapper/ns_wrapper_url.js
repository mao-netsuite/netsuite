/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Mar 2016         ldimayuga
 *
 * @NModuleScope TargetAccount
 */

define(["N/url"], function (url) {
    /**
     * resolveRecord
     * @param {Object} opts
     * @param {string} opts.recordType
     * @param {string} opts.recordId
     * @param {boolean} opts.isEditMode
     * @param {Object} opts.params Per url.format({query
     *
     * @return {String} url
     *
     * @since 2015.1
     */
    function resolveRecord(params) {
        return url.resolveRecord(params);
    }

    /**
     * resolveScript
     * @param {Object} opts
     * @param {string} opts.scriptId
     * @param {string} opts.deploymentId
     * @param {boolean} opts.returnExternalUrl
     * @param {Object} opts.params Per url.format({query
     *
     * @return {String} url
     *
     * @since 2015.1
     */
    function resolveScript(params) {
        return url.resolveScript(params);
    }

    /**
     * resolveTaskLink
     * @param {Object} options
     * @param {string} options.id
     * @param {Map} options.parameters (optional) url parameters
     *
     * @return {String} url
     *
     * @since 2015.1
     */
    function resolveTaskLink(id, params) {
        return url.resolveTaskLink(id, params);
    }

    return {
        resolveRecord: resolveRecord,
        resolveScript: resolveScript,
        resolveTaskLink: resolveTaskLink,
    };
});
