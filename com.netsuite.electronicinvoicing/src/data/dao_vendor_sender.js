/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * DAO for Vendor Sender Record
 *
 * Version    Date            Author           Remarks
 * 1.00       25 Jan 2017     ssantiago
 *
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "customrecord_psg_ei_email_sender_vend";
    var FIELD_MAP = {
        email: "custrecord_psg_ei_email_sender_email",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(vendor) {
        return dao.create(vendor);
    }

    /**
     * Retrieves all instances of vendor senders filtered by entity (vendor)
     * @param {Integer} entityId vendor internal id
     * @returns {Array} senders
     */
    function getAllSendersByVendor(entityId) {
        var senderSearch = search.create({
            type: RECORD_TYPE,
            columns: [FIELD_MAP.email],
            filters: ["custrecord_psg_ei_email_sender_vendor", "is", entityId],
        });

        var senders = [];
        senderSearch.run().each(function (result) {
            senders.push(result);
            return true;
        });
        return senders;
    }

    return {
        create: create,
        getAllSendersByVendor: getAllSendersByVendor,
    };
});
