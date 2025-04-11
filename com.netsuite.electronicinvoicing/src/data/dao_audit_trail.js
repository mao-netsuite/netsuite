/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       17 Sep 2015     aalcabasa
 *
 */
define(["../lib/dao_factory"], function (daoFactory) {
    var RECORD_TYPE = "customrecord_psg_ei_audit_trail";
    var FIELD_MAP = {
        transaction: "custrecord_psg_ei_audit_transaction",
        entity: "custrecord_psg_ei_audit_entity",
        eventType: "custrecord_psg_ei_audit_event",
        owner: "custrecord_psg_ei_audit_owner",
        details: "custrecord_psg_ei_audit_details",
        inboundEDoc: "custrecord_psg_ei_audit_inbound_edoc",
    };
    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(auditTrail) {
        return dao.create(auditTrail);
    }

    return {
        create: create,
    };
});
