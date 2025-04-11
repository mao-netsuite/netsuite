/**
 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["../lib/dao_factory"], function (daoFactory) {
    var RECORD_TYPE = "customrecord_psg_ei_request";

    var FIELD_MAP = {
        name: "name",
        created: "created",
        rawRequest: "custrecord_psg_ei_rawrequest",
        rawResponse: "custrecord_psg_ei_rawresponse",
        origin: "custrecord_psg_ei_origin",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(params) {
        return dao.create({
            rawRequest: params.rawRequest,
            origin: params.origin,
        });
    }

    function updateRawResponse(params) {
        var requestRecord = dao.retreiveNSRecord(params.id);
        requestRecord.setValue({
            fieldId: FIELD_MAP.rawResponse,
            value: params.rawResponse,
        });

        return requestRecord.save();
    }

    function getJsonObject(recordId) {
        var requestRecord = dao.retreiveNSRecord(recordId);
        return JSON.parse(requestRecord.getValue(FIELD_MAP.rawRequest));
    }

    return {
        create: create,
        updateRawResponse: updateRawResponse,
        getJsonObject: getJsonObject,
    };
});
