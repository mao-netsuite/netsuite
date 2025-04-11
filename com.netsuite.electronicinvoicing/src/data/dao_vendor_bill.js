/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This contains the search functions used for Vendor Bill records
 *
 * Version    Date            Author           Remarks
 * 1.00       25 Aug 2016     ssantiago
 *
 */
define(["../lib/dao_factory", "N/record", "N/search"], function (
    daoFactory,
    record,
    search
) {
    var FIELD_MAP = {
        entity: "entity",
        tranid: "tranid",
        status: "status",
        mainline: "mainline",
    };

    var Status = {
        CANCELLED: "VendBill:C",
        REJECTED: "VendBill:E",
    };

    /**
     * Create vendor bill to be passed to DAO Factory Instance
     * @param vendorBill Vendor Bill Object
     * @returns Record object
     */
    function create(vendorBill) {
        var RECORD_TYPE = record.Type.VENDOR_BILL;
        var daoParams = {
            recordType: RECORD_TYPE,
            fieldMap: FIELD_MAP,
        };
        var dao = daoFactory.getDAO(daoParams);
        return dao.create(vendorBill);
    }

    /**
     * Searches for existing bills with same reference number and vendor
     * used for Inbound functionality
     * @param {String} refNum Reference number from Inbound E-doc
     * @param {Integer} vendorId Internal ID of Vendor
     * @returns {Array} bills Array of results
     */
    function getBillsUsingReferenceNumber(refNum, vendorId) {
        var bills = [];

        var billSearch = search.create({
            type: search.Type.VENDOR_BILL,
            columns: [FIELD_MAP.entity, FIELD_MAP.tranid, FIELD_MAP.status],
        });

        var filters = [];
        filters.push(
            search.createFilter({
                name: FIELD_MAP.status,
                operator: search.Operator.NONEOF,
                values: [Status.CANCELLED, Status.REJECTED],
            })
        );

        filters.push(
            search.createFilter({
                name: FIELD_MAP.entity,
                operator: search.Operator.IS,
                values: vendorId,
            })
        );

        filters.push(
            search.createFilter({
                name: FIELD_MAP.tranid,
                operator: search.Operator.IS,
                values: refNum,
            })
        );

        filters.push(
            search.createFilter({
                name: FIELD_MAP.mainline,
                operator: search.Operator.IS,
                values: true,
            })
        );

        billSearch.filters = filters;

        var searchResult = billSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                bills.push(result);
            });
        });

        return bills;
    }

    return {
        create: create,
        getBillsUsingReferenceNumber: getBillsUsingReferenceNumber,
    };
});
