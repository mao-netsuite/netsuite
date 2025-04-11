/**
 * @preserve
 *
 * @NApiVersion 2.1
 * @NScriptType clientscript
 */

define([
    "N/ui/message",

    "N/format",

    "../../lib/translator",

    "N/https",

    "N/url",

    "../../app/einvoice/app_einvoice_client_form_license_check",

    "../../app/einvoice/app_einvoice_license_check_for_urlparams",

    "../../lib/string_formatter",
    "../../lib/app/app_transaction_type_map",
], function (
    message,
    formatter,
    translator,
    https,
    url,
    clientLicenseCheck,
    licenseCheckForUrlParams,
    stringFormatter,
    transactionTypeMap
) {
    var DATE_CREATED_FROM_FIELD_ID = "custpage_inbound_date_created_start";

    var DATE_CREATED_TO_FIELD_ID = "custpage_inbound_date_created_end";

    var VENDOR_FIELD_ID = "custpage_inbound_vendor";

    var HAS_LICENSE_FIELD_ID = "custpage_inbound_has_license";

    var COUNTRY_SETUP_FIELD_ID = "custpage_inbound_free_country";

    var HAS_LICENSE_CLIENT_FIELD_ID = "custpage_inbound_has_license_client";

    var BULK_CONVERSION_ONGOING_MSG =
        "The e-document is currently being converted. You will receive an email when the process is complete.";

    var INVALID_TRANSACTION_DATES_MSG =
        "The Transaction Date From must not be later than the Transaction Date To.";

    var NO_LICENSE_CLIENT_MSG =
        "The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.";

    var CONFIGURE_FREE_COUNTRY_MSG =
        "This account does not have an active license to use the Electronic Invoicing SuiteApp in multiple countries. To convert e-documents in bulk, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page.";

    var BULK_CONVERSION_ONGOING_CODE = "inbound.msg.conversionongoing";

    var INVALID_TRANSACTION_DATES_CODE = "inbound.invaliddates";

    var NO_LICENSE_CLIENT_CODE = "license.notinstalled";

    var CONFIGURE_FREE_COUNTRY_CODE = "inbound.configurefreecountry";

    var LICENSE_INFO_SU_SCRIPT = "customscript_ei_license_info_service_su";

    var LICENSE_INFO_SU_DEPLOY = "customdeploy_ei_license_info_service_su";

    var NO_LICENSE_CLIENT_ERROR_CODE = "EI_NO_NSLC";
    var ENTITY_TYPE_FIELD = "custpage_inbound_e_type";
    var TRAN_TYPE_FIELD_ID = "custpage_inbound_trans_type";
    var INVALID_TRANSACTION_TYPE_MSG =
        "The following transaction types are currently not supported: {TRANSACTIONTYPES}";
    var INVALID_ENTITY_TRANSACTION_MSG =
        "The following transaction types are not valid for the selected entity: {TRANSACTIONTYPES}";
    var INVALID_TRANSACTION_TYPE_TITLE_MSG = "Invalid Transaction Types";
    var CUSTOMER_FIELD_ID = "custpage_inbound_cust";
    var tranLabelObj = {};
    var BILL_TYPE = 17;
    var BILL_CREDIT_TYPE = 20;
    var SALES_ORDER_TYPE = 31;
    var purchaseTypeTransCodes = [BILL_TYPE, BILL_CREDIT_TYPE];
    var salesTypeTransCodes = [SALES_ORDER_TYPE];
    var messageBanner;

    function getTranslations() {
        var stringMap = translator.getStringMap([
            BULK_CONVERSION_ONGOING_CODE,

            INVALID_TRANSACTION_DATES_CODE,

            CONFIGURE_FREE_COUNTRY_CODE,

            NO_LICENSE_CLIENT_CODE,
        ]);

        BULK_CONVERSION_ONGOING_MSG =
            stringMap[BULK_CONVERSION_ONGOING_CODE] ||
            BULK_CONVERSION_ONGOING_MSG;

        INVALID_TRANSACTION_DATES_MSG =
            stringMap[INVALID_TRANSACTION_DATES_CODE] ||
            INVALID_TRANSACTION_DATES_MSG;

        NO_LICENSE_CLIENT_MSG =
            stringMap[NO_LICENSE_CLIENT_CODE] || NO_LICENSE_CLIENT_MSG;

        CONFIGURE_FREE_COUNTRY_MSG =
            stringMap[CONFIGURE_FREE_COUNTRY_CODE] ||
            CONFIGURE_FREE_COUNTRY_MSG;
    }

    function pageInit(context) {
        var currRecord = context.currentRecord;
        var tranField = currRecord.getField({
            fieldId: TRAN_TYPE_FIELD_ID,
        });
        var tranOptions = tranField.getSelectOptions();
        for (var tranIndex in tranOptions) {
            tranLabelObj[tranOptions[tranIndex].value] = tranOptions[tranIndex].text;
        }
        setUpEntityRadioFields(currRecord);

        getTranslations();

        /* Retrieval of URL parameters */

        var params = {};

        var queries = window.location.search.substring(1).split("&");

        for (var queryIndex = 0; queryIndex < queries.length; queryIndex++) {
            var arr = queries[queryIndex].split("=");

            params[arr[0]] = arr[1];
        }

        var conversionOngoing = params.ongoing;

        var isMismatch = params.mismatch;

        var transTypes = params.custpage_inbound_trans_type;

        var entityType = params.custpage_inbound_e_type;

        if (entityType === "vendortype") {
            currRecord.setValue({
                fieldId: TRAN_TYPE_FIELD_ID,
                value: decodeURIComponent(transTypes).split(","),
                ignoreFieldChange: true,
            });
        }

        if (conversionOngoing) {
            messageBanner = message.create({
                type: message.Type.CONFIRMATION,

                message: BULK_CONVERSION_ONGOING_MSG,
            });

            messageBanner.show();
        }

        populateLicenseInfoFields(currRecord);

        var hasLicenseClient = currRecord.getValue(HAS_LICENSE_CLIENT_FIELD_ID);

        var hasLicense = currRecord.getValue(HAS_LICENSE_FIELD_ID); //checkbox returns true or false

        var freeCountry = currRecord.getValue(COUNTRY_SETUP_FIELD_ID);
        var bannerMsg;

        if (hasLicenseClient) {
            if (
                licenseCheckForUrlParams.isOWAccount() &&
                ((!hasLicense && !freeCountry) || isMismatch === "T")
            ) {
                bannerMsg = message.create({
                    type: message.Type.ERROR,

                    message: CONFIGURE_FREE_COUNTRY_MSG,
                });

                bannerMsg.show();
            }
        } else {
            bannerMsg = message.create({
                type: message.Type.ERROR,

                message: NO_LICENSE_CLIENT_MSG,
            });

            bannerMsg.show();
        }
    }

    function fieldChanged(context) {
        var dateValid = true;

        var currentRecord = context.currentRecord;
        var entityTransactionValid = true;
        var transTypeValid = true;
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
            setUpEntityRadioFields(currentRecord);
        }
        if (
            hasLicenseClient &&
            licenseCheckForUrlParams.areAllConditionsFulfilledForSearch(
                hasLicense,
                countrySetup
            )
        ) {
            dateValid = areDatesValid(currentRecord);
            if (entityType === "customertype") {
                //checking if the selected transactions are sales transaction
                entityTransactionValid = isCustomerTransaction(currentRecord);
            } else if (entityType === "vendortype") {
                //checking if the selected transactions are purchase transaction
                entityTransactionValid = isVendorTransaction(currentRecord);
            }
            transTypeValid = isValidTransactionType(currentRecord);

            if (entityTransactionValid && transTypeValid && dateValid) {
                submitSearch(context.currentRecord);
            }
        }
    }

    function showEntityFields(entityField, flag) {
        entityField.isVisible = flag;
        entityField.isDisplay = flag;
    }

    function setUpEntityRadioFields(record) {
        var entityType = record.getValue(ENTITY_TYPE_FIELD);
        var customerField = record.getField({
            fieldId: CUSTOMER_FIELD_ID,
        });
        var vendorField = record.getField({
            fieldId: VENDOR_FIELD_ID,
        });
        var tranField = record.getField({ fieldId: TRAN_TYPE_FIELD_ID });
        var tranCode = '';
        tranField.removeSelectOption({ value: null });
        if (entityType === "vendortype") {
            showEntityFields(customerField, false);
            showEntityFields(vendorField, true);
            for (var purchaseTypeIndex in purchaseTypeTransCodes) {
                tranCode = purchaseTypeTransCodes[purchaseTypeIndex];
                tranField.insertSelectOption({
                    text: tranLabelObj[tranCode],
                    value: tranCode,
                });
            }
            record.setValue({
                fieldId: CUSTOMER_FIELD_ID,
                value: "",
                ignoreFieldChange: true,
            });
        } else {
            showEntityFields(customerField, true);
            showEntityFields(vendorField, false);
            for (var salesTypeIndex in salesTypeTransCodes) {
                tranCode = salesTypeTransCodes[salesTypeIndex];
                tranField.insertSelectOption({
                    text: tranLabelObj[tranCode],
                    value: tranCode,
                });
            }
            record.setValue({
                fieldId: TRAN_TYPE_FIELD_ID,
                value: SALES_ORDER_TYPE,
                ignoreFieldChange: true,
            });
            record.setValue({
                fieldId: VENDOR_FIELD_ID,
                value: "",
                ignoreFieldChange: true,
            });
        }
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
                var isValidInboundTran =
                    transactionTypeMap.isValidInboundTransactionType(
                        transactionTypeId
                    );
                if (!isSalesTran && isValidInboundTran) {
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
                    !transactionTypeMap.isValidInboundTransactionType(
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

    function submitSearch(currentRecord) {
        var date_from = currentRecord.getValue(DATE_CREATED_FROM_FIELD_ID);

        var date_to = currentRecord.getValue(DATE_CREATED_TO_FIELD_ID);

        if (date_from && date_to) {
            redirectToSearchResult(currentRecord);
        }
    }

    function redirectToSearchResult(currentRecord) {
        var customer = currentRecord.getValue(CUSTOMER_FIELD_ID);

        var date_from = currentRecord.getText(DATE_CREATED_FROM_FIELD_ID);

        var date_to = currentRecord.getText(DATE_CREATED_TO_FIELD_ID);

        var entityType = currentRecord.getValue(ENTITY_TYPE_FIELD);

        var vendor = currentRecord.getValue(VENDOR_FIELD_ID);

        var entity_radio = currentRecord.getValue(ENTITY_TYPE_FIELD);

        var tranTypes = currentRecord.getValue(TRAN_TYPE_FIELD_ID).join(",");

        if (entity_radio === "vendortype" && !tranTypes.length) {
            tranTypes = purchaseTypeTransCodes.join(",");
        }

        var hasLicenseClient =
            currentRecord.getValue(HAS_LICENSE_CLIENT_FIELD_ID) === true
                ? "T"
                : "F";

        var freeCountry = currentRecord.getValue(COUNTRY_SETUP_FIELD_ID);

        var hasLicense =
            licenseCheckForUrlParams.hasLicenseValueForURLParameters(
                currentRecord.getValue(HAS_LICENSE_FIELD_ID)
            );

        var urlParameters = {
            custpage_inbound_cust: customer,

            custpage_inbound_e_type: entityType,

            custpage_inbound_date_created_start: date_from,

            custpage_inbound_date_created_end: date_to,

            custpage_inbound_vendor: vendor,

            custpage_inbound_trans_type: tranTypes,

            custpage_inbound_result_mode: "T",

            custpage_inbound_free_country: freeCountry,

            custpage_inbound_has_license: hasLicense,

            custpage_inbound_has_license_client: hasLicenseClient,
        };

        var urlString = url.resolveScript({
            scriptId: "customscript_ei_inbound_form_su",

            deploymentId: "customdeploy_ei_inbound_form_su",

            params: urlParameters,
        });

        redirectToURL(urlString);
    }

    function redirectToURL(redirectUrl) {
        try {
            NS.form.setChanged(false);
        } catch (e) {
            log.error(e);
        }

        window.location.href = redirectUrl;
    }

    function saveRecord(context) {
        var valid;

        var currentRecord = context.currentRecord;

        var formCountry = currentRecord.getValue(COUNTRY_SETUP_FIELD_ID);

        var isLicenseValid = clientLicenseCheck.validateLicense(formCountry);

        if (!isLicenseValid) {
            var scriptUrl = url.resolveScript({
                scriptId: "customscript_ei_inbound_form_su",

                deploymentId: "customdeploy_ei_inbound_form_su",

                params: { mismatch: "T" },
            });

            redirectToSearch(scriptUrl);
        }

        valid = areDatesValid(currentRecord);

        return valid;
    }

    /**

     * Function to populate hidden license info fields

     * @param currRecord {Object} current Record Object

     * @returns void

     */

    function populateLicenseInfoFields(currRecord) {
        var suiteletURL = url.resolveScript({
            scriptId: LICENSE_INFO_SU_SCRIPT,

            deploymentId: LICENSE_INFO_SU_DEPLOY,
        });

        var response = https.post({
            url: suiteletURL,

            body: {},
        });

        var licenseInfo = JSON.parse(response.body);

        var licenseClientValue = hasLicenseClientFunc(licenseInfo);

        var hasLicense = licenseInfo.hasLicense;

        var freeCountry = licenseInfo.freeCountry;

        currRecord.setValue(HAS_LICENSE_CLIENT_FIELD_ID, licenseClientValue);

        currRecord.setValue(HAS_LICENSE_FIELD_ID, hasLicense);

        currRecord.setValue(COUNTRY_SETUP_FIELD_ID, freeCountry);
    }

    /**

     * Function to check if license client suite app is installed

     *

     * @param licenseInfo {Object} License check result

     * @returns hasLicenseClientValue {Boolean}

     */

    function hasLicenseClientFunc(licenseInfo) {
        var hasLicenseClientValue = false;

        if (
            licenseInfo.hasLicense ||
            (!licenseInfo.hasLicense &&
                licenseInfo.errorCode !== NO_LICENSE_CLIENT_ERROR_CODE)
        ) {
            hasLicenseClientValue = true;
        }

        return hasLicenseClientValue;
    }

    function areDatesValid(currentRecord) {
        var isValid = true;

        var toDateValue = currentRecord.getValue(DATE_CREATED_TO_FIELD_ID);

        var fromDateValue = currentRecord.getValue(DATE_CREATED_FROM_FIELD_ID);

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
                isValid = false;
            }
        }

        return isValid;
    }

    return {
        pageInit: pageInit,

        fieldChanged: fieldChanged,

        saveRecord: saveRecord,
    };
});
