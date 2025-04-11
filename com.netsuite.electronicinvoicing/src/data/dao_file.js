/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Feb 2016     mjaurigue
 *
 */

define(["../lib/dao_factory", "N/search"], function (daoFactory, search) {
    var RECORD_TYPE = "file";

    var FIELD_MAP = {
        id: "id",
        name: "name",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(param) {
        return dao.create(param);
    }

    function retrieve(id) {
        return dao.retrieve(id);
    }

    function getClientScriptFile(fileName) {
        var fileObj = { id: null };

        var contactSearch = search.create({
            type: RECORD_TYPE,
            columns: [],
            filters: ["name", "is", fileName],
        });

        contactSearch.run().each(function (result) {
            fileObj.id = result.id;
            return true;
        });

        return fileObj;
    }

    return {
        create: create,
        retrieve: retrieve,
        getClientScriptFile: getClientScriptFile,
    };
});
