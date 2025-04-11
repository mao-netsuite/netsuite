/**

 * @NApiVersion 2.x

 * @NScriptName Generate E-Document Content

 * @NScriptId _mr_einv_generate_content

 * @NScriptType MapReduceScript

 */

define([
    "N/search",
    "N/query",
    "N/record",
    "../../app/einvoice/app_einvoice_manager",
    "../../app/einvoice/app_einvoice_notifier",
    "N/runtime",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../lib/app/app_transaction_type_map",
    "../../app/einvoice/app_einvoice_cdata_plugin_manager",
    "../../app/einvoice/app_einvoice_outbound_certification",
    "../../app/einvoice/app_einvoice_bulk_processing_manager",
    "../../ubl/common/components/ublService",
    "../../utils/queryUtils",
    "../../ubl/common/lib/constants",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../app/einvoice/app_einvoice_generator"
], function (
    search,
    query,
    record,
    manager,
    notifier,
    runtime,
    licenseManager,
    transactionMap,
    customDataPluginMgr,
    certification,
    bulkProcessingMgr,
    ublServiceModule,
    queryUtils,
    constants,
    freeCountryCheckHelper,
    generator
) {
    var FOR_GENERATION = "1";
    var GENERATION_FAILED = "5";
    var EI_GENERATION_SERVICE = "EIGenerationService";
    var SERVICE = "service";
    var SCRIPT_PARAM_SUBSIDIARY_ID = "custscript_ei_subsidiary_mr";
    var subsidiaryId;
    var allowedCountry;
    var licenseInfo;
    var licenseInfoNseb;
    var licenseInfoAvalara;
    var hasPassedLicenseValidationForStdTxn;
    var transactions = [];

    function getInputData() {
        try {
            var scriptObj = runtime.getCurrentScript();
            subsidiaryId = scriptObj.getParameter({
                name: SCRIPT_PARAM_SUBSIDIARY_ID,
            });
            allowedCountry = freeCountryCheckHelper.getInternalIdOfAllowedFreeCountry();

            bulkProcessingMgr.getTranslations();

            [licenseInfo, licenseInfoNseb, licenseInfoAvalara] = licenseManager.getLicenseInfos([constants.EI_BUNDLE_KEY, constants.NSEB_BUNDLE_KEY, constants.AVALARA_BUNDLE_KEY]);
            hasPassedLicenseValidationForStdTxn =
                bulkProcessingMgr.hasPassedLicenseValidationForStdTxn(
                    licenseInfo,
                    true,
                    false,
                    false
                );

            var transQuery = bulkProcessingMgr.getTransactionQueryObject();
            constructFilterForGenBasedOnConditions(transQuery);
            if (transQuery.condition) {
                transactions = transactions.concat(queryUtils.getQueryResults(transQuery));
            }

            transactions = transactions.concat(bulkProcessingMgr.getAvalaraTransactions(licenseInfoNseb.hasLicense, licenseInfoAvalara, subsidiaryId, allowedCountry, [
                FOR_GENERATION,
                GENERATION_FAILED,
            ], true));

            return transactions;
        } catch (ex) {
            log.error("Error in Get Input Data stage: " + ex.name, ex);
        }
    }

    function map(context) {
        try {
            var EI_TEMPLATE = "custbody_psg_ei_template";

            var QR_CODE_STR_FIELD = "custbody_psg_ei_qr_string";

            var QR_CODE_PREVIEW_FIELD = "custbody_psg_ei_qr_code";

            var contextVal = JSON.parse(context.value);

            log.debug("contextVal", contextVal.values);

            var transId = contextVal.values[0];

            var tranNum = contextVal.values[1];

            var transType = contextVal.values[2];

            var transObj = manager.getTransaction(transId, transType);

            var eStatus = transObj.getValue("custbody_psg_ei_status");

            var renderJson = {};

            var certSendingMethodId =
                certification.getCertSendingMethodId(transObj);

            var owner = notifier.getFirstActiveAdmin();

            var generationResult;

            var pluginImpl = "";

            var qrFieldsUpdate = {};

            if (eStatus === FOR_GENERATION || eStatus === GENERATION_FAILED) {
                var templateId = transObj.getValue(EI_TEMPLATE);
                var isAvalaraTemplate = undefined;

                if (templateId !== "" || typeof templateId !== "undefined") {
                    var templateRec = getTemplate(templateId);
                    pluginImpl = getTemplatePluginImpl(templateRec);
                    isAvalaraTemplate = getAvalaraTemplate(templateRec);
                }

                // Resetting the QR code fields at the start of the generation process
                qrFieldsUpdate[QR_CODE_STR_FIELD] = "";
                qrFieldsUpdate[QR_CODE_PREVIEW_FIELD] = "";
                record.submitFields({
                    type: transType,
                    id: transId,
                    values: qrFieldsUpdate,
                });

                if (pluginImpl !== "" && typeof pluginImpl !== "undefined") {
                    var ublTransactionRecord = generator.getUBLContent(transId, transType, isAvalaraTemplate);

                    try {
                        var params = {
                            transactionRecord: transObj,
                            transactionId: transId,
                            userId: owner,
                            ublTransactionRecord: ublTransactionRecord,
                        };

                        renderJson = customDataPluginMgr.runPlugin(
                            params,
                            pluginImpl
                        );
                    } catch (ex) {
                        log.error(ex.name, ex.message);
                    }
                }

                runtime.getCurrentSession().set(SERVICE, EI_GENERATION_SERVICE);

                generationResult = manager.generateEDocument(
                    transObj,
                    transType,
                    owner,
                    true,
                    renderJson,
                    certSendingMethodId
                );
            }

            if (generationResult && !generationResult.success) {
                var errorValues = {
                    trannum: "Transaction # " + tranNum,

                    type: transType,

                    error: generationResult.message,
                };

                context.write(owner, errorValues);
            }
        } catch (ex) {
            log.error("Error in Map stage: " + ex.name, ex.message);
        }
    }

    function reduce(context) {
        var owner = context.key;

        var errorValues = context.values;

        //send email of errors

        if (owner && errorValues) {
            notifier.notifyGenerationError(owner, errorValues);
        }
    }

    // Based on the License status, free country set, Custom Transactions feature's status
    // and registered CTTs the filters are constructed

    function constructFilterForGenBasedOnConditions(transQuery) {
        var isCustomTransactionEnabled = runtime.isFeatureInEffect({
            feature: "CUSTOMTRANSACTIONS",
        });


        if (hasPassedLicenseValidationForStdTxn || allowedCountry) {
            if (isCustomTransactionEnabled &&
                transactionMap.getAllOutboundCttCodes().length > 0) {
                transQuery.condition = transQuery.or(transQuery.and(getStandardTransactionFilters(transQuery)), transQuery.and(getCustomTransactionFilters(transQuery)));
            } else {
                transQuery.condition = transQuery.and(getStandardTransactionFilters(transQuery));
            }
        } else if (
            !allowedCountry &&
            isCustomTransactionEnabled &&
            transactionMap.getAllOutboundCttCodes().length > 0
        ) {
            transQuery.condition = transQuery.and(getCustomTransactionFilters(transQuery));
        }
    }

    /**
         * This function constructs the transaction filters and returns a filterExpression Array
         * to be used as query filter
         *
         * @returns {Array}
         */

    function getStandardTransactionFilters(transQuery) {
        var filters = transactionMap.getTransactionFiltersQuery(transQuery, subsidiaryId, allowedCountry, [
            FOR_GENERATION,
            GENERATION_FAILED,
        ]);
        if (licenseInfoNseb.errorCode !== constants.NO_NSEB) {
            filters.push(transQuery.createCondition({
                fieldId: "custbody_psg_ei_template.custrecord_psg_ei_is_avalara_template", operator: query.Operator.IS, values: false
            }));
        }

        return filters;
    }

    function getCustomTransactionFilters(transQuery) {
        var filtersForCTT = transactionMap.getCustomTransactionFiltersQuery(transQuery, [
            FOR_GENERATION,
            GENERATION_FAILED,
        ]);

        var isOW = runtime.isFeatureInEffect("SUBSIDIARIES");

        if (isOW && subsidiaryId) {
            filtersForCTT.push(transQuery.createCondition({
                fieldId: "transactionlines.subsidiary", operator: query.Operator.EQUAL, values: subsidiaryId
            }));
            filtersForCTT.push(transQuery.createCondition({
                fieldId: "transactionlines.mainline", operator: query.Operator.IS, values: true
            }));
        }

        return filtersForCTT;
    }

    function getTemplate(templateId) {
        var EI_TEMPLATE_RECORD = "customrecord_psg_ei_template";

        var CUST_DATA_SOURCE_IMPL = "custrecord_ei_inject_data_source_impl";
        var AVALARA_TEMPLATE = "custrecord_psg_ei_is_avalara_template";

        return search.lookupFields({
            type: EI_TEMPLATE_RECORD,

            id: templateId,

            columns: [CUST_DATA_SOURCE_IMPL, AVALARA_TEMPLATE],
        });
    }
    function getTemplatePluginImpl(templateRec) {
        return templateRec["custrecord_ei_inject_data_source_impl"];
    }
    function getAvalaraTemplate(templateRec) {
        return templateRec["custrecord_psg_ei_is_avalara_template"];
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
    };
});
