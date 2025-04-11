/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       21 Jul 2016     mjaurigue
 *
 * @NModuleScope Public
 *
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "vendor";
    var FIELD_MAP = {
        entityid: "entityid",
        internalid: "internalid",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    /**
     * Create customer to be passed to DAO Factory Instance
     * @param {Object} customer Customer Object
     * @returns {Object} Record object
     */
    function create(vendor) {
        return dao.create(vendor);
    }

    /**
     * Retrieves selected data of contacts
     * @param {Array} contactIds Array of contact ids
     * @returns {Array} contacts search result
     */
    function loadContacts(contactIds) {
        var contacts = [];
        var contactSearch = search.create({
            type: "contact",
            columns: ["entityid", "email"],
            filters: ["internalid", search.Operator.ANYOF, contactIds],
        });

        contactSearch.run().each(function (contact) {
            contacts.push(contact);
            return true;
        });

        return contacts;
    }

    /**
     * Retrieves EI recipients of vendorId
     * @param vendorId The internal id of the customer
     * @returns recipients Array of email addresses
     */
    function loadEIRecipients(vendorId) {
        var recipients = [];
        var recipientSearch = search.create({
            type: "customrecord_psg_ei_email_recipient_vend",
            columns: [
                search.createColumn({
                    name: "email",
                    join: "custrecord_psg_v_ei_email_recipient_cont",
                }),
            ],
            filters: [
                "custrecord_psg_ei_email_recipient_vendor",
                "is",
                vendorId,
            ],
        });

        recipientSearch.run().each(function (result) {
            var email = result.getValue({
                name: "email",
                join: "custrecord_psg_v_ei_email_recipient_cont",
            });
            recipients.push(email);
            return true;
        });

        return recipients;
    }

    /**
     * Searches for existing vendor with same sender domain
     * used for Inbound functionality
     * @param {String} domain Sender Domain
     * @param {Integer} excludeVendId Internal ID of Vendor to exclude from search
     * @returns {Array} bills Array of results
     */
    function getVendorsUsingSenderDomain(domain, excludeVendId) {
        var vendors = [];

        var vendorSearch = search.create({
            type: search.Type.VENDOR,
            columns: [FIELD_MAP.entityid],
        });

        var filters = [];

        filters.push(
            search.createFilter({
                name: "custentity_edoc_sender_domain",
                operator: search.Operator.IS,
                values: domain,
            })
        );

        if (excludeVendId) {
            filters.push(
                search.createFilter({
                    name: "internalid",
                    operator: search.Operator.NONEOF,
                    values: excludeVendId,
                })
            );
        }

        vendorSearch.filters = filters;

        vendorSearch.run().each(function (vendor) {
            vendors.push(vendor);
            return true;
        });

        return vendors;
    }

    function getVendorsUsingWebServiceIdentifier(identifier, excludeVendId) {
        var vendors = [];

        var vendorSearch = search.create({
            type: search.Type.VENDOR,
            columns: [FIELD_MAP.entityid],
        });

        var filters = [];

        filters.push(
            search.createFilter({
                name: "custentity_edoc_ws_id",
                operator: search.Operator.IS,
                values: identifier,
            })
        );

        if (excludeVendId) {
            filters.push(
                search.createFilter({
                    name: "internalid",
                    operator: search.Operator.NONEOF,
                    values: excludeVendId,
                })
            );
        }

        vendorSearch.filters = filters;

        vendorSearch.run().each(function (vendor) {
            vendors.push(vendor);
            return true;
        });

        return vendors;
    }

    /**
     * Searches for existing vendor/s by Identifier and WS sender value
     * used for Inbound functionality
     * @param {String} identifier Vendor Identifier
     * @param {Integer} senderId Internal ID of Entity
     * @returns {Array} vendors Array of result objects
     */
    function getVendorUsingIdentifierAndSender(identifier, senderId) {
        var senderFilters = [];
        senderFilters.push([
            "custentity_edoc_ws_sender",
            search.Operator.IS,
            senderId,
        ]);
        senderFilters.push("OR");
        senderFilters.push(["internalid", search.Operator.IS, senderId]);

        var searchFilters = [];
        searchFilters.push([
            "custentity_edoc_ws_id",
            search.Operator.IS,
            identifier,
        ]);
        searchFilters.push("AND");
        searchFilters.push([
            "custentity_psg_ei_entity_edoc_standard",
            search.Operator.NONEOF,
            "@NONE@",
        ]);
        searchFilters.push("AND");
        searchFilters.push(senderFilters);

        var vendorSearch = search.create({
            type: search.Type.VENDOR,
            filters: searchFilters,
            columns: [FIELD_MAP.internalid, FIELD_MAP.entityid],
        });

        var vendors = [];
        vendorSearch.run().each(function (vendor) {
            vendors.push(vendor);
            return true;
        });

        return vendors;
    }

    return {
        create: create,
        loadContacts: loadContacts,
        loadEIRecipients: loadEIRecipients,
        getVendorsUsingSenderDomain: getVendorsUsingSenderDomain,
        getVendorsUsingWebServiceIdentifier:
            getVendorsUsingWebServiceIdentifier,
        getVendorUsingIdentifierAndSender: getVendorUsingIdentifierAndSender,
    };
});
