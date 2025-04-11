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

    /**
     * Create vendor bill to be passed to DAO Factory Instance
     * @param vendorBill Vendor Bill Object
     * @returns Record object
     */
    function create(vendorCredit) {
        var RECORD_TYPE = record.Type.VENDOR_CREDIT;
        var daoParams = {
            recordType: RECORD_TYPE,
            fieldMap: FIELD_MAP,
        };
        var dao = daoFactory.getDAO(daoParams);
        return dao.create(vendorCredit);
    }

    var Status = {
        CANCELLED: "VendCred:C",
        REJECTED: "VendCred:E",
    };

    /**
     * Searches for existing bills with same reference number and vendor
     * used for Inbound functionality
     * @param {String} refNum Reference number from Inbound E-doc
     * @param {Integer} vendorId Internal ID of Vendor
     * @returns {Array} bills Array of results
     */
    function getBillCreditsUsingReferenceNumber(refNum, vendorId) {
        var billCredits = [];

        var billCreditSearch = search.create({
            type: search.Type.VENDOR_CREDIT,
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
        billCreditSearch.filters = filters;

        var searchResult = billCreditSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                billCredits.push(result);
            });
        });

        return billCredits;
    }

    return {
        create: create,
        getBillCreditsUsingReferenceNumber: getBillCreditsUsingReferenceNumber,
    };
});
