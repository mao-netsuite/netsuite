/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Wrapper class for N/https module
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Mar 2016     ldimayuga
 *
 * @NModuleScope TargetAccount
 */
define(["N/https"], function (https) {
    /**
     * Send a HTTP POST request and return server response.
     *
     * @governance 10 units
     * @restriction Server SuiteScript only
     *
     * @param {Object} config
     * @param {string} config.url the HTTP URL being requested
     * @param {string|Object} config.body POST data
     * @param {Object} config.headers (optional) request HTTP headers
     * @return {ClientResponse}
     *
     * @throws {error.SuiteScriptError} REQUIRED_PARAM_MISSING if a required parameter is missing
     * @throws {error.SuiteScriptError} UNKNOWN_PARAM if an unknown parameter is present in config
     * @throws {error.SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
     *
     * @since 2015.2
     */
    function post(params) {
        if (params.hasOwnProperty("async") && params.async === true) {
            delete params.async;

            var callback = function (response) {};
            var errorCallback = function onRejected(reason) {};

            if (params.hasOwnProperty("callback")) {
                callback = params.callback;
                delete params.callback;
            }

            if (params.hasOwnProperty("errorCallback")) {
                errorCallback = params.errorCallback;
                delete params.errorCallback;
            }

            return https.post
                .promise(params)
                .then(callback)
                .catch(errorCallback);
        } else {
            return https.post(params);
        }
    }

    /**
     * Send a HTTP GET request and return server response.
     *
     * @governance 10 units
     * @restriction Server SuiteScript only
     *
     * @param {Object} config
     * @param {string} config.url the HTTP URL being requested
     * @param {Object} config.headers (optional) request HTTP headers
     * @return {ClientResponse}
     *
     * @throws {error.SuiteScriptError} REQUIRED_PARAM_MISSING if a required parameter is missing
     * @throws {error.SuiteScriptError} UNKNOWN_PARAM if an unknown parameter is present in config
     * @throws {error.SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
     *
     * @since 2015.2
     */
    function get(params) {
        return https.get(params);
    }

    /**
     * Send a HTTP PUT request and return server response.
     *
     * @governance 10 units
     * @restriction Server SuiteScript only
     *
     * @param {Object} config
     * @param {string} config.url the HTTP URL being requested
     * @param {string|Object} config.body PUT data
     * @param {Object} config.headers (optional) request HTTP headers
     * @return {ClientResponse}
     *
     * @throws {error.SuiteScriptError} REQUIRED_PARAM_MISSING if a required parameter is missing
     * @throws {error.SuiteScriptError} UNKNOWN_PARAM if an unknown parameter is present in config
     * @throws {error.SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
     *
     * @since 2015.2
     */
    function put(params) {
        return https.put(params);
    }

    return {
        post: post,
        get: get,
        put: put,
        Method: https.Method,
        CacheDuration: https.CacheDuration,
    };
});
