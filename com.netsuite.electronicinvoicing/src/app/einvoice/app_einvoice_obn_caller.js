define([
    "N/https",
    "N/cache",
    "N/runtime",
    "N/search",
    "N/config",
    "N/record",
    "N/query",
    "N/xml",
    "N/error",
    "../../lib/utils",
    "../../lib/translator",
    "../../lib/constants/record_fields",
    "../../lib/constants/main_constants",
    "./app_einvoice_ctt_manager",
], function (
    https,
    cache,
    runtime,
    search,
    config,
    record,
    query,
    xml,
    error,
    utils,
    translator,
    recordFields,
    mainConstants,
    cttManager
) {
    var OK_STATUS_CODE = 200;
    var OBNCacheName = "obnAccessTokenCache";

    var TRANSACTION_RESPONSE_REC_TYPE =
        mainConstants.RECORD_TYPES.TRANSACTION_RESPONSE;

    var EI_BUNDLE_DETAILS = mainConstants.SUITEAPPS.EI;

    var OBN_DOCUMENT_ID_FLD = "custbody_nseb_obn_doc_id";

    var SEND_TO_OBN_SUCCESS_MSG_CERT = "send.to.obn.cert.success";
    var SEND_TO_OBN_SICCESS_MSG_CERT_ENG =
        "The e-document is successfully sent to Avalara for certification.";
    var SEND_TO_OBN_ERROR_MSG_CERT = "send.to.obn.cert.error";
    var SEND_TO_OBN_ERROR_MSG_CERT_ENG =
        "An error occurred while sending the e-document for certification to Avalara.";
    var SEND_TO_OBN_SUCCESS_MSG_TR = "send.to.obn.tr.success";
    var SEND_TO_OBN_SUCCESS_MSG_TR_ENG =
        "The transaction response content is sent successfully to OBN.";
    var SEND_TO_OBN_ERROR_MSG_TR = "send.to.obn.tr.error";
    var SEND_TO_OBN_ERROR_MSG_TR_ENG =
        "An error occurred while sending the transaction response content to OBN";
    var ACCESS_TOKEN_NOT_FOUND_ERROR_CODE = "ACCESS_TOKEN_NT_FOUND";
    var ACCESS_TOKEN_NOT_FOUND_ERROR_MSG = "transresponse.obn.access.token.err";

    var EI_TRANS_RESP_OBN_DOC_FLD_ID =
        recordFields[TRANSACTION_RESPONSE_REC_TYPE].OBN_DOC_ID;
    /**
     * sendToObn - This function triggers call to OBN Endpoint for sending edoc
     * @param {Object} plugInContext
     * @param {String} plugInContext.scriptId
     * @param {String} plugInContext.sendMethodId
     * @param {String} plugInContext.eInvoiceContent
     * @param {String} plugInContext.batchOwner
     * @param {Object} plugInContext.customer
     * @param {String} plugInContext.customer.id
     * @param {Array}  plugInContext.customer.recipients
     * @param {String} plugInContext.transResponseId (Used only when Transaction response Content is being sent to Avalara)
     * @param {Object} plugInContext.transaction
     * @param {String} plugInContext.transaction.number
     * @param {String} plugInContext.transaction.id
     * @param {String} plugInContext.transaction.poNum
     * @param {String} plugInContext.transaction.type
     * @param {String} plugInContext.transaction.tranType
     * @param {String} plugInContext.transaction.subsidiary
     * @param {Object} plugInContext.sender
     * @param {String} plugInContext.sender.id
     * @param {String} plugInContext.sender.name
     * @param {String} plugInContext.sender.email
     * @param {Array} plugInContext.attachmentFileIds
     *
     * @returns {Object} result
     * @returns {Boolean} result.success
     * @returns {String} result.message
     */
    function sendToOBN(plugInContext) {
        var DOCUMENTPATH = "//XHUB_HTTPSERVICE/RESPONSE/MESSAGE_ID";
        var isSendToObnSuccess = false;
        var recType = plugInContext.transaction.type;
        var responseObj = {};
        var dataReturned = {};

        try {
            var accessToken = createCacheAndStoreAccessToken(plugInContext);
            responseObj = triggerOBNcall(plugInContext, accessToken, recType);

            if (responseObj.code === OK_STATUS_CODE) {
                var xmlDocument = xml.Parser.fromString({
                    text: responseObj.body,
                });
                var documentId = xml.XPath.select({
                    node: xmlDocument,
                    xpath: DOCUMENTPATH,
                })[0].textContent;
                dataReturned = createDataToBeReturned(
                    true,
                    recType,
                    documentId,
                    ""
                );
                isSendToObnSuccess = true;
            }
        } catch (err) {
            log.error("Error in Avalara Sending Plugin", err + " " + err.stack);
            dataReturned = createDataToBeReturned(false, recType, "", err);
        }
        return {
            success: isSendToObnSuccess,
            message: dataReturned.auditTrailDetailsMsg,
            eiStatus: {
                transactionId: plugInContext.transaction.id,
                transactionType: plugInContext.transaction.tranType,
                entity: plugInContext.customer.id,
                eDocStatus: dataReturned.eDocStatus,
                eventType: dataReturned.eventType,
                details: dataReturned.auditTrailDetailsMsg,
                owner: plugInContext.batchOwner,
                isUpdateFields: true,
                extraFieldsForUpdate: dataReturned.fieldsForUpdate,
                bundleId: EI_BUNDLE_DETAILS.ID,
                bundleName: EI_BUNDLE_DETAILS.NAME,
            },
        };
    }

    function createDataToBeReturned(isSuccess, type, docId, err) {
        var result = {
            auditTrailDetailsMsg: "",
            fieldsForUpdate: {},
            eDocStatus: "",
            eventType: "",
        };
        if (isSuccess) {
            // In future if more conditions get added we can convert it into a switch case
            if (type === TRANSACTION_RESPONSE_REC_TYPE) {
                result.auditTrailDetailsMsg =
                    translator.getString(SEND_TO_OBN_SUCCESS_MSG_TR) ||
                    SEND_TO_OBN_SUCCESS_MSG_TR_ENG;
                result.fieldsForUpdate[EI_TRANS_RESP_OBN_DOC_FLD_ID] = docId;
            } else {
                result.fieldsForUpdate[OBN_DOCUMENT_ID_FLD] = docId;
                result.auditTrailDetailsMsg =
                    translator.getString(SEND_TO_OBN_SUCCESS_MSG_CERT) ||
                    SEND_TO_OBN_SICCESS_MSG_CERT_ENG;
                result.eDocStatus = "20";
                result.eventType = "20";
            }
        } else {
            if (type === TRANSACTION_RESPONSE_REC_TYPE) {
                result.auditTrailDetailsMsg =
                    (translator.getString(SEND_TO_OBN_ERROR_MSG_TR) ||
                        SEND_TO_OBN_ERROR_MSG_TR_ENG) +
                    " Error Context: " +
                    err.name;
            } else {
                result.auditTrailDetailsMsg =
                    (translator.getString(SEND_TO_OBN_ERROR_MSG_CERT) ||
                        SEND_TO_OBN_ERROR_MSG_CERT_ENG) +
                    " Error Context: " +
                    err.name;
                result.eDocStatus = "19";
                result.eventType = "19";
            }
        }
        return result;
    }

    /**
     * Cache loader function called when access token is expired in obnCache
     * @param pluginContext
     * @returns access token by calling the NSEB restlet with required params(subsidiary)
     */
    function getAccessToken(pluginContext) {
        log.debug("getAccessToken", "getAccessToken loader called");
        var BODY = "body";
        var SUCCESS = "success";
        var ACCESS_TOKEN_VAL = "access_token";
        var suiteappId = "com.netsuite.electronic.invoicing.suiteapp";
        var subsidiaryId = 1;
        if (isOW()) {
            subsidiaryId = pluginContext.transaction.subsidiary;
        }
        var urlParams = {
            subsidiaryId: subsidiaryId.toString(),
            suiteapp: suiteappId,
        };
        var accessTokenRestletScriptId =
            "customscript_nseb_rl_get_access_token";
        var accessTokenRestletDepId = "customdeploy_nseb_rl_get_access_token";
        var responseBody;
        var parsedBody;

        try {
            var restletResponse = https.requestRestlet({
                deploymentId: accessTokenRestletDepId,
                method: "GET",
                scriptId: accessTokenRestletScriptId,
                urlParams: urlParams,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            log.debug(
                "getAccessToken: get access token restlet response",
                restletResponse
            );

            responseBody = restletResponse[BODY];
            parsedBody = JSON.parse(responseBody);
            var accessTokenNotRetrieved = parsedBody[SUCCESS];
            if (restletResponse.code !== OK_STATUS_CODE) {
                throw error.create({
                    name: restletResponse.code.toString(),
                    message: restletResponse.body,
                });
            } else if (
                restletResponse.code == OK_STATUS_CODE &&
                accessTokenNotRetrieved
            ) {
                throw error.create({
                    name: ACCESS_TOKEN_NOT_FOUND_ERROR_CODE,
                    message: ACCESS_TOKEN_NOT_FOUND_ERROR_MSG,
                });
            }

            responseBody = restletResponse[BODY];
            parsedBody = JSON.parse(responseBody);
        } catch (err) {
            log.error("getAccessToken error", err + " " + err.stack);
            throw err;
        }
        return parsedBody[ACCESS_TOKEN_VAL];
    }

    /**
     * Creates Cache with access token key with 5 mins(300sec) TTL
     * @param pluginContext
     * @returns access token by fetching it from obnCache or by calling the required loader(getAccessToken)
     */
    function createCacheAndStoreAccessToken(pluginContext) {
        var ACCESS_TOKEN_CACHE_KEY = "obnAccessToken";

        try {
            var obnCache = cache.getCache({
                name: OBNCacheName,
                scope: cache.Scope.PRIVATE,
            });
            return obnCache.get({
                key: ACCESS_TOKEN_CACHE_KEY,
                loader: function () {
                    return getAccessToken(pluginContext);
                },
                ttl: 300,
            });
        } catch (err) {
            log.error(
                "createCacheAndStoreAccessToken error",
                err + " " + err.stack
            );
            throw error.create({
                name: "ERROR_GETTING_ACCESS_TOKEN " + "Error Code: " + err.name,
                message: "Error Message: " + err.message,
            });
        }
    }

    /**
     *
     * @param plugInContext
     * @param accessToken
     * @param recType
     * @returns responseObj from OBN after triggering the calling to OBN with required params
     */
    function triggerOBNcall(plugInContext, accessToken, recType) {
        var FEDERAL_ID = "federalidnumber";
        var EMPLOYER_ID = "employerid";

        var NSEB_AVALARA_MANDATE_FLD_ID = "custbody_nseb_avalara_mandate";
        var NSEB_AVALARA_DATA_FORMAT_FLD_ID = "custbody_nseb_avalara_data_format";
        var TR_AVALARA_MANDATE_FLD_ID =
            "custrecord_psg_ei_trans_res_av_mandate";
        var SUBSDIAIRY_TAX_REGISTRATION_FLD_ID = "subsidiarytaxregnum";
        var TRANSACTION_NUMBER_FLD_ID = "transactionnumber";

        var INVOICE_DOC_TYPE = "InvoiceDetailRequestUBL";
        var APP_RES_DOC_TYPE = "ApplicationResponseUBL";
        var APP_RES_SUB_TYPE = "ubl-applicationresponse";
        var INVOICE_DOC_SUB_TYPE = "ubl-invoice";
        var CREDITNOTE_DOC_SUB_TYPE = "ubl-creditnote";
        var OBN_RECEIVER_ENDPOINT_CACHE_KEY = "obnReceiverEndpoint";
        var EDOC_CONTENT_BLANK_MSG = "The e-document content is blank.";
        var TRANS_RES_CONTENT_BLANK_MSG =
            "The transaction response content is blank.";
        var CTT_STYLE_BASIC = mainConstants.CUSTOM_TRANSACTION_STYLE.BASIC;
        var tranResLookUp = {};

        var requiredParamsObj = {
            COUNTRY_MANDATE: "COUNTRY_MANDATE",
            AVALARA_DATA_FORMAT_VERSION: "AVALARA_DATA_FORMAT_VERSION",
            SENDER_ID: "SENDER_ID",
            DOC_TYPE: "DOC_TYPE",
            DOC_SUB_TYPE: "DOC_SUB_TYPE",
            DOC_REF: "DOC_REF",
        };

        var obnResponseObj = {};
        var obnEndpoint = "";
        var headerParams = {
            Accept: "*/*",
            SENDER_ID_TYPE: "TAXID",
            DOC_FORMAT: "UBL",
            FORMAT_VERSION: "2.1",
            AVALARA_DATA_FORMAT_VERSION: "2.1",
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/xml",
            RECEIVER_ID: "AVALARAELR",
            RECEIVER_ID_TYPE: "MISC",
        };

        try {
            var tranType = plugInContext.transaction.tranType;
            var tranId = plugInContext.transaction.number;
            var tranInternalId = plugInContext.transaction.id;

            if (!plugInContext.eInvoiceContent) {
                var errMsg =
                    recType === TRANSACTION_RESPONSE_REC_TYPE
                        ? TRANS_RES_CONTENT_BLANK_MSG
                        : EDOC_CONTENT_BLANK_MSG;
                var errCode =
                    recType === TRANSACTION_RESPONSE_REC_TYPE
                        ? "TRANSACTION_RESPONSE_CONTENT_EMPTY"
                        : "EDOC_CONTENT_EMPTY";
                throw error.create({
                    name: errCode,
                    message: errMsg,
                });
            }
            var obnCache = cache.getCache({
                name: OBNCacheName,
                scope: cache.Scope.PRIVATE,
            });
            // OBN EndPoint
            obnEndpoint = obnCache.get({
                key: OBN_RECEIVER_ENDPOINT_CACHE_KEY,
                loader: getObnReceiverEndPoint,
                ttl: 1800,
            });

            log.debug("triggerOBNcall(): obnReceiverUrl Endpoint", obnEndpoint);
            if (!obnEndpoint) {
                throw error.create({
                    name: "OBN_RECEIVER_ENDPOINT_NOT_FOUND",
                    message: "OBN receiver endpoint is missing.",
                });
            }

            var tranColumns = [NSEB_AVALARA_MANDATE_FLD_ID];
            var isSuiteTaxAccount = getIsSuiteTaxAccount();
            if (isSuiteTaxAccount) {
                tranColumns.push(SUBSDIAIRY_TAX_REGISTRATION_FLD_ID);
            }

            if (
                !tranId &&
                (tranType === record.Type.VENDOR_BILL ||
                    tranType === record.Type.VENDOR_CREDIT)
            ) {
                tranColumns.push(TRANSACTION_NUMBER_FLD_ID);
            }

            // Search look up on transaction for avalara mandate field and tax registration number(in case of SuiteTax)
            var tranLookUp = search.lookupFields({
                type: tranType,
                id: tranInternalId,
                columns: tranColumns,
            });

            try {
                var avalaraDataForLookup = search.lookupFields({
                    type: tranType,
                    id: tranInternalId,
                    columns: [NSEB_AVALARA_DATA_FORMAT_FLD_ID],
                });
                if (avalaraDataForLookup[NSEB_AVALARA_DATA_FORMAT_FLD_ID])
                    headerParams[requiredParamsObj.AVALARA_DATA_FORMAT_VERSION] =
                        avalaraDataForLookup[NSEB_AVALARA_DATA_FORMAT_FLD_ID];
            } catch (ex) {
                log.error("Error in data format field lookup", ex);
            }
            if (recType === TRANSACTION_RESPONSE_REC_TYPE) {
                tranResLookUp = search.lookupFields({
                    type: recType,
                    id: plugInContext.transResponseId,
                    columns: [TR_AVALARA_MANDATE_FLD_ID],
                });
                log.debug(
                    "avalara_mandate_val",
                    tranResLookUp[TR_AVALARA_MANDATE_FLD_ID]
                );
            }

            // Doc Ref
            if (tranLookUp[TRANSACTION_NUMBER_FLD_ID]) {
                headerParams[requiredParamsObj.DOC_REF] =
                    tranLookUp[TRANSACTION_NUMBER_FLD_ID];
            } else {
                headerParams[requiredParamsObj.DOC_REF] = tranId;
            }

            log.debug(
                "triggerOBNcall: Mandate value",
                tranLookUp[NSEB_AVALARA_MANDATE_FLD_ID]
            );

            // Country Mandate value
            headerParams[requiredParamsObj.COUNTRY_MANDATE] =
                recType === TRANSACTION_RESPONSE_REC_TYPE
                    ? tranResLookUp[TR_AVALARA_MANDATE_FLD_ID]
                    : tranLookUp[NSEB_AVALARA_MANDATE_FLD_ID];


            // Set Sender ID based on Account type
            if (isSuiteTaxAccount) {
                headerParams[requiredParamsObj.SENDER_ID] =
                    tranLookUp[SUBSDIAIRY_TAX_REGISTRATION_FLD_ID];
            } else if (isOW()) {
                var subsidiaryRec = record.load({
                    type: record.Type.SUBSIDIARY,
                    id: plugInContext.transaction.subsidiary,
                });
                headerParams[requiredParamsObj.SENDER_ID] =
                    subsidiaryRec.getValue(FEDERAL_ID);
            } else {
                var companyInfo = config.load({
                    type: config.Type.COMPANY_INFORMATION,
                });
                headerParams[requiredParamsObj.SENDER_ID] =
                    companyInfo.getValue(EMPLOYER_ID);
            }

            tranType = cttManager.getCTTTransStyle(tranType) || tranType;

            // In future if more cases come where apart from standard transactions
            //some more custom records need OBN support then convert it into a switch case
            if (recType === TRANSACTION_RESPONSE_REC_TYPE) {
                tranType = TRANSACTION_RESPONSE_REC_TYPE;
            }

            // DocType and DocSubType
            switch (tranType) {
                case record.Type.VENDOR_BILL:
                case record.Type.INVOICE:
                case CTT_STYLE_BASIC:
                    headerParams[requiredParamsObj.DOC_TYPE] = INVOICE_DOC_TYPE;
                    headerParams[requiredParamsObj.DOC_SUB_TYPE] =
                        INVOICE_DOC_SUB_TYPE;
                    break;
                case record.Type.VENDOR_CREDIT:
                case record.Type.CASH_REFUND:
                case record.Type.CREDIT_MEMO:
                    headerParams[requiredParamsObj.DOC_TYPE] = INVOICE_DOC_TYPE;
                    headerParams[requiredParamsObj.DOC_SUB_TYPE] =
                        CREDITNOTE_DOC_SUB_TYPE;
                    break;
                case TRANSACTION_RESPONSE_REC_TYPE:
                    headerParams[requiredParamsObj.DOC_TYPE] = APP_RES_DOC_TYPE;
                    headerParams[requiredParamsObj.DOC_SUB_TYPE] =
                        APP_RES_SUB_TYPE;
            }

            log.debug(
                "triggerOBNcall: header params send to OBN",
                headerParams
            );
            if (validateHeaderParams(headerParams, requiredParamsObj)) {
                obnResponseObj = https.post({
                    body: plugInContext.eInvoiceContent,
                    url: obnEndpoint,
                    headers: headerParams,
                });
                log.debug(
                    "triggerOBNcall: response received after posting to OBN",
                    obnResponseObj
                );

                if (obnResponseObj.code !== OK_STATUS_CODE) {
                    throw error.create({
                        name: obnResponseObj.code.toString(),
                        message: obnResponseObj.body,
                    });
                }
            }
        } catch (err) {
            log.error("sendToObn error", err + " " + err.stack);
            throw error.create({
                name: "ERROR_SENDING_TO_OBN " + "Error Code: " + err.name,
                message: "Error Message: " + err.message,
            });
        }
        return obnResponseObj;
    }

    /**
     *
     * @returns OBN receiver end point from NSEB records
     */
    function getObnReceiverEndPoint() {
        log.debug(
            "getObnReceiverEndPoint",
            "getObnReceiverEndPoint loader called"
        );
        var INACTIVE = "isinactive";
        var NSEB_OBN_NETWORK_SCRIPT_ID = "VAL_NSEB_OBN";
        var NSEB_NETWORK_INTEGRTAIONS_REC_TYPE =
            "customrecord_nseb_network_integrations";
        var NETWORK_NAME_FLD = "custrecord_nseb_network_name";
        var integrateInfo = {};
        var receiverUrl = null;

        try {
            var obnIntegrationQuery = query.create({
                type: NSEB_NETWORK_INTEGRTAIONS_REC_TYPE,
            });
            var networkList = getInternalIdbyNetworkScriptId(
                "customlist_nseb_networks_list"
            );
            var obnNetworkId = networkList[NSEB_OBN_NETWORK_SCRIPT_ID];
            if (isTestMode()) {
                obnIntegrationQuery.columns.push(
                    obnIntegrationQuery.createColumn({
                        fieldId: "custrecord_nseb_network_test_info",
                        alias: "integDetails",
                    })
                );
            } else {
                obnIntegrationQuery.columns.push(
                    obnIntegrationQuery.createColumn({
                        fieldId: "custrecord_nseb_network_prod_info",
                        alias: "integDetails",
                    })
                );
            }

            const inActiveCondition = obnIntegrationQuery.createCondition({
                fieldId: INACTIVE,
                operator: query.Operator.IS,
                values: false,
            });
            const networkCondition = obnIntegrationQuery.createCondition({
                fieldId: NETWORK_NAME_FLD,
                operator: query.Operator.ANY_OF,
                values: [obnNetworkId],
            });

            obnIntegrationQuery.condition = obnIntegrationQuery.and(
                inActiveCondition,
                networkCondition
            );

            const resultSet = obnIntegrationQuery.run().asMappedResults();
            if (resultSet.length === 0) {
                throw error.create({
                    name: "NSEB_NETWORK_INTEGRATIONS_NOT_FOUND",
                    message:
                        "OBN network integration record instance is not available.",
                });
            }
            integrateInfo = JSON.parse(String(resultSet[0].integDetails));

            if (
                integrateInfo.hasOwnProperty("PROD") &&
                integrateInfo.hasOwnProperty("SB")
            ) {
                receiverUrl = utils.isSandboxAccount()
                    ? integrateInfo.SB.receiverUrl
                    : integrateInfo.PROD.receiverUrl;
            } else {
                receiverUrl = integrateInfo.receiverUrl;
            }
        } catch (err) {
            log.error("getObnReceiverEndPoint");
            throw err;
        }
        return receiverUrl;
    }

    /**
     *
     * @returns boolean value whether Test Mode is enabled or not
     */
    function isTestMode() {
        var testModeEnabled = false;
        var NSEB_TEST_MODE = "customrecord_nseb_test_mode";
        var OBN_STAGE_FLD = "custrecord_nseb_obn_test_mode_stage";
        var INACTIVE = "isinactive";
        try {
            var testModeQuery = query.create({
                type: NSEB_TEST_MODE,
            });

            testModeQuery.columns = [
                testModeQuery.createColumn({
                    fieldId: OBN_STAGE_FLD,
                }),
            ];

            testModeQuery.condition = testModeQuery.createCondition({
                fieldId: INACTIVE,
                operator: query.Operator.IS,
                values: false,
            });

            const resultSet = testModeQuery.run().asMappedResults();

            if (resultSet.length === 0) {
                throw error.create({
                    name: "NSEB_TEST_MODE_NOT_FOUND",
                    message: "Test mode record instance is not available.",
                });
            }
            testModeEnabled = resultSet[0][OBN_STAGE_FLD];
        } catch (err) {
            log.error("isTestMode error", err + " " + err.stack);
            throw err;
        }
        return testModeEnabled;
    }

    /**
     *
     * @param networkCustomList
     * @returns Network List object with script id as key and value as internal id
     */
    function getInternalIdbyNetworkScriptId(networkCustomList) {
        var networkListObj = {};
        var INTERNAL_ID = "internalid";
        var SCRIPT_ID = "scriptid";

        var networkSearchObj = search.create({
            type: networkCustomList,
            columns: [INTERNAL_ID, SCRIPT_ID],
        });
        networkSearchObj.run().each(function (res) {
            networkListObj[res.getValue(SCRIPT_ID)] = Number(
                res.getValue(INTERNAL_ID)
            );
            return true;
        });

        return networkListObj;
    }

    /**
     *
     * @returns boolean value based on Suitetax is enabled in account
     */
    function getIsSuiteTaxAccount() {
        return runtime.isFeatureInEffect({ feature: "SUITETAXENGINE" });
    }

    /**
     *
     * @returns boolean value based on OneWorld account or not
     */
    function isOW() {
        return runtime.isFeatureInEffect({ feature: "SUBSIDIARIES" });
    }

    /**
     *
     * @param params
     * @param reqParamsObj
     * @returns boolean value whether params are valid or not based on the reqParamsObj sent as parameter
     */
    function validateHeaderParams(params, reqParamsObj) {
        var isHeaderParams = false;
        var requiredParamsMissing = [];
        try {
            for (var i in reqParamsObj) {
                if (!params[i]) {
                    requiredParamsMissing.push(i);
                }
            }
            if (requiredParamsMissing.length) {
                throw error.create({
                    name: "EI_OBN_NETWORK_CALL_REQ_HEADERS_MISSING",
                    message:
                        "Following request headers are missing: " +
                        requiredParamsMissing.join(", "),
                });
            } else {
                isHeaderParams = true;
            }
        } catch (err) {
            log.error("validateHeaderParams error", err + " " + err.stack);
            throw err;
        }
        return isHeaderParams;
    }

    return {
        sendToOBN: sendToOBN,
    };
});
