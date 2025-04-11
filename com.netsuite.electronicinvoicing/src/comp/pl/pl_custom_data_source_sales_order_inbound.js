/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define([
    "N/search",
    "N/render",
    "N/record",
    "N/query",
    "N/runtime",
    "N/error",
    "N/config",
    "N/xml",
    "N/format",
], function (
    search,
    nsrender,
    record,
    query,
    runtime,
    error,
    config,
    xml,
    format
) {
    /**
     * inject - This function will inject the custom data source during the inbound process
     * @param {Object} params.inboundEDocRec
     * @param {Object} params.templateRec
     * @param {Object} params.entityRec

     * @returns {Object} result
     * @returns {render.DataSource} result.alias
     * @returns {string} result.format
     * @returns {Object | Document | string} result.data
     */

    function inject(params) {
        var inboundEDocRec = params.inboundEDocRec.getRecord();
        var TAXRATEXPATH =
            "//cac:OrderLine/cac:LineItem/cac:Item/cac:ClassifiedTaxCategory/cbc:Percent";
        var CURRENCYPATH = "//cbc:DocumentCurrencyCode";
        var LINEEXTENSIONAMOUNTPATH =
            "//cac:OrderLine/cac:LineItem/cbc:LineExtensionAmount";
        var PRICEAMOUNTPATH =
            "//cac:OrderLine/cac:LineItem/cac:Price/cbc:PriceAmount";
        var CONTACTEMAILPATH =
            "//cac:SellerSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail";
        var SHIPDATEPATH =
            "//cac:Delivery/cac:RequestedDeliveryPeriod/cbc:StartDate";

        var MULTI_CURRENCY_ENABLE = "isMultiCurrency";
        var CURRENCY_NAME = "currencyName";
        var MESSAGE = "message";
        var SALES_REP = "salesrep";
        var SHIP_DATE = "shipdate";
        var taxcodeString = "taxcode_";
        var priceString = "price_";
        var lineExtensionString = "lineextension_";
        var orderMessage =
            "OrderDocumentReference received via PEPPOL on {DATE_TIME}";
        var customObj = {};

        try {
            var xmlContent = inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_content",
            });
            var xmlDocument = xml.Parser.fromString({ text: xmlContent });

            /**
             * Error codes/messages
             */
            var multipleSalesRepFoundErrMsg =
                "Multiple sales representatives are associated with the same email {EMAIL}. Modify the email ID in the corresponding employee records to avoid duplicate email IDs.";
            var salesRepNotFoundErrMsg =
                "Sales representative was not found. Check if {EMAIL} matches with the email of the employee record.";
            var shipDateNotValid = error.create({
                name: "SHIP_DATE_NOT_VALID",
                message:
                    "The ship date of the transaction in the XML reference file is not in the correct format. Enter the ship date in the YYYY-MM-DD format.”.",
                notifyOff: true,
            });
            var taxCodeErrorDet = error.create({
                name: "UNABLE_TO_DETERMINE_TAX_RATE_CODE",
                message:
                    "An appropriate tax code was not found for one of the following reasons:\n" +
                    "-No such tax code exists.\n" +
                    "-Multiple tax codes with the same tax rate exists.\n" +
                    "-Tax code is not of Sale type or Both type.\n" +
                    "-Tax code is inactive.\n",
                notifyOff: true,
            });

            /**
             * Fetch currency name if multi currency feature is enabled and currency node is present
             */
            var currency = xml.XPath.select({
                node: xmlDocument,
                xpath: CURRENCYPATH,
            })[0].textContent;
            var isMultiCurrency = isMultiCurrencyEnabled();
            customObj[MULTI_CURRENCY_ENABLE] = isMultiCurrency;

            // If Multi currency feature is enabled in account then get the currency name from currency ISO code
            if (isMultiCurrency) {
                customObj[CURRENCY_NAME] = getCurrencyNameFromISOCode(currency);
            }

            /**
             * message field content on transaction type
             */
            var parsedDateTime = format.format({
                value: new Date(),
                type: format.Type.DATETIME,
            });
            var message = orderMessage.replace("{DATE_TIME}", parsedDateTime);
            customObj[MESSAGE] = message;

            /**
             * Fetch sales representative if contact mail is present in xml
             */
            var contactEmail = xml.XPath.select({
                node: xmlDocument,
                xpath: CONTACTEMAILPATH,
            })[0].textContent;
            if (contactEmail) {
                var salesRep = getSalesRepWithEmail(contactEmail);
                if (salesRep.length === 1) {
                    customObj[SALES_REP] = salesRep[0];
                } else if (salesRep.length === 0) {
                    throw error.create({
                        name: "SALES_REP_NOT_FOUND",
                        message: salesRepNotFoundErrMsg.replace(
                            "{EMAIL}",
                            contactEmail
                        ),
                        notifyOff: true,
                    });
                } else {
                    throw error.create({
                        name: "MULTIPLE_SALES_REP_FOUND",
                        message: multipleSalesRepFoundErrMsg.replace(
                            "{EMAIL}",
                            contactEmail
                        ),
                        notifyOff: true,
                    });
                }
            }

            /**
             * format shipDate
             */
            var shipDateXpathVal = xml.XPath.select({
                node: xmlDocument,
                xpath: SHIPDATEPATH,
            })[0].textContent;
            var isShipDateValidVal = isDateValid(shipDateXpathVal);
            if (shipDateXpathVal) {
                if (isShipDateValidVal) {
                    customObj[SHIP_DATE] = format.format({
                        value: new Date(shipDateXpathVal.replace(/-/g, "/")),
                        type: format.Type.DATE,
                    });
                } else {
                    throw shipDateNotValid;
                }
            }

            /**
             * price and amount formatting
             */
            // Format the number if there is a decimal separator as ',' in lineExternsionAmount
            var lineExtensionElement = xml.XPath.select({
                node: xmlDocument,
                xpath: LINEEXTENSIONAMOUNTPATH,
            });
            for (var l = 0; l < lineExtensionElement.length; l++) {
                var lineExt = lineExtensionElement[l].textContent;
                customObj[lineExtensionString + l] = formatNumber(lineExt);
            }

            // Format the number if there is a decimal separator as ',' in priceAmount
            var priceElement = xml.XPath.select({
                node: xmlDocument,
                xpath: PRICEAMOUNTPATH,
            });
            for (var k = 0; k < priceElement.length; k++) {
                var priceAmt = priceElement[k].textContent;
                customObj[priceString + k] = formatNumber(priceAmt);
            }

            /**
             * tax code logic
             */
            var itemTaxCodeElement = xml.XPath.select({
                node: xmlDocument,
                xpath: TAXRATEXPATH,
            });
            var taxRateDetails = [];
            var taxCodes = [];
            for (
                var itemTaxCodeIndex = 0;
                itemTaxCodeIndex < itemTaxCodeElement.length;
                itemTaxCodeIndex++
            ) {
                taxRateDetails.push(
                    formatNumber(
                        itemTaxCodeElement[itemTaxCodeIndex].textContent
                    )
                );
            }
            var customerSubCountry;
            var custId = inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_customer",
            });
            if (isOWAccount()) {
                customerSubCountry = getCustomerSubsidiaryCountry(custId);
                taxCodes = getTaxCodeMap(customerSubCountry);
            } else {
                var countryInCompanyInfo = getCountryInCompanyInfo();
                taxCodes = getTaxCodeMap(countryInCompanyInfo);
            }

            for (var j = 0; j < taxRateDetails.length; j++) {
                var itemTaxRate;
                if (taxRateDetails[j] === "") {
                    // if in XML Reference we don't have value in cbc:Percent
                    throw taxCodeErrorDet;
                } else {
                    itemTaxRate = parseFloat(taxRateDetails[j]);
                }
                var count = 0;
                if (taxCodes[itemTaxRate]) {
                    count = Object.keys(taxCodes[itemTaxRate]).length;
                }

                if (count === 1) {
                    if (taxRateDetails[j] && taxRateDetails[j] !== 0) {
                        var itemTaxCode = taxCodes[itemTaxRate][0];
                        customObj[taxcodeString + j] = itemTaxCode.internalid;
                    }
                } else {
                    throw taxCodeErrorDet;
                }
            }
        } catch (exp) {
            var errCode = "";
            var errMsg = "";
            log.error(exp.name, exp.message + " " + exp.stack);

            if (
                [
                    "MULTIPLE_SALES_REP_FOUND",
                    "SALES_REP_NOT_FOUND",
                    "SHIP_DATE_NOT_VALID",
                    "INBOUND_CONVERSION_NOT_SUPPORTED_IN_SUITETAX",
                    "UNABLE_TO_DETERMINE_TAX_RATE_CODE",
                ].indexOf(exp.name) > -1
            ) {
                errCode = exp.name;
                errMsg = exp.message;
            } else {
                errCode = "EI_INBOUND_CDS_PLUGIN_ERROR";
                errMsg =
                    "The Inbound CDS plug-in failed to return valid custom data source";
            }
            throw error.create({
                name: errCode,
                message: errMsg,
                notifyOff: true,
            });
        }

        return {
            customDataSources: [
                {
                    format: nsrender.DataSource.OBJECT,
                    alias: "custom",
                    data: customObj,
                },
            ],
        };
    }

    // Formatting the number by replacing decimal separator ',' with '.' and
    // validating the number if it has more than one separator.
    function formatNumber(value) {
        var separators = value.match(/[,.]/g);
        var amount = value;
        var errGroupSep = error.create({
            name: "NUMBER_CONTAINS_MORE_THAN_ONE_SEPARATOR",
            message:
                "The " +
                value +
                " value contains more than one separator.Enter a value with only one separator.",
            notifyOff: true,
        });
        if (separators) {
            if (separators.length > 1) {
                throw errGroupSep;
            } else if (separators.length === 1) {
                var separator = separators[0];
                if (separator === ",") {
                    amount = value.replace(separator, ".");
                }
            }
        }
        return amount;
    }

    // This function finds the subsidiary country of the Customer using the customer's internal id as the parameter.
    function getCustomerSubsidiaryCountry(custId) {
        var custRec = record.load({
            type: record.Type.CUSTOMER,
            id: custId,
        });

        var custSubId = custRec.getValue({ fieldId: "subsidiary" });
        var custSubRec = record.load({
            type: record.Type.SUBSIDIARY,
            id: custSubId,
        });
        return custSubRec.getValue({ fieldId: "country" });
    }

    // According to the subsidiary country of the Inbound E-Document's customer we are preparing a map of all the
    // tax codes present for the country to fetch the tax code names in the account.
    function getTaxCodeMap(country) {
        var searchType = search.Type.SALES_TAX_ITEM;
        var COUNTRY = "country";
        var ITEMID = "itemid";
        var INTERNALID = "internalid";
        var RATE = "rate";
        var ISINACTIVE = "isinactive";
        var AVAILABLEON = "availableon";
        var filters;
        var filtersInOw = [
            [COUNTRY, search.Operator.IS, country],
            "and",
            [ISINACTIVE, search.Operator.IS, "F"],
            "and",
            [AVAILABLEON, search.Operator.ANYOF, ["BOTH", "SALE"]],
        ];
        var filtersInSI = [
            [ISINACTIVE, search.Operator.IS, "F"],
            "and",
            [AVAILABLEON, search.Operator.ANYOF, ["BOTH", "SALE"]],
        ];
        var columns = [ITEMID, INTERNALID, RATE, ISINACTIVE, AVAILABLEON];
        var taxCodesObj = {};
        var suiteTaxError = error.create({
            name: "INBOUND_CONVERSION_NOT_SUPPORTED_IN_SUITETAX",
            message:
                "Inbound conversion to Sales Order is not supported for SuiteTax accounts.",
            notifyOff: true,
        });

        if (isOWAccount()) {
            filters = filtersInOw;
        } else {
            filters = filtersInSI;
        }
        if (!isSuiteTaxAccount()) {
            var taxcodeSearch = search.create({
                type: searchType,
                columns: columns,
                filters: filters,
            });
            var resultSet = taxcodeSearch.run();
            var resultSetNew = resultSet.getRange({
                start: 0,
                end: 100,
            });
            for (var j = 0; j < resultSetNew.length; j++) {
                var rate = parseFloat(resultSetNew[j].getValue(RATE));
                var taxCodeDetails = {
                    rate: rate,
                    internalid: resultSetNew[j].getValue(INTERNALID),
                    name: resultSetNew[j].getValue(ITEMID),
                    isinactive: resultSetNew[j].getValue(ISINACTIVE),
                    availableon: resultSetNew[j].getValue(AVAILABLEON),
                };
                if (taxCodesObj[rate]) {
                    taxCodesObj[rate].push(taxCodeDetails);
                } else {
                    taxCodesObj[rate] = [taxCodeDetails];
                }
            }
        } else {
            // As we are not supporting this inbound conversion in SuiteTax accounts so throwing error
            log.error({
                title: suiteTaxError.name,
                details: suiteTaxError.message,
            });
            throw suiteTaxError;
        }
        return taxCodesObj;
    }

    function isSuiteTaxAccount() {
        return runtime.isFeatureInEffect({ feature: "SUITETAXENGINE" });
    }

    // Check is the date is in correct format or not. Correct format is YYYY-MM-DD. Return true if its correct format.
    function isDateValid(dateVal) {
        var isValid = true;
        var regex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateVal.match(regex) === null) {
            isValid = false;
        }
        return isValid;
    }

    function getCountryInCompanyInfo() {
        var COUNTRY = "country";
        var companyInfo = config.load({
            type: config.Type.COMPANY_INFORMATION,
        });
        return companyInfo.getText(COUNTRY);
    }

    function isOWAccount() {
        return runtime.isFeatureInEffect({ feature: "SUBSIDIARIES" });
    }

    // Function to get the currency name in the account used for the currency ISO Code
    function getCurrencyNameFromISOCode(currencyISOCode) {
        var currencyQuery = query.create({ type: query.Type.CURRENCY });
        currencyQuery.columns = [
            currencyQuery.createColumn({ fieldId: "name" }),
        ];

        var currCondition = currencyQuery.createCondition({
            fieldId: "symbol",
            operator: query.Operator.IS,
            values: currencyISOCode,
        });
        currencyQuery.condition = currCondition;
        var resultSet = currencyQuery.run();
        var result = resultSet.results;
        if (result !== 0) {
            for (var i = result.length - 1; i >= 0; i--) {
                result.currency = result[i].values[0];
            }
        }
        return result.currency;
    }

    // Function to get sales representatives array using the email passed as parameter
    function getSalesRepWithEmail(email) {
        var salesRepArr = [];
        var employeeQuery = query.create({
            type: query.Type.EMPLOYEE,
        });
        employeeQuery.columns = [employeeQuery.createColumn({ fieldId: "id" })];
        var emailMatchCondition = employeeQuery.createCondition({
            fieldId: "email",
            operator: query.Operator.IS,
            values: email,
        });
        var salesRepCondition = employeeQuery.createCondition({
            fieldId: "issalesrep",
            operator: query.Operator.IS,
            values: true,
        });
        employeeQuery.condition = employeeQuery.and(
            emailMatchCondition,
            salesRepCondition
        );
        var resultSet = employeeQuery.run();
        var empResults = resultSet.results;
        for (var i = 0; i < empResults.length; i++) {
            salesRepArr.push(empResults[i].values[0]);
        }
        return salesRepArr;
    }

    function isMultiCurrencyEnabled() {
        return runtime.isFeatureInEffect("MULTICURRENCY");
    }

    return {
        inject: inject,
    };
});
