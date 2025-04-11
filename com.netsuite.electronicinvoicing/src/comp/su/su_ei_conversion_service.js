/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 * otherwise make available this code.

 * 

 * Service call for converting inbound e-documents to transactions.

 * 

 * Version    Date            Author           Remarks

 * 1.00       19 Aug 2016     esia

 *

 * @NApiVersion 2.x

 * @NScriptType Suitelet

 * 

 */

define([
    "../../app/einvoice/app_einvoice_conversion_manager",

    "../../app/einvoice/app_einvoice_license_manager",

    "N/runtime",

    "N/record",

    "N/search",

    "../../lib/translator",

    "../../app/einvoice/app_einvoice_free_country_check_helper",

    "../../lib/app/app_transaction_type_map.js",
], function (
    conversionMgr,
    licenseManager,
    runtime,
    record,
    search,
    translator,
    freeCountryCheckHelper,
    transactionMap
) {
    var DEFAULT_ERROR_CODE = "ei.conversion.defaulterror";

    var DUPLICATE_SO_INFO_CODE = "ei.conversion.duplicatesoinfo";

    var EI_INACTIVE_VENDOR_CODE = "ei.conversion.inactivevendor";

    var EI_INACTIVE_CUSTOMER_CODE = "ei.conversion.inactivecustomer";

    var CONVERSION_COMPLETE_CODE = "ei.conversion.conversioncomplete";

    var INBOUND_VENDOR_FIELD = "custrecord_psg_ei_inbound_vendor";

    var INBOUND_CUSTOMER_FIELD = "custrecord_psg_ei_inbound_customer";

    var NO_LICENSE_CLIENT_CODE = "EI_NO_NSLC";

    var SUBSIDIARY = "subsidiary";

    var DEFAULT_ERROR_MSG =
        "An error occurred during conversion. Please check the E-Document Audit Trail on the E-Document subtab for details.";

    var EI_INACTIVE_VENDOR_MSG =
        "Unable to convert this inbound e-document because the selected vendor is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the vendor record, then try converting the e-document again.";

    var EI_INACTIVE_CUSTOMER_MSG =
        "Unable to convert this inbound e-document because the selected customer is inactive. " +
        "The E-Document Status field has not been updated and an audit trail has not been created. " +
        "Clear the Inactive box on the customer record, then try converting the e-document again.";

    function getTranslations() {
        DEFAULT_ERROR_MSG =
            translator.getString(DEFAULT_ERROR_CODE) || DEFAULT_ERROR_MSG;

        EI_INACTIVE_CUSTOMER_MSG =
            translator.getString(EI_INACTIVE_CUSTOMER_CODE) ||
            EI_INACTIVE_CUSTOMER_MSG;

        EI_INACTIVE_VENDOR_MSG =
            translator.getString(EI_INACTIVE_VENDOR_CODE) ||
            EI_INACTIVE_VENDOR_MSG;
    }

    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        var parameters = request.parameters;

        var result = {
            success: true,
            message: "",
            data: {},
        };

        var licenseInfo = licenseManager.getLicenseInfo();

        if (!licenseInfo.hasLicense) {
            var tranType = parameters.tranType;
            var entityFld = INBOUND_VENDOR_FIELD;
            var subsidiaryInternalId;

            if (transactionMap.isSalesTransaction(tranType)) {
                entityFld = INBOUND_CUSTOMER_FIELD;
            }

            if (licenseInfo.errorCode === NO_LICENSE_CLIENT_CODE) {
                result.success = false;
                result.data.reload = true;
            } else if (freeCountryCheckHelper.isOwAccount()) {
                var subsidiaryLookup = search.lookupFields({
                    type: parameters.recType,
                    id: parameters.recId,
                    columns: [entityFld + "." + SUBSIDIARY],
                });

                subsidiaryInternalId =
                    subsidiaryLookup[entityFld + "." + SUBSIDIARY][0].value;

                var companyInfoCountry =
                    freeCountryCheckHelper.getValueOfAllowedFreeCountry();

                if (
                    !companyInfoCountry ||
                    companyInfoCountry.length === 0 ||
                    !freeCountryCheckHelper.ifFreeCountrySameAsInTxn(
                        subsidiaryInternalId
                    )
                ) {
                    result.success = false;
                    result.data.reload = true;
                }
            }
        }

        if (result.success) {
            var bundleId = runtime.getCurrentScript().bundleIds[0];

            result.data.bundleId = bundleId;

            var recId = parameters.recId;
            var recType = parameters.recType;
            var isParseEdoc = parameters.isParseEdoc;
            var currUser = runtime.getCurrentUser();
            var inboundEdocRecord = conversionMgr.getInboundEDocRecord(
                recId,
                recType
            );
            var conversionResult;

            if (isParseEdoc) {
                conversionResult = conversionMgr.parseInboundEdoc(
                    inboundEdocRecord,
                    currUser.id,
                    false
                );
                if (conversionResult.success) {
                    result.data.content = conversionResult.content;
                    result.data.duplicateSoArr =
                        conversionResult.duplicateSoArr || [];
                }
            } else {
                var parsedContent = parameters.parsedContent;
                var duplicateSoData = parameters.duplicateSoData;
                var parsedContentObj = {
                    content: JSON.parse(parsedContent),
                    duplicateSoArr: JSON.parse(duplicateSoData),
                };
                conversionResult = conversionMgr.createTransaction(
                    inboundEdocRecord,
                    parsedContentObj,
                    currUser.id,
                    false
                );
                if (conversionResult.success) {
                    licenseManager.lockFreeCountry();
                    result.data.messageCode = CONVERSION_COMPLETE_CODE;
                    result.data.messageType = "c";
                    result.data.transactionId = conversionResult.transactionId;
                    result.data.transactionType =
                        conversionResult.transactionType;
                    result.data.duplicateSoArr =
                        parsedContentObj.duplicateSoArr;
                    if (result.data.duplicateSoArr.length) {
                        result.data.messageType = "i";
                        result.data.messageCode = DUPLICATE_SO_INFO_CODE;
                    }
                }
            }

            if (!conversionResult.success) {
                result.success = false;
                result.message = getMessagePrompt(conversionResult);
                var notifDef =
                    getUnsuccessfulNotificationDefinition(conversionResult);
                result.data.messageCode = notifDef.code;
                result.data.messageType = notifDef.type;
            }
        }

        response.write(JSON.stringify(result));
    }

    function getMessagePrompt(conversionResult) {
        var message = conversionResult.message;

        var entityType = conversionResult.entityType;

        var msg = DEFAULT_ERROR_MSG;

        getTranslations();

        if (message.indexOf("EI_INACTIVE_ENTITY") !== -1) {
            if (entityType === record.Type.CUSTOMER) {
                msg = EI_INACTIVE_CUSTOMER_MSG;
            } else {
                msg = EI_INACTIVE_VENDOR_MSG;
            }
        }

        return msg;
    }

    function getUnsuccessfulNotificationDefinition(conversionResult) {
        var message = conversionResult.message;

        var entityType = conversionResult.entityType;

        var code = DEFAULT_ERROR_CODE;

        var type = "e";

        if (message.indexOf("EI_INACTIVE_ENTITY") !== -1) {
            if (entityType === record.Type.CUSTOMER) {
                code = EI_INACTIVE_CUSTOMER_CODE;
            } else {
                code = EI_INACTIVE_VENDOR_CODE;
            }

            type = "w";
        }

        return { code: code, type: type };
    }

    return {
        onRequest: onRequest,
    };
});
