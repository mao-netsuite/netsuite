/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     ssantiago
 *
 * @NModuleScope TargetAccount
 *
 */
define(["../lib/dao_factory", "N/runtime", "N/search", "N/record"], function (
    daoFactory,
    runtime,
    search,
    record
) {
    var RECORD_TYPE = "customrecord_psg_ei_sending_batch";
    var FIELD_MAP = {
        status: "custrecord_psg_ei_sending_batch_status",
        subsidiary: "custrecord_psg_ei_sending_batch_sub",
        entity_type: "custrecord_psg_ei_sending_batch_ent_type",
        customer: "custrecord_psg_ei_sending_batch_cust",
        vendor: "custrecord_psg_ei_sending_batch_vendor",
        transaction_date_start: "custrecord_psg_ei_sending_batch_start_da",
        transaction_date_end: "custrecord_psg_ei_sending_batch_end_date",
        transaction_type: "custrecord_psg_ei_sending_batch_trantype",
        owner: "owner",
        sendingType: "custrecord_psg_ei_sending_batch_snd_type",
    };
    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    var Status = {
        QUEUED: 1,
        PROCESSED: 2,
    };

    /**
     * Create batch to be passed to DAO Factory Instance
     * @param eInvoiceBatch E-Invoice Batch Object
     * @returns Record object
     */
    function create(einvoiceBatch) {
        return dao.create(einvoiceBatch);
    }

    /**
     * Searches for existing batch using the given parameters.
     * Search if it has the same subsidiary (if OW), customer (if provided)
     * and Transaction dates that overlap with the search parameter
     * @param parameters The search parameters
     * @returns results Array of results
     */
    function getExistingBatch(parameters) {
        var entityType = parameters.entity_type;
        var subsidiary = parameters.subsidiary;
        var customer = parameters.customer;
        var vendor = parameters.vendor;
        var tranDateStart = parameters.transaction_date_start;
        var tranDateEnd = parameters.transaction_date_end;
        var sendingType = parameters.sendingType;

        var batchSearch = search.create({
            type: RECORD_TYPE,
            columns: [
                FIELD_MAP.customer,
                FIELD_MAP.vendor,
                FIELD_MAP.transaction_date_start,
                FIELD_MAP.transaction_date_end,
                search.createColumn({
                    name: "name",
                    join: FIELD_MAP.subsidiary,
                }),
            ],
        });

        var filters = [];

        /* Status Filter */
        filters.push(
            search.createFilter({
                name: FIELD_MAP.status,
                operator: search.Operator.IS,
                values: Status.QUEUED,
            })
        );

        /* Start Transaction Date Filter */
        filters.push(
            search.createFilter({
                name: FIELD_MAP.transaction_date_start,
                operator: search.Operator.ONORBEFORE,
                values: tranDateEnd,
            })
        );

        /* End Transaction Date Filter */
        filters.push(
            search.createFilter({
                name: FIELD_MAP.transaction_date_end,
                operator: search.Operator.ONORAFTER,
                values: tranDateStart,
            })
        );

        /* Entity Type */
        if (entityType) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.entity_type,
                    operator: search.Operator.IS,
                    values: entityType,
                })
            );
        }

        /* Customer Filter */
        if (customer) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.customer,
                    operator: search.Operator.ANYOF,
                    values: [customer, "@NONE@"],
                })
            );
        }

        /* Vendor Filter */
        if (vendor) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.vendor,
                    operator: search.Operator.ANYOF,
                    values: [vendor, "@NONE@"],
                })
            );
        }

        /* Subsidiary Filter */
        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
        if (isOW && subsidiary) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.subsidiary,
                    operator: search.Operator.IS,
                    values: subsidiary,
                })
            );
        }

        /* Sending type Filter */
        if (sendingType) {
            filters.push(
                search.createFilter({
                    name: FIELD_MAP.sendingType,
                    operator: search.Operator.IS,
                    values: sendingType,
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
     * @param recId {Number/String} - internal Id of record
     * @param fieldValueMap {JSON} - mapping of field and value
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
                FIELD_MAP.customer,
                FIELD_MAP.vendor,
                FIELD_MAP.entity_type,
                FIELD_MAP.subsidiary,
                FIELD_MAP.transaction_date_start,
                FIELD_MAP.transaction_date_end,
                FIELD_MAP.owner,
                FIELD_MAP.transaction_type,
                FIELD_MAP.sendingType,
            ],
            filters: [
                search.createFilter({
                    name: FIELD_MAP.status,
                    operator: search.Operator.ANYOF,
                    values: Status.QUEUED,
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
        Status: Status,
        create: create,
        getExistingBatch: getExistingBatch,
        update: update,
        getBatch: getBatch,
    };
});
