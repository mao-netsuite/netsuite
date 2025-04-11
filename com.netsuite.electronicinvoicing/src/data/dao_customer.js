/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Nov 2015     ssantiago
 * @NModuleScope TargetAccount
 */
define(["../lib/dao_factory", "N/search", "N/query"], function (
    daoFactory,
    search,
    query
) {
    var RECORD_TYPE = "customer";
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
     * @param customer Customer Object
     * @returns Record object
     */
    function create(customer) {
        return dao.create(customer);
    }

    /**
     * Retrieves selected data of contacts
     * @param contactIds Array of contact ids
     * @returns contacts search result
     */
    function loadContacts(contactIds) {
        var contacts = [];
        search
            .create({
                type: "contact",
                columns: ["entityid", "email"],
                filters: ["internalid", "anyof", contactIds],
            })
            .run()
            .each(function (result) {
                contacts.push(result);
                return true;
            });

        return contacts;
    }

    /**
     * Retrieves EI recipients of customerId
     * @param customerId The internal id of the customer
     * @returns recipients Array of email addresses
     */
    function loadEIRecipients(customerId) {
        var recipients = [];
        var recipientSearch = search.create({
            type: "customrecord_psg_ei_email_recipient",
            columns: [
                search.createColumn({
                    name: "email",
                    join: "custrecord_psg_ei_email_recipient_cont",
                }),
            ],
            filters: [
                "custrecord_psg_ei_email_recipient_cust",
                "is",
                customerId,
            ],
        });

        recipientSearch.run().each(function (result) {
            var email = result.getValue({
                name: "email",
                join: "custrecord_psg_ei_email_recipient_cont",
            });
            recipients.push(email);
            return true;
        });

        return recipients;
    }

    /**
     * Searches for existing customer with same sender domain
     * used for Inbound functionality
     * @param {String} domain Sender Domain
     * @param {Integer} excludedCustId Internal ID of Customer to exclude from query
     * @returns {number} Customer Count with Sender Domain
     */
    function getCustomersUsingSenderDomain(domain, excludedCustId) {
        var customerQuery = query.create({
            type: query.Type.CUSTOMER,
        });
        var filters = [];

        var domainCondition = customerQuery.createCondition({
            fieldId: "custentity_edoc_sender_domain",
            operator: query.Operator.IS,
            values: domain,
        });
        filters.push(domainCondition);

        if (excludedCustId) {
            var excludeCustIdCondition = customerQuery.createCondition({
                fieldId: "id",
                operator: query.Operator.EQUAL_NOT,
                values: excludedCustId,
            });
            filters.push(excludeCustIdCondition);
        }

        customerQuery.condition = customerQuery.and(filters);
        customerQuery.columns = [
            customerQuery.createColumn({ fieldId: FIELD_MAP.entityid }),
        ];

        return customerQuery.run().asMappedResults().length;
    }

    /**
     * Searches for existing customer with same webservice identifier
     * used for Inbound functionality
     * @param {String} identifier WS identifier
     * @param {Integer} excludedCustId Internal ID of Customer to exclude from query
     * @returns {number} Customer Count with identifier
     */
    function getCustomersUsingWebServiceIdentifier(identifier, excludedCustId) {
        var customerQuery = query.create({
            type: query.Type.CUSTOMER,
        });
        var filters = [];

        var identifierCondition = customerQuery.createCondition({
            fieldId: "custentity_edoc_ws_id",
            operator: query.Operator.IS,
            values: identifier,
        });
        filters.push(identifierCondition);

        if (excludedCustId) {
            var excludeCustIdCondition = customerQuery.createCondition({
                fieldId: "id",
                operator: query.Operator.EQUAL_NOT,
                values: excludedCustId,
            });
            filters.push(excludeCustIdCondition);
        }

        customerQuery.condition = customerQuery.and(filters);
        customerQuery.columns = [
            customerQuery.createColumn({ fieldId: FIELD_MAP.entityid }),
        ];

        return customerQuery.run().asMappedResults().length;
    }

    /**
     * Searches for existing customer/s by Identifier and WS sender value
     * used for Inbound functionality
     * @param {String} identifier Customer Identifier
     * @param {Integer} senderId Internal ID of Entity
     * @returns {Array} Customer Array of result objects
     */
    function getCustomerUsingIdentifierAndSender(identifier, senderId) {
        var customers = [];
        //creating a query on customer
        var customerQuery = query.create({
            type: query.Type.CUSTOMER,
        });

        var senderCondition = customerQuery.createCondition({
            fieldId: "custentity_edoc_ws_sender",
            operator: query.Operator.EQUAL,
            values: senderId,
        });

        var wsIdentifierCondition = customerQuery.createCondition({
            fieldId: "custentity_edoc_ws_id",
            operator: query.Operator.IS,
            values: identifier,
        });

        var packageCondition = customerQuery.createCondition({
            fieldId: "custentity_psg_ei_entity_edoc_standard",
            operator: query.Operator.EMPTY_NOT,
        });

        customerQuery.condition = customerQuery.and([
            senderCondition,
            wsIdentifierCondition,
            packageCondition,
        ]);

        customerQuery.columns = [
            customerQuery.createColumn({ fieldId: "id" }),
            customerQuery.createColumn({ fieldId: FIELD_MAP.entityid }),
        ];

        var resultSet = customerQuery.run().asMappedResults();

        for (var i = 0; i < resultSet.length; i++) {
            customers.push(resultSet[i]);
        }
        return customers;
    }
    return {
        create: create,
        loadContacts: loadContacts,
        loadEIRecipients: loadEIRecipients,
        getCustomersUsingSenderDomain: getCustomersUsingSenderDomain,
        getCustomersUsingWebServiceIdentifier:
            getCustomersUsingWebServiceIdentifier,
        getCustomerUsingIdentifierAndSender:
            getCustomerUsingIdentifierAndSender,
    };
});
