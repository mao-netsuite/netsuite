/**
 * @NApiVersion 2.1
 * @NScriptType usereventscript
 *
 */

define([
    "N/error",
    "../../lib/translator",
    "N/search",
    "N/runtime",
    "N/ui/serverWidget",
    "../../app/einvoice/app_einvoice_license_manager",
    "../../app/einvoice/app_einvoice_free_country_check_helper",
    "../../app/einvoice/app_einvoice_country_mapping",
    "N/config",
    "N/query",
    "../../lib/string_formatter",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "../../app/einvoice/app_einvoice_peppol_manager",
    "../../ubl/common/components/subsidiaryPreferencesService",
], function (
    error,
    translator,
    search,
    runtime,
    serverWidget,
    licenseManager,
    freeCountry,
    countryMapping,
    config,
    query,
    stringFormatter,
    subsidiaryPrefGetter,
    peppolManager,
    subsidiaryPreferencesService,
) {
    const ADMINISTRATOR = "administrator";
    const NAME_FLD = "name";
    const SUBSIDIARY_ID = "subsidiary";
    const INACTIVE_FLD = "isinactive";
    const COUNTRY_FLD = "country";
    const ID_FLD = "id";
    const INTERNAL_ID_FLD = "internalid";
    const ENTITY_ID_FLD = "entityid";
    const DISABLE_COUNTRY_FLD = "custrecord_psg_ei_sub_disable_country";
    const E_DOC_COUNTRY_FOR_FREE_USE_FLD =
        "custrecord_psg_ei_sub_edoc_free_country";
    const RECIPIENT_E_DOC_NOTIFICATIONS_FLD =
        "custrecord_psg_ei_sub_notif_recipient";
    const E_DOCUMENT_AUTOMATION_TYPE_FLD =
        "custrecord_psg_ei_sub_edoc_automation";
    const FILTERED_EDOC_SENDER_FIELD = "custpage_psg_ei_filtered_edoc_sender";
    const FILTERED_EDOC_SENDER_FIELD_LABEL = "E-Document Sender";
    const FILTERED_EDOC_SENDER_FIELD_LABEL_CODE =
        "label.custrecord_psg_ei_sub_sender";
    const FILTERED_EDOC_SENDER_FIELD_LABEL_HELP =
        "Select the employee whose name and email address should appear as the sender of e-documents sent by your company. If no employee is selected, the name and email address of the user who sent the e-document will be shown as the sender.";
    const FILTERED_EDOC_SENDER_FIELD_LABEL_HELP_CODE =
        "help.custrecord_psg_ei_sub_sender";
    const FILTERED_COUNTRY_FIELD = "custpage_psg_ei_sub_filtered_free_country";
    const FILTERED_COUNTRY_FIELD_LABEL = "E-Document Country for Free Use";
    const FILTERED_COUNTRY_FIELD_LABEL_CODE =
        "label.custrecord_psg_ei_sub_edoc_free_country";
    const FILTERED_COUNTRY_FIELD_LABEL_HELP =
        "Select a country where you want to send e-documents. After you have sent an e-document, you can no longer edit this field. " +
        "\r\nThe use of the Electronic Invoicing SuiteApp is free if you will send e-documents to only one country. " +
        "To send e-documents to multiple countries, you must purchase a license for Electronic Invoicing. " +
        "If you have an active license, the system ignores this field. " +
        "Only countries with subsidiaries are available in the list.";
    const FILTERED_COUNTRY_FIELD_LABEL_HELP_CODE =
        "help.custrecord_psg_ei_license_free_country_temp";

    const SI_SUBSIDIARY_LABEL = "Parent Company";
    const SI_SUBSIDIARY_LABEL_CODE = "ei.si_subsidiary_pref_title";

    const EI_PREF_CANNOT_BE_CREATED = "EI_PREF_CANNOT_BE_CREATED";
    const EI_PREF_CANNOT_BE_CREATED_MSG =
        "New e-document subsidiary preferences cannot be created.";
    const EI_PREF_CANNOT_BE_CREATED_MSG_CODE = "ei.pref_cannot_be_created_msg";
    const EI_PREF_CANNOT_BE_DELETED = "EI_PREF_CANNOT_BE_DELETED";
    const EI_PREF_CANNOT_BE_DELETED_MSG =
        "To delete an e-document subsidiary preferences record, contact your account administrator.";
    const EI_PREF_CANNOT_BE_DELETED_MSG_CODE = "ei.pref_cannot_be_deleted_msg";
    const EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED =
        "EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED";
    const EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED_MSG =
        "{PARENT_COMPANY_TITLE} cannot be deleted";
    const EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED_MSG_CODE =
        "ei.parent_company_pref_cannot_be_deleted";

    const E_DOC_SENDER_FLD = "custrecord_psg_ei_sub_sender";
    const SUB_INTERNAL_ID_FLD = "custrecord_psg_ei_sub_subsidiary";
    const PEPPOL_ID = "custrecord_psg_ei_peppol_id";

    function beforeLoad(context) {
        const form = context.form;
        const newRecord = context.newRecord;
        const isUI = isUIContext();
        const isOw = freeCountry.isOwAccount();
        const parentSubId = subsidiaryPrefGetter.getParentSubsidiaryId();
        const subId = parseInt(newRecord.getValue(SUB_INTERNAL_ID_FLD));
        const eDocSenderFldVal = newRecord.getValue(E_DOC_SENDER_FLD);
        let subName = "";

        if (isUI) {
            subsidiaryPreferencesService.subsidiaryPreferencesService.addAccountingBookFields(context);
            if (context.type === context.UserEventType.CREATE) {
                throw error.create({
                    name: EI_PREF_CANNOT_BE_CREATED,
                    message:
                        translator.getString(
                            EI_PREF_CANNOT_BE_CREATED_MSG_CODE
                        ) || EI_PREF_CANNOT_BE_CREATED_MSG,
                    notifyOff: true,
                });
            }

            const freeCountryFld = form.getField(
                E_DOC_COUNTRY_FOR_FREE_USE_FLD
            );

            if (isOw) {
                const notifRecipientFld = form.getField(
                    RECIPIENT_E_DOC_NOTIFICATIONS_FLD
                );

                freeCountryFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });

                if (subId !== parentSubId && notifRecipientFld) {
                    notifRecipientFld.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN,
                    });
                } else if (!licenseManager.getLicenseInfo().hasLicense) {
                    insertFilteredFreeCountryField(form, newRecord);
                }

                subName = search.lookupFields({
                    type: search.Type.SUBSIDIARY,
                    id: subId,
                    columns: [NAME_FLD],
                }).name;
            } else {
                subName =
                    translator.getString(SI_SUBSIDIARY_LABEL_CODE) ||
                    SI_SUBSIDIARY_LABEL;
                const companyInfo = config.load({
                    type: config.Type.COMPANY_INFORMATION,
                });
                const ciCountry = companyInfo.getValue(COUNTRY_FLD);

                newRecord.setText(
                    E_DOC_COUNTRY_FOR_FREE_USE_FLD,
                    countryMapping.getFreeCountryInternalId(ciCountry)
                );
                freeCountryFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED,
                });
            }

            const eDocSenderObj = getEdocSenderObj(eDocSenderFldVal);
            insertFilteredSenderField(form, isOw, subId, eDocSenderObj);
            // Dynamic form tile
            if (subName) {
                form.title = subName;
            }

        }


    }

    function beforeSubmit(context) {
        const newRecord = context.newRecord;
        const isUI = isUIContext();
        const isOw = freeCountry.isOwAccount();
        const parentSubId = subsidiaryPrefGetter.getParentSubsidiaryId();

        peppolManager.validatePeppolId(context, PEPPOL_ID);

        if (isUI) {
            subsidiaryPreferencesService.subsidiaryPreferencesService.setSelectedAccountingBookOption(context);
            if (context.type === context.UserEventType.DELETE) {
                const subId = parseInt(newRecord.getValue(SUB_INTERNAL_ID_FLD));
                if (subId === parentSubId) {
                    const parameters = {
                        PARENT_COMPANY_TITLE: isOw
                            ? newRecord.getText(SUB_INTERNAL_ID_FLD)
                            : translator.getString(SI_SUBSIDIARY_LABEL_CODE) ||
                            SI_SUBSIDIARY_LABEL,
                    };
                    throwCompanyPrefCannotBeDeletedErr(parameters);
                }
                if (isOw && !isAdmin()) {
                    throw error.create({
                        name: EI_PREF_CANNOT_BE_DELETED,
                        message:
                            translator.getString(
                                EI_PREF_CANNOT_BE_DELETED_MSG_CODE
                            ) || EI_PREF_CANNOT_BE_DELETED_MSG,
                        notifyOff: true,
                    });
                }
            }
        }
    }

    /**
     * Inserts E-document Sender field with employees of the current subsidiary to the form context in before load entry point
     * @param form
     * @param isOw
     * @param subId
     * @param eDocSenderObj
     */
    function insertFilteredSenderField(form, isOw, subId, eDocSenderObj) {
        const empQuery = query.create({
            type: query.Type.EMPLOYEE,
        });
        const notInactiveCondition = empQuery.createCondition({
            fieldId: INACTIVE_FLD,
            operator: query.Operator.IS,
            values: false,
        });
        if (isOw) {
            const subsidiaryMatchCondition = empQuery.createCondition({
                fieldId: SUBSIDIARY_ID,
                operator: query.Operator.ANY_OF,
                values: subId,
            });
            empQuery.condition = empQuery.and(
                notInactiveCondition,
                subsidiaryMatchCondition
            );
        } else {
            empQuery.condition = notInactiveCondition;
        }
        const tempSenderFld = form.addField({
            id: FILTERED_EDOC_SENDER_FIELD,
            type: serverWidget.FieldType.SELECT,
            label:
                translator.getString(FILTERED_EDOC_SENDER_FIELD_LABEL_CODE) ||
                FILTERED_EDOC_SENDER_FIELD_LABEL,
        });
        tempSenderFld.setHelpText({
            help:
                translator.getString(
                    FILTERED_EDOC_SENDER_FIELD_LABEL_HELP_CODE
                ) || FILTERED_EDOC_SENDER_FIELD_LABEL_HELP,
        });
        form.insertField({
            field: tempSenderFld,
            nextfield: RECIPIENT_E_DOC_NOTIFICATIONS_FLD,
        });

        empQuery.columns = [
            empQuery.createColumn({
                fieldId: ENTITY_ID_FLD,
            }),
            empQuery.createColumn({
                fieldId: ID_FLD,
            }),
        ];

        // To maintain ascending order of employees list
        empQuery.sort = [
            empQuery.createSort({
                column: empQuery.columns[0],
            }),
        ];

        // Empty option for sender
        tempSenderFld.addSelectOption({
            value: "",
            text: "",
        });

        empQuery
            .run()
            .iterator()
            .each(function (result) {
                const empName = result.value.values[0];
                const empInternalId = result.value.values[1];

                tempSenderFld.addSelectOption({
                    value: empInternalId,
                    text: empName,
                });

                return true;
            });
        if (eDocSenderObj.isInactive) {
            tempSenderFld.addSelectOption({
                value: eDocSenderObj.value,
                text: eDocSenderObj.text,
            });
        }

        if (eDocSenderObj.value) {
            tempSenderFld.defaultValue = eDocSenderObj.value;
        }
    }

    /**
     * Inserts E-document Free Country field with countries of existing subsidiaries to the form context in before load entry point
     * @param form
     * @param newRecord
     */
    function insertFilteredFreeCountryField(form, newRecord) {
        const freeCountryFldVal = newRecord.getText(
            E_DOC_COUNTRY_FOR_FREE_USE_FLD
        );
        const countriesWithSubsidiary =
            freeCountry.getCountriesNamesWhichHaveSubsidiaries();
        const allowedCountries = [""].concat(countriesWithSubsidiary);
        const tempCountryField = form.addField({
            id: FILTERED_COUNTRY_FIELD,
            type: serverWidget.FieldType.SELECT,
            label:
                translator.getString(FILTERED_COUNTRY_FIELD_LABEL_CODE) ||
                FILTERED_COUNTRY_FIELD_LABEL,
        });

        tempCountryField.setHelpText({
            help:
                translator.getString(FILTERED_COUNTRY_FIELD_LABEL_HELP_CODE) ||
                FILTERED_COUNTRY_FIELD_LABEL_HELP,
        });
        form.insertField({
            field: tempCountryField,
            nextfield: E_DOCUMENT_AUTOMATION_TYPE_FLD,
        });

        allowedCountries.forEach(function (country) {
            tempCountryField.addSelectOption({
                value: country,
                text: country,
            });
        });

        tempCountryField.defaultValue = freeCountryFldVal;

        if (
            newRecord.getValue(DISABLE_COUNTRY_FLD) &&
            countriesWithSubsidiary.indexOf(freeCountryFldVal) !== -1
        ) {
            tempCountryField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.DISABLED,
            });
        }
    }

    /**
     * Returns eDocument sender employee details with inactive status, value and text based on parameter sent
     * @param eDocSenderFldVal
     */
    function getEdocSenderObj(eDocSenderFldVal) {
        let eDocSenderObj = {};
        if (eDocSenderFldVal) {
            const eDocSenderLookup = search.lookupFields({
                type: search.Type.EMPLOYEE,
                id: eDocSenderFldVal,
                columns: [INACTIVE_FLD, ENTITY_ID_FLD, INTERNAL_ID_FLD],
            });
            eDocSenderObj.isInactive = eDocSenderLookup[INACTIVE_FLD];
            eDocSenderObj.value = eDocSenderLookup[INTERNAL_ID_FLD][0]?.value;
            eDocSenderObj.text = eDocSenderLookup[ENTITY_ID_FLD];
        }
        return eDocSenderObj;
    }

    /**
     * Throws error object with EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED error code with its message (Parent Company title)
     * @param parameters
     */
    function throwCompanyPrefCannotBeDeletedErr(parameters) {
        stringFormatter.setString(
            translator.getString(
                EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED_MSG_CODE
            ) || EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED_MSG
        );
        stringFormatter.replaceParameters(parameters);

        const details = stringFormatter.toString();

        throw error.create({
            name: EI_PARENT_COMPANY_PREF_CANNOT_BE_DELETED,
            message: details,
            notifyOff: true,
        });
    }

    /**
     * Returns true if the currently logged-in user is Administrator
     * @returns {boolean}
     */
    function isAdmin() {
        const userObj = runtime.getCurrentUser();
        const currRoleId = userObj.roleId;
        return currRoleId === ADMINISTRATOR;
    }

    /**
     * Returns true if the current active execution context is from UI
     * @returns {boolean}
     */
    function isUIContext() {
        return runtime.executionContext === runtime.ContextType.USER_INTERFACE;
    }

    return {
        beforeLoad,
        beforeSubmit,
    };
});
