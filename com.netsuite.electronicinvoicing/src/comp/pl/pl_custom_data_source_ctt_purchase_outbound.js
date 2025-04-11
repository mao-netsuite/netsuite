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
        var VEND_PEPPOL_ID_FLD = "custentity_psg_ei_peppol_id";
        var VEND_COMPANY_NAME_FLD = "companyname";
        var COMPANY_COUNTRY_FLD = "country";
        var COMPANY_VAT_REG_NO_FLD = "employerid";
        var COMPANY_MAIN_ADDRESS_FLD = "mainaddress";
        var SUBSIDIARY_PREF_PEPPOL_ID_FLD = "custrecord_psg_ei_peppol_id";
        var SUBSIDIARY_PREF_SUB_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
        var BILL_ADDRESS_FLD = "billaddress";
        var SUBSIDIARY_FLD = "subsidiary";
        var ENTITY_FLD = "entity";
        var INCOTERM_FLD = "incoterm";
        var ERR_PEPPOL_ID_BLANK_CODE = "ERROR_PEPPOL_ID_CANNOT_BE_BLANK";
        var ERR_VENDOR_PEPPOL_ID_BLANK_MSG =
            "PEPPOL ID field present under the E-Document tab in the {VENDOR_NAME} vendor record does not contain any value. Provide valid PEPPOL ID in the vendor record.";
        var ERR_SUBSIDIARY_PEPPOL_ID_BLANK_MSG =
            "PEPPOL ID field present in the {SUBSIDIARY_NAME} subsidiary preference record does not contain any value. Provide valid PEPPOL ID in the subsidiary preference record.";
        var vatRegNo = "";
        var customData = {};
        var itemDetails = [];
        var vendPeppolIdArr = [];
        var subPeppolIdArr = [];
        var subCountryISOCode = "";
        var subState = "";
        var addressId = "";

        try {
            var tranType = params.transactionRecord.type;
            var tranId = params.transactionRecord.id;
            var tranRecord = record.load({
                type: tranType,
                id: tranId,
            });

            var vendId = tranRecord.getValue(ENTITY_FLD);
            var subId = tranRecord.getValue(SUBSIDIARY_FLD);

            // Vendor Record
            var vendorRec = record.load({
                type: record.Type.VENDOR,
                id: vendId,
            });

            // Vendor PEPPOL ID
            var vendPeppolId = vendorRec.getValue(VEND_PEPPOL_ID_FLD);
            if (!vendPeppolId) {
                var vendorCompanyName = vendorRec.getValue(
                    VEND_COMPANY_NAME_FLD
                );
                throw error.create({
                    name: ERR_PEPPOL_ID_BLANK_CODE,
                    message: ERR_VENDOR_PEPPOL_ID_BLANK_MSG.replace(
                        "{VENDOR_NAME}",
                        vendorCompanyName
                    ),
                });
            }
            vendPeppolIdArr = vendPeppolId.split(PEPPOL_ID_DELIMITER);

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

            //Incoterm
            var incoterm = getIncoterm(tranRecord.getValue(INCOTERM_FLD));

            // Fetches attachment details
            var attachmentDetails = getAttachmentDetails(tranType, tranId);

            //To get the country of Transaction's Billing Address
            var billingAddress = tranRecord
                .getValue(BILL_ADDRESS_FLD)
                .split("\n");
            var getCountry = billingAddress.length;
            var billCountry = billingAddress[getCountry - 1];
            var ISOCodeBillCountry = getCountryISOCode(billCountry); // Retrieves the ISO Code for the Billing Country

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
                vendPeppolId: {
                    endPointId: vendPeppolIdArr[1],
                    schemeId: vendPeppolIdArr[0],
                },
                billCountryISOCode: ISOCodeBillCountry,
                itemDetails: itemDetails,
                attachmentDetails: attachmentDetails,
                incoterm: incoterm,
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
        var DISCOUNT_ITEM = "Discount";
        var MARKUP_ITEM = "Markup";
        var SERVICE_ITEM = "Service";
        var OTHER_CHARGE_ITEM = "OthCharge";
        var EXPENSE_ITEM = "Expense";
        var ITEM_SUBLIST = "item";
        var ITEM_FLD = "item";
        var ITEM_TYPE = "itemtype";
        var RATE_FLD = "rate";
        var LINE_FLD = "line";
        var AMOUNT_FLD = "amount";
        var DESCRIPTION_FLD = "description";
        var QUANTITY_FLD = "quantity";
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

                allItemDetails.push(lineItem);
            }
        }

        return allItemDetails;
    }

    /**
     * Returns details of transaction's attachments (Ex: name, type, id)
     * @param tranType
     * @param tranId
     * @returns {*[]}
     */
    function getAttachmentDetails(tranType, tranId) {
        var FILE_RECORD = "file";
        var INTERNAL_ID_FLD = "internalid";
        var DESCRIPTION_FLD = "description";
        var FILE_TYPE_FLD = "filetype";
        var NAME_FLD = "name";
        var RECORD_TYPE_FIELD = "recordtype";
        var MAINLINE = "mainline";
        var attachmentDetailsArr = [];
        var SUPPORTED_FILE_TYPES = ["PDF", "JPGIMAGE", "PNGIMAGE", "TIFFIMAGE"];
        var mainLineFilter = search.createFilter({
            name: MAINLINE,
            operator: search.Operator.IS,
            values: ["T"],
        });
        var tranTypeMatchFilter = search.createFilter({
            name: RECORD_TYPE_FIELD,
            operator: search.Operator.IS,
            values: tranType,
        });
        var tranIdMatchFilter = search.createFilter({
            name: INTERNAL_ID_FLD,
            operator: search.Operator.IS,
            values: tranId,
        });
        var fileIdColumn = search.createColumn({
            name: INTERNAL_ID_FLD,
            join: FILE_RECORD,
        });
        var fileDescriptionColumn = search.createColumn({
            name: DESCRIPTION_FLD,
            join: FILE_RECORD,
        });
        var fileTypeColumn = search.createColumn({
            name: FILE_TYPE_FLD,
            join: FILE_RECORD,
        });
        var fileNameColumn = search.createColumn({
            name: NAME_FLD,
            join: FILE_RECORD,
        });

        var fileSearch = search.create({
            type: search.Type.TRANSACTION,
            filters: [tranTypeMatchFilter, tranIdMatchFilter, mainLineFilter],
            columns: [
                fileIdColumn,
                fileDescriptionColumn,
                fileTypeColumn,
                fileNameColumn,
            ],
        });

        fileSearch.run().each(function (result) {
            var attachmentObj = {
                id: result.getValue({
                    name: INTERNAL_ID_FLD,
                    join: FILE_RECORD,
                }),
                description: result.getValue({
                    name: DESCRIPTION_FLD,
                    join: FILE_RECORD,
                }),
                type: result.getValue({
                    name: FILE_TYPE_FLD,
                    join: FILE_RECORD,
                }),
                name: result.getValue({ name: NAME_FLD, join: FILE_RECORD }),
            };

            if (SUPPORTED_FILE_TYPES.indexOf(attachmentObj.type) !== -1) {
                attachmentObj.mimeCode = getMimeCode(attachmentObj.type);
                attachmentDetailsArr.push(attachmentObj);
            }

            return true;
        });

        return attachmentDetailsArr;
    }

    /**
     * Returns mime code of the file type
     * @param fileType
     * @returns {string}
     */
    function getMimeCode(fileType) {
        var mimeCode = "";
        switch (fileType) {
            case "PDF":
                mimeCode = "application/pdf";
                break;
            case "JPGIMAGE":
                mimeCode = "image/jpeg";
                break;
            case "PNGIMAGE":
                mimeCode = "image/png";
                break;
            case "TIFFIMAGE":
                mimeCode = "image/tiff";
                break;
        }

        return mimeCode;
    }

    /**
     * Returns 'Related Incoterm' from incoterm record based on parameter passed
     * @param incotermId
     * @returns {string}
     */
    function getIncoterm(incotermId) {
        var INCOTERM_RECORD = "incoterm";
        var RELATED_INCOTERM_FLD = "relatedincoterm";
        var relatedIncoterm = "";
        if (incotermId) {
            var incotermRec = record.load({
                type: INCOTERM_RECORD,
                id: incotermId,
            });

            relatedIncoterm = incotermRec.getText(RELATED_INCOTERM_FLD);
        }
        return relatedIncoterm;
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
