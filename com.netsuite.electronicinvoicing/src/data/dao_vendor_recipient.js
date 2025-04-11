/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       09 Sep 2016     mjaurigue
 *
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "customrecord_psg_ei_email_recipient_vend";
    var FIELD_MAP = {};

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(vendor) {
        return dao.create(vendor);
    }

    /**
     * Retrieves all instances of vendor recipients filtered by entity (vendor)
     * @param Integer vendor internal id
     * @returns Object[] recipients
     */
    function getAllRecipientsByVendor(entityId) {
        var recipients = [];
        var recipientSearch = search.create({
            type: RECORD_TYPE,
            columns: [],
            filters: [
                "custrecord_psg_ei_email_recipient_vendor",
                "is",
                entityId,
            ],
        });

        recipientSearch.run().each(function (result) {
            recipients.push(result);
            return true;
        });
        return recipients;
    }

    return {
        create: create,
        getAllRecipientsByVendor: getAllRecipientsByVendor,
    };
});
