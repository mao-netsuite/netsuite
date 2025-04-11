/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Map/Reduce Script for Bulk Conversion
 *
 * Version    Date            Author           Remarks
 * 1.00       20 Oct 2016     ssantiago
 *
 * @NApiVersion 2.x
 * @NScriptType mapreducescript
 */

define([
    "N/search",
    "../../app/einvoice/app_einvoice_conversion_manager",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../lib/translator",
    "N/error",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../lib/string_formatter",
    "../../app/audit/app_audit_manager",
], function (
    search,
    conversionMgr,
    notifier,
    licenseManager,
    translator,
    error,
    freeCountryCheckHelper,
    stringFormatter,
    auditManager
) {
    var FOR_CONVERSION = 11;
    var INBOUND_EDOC_RECORD_TYPE = "customrecord_psg_ei_inbound_edoc";
    var VENDOR_FLD_ID = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FLD_ID = "custrecord_psg_ei_inbound_customer";
    var SUBSIDIARY_FLD_ID = "subsidiary";
    var INTERNAL_ID = "internalid";

    //Error codes and messages
    var NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";
    var LICENSE_CLIENT_UNAVAILABLE_CODE = "license.notinstalled";
    var CONFIGURE_FREE_COUNTRY_CODE = "inbound.configurefreecountry";
    var LICENSE_CLIENT_UNAVAILABLE_MSG =
        "The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.";
    var CONFIGURE_FREE_COUNTRY_MSG =
        "This account does not have an active license to use the Electronic Invoicing SuiteApp in multiple countries. To convert e-documents in bulk, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR =
        "Salesorder with internal ID: {ID} has the same PO#.Click Convert to create another sales order with same PO#.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR_CODE =
        "ei.duplicate.bulk.so.audit.trail.singular";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL =
        "Salesorder with internal ID: {CSV_ID_LIST} have the same PO#. Click Convert to create another sales order with same PO#.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL_CODE =
        "ei.duplicate.bulk.so.audit.trail.plural";

    /**
     * Function to get translation strings from translator module
     * @returns void
     */
    function getTranslations() {
        LICENSE_CLIENT_UNAVAILABLE_MSG =
            translator.getString(LICENSE_CLIENT_UNAVAILABLE_CODE) ||
            LICENSE_CLIENT_UNAVAILABLE_MSG;
        CONFIGURE_FREE_COUNTRY_MSG =
            translator.getString(CONFIGURE_FREE_COUNTRY_CODE) ||
            CONFIGURE_FREE_COUNTRY_MSG;
    }

    function getInputData() {
        log.debug("mr_einvoice_converter.js", "getInputData() Started");
        getTranslations();
        var data = [];
        var subsidiariesNameList = [];

        var licenseInfo = licenseManager.getLicenseInfo();
        log.debug(
            "getInputData()",
            "licenseInfo.hasLicense ->" + licenseInfo.hasLicense
        );
        log.debug(
            "getInputData()",
            "licenseInfo.errorCode ->" + licenseInfo.errorCode
        );
        var errorParams = {
            name: "EI_AUTOMATIC_CONVERSION_ERROR",
            message: "",
            notifyOff: false, // intended to send to all admins
        };
        var allowedCountryInCompanyInfo =
            freeCountryCheckHelper.getValueOfAllowedFreeCountry();
        var allowedCountryInternalId =
            freeCountryCheckHelper.getInternalIdOfAllowedFreeCountry();
        var isOwAccount = freeCountryCheckHelper.isOwAccount();

        log.debug(
            "getInputData()",
            "allowedCountryInCompanyInfo is " + allowedCountryInCompanyInfo
        );
        log.debug(
            "getInputData()",
            "allowedCountryInternalId is " + allowedCountryInternalId
        );
        log.debug("getInputData()", "isOwAccount is " + isOwAccount);

        var filters = [
            search.createFilter({
                name: "custrecord_psg_ei_inbound_status",
                operator: search.Operator.ANYOF,
                values: [FOR_CONVERSION],
            }),
        ];
        var inboundSearchColumns = [
            INTERNAL_ID,
            VENDOR_FLD_ID,
            CUSTOMER_FLD_ID,
        ];

        if (
            !licenseInfo.hasLicense &&
            licenseInfo.errorCode === NO_LICENSE_CLIENT_CODE
        ) {
            errorParams.message = LICENSE_CLIENT_UNAVAILABLE_MSG;
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        } else if (isOwAccount) {
            inboundSearchColumns.push(
                search.createColumn({
                    name: SUBSIDIARY_FLD_ID,
                    join: CUSTOMER_FLD_ID,
                })
            );
            inboundSearchColumns.push(
                search.createColumn({
                    name: SUBSIDIARY_FLD_ID,
                    join: VENDOR_FLD_ID,
                })
            );
            if (!licenseInfo.hasLicense) {
                if (!allowedCountryInCompanyInfo) {
                    errorParams.message = CONFIGURE_FREE_COUNTRY_MSG;
                    log.error(errorParams.name, errorParams.message);
                    throw error.create(errorParams);
                }
                subsidiariesNameList =
                    freeCountryCheckHelper.getSubsidiariesNamesAssociatedWithFreeCountry(
                        allowedCountryInternalId
                    );
                log.debug(
                    "getInputData() -> subsidiariesNameList ",
                    subsidiariesNameList
                );
                filters.push(
                    search.createFilter({
                        name: "formulatext",
                        formula:
                            "{custrecord_psg_ei_inbound_vendor.subsidiary} || {custrecord_psg_ei_inbound_customer.subsidiary}",
                        operator: search.Operator.CONTAINS,
                        values: subsidiariesNameList,
                    })
                );
            }
        }

        var inboundEdocSearch = search.create({
            type: INBOUND_EDOC_RECORD_TYPE,
            columns: inboundSearchColumns,
            filters: filters,
            endIndex: Infinity,
        });

        var searchResult = inboundEdocSearch.runPaged({ pageSize: 1000 });
        searchResult.pageRanges.forEach(function (pageRange) {
            var currPage = searchResult.fetch({ index: pageRange.index });
            currPage.data.forEach(function (result) {
                var vendorName = result.getText(VENDOR_FLD_ID);
                var customerName = result.getText(CUSTOMER_FLD_ID);
                var vendorId = result.getValue(VENDOR_FLD_ID);
                var customerId = result.getValue(CUSTOMER_FLD_ID);
                var customerSubsidiary = result.getText({
                    name: SUBSIDIARY_FLD_ID,
                    join: CUSTOMER_FLD_ID,
                });
                var vendorSubsidiary = result.getText({
                    name: SUBSIDIARY_FLD_ID,
                    join: VENDOR_FLD_ID,
                });
                var inboundEDocObj = {
                    id: result.id,
                    entityId: vendorId || customerId,
                    recordType: result.recordType,
                    vendorName: vendorName,
                    customerName: customerName,
                };
                if (licenseInfo.hasLicense || !isOwAccount) {
                    data.push(inboundEDocObj);
                } else if (isOwAccount) {
                    var entitySubsidiary =
                        customerSubsidiary || vendorSubsidiary;
                    if (subsidiariesNameList.indexOf(entitySubsidiary) !== -1) {
                        data.push(inboundEDocObj);
                    }
                }
            });
        });
        log.debug("mr_einvoice_converter.js", "getInputData() Finished");
        return data;
    }

    function map(context) {
        var contextVal = JSON.parse(context.value);
        var recId = contextVal.id;
        var recType = contextVal.recordType;
        var vendorName = contextVal.vendorName;
        var customerName = contextVal.customerName;
        var entityId = contextVal.entityId;

        log.debug(
            "Map() -- id: " + recId,
            "recType: " + recType + " vendorName: " + vendorName
        );
        log.debug(
            "Map() -- id: " + recId,
            "recType: " + recType + " customerName: " + customerName
        );

        try {
            var inboundEDocRec = conversionMgr.getInboundEDocRecord(
                recId,
                recType
            );
            var owner = notifier.getFirstActiveAdmin();

            log.debug(
                "Map() -- id: " + recId,
                "inboundEDocRec id: " + inboundEDocRec.id
            );
            log.debug("Map() -- id: " + recId, "owner: " + owner);

            var parseResult = conversionMgr.parseInboundEdoc(
                inboundEDocRec,
                owner,
                true
            );
            var bulkErrMsg = "";
            var bulkErrMsgParams = {};
            var conversionResult = {
                success: false,
                vendorName: vendorName,
                customerName: customerName,
            };
            var inboundEdocParams = {
                inboundEDoc: inboundEDocRec.id,
                entity: entityId,
                owner: owner,
                details: "",
            };
            if (parseResult.success) {
                if (parseResult.duplicateSoArr.length === 1) {
                    bulkErrMsg =
                        translator.getString(
                            BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR_CODE
                        ) || BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR;
                    bulkErrMsgParams = {
                        ID: parseResult.duplicateSoArr[0],
                    };
                    bulkErrMsg = createAuditTrailForInboundEdoc(
                        bulkErrMsg,
                        bulkErrMsgParams,
                        inboundEdocParams
                    );
                    conversionResult.message = bulkErrMsg;
                } else if (parseResult.duplicateSoArr.length > 1) {
                    bulkErrMsg =
                        translator.getString(
                            BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL_CODE
                        ) || BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL;
                    bulkErrMsgParams = {
                        CSV_ID_LIST: parseResult.duplicateSoArr.join(", "),
                    };
                    bulkErrMsg = createAuditTrailForInboundEdoc(
                        bulkErrMsg,
                        bulkErrMsgParams,
                        inboundEdocParams
                    );
                    conversionResult.message = bulkErrMsg;
                } else {
                    conversionResult = conversionMgr.createTransaction(
                        inboundEDocRec,
                        parseResult,
                        owner,
                        true
                    );
                    conversionResult.customerName = customerName;
                    conversionResult.vendorName = vendorName;
                }
            } else {
                conversionResult.message = parseResult.message;
            }

            log.debug(
                "Map() -- id: " + recId,
                "Conversion Result: " + JSON.stringify(conversionResult)
            );

            if (!conversionResult.success) {
                conversionResult.id = recId;
                context.write(owner, conversionResult);
                log.error("owner", owner);
                log.error("conversionResult", conversionResult);
            }
            log.debug("mr_einvoice_converter.js", "Map Finished");
        } catch (e) {
            log.error("map error", e);
        }
    }

    function reduce(context) {
        log.debug("mr_einvoice_converter.js", "Reduce Started");
        var owner = context.key;
        var values = context.values;
        log.error("values", values);
        var errorCount = 0;
        var detailCount = values.length;

        for (var i = 0; i < values.length; i++) {
            var conversionResult = JSON.parse(values[i]);
            if (conversionResult.success === false) {
                errorCount++;
            }
        }

        //At least one e-document was converted
        if (detailCount > 0 && errorCount < detailCount) {
            licenseManager.lockFreeCountry();
        }

        if (errorCount > 0) {
            notifier.notifyConversionError(owner, context.values);
        }
        log.debug("mr_einvoice_converter.js", "Reduce Finished");
    }

    /**
     * Creates for conversion log on inbound edoc with required string passed to function and returns the updated string
     * @param errString
     * @param errParams
     * @param inboundEdocParams
     * @returns
     */
    function createAuditTrailForInboundEdoc(
        errString,
        errParams,
        inboundEdocParams
    ) {
        stringFormatter.setString(errString);
        stringFormatter.replaceParameters(errParams);
        var bulkErrMsg = stringFormatter.toString();
        auditManager.logForConversion({
            inboundEDoc: inboundEdocParams.inboundEDoc,
            entity: inboundEdocParams.entity,
            owner: inboundEdocParams.owner,
            details: bulkErrMsg,
        });
        return bulkErrMsg;
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
    };
});
