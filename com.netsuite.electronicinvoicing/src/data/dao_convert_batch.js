/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * DAO for inbound conversion batch.
 *
 * Version    Date            Author           Remarks
 * 1.00       10 Nov 2016     esia
 *
 * @NModuleScope TargetAccount
 *
 */
define(["../lib/dao_factory", "N/search", "N/record"], function (
    daoFactory,
    search,
    record
) {
    var RECORD_TYPE = "customrecord_psg_ei_conversion_batch";
    var FIELD_MAP = {
        date_created_start: "custrecord_psg_ei_convert_batch_start_da",
        date_created_end: "custrecord_psg_ei_convert_batch_end_date",
        vendor: "custrecord_psg_ei_convert_batch_vendor",
        customer: "custrecord_psg_ei_convert_batch_customer",
        trans_type: "custrecord_psg_ei_convert_inb_trans_typ",
        status: "custrecord_psg_ei_convert_batch_status",
        owner: "owner",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    var status = {
        QUEUED: 1,
        PROCESSED: 2,
    };

    /**
     * Create batch to be passed to DAO Factory Instance
     *
     * @param eInvoiceBatch E-Invoice Batch Object
     *
     * @returns Record object
     */
    function create(convertBatch) {
        return dao.create(convertBatch);
    }

    /**
     * Searches for existing batch using the given parameters.
     * Search if it has the same subsidiary (if OW), vendor (if provided)
     * and Transaction dates that overlap with the search parameter.
     *
     * @param parameters The search parameters
     *
     * @returns results Array of results
     */
    function getExistingBatch(parameters) {
        var vendor = parameters.vendor;
        var customer = parameters.customer;
        var dateCreatedStart = parameters.date_created_start;
        var dateCreatedEnd = parameters.date_created_end;
        var transTypes = parameters.trans_type;
        var batchSearch = search.create({
            type: RECORD_TYPE,
            columns: [
                FIELD_MAP.vendor,
                FIELD_MAP.customer,
                FIELD_MAP.date_created_start,
                FIELD_MAP.date_created_end,
                FIELD_MAP.trans_type,
            ],
        });

        var filters = [];

        // Status Filter
        filters.push(
            search.createFilter({
                name: FIELD_MAP.status,
                operator: search.Operator.IS,
                values: status.QUEUED,
            })
        );

        // Date Created From Filter
        filters.push(
            search.createFilter({
                name: FIELD_MAP.date_created_start,
                operator: search.Operator.ONORBEFORE,
                values: dateCreatedEnd,
            })
        );

        // Date Created To Filter
        filters.push(
            search.createFilter({
                name: FIELD_MAP.date_created_end,
                operator: search.Operator.ONORAFTER,
                values: dateCreatedStart,
            })
        );

        // Vendor Filter
        if (vendor) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.vendor,
                    operator: search.Operator.ANYOF,
                    values: [vendor, "@NONE@"],
                })
            );
        }

        // Customer Filter
        if (customer) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.customer,
                    operator: search.Operator.ANYOF,
                    values: [customer, "@NONE@"],
                })
            );
        }

        if (transTypes) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.trans_type,
                    operator: search.Operator.ANYOF,
                    values: [transTypes],
                })
            );
        }

        batchSearch.filters = filters;

        var results = [];
        var searchResult = batchSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                results.push(result);
            });
        });

        return results;
    }

    /**
     * This function updates the record.
     *
     * @param recId {Number/String} - internal Id of record
     * @param fieldValueMap {JSON} - mapping of field and value
     *
     * @returns id {Number} - internal Id of record updated
     */
    function update(recId, fieldValueMap) {
        return record.submitFields({
            type: RECORD_TYPE,
            id: recId,
            values: fieldValueMap,
        });
    }

    /**
     * getBatch - This function searches for a "Queued" batch. This will only return one batch and it is
     * sorted by the Date Created.
     *
     * @returns result {Array} - only contains one result
     */
    function getBatch() {
        var results = [];
        var batchSearch = search.create({
            type: RECORD_TYPE,
            columns: [
                search.createColumn({
                    name: "created",
                    sort: search.Sort.ASC,
                }),
                FIELD_MAP.vendor,
                FIELD_MAP.customer,
                FIELD_MAP.trans_type,
                FIELD_MAP.date_created_start,
                FIELD_MAP.date_created_end,
                FIELD_MAP.owner,
            ],
            filters: [
                search.createFilter({
                    name: FIELD_MAP.status,
                    operator: search.Operator.ANYOF,
                    values: status.QUEUED,
                }),
            ],
        });

        var searchResult = batchSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                results.push(result);
            });
        });

        return results;
    }

    return {
        status: status,
        create: create,
        getExistingBatch: getExistingBatch,
        update: update,
        getBatch: getBatch,
    };
});
