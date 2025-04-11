/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Convert failed inbound e-documents in bulk.
 *
 * Version    Date            Author           Remarks
 * 1.00       15 Nov 2016     esia
 *
 * @NApiVersion 2.x
 * @NScriptType mapreducescript
 */

define([
    "../../app/einvoice/app_einvoice_conversion_manager",
    "../../app/einvoice/app_einvoice_notifier",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../data/dao_convert_batch",
    "N/task",
    "N/search",
    "N/format",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../lib/translator",
    "../../lib/string_formatter",
], function (
    conversionMgr,
    notifier,
    licenseManager,
    batchDAO,
    task,
    search,
    formatter,
    freeCountryCheckHelper,
    translator,
    stringFormatter
) {
    // Inbound e-document record related
    var INBOUND_EDOC_RECORD = "customrecord_psg_ei_inbound_edoc";
    var EDOC_STATUS_FLD = "custrecord_psg_ei_inbound_status";
    var DATE_CREATED_FLD = "created";
    var VENDOR_FLD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FLD = "custrecord_psg_ei_inbound_customer";
    var TRAN_TYPE_FLD = "custrecord_psg_ei_inbound_transtype";
    var PO_VALIDATION_BYPASSED = "custrecord_psg_ei_bypassed_po_valid";
    var INTERNALID_FLD = "internalid";
    var CONVERSION_FAILED_STATUS = 14;
    var SUBSIDIARY = "subsidiary";
    var CONVERSION_FAILED = "Conversion Failed";

    // Error codes and messages
    var PO_VALIDATION_BYPASSED_MESSAGE =
        "The inbound e-document was included in the bulk conversion and was converted into vendor bill. The purchase order number present in the inbound e-document is not found in this account.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR =
        "Salesorder with internal ID: {ID} has the same PO#.Click Convert to create another sales order with same PO#.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR_CODE =
        "ei.duplicate.bulk.so.audit.trail.singular";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL =
        "Salesorder with internal ID: {CSV_ID_LIST} have the same PO#. Click Convert to create another sales order with same PO#.";
    var BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL_CODE =
        "ei.duplicate.bulk.so.audit.trail.plural";

    // Batch record related
    var CONVERT_BATCH_RECORD = "customrecord_psg_ei_conversion_batch";
    var DATE_CREATED_START_BATCH_FLD =
        "custrecord_psg_ei_convert_batch_start_da";
    var DATE_CREATED_END_BATCH_FIELD =
        "custrecord_psg_ei_convert_batch_end_date";
    var VENDOR_BATCH_FLD = "custrecord_psg_ei_convert_batch_vendor";
    var CUSTOMER_BATCH_FIELD = "custrecord_psg_ei_convert_batch_customer";
    var INBOUND_TRANS_BATCH_FLD = "custrecord_psg_ei_convert_inb_trans_typ";
    var OWNER_BATCH_FIELD = "owner";
    var PROCESSED_STATUS = 2;

    function getInputData() {
        var data = [];
        var finalData = [];

        var batchRecord = batchDAO.getBatch();
        if (batchRecord.length > 0) {
            var batchId = batchRecord[0].id;
            var startDate = formatter.format({
                value: batchRecord[0].getValue(DATE_CREATED_START_BATCH_FLD),
                type: formatter.Type.DATE,
            });
            var endDate = formatter.format({
                value: batchRecord[0].getValue(DATE_CREATED_END_BATCH_FIELD),
                type: formatter.Type.DATE,
            });
            var vendor = batchRecord[0].getValue(VENDOR_BATCH_FLD);
            var customer = batchRecord[0].getValue(CUSTOMER_BATCH_FIELD);
            var inbTranType = batchRecord[0].getValue(INBOUND_TRANS_BATCH_FLD);
            var batchOwner = batchRecord[0].getValue(OWNER_BATCH_FIELD);
            var searchFilters = [];

            // Status must be 'Conversion Failed'.
            searchFilters.push(
                search.createFilter({
                    name: EDOC_STATUS_FLD,
                    operator: search.Operator.ANYOF,
                    values: [CONVERSION_FAILED_STATUS],
                })
            );

            // Date Created From filter
            searchFilters.push(
                search.createFilter({
                    name: DATE_CREATED_FLD,
                    operator: search.Operator.ONORAFTER,
                    values: startDate,
                })
            );

            // Date Created To filter
            searchFilters.push(
                search.createFilter({
                    name: DATE_CREATED_FLD,
                    operator: search.Operator.ONORBEFORE,
                    values: endDate,
                })
            );

            // Vendor filter
            if (vendor) {
                searchFilters.push(
                    search.createFilter({
                        name: VENDOR_FLD,
                        operator: search.Operator.ANYOF,
                        values: vendor,
                    })
                );
            }

            // Customer filter
            if (customer) {
                searchFilters.push(
                    search.createFilter({
                        name: CUSTOMER_FLD,
                        operator: search.Operator.ANYOF,
                        values: customer,
                    })
                );
            }

            // Transaction Type filter
            if (inbTranType) {
                searchFilters.push(
                    search.createFilter({
                        name: TRAN_TYPE_FLD,
                        operator: search.Operator.ANYOF,
                        values: inbTranType.split(","),
                    })
                );
            }

            var allowedCountry =
                freeCountryCheckHelper.getValueOfAllowedFreeCountry();
            var allowedCountryInternalId =
                freeCountryCheckHelper.getInternalIdOfAllowedFreeCountry();

            // License check and filter
            var licenseInfo = licenseManager.getLicenseInfo();
            if (
                freeCountryCheckHelper.isOwAccount() &&
                !licenseInfo.hasLicense
            ) {
                var subsidiariesNameList =
                    freeCountryCheckHelper.getSubsidiariesNamesAssociatedWithFreeCountry(
                        allowedCountryInternalId
                    );
                // This will fetch all the inbound E-Documents which are in Conversion Failed status irrespective of
                // Free Country set in Company Information page.
                searchFilters.push(
                    search.createFilter({
                        name: "formulatext",
                        formula:
                            "{" +
                            VENDOR_FLD +
                            "." +
                            SUBSIDIARY +
                            "} || {" +
                            CUSTOMER_FLD +
                            "." +
                            SUBSIDIARY +
                            "}",
                        operator: search.Operator.CONTAINS,
                        values: subsidiariesNameList,
                    })
                );
            }

            var edocSearch = search.create({
                type: INBOUND_EDOC_RECORD,
                filters: searchFilters,
                columns: [
                    search.createColumn({
                        name: INTERNALID_FLD,
                        sort: search.Sort.ASC,
                    }),
                    VENDOR_FLD,
                    CUSTOMER_FLD,
                    TRAN_TYPE_FLD,
                    PO_VALIDATION_BYPASSED,
                ],
                endIndex: Infinity,
            });

            var searchResult = edocSearch.runPaged({
                pageSize: 1000,
            });
            searchResult.pageRanges.forEach(function (pageRange) {
                var currPage = searchResult.fetch({
                    index: pageRange.index,
                });
                currPage.data.forEach(function (result) {
                    data.push({
                        id: result.id,
                        vendor: result.getText(VENDOR_FLD),
                        customer: result.getText(CUSTOMER_FLD),
                        transType: result.getText(TRAN_TYPE_FLD),
                        poValidationBypassed: result.getValue(
                            PO_VALIDATION_BYPASSED
                        ),
                        batchOwner: batchOwner,
                        batchId: batchId,
                    });
                });
            });

            if (data.length === 0) {
                batchDAO.update(batchId, {
                    custrecord_psg_ei_convert_batch_status: PROCESSED_STATUS,
                });
            }
            // When license is inactive and free country is set in CI page then we need to filter out only those
            // Inbound E-Documents which belong to those Vendors whose subsidiary belongs to the same country as free country
            if (
                !licenseInfo.hasLicense &&
                freeCountryCheckHelper.isOwAccount()
            ) {
                for (var entityItem in data) {
                    var entityName = data[entityItem].vendor;
                    var entityType = search.Type.VENDOR;
                    if (!entityName) {
                        entityName = data[entityItem].customer;
                        entityType = search.Type.CUSTOMER;
                    }
                    var subsidiaryName =
                        freeCountryCheckHelper.getEntitySubsidiary(
                            entityName,
                            entityType
                        );
                    var subsidiaryCountry =
                        freeCountryCheckHelper.getEntitySubsidiaryCountry(
                            subsidiaryName
                        );
                    // If the inbound e-document's vendor's subsidiary country is same as free country we are adding it to a different array
                    if (allowedCountry === subsidiaryCountry) {
                        finalData.push(data[entityItem]);
                    }
                }
                data = finalData;
            }
        }
        return data;
    }

    function map(context) {
        var contextVal = JSON.parse(context.value);

        var recId = contextVal.id;
        var vendor = contextVal.vendor;
        var customer = contextVal.customer;
        var batchOwner = contextVal.batchOwner;
        var batchId = contextVal.batchId;

        var conversionDetails = {
            recId: recId,
            vendorName: vendor,
            customerName: customer,
            error: null,
            status: null,
        };

        try {
            var inboundEdocRec = conversionMgr.getInboundEDocRecord(
                recId,
                INBOUND_EDOC_RECORD
            );
            var parseResult = conversionMgr.parseInboundEdoc(
                inboundEdocRec,
                batchOwner,
                true
            );
            var conversionResult = {
                success: false,
            };
            var bulkErrMsg = "";
            var bulkErrMsgParams = {};
            if (parseResult.success) {
                if (parseResult.duplicateSoArr.length === 1) {
                    bulkErrMsg =
                        translator.getString(
                            BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR_CODE
                        ) || BULK_DUPLICATE_SO_AUDIT_TRAIL_SINGULAR;
                    bulkErrMsgParams = {
                        ID: parseResult.duplicateSoArr[0],
                    };
                    stringFormatter.setString(bulkErrMsg);
                    stringFormatter.replaceParameters(bulkErrMsgParams);
                    bulkErrMsg = stringFormatter.toString();
                    conversionResult.success = true;
                } else if (parseResult.duplicateSoArr.length > 1) {
                    bulkErrMsg =
                        translator.getString(
                            BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL_CODE
                        ) || BULK_DUPLICATE_SO_AUDIT_TRAIL_PLURAL;
                    bulkErrMsgParams = {
                        CSV_ID_LIST: parseResult.duplicateSoArr.join(", "),
                    };
                    stringFormatter.setString(bulkErrMsg);
                    stringFormatter.replaceParameters(bulkErrMsgParams);
                    bulkErrMsg = stringFormatter.toString();
                    conversionResult.success = true;
                } else {
                    conversionResult = conversionMgr.createTransaction(
                        inboundEdocRec,
                        parseResult,
                        batchOwner,
                        true
                    );
                }
            } else {
                conversionResult.message = parseResult.message;
            }
            var bypassedPOValidation = conversionResult.poValidationBypassed;
            if (!conversionResult.success) {
                conversionDetails.error = conversionResult.message;
                conversionDetails.status = CONVERSION_FAILED;
            } else if (bypassedPOValidation === true) {
                conversionDetails.error = PO_VALIDATION_BYPASSED_MESSAGE;
            } else if (parseResult.duplicateSoArr.length) {
                conversionDetails.error = bulkErrMsg;
                conversionDetails.status = CONVERSION_FAILED;
            } else {
                conversionDetails.error = "Converted";
            }
        } catch (e) {
            log.error("EI_SS_CONVERSION_ERROR", e);
            conversionDetails.error = e;
        }

        context.write(batchId, conversionDetails);
    }

    function reduce(context) {
        var batchId = context.key;
        var conversionDetails = context.values;

        var result = search.lookupFields({
            type: CONVERT_BATCH_RECORD,
            id: batchId,
            columns: OWNER_BATCH_FIELD,
        });

        var batchOwner = result.owner[0].value;
        var errorCount = 0;
        var details;
        var detailCount = conversionDetails.length;
        for (var i = 0; i < detailCount; i++) {
            details = JSON.parse(conversionDetails[i]);

            if (details.status === CONVERSION_FAILED) {
                errorCount++;
            }
        }

        //At least one e-document was converted
        if (detailCount > 0 && errorCount < detailCount) {
            licenseManager.lockFreeCountry();
        }

        notifier.notifyConversionBatchOwner(
            batchOwner,
            conversionDetails,
            errorCount
        );
        batchDAO.update(batchId, {
            custrecord_psg_ei_convert_batch_status: PROCESSED_STATUS,
        });
    }

    function summarize() {
        var SCRIPT_ID = "customscript_ei_conversion_rescheduler";
        var DEPLOYMENT_ID = "customdeploy_ei_conversion_rescheduler";

        var batches = batchDAO.getBatch();
        if (batches.length > 0) {
            var ssTask = task.create({
                taskType: task.TaskType.SCHEDULED_SCRIPT,
            });
            ssTask.scriptId = SCRIPT_ID;
            ssTask.deploymentId = DEPLOYMENT_ID;
            ssTask.submit();
        }
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize,
    };
});
