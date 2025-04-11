/**
 * @NApiVersion 2.1
 * @NScriptType mapreducescript
 * @NModuleScope public
 */

define([
    "N/search",
    "N/record",
    "N/runtime",
    "N/config",
    "N/query",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
], function (search, record, runtime, config, query, subsidiaryPrefGetter) {
    const E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD =
        "custrecord_psg_ei_sub_email_custom";
    const E_DOC_SENDER_FLD = "custrecord_psg_ei_sub_sender";
    const RECIPIENT_E_DOC_NOTIFICATIONS_FLD =
        "custrecord_psg_ei_sub_notif_recipient";
    const ADVANCED_PDF_HTML_TEMPLATE_FLD = "custrecord_psg_ei_sub_advanced_pdf";
    const E_DOC_COUNTRY_FOR_FREE_USE_FLD =
        "custrecord_psg_ei_sub_edoc_free_country";
    const E_DOCUMENT_AUTOMATION_TYPE_FLD =
        "custrecord_psg_ei_sub_edoc_automation";
    const DISABLE_COUNTRY_FLD = "custrecord_psg_ei_sub_disable_country";
    const SUBSIDIARY_INTERNAL_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
    const INACTIVE_FLD = "isinactive";
    const ADV_PDF_INACTIVE_FLD = "inactive";
    const ID_FLD = "id";
    const SUBSIDIARIES = "SUBSIDIARIES";

    const SUBSIDIARY_PREF_REC_TYPE = "customrecord_psg_ei_sub_prefs_data";
    const E_DOC_EMAIL_CUSTOMIZATION_REC_TYPE =
        "customrecord_psg_ei_email_custom";
    const ADVANCED_PDF_TEMPLATE_REC_TYPE = "AdvancedpdfTemplate";

    const AUTOMATION_PREF_REC_TYPE = "customrecord_ei_automation_pref";
    const AUTOMATION_PREF_REC_FLD = "custrecord_automation_prefs";

    const EI_PREF_BUNDLE_UPDATE = "custscript_psg_ei_bundle_update";

    const EXISTING_E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD =
        "custrecord_psg_ei_email_custom";
    const EXISTING_E_DOC_SENDER_FLD = "custrecord_psg_ei_sender";
    const EXISTING_RECIPIENT_E_DOC_NOTIFICATIONS_FLD =
        "custrecord_psg_ei_notif_recipient";
    const EXISTING_ADVANCED_PDF_HTML_TEMPLATE_FLD =
        "custrecord_advanced_pdf_template";
    const EXISTING_DISABLE_COUNTRY_FLD = "custrecord_psg_ei_disable_country";
    const EXISTING_E_DOC_COUNTRY_FOR_FREE_USE_FLD =
        "custrecord_psg_ei_license_free_country";

    const SUBSIDIARY_COLUMNS = [
        EXISTING_E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD,
        EXISTING_E_DOC_SENDER_FLD,
        EXISTING_RECIPIENT_E_DOC_NOTIFICATIONS_FLD,
        EXISTING_ADVANCED_PDF_HTML_TEMPLATE_FLD,
        EXISTING_DISABLE_COUNTRY_FLD,
        EXISTING_E_DOC_COUNTRY_FOR_FREE_USE_FLD,
    ];

    const EMPTY_SI_SUBSIDIARY_DATA = [
        {
            subsidiaryId: 1,
            automaticEIPref: 0,
        },
    ];

    function getInputData() {
        let subsidiariesInputData = [];
        try {
            /**
             * isAfterUpdate boolean is used to differentiate the bundle update and install scenario as follows:
             * true - handles the bundle update and re-execution of MR manually scenarios
             * false - handles the bundle install scenario
             */
            const isAfterUpdate = fetchAfterUpdateParamValue();
            const isOw = isOWAccount();
            let subsidiariesData = querySubsidiaries(isOw);

            if (!isAfterUpdate) {
                subsidiariesInputData = subsidiariesData;
            } else {
                subsidiariesInputData = fetchOldPrefSubsidiariesData(
                    subsidiariesData,
                    isOw
                );
            }
        } catch (e) {
            log.error("ERROR - getInputData()", e);
        }

        return subsidiariesInputData;
    }

    function map(context) {
        try {
            log.debug("INFO - map() context", context.value);
            const subsidiaryData = JSON.parse(context.value);
            const subsidiaryInternalId = parseInt(subsidiaryData.subsidiaryId);
            const automationValue = parseInt(subsidiaryData.automaticEIPref);
            let subFields = {};
            let companyInfo = {};
            const isOw = isOWAccount();
            const isAfterUpdate = fetchAfterUpdateParamValue();

            if (isAfterUpdate) {
                if (isOw) {
                    const subLookUpResult = search.lookupFields({
                        type: search.Type.SUBSIDIARY,
                        id: subsidiaryInternalId,
                        columns: SUBSIDIARY_COLUMNS,
                    });

                    subFields[E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD] =
                        getSearchResult(
                            subLookUpResult,
                            EXISTING_E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD
                        );
                    subFields[E_DOC_SENDER_FLD] = getSearchResult(
                        subLookUpResult,
                        EXISTING_E_DOC_SENDER_FLD
                    );
                    subFields[ADVANCED_PDF_HTML_TEMPLATE_FLD] = getSearchResult(
                        subLookUpResult,
                        EXISTING_ADVANCED_PDF_HTML_TEMPLATE_FLD
                    );
                    subFields[E_DOC_COUNTRY_FOR_FREE_USE_FLD] = getSearchResult(
                        subLookUpResult,
                        EXISTING_E_DOC_COUNTRY_FOR_FREE_USE_FLD
                    );
                    subFields[RECIPIENT_E_DOC_NOTIFICATIONS_FLD] =
                        subLookUpResult &&
                        subLookUpResult[
                            EXISTING_RECIPIENT_E_DOC_NOTIFICATIONS_FLD
                        ];
                    subFields[DISABLE_COUNTRY_FLD] =
                        subLookUpResult &&
                        subLookUpResult[EXISTING_DISABLE_COUNTRY_FLD];
                } else {
                    companyInfo = config.load({
                        type: config.Type.COMPANY_INFORMATION,
                    });

                    subFields[E_DOC_SENDER_FLD] = companyInfo.getValue(
                        EXISTING_E_DOC_SENDER_FLD
                    );
                    subFields[E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD] =
                        companyInfo.getValue(
                            EXISTING_E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD
                        );
                    subFields[E_DOC_COUNTRY_FOR_FREE_USE_FLD] =
                        companyInfo.getValue(
                            EXISTING_E_DOC_COUNTRY_FOR_FREE_USE_FLD
                        );
                    subFields[ADVANCED_PDF_HTML_TEMPLATE_FLD] =
                        companyInfo.getValue(
                            EXISTING_ADVANCED_PDF_HTML_TEMPLATE_FLD
                        );
                    subFields[RECIPIENT_E_DOC_NOTIFICATIONS_FLD] =
                        companyInfo.getValue(
                            EXISTING_RECIPIENT_E_DOC_NOTIFICATIONS_FLD
                        );
                    subFields[DISABLE_COUNTRY_FLD] = companyInfo.getValue(
                        EXISTING_DISABLE_COUNTRY_FLD
                    );
                }
            }

            createEIPrefRecIns(
                subFields,
                subsidiaryInternalId,
                automationValue
            );
        } catch (e) {
            log.error("ERROR - map()", e);
        }
    }

    function summarize() {
        log.debug("INFO - summarize()", "MR Execution Completed");
    }

    /**
     * Returns the Bundle Update script parameter value set for MR execution
     */
    function fetchAfterUpdateParamValue() {
        const scriptObj = runtime.getCurrentScript();
        return (
            scriptObj &&
            JSON.parse(scriptObj.getParameter({ name: EI_PREF_BUNDLE_UPDATE }))
        );
    }

    /**
     * Returns array of subsidiaries object which needs to be processed in map stage individually
     * @param subsidiariesData
     * @param isOw
     * @returns {*|[{subsidiaryId: number, automaticEIPref: number}]}
     */
    function fetchOldPrefSubsidiariesData(subsidiariesData, isOw) {
        let oldPrefSubsData;
        const subAutomationSearch = search.lookupFields({
            type: AUTOMATION_PREF_REC_TYPE,
            id: 1,
            columns: [AUTOMATION_PREF_REC_FLD],
        });
        const subAutomationData =
            (subAutomationSearch[AUTOMATION_PREF_REC_FLD] &&
                JSON.parse(subAutomationSearch[AUTOMATION_PREF_REC_FLD])) ||
            [];
        const activeInstancesSubIds = new Set();
        const activeSubAutomationSubIds = new Set();

        // Initializes all missing instances subsidiary Ids
        subsidiariesData.map((subObj) =>
            activeInstancesSubIds.add(parseInt(subObj.subsidiaryId))
        );
        // Initializes all existing subsidiary automation pref subsidiary Ids
        subAutomationData.forEach((subObj) =>
            activeSubAutomationSubIds.add(parseInt(subObj.subsidiaryId))
        );

        // Filtering the missing instances which do not have pref automation defined
        const prefNotDefinedSubArr = subsidiariesData.filter(
            (subObj) =>
                !activeSubAutomationSubIds.has(parseInt(subObj.subsidiaryId))
        );

        // Concatenating data of both defined pref automation and not defined pref automation subsidiaries
        const finalSubAutomationData =
            subAutomationData.concat(prefNotDefinedSubArr);

        // Removing the existing data of subsidiaries for which instances were created
        const filteredSubAutomationData = finalSubAutomationData.filter(
            (subObj) => activeInstancesSubIds.has(parseInt(subObj.subsidiaryId))
        );

        if (isOw) {
            oldPrefSubsData = filteredSubAutomationData;
        } else {
            oldPrefSubsData = subAutomationData.length
                ? subAutomationData
                : EMPTY_SI_SUBSIDIARY_DATA;
        }

        return oldPrefSubsData;
    }

    /**
     * Returns subsidiaries data with automation type field value
     * @param isOw
     */
    function querySubsidiaries(isOw) {
        let subsData = [];

        if (isOw) {
            const subsidiaryQuery = query.create({
                type: query.Type.SUBSIDIARY,
            });
            subsidiaryQuery.condition = subsidiaryQuery.createCondition({
                fieldId: INACTIVE_FLD,
                operator: query.Operator.IS,
                values: false,
            });
            subsidiaryQuery.columns = [
                subsidiaryQuery.createColumn({
                    fieldId: ID_FLD,
                }),
            ];

            subsidiaryQuery
                .run()
                .iterator()
                .each((result) => {
                    const subInteralId = result.value.values[0];

                    if (subInteralId) {
                        subsData.push({
                            subsidiaryId: subInteralId,
                            automaticEIPref: 0,
                        });
                    }
                    return true;
                });
        } else {
            subsData = EMPTY_SI_SUBSIDIARY_DATA;
        }

        return subsData;
    }

    /**
     * Returns true if the account type is OneWorld(OW) based on "Subsidiaries" feature
     * @returns {boolean}
     */
    function isOWAccount() {
        return runtime.isFeatureInEffect(SUBSIDIARIES);
    }

    /**
     * Returns subsidiary preference instance internal ID for the subsidiary ID passed as parameter
     * @param subId
     */
    function getSubPrefId(subId) {
        let subPrefId;
        const subsidiaryPreferencesQuery = query.create({
            type: SUBSIDIARY_PREF_REC_TYPE,
        });
        subsidiaryPreferencesQuery.condition =
            subsidiaryPreferencesQuery.createCondition({
                fieldId: SUBSIDIARY_INTERNAL_ID_FLD,
                operator: query.Operator.EQUAL,
                values: subId,
            });

        subsidiaryPreferencesQuery.columns = [
            subsidiaryPreferencesQuery.createColumn({
                fieldId: ID_FLD,
            }),
        ];
        const subsidiaryPreferencesResults =
            subsidiaryPreferencesQuery.run().results[0];

        if (
            subsidiaryPreferencesResults &&
            subsidiaryPreferencesResults.values
        ) {
            subPrefId = parseInt(subsidiaryPreferencesResults.values[0]);
        }

        return subPrefId;
    }

    /**
     * Creates "Subsidiary Preferences" instance with the data passed in parameters
     * @param subFields
     * @param subsidiaryInternalId
     * @param automationValue
     */
    function createEIPrefRecIns(
        subFields,
        subsidiaryInternalId,
        automationValue
    ) {
        const parentSubId = subsidiaryPrefGetter.getParentSubsidiaryId();
        const subPrefId = getSubPrefId(subsidiaryInternalId);
        let eiPrefRec;
        if (subPrefId) {
            eiPrefRec = record.load({
                type: SUBSIDIARY_PREF_REC_TYPE,
                id: subPrefId,
            });
        } else {
            eiPrefRec = record.create({ type: SUBSIDIARY_PREF_REC_TYPE });
        }
        const emailCustomizationTemplateFldVal =
            subFields[E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD];
        const advPdfTemplateFldVal = subFields[ADVANCED_PDF_HTML_TEMPLATE_FLD];
        const employeeFldVal = subFields[E_DOC_SENDER_FLD];
        const isEmailCustomizationTemplateActive = getFieldValue(
            E_DOC_EMAIL_CUSTOMIZATION_REC_TYPE,
            emailCustomizationTemplateFldVal,
            INACTIVE_FLD
        );
        const isEmployeeActive = getFieldValue(
            query.Type.EMPLOYEE,
            employeeFldVal,
            INACTIVE_FLD
        );
        const isAdvPdfTemplateActive = getFieldValue(
            ADVANCED_PDF_TEMPLATE_REC_TYPE,
            advPdfTemplateFldVal,
            ADV_PDF_INACTIVE_FLD
        );

        if (subsidiaryInternalId) {
            eiPrefRec.setValue({
                fieldId: SUBSIDIARY_INTERNAL_ID_FLD,
                value: subsidiaryInternalId,
            });
        }
        if (isEmailCustomizationTemplateActive) {
            eiPrefRec.setValue({
                fieldId: E_DOC_EMAIL_CUSTOMIZATION_TEMPLATE_FLD,
                value: emailCustomizationTemplateFldVal,
            });
        }
        if (isEmployeeActive) {
            eiPrefRec.setValue({
                fieldId: E_DOC_SENDER_FLD,
                value: employeeFldVal,
            });
        }
        if (isAdvPdfTemplateActive) {
            eiPrefRec.setValue({
                fieldId: ADVANCED_PDF_HTML_TEMPLATE_FLD,
                value: advPdfTemplateFldVal,
            });
        }

        if (automationValue !== null && automationValue >= 0) {
            // to override the automation only if the new data is not present or preference is other than disable
            if (automationValue != 0 || !subPrefId) {
                eiPrefRec.setValue({
                    fieldId: E_DOCUMENT_AUTOMATION_TYPE_FLD,
                    value: automationValue + 1,
                });
            }
        }

        if (subsidiaryInternalId === parentSubId) {
            if (subFields[RECIPIENT_E_DOC_NOTIFICATIONS_FLD]) {
                eiPrefRec.setValue({
                    fieldId: RECIPIENT_E_DOC_NOTIFICATIONS_FLD,
                    value: subFields[RECIPIENT_E_DOC_NOTIFICATIONS_FLD],
                });
            }
            if (subFields[DISABLE_COUNTRY_FLD]) {
                eiPrefRec.setValue({
                    fieldId: DISABLE_COUNTRY_FLD,
                    value: subFields[DISABLE_COUNTRY_FLD],
                });
            }
            if (subFields[E_DOC_COUNTRY_FOR_FREE_USE_FLD]) {
                eiPrefRec.setValue({
                    fieldId: E_DOC_COUNTRY_FOR_FREE_USE_FLD,
                    value: subFields[E_DOC_COUNTRY_FOR_FREE_USE_FLD],
                });
            }
        }

        eiPrefRec.save();
    }

    /**
     * Returns field value from searchResult and searchKey provided in parameters
     * @param searchResult
     * @param searchKey
     */
    function getSearchResult(searchResult, searchKey) {
        return (
            searchResult &&
            searchResult[searchKey] &&
            searchResult[searchKey][0]?.value
        );
    }

    /**
     * Returns boolean value based on record item active or not, with the parameters passed
     * @param recordType
     * @param recordId
     * @param inActiveFld
     * @returns {boolean}
     */
    function getFieldValue(recordType, recordId, inActiveFld) {
        if (!(recordType && recordId && inActiveFld)) return false;

        const queryFldLookUp = query.create({
            type: recordType,
        });
        queryFldLookUp.condition = queryFldLookUp.createCondition({
            fieldId: ID_FLD,
            operator: query.Operator.EQUAL,
            values: recordId,
        });
        queryFldLookUp.columns = [
            queryFldLookUp.createColumn({
                fieldId: inActiveFld,
            }),
        ];
        const queryResultSet = queryFldLookUp.run().results;

        if (!queryResultSet.length) return false;

        return !queryResultSet[0].values[0];
    }

    return {
        getInputData,
        map,
        summarize,
    };
});
