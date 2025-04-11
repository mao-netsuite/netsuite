/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This is a wrapper for the N/currentRecord module
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Aug 2017     ssantiago
 *
 * @NModuleScope TargetAccount
 */
define(["N/currentRecord"], function (currentRecord) {
    /**
     * return a record instance for the current page
     * @returns {Record}
     * @throws CANNOT_CREATE_RECORD_INSTANCE when current record page is not scriptable or an error occured while creating the record instance
     */
    function get() {
        var nsRecord = currentRecord.get();
        return new Record(nsRecord);
    }

    /**
     * Wrapper for the CurrentRecord object of NetSuite
     *
     * @param {Object} nsCurrentRecord
     */
    function Record(nsCurrentRecord) {
        this.id = nsCurrentRecord.id;
        this.isDynamic = nsCurrentRecord.isDynamic;
        this.type = nsCurrentRecord.type;

        /**
         * Sets the value of a field.
         *
         * @param {Object} options
         * @param {string} options.fieldId
         * @param {number|date|string|array} value
         * @param {boolean} [options.ignoreFieldChange=false] Ignore the field change script
         * @param {boolean} [options.fireSlavingSync=false] Execute slaving synchronously
         * @return {Record}
         * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if fieldId is missing or undefined
         *
         */
        this.setValue = function setValue(options) {
            nsCurrentRecord.setValue({
                fieldId: options.fieldId,
                value: options.value,
                ignoreFieldChange: options.ignoreFieldChange
                    ? options.ignoreFieldChange
                    : false,
                fireSlavingSync: options.fireSlavingSync
                    ? options.fireSlavingSync
                    : false,
            });

            return this;
        };
    }

    return {
        get: get,
    };
});
