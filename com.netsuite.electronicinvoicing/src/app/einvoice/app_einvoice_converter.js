/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Aug 2016     mjaurigue
 *
 */
define([
    "N/record",
    "N/error",
    "N/runtime",
    "../../data/dao_item",
    "../../data/dao_vendor_bill",
    "../../lib/app/app_transaction_type_map",
    "../../lib/wrapper/ns_wrapper_template_renderer",
    "N/render",
    "N/search",
    "N/config",
    "../../lib/translator",
    "../../lib/string_formatter",
    "N/xml",
    "../../data/dao_vendor_credit",
    "../../app/einvoice/app_einvoice_subsidiary_pref_getter",
    "N/query",
], function (
    record,
    error,
    runtime,
    itemDao,
    vendorBillDao,
    transactionMap,
    renderer,
    render,
    search,
    config,
    translator,
    stringFormatter,
    xml,
    vendorCreditDao,
    subPrefGetter,
    query
) {
    var EI_INACTIVE_CUSTOMER_CODE = "ei.conversion.inactivecustomer.converter";
    var EI_INACTIVE_VENDOR_CODE = "ei.conversion.inactivevendor.converter";
    var INBOUND_TRANSACTION_ITEM_NOT_FOUND_DETAILS_CODE_MULTI_VENDOR =
        "ei.conversion.multivendor.itemnotfound";
    var INBOUND_TRANSACTION_ITEM_NOT_FOUND_DETAILS_CODE_NOT_MULTI_VENDOR =
        "ei.conversion.nonmultivendor.itemnotfound";
    var INBOUND_TRANSACTION_ITEM_MULTIPLE_MATCH_DETAILS_CODE_MULTI_VENDOR =
        "ei.conversion.multivendor.multipleitemmatched";
    var INBOUND_TRANSACTION_ITEM_MULTIPLE_MATCH_DETAILS_CODE_NOT_MULTI_VENDOR =
        "ei.conversion.nonmultivendor.multipleitemmatched";
    var INBOUND_TRANSACTION_MULTIPLE_ITEM_SAME_MATCH_CODE =
        "ei.conversion.multipleitemmatched";
    var INBOUND_TRANSACTION_MULTIPLE_ITEM_SAME_MATCH_MSG =
        "Multiple items have the same item name or display name for {ITEM_NAME}. Modify the item records to avoid duplicate item names.";
    var INBOUND_TRANSACTION_ITEM_NOT_FOUND_CODE = "ei.conversion.itemnotfound";
    var INBOUND_TRANSACTION_ITEM_NOT_FOUND_MSG =
        "Item {ITEM_NAME} is not associated with any item name or display name. Check if {ITEM_NAME} matches the item name or display name of an item record.";
    var INBOUND_TRANSACTION_REF_NUM_CODE = "ei.conversion.refnumnotfound";
    var INBOUND_TRANSACTION_REF_NUM_EXISTS_CODE = "ei.conversion.refnumexists";
    var INBOUND_TRANSACTION_REF_NUM_EXISTS_CODE_BILL_CREDIT =
        "ei.conversion.refnumexistsforbillcredit";
    var INBOUND_TRANSACTION_ITEM_NAME_NOT_FOUND =
        "ei.conversion.noitemnamevalue";
    var INBOUND_INVALID_INVOICE_REF_NUM = "ei.conversion.invalidinvoicerefnum";
    var NO_VENDOR_CODE_VALUE = "ei.conversion.novendorcodevalue";
    var NO_VENDORCODE_FIELD_FOUND_CODE = "ei.conversion.vendorcodenotfound";
    var NO_VENDOR_NAME_VALUE = "ei.conversion.novendornamevalue";
    var NO_VENDORNAME_FIELD_FOUND_CODE = "ei.conversion.vendornamenotfound";
    var CREATED_FROM_TRANSACTION_NOT_FOUND_CODE =
        "ei.conversion.sourcetransnotfound";
    var CREATED_FROM_TRANSACTION_ENTITY_NOT_MATCH_CODE =
        "ei.conversion.sourcetransentitynotmatch";
    var NO_VENDOR_EXPENSE_ACCOUNT_CODE = "ei.conversion.novendorexpenseaccount";
    var NO_ITEM_EXPENSE_PO_LINK_CODE = "ei.conversion.nolinktopo";
    var ENTITY_FIELD = "entity";
    var REF_NUM_FIELD = "tranid";
    var TRANSACTION_TYPE_FIELD = "custrecord_psg_ei_inbound_transtype";
    var VENDOR_FIELD = "custrecord_psg_ei_inbound_vendor";
    var CUSTOMER_FIELD = "custrecord_psg_ei_inbound_customer";
    var XML_CONTENT_FIELD = "custrecord_psg_ei_inbound_content";
    var TRANSACTION_INBOUND_EDOCUMENT_FIELD =
        "custbody_psg_ei_inbound_edocument";
    var ITEM_SUBLIST_ID = "item";
    var EXPENSE_SUBLIST_ID = "expense";
    var APPLY_SUBLIST_ID = "apply";
    var ACCOUNT_SUBLIST_FLD = "account";
    var ITEM_SUBLIST_FLD = "item";
    var APPLY_SUBLIST_FLD = "apply";
    var EXPENSE_ACCOUNT_FLD = "expenseaccount";
    var REFERENCE_NUMBER_KEY = "tranid";
    var OTHER_REF_NUM_KEY = "otherrefnum";
    var CREATED_FROM_KEY = "createdfrom";
    var SHIP_ADDRESS = "shipaddress";
    var SALES_REP = "salesrep";
    var ITEM_KEY = "item";
    var EXPENSE_KEY = "expense";
    var APPLY_KEY = "apply";
    var VENDOR_CODE_KEY = "vendorcode";
    var VENDOR_NAME_KEY = "vendorname";
    var ITEM_MATCH_NOT_FOUND_ERRORCODE = "NOT_FOUND";
    var MULTIPLE_ITEM_MATCH_FOUND_ERRORCODE = "MULTIPLE_MATCH";
    var transRecord = {};
    var enabledMultipleVendor = null;
    var EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT =
        "EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT";
    var BYPASS_PO_VALIDATION = "custrecord_psg_ei_bypass_po_valid";
    var SUBSIDIARY_FLD = "subsidiary";

    var billReference;
    var VENDOR_CREDIT_ID = 20;
    var VENDBILL_ID = 17;
    var SALES_ORDER_ID = 31;
    var REFERENCE_NUMBER = "refnum";
    /**
     * Parsed the content of the inbound e-document based on the specified template.
     *
     * @param {Record} inboundEDocRec inbound e-document record object
     * @param {String} inboundTemplate contains the field mapping
     * @param {Record} entityRec entity record object (Customer or Vendor)
     * @param {Object} customRender inbound custom data source plugin data
     * @returns parsed content of the inbound e-document record.
     */
    function parseInboundEDocument(
        inboundEDocRec,
        inboundTemplate,
        entityRec,
        customRender
    ) {
        var errorParams;
        if (!inboundEDocRec) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "The inbound e-document record object is a required parameter for parsing the inbound e-document record.",
            };
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!inboundTemplate) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "The inbound template is a required parameter for parsing the inbound e-document record.",
            };
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!entityRec) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "The entity record object is a required parameter for parsing the inbound e-document record.",
            };
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        } else if (entityRec.getValue("isinactive")) {
            var msgCode;
            if (entityRec.type === record.Type.CUSTOMER) {
                msgCode = EI_INACTIVE_CUSTOMER_CODE;
            } else {
                msgCode = EI_INACTIVE_VENDOR_CODE;
            }
            throw error.create({
                name: "EI_INACTIVE_ENTITY",
                message: translator.getString(msgCode),
                notifyOff: true,
            });
        }
        var inboundContent = inboundEDocRec.getValue(XML_CONTENT_FIELD);
        // Call to template renderer
        renderer.setTemplateContents(inboundTemplate);
        customRender = typeof customRender === "undefined" ? {} : customRender;
        try {
            var xmlObj = xml.Parser.fromString(inboundContent);
            renderer.addCustomDataSource(
                "XML",
                render.DataSource.XML_DOC,
                xmlObj
            );
        } catch (e) {
            log.error(e.name, e.message + "\n" + e.stack);
            var bomlessXMLString = inboundContent.trim();
            renderer.addCustomDataSource(
                "XML",
                render.DataSource.XML_STRING,
                bomlessXMLString
            );
        }

        try {
            if (JSON.stringify(customRender) !== "{}") {
                var alias =
                    customRender.customDataSources.length > 0
                        ? customRender.customDataSources[0].alias
                        : "";

                var format =
                    customRender.customDataSources.length > 0
                        ? customRender.customDataSources[0].format
                        : "";

                var data =
                    customRender.customDataSources.length > 0
                        ? customRender.customDataSources[0].data
                        : "";

                renderer.addCustomDataSource(alias, format, data);
            }
        } catch (ex) {
            log.error(ex.name, ex.message + " " + ex.stack);

            throw error.create({
                name: EI_INBOUND_CUSTOM_DATA_SOURCE_INVALID_RESULT,

                message: translator.getString(
                    "inboundcustomdatasource.plugininvalidresult"
                ),

                notifyOff: true,
            });
        }
        return renderer.renderAsString();
    }

    /**
     * Converts parsed XML content to transaction record
     *
     * @param {Record} edocRecord inbound edocument record instance
     * @param {String} parsedContent Parsed XML, stringified JSON
     *
     * @return {Object} an object containing the converted transaction Id and type.
     */
    function convertToTransaction(edocRecord, parsedContent) {
        var conversionError;
        var errorParams;
        var isPOValidationBypassed = false;
        if (!edocRecord) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Inbound E-Document record is a required parameter for conversting edocument record.",
            };
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        if (!parsedContent) {
            errorParams = {
                name: "REQUIRED_PARAM_MISSING",
                message:
                    "Parsed XML content is a required parameter for conversting edocument record.",
            };
            throw error.create({
                name: errorParams.name,
                message: errorParams.message,
                notifyOff: true,
            });
        }
        var inboundEdocumentId = edocRecord.id;
        var tranTypeInteralId = parseInt(
            edocRecord.getValue(TRANSACTION_TYPE_FIELD)
        );
        var entity = edocRecord.getValue(VENDOR_FIELD);
        var transactionObj = parsedContent;
        var refNum = transactionObj[REFERENCE_NUMBER_KEY];

        if (transactionMap.isSalesTransaction(tranTypeInteralId)) {
            entity = edocRecord.getValue(CUSTOMER_FIELD);
            if (tranTypeInteralId === SALES_ORDER_ID) {
                refNum = transactionObj[OTHER_REF_NUM_KEY];
            }
        }

        var trantype = transactionMap.getInboundTransactionRecordTypes([
            tranTypeInteralId,
        ])[0];

        // Check for existence of reference number and duplicates.
        if (!refNum) {
            var errorDetails = translator.getString(
                INBOUND_TRANSACTION_REF_NUM_CODE
            );
            var errorParameters = {
                REF_NUM:
                    tranTypeInteralId === SALES_ORDER_ID
                        ? OTHER_REF_NUM_KEY
                        : REFERENCE_NUMBER_KEY,
            };
            stringFormatter.setString(errorDetails);
            stringFormatter.replaceParameters(errorParameters);
            errorDetails = stringFormatter.toString();
            conversionError = error.create({
                name: "EI_TRANSACTION_REF_NUM_NOT_FOUND",
                message: errorDetails,
                notifyOff: true,
            });
            throw conversionError;
        } else if (tranTypeInteralId === VENDBILL_ID) {
            var existingVendorBills =
                vendorBillDao.getBillsUsingReferenceNumber(refNum, entity);
            if (existingVendorBills.length > 0) {
                conversionError = error.create({
                    name: "EI_TRANSACTION_REF_NUM_ALREADY_EXISTS",
                    message: translator.getString(
                        INBOUND_TRANSACTION_REF_NUM_EXISTS_CODE
                    ),
                    notifyOff: true,
                });
                throw conversionError;
            }
        } else if (tranTypeInteralId === VENDOR_CREDIT_ID) {
            var existingVendorCredits =
                vendorCreditDao.getBillCreditsUsingReferenceNumber(
                    refNum,
                    entity
                );
            if (existingVendorCredits.length > 0) {
                conversionError = error.create({
                    name: "EI_TRANSACTION_REF_NUM__FOR_BILL_CREDIT_ALREADY_EXISTS",
                    message: translator.getString(
                        INBOUND_TRANSACTION_REF_NUM_EXISTS_CODE_BILL_CREDIT
                    ),
                    notifyOff: true,
                });
                throw conversionError;
            }
        }

        // Check if createdfrom exist in inbound e-document file
        var createdFrom = transactionObj[CREATED_FROM_KEY];
        if (createdFrom) {
            var createdFromRecId = getCreatedFromTransaction(
                createdFrom,
                entity
            );
            if (createdFromRecId != 0) {
                // Transform existing transaction to specified transaction type
                if (tranTypeInteralId === VENDBILL_ID) {
                    transformTransactionRecord(
                        createdFromRecId,
                        trantype,
                        entity,
                        inboundEdocumentId,
                        transactionObj
                    );
                } else if (tranTypeInteralId === VENDOR_CREDIT_ID) {
                    createTransactionRecord(
                        trantype,
                        entity,
                        inboundEdocumentId,
                        transactionObj
                    );
                }
            } else if (
                createdFromRecId === 0 &&
                tranTypeInteralId === VENDBILL_ID
            ) {
                var SUBSIDIARIES = "SUBSIDIARIES";
                var isOW = runtime.isFeatureInEffect(SUBSIDIARIES);
                var subPrefObj;
                var parentSubIdInSI = 1;
                if (isOW) {
                    subPrefObj = getValueOfByPassPOValidationFld(entity);
                } else {
                    subPrefObj =
                        subPrefGetter.getSubsidiaryPreferencesFieldValues(
                            parentSubIdInSI,
                            [BYPASS_PO_VALIDATION]
                        );
                }
                var isBypassPOValidFldVal = subPrefObj[BYPASS_PO_VALIDATION];
                var BYPASS_PO_VALIDATION_INT_ID = 2;
                var DO_NOT_BYPASS_PO_VALIDATION_INT_ID = 1;
                var PO_VALIDATION_BYPASSED_FLAG_VEND_BILL =
                    "custbody_psg_ei_inb_txn_po_valid_bypas";
                if (isBypassPOValidFldVal === BYPASS_PO_VALIDATION_INT_ID) {
                    createTransactionRecord(
                        trantype,
                        entity,
                        inboundEdocumentId,
                        transactionObj
                    );
                    transRecord.setValue(
                        PO_VALIDATION_BYPASSED_FLAG_VEND_BILL,
                        true
                    );
                    isPOValidationBypassed = true;
                } else if (
                    isBypassPOValidFldVal === DO_NOT_BYPASS_PO_VALIDATION_INT_ID
                ) {
                    throwErrorWhenPurchaseOrderNotFound(createdFrom);
                }
            } else {
                throwErrorWhenPurchaseOrderNotFound(createdFrom);
            }
        } else {
            // Create transaction record based on specified transaction type
            createTransactionRecord(
                trantype,
                entity,
                inboundEdocumentId,
                transactionObj
            );
        }
        var id = transRecord.save();

        //Populating the Apply sublist
        if (tranTypeInteralId === VENDOR_CREDIT_ID && billReference) {
            setBillReferences(id);
        }

        return {
            id: id,
            type: trantype,
            bypassPOValidation: isPOValidationBypassed,
        };
    }

    function getValueOfByPassPOValidationFld(entityId) {
        var ENTITY_TYPE = "vendor";
        var subsidiaryId;
        var subLookUp = search.lookupFields({
            type: ENTITY_TYPE,
            id: entityId,
            columns: [SUBSIDIARY_FLD],
        });
        if (subLookUp[SUBSIDIARY_FLD].length !== 0) {
            subsidiaryId = subLookUp[SUBSIDIARY_FLD][0].value;
        }
        return subPrefGetter.getSubsidiaryPreferencesFieldValues(subsidiaryId, [
            BYPASS_PO_VALIDATION,
        ]);
    }

    function throwErrorWhenPurchaseOrderNotFound(createdFrom) {
        // Transform source record does not exist.
        var errorDetails = translator.getString(
            CREATED_FROM_TRANSACTION_NOT_FOUND_CODE
        );
        var errorParameters = {
            TRANSTYPE: record.Type.PURCHASE_ORDER, //TODO: support other transaction types for transformation
            TRANSID: createdFrom,
        };
        stringFormatter.setString(errorDetails);
        stringFormatter.replaceParameters(errorParameters);
        errorDetails = stringFormatter.toString();
        throw error.create({
            name: "EI_CREATED_FROM_TRANSACTION_NOT_FOUND",
            message: errorDetails,
            notifyOff: true,
        });
    }

    function setBillReferences(recID) {
        var tranRecord = record.load({
            type: record.Type.VENDOR_CREDIT,
            id: recID,
        });

        var refID;
        var itemLineCount = tranRecord.getLineCount({
            sublistId: APPLY_SUBLIST_ID,
        });
        var invRef;
        for (var i = 0; i < itemLineCount; i++) {
            invRef = tranRecord.getSublistValue({
                sublistId: APPLY_SUBLIST_ID,
                fieldId: REFERENCE_NUMBER,
                line: i,
            });
            var bInvref = false;
            for (var j = 0; j < billReference.length; j++) {
                refID = billReference[j][REFERENCE_NUMBER];
                if (invRef === refID) {
                    bInvref = true;
                    break;
                }
            }
            if (bInvref) {
                tranRecord.setSublistValue({
                    sublistId: APPLY_SUBLIST_ID,
                    fieldId: APPLY_SUBLIST_FLD,
                    line: i,
                    value: true,
                });
            }
        }
        tranRecord.save();
    }

    /**
     * Get the created from transaction record.
     *
     * @param {integer} createdFrom created from number
     * @param {integer} entity internal Id of selected entity
     *
     * @returns {integer} created from transaction internal id
     */
    function getCreatedFromTransaction(createdFrom, entity) {
        var createdFromRecId = 0;
        var MAINLINE = "mainline";
        //TODO: Change implementation in the future to support other transaction types
        var filters = [];
        filters[0] = search.createFilter({
            name: REF_NUM_FIELD,
            operator: search.Operator.IS,
            values: createdFrom,
        });
        filters[1] = search.createFilter({
            name: MAINLINE,
            operator: search.Operator.IS,
            values: ["T"],
        });

        var columns = [];
        columns[0] = search.createColumn({
            name: ENTITY_FIELD,
        });
        var transSearch = search.create({
            type: record.Type.PURCHASE_ORDER, //TODO: support other transaction types for transformation
            filters: filters,
            columns: columns,
        });
        transSearch.run().each(function (result) {
            createdFromRecId = result.id;
            var entityId = result.getValue(ENTITY_FIELD);
            if (entityId !== entity) {
                // The entity of the transform source record does not match with the entity in the inbound e-document.
                var errorDetails = translator.getString(
                    CREATED_FROM_TRANSACTION_ENTITY_NOT_MATCH_CODE
                );
                var errorParameters = {
                    TRANSTYPE: record.Type.PURCHASE_ORDER, //TODO: support other transaction types for transformation
                    TRANSID: createdFrom,
                };
                stringFormatter.setString(errorDetails);
                stringFormatter.replaceParameters(errorParameters);
                errorDetails = stringFormatter.toString();
                throw error.create({
                    name: "EI_CREATED_FROM_TRANSACTION_ENTITY_NOT_MATCH",
                    message: errorDetails,
                    notifyOff: true,
                });
            }
            return true;
        });

        return createdFromRecId;
    }

    /**
     * Transforms transaction record and sets values
     *
     * @param {String} createdFromRecId created from transaction record id
     * @param {String} trantype converted transaction record type
     * @param {integer} entity entity internal id
     * @param {integer} inboundEdocumentId inbound e-document internal id
     * @param {Object} transactionObj JSON object containing values for the transaction
     *
     * @return {void}
     */
    function transformTransactionRecord(
        createdFromRecId,
        trantype,
        entity,
        inboundEdocumentId,
        transactionObj
    ) {
        /* Note: transforming PO to Bill does not carry over items. But only expenses */
        var hasItemMap = transactionObj[ITEM_KEY];
        var hasExpenseMap = transactionObj[EXPENSE_KEY];
        if (hasItemMap || hasExpenseMap) {
            transRecord = record.transform({
                fromType: record.Type.PURCHASE_ORDER, //TODO: support other transaction types for transformation
                fromId: createdFromRecId,
                toType: trantype,
                isDynamic: true,
            });
            transRecord.setValue(
                TRANSACTION_INBOUND_EDOCUMENT_FIELD,
                inboundEdocumentId
            );
            var isItemLinkedToPO = false;
            var isExpenseLinkedToPO = false;
            for (var field in transactionObj) {
                if (field === ITEM_KEY) {
                    isItemLinkedToPO = setItems(
                        entity,
                        transactionObj[field],
                        true
                    );
                } else if (field === EXPENSE_KEY) {
                    isExpenseLinkedToPO = setExpenses(
                        entity,
                        transactionObj[field],
                        true
                    );
                } else if (field !== CREATED_FROM_KEY) {
                    var value = transactionObj[field];
                    // setValue expects the native value for a field as per Manz on Issue 360866
                    transRecord.setText(field, value);
                }
            }
            if (!isItemLinkedToPO && !isExpenseLinkedToPO) {
                throw error.create({
                    name: "EI_ITEM_EXPENSE_PO_LINK_ERROR",
                    message: translator.getString(NO_ITEM_EXPENSE_PO_LINK_CODE),
                    notifyOff: true,
                });
            }
        } else {
            // If no items in the inbound e-document, perform create transaction to produce an error in conversion.
            transRecord = record.create({
                type: trantype,
                isDynamic: true,
            });
            transRecord.setValue(ENTITY_FIELD, entity);
            transRecord.setValue(
                TRANSACTION_INBOUND_EDOCUMENT_FIELD,
                inboundEdocumentId
            );
        }
        if (!hasExpenseMap) {
            removeAllExpenses();
        }
        if (!hasItemMap) {
            removeAllItems();
        }
    }

    /**
     * Creates transaction record and sets values
     *
     * @param {String} trantype transaction record type
     * @param {integer} entity entity internal id
     * @param {integer} inboundEdocumentId inbound e-document internal id
     * @param {Object} transactionObj JSON object containing values for the transaction
     *
     * @return {void}
     */
    function createTransactionRecord(
        trantype,
        entity,
        inboundEdocumentId,
        transactionObj
    ) {
        var recParams = {
            type: trantype,
            isDynamic: true,
        };
        transRecord = record.create(recParams);
        transRecord.setValue(ENTITY_FIELD, entity);
        transRecord.setValue(
            TRANSACTION_INBOUND_EDOCUMENT_FIELD,
            inboundEdocumentId
        );
        for (var field in transactionObj) {
            if (
                trantype === record.Type.SALES_ORDER &&
                field === SUBSIDIARY_FLD
            ) {
                continue;
            } else if (field === ITEM_KEY) {
                if (transactionObj[field].length > 0) {
                    if (trantype === record.Type.SALES_ORDER) {
                        setItemsWithNames(transactionObj[field]);
                    } else {
                        setItems(entity, transactionObj[field], false);
                    }
                }
            } else if (field === EXPENSE_KEY) {
                if (transactionObj[field].length > 0) {
                    setExpenses(entity, transactionObj[field], false);
                }
            } else if (field === APPLY_KEY) {
                billReference = transactionObj[field];
                for (var j = 0; j < billReference.length; j++) {
                    var refID = billReference[j][REFERENCE_NUMBER];
                    var billSearch = search.create({
                        type: search.Type.VENDOR_BILL,
                        columns: [
                            {
                                name: REFERENCE_NUMBER_KEY,
                            },
                        ],
                        filters: [
                            {
                                name: REFERENCE_NUMBER_KEY,
                                operator: search.Operator.IS,
                                values: refID,
                            },
                            {
                                name: ENTITY_FIELD,
                                operator: search.Operator.IS,
                                values: entity,
                            },
                        ],
                    });
                    if (
                        billSearch.runPaged({
                            pageSize: 10,
                        }).count === 0
                    ) {
                        var errorDetails = translator.getString(
                            INBOUND_INVALID_INVOICE_REF_NUM
                        );
                        var errorParameters = {
                            TRANSID: refID,
                        };
                        stringFormatter.setString(errorDetails);
                        stringFormatter.replaceParameters(errorParameters);
                        errorDetails = stringFormatter.toString();
                        throw error.create({
                            name: "EI_TRANSACTION_INVALID_INVOICE_REF_NUM",
                            message: errorDetails,
                            notifyOff: true,
                        });
                    }
                }
            } else if (field === SHIP_ADDRESS) {
                setShipAddress(transactionObj[field]);
            } else if (field === SALES_REP) {
                transRecord.setValue(field, transactionObj[field]);
            } else if (field !== CREATED_FROM_KEY) {
                var value = transactionObj[field];
                // setValue expects the native value for a field as per Manz on Issue 360866
                transRecord.setText(field, value);
            }
        }
    }

    /**
     * Sets list of expenses in the transaction record.
     *
     * @param {integer} entity entity internal id
     * @param {Object[]} items Array of objects (expenses)
     *
     * @return void
     */
    function setExpenses(entityId, expenses, isTransform) {
        var isLinkedToPO = true;
        var expense;
        var lookUpValue = search.lookupFields({
            type: "vendor",
            id: entityId,
            columns: [EXPENSE_ACCOUNT_FLD],
        });
        if (lookUpValue[EXPENSE_ACCOUNT_FLD].length === 0) {
            throw error.create({
                name: "EI_VENDOR_EXPENSE_ACCOUNT_ERROR",
                message: translator.getString(NO_VENDOR_EXPENSE_ACCOUNT_CODE),
                notifyOff: true,
            });
        }
        var expenseAccountId = lookUpValue[EXPENSE_ACCOUNT_FLD][0].value;
        if (isTransform) {
            var expenseLineCount = transRecord.getLineCount({
                sublistId: EXPENSE_SUBLIST_ID,
            });
            for (var i = 0; i < expenses.length; i++) {
                expense = expenses[i];
                if (i < expenseLineCount) {
                    // update expense lines with expense detail from XML
                    updateExpense(i, expense);
                } else {
                    // add expense lines if the number of expenses from XML
                    // is greater than that of the expenses from the transformed record.
                    addExpense(expenseAccountId, expense, i);
                }
            }
            if (expenseLineCount > expenses.length) {
                // remove excess expense lines in transformed record
                // if the number of expence lines is more then the number of expenses in XML
                var excessCount = expenseLineCount - expenses.length;
                for (var j = 0; j < excessCount; j++) {
                    removeSublistRow(EXPENSE_SUBLIST_ID, expenses.length);
                }
            }
            if (expenseLineCount === 0 || expenses.length === 0) {
                isLinkedToPO = false;
            }
        } else {
            for (var k = 0; k < expenses.length; k++) {
                expense = expenses[k];
                addExpense(expenseAccountId, expense, k);
            }
        }
        return isLinkedToPO;
    }
    /**
     * Removes all expense lines in the transaction record's expense sublist.
     * @return void
     */
    function removeAllExpenses() {
        var expenseLineCount = transRecord.getLineCount({
            sublistId: EXPENSE_SUBLIST_ID,
        });
        for (var i = 0; i < expenseLineCount; i++) {
            removeSublistRow(EXPENSE_SUBLIST_ID, 0);
        }
    }

    /**
     * Removes all item lines in the transaction record's item sublist.
     * @return void
     */
    function removeAllItems() {
        var itemLineCount = transRecord.getLineCount({
            sublistId: ITEM_SUBLIST_ID,
        });
        for (var i = 0; i < itemLineCount; i++) {
            removeSublistRow(ITEM_SUBLIST_ID, 0);
        }
    }

    /**
     * Removes a line in the transaction record's sublist.
     * @param {integer}sublist index
     *
     * @return void
     */
    function removeSublistRow(sublistId, index) {
        transRecord.removeLine({
            sublistId: sublistId,
            line: index,
        });
    }

    /**
     * Updates expense in the transaction record's expense sublist
     *
     * @param {integer}sublist index
     * @param {Object} object containing the details of the expense
     *
     * @return void
     */
    function updateExpense(expenseIndex, expenseDetail) {
        transRecord.selectLine({
            sublistId: EXPENSE_SUBLIST_ID,
            line: expenseIndex,
        });
        // Modify other details of the expemse in expense sublist of transformed transaction.
        // it is intended not to modify the account value of the expense line in transformed transaction
        var expenseDetailValue = "";
        for (var field in expenseDetail) {
            if (field !== ACCOUNT_SUBLIST_FLD) {
                expenseDetailValue = expenseDetail[field];
                transRecord.setCurrentSublistValue({
                    sublistId: EXPENSE_SUBLIST_ID,
                    fieldId: field,
                    value: expenseDetailValue,
                });
            }
        }
        transRecord.commitLine({ sublistId: EXPENSE_SUBLIST_ID });
    }

    /**
     * Sets expense in the transaction record's expense sublist.
     *
     * @param {integer} expense account internal ID
     * @param {Object} object containing the details of the item
     * @param {integer} lineNumber line number on the sublist
     *
     * @return void
     */
    function addExpense(expenseAccountId, expenseDetail, lineNum) {
        // Adds item to item sublist.
        transRecord.selectNewLine({ sublistId: EXPENSE_SUBLIST_ID });
        transRecord.setCurrentSublistValue({
            sublistId: EXPENSE_SUBLIST_ID,
            fieldId: ACCOUNT_SUBLIST_FLD,
            value: expenseAccountId,
        });
        // Modify other details of the expense.
        var expenseDetailValue = "";
        for (var field in expenseDetail) {
            if (field !== ACCOUNT_SUBLIST_FLD) {
                expenseDetailValue = expenseDetail[field];
                transRecord.setCurrentSublistValue({
                    sublistId: EXPENSE_SUBLIST_ID,
                    fieldId: field,
                    value: expenseDetailValue,
                });
            }
        }
        transRecord.commitLine({ sublistId: EXPENSE_SUBLIST_ID });
    }

    /**
     * Sets item based on name to transaction record
     * @param items
     */
    function setItemsWithNames(items) {
        var itemDetails = {
            fields: {},
        };
        var itemId = "";
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var itemName = items[i].item;
                if (itemName) {
                    var itemResults = fetchItemRec(itemName);
                    if (itemResults.length > 1) {
                        var multipleItemsErrDetails =
                            translator.getString(
                                INBOUND_TRANSACTION_MULTIPLE_ITEM_SAME_MATCH_CODE
                            ) ||
                            INBOUND_TRANSACTION_MULTIPLE_ITEM_SAME_MATCH_MSG;
                        var multipleItemsErrParams = {
                            ITEM_NAME: itemName,
                        };
                        stringFormatter.setString(multipleItemsErrDetails);
                        stringFormatter.replaceParameters(
                            multipleItemsErrParams
                        );
                        multipleItemsErrDetails = error.create({
                            name: "INBOUND_TRANSACTION_MULTIPLE_ITEM_SAME_MATCH_CODE",
                            message: stringFormatter.toString(),
                            notifyOff: true,
                        });
                        throw multipleItemsErrDetails;
                    } else if (itemResults.length === 0) {
                        var noItemErrMsg =
                            translator.getString(
                                INBOUND_TRANSACTION_ITEM_NOT_FOUND_CODE
                            ) || INBOUND_TRANSACTION_ITEM_NOT_FOUND_MSG;
                        var noItemErrParams = {
                            ITEM_NAME: itemName,
                        };
                        stringFormatter.setString(noItemErrMsg);
                        stringFormatter.replaceParameters(noItemErrParams);
                        noItemErrMsg = error.create({
                            name: "INBOUND_TRANSACTION_ITEM_NOT_FOUND_CODE",
                            message: stringFormatter.toString(),
                            notifyOff: true,
                        });
                        throw noItemErrMsg;
                    } else {
                        itemId = itemResults[0].values[0];
                        itemDetails.fields = items[i];
                        addToItemSublist(itemId, itemDetails);
                        transRecord.commitLine({ sublistId: ITEM_SUBLIST_ID });
                    }
                } else {
                    var noItemNameErrMsg = translator.getString(
                        INBOUND_TRANSACTION_ITEM_NAME_NOT_FOUND
                    );
                    throw error.create({
                        name: "INBOUND_TRANSACTION_ITEM_NAME_NOT_FOUND",
                        message: noItemNameErrMsg,
                        notifyOff: true,
                    });
                }
            }
        }
    }

    /**
     * Returns array of item records matching with item name or display name
     * @param itemName
     * @returns []
     */
    function fetchItemRec(itemName) {
        var itemNameTrimmed = itemName.trim();
        var itemQuery = query.create({
            type: query.Type.ITEM,
        });

        var displayNameMatchCondition = itemQuery.createCondition({
            fieldId: "displayname",
            operator: query.Operator.IS,
            values: itemNameTrimmed,
        });
        var itemNameMatchCondition = itemQuery.createCondition({
            fieldId: "itemid",
            operator: query.Operator.IS,
            values: itemNameTrimmed,
        });

        itemQuery.condition = itemQuery.or(
            displayNameMatchCondition,
            itemNameMatchCondition
        );

        itemQuery.columns = [
            itemQuery.createColumn({
                fieldId: "id",
            }),
        ];

        return itemQuery.run().results;
    }

    /**
     * Sets shipping address on transaction record
     * @param addressObj
     */
    function setShipAddress(addressObj) {
        if (addressObj.country) {
            transRecord.removeSubrecord({
                fieldId: "shippingaddress",
            });
            var shipAddrSubRec = transRecord.getSubrecord({
                fieldId: "shippingaddress",
            });
            setAddressField(shipAddrSubRec, "country", addressObj.country);
            setAddressField(shipAddrSubRec, "addr1", addressObj.addr1);
            setAddressField(shipAddrSubRec, "addr2", addressObj.addr2);
            setAddressField(shipAddrSubRec, "addr3", addressObj.addr3);
            setAddressField(shipAddrSubRec, "city", addressObj.city);
            setAddressField(shipAddrSubRec, "state", addressObj.state);
            setAddressField(shipAddrSubRec, "zip", addressObj.zip);
            shipAddrSubRec.commit();
        }
    }

    /**
     * Sets address field on transaction based on the params passed
     * @param addrRec
     * @param fieldId
     * @param value
     */
    function setAddressField(addrRec, fieldId, value) {
        if (fieldId === "country") {
            addrRec.setValue({
                fieldId: fieldId,
                value: value,
            });
        } else if (value) {
            addrRec.setText({
                fieldId: fieldId,
                text: value,
            });
        }
    }

    /**
     * Sets list of items in the transaction record.
     *
     * @param {integer} entity entity internal id
     * @param {Object[]} items Array of objects (items)
     * @param {boolean} isTransform true if items are for a transaction being transformed
     *
     * @return void
     */
    function setItems(entity, items, isTransform) {
        var isLinkedToPO = true;
        if (items.length === 0) {
            removeAllItems();
            return false;
        }
        // Search for items matching the items from XML.
        var itemsDb;
        if (isMultiVendorFeatureEnabled()) {
            itemsDb = getItemDetailsByVendorField(
                entity,
                items,
                VENDOR_CODE_KEY
            );
        } else {
            itemsDb = getItemDetailsByVendorField(
                entity,
                items,
                VENDOR_NAME_KEY
            );
        }
        // Merge items from XML with items in account.
        var itemArray = mergeItemDetails(items, itemsDb);
        var errors = [];
        if (isTransform) {
            var transformedItemsIndexes = []; // array for internal ids of items
            // Create an array containing the internal ids of items from the transformed transaction.
            var itemLineCount = transRecord.getLineCount({
                sublistId: ITEM_SUBLIST_ID,
            });
            var item;
            for (var i = 0; i < itemLineCount; i++) {
                item = transRecord.getSublistValue({
                    sublistId: ITEM_SUBLIST_ID,
                    fieldId: ITEM_SUBLIST_FLD,
                    line: i,
                });
                transformedItemsIndexes.push(parseInt(item));
            }
            // Set all matched items to the item sublist of the transformed transaction.
            for (var n = 0; n < itemArray.length; n++) {
                var itemDetails = itemArray[n];
                var result = setItem(
                    entity,
                    itemDetails,
                    n,
                    errors,
                    transformedItemsIndexes
                );
                // Consolidating all the item errors.
                if (!result.successful) {
                    errors.push(result);
                }
            }
            // Check if any of the items in the inbound e-document matched an item in the transformed transaction.
            var itemMatchIndicator = 0;
            if (transformedItemsIndexes.indexOf(itemMatchIndicator) == -1) {
                isLinkedToPO = false;
            }
            if (errors.length == 0) {
                var p = 0;
                while (p < transformedItemsIndexes.length) {
                    if (transformedItemsIndexes[p] > 0) {
                        // Remove this item from the item sublist of the transformed transaction.
                        transRecord.removeLine({
                            sublistId: ITEM_SUBLIST_ID,
                            line: p,
                        });
                        // Remove the item from the transformedItemsIndexes array to synchronize the indexes of the array
                        // with the indexes of the actual item sublist from the transformed transaction.
                        transformedItemsIndexes.splice(p, 1);
                    } else {
                        p++;
                    }
                }
            }
        } else {
            // Set all matched items to the item sublist of the created transaction.
            for (var m = 0; m < itemArray.length; m++) {
                var itemDetails1 = itemArray[m];
                var result1 = setItem(entity, itemDetails1, m, errors, null);
                // Consolidating all the item errors.
                if (!result1.successful) {
                    errors.push(result1);
                }
            }
        }
        var multipleMatchedItems = [];
        var notFoundItems = [];
        var errorResult = {};
        for (var e = 0; e < errors.length; e++) {
            errorResult = errors[e];
            if (errorResult.errorType == MULTIPLE_ITEM_MATCH_FOUND_ERRORCODE) {
                multipleMatchedItems.push(errorResult.item);
            } else if (
                errorResult.errorType == ITEM_MATCH_NOT_FOUND_ERRORCODE
            ) {
                notFoundItems.push(errorResult.item);
            }
        }
        var allErrors = "";
        var errorParameters = {};
        var msg = "";
        if (multipleMatchedItems.length > 0) {
            var multipleMatchedErrors = multipleMatchedItems.join(", ");
            errorParameters = { ITEMLIST: multipleMatchedErrors };
            if (isMultiVendorFeatureEnabled()) {
                msg = translator.getString(
                    INBOUND_TRANSACTION_ITEM_MULTIPLE_MATCH_DETAILS_CODE_MULTI_VENDOR
                );
            } else {
                msg = translator.getString(
                    INBOUND_TRANSACTION_ITEM_MULTIPLE_MATCH_DETAILS_CODE_NOT_MULTI_VENDOR
                );
            }
            stringFormatter.setString(msg);
            stringFormatter.replaceParameters(errorParameters);
            allErrors = stringFormatter.toString();
        }
        if (notFoundItems.length > 0) {
            if (allErrors) {
                allErrors = allErrors + "\n";
            }
            var notFoundErrors = notFoundItems.join(", ");
            errorParameters = { ITEMLIST: notFoundErrors };
            if (isMultiVendorFeatureEnabled()) {
                msg = translator.getString(
                    INBOUND_TRANSACTION_ITEM_NOT_FOUND_DETAILS_CODE_MULTI_VENDOR
                );
            } else {
                msg = translator.getString(
                    INBOUND_TRANSACTION_ITEM_NOT_FOUND_DETAILS_CODE_NOT_MULTI_VENDOR
                );
            }
            stringFormatter.setString(msg);
            stringFormatter.replaceParameters(errorParameters);
            allErrors = allErrors + stringFormatter.toString();
        }
        if (allErrors) {
            throw error.create({
                name: "EI_TRANSACTION_ITEM_ERROR",
                message: allErrors,
                notifyOff: true,
            });
        }
        var itemLineCount1 = transRecord.getLineCount({
            sublistId: ITEM_SUBLIST_ID,
        });
        if (itemLineCount1 === 0) {
            isLinkedToPO = false;
        }
        return isLinkedToPO;
    }

    /**
     * Checks if Multiple Vendors feature in Items & Inventory is enabled.
     *
     * @return {boolean} true if multiple vendor feature is enabled, false if disabled.
     */
    function isMultiVendorFeatureEnabled() {
        // lazy loading to reduce performance overhead
        if (enabledMultipleVendor == null) {
            var featureConfig = config.load({ type: config.Type.FEATURES });
            enabledMultipleVendor = featureConfig.getValue({
                fieldId: "multivendor",
            });
        }
        return enabledMultipleVendor;
    }

    /**
     * Retrieves items.
     *
     * @param {integer} entity internal id of entity
     * @param {Object[]} items Array of objects (item)
     * @param {String} fieldname indicator if items will be retrieved using vendor code or vendor name/code.
     *
     * @return {Object[]} Item Search Result array
     */
    function getItemDetailsByVendorField(entity, items, fieldname) {
        var itemDetailsError;
        var hasVendorField = false;
        var values = [];
        var no_vendor_field_errorcode;
        var no_vendor_field_msgcode;
        var no_vendor_field_value_errorcode;
        var no_vendor_field_value_msgcode;
        var daoFunction;
        if (fieldname == VENDOR_CODE_KEY) {
            no_vendor_field_value_errorcode = "EI_NO_VENDOR_CODE_VALUE";
            no_vendor_field_value_msgcode = NO_VENDOR_CODE_VALUE;
            no_vendor_field_errorcode = "EI_VENDOR_CODE_FIELD_NOT_FOUND";
            no_vendor_field_msgcode = NO_VENDORCODE_FIELD_FOUND_CODE;
            daoFunction = itemDao.getItemDetailsByVendorCodes;
        } else {
            no_vendor_field_value_errorcode = "EI_NO_VENDOR_NAME_VALUE";
            no_vendor_field_value_msgcode = NO_VENDOR_NAME_VALUE;
            no_vendor_field_errorcode = "EI_VENDOR_NAME_FIELD_NOT_FOUND";
            no_vendor_field_msgcode = NO_VENDORNAME_FIELD_FOUND_CODE;
            daoFunction = itemDao.getItemDetailsByVendorNames;
        }
        /* Loop for every item in the item array */
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            /* Loop for every attribute in the item object (JSON) */
            for (var key in item) {
                var value;
                if (key == fieldname) {
                    hasVendorField = true;
                    value = item[key];
                    if (!value) {
                        itemDetailsError = error.create({
                            name: no_vendor_field_value_errorcode,
                            message: translator.getString(
                                no_vendor_field_value_msgcode
                            ),
                            notifyOff: true,
                        });
                        throw itemDetailsError;
                    }
                    values.push(value);
                    break;
                }
            }
            if (!hasVendorField) {
                itemDetailsError = error.create({
                    name: no_vendor_field_errorcode,
                    message: translator.getString(no_vendor_field_msgcode),
                    notifyOff: true,
                });
                throw itemDetailsError;
            }
        }
        return daoFunction(entity, values);
    }

    /**
     * Creates an object with merged item details.
     * It maps the internal ID of the items to the items retrieved from parsed XML content (JSON).
     * Returning array of objects similar below:
     * [{"fields":{"rate":"33.20","otherfields":"XXXXX"},"data":{"itemLabel":"Item1","id":["16","17"]}},
     *	{"fields":{"rate":"50.00","otherfields":"YYYYYY"},"data":{"itemLabel":"Item2","id":["15"]}}].
     *
     * @param {Object[]} items Array of item objects (JSON)
     * @param {Object[]} itemsDb Array of item objects retrieved from account
     *
     * @return {Object[]} merged item result array
     */
    function mergeItemDetails(items, itemsDb) {
        var itemArray = [];
        var itemLabel = "";
        //looping in item search result
        var itemIDs = {};
        var itemId = 0;
        for (var k = 0; k < itemsDb.length; k++) {
            itemLabel = itemsDb[k].vendorFieldValue;
            itemId = itemsDb[k].id;
            if (!itemIDs[itemLabel]) {
                itemIDs[itemLabel] = [itemId];
            } else {
                itemIDs[itemLabel].push(itemId);
            }
        }
        //looping in the item array
        var item = {};
        var itemFields = {};
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            itemLabel = "";
            itemFields = {};
            //looping on the item properties
            for (var key in item) {
                if (key === VENDOR_CODE_KEY || key === VENDOR_NAME_KEY) {
                    itemLabel = item[key];
                } else {
                    itemFields[key] = item[key];
                }
            }
            var itemObj = {};
            itemObj.fields = itemFields;
            itemObj.data = {};
            itemObj.data.itemLabel = itemLabel;
            itemObj.data.id = itemIDs[itemLabel] ? itemIDs[itemLabel] : [];
            itemArray.push(itemObj);
        }
        return itemArray;
    }

    /**
     * Sets item in the transaction record's item sublist.
     *
     * @param {integer} entity entity internal id
     * @param {Object} itemDetails object containing the details of the item
     * @param {integer} lineNumber line number on the sublist
     * @param {integer[]} transformedItemsIndexes array containing the internal ids of items from transformed transaction
     *
     * @return void
     */
    function setItem(
        entity,
        itemDetails,
        lineNumber,
        errors,
        transformedItemsIndexes
    ) {
        var result = {
            successful: false,
            item: "",
            errorType: "",
        };
        var errorType = null;
        var itemIds = itemDetails.data.id;
        var itemLabel = itemDetails.data.itemLabel;
        if (itemIds.length == 0) {
            // No match item record found.
            errorType = ITEM_MATCH_NOT_FOUND_ERRORCODE;
        } else if (itemIds.length > 1) {
            // Multiple match item records found.
            errorType = MULTIPLE_ITEM_MATCH_FOUND_ERRORCODE;
        } else if (errors.length == 0) {
            var itemId = parseInt(itemIds[0]);
            if (transformedItemsIndexes) {
                // Check if item is included in the item list from transformed transaction.
                var itemIndex = transformedItemsIndexes.indexOf(itemId);
                if (itemIndex != -1) {
                    // Modify other details of the item in item sublist of transformed transaction.
                    modifyItemInItemSublist(itemIndex, itemDetails);
                    // Set to 0 the internal id of the item found in transformedItemsIndexes array.
                    // This will indicate that this item is to be included in the item sublist of the transformed transaction.
                    transformedItemsIndexes[itemIndex] = 0;
                } else {
                    // Add item to item sublist of transformed transaction.
                    addToItemSublist(itemId, itemDetails);
                }
            } else {
                // Add item to item sublist of created transaction.
                addToItemSublist(itemId, itemDetails);
            }
            transRecord.commitLine({ sublistId: ITEM_SUBLIST_ID });
        }
        result = {
            successful: errorType == null,
            item: itemLabel,
            errorType: errorType,
        };
        return result;
    }

    /**
     * Adds item to item sublist of created/transformed transaction.
     *
     * @param {integer} itemId internal id of the item to be added
     * @param {Object} itemDetails object containing the details of the item to be added
     *
     * @returns {Void}
     */
    function addToItemSublist(itemId, itemDetails) {
        // Adds item to item sublist.
        transRecord.selectNewLine({ sublistId: ITEM_SUBLIST_ID });
        transRecord.setCurrentSublistValue({
            sublistId: ITEM_SUBLIST_ID,
            fieldId: ITEM_SUBLIST_FLD,
            value: itemId,
        });
        // Modify other details of the item.
        var itemDetailValue = "";
        for (var field in itemDetails.fields) {
            itemDetailValue = itemDetails.fields[field];
            if (field !== ITEM_SUBLIST_FLD) {
                transRecord.setCurrentSublistValue({
                    sublistId: ITEM_SUBLIST_ID,
                    fieldId: field,
                    value: itemDetailValue,
                });
            }
        }
    }

    /**
     * Modify details of item in item sublist of transformed transaction.
     *
     * @param {integer} itemIndex the index of the item to be modified
     * @param {Object} itemDetails object containing the details of the item
     *
     * @returns {Void}
     */
    function modifyItemInItemSublist(itemIndex, itemDetails) {
        transRecord.selectLine({
            sublistId: ITEM_SUBLIST_ID,
            line: itemIndex,
        });
        // Modify other details of the item in item sublist of transformed transaction.
        var itemDetailValue = "";
        for (var field in itemDetails.fields) {
            itemDetailValue = itemDetails.fields[field];
            transRecord.setCurrentSublistValue({
                sublistId: ITEM_SUBLIST_ID,
                fieldId: field,
                value: itemDetailValue,
            });
        }
    }
    return {
        parseInboundEDocument: parseInboundEDocument,
        convertToTransaction: convertToTransaction,
    };
});
