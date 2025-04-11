/**

 * @NApiVersion 2.x

 * @NScriptName Outbound E-Document Bulk Filters Form SU

 * @NScriptId _ei_bulkfltrs_su

 * @NScriptType Suitelet

 */
define([
    "N/ui/serverWidget",
    "../../lib/wrapper/ns_wrapper_form",
    "N/config",
    "N/search",
    "N/url",
    "N/runtime",
    "../../lib/app/app_transaction_type_map",
    "../../app/einvoice/app_einvoice_bulk_processing_manager",
    "../../app/einvoice/app_einvoice_outbound_certification",
], function (
    serverWidget,
    form,
    config,
    search,
    url,
    runtime,
    transactionMap,
    bulkProcessingMgr,
    certification
) {
    var FORM_TITLE = "Bulk E-Document Processing";

    var GENERATE_MR_TYPE = "generateMR";
    var SEND_MR_TYPE = "sendMR";
    var CERTIFY_MR_TYPE = "certifyMR";
    var AUTOMATIC_EI_BULK_PROCESS_MR_TYPE = "sequentialMR";

    var BACK_BUTTON_ID = "custpage_cancel";
    var SCHEDULE_BUTTON_ID = "custpage_schedule";
    var ADD_NEW_SAVED_SEARCH_BUTTON_ID = "custpage_addnewsavedsearch";
    var ADD_REFRESH_BUTTON_ID = "custpage_addrefresh";

    var EI_PROCESS_RADIO_BUTTON_ID = "custpage_ei_process_radio";

    var EI_PROCESS_GENERATE_RADIO_BUTTON_LABEL = "GENERATE E-DOCUMENTS";
    var EI_PROCESS_SEND_RADIO_BUTTON_LABEL = "SEND E-DOCUMENTS";
    var EI_PROCESS_CERTIFY_RADIO_BUTTON_LABEL = "CERTIFY E-DOCUMENTS";
    var EI_PROCESS_AUTOMATIC_RADIO_BUTTON_LABEL =
        "AUTOMATIC EI BULK E-DOCUMENT PROCESSING";

    var EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID = "ei_process_field_group";
    var SAVED_SEARCH_FIELD_GROUP_ID = "saved_search_field_group";
    var EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_LABEL =
        "Select to trigger EI Process";
    var SAVED_SEARCH_FIELD_GROUP_LABEL = "Select Saved Search Name";

    var SAVED_SEARCH_FIELD_ID = "custpage_outbound_svdsrch";
    var SAVED_SEARCH_FIELD_LABEL = "Saved Search Name";

    var ADD_NEW_SAVED_SEARCH_BUTTON_LABEL = "Add New Saved Search";
    var ADD_REFRESH_BUTTON_LABEL = "Refresh";
    var BACK_BUTTON_LABEL = "Back";
    var SCHEDULE_BUTTON_LABEL = "Schedule";

    var APP_URL_FIELD_ID = "appurl";

    var SAVED_SEARCH_RESULT_LIST_LABEL = "Visit Saved Search Result List";
    var TRANSACTION_DETAILS_LIST_LABEL = "Audit Trail";

    var CLIENT_SCRIPT_FILENAME =
        "../../comp/cs/dist/cs_ei_outbound_bulkfltr_form";

    var READY_FOR_GENERATION = 1;
    var READY_FOR_SENDING = 3;
    var READY_FOR_CERTIFICATION = 19;
    var GENERATION_FAILED = 5;
    var SENDING_FAILED = 8;
    var CERTIFICATION_DATA_ERROR = 21;
    var CERTIFICATION_FAILED = 22;

    var SUBLIST_ID = "custpage_sublisteiprocess";
    var SUBLIST_LABEL = "Select Specific Transactions for EI Process";

    var MARKALL_BUTTON_ID = "custpage_markall";
    var UNMARKALL_BUTTON_ID = "custpage_unmarkall";
    var MARKALL_BUTTON_LABEL = "Mark All";
    var UNMARKALL_BUTTON_LABEL = "Unmark All";

    var SUBLIST_SELECT_TXN_FIELD_ID = "custpage_selecttxn";
    var SUBLIST_EDITVIEW_FIELD_ID = "custpage_editview";
    var SUBLIST_INTERNALID_FIELD_ID = "custpage_internalid";
    var SUBLIST_TXNNUM_FIELD_ID = "custpage_txnnum";
    var SUBLIST_TXNTYPE_FIELD_ID = "custpage_txntype";
    var SUBLIST_EDOCSTS_FIELD_ID = "custpage_edocsts";
    var SUBLIST_STATUS_FIELD_ID = "custpage_status";
    var SUBLIST_SUBSIDIARY_FIELD_ID = "custpage_subsidiary";
    var SUBLIST_TXNDATE_FIELD_ID = "custpage_td";
    var SUBLIST_CURRENCY_FIELD_ID = "custpage_curr";
    var SUBLIST_NETAMOUNT_FIELD_ID = "custpage_amt";

    var SUBLIST_SELECT_TXN_FIELD_LABEL = "Select All";
    var SUBLIST_EDITVIEW_FIELD_LABEL = "Edit|View";
    var SUBLIST_INTERNALID_FIELD_LABEL = "InternalId";
    var SUBLIST_TXNNUM_FIELD_LABEL = "Transaction Number";
    var SUBLIST_TXNTYPE_FIELD_LABEL = "Transaction Type";
    var SUBLIST_EDOCSTS_FIELD_LABEL = "E-Document Status";
    var SUBLIST_STATUS_FIELD_LABEL = "Process Status";
    var SUBLIST_SUBSIDIARY_FIELD_LABEL = "Subsidiary";
    var SUBLIST_TXNDATE_FIELD_LABEL = "Transaction Date";
    var SUBLIST_CURRENCY_FIELD_LABEL = "Currency";
    var SUBLIST_NETAMOUNT_FIELD_LABEL = "Net Amount";

    var allowedCountry;
    var savedSearchIdArr = [];
    var savedSearchInternalIdArr = [];
    var eiProcessTypeValue;
    var saveSearchId;
    var isOW;
    var isMultipleCurrencyFeatureEnabled;

    var MAX_COUNT_OF_SUBLIST_ROWS = 20000;

    function onRequest(context) {
        if (context.request.method === "GET") {
            eiProcessTypeValue = context.request.parameters
                .custpage_outbound_eiProcessType
                ? context.request.parameters.custpage_outbound_eiProcessType
                : "";

            saveSearchId = context.request.parameters
                .custpage_outbound_savesearchid
                ? context.request.parameters.custpage_outbound_savesearchid
                : "";

            if (eiProcessTypeValue === AUTOMATIC_EI_BULK_PROCESS_MR_TYPE) {
                FORM_TITLE = "Automatic Bulk E-Document Processing";
            }

            form.createForm({
                title: FORM_TITLE,
            });

            var formObject = form.getFormObject();

            addFormFields(formObject, eiProcessTypeValue);
            loadSavedSearch(formObject);
            addClientScript(formObject);

            if (saveSearchId) {
                addSavedSearchResultLink(formObject, saveSearchId);
                log.debug("saveSearchId", saveSearchId);
            }

            addAuditTrailLink(formObject);
            addSublist(formObject, eiProcessTypeValue, saveSearchId);

            context.response.writePage(formObject);
        }
    }

    function addClientScript(formObject) {
        formObject.clientScriptModulePath = CLIENT_SCRIPT_FILENAME;
    }

    function addSubmitButtonName(eiProcessTypeVal) {
        var eiProcessTypeObj = {
            generateMR: "Generate",
            sendMR: "Send",
            certifyMR: "Certify",
            sequentialMR: "Automatic",
            defaultMR: "Submit",
        };

        return eiProcessTypeObj[eiProcessTypeVal] || eiProcessTypeObj.defaultMR;
    }

    function addFormButtons(formObject, eiPrcssType) {
        formObject.addSubmitButton({
            label: addSubmitButtonName(eiPrcssType),
        });

        formObject.addButton({
            id: BACK_BUTTON_ID,
            label: BACK_BUTTON_LABEL,
        });

        formObject.addButton({
            id: ADD_NEW_SAVED_SEARCH_BUTTON_ID,
            label: ADD_NEW_SAVED_SEARCH_BUTTON_LABEL,
        });

        formObject.addButton({
            id: ADD_REFRESH_BUTTON_ID,
            label: ADD_REFRESH_BUTTON_LABEL,
        });

        formObject.addButton({
            id: SCHEDULE_BUTTON_ID,
            label: SCHEDULE_BUTTON_LABEL,
        });
    }

    function addFormFieldsGroups(formObject) {
        formObject.addFieldGroup({
            id: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID,
            label: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_LABEL,
        });

        formObject.addFieldGroup({
            id: SAVED_SEARCH_FIELD_GROUP_ID,
            label: SAVED_SEARCH_FIELD_GROUP_LABEL,
        });
    }

    function addFormRadioButtons(formObject, eiProcessType) {
        var generateEIProcess = formObject.addField({
            id: EI_PROCESS_RADIO_BUTTON_ID,
            type: serverWidget.FieldType.RADIO,
            label: EI_PROCESS_GENERATE_RADIO_BUTTON_LABEL,
            source: GENERATE_MR_TYPE,
            container: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID,
        });

        if (eiProcessType === GENERATE_MR_TYPE) {
            generateEIProcess.defaultValue = GENERATE_MR_TYPE;
        }

        if (certification.isSendCertificationEnabled()) {
            var certifyEIProcess = formObject.addField({
                id: EI_PROCESS_RADIO_BUTTON_ID,
                type: serverWidget.FieldType.RADIO,
                label: EI_PROCESS_CERTIFY_RADIO_BUTTON_LABEL,
                source: CERTIFY_MR_TYPE,
                container: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID,
            });

            if (eiProcessType === CERTIFY_MR_TYPE) {
                certifyEIProcess.defaultValue = CERTIFY_MR_TYPE;
            }
        }

        var sendEIProcess = formObject.addField({
            id: EI_PROCESS_RADIO_BUTTON_ID,
            type: serverWidget.FieldType.RADIO,
            label: EI_PROCESS_SEND_RADIO_BUTTON_LABEL,
            source: SEND_MR_TYPE,
            container: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID,
        });

        if (eiProcessType === SEND_MR_TYPE) {
            sendEIProcess.defaultValue = SEND_MR_TYPE;
        }

        var automateEIProcess = formObject.addField({
            id: EI_PROCESS_RADIO_BUTTON_ID,
            type: serverWidget.FieldType.RADIO,
            label: EI_PROCESS_AUTOMATIC_RADIO_BUTTON_LABEL,
            source: AUTOMATIC_EI_BULK_PROCESS_MR_TYPE,
            container: EI_PROCESS_RADIO_BUTTON_FIELD_GROUP_ID,
        });

        if (eiProcessType === AUTOMATIC_EI_BULK_PROCESS_MR_TYPE) {
            automateEIProcess.defaultValue = AUTOMATIC_EI_BULK_PROCESS_MR_TYPE;
        }
    }

    function addFormSelectField(formObject) {
        formObject.addField({
            id: SAVED_SEARCH_FIELD_ID,
            type: serverWidget.FieldType.SELECT,
            label: SAVED_SEARCH_FIELD_LABEL,
            container: SAVED_SEARCH_FIELD_GROUP_ID,
        });
    }

    function addFormFields(formObject, eiPrcsTypeValue) {
        addFormButtons(formObject, eiPrcsTypeValue);
        addFormFieldsGroups(formObject);
        addFormRadioButtons(formObject, eiPrcsTypeValue);
        addFormSelectField(formObject);
    }

    function loadSavedSearch(formObject) {
        var savedsrchfld = formObject.getField({ id: SAVED_SEARCH_FIELD_ID });
        var savedSearchIdVal;

        savedsrchfld.addSelectOption({
            value: " ",
            text: " ",
        });

        try {
            var savedSearchResult = search.create({
                type: search.Type.SAVED_SEARCH,
                filters: [["recordtype", "is", "Transaction"]],
                columns: ["title", "id", "internalid"],
            });

            if (savedSearchResult) {
                var searchResultPage = savedSearchResult.runPaged({
                    pageSize: 1000,
                });
                searchResultPage.pageRanges.forEach(function (pageRange) {
                    var currPage = searchResultPage.fetch({
                        index: pageRange.index,
                    });
                    currPage.data.forEach(function (searchResult) {
                        savedSearchIdVal = searchResult.getValue("title");

                        if (
                            savedSearchIdVal
                                .toString()
                                .toLowerCase()
                                .search("eiblkfltr") === 0
                        ) {
                            savedsrchfld.addSelectOption({
                                value: searchResult.getValue("id"),
                                text: searchResult.getValue("title"),
                            });

                            savedSearchIdArr.push(searchResult.getValue("id"));
                            savedSearchInternalIdArr.push(
                                searchResult.getValue("internalid")
                            );
                        }
                    });
                });
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function getHomeURL() {
        var companyInfo = config.load({
            type: config.Type.COMPANY_INFORMATION,
        });

        var homeURL;

        if (companyInfo.getValue(APP_URL_FIELD_ID)) {
            homeURL = companyInfo.getValue(APP_URL_FIELD_ID);
        }

        return homeURL;
    }

    function addAuditTrailLink(formObject) {
        var homeURL = getHomeURL();

        try {
            if (homeURL) {
                var buildDashboardURL = "/app/center/card.nl?sc=-29&whence=";
                var dashboardURL = homeURL + buildDashboardURL;

                formObject.addPageLink({
                    type: serverWidget.FormPageLinkType.CROSSLINK,
                    title: TRANSACTION_DETAILS_LIST_LABEL,
                    url: dashboardURL,
                });
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function addSavedSearchResultLink(formObject, savedSearchId) {
        var homeURL = getHomeURL();

        try {
            if (homeURL) {
                var indexOfSSId = savedSearchIdArr.indexOf(savedSearchId);
                var buildSavedSearchListUrlprefix =
                    "/app/common/search/searchresults.nl?searchid=";

                var buildSavedSearchListUrlsuffix = "&whence=";

                if (savedSearchInternalIdArr[indexOfSSId]) {
                    var finalSavedSearchListURL =
                        homeURL +
                        buildSavedSearchListUrlprefix +
                        savedSearchInternalIdArr[indexOfSSId] +
                        buildSavedSearchListUrlsuffix;

                    formObject.addPageLink({
                        type: serverWidget.FormPageLinkType.CROSSLINK,
                        title: SAVED_SEARCH_RESULT_LIST_LABEL,
                        url: finalSavedSearchListURL,
                    });
                }
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function getColumns() {
        var columns = [
            "internalid",
            "tranid",
            "trandate",
            "type",
            "custbody_psg_ei_status",
            "netamount",
            "transactionnumber",
        ];

        isOW = runtime.isFeatureInEffect("SUBSIDIARIES");
        isMultipleCurrencyFeatureEnabled =
            runtime.isFeatureInEffect("MULTICURRENCY");

        if (isOW) {
            columns.push("subsidiary");
        }
        if (isMultipleCurrencyFeatureEnabled) {
            columns.push("currency");
        }

        return columns;
    }

    function addSublist(formObject, eiProcessTypeVal, saveSrchId) {
        var eiProcessSublist = formObject.addSublist({
            id: SUBLIST_ID,
            type: serverWidget.SublistType.LIST,
            label: SUBLIST_LABEL,
        });

        var markAll = eiProcessSublist.addButton({
            id: MARKALL_BUTTON_ID,
            label: MARKALL_BUTTON_LABEL,
            functionName: "markAll();",
        });

        var unmarkAll = eiProcessSublist.addButton({
            id: UNMARKALL_BUTTON_ID,
            label: UNMARKALL_BUTTON_LABEL,
            functionName: "unmarkAll();",
        });

        markAll.isHidden = true;
        unmarkAll.isHidden = true;

        var cbval = eiProcessSublist.addField({
            id: SUBLIST_SELECT_TXN_FIELD_ID,
            label: SUBLIST_SELECT_TXN_FIELD_LABEL,
            type: serverWidget.FieldType.CHECKBOX,
        });
        cbval.defaultValue = "T";
        eiProcessSublist.addField({
            id: SUBLIST_EDITVIEW_FIELD_ID,
            label: SUBLIST_EDITVIEW_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        var internalidFld = eiProcessSublist.addField({
            id: SUBLIST_INTERNALID_FIELD_ID,
            label: SUBLIST_INTERNALID_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_TXNNUM_FIELD_ID,
            label: SUBLIST_TXNNUM_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_TXNDATE_FIELD_ID,
            label: SUBLIST_TXNDATE_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_TXNTYPE_FIELD_ID,
            label: SUBLIST_TXNTYPE_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_EDOCSTS_FIELD_ID,
            label: SUBLIST_EDOCSTS_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_SUBSIDIARY_FIELD_ID,
            label: SUBLIST_SUBSIDIARY_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_CURRENCY_FIELD_ID,
            label: SUBLIST_CURRENCY_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_NETAMOUNT_FIELD_ID,
            label: SUBLIST_NETAMOUNT_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });
        eiProcessSublist.addField({
            id: SUBLIST_STATUS_FIELD_ID,
            label: SUBLIST_STATUS_FIELD_LABEL,
            type: serverWidget.FieldType.TEXT,
        });

        internalidFld.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN,
        });

        try {
            if (eiProcessTypeVal && saveSrchId === "") {
                addDataToSublist(
                    eiProcessSublist,
                    eiProcessTypeVal,
                    markAll,
                    unmarkAll
                );
            }
            if (saveSrchId !== "") {
                addDataToSublistForSavedSearch(
                    eiProcessSublist,
                    eiProcessTypeVal,
                    saveSrchId,
                    markAll,
                    unmarkAll
                );
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function getEDOCStatus() {
        var edocStsArr = [
            "For Generation",
            "Ready for Sending",
            "Sending Failed",
            "Generation Failed",
        ];

        if (certification.isSendCertificationEnabled()) {
            edocStsArr.push("Ready for Certification");
            edocStsArr.push("Certification Failed");
            edocStsArr.push("Certification Data Error");
        }

        return edocStsArr;
    }

    function addDataToSublistForSavedSearch(
        eiProcessSublist,
        eiProcessTypeVal,
        saveSrchIdVal,
        markAll,
        unmarkAll
    ) {
        var lineno = 0;
        var validTxnRow = false;
        var edocSts;
        var txnid;

        var uniqueSavedSearchArr = [];
        var uniqueSavedSearchRowsArr = [];
        var eDOCStatusArray = getEDOCStatus();

        try {
            var savedSearchObj = search.load({
                id: saveSrchIdVal,
            });

            if (savedSearchObj) {
                var searchResult = savedSearchObj.runPaged({
                    pageSize: 1000,
                });
                searchResult.pageRanges.forEach(function (pageRange) {
                    var currPage = searchResult.fetch({
                        index: pageRange.index,
                    });
                    currPage.data.forEach(function (result) {
                        if (uniqueSavedSearchArr.indexOf(result["id"]) === -1) {
                            uniqueSavedSearchArr.push(result["id"]);
                        }
                    });
                });

                var filterExpressions =
                    getFiltersForTransaction(eiProcessTypeVal);

                var transSearch = search.create({
                    type: search.Type.TRANSACTION,
                    filters: filterExpressions,
                    columns: getColumns(),
                });

                if (transSearch) {
                    var tranSearchResult = transSearch.runPaged({
                        pageSize: 1000,
                    });
                    tranSearchResult.pageRanges.forEach(function (pageRange) {
                        var currPage = tranSearchResult.fetch({
                            index: pageRange.index,
                        });
                        currPage.data.forEach(function (result) {
                            if (lineno < MAX_COUNT_OF_SUBLIST_ROWS) {
                                edocSts = result.getText(
                                    "custbody_psg_ei_status"
                                );
                                txnid = result["id"];

                                if (
                                    (eiProcessTypeVal === GENERATE_MR_TYPE ||
                                        eiProcessTypeVal ===
                                            AUTOMATIC_EI_BULK_PROCESS_MR_TYPE) &&
                                    (edocSts === "For Generation" ||
                                        edocSts === "Generation Failed")
                                ) {
                                    validTxnRow = true;
                                } else if (
                                    eiProcessTypeVal === SEND_MR_TYPE &&
                                    edocSts === "Ready for Sending"
                                ) {
                                    validTxnRow = true;
                                } else if (
                                    eiProcessTypeVal === CERTIFY_MR_TYPE &&
                                    edocSts === "Ready for Certification"
                                ) {
                                    validTxnRow = true;
                                } else if (eiProcessTypeVal === "") {
                                    validTxnRow = true;
                                } else {
                                    validTxnRow = false;
                                }

                                var finalConditionCheck =
                                    uniqueSavedSearchRowsArr.indexOf(txnid) ===
                                        -1 &&
                                    edocSts !== "" &&
                                    eDOCStatusArray.indexOf(edocSts) !== -1 &&
                                    validTxnRow &&
                                    uniqueSavedSearchArr.indexOf(txnid) !== -1;

                                if (finalConditionCheck) {
                                    uniqueSavedSearchRowsArr.push(txnid);

                                    addSublistRows(
                                        eiProcessSublist,
                                        result,
                                        lineno
                                    );

                                    lineno++;
                                }
                            }
                        });
                    });
                }
                if (lineno > 0) {
                    markAll.isHidden = false;
                    unmarkAll.isHidden = false;
                }
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function addDataToSublist(
        eiProcessSublist,
        eiProcessTypeVal,
        markAll,
        unmarkAll
    ) {
        var transSearch;

        try {
            var filterExpression = getFiltersForTransaction(eiProcessTypeVal);
            var lineno = 0;

            transSearch = search.create({
                type: search.Type.TRANSACTION,
                filters: filterExpression,
                columns: getColumns(),
            });

            if (transSearch) {
                var uniqueArr = [];

                var searchResult = transSearch.runPaged({
                    pageSize: 1000,
                });
                searchResult.pageRanges.forEach(function (pageRange) {
                    var currPage = searchResult.fetch({
                        index: pageRange.index,
                    });
                    currPage.data.forEach(function (result) {
                        if (lineno < MAX_COUNT_OF_SUBLIST_ROWS) {
                            if (
                                uniqueArr.indexOf(
                                    result.getValue("internalid")
                                ) === -1
                            ) {
                                uniqueArr.push(result.getValue("internalid"));

                                addSublistRows(
                                    eiProcessSublist,
                                    result,
                                    lineno
                                );
                                lineno++;
                            }
                        }
                    });
                });
            }

            if (lineno > 0) {
                markAll.isHidden = false;
                unmarkAll.isHidden = false;
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
    }

    function addSublistRows(eiProcessSublist, result, lineno) {
        var internalidValue = result.getValue("internalid");
        var recordTypeValue = result["recordType"];
        var tranidValue = result.getValue("tranid");
        var txnnoValue = result.getValue("transactionnumber");
        var txnTypeValue = result.getText("type");
        var edocStsValue = result.getText("custbody_psg_ei_status");
        var subsidiaryValue = result.getText("subsidiary");
        var txnDateValue = result.getValue("trandate");
        var currencyValue = result.getText("currency");
        var totalAmountValue = result.getValue("netamount");
        var netAmountValue;

        var processStatus = "Ready For Processing";
        var viewLabel = "View";
        var editLabel = "Edit";

        eiProcessSublist.setSublistValue({
            id: SUBLIST_SELECT_TXN_FIELD_ID,
            value: "T",
            line: lineno,
        });

        if (internalidValue !== "") {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_INTERNALID_FIELD_ID,
                value: internalidValue,
                line: lineno,
            });
        }

        if (internalidValue !== "" && recordTypeValue !== "") {
            var value =
                "<a href='" +
                url.resolveRecord({
                    recordType: recordTypeValue,
                    recordId: internalidValue,
                    isEditMode: true,
                }) +
                "' target='_blank'>" +
                editLabel +
                "</a>" +
                "|" +
                "<a href='" +
                url.resolveRecord({
                    recordType: recordTypeValue,
                    recordId: internalidValue,
                    isEditMode: false,
                }) +
                "' target='_blank'>" +
                viewLabel +
                "</a>";

            eiProcessSublist.setSublistValue({
                id: SUBLIST_EDITVIEW_FIELD_ID,
                value: value,
                line: lineno,
            });
        }
        if (tranidValue) {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_TXNNUM_FIELD_ID,
                value: tranidValue,
                line: lineno,
            });
        } else {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_TXNNUM_FIELD_ID,
                value: txnnoValue,
                line: lineno,
            });
        }

        if (txnTypeValue !== "") {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_TXNTYPE_FIELD_ID,
                value: txnTypeValue,
                line: lineno,
            });
        }

        if (edocStsValue !== "") {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_EDOCSTS_FIELD_ID,
                value: edocStsValue,
                line: lineno,
            });
        }

        if (isOW) {
            if (subsidiaryValue !== "") {
                eiProcessSublist.setSublistValue({
                    id: SUBLIST_SUBSIDIARY_FIELD_ID,
                    value: subsidiaryValue,
                    line: lineno,
                });
            }
        } else {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_SUBSIDIARY_FIELD_ID,
                value: "Parent Company",
                line: lineno,
            });
        }

        if (txnDateValue !== "") {
            eiProcessSublist.setSublistValue({
                id: SUBLIST_TXNDATE_FIELD_ID,
                value: txnDateValue,
                line: lineno,
            });
        }

        if (runtime.isFeatureInEffect("MULTICURRENCY")) {
            if (currencyValue !== "") {
                eiProcessSublist.setSublistValue({
                    id: SUBLIST_CURRENCY_FIELD_ID,
                    value: currencyValue,
                    line: lineno,
                });
            }
        }

        if (totalAmountValue !== "") {
            netAmountValue =
                totalAmountValue === ".00" ? "0.00" : totalAmountValue;
            eiProcessSublist.setSublistValue({
                id: SUBLIST_NETAMOUNT_FIELD_ID,
                value: netAmountValue,
                line: lineno,
            });
        }
        eiProcessSublist.setSublistValue({
            id: SUBLIST_STATUS_FIELD_ID,
            value: processStatus,
            line: lineno,
        });
    }

    function getInvStsBasedOnEIProcess(eiPrcssTypeValue) {
        var invStsObj = {
            generateMR: [READY_FOR_GENERATION, GENERATION_FAILED],
            sendMR: READY_FOR_SENDING,
            certifyMR: READY_FOR_CERTIFICATION,
            sequentialMR: [READY_FOR_GENERATION, GENERATION_FAILED],
            defaultMR: [
                READY_FOR_GENERATION,
                READY_FOR_SENDING,
                READY_FOR_CERTIFICATION,
                GENERATION_FAILED,
                SENDING_FAILED,
                CERTIFICATION_DATA_ERROR,
                CERTIFICATION_FAILED,
            ],
        };

        return invStsObj[eiPrcssTypeValue] || invStsObj.defaultMR;
    }

    function getFiltersForTransaction(eiProcessTypeVal) {
        var filterExpression = [];
        var invStatus = getInvStsBasedOnEIProcess(eiProcessTypeVal);

        try {
            var isCustomTransactionFeatureEnabled = runtime.isFeatureInEffect({
                feature: "CUSTOMTRANSACTIONS",
            });

            if (
                isCustomTransactionFeatureEnabled &&
                transactionMap.getAllOutboundCttCodes().length > 0
            ) {
                filterExpression = getAllTxnTypeFilters(invStatus);
            } else {
                filterExpression = getStandardTransactionFilters(invStatus);
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);
        }
        return filterExpression;
    }

    function getAllTxnTypeFilters(invStatus) {
        var appendedCttAndStdTxnTypeFilters = [];
        appendedCttAndStdTxnTypeFilters.push(
            getStandardTransactionFilters(invStatus)
        );
        appendedCttAndStdTxnTypeFilters.push("OR");
        appendedCttAndStdTxnTypeFilters.push(
            getCustomTransactionFilters(invStatus)
        );
        return appendedCttAndStdTxnTypeFilters;
    }

    function getStandardTransactionFilters(invStatus) {
        allowedCountry = bulkProcessingMgr.getValueOfAllowedFreeCountry();
        return transactionMap.getTransactionFilters(allowedCountry, invStatus);
    }

    function getCustomTransactionFilters(invStatus) {
        return transactionMap.getCustomTransactionFilters(invStatus);
    }

    return {
        onRequest: onRequest,
    };
});
