/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Search for inbound e-documents to be included in conversion.

 *

 * Version    Date            Author           Remarks

 * 1.00       10 Nov 2016     esia

 *

 */

define([
    "N/search",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
], function (search, freeCountryCheckHelper) {
    var INBOUND_EDOC_RECORD = "customrecord_psg_ei_inbound_edoc";

    var INTERNALID_FLD = "internalid";

    var VENDOR_FLD = "custrecord_psg_ei_inbound_vendor";

    var CUSTOMER_FLD = "custrecord_psg_ei_inbound_customer";

    var REF_NUM_FLD = "custrecord_psg_ei_inbound_refnum";

    var PO_NUM_FLD = "custrecord_psg_ei_inbound_po";

    var DATE_CREATED_FLD = "created";

    var EDOC_STATUS_FLD = "custrecord_psg_ei_inbound_status";

    var EDOC_VENDOR_TEMPLATE_FLD = "custrecord_psg_ei_inbound_template";

    var EDOC_CUSTOMER_TEMPLATE_FLD = "custrecord_psg_ei_inbound_temp_customer";

    var HAS_LICENSE = "custpage_inbound_has_license";

    var TRANS_TYPE_FLD = "custrecord_psg_ei_inbound_transtype";
    var TRANS_TYPE_INBOUND_FLD = "custpage_inbound_trans_type";

    var CONVERSION_FAILED_STATUS = 14;

    var DATECREATED_START_PARAM = "custpage_inbound_date_created_start";

    var DATECREATED_END_PARAM = "custpage_inbound_date_created_end";

    var VENDOR_FLD_PARAM = "custpage_inbound_vendor";

    var CUSTOMER_FLD_PARAM = "custpage_inbound_cust"

    function getEDocSearch(parameters) {
        var columns = [
            search.createColumn({
                name: INTERNALID_FLD,

                sort: search.Sort.ASC,
            }),

            CUSTOMER_FLD,

            VENDOR_FLD,

            REF_NUM_FLD,

            PO_NUM_FLD,

            DATE_CREATED_FLD,

            EDOC_VENDOR_TEMPLATE_FLD,

            EDOC_CUSTOMER_TEMPLATE_FLD,

            TRANS_TYPE_FLD,
        ];

        var filters = [];

        var valueArray = [];

        var hasLicense = parameters[HAS_LICENSE];

        var allowedCountryInternalId =
            freeCountryCheckHelper.getInternalIdOfAllowedFreeCountry();
        if (hasLicense === "F" && freeCountryCheckHelper.isOwAccount()) {
            var subsidiariesNameList =
                freeCountryCheckHelper.getSubsidiariesNamesAssociatedWithFreeCountry(
                    allowedCountryInternalId
                );

            var countryFilter = {};

            countryFilter.name = "formulatext";

            countryFilter.formula =
                "{" +
                VENDOR_FLD +
                ".subsidiary} || {" +
                CUSTOMER_FLD +
                ".subsidiary}";

            countryFilter.operator = search.Operator.CONTAINS;

            countryFilter.values = subsidiariesNameList;

            filters.push(search.createFilter(countryFilter));
        }

        // Status must be 'Conversion Failed'.

        var edocStatusFilter = {};

        edocStatusFilter.name = EDOC_STATUS_FLD;

        edocStatusFilter.operator = search.Operator.ANYOF;

        edocStatusFilter.values = [CONVERSION_FAILED_STATUS];

        filters.push(search.createFilter(edocStatusFilter));

        // Entity filter
        var entityFilter = {};
        if (parameters[VENDOR_FLD_PARAM]) {

            entityFilter.name = VENDOR_FLD;

            entityFilter.operator = search.Operator.ANYOF;

            entityFilter.values = parameters[VENDOR_FLD_PARAM];

            filters.push(search.createFilter(entityFilter));
        }

        if (parameters[CUSTOMER_FLD_PARAM]) {

            entityFilter.name = CUSTOMER_FLD;

            entityFilter.operator = search.Operator.ANYOF;

            entityFilter.values = parameters[CUSTOMER_FLD_PARAM];

            filters.push(search.createFilter(entityFilter));
        }

        if (parameters[TRANS_TYPE_INBOUND_FLD]) {
            var value = encodeURIComponent(parameters[TRANS_TYPE_INBOUND_FLD]);

            valueArray = value.split("%2C");
        }
        if (valueArray.length > 0) {
            var transFilter = {};

            transFilter.name = TRANS_TYPE_FLD;

            transFilter.operator = search.Operator.ANYOF;

            transFilter.values = valueArray;

            filters.push(search.createFilter(transFilter));
        }

        // Date Created From filter

        if (parameters[DATECREATED_START_PARAM]) {
            var dateCreatedStartFilter = {};

            dateCreatedStartFilter.name = DATE_CREATED_FLD;

            dateCreatedStartFilter.operator = search.Operator.ONORAFTER;

            dateCreatedStartFilter.values = parameters[DATECREATED_START_PARAM];

            filters.push(search.createFilter(dateCreatedStartFilter));
        }

        // Date Created To filter

        if (parameters[DATECREATED_END_PARAM]) {
            var dateCreatedEndFilter = {};

            dateCreatedEndFilter.name = DATE_CREATED_FLD;

            dateCreatedEndFilter.operator = search.Operator.ONORBEFORE;

            dateCreatedEndFilter.values = parameters[DATECREATED_END_PARAM];

            filters.push(search.createFilter(dateCreatedEndFilter));
        }
        var searchView = {};

        searchView.type = INBOUND_EDOC_RECORD;

        searchView.columns = columns;

        searchView.filters = filters;

        return search.create(searchView);
    }

    return {
        getEDocSearch: getEDocSearch,
    };
});
