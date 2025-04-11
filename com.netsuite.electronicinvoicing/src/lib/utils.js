define([
    "N/search",
    "N/query",
    "N/ui/serverWidget",
    "N/ui/message",
    "N/error",
    "N/record",
    "N/runtime",
    "../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "./string_formatter",
    "./translator",
    "./constants/main_constants",
    "./constants/message_translations_map",
    "./app/app_transaction_type_map",
    "../app/einvoice/app_einvoice_notifier",
    "./constants/record_fields",
], function (
    search,
    query,
    serverWidget,
    message,
    error,
    record,
    runtime,
    subsidiaryPrefGetter,
    stringFormatter,
    translator,
    mainConstants,
    messageTranslationsMap,
    transactionTypeMap,
    notifier,
    recordFields
) {
    // Core Fields
    var CORE_FIELDS = mainConstants.CORE_FIELDS;
    var INTERNAL_ID_FLD = CORE_FIELDS.INTERNAL_ID;
    var SCRIPT_ID_FLD = CORE_FIELDS.SCRIPT_ID;
    var ID_FLD = CORE_FIELDS.ID;
    var INACTIVE_FLD_ID = CORE_FIELDS.INACTIVE;
    var SUBSIDIARY = CORE_FIELDS.SUBSIDIARY;

    // Error Codes
    var ERR_CODES = messageTranslationsMap.ERR_CODES;
    var ERR_CODE_OBJ_REQUIRED_FLD_MISSING =
        ERR_CODES.ERR_CODE_REQUIRED_FIELD_MISSING;

    // Features
    var SUBSIDIARIES_FEATURE = mainConstants.FEATURES.SUBSIDIARIES;

    // Transaction Response Sending Method Record and Fields
    var RECORD_TYPES = mainConstants.RECORD_TYPES;
    var SENDING_METHOD_REC_TYPE = RECORD_TYPES.EI_SENDING_METHOD;
    var TRANS_RES_SEND_METH_REC_FIELDS = recordFields[SENDING_METHOD_REC_TYPE];

    //Subsidiary Preference related fields
    var SUB_PREF_REC = RECORD_TYPES.SUBSIDIARY_PREF;
    var SUB_PREF_FIELDS = recordFields[SUB_PREF_REC];

    var SI_PARENT_COMPANY_ID = 1;

    /**
     * getInternalIdUsingScriptId: This function gets Internal Id from Script Id.
     *
     * @param { string } type
     * @param { string } scriptId
     * @returns id
     */
    function getInternalIdUsingScriptId(type, scriptId) {
        log.debug("utils: getInternalIdUsingScriptId(): type", type);
        log.debug("utils: getInternalIdUsingScriptId(): scriptId", scriptId);

        var internalId = null;
        var searchObj = search.create({
            type: type,
            filters: [
                search.createFilter({
                    name: SCRIPT_ID_FLD,
                    operator: search.Operator.IS,
                    values: scriptId,
                }),
            ],
            columns: [INTERNAL_ID_FLD],
        });
        searchObj.run().each(function (res) {
            internalId = res.getValue(INTERNAL_ID_FLD);
        });

        if (internalId === null) {
            log.error(
                "utils: getInternalIdUsingScriptId()",
                "No internal ID found for scriptId: " + scriptId
            );
            return internalId;
        }

        log.debug(
            "utils: getInternalIdUsingScriptId(): internalId",
            internalId
        );
        return internalId;
    }

    /**
     * getScriptIdUsingInternalId: This function gets script Id in lowercase from internal Id.
     *
     * @param { string } type
     * @param { string } internalId
     * @returns scriptId
     */
    function getScriptIdUsingInternalId(type, internalId) {
        log.debug("utils: getScriptIdUsingInternalId(): type", type);
        log.debug(
            "utils: getScriptIdUsingInternalId(): internalId",
            internalId
        );

        var scriptId = null;
        var searchObj = search.create({
            type: type,
            filters: [
                search.createFilter({
                    name: INTERNAL_ID_FLD,
                    operator: search.Operator.IS,
                    values: internalId,
                }),
            ],
            columns: [SCRIPT_ID_FLD],
        });
        searchObj.run().each(function (res) {
            scriptId = res.getValue(SCRIPT_ID_FLD);
        });

        if (scriptId === null) {
            log.error(
                "utils: getScriptIdUsingInternalId()",
                "No script ID found for internalId: " + internalId
            );
            return scriptId;
        }

        log.debug("utils: getScriptIdUsingInternalId(): scriptId", scriptId);
        return scriptId;
    }

    /**
     * getScriptIdUsingInternalIdQuery: This function gets script Id in lowercase from internal Id using N/query.
     *
     * @param { string } type
     * @param { string } internalId
     * @returns scriptId
     */
    function getScriptIdUsingInternalIdQuery(type, internalId) {
        log.debug("utils: getScriptIdUsingInternalIdQuery(): type", type);
        log.debug(
            "utils: getScriptIdUsingInternalIdQuery(): internalId",
            internalId
        );

        var scriptId = null;
        var queryObj = query.create({
            type: type,
        });
        queryObj.condition = queryObj.createCondition({
            fieldId: ID_FLD,
            operator: query.Operator.EQUAL,
            values: internalId,
        });
        queryObj.columns = [
            queryObj.createColumn({
                fieldId: SCRIPT_ID_FLD,
            }),
        ];
        var respTypeResult = queryObj.run().asMappedResults();
        if (respTypeResult[0] && respTypeResult[0][SCRIPT_ID_FLD]) {
            scriptId = respTypeResult[0][SCRIPT_ID_FLD];
        }

        if (scriptId === null) {
            log.error(
                "utils: getScriptIdUsingInternalIdQuery()",
                "No script ID found for internalId: " + internalId
            );
            return scriptId;
        }

        log.debug("utils: getScriptIdUsingInternalId(): scriptId", scriptId);
        return scriptId;
    }

    /**
     * getInternalIdUsingScriptIdQuery: This function gets internal Id from script Id using N/query.
     *
     * @param { string } type
     * @param { string } scriptId
     * @returns internalId
     */
    function getInternalIdUsingScriptIdQuery(type, scriptId) {
        log.debug("utils: getInternalIdUsingScriptIdQuery(): type", type);
        log.debug(
            "utils: getInternalIdUsingScriptIdQuery(): internalId",
            scriptId
        );

        var internalId = null;
        var queryObj = query.create({
            type: type,
        });
        queryObj.condition = queryObj.createCondition({
            fieldId: SCRIPT_ID_FLD,
            operator: query.Operator.IS,
            values: scriptId,
        });
        queryObj.columns = [
            queryObj.createColumn({
                fieldId: ID_FLD,
            }),
        ];
        var respTypeResult = queryObj.run().asMappedResults();
        if (respTypeResult[0] && respTypeResult[0][ID_FLD]) {
            internalId = respTypeResult[0][ID_FLD];
        }

        if (internalId === null) {
            log.error(
                "utils: getInternalIdUsingScriptIdQuery()",
                "No internal ID found for scriptId: " + scriptId
            );
            return internalId;
        }

        log.debug(
            "utils: getScriptIdUsingInternalId(): internalId",
            internalId
        );
        return internalId;
    }

    /**
     * Returns object containing transaction field values of the columns passed
     * @param tranId
     * @param columns
     * @returns tranDetails
     */
    function getTransactionDetails(tranId, columns) {
        log.debug("utils: getTransactionDetails(): tranId", tranId);
        log.debug("utils: getTransactionDetails(): columns", columns);

        var tranDetails = {};
        var searchColumns = [];
        var isSI = !isOWAccount();

        columns.forEach(function initSearchColumns(column) {
            if (isSI && column === SUBSIDIARY) {
                tranDetails[column] = SI_PARENT_COMPANY_ID;
            } else {
                searchColumns.push(column);
            }
        });

        var tranDetailsLookup = search.lookupFields({
            type: search.Type.TRANSACTION,
            id: tranId,
            columns: searchColumns,
        });
        log.debug(
            "utils: getTransactionDetails(): tranDetailsLookup",
            tranDetailsLookup
        );

        searchColumns.forEach(function initTranDetails(tranColumnId) {
            if (
                Array.isArray(tranDetailsLookup[tranColumnId]) &&
                tranDetailsLookup[tranColumnId] &&
                tranDetailsLookup[tranColumnId].length
            ) {
                tranDetails[tranColumnId] =
                    tranDetailsLookup[tranColumnId][0].value;
            } else if (tranDetailsLookup[tranColumnId]) {
                tranDetails[tranColumnId] = tranDetailsLookup[tranColumnId];
            }
        });

        log.debug("utils: getTransactionDetails(): tranDetails", tranDetails);

        return tranDetails;
    }

    /**
     * Returns true if mandate status is "Completed" for the given subsidiary and mandate value else false
     * @param subsidiaryId
     * @param mandateVal
     * @returns isActive
     */
    function isMandateStatusActive(subsidiaryId, mandateVal) {
        log.debug("utils: isMandateStatusActive(): subsidiaryId", subsidiaryId);
        log.debug("utils: isMandateStatusActive(): mandateVal", mandateVal);

        var isActive = false;
        var MANDATE_STATUS_REC_TYPE = "customrecord_nseb_av_mandate_status";
        var MANDATE_SUBSIDIARY_FLD_ID = "custrecord_nseb_mandate_sub";
        var MANDATE_FLD_ID = "custrecord_nseb_mandate_id";
        var MANDATE_ACTIVATION_STATUS_FLD_ID =
            "custrecord_nseb_mandate_av_status";
        var COMPLETED_STATUS_AV_MANDATE = "Completed";

        var mandateQuery = query.create({
            type: MANDATE_STATUS_REC_TYPE,
        });
        var mandateCondition = mandateQuery.createCondition({
            fieldId: MANDATE_FLD_ID,
            operator: query.Operator.IS,
            values: mandateVal,
        });
        var mandateQueryCondition = mandateCondition;

        if (isOWAccount()) {
            var subsidiaryCondition = mandateQuery.createCondition({
                fieldId: MANDATE_SUBSIDIARY_FLD_ID,
                operator: query.Operator.EQUAL,
                values: subsidiaryId,
            });

            mandateQueryCondition = mandateQuery.and(
                subsidiaryCondition,
                mandateCondition
            );
        }

        mandateQuery.condition = mandateQueryCondition;

        mandateQuery.columns = [
            mandateQuery.createColumn({
                fieldId: MANDATE_ACTIVATION_STATUS_FLD_ID,
            }),
        ];

        var mandateQueryResults = mandateQuery.run().asMappedResults();
        log.debug(
            "utils: isMandateStatusActive(): mandateQueryResults",
            mandateQueryResults
        );

        if (mandateQueryResults.length) {
            var mandateQueryResultObj = mandateQueryResults[0];
            var mandateActivationStatus =
                mandateQueryResultObj[MANDATE_ACTIVATION_STATUS_FLD_ID];
            log.debug(
                "utils: isMandateStatusActive(): mandateActivationStatus",
                mandateActivationStatus
            );
            isActive = mandateActivationStatus === COMPLETED_STATUS_AV_MANDATE;
        }

        log.debug("utils: isMandateStatusActive(): isActive", isActive);

        return isActive;
    }

    /**
     * Returns object containing subsidiary pref active value and is "Support Transaction Response" checked or not fot the given subsidiary id
     * @param subsidiaryId
     * @returns {isSubActive, isTransRespSupportEnabled}
     */
    function transRespAllowedData(subsidiaryId) {
        log.debug("utils: transRespAllowedData(): subsidiaryId", subsidiaryId);

        var subsidiaryFieldScriptIds = [
            SUB_PREF_FIELDS.TR_SUPPORT,
            INACTIVE_FLD_ID,
            SUB_PREF_FIELDS.TR_SEND_METH,
            SUB_PREF_FIELDS.SENDER,
        ];
        var subsidiaryPreferencesObj =
            subsidiaryPrefGetter.getSubsidiaryPreferencesFieldValues(
                subsidiaryId,
                subsidiaryFieldScriptIds
            );
        log.debug(
            "utils: transRespAllowedData(): subsidiaryPreferencesObj",
            subsidiaryPreferencesObj
        );

        return {
            isSubActive: !subsidiaryPreferencesObj[INACTIVE_FLD_ID],
            isTransRespSupportEnabled:
                subsidiaryPreferencesObj[SUB_PREF_FIELDS.TR_SUPPORT],
            sendMethId: subsidiaryPreferencesObj[SUB_PREF_FIELDS.TR_SEND_METH],
            sender: subsidiaryPreferencesObj[SUB_PREF_FIELDS.SENDER]
        };
    }

    /**
     * Hides all the fields passed as array in the given form object
     * @param fldIdsArr
     * @param form
     */
    function hideFields(fldIdsArr, form) {
        log.debug("utils: hideFields(): fldIdsArr", fldIdsArr);
        log.debug("utils: hideFields(): form", form);

        fldIdsArr.forEach(function updateDisplayTypeHidden(fldId) {
            var fld = form.getField({
                id: fldId,
            });
            if (fld) {
                fld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN,
                });
                log.debug("utils: hideFields(): field hidden", fldId);
            }
        });
    }

    /**
     * Returns inserted button object on form object(passed as argument) according to the button input data(passed as argument)
     * @param btnInputData
     * @param form
     * @returns serverWidget.Button object
     */
    function insertButton(btnInputData, form) {
        log.debug("utils: insertButton(): btnInputData", btnInputData);
        log.debug("utils: insertButton(): form", form);

        var btnOptions = {
            id: btnInputData.id,
            label: btnInputData.label,
        };
        var btnArgumentsArr = btnInputData.btnArgs;
        var functionNameVal = btnInputData.functionName + "(";
        var lastArgumentIndex = btnArgumentsArr.length - 1;

        btnArgumentsArr.forEach(function insertArgumentsToFunction(
            btnArgument,
            argumentIndex
        ) {
            functionNameVal += getArgumentValue(btnArgument);
            functionNameVal += argumentIndex === lastArgumentIndex ? ")" : ",";
        });

        btnOptions.functionName = functionNameVal;
        log.debug("utils: insertButton(): btnOptions", btnOptions);

        return form.addButton(btnOptions);
    }

    /**
     * Returns argument value based on type of given btnArgument
     * @param btnArgument
     * @returns string/number
     */
    function getArgumentValue(btnArgument) {
        switch (typeof btnArgument) {
            case "string":
                return "'" + btnArgument + "'";
            case "number":
                return btnArgument;
            default:
                return "''";
        }
    }

    /**
     * Validates all the fields passed as array are having value in the given record object
     * @param fieldsArr
     * @param recordObj
     */
    function validateFieldsAreNotEmpty(fieldsArr, recordObj) {
        log.debug("utils: validateFieldsAreNotEmpty(): fieldsArr", fieldsArr);
        log.debug("utils: validateFieldsAreNotEmpty(): recordObj", recordObj);

        fieldsArr.forEach(function throwErrorIfEmpty(fieldId) {
            var fldVal = recordObj.getValue({
                fieldId: fieldId,
            });
            if (!fldVal) {
                var fldLabel = recordObj.getField({
                    fieldId: fieldId,
                }).label;
                var errMsgReqFldMissing =
                    translator.getString(
                        ERR_CODE_OBJ_REQUIRED_FLD_MISSING.MESSAGE_TRANSLATION_CODE
                    ) || ERR_CODE_OBJ_REQUIRED_FLD_MISSING.MESSAGE;

                stringFormatter.setString(errMsgReqFldMissing);
                stringFormatter.replaceParameters({
                    FIELDLABEL: fldLabel,
                });
                errMsgReqFldMissing = stringFormatter.toString();
                throw error.create({
                    name: ERR_CODE_OBJ_REQUIRED_FLD_MISSING.NAME,
                    message: errMsgReqFldMissing,
                });
            }
        });

        log.debug("utils: validateFieldsAreNotEmpty(): ", true);

        return true;
    }

    /**
     * Update fields on the record matching with type and id
     * @param type
     * @param id
     * @param fieldsValToUpdate
     */
    function updateFieldValues(type, id, fieldsValToUpdate) {
        log.debug("updateFieldValues", fieldsValToUpdate);
        try {
            record.submitFields({
                type: type,
                id: id,
                values: fieldsValToUpdate,
            });
        } catch (err) {
            log.error(
                "Error occurred while updating fields",
                err.name + "  " + err.stack
            );
            throw err;
        }
    }

    /**
     * Displays banner based on the required params and options passed
     * @param messageType
     * @param title
     * @param bannerMessage
     * @param options
     */
    function displayBanner(messageType, title, bannerMessage, options) {
        log.debug("utils: displayBanner(): messageType", messageType);
        log.debug("utils: displayBanner(): title", title);
        log.debug("utils: displayBanner(): bannerMessage", bannerMessage);
        log.debug("utils: displayBanner(): options", options);

        message
            .create({
                type: messageType,
                title: title,
                message: bannerMessage,
            })
            .show(options);
    }

    /**
     * Returns field object with values from the given record object
     * @param recordObj
     * @param fieldObj
     * @returns object
     */
    function getRecordFieldValues(recordObj, fieldObj) {
        log.debug("utils: getRecordFieldValues(): recordObj", recordObj);
        log.debug("utils: getRecordFieldValues(): fieldObj", fieldObj);

        var recordFieldValues = {};
        for (var fld in fieldObj) {
            recordFieldValues[fld] = recordObj.getValue(fieldObj[fld]);
        }

        log.debug(
            "utils: getRecordFieldValues(): recordFieldValues",
            recordFieldValues
        );

        return recordFieldValues;
    }

    /**
     * @returns boolean based on Subsidiaries feature
     */
    function isOWAccount() {
        return runtime.isFeatureInEffect(SUBSIDIARIES_FEATURE);
    }

    /**
     * Returns entity record type(customer or vendor) based on transaction code
     * @param {*} transCode
     * @returns record type(string)
     */
    function getEntityRecTypeUsingTransCode(transCode) {
        log.debug(
            "utils: getEntityRecTypeUsingTransCode(): transCode",
            transCode
        );

        return transactionTypeMap.isSalesTransaction(transCode)
            ? record.Type.CUSTOMER
            : record.Type.VENDOR;
    }

    /**
    /**
     * This function returns the Transaction response sending method details
     * @param {*} sendMethId
     * @returns Object
     */
    function getTRSendMethdDetails(sendMethId) {
        log.debug("utils: getTRSendMethdDetails:sendMethId", sendMethId);
        var trSendMethDetails = search.lookupFields({
            type: SENDING_METHOD_REC_TYPE,
            id: sendMethId,
            columns: [
                INACTIVE_FLD_ID,
                TRANS_RES_SEND_METH_REC_FIELDS.CHANNEL_REC,
                TRANS_RES_SEND_METH_REC_FIELDS.IMPLEMENTATION_REC,
                TRANS_RES_SEND_METH_REC_FIELDS.SCRIPT_ID,
            ],
        });
        return {
            isInactive: trSendMethDetails[INACTIVE_FLD_ID],
            channel:
                trSendMethDetails[TRANS_RES_SEND_METH_REC_FIELDS.CHANNEL_REC],
            pluginImpl:
                trSendMethDetails[
                    TRANS_RES_SEND_METH_REC_FIELDS.IMPLEMENTATION_REC
                ],
            scriptId:
                trSendMethDetails[TRANS_RES_SEND_METH_REC_FIELDS.SCRIPT_ID],
        };
    }

    /**
     * This function returns the user details based on current user. This is used to send
     * the owner details to plugin Context.
     */
    function getOwner() {
        var currUser = runtime.getCurrentUser();
        var owner = currUser.id;
        if (owner === -4) {
            owner = notifier.getFirstActiveAdmin();
        }
        return owner;
    }
    
    /**
    * Returns object containing data columns present on the passed roleId
    * @param roleId
    * @param columns
    * @returns object
    */
    function getRoleLookupResult(roleId, columns) {
        log.debug("utils: getRoleLookupResult(): roleId", roleId);
        log.debug("utils: getRoleLookupResult(): columns", columns);

        var searchResult;
        try {
            searchResult = search.lookupFields({
                type: search.Type.ROLE,
                id: roleId,
                columns: columns,
            });
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
            return;
        }

        log.debug("utils: getRoleLookupResult(): searchResult", searchResult);
        return searchResult;
    }

    /**
     * Returns translated string based on the type
     * @param translationObj
     * @param type
     * @returns string
     */
    function getTranslatedContent(translationObj, type) {
        var TRANSLATE_TYPES = mainConstants.TRANSLATE_TYPES;
        var transObj = { code: "", str: "" };

        switch (type) {
            case TRANSLATE_TYPES.TITLE:
                transObj.code = translationObj.TITLE_TRANSLATION_CODE;
                transObj.str = translationObj.TITLE;
                break;
            case TRANSLATE_TYPES.MESSAGE:
                transObj.code = translationObj.MESSAGE_TRANSLATION_CODE;
                transObj.str = translationObj.MESSAGE;
                break;
            case TRANSLATE_TYPES.LABEL:
                transObj.code = translationObj.LABEL_TRANSLATION_CODE;
                transObj.str = translationObj.LABEL;
                break;
            default:
                return "";
        }

        return translator.getString(transObj.code) || transObj.str;
    }

    /**
     * @returns true if Sandbox account else false
     */
    function isSandboxAccount() {
        var envType = runtime.envType;
        log.debug("utils: isSandboxAccount(): Environment Type", envType);

        return envType === runtime.EnvType.SANDBOX;
    }

    return {
        getInternalIdUsingScriptId: getInternalIdUsingScriptId,
        getScriptIdUsingInternalId: getScriptIdUsingInternalId,
        getScriptIdUsingInternalIdQuery: getScriptIdUsingInternalIdQuery,
        getInternalIdUsingScriptIdQuery: getInternalIdUsingScriptIdQuery,
        getTransactionDetails: getTransactionDetails,
        isMandateStatusActive: isMandateStatusActive,
        transRespAllowedData: transRespAllowedData,
        hideFields: hideFields,
        insertButton: insertButton,
        validateFieldsAreNotEmpty: validateFieldsAreNotEmpty,
        displayBanner: displayBanner,
        updateFieldValues: updateFieldValues,
        getRecordFieldValues: getRecordFieldValues,
        isOWAccount: isOWAccount,
        getEntityRecTypeUsingTransCode: getEntityRecTypeUsingTransCode,
        getTRSendMethdDetails: getTRSendMethdDetails,
        getOwner: getOwner,
        getRoleLookupResult: getRoleLookupResult,
        getTranslatedContent: getTranslatedContent,
        isSandboxAccount: isSandboxAccount,
    };
});
