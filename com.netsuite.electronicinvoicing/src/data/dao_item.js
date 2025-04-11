/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Aug 2016     mjaurigue
 *
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "item";

    var FIELD_MAP = {
        id: "id",
        itemid: "itemid",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(param) {
        return dao.create(param);
    }

    function retrieve(id) {
        return dao.retrieve(id);
    }

    /**
     * Returns array of item detail
     *
     * @param {Integer} vendor internal id
     * @param {String[]} Array of String (item names, expected for vendorcode field)
     * @return void
     */
    function getItemDetailsByVendorCodes(entity, itemNames) {
        var itemDetails = [];

        /* Vendorcode filter */
        var vendorCodeFilter = [];
        for (var f = 0; f < itemNames.length; f++) {
            if (vendorCodeFilter.length > 0) vendorCodeFilter.push("OR");

            var vfilter = ["vendorcode", search.Operator.IS, itemNames[f]];
            vendorCodeFilter.push(vfilter);
        }

        /* Vendor Filter */
        var vendorFilter = ["othervendor", search.Operator.IS, entity];

        /* Running the search */
        var itemSearch = search.create({
            type: RECORD_TYPE,
            columns: [
                "othervendor",
                search.createColumn({
                    name: "vendorcode",
                    sort: search.Sort.ASC,
                }),
            ],
            filters: [vendorCodeFilter, "AND", vendorFilter],
        });

        var searchResult = itemSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                var item = {
                    id: result.id,
                    vendorFieldValue: result.getValue("vendorcode"),
                };
                itemDetails.push(item);
            });
        });

        return itemDetails;
    }

    /**
     * Returns array of item detail
     *
     * @param {Integer} vendor internal id
     * @param {String[]} Array of String (item names, expected for vendorname field)
     * @return void
     */
    function getItemDetailsByVendorNames(entity, itemNames) {
        var itemDetails = [];

        /* Vendorcode filter */
        var vendorNameFilter = [];
        for (var f = 0; f < itemNames.length; f++) {
            if (vendorNameFilter.length > 0) vendorNameFilter.push("OR");

            var vfilter = ["vendorname", search.Operator.IS, itemNames[f]];
            vendorNameFilter.push(vfilter);
        }

        /* Running the search */
        var itemSearch = search.create({
            type: RECORD_TYPE,
            columns: [
                search.createColumn({
                    name: "vendorname",
                    sort: search.Sort.ASC,
                }),
            ],
            filters: vendorNameFilter,
        });

        var searchResult = itemSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                var item = {
                    id: result.id,
                    vendorFieldValue: result.getValue("vendorname"),
                };
                itemDetails.push(item);
            });
        });

        return itemDetails;
    }

    return {
        create: create,
        retrieve: retrieve,
        getItemDetailsByVendorCodes: getItemDetailsByVendorCodes,
        getItemDetailsByVendorNames: getItemDetailsByVendorNames,
    };
});
