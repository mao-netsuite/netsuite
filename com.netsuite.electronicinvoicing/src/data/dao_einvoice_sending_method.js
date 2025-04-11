/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       22 Feb 2016     mjaurigue
 * @NModuleScope TargetAccount
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "customrecord_ei_sending_method";
    var FIELD_MAP = {
        edocumentstandard: "custrecord_psg_ei_edoc_standard",
        sendingscript: "custrecord_ei_sending_method_script",
        sendingchannel: "custrecord_ei_sending_method_channel",
        //"transactionTypes": "custrecord_psg_ei_trans_type"
    };
    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(auditTrail) {
        return dao.create(auditTrail);
    }

    function getSendingMethods(params) {
        var sendingMethods = [];
        var filters = [];

        if (params.edocumentstandard) {
            if (filters.length > 0) {
                filters.push("and");
            }
            filters.push([
                "custrecord_psg_ei_edoc_standard",
                "is",
                params.edocumentstandard,
            ]);
        }

        if (params.sendingchannel) {
            if (filters.length > 0) {
                filters.push("and");
            }
            filters.push([
                "custrecord_ei_sending_method_channel",
                "is",
                params.sendingchannel,
            ]);
        }

        var srch = search.create({
            type: RECORD_TYPE,
            columns: [],
            filters: filters,
        });

        srch.run().each(function (result) {
            var obj = {
                eDocumentStandard: result.getValue({
                    name: "custrecord_psg_ei_edoc_standard",
                }),
                sendingScript: result.getValue({
                    name: "custrecord_ei_sending_method_script",
                }),
                sendingChannel: result.getValue({
                    name: "custrecord_ei_sending_method_channel",
                }),
            };
            sendingMethods.push(obj);
            return true;
        });

        return sendingMethods;
    }

    return {
        create: create,
        getSendingMethods: getSendingMethods,
    };
});
