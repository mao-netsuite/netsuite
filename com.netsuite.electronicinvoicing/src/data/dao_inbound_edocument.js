/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       03 Jul 2017     ssantiago
 *
 * @NModuleScope TargetAccount
 */

define(["../lib/dao_factory"], function (daoFactory) {
    var RECORD_TYPE = "customrecord_psg_ei_inbound_edoc";
    var FIELD_MAP = {
        name: "name",
        customer: "custrecord_psg_ei_inbound_customer",
        vendor: "custrecord_psg_ei_inbound_vendor",
        transtype: "custrecord_psg_ei_inbound_transtype",
        source: "custrecord_psg_ei_inbound_source",
        refnum: "custrecord_psg_ei_inbound_refnum",
        ponum: "custrecord_psg_ei_inbound_po",
        template: "custrecord_psg_ei_inbound_template",
        status: "custrecord_psg_ei_inbound_status",
        content: "custrecord_psg_ei_inbound_content",
        parsedContent: "custrecord_psg_ei_inbound_parsed_content",
        plugin: "custrecord_psg_ei_inbound_plugin",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    /**
     * Create inbound e-document to be passed to DAO Factory Instance
     * @param {Object} inboundEdoc Inbound E-Document Object
     * @param {Object} createOptions
     * @param {Object} saveOptions
     * @returns {Integer} Record ID
     */
    function create(inboundEdoc, createOptions, saveOptions) {
        return dao.create(inboundEdoc, createOptions, saveOptions);
    }

    return {
        create: create,
    };
});
