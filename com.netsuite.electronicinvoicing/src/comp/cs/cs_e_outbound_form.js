/**
 * @preserve
 * Client-side script attached to Sending Search Suitelet
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

define([
    "../../lib/app/app_transaction_type_map",
    "N/ui/message",
    "../../lib/translator",
    "../../lib/string_formatter",
    "N/format",
    "N/url",
    "N/https",
    "../../app/einvoice/app_einvoice_client_form_license_check",
    "../../app/einvoice/app_einvoice_license_check_for_urlparams",
], function (
    transactionTypeMap,
    message,
    translator,
    stringFormatter,
    formatter,
    url,
    https,
    clientLicenseCheck,
    licenseCheckForUrlParams
) {
    var CUSTOMER_FIELD_ID = "custpage_outbound_cust";
    var VENDOR_FIELD_ID = "custpage_outbound_vendor";
    var SUBSIDIARY_FIELD_ID = "custpage_outbound_subs";
    var TRAN_TYPE_FIELD_ID = "custpage_outbound_tran_type";
    var TRAN_DATE_FROM_FIELD_ID = "custpage_outbound_tran_date_start";
    var TRAN_DATE_TO_FIELD_ID = "custpage_outbound_tran_date_end";
    var HAS_LICENSE_FIELD_ID = "custpage_outbound_has_license";
    var COUNTRY_SETUP_FIELD_ID = "custpage_outbound_free_country";
    var HAS_LICENSE_CLIENT_FIELD_ID = "custpage_outbound_has_license_client";
    var FREE_COUNTRY_FIELD_ID = "custpage_outbound_free_country";
    var ENTITY_TYPE_FIELD = "custpage_outbound_e_type";
    var SENDING_TYPE_FIELD = "custpage_outbound_sending_type";
    var INVALID_TRANSACTION_TYPE_TITLE_CODE = "outbound.invalidtypetitle";
    var INVALID_ENTITY_TRANSACTION_CODE = "outbound.invalidentitytransaction";
    var INVALID_TRANSACTION_TYPE_CODE = "outbound.invalidtype";
    var INVALID_TRANSACTION_DATES_CODE = "outbound.invaliddates";
    var BULK_SENDING_ONGOING_CODE = "outbound.msg.sendingongoing";
    var NO_LICENSE_CLIENT_CODE = "license.notinstalled";
    var CONFIGURE_FREE_COUNTRY_CODE = "outbound.configurefreecountry";
    var stringMap = [];
    var INVALID_TRANSACTION_TYPE_TITLE_MSG = "Invalid Transaction Types";
    var INVALID_TRANSACTION_TYPE_MSG =
        "The following transaction types are currently not supported: {TRANSACTIONTYPES}";
    var INVALID_ENTITY_TRANSACTION_MSG =
        "The following transaction types are not valid for the selected entity: {TRANSACTIONTYPES}";
    var INVALID_TRANSACTION_DATES_MSG =
        "The Transaction Date From must not be later than the Transaction Date To.";
    var BULK_SENDING_ONGOING_MSG =
        "The e-document is currently being sent. You will receive an email when the process is complete.";
    var NO_LICENSE_CLIENT_MSG =
        "The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.";
    var CONFIGURE_FREE_COUNTRY_MSG =
        "This account does not have an active license for multi-country use of Electronic Invoicing. To send e-documents by bulk, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page.";
    var LICENSE_INFO_SU_SCRIPT = "customscript_ei_license_info_service_su";
    var LICENSE_INFO_SU_DEPLOY = "customdeploy_ei_license_info_service_su";
    var NO_LICENSE_CLIENT_ERROR_CODE = "EI_NO_NSLC";
    var messageBanner;

    function getTranslations() {
        stringMap = translator.getStringMap([
            INVALID_TRANSACTION_TYPE_TITLE_CODE,
            INVALID_TRANSACTION_TYPE_CODE,
            INVALID_TRANSACTION_DATES_CODE,
            BULK_SENDING_ONGOING_CODE,
            CONFIGURE_FREE_COUNTRY_CODE,
            NO_LICENSE_CLIENT_CODE,
            INVALID_ENTITY_TRANSACTION_CODE,
        ]);
        INVALID_TRANSACTION_TYPE_TITLE_MSG =
            stringMap[INVALID_TRANSACTION_TYPE_TITLE_CODE] ||
            INVALID_TRANSACTION_TYPE_TITLE_MSG;
        INVALID_TRANSACTION_TYPE_MSG =
            stringMap[INVALID_TRANSACTION_TYPE_CODE] ||
            INVALID_TRANSACTION_TYPE_MSG;
        INVALID_ENTITY_TRANSACTION_MSG =
            stringMap[INVALID_ENTITY_TRANSACTION_CODE] ||
            INVALID_ENTITY_TRANSACTION_MSG;
        INVALID_TRANSACTION_DATES_MSG =
            stringMap[INVALID_TRANSACTION_DATES_CODE] ||
            INVALID_TRANSACTION_DATES_MSG;
        BULK_SENDING_ONGOING_MSG =
            stringMap[BULK_SENDING_ONGOING_CODE] || BULK_SENDING_ONGOING_MSG;
        NO_LICENSE_CLIENT_MSG =
            stringMap[NO_LICENSE_CLIENT_CODE] || NO_LICENSE_CLIENT_MSG;
        CONFIGURE_FREE_COUNTRY_MSG =
            stringMap[CONFIGURE_FREE_COUNTRY_CODE] ||
            CONFIGURE_FREE_COUNTRY_MSG;
    }

    var currRecord;

    function pageInit(context) {
        currRecord = context.currentRecord;
        setUpEntityRadioFields(currRecord, true);
        getTranslations();
        /* Retrieval of URL parameters */
        var params = {};
        var queries = window.location.search.substring(1).split("&");
        for (var i = 0; i < queries.length; i++) {
            var arr = queries[i].split("=");
            params[arr[0]] = arr[1];
        }
        var sendingOngoing = params.ongoing;
        var isMismatch = params.mismatch;
        if (sendingOngoing) {
            messageBanner = message.create({
                type: message.Type.CONFIRMATION,
                message: BULK_SENDING_ONGOING_MSG,
            });
            messageBanner.show();
        }
        populateLicenseInfoFields(currRecord);
        var hasLicenseClient = currRecord.getValue(HAS_LICENSE_CLIENT_FIELD_ID);
        var hasLicense = currRecord.getValue(HAS_LICENSE_FIELD_ID); //checkbox returns true or false
        var freeCountry = currRecord.getValue(COUNTRY_SETUP_FIELD_ID);
        var msgBanner;
        if (hasLicenseClient) {
            if (licenseCheckForUrlParams.isOWAccount()) {
                if ((!hasLicense && !freeCountry) || isMismatch === "T") {
                    msgBanner = message.create({
                        type: message.Type.ERROR,
                        message: CONFIGURE_FREE_COUNTRY_MSG,
                    });
                    msgBanner.show();
                }
            }
        } else {
            msgBanner = message.create({
                type: message.Type.ERROR,
                message: NO_LICENSE_CLIENT_MSG,
            });
            msgBanner.show();
        }
    }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord;
        var entityTransactionValid = true;
        var transTypeValid = true;
        var dateValid = true;
        var fieldId = context.fieldId;
        var entityType = currentRecord.getValue(ENTITY_TYPE_FIELD);
        var hasLicenseClient = currentRecord.getValue(
            HAS_LICENSE_CLIENT_FIELD_ID
        );
        var countrySetup = currentRecord.getValue(COUNTRY_SETUP_FIELD_ID);
        var hasLicense = currentRecord.getValue(HAS_LICENSE_FIELD_ID);
        if (messageBanner) {
            messageBanner.hide();
        }
        if (fieldId === ENTITY_TYPE_FIELD) {
            setUpEntityRadioFields(currentRecord, true);
            setUpTransactionField(currentRecord);
        }
        if (hasLicenseClient) {
            if (
                licenseCheckForUrlParams.areAllConditionsFulfilledForSearch(
                    hasLicense,
                    countrySetup
                )
            ) {
                if (entityType === "customertype") {
                    //checking if the selected transactions are sales transaction
                    entityTransactionValid =
                        isCustomerTransaction(currentRecord);
                } else if (entityType === "vendortype") {
                    //checking if the selected transactions are purchase transaction
                    entityTransactionValid = isVendorTransaction(currentRecord);
                }
                transTypeValid = isValidTransactionType(currentRecord);
                dateValid = areDatesValid(currentRecord);
                if (entityTransactionValid && transTypeValid && dateValid) {
                    submitSearch(context.currentRecord);
                }
            }
        }
    }

    function submitSearch(currentRecord) {
        var subsidiary = currentRecord.getValue(SUBSIDIARY_FIELD_ID);
        var date_from = currentRecord.getValue(TRAN_DATE_FROM_FIELD_ID);
        var date_to = currentRecord.getValue(TRAN_DATE_TO_FIELD_ID);
        if ((subsidiary === undefined || subsidiary) && date_from && date_to) {
            redirectToSearchResult();
        }
    }

    function setUpEntityRadioFields(record, ignoreFieldChange) {
        if (!ignoreFieldChange) {
            ignoreFieldChange = false;
        }
        var entityType = record.getValue(ENTITY_TYPE_FIELD);
        var customerField = record.getField({
            fieldId: CUSTOMER_FIELD_ID,
        });
        var vendorField = record.getField({
            fieldId: VENDOR_FIELD_ID,
        });
        if (entityType === "vendortype") {
            customerField.isDisabled = true;
            vendorField.isDisabled = false;
            record.setValue({
                fieldId: CUSTOMER_FIELD_ID,
                value: "",
                ignoreFieldChange: ignoreFieldChange,
            });
        } else {
            customerField.isDisabled = false;
            vendorField.isDisabled = true;
            record.setValue({
                fieldId: VENDOR_FIELD_ID,
                value: "",
                ignoreFieldChange: ignoreFieldChange,
            });
        }
    }

    function setUpTransactionField(record, ignoreFieldChange) {
        if (!ignoreFieldChange) {
            ignoreFieldChange = false;
        }
        var entityType = record.getValue(ENTITY_TYPE_FIELD);
        var transactionFieldField = record.getField({
            fieldId: TRAN_TYPE_FIELD_ID,
        });
        var purchaseTransactionIds =
            transactionTypeMap.getAllPurchaseTransactionIds();
        if (entityType == "vendortype") {
            record.setValue({
                fieldId: TRAN_TYPE_FIELD_ID,
                value: purchaseTransactionIds,
                ignoreFieldChange: ignoreFieldChange,
            });
        } else {
            transactionFieldField.isDisabled = false;
        }
    }

    function populateLicenseInfoFields(curRecord) {
        var suiteletURL = url.resolveScript({
            scriptId: LICENSE_INFO_SU_SCRIPT,
            deploymentId: LICENSE_INFO_SU_DEPLOY,
        });
        var response = https.post({
            url: suiteletURL,
            body: {},
        });
        var licenseInfo = JSON.parse(response.body);
        var licenseClientValue = isLicenseClientInstalled(licenseInfo);
        var hasLicense = licenseInfo.hasLicense;
        var freeCountry = licenseInfo.freeCountry;
        curRecord.setValue(HAS_LICENSE_CLIENT_FIELD_ID, licenseClientValue);
        curRecord.setValue(HAS_LICENSE_FIELD_ID, hasLicense);
        curRecord.setValue(COUNTRY_SETUP_FIELD_ID, freeCountry);
    }

    function isLicenseClientInstalled(licenseInfo) {
        var hasLicenseClientValue = false;
        if (
            licenseInfo.hasLicense ||
            (!licenseInfo.hasLicense &&
                licenseInfo.errorCode != NO_LICENSE_CLIENT_ERROR_CODE)
        ) {
            hasLicenseClientValue = true;
        }
        return hasLicenseClientValue;
    }

    function saveRecord(context) {
        var currentRecord = context.currentRecord;
        var entityType = currentRecord.getValue(ENTITY_TYPE_FIELD);
        var formCountry = currentRecord.getValue(COUNTRY_SETUP_FIELD_ID);
        var valid = clientLicenseCheck.validateLicense(formCountry);
        if (!valid) {
            var scriptUrl = url.resolveScript({
                scriptId: "customscript_ei_outbound_form_su",
                deploymentId: "customdeploy_ei_outbound_form_su",
                params: { mismatch: "T" },
            });
            redirectToSearch(scriptUrl);
        }
        var typeValid = true;
        var entityTransactionValid = true;
        var dateValid = true;
        typeValid = isValidTransactionType(currentRecord);
        dateValid = areDatesValid(currentRecord);
        if (entityType == "customertype") {
            //checking if the selected transactions are sales transaction
            entityTransactionValid = isCustomerTransaction(currentRecord);
        } else {
            //checking if the selected transactions are purchase transaction
            entityTransactionValid = isVendorTransaction(currentRecord);
        }
        valid = typeValid && entityTransactionValid && dateValid;
        return valid;
    }

    function isCustomerTransaction(record) {
        var transactionTypeValues = record.getValue(TRAN_TYPE_FIELD_ID);
        var transactionTypeTexts = record.getText(TRAN_TYPE_FIELD_ID);
        var transactionTypeArray = [];
        var errorTypes = [];
        var valid = true;
        for (var i = 0; i < transactionTypeValues.length; i++) {
            var transactionTypeId = transactionTypeValues[i];
            if (transactionTypeId) {
                transactionTypeArray[transactionTypeId] =
                    transactionTypeTexts[i];
                var isSalesTran =
                    transactionTypeMap.isSalesTransaction(transactionTypeId);
                var isValidOutboundTran =
                    transactionTypeMap.isValidOutboundTransactionType(
                        transactionTypeId
                    );
                if (!isSalesTran && isValidOutboundTran) {
                    errorTypes.push(transactionTypeArray[transactionTypeId]);
                }
            }
        }
        if (errorTypes.length > 0) {
            var params = {
                TRANSACTIONTYPES: errorTypes.join(", "),
            };
            stringFormatter.setString(INVALID_ENTITY_TRANSACTION_MSG);
            stringFormatter.replaceParameters(params);
            valid = false;
            messageBanner = message.create({
                type: message.Type.ERROR,
                title: INVALID_TRANSACTION_TYPE_TITLE_MSG,
                message: stringFormatter.toString(),
            });
            messageBanner.show();
        }
        return valid;
    }

    function isVendorTransaction(record) {
        var transactionTypeValues = record.getValue(TRAN_TYPE_FIELD_ID);
        var transactionTypeTexts = record.getText(TRAN_TYPE_FIELD_ID);
        var transactionTypeArray = [];
        var errorTypes = [];
        var valid = true;
        for (var i = 0; i < transactionTypeValues.length; i++) {
            var transactionTypeId = transactionTypeValues[i];
            if (transactionTypeId) {
                transactionTypeArray[transactionTypeId] =
                    transactionTypeTexts[i];
                var isPurchaseTran =
                    transactionTypeMap.isPurchaseTransaction(transactionTypeId);
                if (!isPurchaseTran) {
                    errorTypes.push(transactionTypeArray[transactionTypeId]);
                }
            }
        }
        log.debug(errorTypes);
        if (errorTypes.length > 0) {
            var params = {
                TRANSACTIONTYPES: errorTypes.join(", "),
            };
            stringFormatter.setString(INVALID_ENTITY_TRANSACTION_MSG);
            stringFormatter.replaceParameters(params);
            valid = false;
            messageBanner = message.create({
                type: message.Type.ERROR,
                title: INVALID_TRANSACTION_TYPE_TITLE_MSG,
                message: stringFormatter.toString(),
            });
            messageBanner.show();
        }
        return valid;
    }

    function isValidTransactionType(currentRecord) {
        var transactionTypeValues = currentRecord.getValue(TRAN_TYPE_FIELD_ID);
        var transactionTypeTexts = currentRecord.getText(TRAN_TYPE_FIELD_ID);
        var transactionTypeArray = [];
        var errorTypes = [];
        var valid = true;
        for (var i = 0; i < transactionTypeValues.length; i++) {
            var transactionTypeId = transactionTypeValues[i];
            if (transactionTypeId) {
                transactionTypeArray[transactionTypeId] =
                    transactionTypeTexts[i];
                if (
                    !transactionTypeMap.isValidOutboundTransactionType(
                        transactionTypeId
                    )
                ) {
                    errorTypes.push(transactionTypeArray[transactionTypeId]);
                }
            }
        }
        if (errorTypes.length > 0) {
            var params = {
                TRANSACTIONTYPES: errorTypes.join(", "),
            };
            stringFormatter.setString(INVALID_TRANSACTION_TYPE_MSG);
            stringFormatter.replaceParameters(params);
            valid = false;
            messageBanner = message.create({
                type: message.Type.ERROR,
                title: INVALID_TRANSACTION_TYPE_TITLE_MSG,
                message: stringFormatter.toString(),
            });
            messageBanner.show();
        }
        return valid;
    }

    function areDatesValid(currentRecord) {
        var valid = true;
        var toDateValue = currentRecord.getValue(TRAN_DATE_TO_FIELD_ID);
        var fromDateValue = currentRecord.getValue(TRAN_DATE_FROM_FIELD_ID);
        if (fromDateValue && toDateValue) {
            var toDate = formatter.parse({
                value: toDateValue,
                type: formatter.Type.DATE,
            });
            var fromDate = formatter.parse({
                value: fromDateValue,
                type: formatter.Type.DATE,
            });
            if (fromDate.getTime() > toDate.getTime()) {
                alert(INVALID_TRANSACTION_DATES_MSG);
                valid = false;
            }
        }
        return valid;
    }

    function redirectToSearchResult() {
        var customer = currRecord.getValue(CUSTOMER_FIELD_ID);
        var vendor = currRecord.getValue(VENDOR_FIELD_ID);
        var subsidiary = currRecord.getValue(SUBSIDIARY_FIELD_ID);
        var tranTypes = currRecord.getValue(TRAN_TYPE_FIELD_ID).join(",");
        var trandate_from = currRecord.getText(TRAN_DATE_FROM_FIELD_ID);
        var trandate_to = currRecord.getText(TRAN_DATE_TO_FIELD_ID);
        var entityType = currRecord.getValue(ENTITY_TYPE_FIELD);
        var freeCountry = currRecord.getValue(FREE_COUNTRY_FIELD_ID);
        var hasLicense =
            currRecord.getValue(HAS_LICENSE_FIELD_ID) === true ? "T" : "F";
        var hasLicenseClient =
            currRecord.getValue(HAS_LICENSE_CLIENT_FIELD_ID) === true
                ? "T"
                : "F";
        var sendingType = currRecord.getValue(SENDING_TYPE_FIELD);
        var urlParameters = {
            custpage_outbound_cust: customer,
            custpage_outbound_vendor: vendor,
            custpage_outbound_subs: subsidiary,
            custpage_outbound_tran_type: tranTypes,
            custpage_outbound_tran_date_start: trandate_from,
            custpage_outbound_tran_date_end: trandate_to,
            custpage_outbound_e_type: entityType,
            custpage_outbound_result_mode: "T",
            custpage_outbound_free_country: freeCountry,
            custpage_outbound_has_license:
                licenseCheckForUrlParams.hasLicenseValueForURLParameters(
                    hasLicense
                ),
            custpage_outbound_has_license_client: hasLicenseClient,
            custpage_outbound_sending_type: sendingType,
        };
        var urlString = url.resolveScript({
            scriptId: "customscript_ei_outbound_form_su",
            deploymentId: "customdeploy_ei_outbound_form_su",
            params: urlParameters,
        });
        redirectToURL(urlString);
    }

    function redirectToURL(redirectUrl) {
        try {
            NS.form.setChanged(false);
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
        }
        window.location.href = redirectUrl;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        saveRecord: saveRecord,
        redirectToURL: redirectToURL,
        redirectToSearchResult: redirectToSearchResult,
    };
});
