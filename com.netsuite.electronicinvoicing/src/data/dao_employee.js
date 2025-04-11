/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Dec 2016     esia
 *
 * @NModuleScope TargetAccount
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var INTERNALID_FLD = "internalid";
    var ROLE_FLD = "role";
    var INACTIVE_FLD = "isinactive";

    var ADMIN_ROLE_ID = 3;

    var FIELD_MAP = {
        entityid: "entityid",
    };

    /**
     * Create employee to be passed to DAO Factory Instance.
     *
     * @param customer Customer Object
     *
     * @returns Record object
     */
    function create(employee) {
        var RECORD_TYPE = search.Type.EMPLOYEE;
        var daoParams = {
            recordType: RECORD_TYPE,
            fieldMap: FIELD_MAP,
        };
        var dao = daoFactory.getDAO(daoParams);
        return dao.create(employee);
    }

    /**
     * Retrieve the list of all active administrators.
     *
     * @returns list of all active administrators.
     */
    function getActiveAdministrators() {
        var RECORD_TYPE = search.Type.EMPLOYEE;
        var adminList = [];

        var searchFilters = [];
        // Role is admin.
        searchFilters.push(
            search.createFilter({
                name: ROLE_FLD,
                operator: search.Operator.ANYOF,
                values: ADMIN_ROLE_ID,
            })
        );
        // Inactive is set to false.
        searchFilters.push(
            search.createFilter({
                name: INACTIVE_FLD,
                operator: search.Operator.IS,
                values: false,
            })
        );

        var adminSearch = search.create({
            type: RECORD_TYPE,
            filters: searchFilters,
            columns: [
                search.createColumn({
                    name: INTERNALID_FLD,
                    sort: search.Sort.ASC,
                }),
            ],
        });

        adminSearch.run().each(function (result) {
            adminList.push(result.id);
            return true;
        });

        return adminList;
    }

    return {
        create: create,
        getActiveAdministrators: getActiveAdministrators,
    };
});
