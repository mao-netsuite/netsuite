/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define([
    "N/render",
    "N/query",
    "N/xml",
    "N/error",
    "N/runtime",
    "N/format",
], function (nsrender, query, xml, error, runtime, format) {
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
        var customObj = {};
        var inboundEDocRec = params.inboundEDocRec;

        var LINEEXTENSIONAMOUNTPATH =
            "//cac:CreditNoteLine/cbc:LineExtensionAmount";
        var PRICEAMOUNTPATH = "//cac:CreditNoteLine/cac:Price/cbc:PriceAmount";

        var lineExtensionString = "lineextension_";
        var CURRENCYPATH = "//cbc:DocumentCurrencyCode";
        var priceString = "price_";
        var MULTI_CURRENCY_ENABLE = "isMultiCurrency";
        var CURRENCY_ISO_CODE = "currencyISOCode";
        var DUEDATEXPATH = "//cbc:DueDate";
        var ISSUEDATEXPATH = "//cbc:IssueDate";
        var TRANDATE = "trandate";
        var DUEDATE = "duedate";

        try {
            var xmlContent = inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_content",
            });
            var xmlDocument = xml.Parser.fromString({ text: xmlContent });

            var errorDet;

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

            // Format the number if there is a decimal separator as ',' in lineExternsionAmount
            var lineExtensionElement = xml.XPath.select({
                node: xmlDocument,
                xpath: LINEEXTENSIONAMOUNTPATH,
            });

            log.debug("lineExtensionElement", lineExtensionElement);

            for (var i = 0; i < lineExtensionElement.length; i++) {
                var lineExt = lineExtensionElement[i].textContent;
                customObj[lineExtensionString + i] = formatNumber(lineExt);
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
                    // throw the error
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
                    // throw the error date not valid
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
                            // throw the error due date not valid
                            errorDet = dueDateNotValidErrorDet;
                            throw dueDateNotValidErrorDet;
                        }
                    }
                }

                log.debug("customOBj", customObj);
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
                    "ISSUED_DATE_NOT_VALID",
                    "DUE_DATE_NOT_VALID",
                    "ISSUE_DATE_XPATH_NOT_FOUND",
                    "NUMBER_CONTAINS_MORE_THAN_ONE_SEPARATOR",
                ].indexOf(exp.name) > -1
            ) {
                errMsg = exp.message;
            } else {
                errMsg =
                    "The Vendor Credit Inbound CDS plug-in failed to return valid custom data source.";
            }
            throw error.create({
                name: "EI_VENDOR_CREDIT_CDS_PLUGIN_ERROR",
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

    function isMultiCurrencyEnabled() {
        return runtime.isFeatureInEffect("MULTICURRENCY");
    }

    // Returns true if date format is YYYY-MM-DD which is the expected format.
    function isDateValid(dateVal) {
        var isValid = true;
        var regex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateVal.match(regex) === null) {
            isValid = false;
        }
        return isValid;
    }

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

    return {
        inject: inject,
    };
});
