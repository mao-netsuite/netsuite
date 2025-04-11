/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       21 Sep 2015     aalcabasa
 * @NModuleScope TargetAccount
 */
define(["N/record"], function (record) {
    /**
     * Returns a basic DAO with fields and the record type setup
     *
     * @param {Object} params
     * @param {String} params.recordType
     * @param {Object} params.fieldMap - a mapping of object attribute names and their corresponding NS Record field names
     *
     * */
    function getDAO(params) {
        return new DAO(params);
    }

    function DAO(params) {
        var recordType = params.recordType;
        var fieldMap = params.fieldMap;
        var subListMaps = params.subListMaps;

        this.create = function create(object, createOptions, saveOptions) {
            var isDynamic = false;
            var enableSourcing = false;
            var ignoreMandatoryFields = false;

            if (createOptions) {
                if (createOptions.hasOwnProperty("isDynamic")) {
                    isDynamic = createOptions.isDynamic;
                }
            }

            var rec = record.create({
                type: recordType,
                isDynamic: isDynamic,
            });

            for (var objFieldId in fieldMap) {
                var nsFieldId = fieldMap[objFieldId];
                rec.setValue(nsFieldId, object[objFieldId]);
            }

            if (saveOptions) {
                if (saveOptions.hasOwnProperty("enableSourcing")) {
                    enableSourcing = saveOptions.enableSourcing;
                }
                if (saveOptions.hasOwnProperty("ignoreMandatoryFields")) {
                    ignoreMandatoryFields = saveOptions.ignoreMandatoryFields;
                }
            }

            return rec.save({
                enableSourcing: enableSourcing,
                ignoreMandatoryFields: ignoreMandatoryFields,
            });
        };

        this.retrieve = function retrieve(id) {
            var object = {
                subLists: {},
            };
            var rec = record.load({
                type: recordType,
                id: id,
            });
            for (var i in fieldMap) {
                object[i] = rec.getValue(fieldMap[i]);
            }

            var subListMap;
            var params;
            var subLists = object.subLists;
            for (var j in subListMaps) {
                subListMap = subListMaps[j];
                params = {
                    record: rec,
                    subList: j,
                    subListMap: subListMap,
                };
                subLists[j] = extractSubListValues(params);
            }

            return object;
        };

        this.retreiveNSRecord = function retrieveNsRecord(id) {
            return record.load({
                type: recordType,
                id: id,
            });
        };
        function extractSubListValues(params) {
            var rec = params.record;
            var subListName = params.subList;
            var subListMap = params.subListMap;

            var count = rec.getLineCount({
                sublistId: subListName,
            });
            var lines = [];
            for (var i = 0; i < count; i++) {
                var line = {};
                for (var j in subListMap) {
                    line[j] = rec.getSublistValue({
                        sublistId: subListName,
                        fieldId: subListMap[j],
                        line: i,
                    });
                }
                lines.push(line);
            }
            return lines;
        }
    }

    return {
        getDAO: getDAO,
    };
});
