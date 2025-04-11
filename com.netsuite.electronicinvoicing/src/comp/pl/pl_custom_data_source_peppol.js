/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define([
    "N/render",
    "N/record",
    "N/search",
    "N/runtime",
    "N/error",
    "N/config",
], function (nsrender, record, search, runtime, error, config) {
    /**
     * inject - This function will inject the custom data source during the outbound process
     * @param {Object} params.transactionRecord
     * @param {Object} params.transactionId

     * @returns {Object} result
     * @returns {render.DataSource} result.alias
     * @returns {string} result.format
     * @returns {Object | Document | string} result.data
     */

    function inject(params) {
        var SUBSIDIARY = "subsidiary";
        var CURRENCY = "currency";
        var SYMBOL = "symbol";
        var BASE_CURRENCY = "basecurrency";
        var COUNTRY = "country";
        var VAT_REG_NO = "federalidnumber";
        var BILL_ADDRESS = "billaddress";
        var SUB_MAIN_ADDRESS = "mainaddress_text";
        var ITEM = "item";
        var ITEM_TYPE = "itemtype";
        var UPC_CODE = "upccode";
        var ITEM_COUNTRY = "countryofmanufacture";
        var ITEM_NAME = "itemid";
        var EI_PEPPOL_CDS_PLUGIN_ERROR = "PEPPOL CDS PLUGIN ERROR";
        var MULTI_CURRENCY = "MULTICURRENCY";
        var SUBSIDIARIES = "SUBSIDIARIES";
        var isOW = "";
        try {
            var txnRecord = params.transactionRecord;
            var txnId = params.transactionId;
            var txnObj = record.load({
                type: txnRecord.type,
                id: txnId,
            });

            var isSuiteTaxAccount = runtime.isFeatureInEffect({
                feature: "SUITETAXENGINE",
            });
            var vatRegNo;
            if (isSuiteTaxAccount) {
                vatRegNo = txnObj.getText("subsidiarytaxregnum");
            }

            isOW = runtime.isFeatureInEffect(SUBSIDIARIES);

            //To get the country of Transaction's Billing Address
            var billingAddress = txnObj.getValue(BILL_ADDRESS).split("\n");
            var getCountry = billingAddress.length;
            var billCountry = billingAddress[getCountry - 1];
            var ISOCodeBillCountry = getCountryISOCode(billCountry); // Retrieves the ISO Code for the Billing Country
            var countryInCompanyInfoCode;
            var configRecObj = config.load({
                type: config.Type.COMPANY_INFORMATION,
            });
            var countryInCompanyInfo = configRecObj.getText("country");
            if (countryInCompanyInfo) {
                countryInCompanyInfoCode =
                    getCountryISOCode(countryInCompanyInfo);
            }
            // For OW Account load the subsidiary record and its related fields
            var addressee;
            var subCountryISOCode;
            var subPrimaryCountry;
            var currISOCode;
            if (isOW) {
                var subsidiaryVal = txnObj.getValue(SUBSIDIARY);
                var subsidiaryRec = record.load({
                    type: SUBSIDIARY,
                    id: subsidiaryVal,
                });

                if (!isSuiteTaxAccount) {
                    vatRegNo = subsidiaryRec.getValue(VAT_REG_NO);
                }

                // Retrieving the country ISO Code of Transaction's Subsidiary's main address
                var subsidiaryAddress = subsidiaryRec
                    .getValue(SUB_MAIN_ADDRESS)
                    .split("\n");
                var addressId = subsidiaryRec.getValue("mainaddress");
                var addressRec = record.load({
                    type: "address",
                    id: addressId,
                });

                addressee = addressRec.getValue("addressee");
                var getSubCountry = subsidiaryAddress.length;
                var subCountry = subsidiaryAddress[getSubCountry - 1];
                subCountryISOCode = getCountryISOCode(subCountry);

                // Retrieving the country of the Transaction's Subsidiary's, it will automatically return the ISO Code.
                subPrimaryCountry = subsidiaryRec.getValue(COUNTRY);
                if (runtime.isFeatureInEffect(MULTI_CURRENCY)) {
                    var subCurr = subsidiaryRec.getValue(CURRENCY);
                    var currencyRec = record.load({
                        type: CURRENCY,
                        id: subCurr,
                    });
                    // Get the Transaction's Subsidiary's Currency's ISO Code
                    currISOCode = currencyRec.getValue(SYMBOL);
                }
            } else {
                if (runtime.isFeatureInEffect(MULTI_CURRENCY)) {
                    var currencyInCompanyInfo =
                        configRecObj.getValue(BASE_CURRENCY);
                    var currencyRecCI = record.load({
                        type: CURRENCY,
                        id: currencyInCompanyInfo,
                    });
                    currISOCode = currencyRecCI.getValue(SYMBOL);
                }
            }
            var paymentRecordsCount = txnObj.getLineCount({
                sublistId: "links",
            });

            var paymentDetails = {};

            var cardNumber = "";

            var cardHolderName = "";

            var paymentMethodName = "";

            var transactionType;

            var networkid;

            var uniqueItemsWithMultipleTaxRatesInSTArrLength;

            for (var i = 0; i < paymentRecordsCount; i++) {
                var paymentTransactionId = txnObj.getSublistValue({
                    sublistId: "links",
                    fieldId: "id",
                    line: i,
                });
                transactionType = txnObj.getSublistValue({
                    sublistId: "links",
                    fieldId: "type",
                    line: i,
                });

                if (transactionType === "Payment") {
                    var paymentRecord = record.load({
                        type: "customerpayment",
                        id: paymentTransactionId,
                    });

                    cardNumber = paymentRecord.getValue("ccnumber");

                    if (cardNumber !== "") {
                        cardNumber = cardNumber.substring(
                            cardNumber.length - 4,
                            cardNumber.length
                        );

                        cardHolderName = paymentRecord.getValue("ccname");

                        networkid = paymentRecord.getValue("paymentmethod");

                        var paymentMethodRecord = record.load({
                            type: "paymentmethod",
                            id: networkid,
                        });

                        paymentMethodName =
                            paymentMethodRecord.getValue("name");

                        paymentDetails[cardNumber] = {
                            cardNumber: cardNumber,
                            cardHolderName: cardHolderName,
                            paymentMethodName: paymentMethodName,
                        };
                    }
                }
            }

            var paymentDetailsArr = [];

            for (i in paymentDetails) {
                paymentDetailsArr.push(paymentDetails[i]);
            }

            var refundsRecordsCount = txnObj.getLineCount({
                sublistId: "apply",
            });

            var refundDetails = {};

            for (i = 0; i < refundsRecordsCount; i++) {
                var refundTransactionId = txnObj.getSublistValue({
                    sublistId: "apply",
                    fieldId: "internalid",
                    line: i,
                });
                transactionType = txnObj.getSublistValue({
                    sublistId: "apply",
                    fieldId: "type",
                    line: i,
                });

                if (transactionType === "Customer Refund") {
                    var refundRecord = record.load({
                        type: "customerrefund",
                        id: refundTransactionId,
                    });

                    var ccNumber = refundRecord.getValue("ccnumber");

                    if (ccNumber !== "") {
                        ccNumber = ccNumber.substring(
                            ccNumber.length - 4,
                            ccNumber.length
                        );

                        cardHolderName = refundRecord.getValue("ccname");

                        networkid = refundRecord.getValue("paymentmethod");

                        var refundMethodRecord = record.load({
                            type: "paymentmethod",
                            id: networkid,
                        });

                        var refundMethodName =
                            refundMethodRecord.getValue("name");

                        refundDetails[ccNumber] = {
                            cardNumber: ccNumber,
                            cardHolderName: cardHolderName,
                            paymentMethodName: refundMethodName,
                        };
                    }
                }
            }
            var refundDetailsArr = [];

            for (i in refundDetails) {
                refundDetailsArr.push(refundDetails[i]);
            }

            var headerDiscountItemId = txnObj.getValue("discountitem");

            var headerDiscountItemRecord;

            var headerDiscountTaxSchedule;

            if (headerDiscountItemId !== "") {
                headerDiscountItemRecord = record.load({
                    type: "discountitem",
                    id: headerDiscountItemId,
                });
                headerDiscountTaxSchedule =
                    headerDiscountItemRecord.getValue("taxschedule");
            }

            var taxDetailsCount = 0;

            var matchingShippingTaxCode = 0;

            var matchingHandlingTaxCode = 0;

            taxDetailsCount = txnObj.getLineCount({ sublistId: "taxdetails" });

            var itemsCount = txnObj.getLineCount({ sublistId: ITEM });
            var itemDetails = {};
            var allItemDetails = [];
            var itemKeyArr = [];
            var taxDetails = {};
            var allTaxDetails = [];
            var shippingTaxCode = txnObj.getValue("shippingtaxcode");
            var handlingTaxCode = txnObj.getValue("handlingtaxcode");
            var shippingTaxRate = txnObj.getValue("shippingtax1rate");
            var handlingTaxRate = txnObj.getValue("handlingtax1rate");
            var shippingCost = txnObj.getValue("shippingcost");
            var handlingCost = txnObj.getValue("handlingcost");
            var headerDiscountRate = txnObj.getValue("discountrate");
            var reducedShippingCost = shippingCost * shippingTaxRate * 0.01;
            var reducedHandlingCost = handlingCost * handlingTaxRate * 0.01;
            var taxKeyObj = {};
            var taxableAmount = 0;
            var taxAmount = 0;
            var lineExtensionAmounts = []; //Not using this tag now in template, but in future improvements it may be useful
            var modifiedParams = {};
            var mismatchedDiscountItemTaxCodes = {};
            var mismatchedAllTaxDetails = [];
            var mismatchedDiscountItemTaxCodesArr = [];
            var mismatchedTaxDetails = {};
            var itemType = "";
            var taxCode = "";
            for (i = 0; i < itemsCount; i++) {
                var itemInternalID = txnObj.getSublistValue({
                    sublistId: ITEM,
                    fieldId: ITEM,
                    line: i,
                });
                itemType = txnObj.getSublistValue({
                    sublistId: ITEM,
                    fieldId: ITEM_TYPE,
                    line: i,
                });

                var recordtype = "";

                switch (
                    itemType // Compare item type to its record type counterpart
                ) {
                    case "InvtPart":
                        recordtype = "inventoryitem";
                        break;
                    case "NonInvtPart":
                        recordtype = "noninventoryitem";
                        break;
                    case "Service":
                        recordtype = "serviceitem";
                        break;
                    case "Assembly":
                        recordtype = "assemblyitem";
                        break;
                    case "Description":
                        recordtype = "descriptionitem";
                        break;
                    case "Discount":
                        recordtype = "discountitem";
                        break;
                    case "Expense":
                        recordtype = "expenseitem";
                        break;
                    case "Group":
                        recordtype = "groupitem";
                        break;
                    case "Kit":
                        recordtype = "kititem";
                        break;
                    case "Markup":
                        recordtype = "markupitem";
                        break;
                    case "OthCharge":
                        recordtype = "otherchargeitem";
                        break;
                    case "Payment":
                        recordtype = "paymentitem";
                        break;
                    case "Subtotal":
                        recordtype = "subtotalitem";
                        break;
                    case "GiftCert":
                        recordtype = "giftcertificateitem";
                        break;
                    default:
                }

                var itemRec;
                var upcCodeVal;
                var itemCountryVal;
                var itemNameVal;
                itemRec = record.load({
                    type: recordtype,
                    id: itemInternalID,
                    isDynamic: true,
                });
                upcCodeVal = itemRec.getValue(UPC_CODE);
                itemCountryVal = itemRec.getValue(ITEM_COUNTRY);
                itemNameVal = itemRec.getValue(ITEM_NAME);

                //itemDetails object will have a key which is the combination of item type and item name.
                //Making an array which will contain all the keys
                itemKeyArr.push(itemType.concat(itemNameVal));

                //populating the object with key as combination of item type and item name and value as
                //UPC Code, Manufacturing country, item type, item name, item count
                itemDetails[itemType.concat(itemNameVal)] = {
                    itemUpcCode: upcCodeVal,
                    itemCountry: itemCountryVal,
                    itemType: itemType,
                    itemName: itemNameVal,
                    itemsCount: itemsCount,
                };
            }
            // storing all the values of itemDetails int a different object
            allItemDetails = getValuesOfItems(itemKeyArr, itemDetails);
            if (taxDetailsCount < 0) {
                for (i = 0; i < itemsCount; ) {
                    itemType = txnObj.getSublistValue({
                        sublistId: ITEM,
                        fieldId: "itemtype",
                        line: i,
                    });
                    if (itemType !== "Description") {
                        var lineAmount = txnObj.getSublistValue({
                            sublistId: ITEM,
                            fieldId: "amount",
                            line: i,
                        });

                        var taxRate = txnObj.getSublistValue({
                            sublistId: ITEM,
                            fieldId: "taxrate1",
                            line: i,
                        });
                        taxCode = txnObj.getSublistValue({
                            sublistId: ITEM,
                            fieldId: "taxcode",
                            line: i,
                        });

                        modifiedParams = getLineExtensionAmounts(
                            i,
                            isOW,
                            taxCode,
                            lineAmount,
                            itemsCount,
                            headerDiscountRate,
                            txnObj,
                            lineExtensionAmounts,
                            mismatchedDiscountItemTaxCodes,
                            mismatchedAllTaxDetails,
                            mismatchedDiscountItemTaxCodesArr,
                            headerDiscountTaxSchedule,
                            mismatchedTaxDetails
                        );

                        i = modifiedParams.i;
                        lineAmount = modifiedParams.lineAmount;
                        mismatchedDiscountItemTaxCodes =
                            modifiedParams.mismatchedDiscountItemTaxCodes;
                        mismatchedTaxDetails =
                            modifiedParams.mismatchedTaxDetails;
                        mismatchedAllTaxDetails =
                            modifiedParams.mismatchedAllTaxDetails;

                        taxKeyObj[taxCode] = {
                            taxCode: taxCode,
                            taxableAmount: 0,
                            taxAmount: 0,
                            taxRate: taxRate,
                        };
                        var lineDiscount =
                            lineAmount * headerDiscountRate * 0.01;

                        taxableAmount = lineAmount + lineDiscount;

                        taxDetails[taxCode] = {
                            taxCode: taxCode,
                            taxableAmount: taxableAmount,
                            taxAmount: taxAmount,
                            taxRate: taxRate,
                        };
                        allTaxDetails.push(taxDetails[taxCode]);
                    } else {
                        i++;
                    }
                }

                for (i = 0; i < mismatchedAllTaxDetails.length; i++) {
                    mismatchedDiscountItemTaxCodes[
                        mismatchedAllTaxDetails[i].taxCode
                    ].taxableAmount += mismatchedAllTaxDetails[i].taxableAmount;
                }
                for (i in mismatchedDiscountItemTaxCodes) {
                    mismatchedDiscountItemTaxCodes[i].taxAmount =
                        mismatchedDiscountItemTaxCodes[i].taxableAmount *
                        mismatchedDiscountItemTaxCodes[i].taxRate *
                        0.01;
                }
                for (i in mismatchedDiscountItemTaxCodes) {
                    mismatchedDiscountItemTaxCodesArr.push(
                        mismatchedDiscountItemTaxCodes[i]
                    );
                }
            }
            //Tax Details for SuiteTax

            var taxDetailsOfSuiteTax = {};

            var taxDetailsOfSuiteTaxWith2Keys = {};

            var taxDetailsOfSuiteTaxWithTaxCodeAsKey = {};

            var uniqueItemsWithMultipleTaxRatesInST = {};

            var uniqueItemsWithMultipleTaxRatesInSTArr = [];

            var allItemsUnderTaxDetailsInST = [];

            var uniqueTaxTypesWithMultipleTaxRatesInST = {};

            var allItemsTaxRatesInST = {};

            var shippingTaxRatesOfSuiteTax = [];

            var suiteTaxCodeDetArr = [];

            if (taxDetailsCount > 0) {
                for (i = 0; i < taxDetailsCount; i++) {
                    itemType = txnObj.getSublistValue({
                        sublistId: "taxdetails",
                        fieldId: "linetype",
                        line: i,
                    });
                    if (itemType !== "Description") {
                        var itemTaxCode = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "taxcode",
                            line: i,
                        });
                        var taxType = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "taxtype",
                            line: i,
                        });
                        var itemTaxRate = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "taxrate",
                            line: i,
                        });
                        var lineNumber = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "linenumber",
                            line: i,
                        });
                        if (itemType === "Shipping") {
                            shippingTaxRatesOfSuiteTax.push(itemTaxRate);
                        }

                        taxableAmount = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "taxbasis",
                            line: i,
                        });
                        taxAmount = txnObj.getSublistValue({
                            sublistId: "taxdetails",
                            fieldId: "taxamount",
                            line: i,
                        });
                        if (
                            itemType !== "Shipping" &&
                            itemType !== "Handling"
                        ) {
                            uniqueItemsWithMultipleTaxRatesInST[lineNumber] = {
                                lineNumber: lineNumber,
                                taxRates: [],
                            };
                            allItemsTaxRatesInST[lineNumber] = {
                                lineNumber: lineNumber,
                                taxRate: itemTaxRate,
                            };
                            allItemsUnderTaxDetailsInST.push(
                                allItemsTaxRatesInST[lineNumber]
                            );
                        }
                        if (
                            itemType !== "Shipping" &&
                            itemType !== "Handling"
                        ) {
                            taxDetailsOfSuiteTaxWithTaxCodeAsKey[itemTaxCode] =
                                {
                                    taxType: taxType,
                                    itemTaxCode: itemTaxCode,
                                    taxRate: itemTaxRate,
                                    taxableAmount: 0,
                                    taxAmount: 0,
                                };
                        }
                        //taxDetailsOfSuiteTax Object with taxType as key, to hold all Unique Tax Types and initialize taxableAmount , taxAmount (to 0) and add all taxable Amounts by iterating through the Array(allTaxDetails) to export to Template
                        taxDetailsOfSuiteTax[taxType] = {
                            taxType: taxType,
                            itemTaxCode: itemTaxCode,
                            taxRate: itemTaxRate,
                            taxableAmount: 0,
                            taxAmount: 0,
                            taxRates: [],
                        };
                        //This object is used to display multiple tax rates associated to same tax type in ST
                        uniqueTaxTypesWithMultipleTaxRatesInST[taxType] = {
                            taxType: taxType,
                            taxRates: {},
                            uniqueTaxRatesArr: [],
                        };
                        //This object is used to store taxable amt and tax amt values of a particular line item and push it to a Array(allTaxDetails).
                        taxDetailsOfSuiteTaxWith2Keys[taxType] = {
                            taxType: taxType,
                            itemTaxCode: itemTaxCode,
                            taxRate: itemTaxRate,
                            taxableAmount: taxableAmount,
                            taxAmount: taxAmount,
                        };
                        allTaxDetails.push(
                            taxDetailsOfSuiteTaxWith2Keys[taxType]
                        );
                    }
                }

                for (i in allTaxDetails) {
                    uniqueTaxTypesWithMultipleTaxRatesInST[
                        allTaxDetails[i].taxType
                    ].taxRates[allTaxDetails[i].taxRate] =
                        allTaxDetails[i].taxType;
                }

                for (i in uniqueTaxTypesWithMultipleTaxRatesInST) {
                    uniqueTaxTypesWithMultipleTaxRatesInST[
                        i
                    ].uniqueTaxRatesArr = Object.keys(
                        uniqueTaxTypesWithMultipleTaxRatesInST[i].taxRates
                    );
                }

                for (i in allItemsUnderTaxDetailsInST) {
                    uniqueItemsWithMultipleTaxRatesInST[
                        allItemsUnderTaxDetailsInST[i].lineNumber
                    ].taxRates.push(allItemsUnderTaxDetailsInST[i].taxRate);
                }

                for (i in uniqueItemsWithMultipleTaxRatesInST) {
                    uniqueItemsWithMultipleTaxRatesInSTArr.push(
                        uniqueItemsWithMultipleTaxRatesInST[i]
                    );
                }
                uniqueItemsWithMultipleTaxRatesInSTArrLength =
                    uniqueItemsWithMultipleTaxRatesInSTArr.length;
            }
            for (i in taxDetailsOfSuiteTaxWithTaxCodeAsKey) {
                suiteTaxCodeDetArr.push(
                    taxDetailsOfSuiteTaxWithTaxCodeAsKey[i]
                );
            }

            //Tax Details Calculation for legacy and SuiteTax Account
            var taxKeyArr = [];
            if (taxDetailsCount < 0) {
                //For legacy
                //Iterating through all the items and adding up their line amounts
                for (i = 0; i < allTaxDetails.length; i++) {
                    taxKeyObj[allTaxDetails[i].taxCode].taxableAmount +=
                        allTaxDetails[i].taxableAmount;
                }

                //iterating through Unique Tax codes and adding S/H cost
                for (i in taxKeyObj) {
                    //taxRate will be empty for '-Not Taxable-' Tax Code for which we must not include S/H cost.
                    if (taxKeyObj[i].taxRate !== "") {
                        if (
                            shippingTaxCode &&
                            handlingTaxCode &&
                            taxKeyObj[i].taxCode === shippingTaxCode &&
                            taxKeyObj[i].taxCode === handlingTaxCode
                        ) {
                            taxKeyObj[i].taxableAmount +=
                                shippingCost + handlingCost;
                            matchingShippingTaxCode = 1;
                            matchingHandlingTaxCode = 1;
                        } else if (
                            shippingTaxCode &&
                            taxKeyObj[i].taxCode === shippingTaxCode
                        ) {
                            taxKeyObj[i].taxableAmount += shippingCost;
                            matchingShippingTaxCode = 1;
                        } else if (
                            handlingTaxCode &&
                            taxKeyObj[i].taxCode === handlingTaxCode
                        ) {
                            taxKeyObj[i].taxableAmount += handlingCost;
                            matchingHandlingTaxCode = 1;
                        }
                    }
                    taxKeyObj[i].taxAmount =
                        taxKeyObj[i].taxableAmount *
                        taxKeyObj[i].taxRate *
                        0.01;
                }
                //Pushing objects into an array to export
                for (i in taxKeyObj) {
                    taxKeyArr.push(taxKeyObj[i]);
                }
            } else {
                //For SuiteTax
                //Iterating through all the lines under tax details sub tab and adding up their taxable Amounts('TAX BASIS') and tax amounts
                for (i in allTaxDetails) {
                    taxDetailsOfSuiteTax[
                        allTaxDetails[i].taxType
                    ].taxableAmount += allTaxDetails[i].taxableAmount;
                    taxDetailsOfSuiteTax[allTaxDetails[i].taxType].taxAmount +=
                        allTaxDetails[i].taxAmount;
                }

                //Pushing objects into an array to export
                for (i in taxDetailsOfSuiteTax) {
                    taxDetailsOfSuiteTax[i].taxRates =
                        uniqueTaxTypesWithMultipleTaxRatesInST[
                            taxDetailsOfSuiteTax[i].taxType
                        ].uniqueTaxRatesArr;
                    taxKeyArr.push(taxDetailsOfSuiteTax[i]);
                }

                // Calculation of lineExtensionAmounts tag(Not showing this tag now in template, but in future improvements we may need it)
                for (i = 0; i < itemsCount; ) {
                    var itemLineAmount = txnObj.getSublistValue({
                        sublistId: "item",
                        fieldId: "amount",
                        line: i,
                    });
                    taxCode = txnObj.getSublistValue({
                        sublistId: ITEM,
                        fieldId: "taxcode",
                        line: i,
                    });
                    modifiedParams = getLineExtensionAmounts(
                        i,
                        isOW,
                        taxCode,
                        itemLineAmount,
                        itemsCount,
                        headerDiscountRate,
                        txnObj,
                        lineExtensionAmounts,
                        mismatchedDiscountItemTaxCodes,
                        mismatchedAllTaxDetails,
                        mismatchedDiscountItemTaxCodesArr,
                        headerDiscountTaxSchedule,
                        mismatchedTaxDetails
                    );

                    i = modifiedParams.i;
                    itemLineAmount = modifiedParams.lineAmount;
                    mismatchedDiscountItemTaxCodes =
                        modifiedParams.mismatchedDiscountItemTaxCodes;
                    mismatchedTaxDetails = modifiedParams.mismatchedTaxDetails;
                    mismatchedAllTaxDetails =
                        modifiedParams.mismatchedAllTaxDetails;
                }
            }
            var customObj = {
                subCurrencyISOCode: currISOCode,
                subVatRegNo: vatRegNo,
                billCountryISOCode: ISOCodeBillCountry,
                subCountryISOCode: subCountryISOCode,
                subPrimaryCountry: subPrimaryCountry,
                countryInCompanyInfoCode: countryInCompanyInfoCode,
                allItemDetails: allItemDetails,
                addressee: addressee,
                paymentDetailsArr: paymentDetailsArr,
                taxKeyArr: taxKeyArr,
                shippingCost: shippingCost,
                handlingCost: handlingCost,
                shippingTaxRate: shippingTaxRate,
                handlingTaxRate: handlingTaxRate,
                shippingTaxCode: shippingTaxCode,
                handlingTaxCode: handlingTaxCode,
                headerDiscount: headerDiscountRate,
                isSuiteTaxAccount: isSuiteTaxAccount,
                lineExtensionAmounts: lineExtensionAmounts,
                suiteTaxCodeDetArr: suiteTaxCodeDetArr,
                matchingShippingTaxCode: matchingShippingTaxCode,
                matchingHandlingTaxCode: matchingHandlingTaxCode,
                reducedShippingCost: reducedShippingCost,
                reducedHandlingCost: reducedHandlingCost,
                mismatchedDiscountItemTaxCodesArr:
                    mismatchedDiscountItemTaxCodesArr,
                shippingTaxRatesOfSuiteTax: shippingTaxRatesOfSuiteTax,
                uniqueItemsWithMultipleTaxRatesInSTArr:
                    uniqueItemsWithMultipleTaxRatesInSTArr,
                uniqueItemsWithMultipleTaxRatesInSTArrLength:
                    uniqueItemsWithMultipleTaxRatesInSTArrLength,
                isOW: isOW,
                refundDetailsArr: refundDetailsArr,
            };
            return {
                customDataSources: [
                    {
                        format: nsrender.DataSource.OBJECT,
                        alias: "custom",
                        data: customObj,
                    },
                ],
            };
        } catch (exp) {
            log.error(exp.message + " " + exp.stack);
            throw error.create({
                name: EI_PEPPOL_CDS_PLUGIN_ERROR,
                message:
                    "The peppol CDS plug-in failed to return valid custom data source.",
                notifyOff: true,
            });
        }
    }

    function getValuesOfItems(itemKeyArr, itemDetails) {
        var id;
        var allItemValues = [];
        var itemValue;
        for (var i = 0; i < itemKeyArr.length; i++) {
            id = itemKeyArr[i];
            itemValue = itemDetails[id];
            allItemValues.push(itemValue);
        }
        return allItemValues;
    }

    //Not using lineExtensionAmounts tag now in template, but in future improvements it may be useful
    function getLineExtensionAmounts(
        i,
        isOW,
        taxCode,
        lineAmount,
        itemsCount,
        headerDiscountRate,
        txnObj,
        lineExtensionAmounts,
        mismatchedDiscountItemTaxCodes,
        mismatchedAllTaxDetails,
        mismatchedDiscountItemTaxCodesArr,
        headerDiscountTaxSchedule,
        mismatchedTaxDetails
    ) {
        if (i + 1 <= itemsCount) {
            var nextLineItemAmount = txnObj.getSublistValue({
                sublistId: "item",
                fieldId: "amount",
                line: i + 1,
            });

            var lineExtensionAmount;
            if (nextLineItemAmount < 0) {
                var lineDiscountTaxCode = txnObj.getSublistValue({
                    sublistId: "item",
                    fieldId: "taxcode",
                    line: i + 1,
                });
                if (taxCode === lineDiscountTaxCode) {
                    lineAmount += nextLineItemAmount;
                    lineExtensionAmount =
                        lineAmount + lineAmount * headerDiscountRate * 0.01;
                } else {
                    var taxRate = txnObj.getSublistValue({
                        sublistId: "item",
                        fieldId: "taxrate1",
                        line: i + 1,
                    });
                    mismatchedDiscountItemTaxCodes[lineDiscountTaxCode] = {
                        taxCode: lineDiscountTaxCode,
                        taxRate: taxRate,
                        taxableAmount: 0,
                        taxAmount: 0,
                    };
                    var taxableAmount = 0;
                    var taxAmount = 0;
                    var lineDiscount =
                        nextLineItemAmount * headerDiscountRate * 0.01;

                    taxableAmount = nextLineItemAmount + lineDiscount;

                    mismatchedTaxDetails[lineDiscountTaxCode] = {
                        taxCode: lineDiscountTaxCode,
                        taxRate: taxRate,
                        taxableAmount: taxableAmount,
                        taxAmount: taxAmount,
                    };
                    mismatchedAllTaxDetails.push(
                        mismatchedTaxDetails[lineDiscountTaxCode]
                    );
                }
                i += 2;
            } else {
                lineExtensionAmount =
                    lineAmount + lineAmount * headerDiscountRate * 0.01;
                i++;
            }
            lineExtensionAmounts.push(lineExtensionAmount);
        }
        return {
            i: i,
            lineAmount: lineAmount,
            mismatchedDiscountItemTaxCodes: mismatchedDiscountItemTaxCodes,
            mismatchedAllTaxDetails: mismatchedAllTaxDetails,
            mismatchedTaxDetails: mismatchedTaxDetails,
        };
    }

    // To get the ISO Codes of the country this function is made which will take as parameter the name
    // of the country
    function getCountryISOCode(country) {
        var result = "";
        var COUNTRY_MAPPINGS = {
            Afghanistan: "AF",
            "Aland Islands": "AX",
            Albania: "AL",
            Algeria: "DZ",
            "American Samoa": "AS",
            Andorra: "AD",
            Angola: "AO",
            Anguilla: "AI",
            Antarctica: "AQ",
            "Antigua and Barbuda": "AG",
            Argentina: "AR",
            Armenia: "AM",
            Aruba: "AW",
            Australia: "AU",
            Austria: "AT",
            Azerbaijan: "AZ",
            Bahamas: "BS",
            Bahrain: "BH",
            Bangladesh: "BD",
            Barbados: "BB",
            Belarus: "BY",
            Belgium: "BE",
            Belize: "BZ",
            Benin: "BJ",
            Bermuda: "BM",
            Bhutan: "BT",
            Bolivia: "BO",
            "Bonaire, Saint Eustatius, and Saba": "BQ",
            "Bosnia and Herzegovina": "BA",
            Botswana: "BW",
            "Bouvet Island": "BV",
            Brazil: "BR",
            "British Indian Ocean Territory": "IO",
            "Brunei Darussalam": "BN",
            Bulgaria: "BG",
            "Burkina Faso": "BF",
            Burundi: "BI",
            Cambodia: "KH",
            Cameroon: "CM",
            Canada: "CA",
            "Canary Islands": "IC",
            "Cape Verde": "CV",
            "Cayman Islands": "KY",
            "Central African Republic": "CF",
            "Ceuta and Melilla": "EA",
            Chad: "TD",
            Chile: "CL",
            China: "CN",
            "Christmas Island": "CX",
            "Cocos (Keeling) Islands": "CC",
            Colombia: "CO",
            Comoros: "KM",
            "Congo, Democratic People's Republic": "CD",
            "Congo, Republic of": "CG",
            "Cook Islands": "CK",
            "Costa Rica": "CR",
            "Cote d'Ivoire": "CI",
            "Croatia/Hrvatska": "HR",
            Cuba: "CU",
            Curacao: "CW",
            Cyprus: "CY",
            "Czech Republic": "CZ",
            Denmark: "DK",
            Djibouti: "DJ",
            Dominica: "DM",
            "Dominican Republic": "DO",
            "East Timor": "TL",
            Ecuador: "EC",
            Egypt: "EG",
            "El Salvador": "SV",
            "Equatorial Guinea": "GQ",
            Eritrea: "ER",
            Estonia: "EE",
            Ethiopia: "ET",
            "Falkland Islands": "FK",
            "Faroe Islands": "FO",
            Fiji: "FJ",
            Finland: "FI",
            France: "FR",
            "French Guiana": "GF",
            "French Polynesia": "PF",
            "French Southern Territories": "TF",
            Gabon: "GA",
            Gambia: "GM",
            Georgia: "GE",
            Germany: "DE",
            Ghana: "GH",
            Gibraltar: "GI",
            Greece: "GR",
            Greenland: "GL",
            Grenada: "GD",
            Guadeloupe: "GP",
            Guam: "GU",
            Guatemala: "GT",
            Guernsey: "GG",
            Guinea: "GN",
            "Guinea-Bissau": "GW",
            Guyana: "GY",
            Haiti: "HT",
            "Heard and McDonald Islands": "HM",
            "Holy See (City Vatican State)": "VA",
            Honduras: "HN",
            "Hong Kong": "HK",
            Hungary: "HU",
            Iceland: "IS",
            India: "IN",
            Indonesia: "ID",
            "Iran (Islamic Republic of)": "IR",
            Iraq: "IQ",
            Ireland: "IE",
            "Isle of Man": "IM",
            Israel: "IL",
            Italy: "IT",
            Jamaica: "JM",
            Japan: "JP",
            Jersey: "JE",
            Jordan: "JO",
            Kazakhstan: "KZ",
            Kenya: "KE",
            Kiribati: "KI",
            "Korea, Democratic People's Republic": "KP",
            "Korea, Republic of": "KR",
            Kosovo: "XK",
            Kuwait: "KW",
            Kyrgyzstan: "KG",
            "Lao, People's Democratic Republic": "LA",
            Latvia: "LV",
            Lebanon: "LB",
            Lesotho: "LS",
            Liberia: "LR",
            Libya: "LY",
            Liechtenstein: "LI",
            Lithuania: "LT",
            Luxembourg: "LU",
            Macau: "MO",
            Macedonia: "MK",
            Madagascar: "MG",
            Malawi: "MW",
            Malaysia: "MY",
            Maldives: "MV",
            Mali: "ML",
            Malta: "MT",
            "Marshall Islands": "MH",
            Martinique: "MQ",
            Mauritania: "MR",
            Mauritius: "MU",
            Mayotte: "YT",
            Mexico: "MX",
            "Micronesia, Federal State of": "FM",
            "Moldova, Republic of": "MD",
            Monaco: "MC",
            Mongolia: "MN",
            Montenegro: "ME",
            Montserrat: "MS",
            Morocco: "MA",
            Mozambique: "MZ",
            Myanmar: "MM",
            Namibia: "NA",
            Nauru: "NR",
            Nepal: "NP",
            Netherlands: "NL",
            "New Caledonia": "NC",
            "New Zealand": "NZ",
            Nicaragua: "NI",
            Niger: "NE",
            Nigeria: "NG",
            Niue: "NU",
            "Norfolk Island": "NF",
            "Northern Mariana Islands": "MP",
            Norway: "NO",
            Oman: "OM",
            Pakistan: "PK",
            Palau: "PW",
            Panama: "PA",
            "Papua New Guinea": "PG",
            Paraguay: "PY",
            Peru: "PE",
            Philippines: "PH",
            "Pitcairn Island": "PN",
            Poland: "PL",
            Portugal: "PT",
            "Puerto Rico": "PR",
            Qatar: "QA",
            "Reunion Island": "RE",
            Romania: "RO",
            "Russian Federation": "RU",
            Rwanda: "RW",
            "Saint Barthélemy": "BL",
            "Saint Helena": "SH",
            "Saint Kitts and Nevis": "KN",
            "Saint Lucia": "LC",
            "Saint Martin": "MF",
            "Saint Vincent and the Grenadines": "VC",
            Samoa: "WS",
            "San Marino": "SM",
            "Sao Tome and Principe": "ST",
            "Saudi Arabia": "SA",
            Senegal: "SN",
            Serbia: "RS",
            Seychelles: "SC",
            "Sierra Leone": "SL",
            Singapore: "SG",
            "Sint Maarten": "SX",
            "Slovak Republic": "SK",
            Slovenia: "SI",
            "Solomon Islands": "SB",
            Somalia: "SO",
            "South Africa": "ZA",
            "South Georgia": "GS",
            "South Sudan": "SS",
            Spain: "ES",
            "Sri Lanka": "LK",
            "State of Palestine": "PS",
            "St. Pierre and Miquelon": "PM",
            Sudan: "SD",
            Suriname: "SR",
            "Svalbard and Jan Mayen Islands": "SJ",
            Swaziland: "SZ",
            Sweden: "SE",
            Switzerland: "CH",
            "Syrian Arab Republic": "SY",
            Taiwan: "TW",
            Tajikistan: "TJ",
            Tanzania: "TZ",
            Thailand: "TH",
            Togo: "TG",
            Tokelau: "TK",
            Tonga: "TO",
            "Trinidad and Tobago": "TT",
            Tunisia: "TN",
            Turkey: "TR",
            Turkmenistan: "TM",
            "Turks and Caicos Islands": "TC",
            Tuvalu: "TV",
            Uganda: "UG",
            Ukraine: "UA",
            "United Arab Emirates": "AE",
            "United Kingdom": "GB",
            "United States": "US",
            Uruguay: "UY",
            "US Minor Outlying Islands": "UM",
            Uzbekistan: "UZ",
            Vanuatu: "VU",
            Venezuela: "VE",
            Vietnam: "VN",
            "Virgin Islands, British": "VG",
            "Virgin Islands, USA": "VI",
            "Wallis and Futuna Islands": "WF",
            "Western Sahara": "EH",
            Yemen: "YE",
            Zambia: "ZM",
            Zimbabwe: "ZW",
        };
        result = COUNTRY_MAPPINGS[country];
        return result;
    }

    return {
        inject: inject,
    };
});
