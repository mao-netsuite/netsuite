/**
 * @NModuleScope TargetAccount
 */

define([
    "N/record",
    "N/search",
    "N/query",
    "../../../src/app/einvoice/app_einvoice_ctt_manager",
    "../../app/einvoice/app_einvoice_country_mapping",
    "N/runtime",
    "N/log",
], function (record, search, query, cttManager, countryMapping, runtime, log) {
    var CASHREFUND_ID = 29;
    var CASHSALE_ID = 5;
    var CREDITMEMO_ID = 10;
    var ESTIMATE_ID = 6;
    var INVOICE_ID = 7;
    var RETURNAUTH_ID = 33;
    var VENDBILL_ID = 17;
    var PURCHORD_ID = 15;
    var CUSTOMERPAYMENT_ID = 9;
    var ITEMFULLFILLMENT_ID = 32;
    var TRANSFER_ORDER_ID = 48;
    var VENDOR_CREDIT_ID = 20;
    var SALES_ORDER_ID = 31;
    var CUSTOMER_DEPOSIT_ID = 40;

    var OUTBOUND_EDOC_TYPE = "outbound";
    var INBOUND_EDOC_TYPE = "inbound";
    var PURCHASE_TRANS_TYPE = "purchase";
    var SALES_TRANS_TYPE = "sales";
    var TRANS_TEMP_TYPE = "restemp";

    var SUBSIDIARIES = "SUBSIDIARIES";

    var transactionMap = {};
    var cttMap;

    function init() {
        if (!Object.keys(transactionMap).length) {
            transactionMap[VENDBILL_ID] = {
                transCode: "VendBill",
                edocType: [INBOUND_EDOC_TYPE, OUTBOUND_EDOC_TYPE],
                type: record.Type.VENDOR_BILL,
                transGroupType: PURCHASE_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[CASHREFUND_ID] = {
                transCode: "CashRfnd",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.CASH_REFUND,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[CASHSALE_ID] = {
                transCode: "CashSale",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.CASH_SALE,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[CREDITMEMO_ID] = {
                transCode: "CustCred",
                edocType: [OUTBOUND_EDOC_TYPE, TRANS_TEMP_TYPE],
                type: record.Type.CREDIT_MEMO,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[ESTIMATE_ID] = {
                transCode: "Estimate",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.ESTIMATE,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[INVOICE_ID] = {
                transCode: "CustInvc",
                edocType: [OUTBOUND_EDOC_TYPE, TRANS_TEMP_TYPE],
                type: record.Type.INVOICE,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[PURCHORD_ID] = {
                transCode: "PurchOrd",
                edocType: [OUTBOUND_EDOC_TYPE, TRANS_TEMP_TYPE],
                type: record.Type.PURCHASE_ORDER,
                transGroupType: PURCHASE_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[RETURNAUTH_ID] = {
                transCode: "RtnAuth",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.RETURN_AUTHORIZATION,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[CUSTOMERPAYMENT_ID] = {
                transCode: "CustPymt",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.CUSTOMER_PAYMENT,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[ITEMFULLFILLMENT_ID] = {
                transCode: "ItemShip",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.ITEM_FULFILLMENT,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[VENDOR_CREDIT_ID] = {
                transCode: "VendCred",
                edocType: [INBOUND_EDOC_TYPE, OUTBOUND_EDOC_TYPE],
                type: record.Type.VENDOR_CREDIT,
                transGroupType: PURCHASE_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[TRANSFER_ORDER_ID] = {
                transCode: "TrnfrOrd",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.TRANSFER_ORDER,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[SALES_ORDER_ID] = {
                transCode: "SalesOrd",
                edocType: [INBOUND_EDOC_TYPE],
                type: record.Type.SALES_ORDER,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };

            transactionMap[CUSTOMER_DEPOSIT_ID] = {
                transCode: "CustDep",
                edocType: [OUTBOUND_EDOC_TYPE],
                type: record.Type.CUSTOMER_DEPOSIT,
                transGroupType: SALES_TRANS_TYPE,
                inactive: false,
            };
        }
    }

    /**
     * Definition of Terms by example
     *
     * Name: Invoice
     * id: 7
     * transCode: CustInvc
     * recordType: invoice
     * edocType: outbound
     * type: sales
     */

    /**
     * Removes the unsupported transaction types from the passed transTypeSelectOptions, and returns all the EI-supported transaction types in transTypeSelectOptions.
     *
     * @param transTypeSelectOptions select options from Transaction Type field(its field type is SELECT). (Array of objects with keys value and text, where value is identifier of transaction type, and text is Label(name) of the transaction type)
     * @param edocType specifies which type('outbound' or 'inbound') of the supported transaction types is to be retrieved.
     *
     * @returns Array of supported transaction type objects, example: [{"value":"17","text":"Bill"},{"value":"20","text":"Bill Credit"}]
     */
    function getSupportedTransTypeLabels(
        transTypeSelectOptions,
        edocType,
        excludeCTT
    ) {
        init();
        var supportedTransTypeIds = [];
        if (!edocType) {
            for (var i in transactionMap) {
                supportedTransTypeIds.push(i);
            }
        } else if (edocType.indexOf(INBOUND_EDOC_TYPE) >= 0) {
            for (var j in transactionMap) {
                if (
                    transactionMap[j].edocType.indexOf(INBOUND_EDOC_TYPE) >= 0
                ) {
                    supportedTransTypeIds.push(j);
                }
            }
        } else if (edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0) {
            for (var k in transactionMap) {
                if (
                    transactionMap[k].edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0
                ) {
                    supportedTransTypeIds.push(k);
                }
            }
        } else if (edocType.indexOf(TRANS_TEMP_TYPE) >= 0) {
            for (var l in transactionMap) {
                if (transactionMap[l].edocType.indexOf(TRANS_TEMP_TYPE) >= 0) {
                    supportedTransTypeIds.push(l);
                }
            }
        }

        //adding Custom Transaction Types
        if (!excludeCTT) {
            try {
                supportedTransTypeIds = appendCustomTranTypeIds(
                    supportedTransTypeIds
                );
            } catch (e) {
                log.error(e.name, e.message + " " + e.stack);
            }
        }

        if (supportedTransTypeIds.length > 0) {
            var isSupportedTransType = false;
            var m = 0;
            while (m < transTypeSelectOptions.length) {
                isSupportedTransType =
                    supportedTransTypeIds.indexOf(
                        transTypeSelectOptions[m].value
                    ) !== -1;
                if (!isSupportedTransType) {
                    transTypeSelectOptions.splice(m, 1);
                } else {
                    m++;
                }
            }
        } else {
            transTypeSelectOptions = [];
        }

        return transTypeSelectOptions;
    }

    //retrieves EI registered CTT IDs from EICTTMAP and adds them to supportedTransTypeIds
    function appendCustomTranTypeIds(supportedTransTypeIds) {
        var cttSupportedIds = cttManager.getRegisteredCTTIntIdArray();
        for (var i = 0; i < cttSupportedIds.length; i++) {
            if (supportedTransTypeIds.indexOf(cttSupportedIds[i]) === -1) {
                supportedTransTypeIds.push(cttSupportedIds[i]);
            }
        }
        return supportedTransTypeIds;
    }

    function getTransactionTypeFromId(id) {
        init();
        return transactionMap[id].type;
    }

    function getTransactionTypeFromCode(code) {
        init();
        for (var i in transactionMap) {
            if (transactionMap[i].transCode === code) {
                return transactionMap[i].type;
            }
        }
    }

    /**
     * Retrieves outbound transaction Type codes
     *
     * @param integer[] valueArray
     * @returns string[] transaction code
     */
    function getOutboundTransactionCodes(valueArray) {
        init();
        var transCodes = [];
        var id;
        var transData;

        updateTransactionMapWithCTT();
        for (var i = 0; i < valueArray.length; i++) {
            id = valueArray[i];
            transData = transactionMap[id];

            if (
                transData &&
                transData.edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0
            ) {
                transCodes.push(transData.transCode);
            }
        }

        return transCodes;
    }

    /**
     * Retrieves inbound transaction Type codes
     *
     * @param integer[] valueArray
     * @returns string[] transaction code
     */
    function getInboundTransactionCodes(valueArray) {
        init();
        var transCodes = [];
        var id;
        var transData;

        for (var i = 0; i < valueArray.length; i++) {
            id = valueArray[i];
            transData = transactionMap[id];
            if (transData.edocType.indexOf(INBOUND_EDOC_TYPE) >= 0) {
                transCodes.push(transData.transCode);
            }
        }

        return transCodes;
    }

    /**
     * Retrieves response template transaction Type codes
     *
     * @param integer[] valueArray
     * @returns string[] transaction code
     */
    function getResponseTemplateTransactionCodes(valueArray) {
        init();
        var transCodes = [];
        var id;
        var transData;

        for (var i = 0; i < valueArray.length; i++) {
            id = valueArray[i];
            transData = transactionMap[id];
            if (transData.edocType.indexOf(TRANS_TEMP_TYPE) >= 0) {
                transCodes.push(transData.transCode);
            }
        }

        return transCodes;
    }

    /**
     * Retrieves inbound transaction record type
     *
     * @param integer[] internal id
     * @returns string[] transaction record type
     */
    function getInboundTransactionRecordTypes(valueArray) {
        init();
        var transRecTypes = [];
        var id;
        var transData;

        for (var i = 0; i < valueArray.length; i++) {
            id = valueArray[i];
            transData = transactionMap[id];
            if (transData.edocType.indexOf(INBOUND_EDOC_TYPE) >= 0) {
                transRecTypes.push(transData.type);
            }
        }

        return transRecTypes;
    }

    /**
     * Validate if the given record internal ID belongs to an outbound
     * transaction
     *
     * @param integer id
     * @returns boolean
     */
    function isValidOutboundTransactionType(id) {
        init();
        var transData = transactionMap[id];
        if (transData) {
            if (transData.edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0) {
                return true;
            }
        }
        var cttMapObj = getCTTMap();
        var transDataCTT = cttMapObj[id];
        if (transDataCTT) {
            if (transDataCTT.edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Validates if the given record internal ID belongs to an inbound
     * transaction
     *
     * @param integer id
     * @returns boolean
     */
    function isValidInboundTransactionType(id) {
        init();
        var isValid = false;
        var transData = transactionMap[id];

        if (transData) {
            if (transData.edocType.indexOf(INBOUND_EDOC_TYPE) >= 0) {
                isValid = true;
            }
        }

        return isValid;
    }

    /**
     * Retrieves transCodes of all outbound transactions
     *
     * @param void
     * @returns string[] transCode
     */
    function getAllOutboundTransactionCodes() {
        init();
        var outboundTransactionCodes = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (transData.edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0) {
                outboundTransactionCodes.push(transData.transCode);
            }
        }

        return outboundTransactionCodes;
    }

    /**
     * Retrieves transCodes of all sales transactions
     *
     * @param void
     * @returns string[] transCode
     */
    function getAllSalesTransactionCodes() {
        init();
        var salesTransactionCodes = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (transData.transGroupType === SALES_TRANS_TYPE) {
                salesTransactionCodes.push(transData.transCode);
            }
        }
        return salesTransactionCodes;
    }

    /**
     * Retrieves ids of all purchase transactions
     *
     * @param void
     * @returns string[] transaction type ids
     */
    function getAllPurchaseTransactionIds() {
        init();
        var purchaseTransactionIds = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (transData.transGroupType === PURCHASE_TRANS_TYPE) {
                purchaseTransactionIds.push(tranId);
            }
        }

        return purchaseTransactionIds;
    }

    /**
     * Retrieves transCodes of all inbound sales transactions
     *
     * @param void
     * @returns string[] transCode
     */
    function getAllInboundSalesTransactionIds() {
        init();
        var salesTransactionCodes = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (
                transData.transGroupType === SALES_TRANS_TYPE &&
                transData.edocType.indexOf(INBOUND_EDOC_TYPE) >= 0
            ) {
                salesTransactionCodes.push(tranId);
            }
        }
        return salesTransactionCodes;
    }

    /**
     * Retrieves ids of all inbound purchase transactions
     *
     * @param void
     * @returns string[] transaction type ids
     */
    function getAllPurchaseInboundTransactionIds() {
        init();
        var purchaseTransactionIds = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (
                transData.transGroupType === PURCHASE_TRANS_TYPE &&
                transData.edocType.indexOf(INBOUND_EDOC_TYPE) >= 0
            ) {
                purchaseTransactionIds.push(tranId);
            }
        }
        return purchaseTransactionIds;
    }

    /**
     * Validate if the given record internal ID belongs to an outbound
     * transaction
     *
     * @param integer internal id or string transCode
     * @param boolean boolean value if updateTransactionMapWithCTT() should trigger
     * @returns boolean
     */
    function isSalesTransaction(type, isForUpdateCTT) {
        init();
        var isSales = false;
        var transData;
        if (isForUpdateCTT !== false) {
            updateTransactionMapWithCTT();
        }
        if (parseInt(type)) {
            /* it's an integer, internal id of the custom record type */
            transData = transactionMap[parseInt(type)];
        } else {
            /* it's a string, internal code of the custom record type */
            var trans;

            for (var tranId in transactionMap) {
                trans = transactionMap[tranId];
                if (trans.transCode.toLowerCase() === type.toLowerCase()) {
                    transData = trans;
                }
            }
        }

        if (transData) {
            if (transData.transGroupType === SALES_TRANS_TYPE) {
                isSales = true;
            }
        }

        return isSales;
    }

    /**
     * Validate if the given record internal ID belongs to purchase group
     * transaction
     *
     * @param integer internal id or string transCode
     * @param boolean boolean value if updateTransactionMapWithCTT() should trigger
     * @returns boolean
     */
    function isPurchaseTransaction(type, isForUpdateCTT) {
        init();
        var isPurchase = false;
        var transData;

        if (isForUpdateCTT !== false) {
            updateTransactionMapWithCTT();
        }

        if (parseInt(type)) {
            /* it's an integer, internal id of the custom record type */
            transData = transactionMap[parseInt(type)];
        } else {
            /* it's a string, internal code of the custom record type */
            var trans;

            for (var tranId in transactionMap) {
                trans = transactionMap[tranId];
                if (trans.transCode.toLowerCase() === type.toLowerCase()) {
                    transData = trans;
                }
            }
        }
        if (transData) {
            if (transData.transGroupType === PURCHASE_TRANS_TYPE) {
                isPurchase = true;
            }
        }
        return isPurchase;
    }

    function updateTransactionMapWithCTT() {
        init();
        var cttMapObj = getCTTMap();
        for (var key in cttMapObj) {
            var cttData = cttMapObj[key];
            transactionMap[key] = cttData;
        }
    }

    /**
     * @returns an array with valid transaction type payload values for Template and Sending Method APIs
     * (internal ids of supported standard and string ids of supported custom transaction types)
     */
    function getValidPayloadTransactionIDs() {
        init();
        var activeTxnsArray = [];
        var index = 0;
        for (var i in transactionMap) {
            if (!transactionMap[i].inactive) activeTxnsArray[index++] = i;
        }

        //adding valid CTT values
        var cttMapObj = getCTTMap();
        for (var j in cttMapObj) {
            activeTxnsArray[index++] = cttMapObj[j].type;
        }
        return activeTxnsArray;
    }

    /**
     * @returns an array of valid transaction type payload values for Audit Trail API
     * (string ids of supported standard and supported custom transaction types)
     */
    function getValidPayloadTransactionTypes() {
        init();
        var validTxnTypeArray = [];
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (transData.inactive === false)
                validTxnTypeArray.push(transData.type);
        }
        //adding valid CTT values
        var cttMapObj = getCTTMap();
        for (var i in cttMapObj) {
            validTxnTypeArray.push(cttMapObj[i].type);
        }
        return validTxnTypeArray;
    }

    function checkIfCttUsingTransCode(transCode) {
        return (
            transCode.indexOf("custom") !== -1 ||
            transCode.indexOf("cutr") !== -1
        );
    }

    function isBasicStyleCTT(cttStringId) {
        var isBasicStyleCtt = false;
        if (!cttStringId) {
            return false;
        } else if (cttStringId && !isNumeric(cttStringId)) {
            isBasicStyleCtt =
                cttStringId.toLowerCase().indexOf("customtransaction") === 0;
        }
        return isBasicStyleCtt;
    }

    function isJournalStyleCTT(cttStringId) {
        var isJournalCttStyle = false;
        if (!cttStringId) {
            return false;
        } else if (cttStringId && !isNumeric(cttStringId)) {
            isJournalCttStyle =
                cttStringId.toLowerCase().indexOf("customtransaction") === 0;
        }
        return isJournalCttStyle;
    }

    function isSalesStyleCTT(cttStringId) {
        var isSalesCttStyle = false;
        if (!cttStringId) {
            return false;
        } else if (cttStringId && !isNumeric(cttStringId)) {
            isSalesCttStyle =
                cttStringId.toLowerCase().indexOf("customsale") === 0;
        }
        return isSalesCttStyle;
    }

    function isPurchaseStyleCTT(cttStringId) {
        var isPurchaseCttStyle = false;
        if (!cttStringId) {
            return false;
        } else if (cttStringId && !isNumeric(cttStringId)) {
            isPurchaseCttStyle =
                cttStringId.toLowerCase().indexOf("custompurchase") === 0;
        }
        return isPurchaseCttStyle;
    }

    function getCTTMap() {
        if (!cttMap || Object.keys(cttMap).length === 0) {
            cttMap = {};
            var cttIntIdArray = [];
            try {
                cttIntIdArray = cttManager.getRegisteredCTTIntIdArray();
                for (var i = 0; i < cttIntIdArray.length; i++) {
                    var type = cttManager.getStringIdOfCTTFromInternalId(
                        cttIntIdArray[i]
                    );

                    var transCode = undefined;
                    var transGroupType = undefined;
                    if (isBasicStyleCTT(type) || isJournalStyleCTT(type)) {
                        transCode = "custom" + cttIntIdArray[i];
                        transGroupType = SALES_TRANS_TYPE; //setting Basic and Journal as SALES is temporary to support Basic and Sales Style CTT listing with Customer Radio Button filter in Send Failed Suitelet.
                        //TODO Send Failed Suitelet should be modified to handle entityless transaction types like Transfer Order, Basic CTT, Journal CTT without relying on customer radio button selection.
                    } else if (isSalesStyleCTT(type)) {
                        transCode = "cutrsale" + cttIntIdArray[i];
                        transGroupType = SALES_TRANS_TYPE;
                    } else if (isPurchaseStyleCTT(type)) {
                        transCode = "cutrprch" + cttIntIdArray[i];
                        transGroupType = PURCHASE_TRANS_TYPE;
                    }

                    if (transCode) {
                        cttMap[cttIntIdArray[i]] = {
                            edocType: [OUTBOUND_EDOC_TYPE], //initializing all CTTs as outbound type by default.
                            type: type,
                            inactive: false,
                            transCode: transCode,
                            transGroupType: transGroupType,
                        };
                    }
                }
            } catch (e) {
                log.error(e.name, e.message + " " + e.stack);
            }
        }
        return cttMap;
    }

    function getTransactionFilters(allowedCountry, invStatus, tranType) {
        init();
        var transactionTypes = [];

        if (!tranType) {
            transactionTypes = getAllOutboundTransactionCodes();
        } else if (tranType.length > 0) {
            /* Atleast one transaction type is selected */
            transactionTypes = getOutboundTransactionCodes(tranType);
        } else if (tranType.length === 0) {
            transactionTypes = getAllSalesTransactionCodes();
        }

        transactionTypes = removeCttTransCodes(transactionTypes);

        var transactionTypeFilter = [
            ["type", search.Operator.ANYOF, transactionTypes],
        ];

        var isOW = runtime.isFeatureInEffect(SUBSIDIARIES);
        if (isOW && allowedCountry) {
            transactionTypeFilter.push("AND", [
                "formulatext: {subsidiary.country}",
                search.Operator.IS,
                allowedCountry,
            ]);
        }

        var transactionFilter = [];
        if (transactionTypes.length > 0) {
            transactionFilter.push(transactionTypeFilter);
        }
        var filters = [];
        filters.push([
            "custbody_psg_ei_status",
            search.Operator.ANYOF,
            invStatus,
        ]);
        filters.push("AND");
        filters.push(["mainline", search.Operator.IS, "T"]);
        filters.push("AND");
        filters.push(transactionFilter);
        filters.push("AND");
        filters.push(["memorized", search.Operator.IS, "F"]);

        return filters;
    }

    function getTransactionFiltersQuery(
        transQuery,
        subsidiaryId,
        allowedCountry,
        invStatus,
        tranType
    ) {
        init();
        var transactionTypes = [];
        var filters = [];
        if (!tranType) {
            transactionTypes = getAllOutboundTransactionCodes();
        } else if (tranType.length > 0) {
            /* Atleast one transaction type is selected */
            transactionTypes = getOutboundTransactionCodes(tranType);
        } else if (tranType.length === 0) {
            transactionTypes = getAllSalesTransactionCodes();
        }
        transactionTypes = removeCttTransCodes(transactionTypes);
        var isOW = runtime.isFeatureInEffect(SUBSIDIARIES);
        log.debug(
            "getTransactionFiltersQuery():allowedCountry",
            allowedCountry
        );
        log.debug("getTransactionFiltersQuery():subsidiaryId", subsidiaryId);
        if (isOW && (allowedCountry || subsidiaryId)) {
            if (subsidiaryId)
                filters.push(
                    transQuery.createCondition({
                        fieldId: "transactionlines.subsidiary",
                        operator: query.Operator.EQUAL,
                        values: subsidiaryId,
                    })
                );
            if (allowedCountry)
                filters.push(
                    transQuery.createCondition({
                        fieldId: "transactionlines.subsidiary.country",
                        operator: query.Operator.IS,
                        values: countryMapping.getFreeCountryISOCode(
                            allowedCountry
                        ),
                    })
                );
            filters.push(
                transQuery.createCondition({
                    fieldId: "transactionlines.mainline",
                    operator: query.Operator.IS,
                    values: true,
                })
            );
        }
        if (transactionTypes.length > 0) {
            filters.push(
                transQuery.createCondition({
                    fieldId: "type",
                    operator: query.Operator.ANY_OF,
                    values: transactionTypes,
                })
            );
        }
        filters.push(transQuery.createCondition({
            fieldId: "custbody_psg_ei_status", operator: query.Operator.ANY_OF, values: invStatus
        }));
        return filters;
    }

    /*
    Removes all the custom transaction codes from an array of standard and custom transaction codes
    and return an array containing only standard transaction codes.
   */

    function removeCttTransCodes(transactionTypes) {
        var cttArr = [];

        for (var i in transactionTypes) {
            if (checkIfCttUsingTransCode(transactionTypes[i])) {
                cttArr.push(transactionTypes[i]);
            }
        }
        for (var k = transactionTypes.length - 1; k >= 0; k--) {
            for (var j = 0; j < cttArr.length; j++) {
                if (transactionTypes[k] === cttArr[j]) {
                    transactionTypes.splice(k, 1);
                }
            }
        }

        return transactionTypes;
    }

    /*
    Returns an array of custom transaction codes by comparing the
    internal ids passed as a parameter to the function
   */

    function getOutboundCttCodes(valueArray) {
        init();
        var id;
        var transData;
        var transCodes = [];

        updateTransactionMapWithCTT();
        for (var i = 0; i < valueArray.length; i++) {
            id = valueArray[i];
            transData = transactionMap[id];

            if (
                transData &&
                transData.edocType.indexOf(OUTBOUND_EDOC_TYPE) >= 0 &&
                checkIfCttUsingTransCode(transData.transCode)
            ) {
                transCodes.push(transData.transCode);
            }
        }
        return transCodes;
    }

    /*
      Returns an array of all custom transaction types which are of type sales
   */

    function getAllCttSalesTransactionCodes() {
        init();
        var salesTransactionCodes = [];

        updateTransactionMapWithCTT();
        for (var tranId in transactionMap) {
            var transData = transactionMap[tranId];
            if (
                transData.transGroupType === SALES_TRANS_TYPE &&
                checkIfCttUsingTransCode(transData.transCode)
            ) {
                salesTransactionCodes.push(transData.transCode);
            }
        }
        return salesTransactionCodes;
    }

    /* Returns an array of all custom transaction transCodes for all the custom transactions
     present in the account .
   */

    function getAllOutboundCttCodes() {
        init();
        var transCodeArr = [];
        var cttMapObj = getCTTMap();
        for (var i in cttMapObj) {
            transCodeArr.push(cttMapObj[i].transCode);
        }
        return transCodeArr;
    }

    /*
     This filter is used only for custom transaction types.
   */

    function getCustomTransactionFilters(invStatus, tranType) {
        init();
        var transactionTypes = [];

        if (!tranType) {
            transactionTypes = getAllOutboundCttCodes();
        } else if (tranType.length > 0) {
            transactionTypes = getOutboundCttCodes(tranType);
        } else if (tranType.length === 0) {
            transactionTypes = getAllCttSalesTransactionCodes();
        }

        var transactionTypeFilter = [
            ["type", search.Operator.ANYOF, transactionTypes],
        ];

        var transactionFilter = [];
        if (transactionTypes.length > 0) {
            transactionFilter.push(transactionTypeFilter);
        }

        var cttFilters = [];
        cttFilters.push([
            "custbody_psg_ei_status",
            search.Operator.ANYOF,
            invStatus,
        ]);
        cttFilters.push("AND");
        cttFilters.push(["mainline", search.Operator.IS, "T"]);
        cttFilters.push("AND");
        cttFilters.push(transactionFilter);
        cttFilters.push("AND");
        cttFilters.push(["memorized", search.Operator.IS, "F"]);

        return cttFilters;
    }

    function getCustomTransactionFiltersQuery(transQuery, invStatus, tranType) {
        init();
        var transactionTypes = [];

        if (!tranType) {
            transactionTypes = getAllOutboundCttCodes();
        } else if (tranType.length > 0) {
            transactionTypes = getOutboundCttCodes(tranType);
        } else if (tranType.length === 0) {
            transactionTypes = getAllCttSalesTransactionCodes();
        }

        var cttFilters = [];
        if (transactionTypes.length > 0) {
            cttFilters.push(
                transQuery.createCondition({
                    fieldId: "type",
                    operator: query.Operator.ANY_OF,
                    values: transactionTypes,
                })
            );
        }
        cttFilters.push(transQuery.createCondition({
            fieldId: "custbody_psg_ei_status", operator: query.Operator.ANY_OF, values: invStatus
        }));
        return cttFilters;
    }

    function isNumeric(num) {
        return !isNaN(num);
    }

    //accepts both internal id and string id of a custom transaction type
    function isCustomTransactionType(type) {
        init();
        if (isNumeric(type)) {
            type = cttManager.getStringIdOfCTTFromInternalId(type);
        }
        if (!type) return false;
        type = type.toLowerCase();
        return (
            isBasicStyleCTT(type) ||
            isJournalStyleCTT(type) ||
            isSalesStyleCTT(type) ||
            isPurchaseStyleCTT(type)
        );
    }

    /**getEntityFieldIDFromTransactionRecord
     * Return main transaction entity field id ex: for Customer Deposit & Customer payment it is "customer", for other EI supported transaction has "entity"
     * @returns string
     */
    function getEntityFieldIDFromTransactionRecord(transactionRecordObj) {
        var entityID = "";
        switch (transactionRecordObj.type) {
            case record.Type.CUSTOMER_DEPOSIT:
            case record.Type.CUSTOMER_PAYMENT:
                entityID = "customer";
                break;
            case record.Type.CASH_REFUND:
            case record.Type.CASH_SALE:
            case record.Type.CREDIT_MEMO:
            case record.Type.ESTIMATE:
            case record.Type.INVOICE:
            case record.Type.RETURN_AUTHORIZATION:
            case record.Type.VENDOR_BILL:
            case record.Type.PURCHASE_ORDER:
            case record.Type.ITEM_FULFILLMENT:
            case record.Type.VENDOR_CREDIT:
            case record.Type.SALES_ORDER:
            case record.Type.TRANSFER_ORDER: //TODO: handle entityid properly for TO(ex: TO has employee not entity)
                entityID = "entity";
                break;
            default:
                entityID = "entity"; //TODO: for time being returning entity as default (scenario: CTT journal & Basic was giving error)
                break
        }
        return entityID;
    }

    function getRecordType(transCode) {
        init();
        var tranRecType = null;
        if (transCode) {
            for (var tranId in transactionMap) {
                var transData = transactionMap[tranId];
                if (transData.transCode === transCode) {
                    tranRecType = transData.type;
                }
            }
        }
        return tranRecType;
    }

    return {
        getSupportedTransTypeLabels: getSupportedTransTypeLabels,
        getTransactionTypeFromCode: getTransactionTypeFromCode,
        getTransactionTypeFromId: getTransactionTypeFromId,
        getOutboundTransactionCodes: getOutboundTransactionCodes,
        getInboundTransactionCodes: getInboundTransactionCodes,
        getResponseTemplateTransactionCodes:
            getResponseTemplateTransactionCodes,
        getInboundTransactionRecordTypes: getInboundTransactionRecordTypes,
        isValidOutboundTransactionType: isValidOutboundTransactionType,
        isValidInboundTransactionType: isValidInboundTransactionType,
        isSalesTransaction: isSalesTransaction,
        isPurchaseTransaction: isPurchaseTransaction,
        getAllSalesTransactionCodes: getAllSalesTransactionCodes,
        getAllPurchaseTransactionIds: getAllPurchaseTransactionIds,
        getAllOutboundTransactionCodes: getAllOutboundTransactionCodes,
        getValidPayloadTransactionIDs: getValidPayloadTransactionIDs,
        getValidPayloadTransactionTypes: getValidPayloadTransactionTypes,
        getTransactionFilters: getTransactionFilters,
        getTransactionFiltersQuery: getTransactionFiltersQuery,
        getCustomTransactionFilters: getCustomTransactionFilters,
        getCustomTransactionFiltersQuery: getCustomTransactionFiltersQuery,
        isCustomTransactionType: isCustomTransactionType,
        isSalesStyleCTT: isSalesStyleCTT,
        isPurchaseStyleCTT: isPurchaseStyleCTT,
        isBasicStyleCTT: isBasicStyleCTT,
        isJournalStyleCTT: isJournalStyleCTT,
        getAllOutboundCttCodes: getAllOutboundCttCodes,
        getOutboundCttCodes: getOutboundCttCodes,
        getAllCttSalesTransactionCodes: getAllCttSalesTransactionCodes,
        removeCttTransCodes: removeCttTransCodes,
        getCTTMap: getCTTMap,
        getAllInboundSalesTransactionIds: getAllInboundSalesTransactionIds,
        getAllPurchaseInboundTransactionIds:
            getAllPurchaseInboundTransactionIds,
        getEntityFieldIDFromTransactionRecord:
            getEntityFieldIDFromTransactionRecord,
        getRecordType: getRecordType,
    };
});
