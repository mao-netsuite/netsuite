/**
 * @NApiVersion 2.x
 * @NScriptType plugintypeimpl
 * @NModuleScope Public
 */
define([
    "N/render",
    "N/record",
    "N/runtime",
    "N/error",
    "N/search",
    "N/config",
    "N/query",
], function (nsrender, record, runtime, error, search, config, query) {
    /**
     * This function will inject the custom data source during the outbound process
     * @param params {Object} {params.transactionRecord, params.transactionId}
     * @returns {{result: {success: (boolean), eiAuditTrailMsg: string}, customDataSources: [{data: {}, format: string, alias: string}]}|{customDataSources: [{data: {}, format: string, alias: string}]}}
     */
    function inject(params) {
        var SUBSIDIARIES = "SUBSIDIARIES";
        var SUBSIDIARY_RECORD = "subsidiary";
        var PEPPOL_ID_DELIMITER = ":";
        var SUBSIDIARY_PREFERENCES_RECORD =
            "customrecord_psg_ei_sub_prefs_data";
        var SUB_VAT_REG_NO_FLD = "federalidnumber";
        var SUB_MAIN_ADDRESS_TXT_FLD = "mainaddress_text";
        var SUB_MAIN_ADDRESS_FLD = "mainaddress";
        var CUST_PEPPOL_ID_FLD = "custentity_psg_ei_peppol_id";
        var CUST_CONTACT_FLD = "contact";
        var CUST_COMPANY_NAME_FLD = "companyname";
        var CONTACT_NAME_FLD = "entityid";
        var CONTACT_PHONE_FLD = "phone";
        var CONTACT_EMAIL_FLD = "email";
        var COMPANY_COUNTRY_FLD = "country";
        var COMPANY_VAT_REG_NO_FLD = "employerid";
        var COMPANY_MAIN_ADDRESS_FLD = "mainaddress";
        var SUBSIDIARY_PREF_PEPPOL_ID_FLD = "custrecord_psg_ei_peppol_id";
        var SUBSIDIARY_PREF_SUB_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
        var BILL_ADDRESS_FLD = "billaddress";
        var SUBSIDIARY_FLD = "subsidiary";
        var ENTITY_FLD = "entity";
        var SHIPPING_COST_FLD = "shippingcost";
        var DISCOUNT_FLD = "discountrate";
        var ERR_HEADER_DISCOUNT_POSITIVE_CODE =
            "ERROR_HEADER_DISCOUNT_CANT_BE_POSITIVE";
        var ERR_HEADER_DISCOUNT_POSITIVE_MSG =
            "Header discount rate cannot be a positive value.";
        var ERR_PEPPOL_ID_BLANK_CODE = "ERROR_PEPPOL_ID_CANNOT_BE_BLANK";
        var ERR_CUSTOMER_PEPPOL_ID_BLANK_MSG =
            "PEPPOL ID field present under the E-Document tab in the {CUSTOMER_NAME} customer record does not contain any value. Provide valid PEPPOL ID in the customer record.";
        var ERR_SUBSIDIARY_PEPPOL_ID_BLANK_MSG =
            "PEPPOL ID field present in the {SUBSIDIARY_NAME} subsidiary preference record does not contain any value. Provide valid PEPPOL ID in the subsidiary preference record.";
        var vatRegNo = "";
        var custPrimContact = {};
        var customData = {};
        var itemDetails = [];
        var custPeppolIdArr = [];
        var subPeppolIdArr = [];
        var subCountryISOCode = "";
        var subState = "";
        var addressId = "";

        try {
            var tranRecord = record.load({
                type: params.transactionRecord.type,
                id: params.transactionRecord.id,
            });

            var custId = tranRecord.getValue(ENTITY_FLD);
            var subId = tranRecord.getValue(SUBSIDIARY_FLD);

            // Customer Record
            var customerRec = record.load({
                type: record.Type.CUSTOMER,
                id: custId,
            });

            // Customer PEPPOL ID
            var custPeppolId = customerRec.getValue(CUST_PEPPOL_ID_FLD);
            if (!custPeppolId) {
                var custCompanyName = customerRec.getValue(
                    CUST_COMPANY_NAME_FLD
                );
                throw error.create({
                    name: ERR_PEPPOL_ID_BLANK_CODE,
                    message: ERR_CUSTOMER_PEPPOL_ID_BLANK_MSG.replace(
                        "{CUSTOMER_NAME}",
                        custCompanyName
                    ),
                });
            }
            custPeppolIdArr = custPeppolId.split(PEPPOL_ID_DELIMITER);

            // Subsidiary Preferences PEPPOL ID
            var subsidiaryPreferencesQuery = query.create({
                type: SUBSIDIARY_PREFERENCES_RECORD,
            });
            subsidiaryPreferencesQuery.condition =
                subsidiaryPreferencesQuery.createCondition({
                    fieldId: SUBSIDIARY_PREF_SUB_ID_FLD,
                    operator: query.Operator.EQUAL,
                    values: subId,
                });
            subsidiaryPreferencesQuery.columns = [
                subsidiaryPreferencesQuery.createColumn({
                    fieldId: SUBSIDIARY_PREF_PEPPOL_ID_FLD,
                }),
                subsidiaryPreferencesQuery.createColumn({
                    fieldId: SUBSIDIARY_PREF_SUB_ID_FLD,
                    context: query.FieldContext.DISPLAY,
                }),
            ];
            var subPeppolIdResults = subsidiaryPreferencesQuery.run().results;
            if (subPeppolIdResults.length) {
                var subPeppolId = subPeppolIdResults[0].values[0];
                if (!subPeppolId) {
                    var subName = subPeppolIdResults[0].values[1];
                    throw error.create({
                        name: ERR_PEPPOL_ID_BLANK_CODE,
                        message: ERR_SUBSIDIARY_PEPPOL_ID_BLANK_MSG.replace(
                            "{SUBSIDIARY_NAME}",
                            subName
                        ),
                    });
                }
                subPeppolIdArr = subPeppolId.split(PEPPOL_ID_DELIMITER);
            }

            // Fetches all item details
            itemDetails = getAllItemDetails(tranRecord);

            // Header Discount and Shipping cost
            var shippingCost = tranRecord.getValue(SHIPPING_COST_FLD);
            var headerDiscountRate =
                tranRecord.getValue(DISCOUNT_FLD) &&
                parseFloat(tranRecord.getValue(DISCOUNT_FLD));
            if (headerDiscountRate > 0) {
                throw error.create({
                    name: ERR_HEADER_DISCOUNT_POSITIVE_CODE,
                    message: ERR_HEADER_DISCOUNT_POSITIVE_MSG,
                });
            }

            //To get the country of Transaction's Billing Address
            var billingAddress = tranRecord
                .getValue(BILL_ADDRESS_FLD)
                .split("\n");
            var getCountry = billingAddress.length;
            var billCountry = billingAddress[getCountry - 1];
            var billCountryISOCode = getCountryISOCode(billCountry); // Retrieves the ISO Code for the Billing Country

            //To get Customer Primary Contact details
            var custPrimaryContactId = customerRec.getValue(CUST_CONTACT_FLD);
            if (custPrimaryContactId) {
                // Contact Record
                var custPrimaryContactObj = record.load({
                    type: record.Type.CONTACT,
                    id: custPrimaryContactId,
                });
                var custPrimContactName =
                    custPrimaryContactObj.getValue(CONTACT_NAME_FLD);
                var custPrimContactPhone =
                    custPrimaryContactObj.getValue(CONTACT_PHONE_FLD);
                var custPrimContactEmail =
                    custPrimaryContactObj.getValue(CONTACT_EMAIL_FLD);

                custPrimContact = {
                    name: custPrimContactName,
                    phone: custPrimContactPhone,
                    email: custPrimContactEmail,
                };
            }

            if (runtime.isFeatureInEffect(SUBSIDIARIES)) {
                // Subsidiary Record
                var subsidiaryRec = record.load({
                    type: SUBSIDIARY_RECORD,
                    id: subId,
                });

                // Federal ID number
                vatRegNo = subsidiaryRec.getValue(SUB_VAT_REG_NO_FLD);

                // Retrieving the country ISO Code of Transaction's Subsidiary's main address
                var subsidiaryAddress = subsidiaryRec
                    .getValue(SUB_MAIN_ADDRESS_TXT_FLD)
                    .split("\n");
                var getSubCountry = subsidiaryAddress.length;
                var subCountry = subsidiaryAddress[getSubCountry - 1];
                subCountryISOCode = getCountryISOCode(subCountry);

                // Retrieving "State" of Transaction's Subsidiary's main address
                addressId = subsidiaryRec.getValue(SUB_MAIN_ADDRESS_FLD);
                subState = getStateFromAddress(addressId);
            } else {
                //To get Company Country Code in case of SI Account
                var configRecObj = config.load({
                    type: config.Type.COMPANY_INFORMATION,
                });
                var countryInCompanyInfo =
                    configRecObj.getText(COMPANY_COUNTRY_FLD);
                vatRegNo = configRecObj.getValue(COMPANY_VAT_REG_NO_FLD);

                if (countryInCompanyInfo) {
                    subCountryISOCode = getCountryISOCode(countryInCompanyInfo);
                }

                // To get "State" in case of SI account
                addressId = configRecObj.getValue(COMPANY_MAIN_ADDRESS_FLD);
                subState = getStateFromAddress(addressId);
            }

            customData = {
                subVatRegNo: vatRegNo,
                subCountryISOCode: subCountryISOCode,
                subState: subState,
                subPeppolId: {
                    endPointId: subPeppolIdArr[1],
                    schemeId: subPeppolIdArr[0],
                },
                custPrimaryContact: custPrimContact,
                custPeppolId: {
                    endPointId: custPeppolIdArr[1],
                    schemeId: custPeppolIdArr[0],
                },
                billCountryISOCode: billCountryISOCode,
                shippingCost: shippingCost,
                headerDiscountRate: headerDiscountRate,
                itemDetails: itemDetails,
            };
        } catch (exp) {
            log.error(exp.name, exp.message + " " + exp.stack);
            if (exp.name && exp.message) {
                var isEdocGenSuccess =
                    exp.name === ERR_PEPPOL_ID_BLANK_CODE ? false : true;

                return {
                    customDataSources: [
                        {
                            format: nsrender.DataSource.OBJECT,
                            alias: "custom",
                            data: customData,
                        },
                    ],
                    result: {
                        success: isEdocGenSuccess,
                        eiAuditTrailMsg: exp.name + ": " + exp.message,
                    },
                };
            }
        }

        return {
            customDataSources: [
                {
                    format: nsrender.DataSource.OBJECT,
                    alias: "custom",
                    data: customData,
                },
            ],
        };
    }

    /**
     * Returns ISO Code of the country based on the name of the country passed as parameter
     * @param country
     * @returns {string}
     */
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

    /**
     * Returns all item details(Ex: name, id, amount, etc) of the transaction record passed as parameter
     * @param tranRecord
     * @returns {*[]}
     */
    function getAllItemDetails(tranRecord) {
        var INV_ITEM = "InvtPart";
        var NON_INV_ITEM = "NonInvtPart";
        var KIT_ITEM = "Kit";
        var DISCOUNT_ITEM = "Discount";
        var MARKUP_ITEM = "Markup";
        var SERVICE_ITEM = "Service";
        var OTHER_CHARGE_ITEM = "OthCharge";
        var EXPENSE_ITEM = "Expense";
        var ITEM_SUBLIST = "item";
        var MPN_FLD = "mpn";
        var MANUF_TARIFF_FLD = "manufacturertariff";
        var UPC_CODE_FLD = "upccode";
        var ITEM_FLD = "item";
        var ITEM_TYPE = "itemtype";
        var RATE_FLD = "rate";
        var LINE_FLD = "line";
        var AMOUNT_FLD = "amount";
        var DESCRIPTION_FLD = "description";
        var QUANTITY_FLD = "quantity";
        var SERIAL_NOS_FLD = "serialnumbers";
        var IS_LOT_ITEM_FLD = "islotitem";
        var IS_SERIAL_ITEM_FLD = "isserialitem";
        var MANUFACTURER_ITEMS_ARR = [
            search.Type.INVENTORY_ITEM,
            search.Type.NON_INVENTORY_ITEM,
            search.Type.KIT_ITEM,
        ];
        var NON_MANUFACTURER_ITEMS_ARR = [
            search.Type.OTHER_CHARGE_ITEM,
            search.Type.SERVICE_ITEM,
        ];
        var ERR_ITEM_NOT_SUPPORTED_CODE = "ERROR_ITEM_NOT_SUPPORTED";
        var ERR_ITEM_NOT_SUPPORTED_MSG =
            "Unsupported items were found in this transaction and have been ignored.";
        var ERR_UNSUPPORTED_FIRST_ITEMTYPE_CODE =
            "ERROR_UNSUPPORTED_FIRST_ITEMTYPE";
        var ERR_UNSUPPORTED_FIRST_ITEMTYPE_MSG =
            "Line items starting with invalid item type i.e. Discount/Markup.";
        var ERR_MULTIPLE_LINECHARGES_CODE =
            "ERROR_MULTIPLE_LINECHARGES_NOT_SUPPORTED";
        var ERR_MULTIPLE_LINECHARGES_MSG =
            "Multiple markup line items cannot be associated to a single line item.";
        var ERR_MULTIPLE_LINEDISCOUNTS_CODE =
            "ERROR_MULTIPLE_LINEDISCOUNTS_NOT_SUPPORTED";
        var ERR_MULTIPLE_LINEDISCOUNTS_MSG =
            "Multiple discount line items cannot be associated to a single line item.";

        var allItemDetails = [];
        var itemSearchColumns = [];
        var lineItemType = "";

        var itemsCount = tranRecord.getLineCount({ sublistId: ITEM_SUBLIST });
        var itemLineCount = 1;

        for (var i = 0; i < itemsCount; i++) {
            var lineItem = {};
            // get the type of item from line
            lineItem.itemType = tranRecord.getSublistValue({
                sublistId: ITEM_SUBLIST,
                fieldId: ITEM_TYPE,
                line: i,
            });

            var supportedTypes = [
                INV_ITEM,
                NON_INV_ITEM,
                DISCOUNT_ITEM,
                MARKUP_ITEM,
                SERVICE_ITEM,
                OTHER_CHARGE_ITEM,
                KIT_ITEM,
                EXPENSE_ITEM,
            ];
            var chargeAllowanceItems = [DISCOUNT_ITEM, MARKUP_ITEM];
            if (
                typeof lineItem.itemType === "string" &&
                supportedTypes.indexOf(lineItem.itemType) === -1
            ) {
                throw error.create({
                    name: ERR_ITEM_NOT_SUPPORTED_CODE,
                    message: ERR_ITEM_NOT_SUPPORTED_MSG,
                });
            } else if (
                typeof lineItem.itemType === "string" &&
                chargeAllowanceItems.indexOf(lineItem.itemType) > -1
            ) {
                if (i === 0) {
                    throw error.create({
                        name: ERR_UNSUPPORTED_FIRST_ITEMTYPE_CODE,
                        message: ERR_UNSUPPORTED_FIRST_ITEMTYPE_MSG,
                    });
                }

                // update the discount or charge in previous item
                var previtem = allItemDetails[itemLineCount - 2];

                // get the line item rate
                lineItem.rate = tranRecord.getSublistText({
                    sublistId: ITEM_SUBLIST,
                    fieldId: RATE_FLD,
                    line: i,
                });
                lineItem.rateValue = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: RATE_FLD,
                    line: i,
                });
                lineItem.amount = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: AMOUNT_FLD,
                    line: i,
                });

                previtem.amount = previtem.amount + lineItem.amount;
                if (typeof lineItem.amount === "number") {
                    if (lineItem.amount > 0) {
                        if (
                            !isNaN(previtem.lineCharge) &&
                            previtem.lineCharge !== 0
                        ) {
                            throw error.create({
                                name: ERR_MULTIPLE_LINECHARGES_CODE,
                                message: ERR_MULTIPLE_LINECHARGES_MSG,
                            });
                        }
                        previtem.lineCharge = lineItem.amount;
                        previtem.chargeRate = lineItem.rate;
                        previtem.chargeRateNum = lineItem.rateValue;
                    } else {
                        if (
                            !isNaN(previtem.lineDiscount) &&
                            previtem.lineDiscount !== 0
                        ) {
                            throw error.create({
                                name: ERR_MULTIPLE_LINEDISCOUNTS_CODE,
                                message: ERR_MULTIPLE_LINEDISCOUNTS_MSG,
                            });
                        }
                        previtem.lineDiscount = Math.abs(lineItem.amount);
                        previtem.discountRate = lineItem.rate;
                        previtem.discountRateNum = lineItem.rateValue;
                    }
                }
            } else {
                // get the details from transaction sublist - item
                lineItem.name = tranRecord.getSublistText({
                    sublistId: ITEM_SUBLIST,
                    fieldId: ITEM_FLD,
                    line: i,
                });
                lineItem.lineNumber = itemLineCount;
                itemLineCount = itemLineCount + 1; // count starts with zero
                lineItem.line = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: LINE_FLD,
                    line: i,
                });
                lineItem.rate = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: RATE_FLD,
                    line: i,
                });
                lineItem.quantity = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: QUANTITY_FLD,
                    line: i,
                });
                lineItem.amount = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: AMOUNT_FLD,
                    line: i,
                });
                lineItem.baseAmount = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: AMOUNT_FLD,
                    line: i,
                });
                lineItem.description = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: DESCRIPTION_FLD,
                    line: i,
                });
                lineItem.instanceNos = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: SERIAL_NOS_FLD,
                    line: i,
                });
                lineItem.isLotItem = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: IS_LOT_ITEM_FLD,
                    line: i,
                });
                lineItem.isSerialItem = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: IS_SERIAL_ITEM_FLD,
                    line: i,
                });
                var itemId = tranRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST,
                    fieldId: ITEM_FLD,
                    line: i,
                });

                lineItemType = "";
                switch (lineItem.itemType) {
                    case INV_ITEM:
                        lineItemType = search.Type.INVENTORY_ITEM;
                        break;
                    case NON_INV_ITEM:
                        lineItemType = search.Type.NON_INVENTORY_ITEM;
                        break;
                    case KIT_ITEM:
                        lineItemType = search.Type.KIT_ITEM;
                        break;
                    case SERVICE_ITEM:
                        lineItemType = search.Type.SERVICE_ITEM;
                        break;
                    case OTHER_CHARGE_ITEM:
                        lineItemType = search.Type.OTHER_CHARGE_ITEM;
                }

                if (lineItemType) {
                    if (MANUFACTURER_ITEMS_ARR.indexOf(lineItemType) !== -1) {
                        itemSearchColumns = [
                            MPN_FLD,
                            MANUF_TARIFF_FLD,
                            UPC_CODE_FLD,
                        ];
                    } else if (
                        NON_MANUFACTURER_ITEMS_ARR.indexOf(lineItemType) !== -1
                    ) {
                        itemSearchColumns = [UPC_CODE_FLD];
                    }

                    var itemSearch = search.lookupFields({
                        type: lineItemType,
                        id: itemId,
                        columns: itemSearchColumns,
                    });
                    lineItem.mpn = itemSearch[MPN_FLD];
                    lineItem.manufacturerTariff = itemSearch[MANUF_TARIFF_FLD];
                    lineItem.upcCode = itemSearch[UPC_CODE_FLD];
                }

                allItemDetails.push(lineItem);
            }
        }

        return allItemDetails;
    }

    /**
     * Returns "State" from address record id passed as parameter
     * @param addressId
     * @returns {string}
     */
    function getStateFromAddress(addressId) {
        var ADDRESS_RECORD = "address";
        var STATE_FLD = "state";
        var state = "";
        if (addressId) {
            var addressRec = record.load({
                type: ADDRESS_RECORD,
                id: addressId,
            });
            state = addressRec.getText(STATE_FLD);
        }

        return state;
    }

    return {
        inject: inject,
    };
});
