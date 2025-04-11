/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       01 Dec 2015     ssantiago
 * @NModuleScope TargetAccount
 */
define(["N/config"], function (config) {
    /**
     * Load a configuration object with a specific type
     * @governance 10 units
     * @restriction Server SuiteScript only
     *
     * @param {Object} options
     * @param { config.Type } options.type one of the Type values
     * @param { boolean } options.isDynamic load record in dynamic or deferred dynamic mode
     * @return { record.Record }
     *
     * @throws {error.SuiteScriptError} INVALID_RCRD_TYPE
     *
     * @since 2015.2
     */
    function load(options) {
        return config.load(options);
    }

    return {
        load: load,
        Type: config.Type,
    };
});
