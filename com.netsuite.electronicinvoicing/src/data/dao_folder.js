/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Aug 2017     mjaurigue
 *
 * @NModuleScope Public
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "folder";
    var FIELD_MAP = {
        name: "name",
        parent: "parent",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(param) {
        return dao.create(param);
    }

    function retrieveByNameAndParent(params) {
        var obj;

        var name = params.name;
        var parent = params.parent;

        var nameFilter = search.createFilter({
            name: "name",
            operator: "is",
            values: name,
        });
        var filters = [nameFilter];

        if (parent) {
            var parentFolderFilter = search.createFilter({
                name: "parent",
                operator: "is",
                values: parent,
            });
            filters.push(parentFolderFilter);
        }

        var searchParams = {
            type: RECORD_TYPE,
            columns: [],
            filters: filters,
        };

        var srcObj = search.create(searchParams);

        srcObj.run().each(function (result) {
            var id = result.id;
            obj = {
                id: id,
            };
            return true;
        });

        return obj;
    }

    return {
        create: create,
        retrieveByNameAndParent: retrieveByNameAndParent,
    };
});
