/**
 *    Copyright 2018 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

define([
    "./dao_edoc_package",
    "N/runtime",
    "N/search",
    "N/record",
    "N/error",
    "../lib/constants",
    "../app/einvoice/app_einvoice_ctt_manager",
], function (
    daoPackage,
    runtime,
    search,
    record,
    error,
    constants,
    cttManager
) {
    var RECORD_TYPE = "customrecord_ei_sending_method";
    var INTERNAL_ID = "internalid";
    var TRANSACTION_TYPE_OLD_FIELD = "custrecord_psg_ei_trans_type";
    var EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS =
        constants.ErrorCodes.EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS;

    var FIELD_MAP = {
        name: "name",
        edocPackage: "custrecord_psg_ei_edoc_standard",
        transactionType: "custpage_psg_ei_supported_transtype",
        eDocPluginImpl: "custrecord_ei_sending_plugin_impl",
        sendingChannel: "custrecord_ei_sending_method_channel",
        sendingMethodPACIdentifier: "custrecord_psg_ei_identifier_sm",
        sendingPluginCustPageField: "custpage_ei_sending_plugin",
        isInactive: "isinactive",
        isForCertification: "custrecord_ei_sending_method_for_certifi",
        subsidiary: "custrecord_psg_ei_sm_subsidiary",
    };

    function createPacPackage(params) {
        var packageId = daoPackage.getPackageId(params.name);
        if (params.name && typeof packageId == "undefined") {
            var hashCodeVal = getHashCode(params.name);
            packageId = daoPackage.create({
                name: params.name,
                description: params.description,
                hashCode: hashCodeVal,
            });
        }
        return packageId;
    }

    function getHashCode(str) {
        var h = 0,
            l = str.length,
            i = 0;
        if (l > 0) while (i < l) h = ((h << 5) - h + str.charCodeAt(i++)) | 0;
        return h;
    }

    function getSendingMethodId(hashCode, sendingMethodName) {
        var sendingMethodId;
        var filters = [FIELD_MAP.name, search.Operator.IS, sendingMethodName];
        var columns = [INTERNAL_ID, FIELD_MAP.sendingMethodPACIdentifier];
        var sendingMethodSearch = search.create({
            type: RECORD_TYPE,
            filters: filters,
            columns: columns,
        });
        sendingMethodSearch.run().each(function (sendingMethod) {
            var hashCodeStored = Number(
                sendingMethod.getValue(FIELD_MAP.sendingMethodPACIdentifier)
            );
            if (hashCodeStored === hashCode) {
                sendingMethodId = sendingMethod.id;
                return false;
            }
            return true;
        });
        return sendingMethodId;
    }

    function getSendingMethodRecord(sendingMethodId) {
        return record.load({
            id: sendingMethodId,
            type: RECORD_TYPE,
        });
    }

    function createSendingMethodRecord() {
        return record.create({
            type: RECORD_TYPE,
            isDynamic: true,
        });
    }

    /* Returns an array containing Internal Ids of standard transactions and CTTs after
         getting the internal IDs of CTT from the string Ids of CTT which are used in JSON payload */

    function convertStringIdsToInternalIds(transTypeArr) {
        var finalIntIdArrForSM = [];
        var intId;

        for (var i in transTypeArr) {
            if (transTypeArr[i].indexOf("custom") != -1) {
                intId = cttManager.getInternalIdOfCTTFromStringId(
                    transTypeArr[i]
                );
                finalIntIdArrForSM.push(intId);
            } else {
                finalIntIdArrForSM.push(transTypeArr[i]);
            }
        }
        return finalIntIdArrForSM;
    }

    function upsertSendingMethod(params) {
        var sendingMethodRec;
        var hashCode = getHashCode(params.name + params.edocPackage);
        var sendingMethodName = params.name;
        var sendingMethodId = getSendingMethodId(hashCode, sendingMethodName);

        if (typeof sendingMethodId == "undefined") {
            sendingMethodRec = createSendingMethodRecord();
        } else {
            sendingMethodRec = getSendingMethodRecord(sendingMethodId);
        }

        sendingMethodRec.setValue(FIELD_MAP.name, params.name);
        var packageId = createPacPackage({
            name: params.edocPackage,
            description: params.edocDescription,
        });

        var isInactive = false;
        if (params.hasOwnProperty("isInactive")) {
            isInactive = params.isInactive;
        }

        var isForCertification = false;
        if (params.hasOwnProperty("isForCertification")) {
            isForCertification = params.isForCertification;
        }

        var subsidiaries = [];
        if (params.hasOwnProperty("subsidiary")) {
            subsidiaries = params.subsidiary;
            if (!runtime.isFeatureInEffect("SUBSIDIARIES")) {
                //for single instance accounts, they need to have parent subsidiary selected.
                subsidiaries = [1]; //in single instance accounts, 1 is for parent.
            }
        }

        sendingMethodRec.setValue(FIELD_MAP.edocPackage, packageId);

        var finalIntIdArr = convertStringIdsToInternalIds(
            params.transactionType
        );
        sendingMethodRec.setValue(FIELD_MAP.transactionType, finalIntIdArr);

        if (params.subsidiary) {
            sendingMethodRec.setValue(FIELD_MAP.subsidiary, subsidiaries);
        }

        sendingMethodRec.setValue(
            FIELD_MAP.sendingMethodPACIdentifier,
            hashCode
        );
        sendingMethodRec.setValue(
            FIELD_MAP.eDocPluginImpl,
            params.eDocPluginImpl.toUpperCase()
        );
        sendingMethodRec.setValue(
            FIELD_MAP.sendingChannel,
            params.sendingChannel
        );
        sendingMethodRec.setValue(TRANSACTION_TYPE_OLD_FIELD, finalIntIdArr);
        sendingMethodRec.setValue(FIELD_MAP.isInactive, isInactive);
        sendingMethodRec.setValue(
            FIELD_MAP.isForCertification,
            isForCertification
        );

        try {
            sendingMethodId = sendingMethodRec.save();
        } catch (e) {
            var errorParams = {
                name: e.name,
                message: e.message,
            };
            if (e.name === "JS_EXCEPTION") {
                if (
                    e.message.indexOf(
                        EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS
                    ) != -1
                ) {
                    errorParams = {
                        name: EI_CERTIFICATION_SENDING_METHOD_ALREADY_EXISTS,
                        message: e.message,
                    };
                }
            }
            throw error.create(errorParams);
        }
        return sendingMethodId;
    }

    return {
        upsertSendingMethod: upsertSendingMethod,
    };
});
