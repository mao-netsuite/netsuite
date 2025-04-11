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
        var DUEDATEXPATH = "//cbc:DueDate";
        var ISSUEDATEXPATH = "//cbc:IssueDate";
        var TAXRATEXPATH =
            "//cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:Percent";
        var CURRENCYPATH = "//cbc:DocumentCurrencyCode";
        var CUSTCOUNISOCODEXPATH =
            "//cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode";
        var LINEEXTENSIONAMOUNTPATH =
            "//cac:InvoiceLine/cbc:LineExtensionAmount";
        var PRICEAMOUNTPATH = "//cac:InvoiceLine/cac:Price/cbc:PriceAmount";

        var TRANDATE = "trandate";
        var DUEDATE = "duedate";
        var MULTI_CURRENCY_ENABLE = "isMultiCurrency";
        var CURRENCY_ISO_CODE = "currencyISOCode";
        var taxcodeString = "taxcode_";
        var lineExtensionString = "lineextension_";
        var priceString = "price_";
        var taxRateDetails = [];
        var taxCodes = {};
        var customObj = {};

        try {
            var xmlContent = inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_content",
            });
            var xmlDocument = xml.Parser.fromString({ text: xmlContent });
            var custCountryISOCode = "";
            var errorDet;
            var taxCodeErrorDet = error.create({
                name: "UNABLE_TO_DETERMINE_TAX_RATE_CODE",
                message:
                    "Appropriate tax code could not be found for one of the following reasons:\n" +
                    "-No such tax code exists.\n" +
                    "-Multiple tax codes with the same tax rate exists.\n" +
                    "-Tax code is not of type “Purchase” or “Both”.\n" +
                    "-Tax code is inactive.\n",
                notifyOff: true,
            });
            var custCountryErrorDet = error.create({
                name: "CUSTOMER_COUNTRY_NOT_APPLICABLE",
                message:
                    "Incorrect identification code for the customer's country in the XML reference file is entered. The values can be AU or NZ.",
                notifyOff: true,
            });
            var custCountryXPathNotFound = error.create({
                name: "CUSTOMER_COUNTRY_XPATH_NOT_FOUND",
                message:
                    "The identification code XPath for the customer's country could not be found in the XML reference file.",
                notifyOff: true,
            });
            var issueDateNotValidErrorDet = error.create({
                name: "ISSUED_DATE_NOT_VALID",
                message:
                    "The issue date of the transaction in the XML reference file is not in correct format.",
                notifyOff: true,
            });
            var issueDateXPathNotFound = error.create({
                name: "ISSUE_DATE_XPATH_NOT_FOUND",
                message:
                    "The issue date XPath for the transaction could not be found in the XML reference file.",
                notifyOff: true,
            });
            var dueDateNotValidErrorDet = error.create({
                name: "DUE_DATE_NOT_VALID",
                message:
                    "The due date of the transaction in the XML reference file is not in correct format.",
                notifyOff: true,
            });

            var vendorId = inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_vendor",
            });

            var currency = xml.XPath.select({
                node: xmlDocument,
                xpath: CURRENCYPATH,
            })[0].textContent;
            var isMultiCurrency = isMultiCurrencyEnabled();
            customObj[MULTI_CURRENCY_ENABLE] = isMultiCurrency;

            // If Multi currency feature is enabled in account then get the currency name from currency ISO code
            if (isMultiCurrency) {
                customObj[CURRENCY_ISO_CODE] =
                    getCurrencyNameFromISOCode(currency);
            }

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

            // We will fetch the tax percent from the XML reference to get the corresponding tax codes from the account
            var itemTaxCodeElement = xml.XPath.select({
                node: xmlDocument,
                xpath: TAXRATEXPATH,
            });
            for (var i = 0; i < itemTaxCodeElement.length; i++) {
                taxRateDetails.push(
                    formatNumber(itemTaxCodeElement[i].textContent)
                );
            }
            try {
                var issuedDateXpathVal = xml.XPath.select({
                    node: xmlDocument,
                    xpath: ISSUEDATEXPATH,
                })[0];

                var issuedDate;
                var isIssueDateValidVal = false;
                if (issuedDateXpathVal) {
                    issuedDate = issuedDateXpathVal.textContent;
                    isIssueDateValidVal = isDateValid(issuedDate);
                } else {
                    errorDet = issueDateXPathNotFound;
                    throw issueDateXPathNotFound;
                }

                // Formatting the transaction date according to the format set in the account
                if (issuedDate && isIssueDateValidVal) {
                    customObj[TRANDATE] = format.format({
                        value: new Date(issuedDate.replace(/-/g, "/")),
                        type: format.Type.DATE,
                    });
                } else {
                    errorDet = issueDateNotValidErrorDet;
                    throw issueDateNotValidErrorDet;
                }

                var dueDateNode = xml.XPath.select({
                    node: xmlDocument,
                    xpath: DUEDATEXPATH,
                })[0];

                var dueDate = "";
                var dueDateValid = false;

                //If Due Date is present in the XML Reference then formatting the transaction date according to the format set in the account
                if (dueDateNode) {
                    dueDate = dueDateNode.textContent;
                    if (dueDate != "") {
                        dueDateValid = isDateValid(dueDate);
                        if (dueDateValid) {
                            customObj[DUEDATE] = format.format({
                                value: new Date(
                                    dueDateNode.textContent.replace(/-/g, "/")
                                ),
                                type: format.Type.DATE,
                            });
                        } else {
                            errorDet = dueDateNotValidErrorDet;
                            throw dueDateNotValidErrorDet;
                        }
                    }
                }

                var custCountryXPath = xml.XPath.select({
                    node: xmlDocument,
                    xpath: CUSTCOUNISOCODEXPATH,
                })[0];

                // If no value of country or if the XPath to get the country of Accounting Customer Party
                // is not present in XML File then throw error
                if (custCountryXPath) {
                    custCountryISOCode = xml.XPath.select({
                        node: xmlDocument,
                        xpath: CUSTCOUNISOCODEXPATH,
                    })[0].textContent;
                } else {
                    errorDet = custCountryXPathNotFound;
                    throw custCountryXPathNotFound;
                }
                if (isValidCustomerCountry(custCountryISOCode)) {
                    var vendorSubsidiaryCountry;
                    if (isOWAccount()) {
                        vendorSubsidiaryCountry =
                            getVendorSubsidiaryCountry(vendorId);
                        taxCodes = getTaxCodeMap(vendorSubsidiaryCountry);
                    } else {
                        var countryInCompanyInfo = getCountryInCompanyInfo();
                        taxCodes = getTaxCodeMap(countryInCompanyInfo);
                    }
                } else {
                    errorDet = custCountryErrorDet;
                    throw custCountryErrorDet;
                }
                // According to the tax percent we are fetching the applicable tax code name from the account
                for (var j = 0; j < taxRateDetails.length; j++) {
                    var itemTaxRate;
                    if (taxRateDetails[j] === "") {
                        // if in XML Reference we don't have value in cbc:Percent, TODO: Implement "out-of-scope" taxcode
                        itemTaxRate = parseFloat("0.00");
                    } else {
                        itemTaxRate = parseFloat(taxRateDetails[j]);
                    }
                    var count = 0;
                    if (taxCodes[itemTaxRate]) {
                        count = Object.keys(taxCodes[itemTaxRate]).length;
                    }
                    // When we have only one tax code present for one tax rate
                    if (count === 1) {
                        if (taxRateDetails[j] && taxRateDetails[j] !== 0) {
                            var itemTaxCode = taxCodes[itemTaxRate][0];
                            customObj[taxcodeString + j] =
                                itemTaxCode.internalid;
                        } else if (!taxRateDetails[j] && taxCodes[0][0]) {
                            customObj[taxcodeString + j] =
                                taxCodes[0][0].internalid;
                        }
                    } else {
                        errorDet = taxCodeErrorDet;
                        throw errorDet;
                    }
                }
            } catch (exp) {
                log.error({
                    title: errorDet.name,
                    details: errorDet.message,
                });
                throw errorDet;
            }
        } catch (exp) {
            var errMsg = "";
            log.error(exp.message + " " + exp.stack);
            // Sending the specific error message according to the error code for audit trail logging.

            if (
                [
                    "UNABLE_TO_DETERMINE_TAX_RATE_CODE",
                    "ANZ_PEPPOL_INBOUND_CONVERSION_NOT_SUPPORTED_IN_SUITETAX",
                    "CUSTOMER_COUNTRY_NOT_APPLICABLE",
                    "CUSTOMER_COUNTRY_XPATH_NOT_FOUND",
                    "ISSUED_DATE_NOT_VALID",
                    "DUE_DATE_NOT_VALID",
                    "ISSUE_DATE_XPATH_NOT_FOUND",
                    "NUMBER_CONTAINS_MORE_THAN_ONE_SEPARATOR",
                ].indexOf(exp.name) > -1
            ) {
                errMsg = exp.message;
            } else {
                errMsg =
                    "The peppol CDS plug-in failed to return valid custom data source.";
            }
            throw error.create({
                name: "EI_PEPPOL_CDS_PLUGIN_ERROR",
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

    // This function finds if the country of the Accounting Customer Party is not empty and its AU or NZ
    function isValidCustomerCountry(custCountryISOCode) {
        var isValid = false;
        if (custCountryISOCode !== "") {
            if (custCountryISOCode === "NZ" || custCountryISOCode === "AU") {
                isValid = true;
            }
        }
        return isValid;
    }

    // This function finds the subsidiary country of the Vendor using the vendor's internal id as the parameter.
    function getVendorSubsidiaryCountry(vendorId) {
        var vendRec = record.load({
            type: record.Type.VENDOR,
            id: vendorId,
        });

        var vendSubId = vendRec.getValue({ fieldId: "subsidiary" });
        var vendSubRec = record.load({
            type: record.Type.SUBSIDIARY,
            id: vendSubId,
        });
        return vendSubRec.getValue({ fieldId: "country" });
    }

    // According to the subsidiary country of the Inbound E-Document's vendor we are preparing a map of all the
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
            [AVAILABLEON, search.Operator.ANYOF, ["BOTH", "PURCHASE"]],
        ];
        var filtersInSI = [
            [ISINACTIVE, search.Operator.IS, "F"],
            "and",
            [AVAILABLEON, search.Operator.ANYOF, ["BOTH", "PURCHASE"]],
        ];
        var columns = [ITEMID, INTERNALID, RATE, ISINACTIVE, AVAILABLEON];
        var taxCodesObj = {};
        var errorDetST = error.create({
            name: "ANZ_PEPPOL_INBOUND_CONVERSION_NOT_SUPPORTED_IN_SUITETAX",
            message:
                "Inbound conversion is not supported for SuiteTax accounts in Australia and New Zealand.",
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
                title: errorDetST.name,
                details: errorDetST.message,
            });
            throw errorDetST;
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

    function isMultiCurrencyEnabled() {
        return runtime.isFeatureInEffect("MULTICURRENCY");
    }

    return {
        inject: inject,
    };
});
