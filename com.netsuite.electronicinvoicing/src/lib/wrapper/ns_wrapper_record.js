/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Sep 2015     aalcabasa
 * @NModuleScope TargetAccount
 */
define(["N/record"], function (record) {
    /**
     * Create a new record object based on provided type
     *
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     *
     * @param {Object} options
     * @param {string} options.type record type
     * @param {boolean} [options.isDynamic=false] record is dynamic
     * @param {Object} [options.defaultValues={}] record default values
     * @return {Record}
     *
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type is missing
     *
     * @since 2015.2
     */
    function create(params) {
        var nsRecord = record.create(params);
        return new Record(nsRecord);
    }

    /**
     * Load an existing nlobjRecord from the database based on provided type, id
     *
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     *
     * @param {Object} options
     * @param {string} options.type record type
     * @param {number|string} options.id record id
     * @param {boolean} [options.isDynamic=false] record is dynamic
     * @param {Object} [options.defaultValues={}] record default values
     * @return {Record}
     *
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type or options.id is missing
     *
     * @since 2015.2
     */
    function load(params) {
        var nsRecord = record.load(params);
        return new Record(nsRecord);
    }

    /**
     * Delete a record object based on provided type, id and return the id of deleted record
     *
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     *
     * @param {Object} options
     * @param {string} options.type record type
     * @param {number|string} options.id record id
     * @return {number} recordId
     *
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if type or id is missing
     *
     * @since 2015.2
     */
    function deleteRecord(params) {
        record.delete(params);
    }

    /**
     * commit record field updates to the system
     *
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
     *
     * @param {Object} options
     * @param {string} options.type record type
     * @param {number|string} options.id record id
     * @param {Object} options.values field and value mapping to be submitted
     * @param {Object} [options.options] additonal flags for submission
     * @param {boolean} [options.options.enablesourcing=true] enable sourcing during record update
     * @param {boolean} [options.options.ignoreMandatoryFields=false] ignore mandatory field during record submission
     *
     * @return {number} id of submitted record
     *
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if type or id is missing
     *
     * @since 2015.2
     */
    function submitFields(params) {
        return record.submitFields(params);
    }

    /**
     * Transforms a record from one type into another using data from an existing record.
     *
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     *
     * @param {Object} options
     * @param {string} options.fromType record type of existing record
     * @param {number} options.fromId record id of existing record
     * @param {Object} options.toType record type of record returned upon transformation
     * @param {boolean} [options.isDynamic=false] record is dynamic
     * @param {Object} [options.defaultValues={}] record default values
     *
     * @return {Record}
     *
     * @throws {error.SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if type or id is missing
     *
     * @since 2015.2
     */
    function transform(params) {
        return record.transform(params);
    }

    function wrapRecord(rec) {
        return new Record(rec);
    }

    /**
     * @param nsRecord
     *
     * */
    function Record(nsRecord) {
        this.id = nsRecord.id;
        this.type = nsRecord.type;

        /**
         * Returns the SS2.0 implementation of the Record object
         *
         * @return {Record}
         * */
        this.getRecord = function getRecord() {
            return nsRecord;
        };

        this.getField = function getField(options){
            return nsRecord.getField(options);
        }

        this.getValue = function getValue(field) {
            return nsRecord.getValue(field);
        };

        this.setValue = function setValue(field, value) {
            nsRecord.setValue(field, value);
            return value;
        };

        this.getText = function getValue(field) {
            return nsRecord.getText(field);
        };

        this.setText = function setValue(field, value) {
            nsRecord.setText(field, value);
            return value;
        };

        this.getLineCount = function getLineCount(options) {
            return nsRecord.getLineCount(options);
        };

        this.getSublistValue = function getSublistValue(options) {
            return nsRecord.getSublistValue(options);
        };

        this.setSublistValue = function setSublistValue(options) {
            return nsRecord.setSublistValue(options);
        };

        this.commitLine = function commitLine(options) {
            return nsRecord.commitLine(options);
        };

        this.insertLine = function insertLine(options) {
            return nsRecord.insertLine(options);
        };

        this.selectNewLine = function selectNewLine(options) {
            return nsRecord.selectNewLine(options);
        };

        this.setCurrentSublistValue = function setCurrentSublistValue(options) {
            return nsRecord.setCurrentSublistValue(options);
        };

        /**
         * Submit the record's changes to the DB
         * @param {Object} options
         * @return {number} id
         * */
        this.save = function save(options) {
            return nsRecord.save(options);
        };
    }

    return {
        create: create,
        load: load,
        deleteRecord: deleteRecord,
        submitFields: submitFields,
        transform: transform,
        Type: record.Type,
        wrapRecord: wrapRecord,
    };
});
