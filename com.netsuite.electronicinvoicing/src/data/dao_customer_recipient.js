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
    var RECORD_TYPE = "customrecord_psg_ei_email_recipient";
    var FIELD_MAP = {};

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(customer) {
        return dao.create(customer);
    }

    /**
     * Retrieves all instances of customer recipients filtered by entity (customer)
     * @param Integer customer internal id
     * @returns Object[] recipients
     */
    function getAllRecipientsByCustomer(entityId) {
        var recipientSearch = search.create({
            type: RECORD_TYPE,
            columns: [],
            filters: ["custrecord_psg_ei_email_recipient_cust", "is", entityId],
        });

        var recipients = [];
        recipientSearch.run().each(function (result) {
            recipients.push(result);
            return true;
        });
        return recipients;
    }

    return {
        create: create,
        getAllRecipientsByCustomer: getAllRecipientsByCustomer,
    };
});
