/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 *

 * Module Description

 *

 * Version    Date            Author           Remarks

 * 1.00       19 Oct 2015     mjaurigue

 *

 */

define([
    "N/search",

    "N/runtime",

    "../../lib/app/app_transaction_type_map",
], function (searchWrapper, runtime, transactionTypeMap) {
    var SUBSIDIARY = "custpage_outbound_subs";

    var CUSTOMER = "custpage_outbound_cust";

    var VENDOR = "custpage_outbound_vendor";

    var TRANDATE_START = "custpage_outbound_tran_date_start";

    var TRANDATE_END = "custpage_outbound_tran_date_end";

    var TRANS_TYPE = "custpage_outbound_tran_type";

    var HAS_LICENSE = "custpage_outbound_has_license";

    var FREE_COUNTRY = "custpage_outbound_free_country";

    var SENDING_TYPE_FIELD = "custpage_outbound_sending_type";

    var EI_STATUS;

    var CERTIFY_SEND_TYPE = "certifySend";

    var SENDING_FAILED = 8;

    var CERTIFICATION_FAILED = 22;

    function getEInvoiceSearch(parameters) {
        var searchView = {};

        searchView.type = searchWrapper.Type.TRANSACTION;

        searchView.columns = getColumns();

        searchView.filters = getFilters(parameters);

        return searchWrapper.create(searchView);
    }

    function getFilters(parameters) {
        if (parameters[SENDING_TYPE_FIELD]) {
            if (parameters[SENDING_TYPE_FIELD] === CERTIFY_SEND_TYPE) {
                EI_STATUS = CERTIFICATION_FAILED;
            } else {
                EI_STATUS = SENDING_FAILED;
            }
        }

        var allowedCountry;

        var valueArray = [];

        var hasLicense = parameters[HAS_LICENSE];

        if (hasLicense === "F") {
            allowedCountry = parameters[FREE_COUNTRY];
        }

        if (parameters[TRANS_TYPE]) {
            /* There's at least once selected transaction type */

            var value = encodeURIComponent(parameters[TRANS_TYPE]);

            valueArray = value.split("%2C");
        }

        var standardTxnFilter = transactionTypeMap.getTransactionFilters(
            allowedCountry,
            [EI_STATUS],
            valueArray
        );

        standardTxnFilter.push("AND");

        standardTxnFilter.push([
            "customer.isinactive",
            searchWrapper.Operator.IS,
            "F",
        ]);

        standardTxnFilter.push("AND");

        standardTxnFilter.push([
            "vendor.isinactive",
            searchWrapper.Operator.IS,
            "F",
        ]);

        var subsidiaryVal;

        /* Subsidiary filter */

        if (parameters[SUBSIDIARY]) {
            subsidiaryVal = parameters[SUBSIDIARY];

            standardTxnFilter.push("AND");

            standardTxnFilter.push(["subsidiary", "is", subsidiaryVal]);
        }

        /* Entity filter */

        var entityValues = [];

        if (parameters[CUSTOMER]) {
            entityValues.push(parameters[CUSTOMER]);
        }

        if (parameters[VENDOR]) {
            entityValues.push(parameters[VENDOR]);
        }

        if (entityValues.length > 0) {
            standardTxnFilter.push("AND");

            standardTxnFilter.push([
                "entity",
                searchWrapper.Operator.ANYOF,
                entityValues,
            ]);
        }

        /* Transaction start date filter */

        var startDate;

        if (parameters[TRANDATE_START]) {
            startDate = parameters[TRANDATE_START];

            standardTxnFilter.push("AND");

            standardTxnFilter.push([
                "trandate",
                searchWrapper.Operator.ONORAFTER,
                startDate,
            ]);
        }

        /* Transaction end date filter */

        var endDate;

        if (parameters[TRANDATE_END]) {
            endDate = parameters[TRANDATE_END];

            standardTxnFilter.push("AND");

            standardTxnFilter.push([
                "trandate",
                searchWrapper.Operator.ONORBEFORE,
                endDate,
            ]);
        }

        log.debug(
            "Standard Transaction Filters",
            JSON.stringify(standardTxnFilter)
        );

        var filterToApplyInSearch = finalFilterToApplyInSearch(
            valueArray,
            standardTxnFilter,
            subsidiaryVal,
            entityValues,
            startDate,
            endDate,
            [EI_STATUS]
        );

        log.debug("Final Search filter", JSON.stringify(filterToApplyInSearch));

        return filterToApplyInSearch;
    }

    /*
            Depending on the filter selection on send failed suitelet page the filter is being constructed
         */

    function finalFilterToApplyInSearch(
        tranType,
        standardTxnFilter,
        subsidiaryVal,
        entityValues,
        startDate,
        endDate,
        eiStatusArr
    ) {
        var customTranFilters = [];

        var finalFilterToApply = [];

        var standardTransArr = [];

        var customTransArr = [];

        var isCustomTransactionEnabled = runtime.isFeatureInEffect({
            feature: "CUSTOMTRANSACTIONS",
        });

        if (tranType.length === 0) {
            if (
                isCustomTransactionEnabled &&
                transactionTypeMap.getAllOutboundCttCodes().length > 0
            ) {
                customTranFilters = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );

                finalFilterToApply = constructAllTxnTypeFilters(
                    standardTxnFilter,
                    customTranFilters
                );
            } else {
                finalFilterToApply = standardTxnFilter;
            }
        } else {
            for (var i in tranType) {
                if (transactionTypeMap.isCustomTransactionType(tranType[i])) {
                    customTransArr.push(tranType[i]);
                } else {
                    standardTransArr.push(tranType[i]);
                }
            }

            if (customTransArr.length !== 0 && standardTransArr.length !== 0) {
                customTranFilters = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );

                finalFilterToApply = constructAllTxnTypeFilters(
                    standardTxnFilter,
                    customTranFilters
                );
            } else if (standardTransArr.length !== 0) {
                finalFilterToApply = standardTxnFilter;
            } else if (customTransArr.length !== 0) {
                finalFilterToApply = getCustomTransactionFilters(
                    tranType,
                    subsidiaryVal,
                    entityValues,
                    startDate,
                    endDate,
                    eiStatusArr
                );
            }
        }

        return finalFilterToApply;
    }

    function getCustomTransactionFilters(
        tranTypeArr,
        subsidiary,
        entityValues,
        tranStartDate,
        tranEndDate,
        eiStatusArr
    ) {
        log.debug("eiStatusArr", eiStatusArr);

        var customTransactionFilters =
            transactionTypeMap.getCustomTransactionFilters(
                eiStatusArr,
                tranTypeArr
            );

        customTransactionFilters.push("AND");

        customTransactionFilters.push([
            "customer.isinactive",
            searchWrapper.Operator.IS,
            "F",
        ]);

        customTransactionFilters.push("AND");

        customTransactionFilters.push([
            "vendor.isinactive",
            searchWrapper.Operator.IS,
            "F",
        ]);

        if (subsidiary) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push(["subsidiary", "is", subsidiary]);
        }

        if (entityValues.length > 0) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push([
                "entity",
                searchWrapper.Operator.ANYOF,
                entityValues,
            ]);
        }

        if (tranStartDate) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push([
                "trandate",
                searchWrapper.Operator.ONORAFTER,
                tranStartDate,
            ]);
        }

        if (tranEndDate) {
            customTransactionFilters.push("AND");

            customTransactionFilters.push([
                "trandate",
                searchWrapper.Operator.ONORBEFORE,
                tranEndDate,
            ]);
        }

        log.debug("Custom transaction filters: ", customTransactionFilters);

        return customTransactionFilters;
    }

    function getColumns() {
        var columns = [
            searchWrapper.createColumn({
                name: "tranid",

                sort: searchWrapper.Sort.ASC,
            }),

            searchWrapper.createColumn({
                name: "entity",

                sort: searchWrapper.Sort.ASC,
            }),

            "type",

            "trandate",

            "memo",

            "custbody_psg_ei_template",

            "internalid",

            "custbody_psg_ei_sending_method",
        ];

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW) {
            columns.push("subsidiary");
        }

        return columns;
    }

    // Filter combining both standard and custom transactions are combined.

    function constructAllTxnTypeFilters(standardTxnFilter, customTxnFilter) {
        var filtersCombined = [];

        filtersCombined.push(standardTxnFilter);

        filtersCombined.push("OR");

        filtersCombined.push(customTxnFilter);

        return filtersCombined;
    }

    return {
        getEInvoiceSearch: getEInvoiceSearch,
    };
});
