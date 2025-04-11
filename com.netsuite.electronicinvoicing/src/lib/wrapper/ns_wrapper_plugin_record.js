/**
 * Record Wrapper used to wrap N/record objects send as params in outbound and inbound CDS plugins.
 * The wrapper contains getRecord function required to maintain backward compatibility with existing plugins.
 * Use of wrapper modules for N/record is now deprecated.
 * @NModuleScope TargetAccount
 */
define(["N/record"], function () {
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

        this.getField = function getField(options) {
            return nsRecord.getField(options);
        };

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
        wrapRecord: wrapRecord,
    };
});
