/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     mjaurigue
 *
 */

define(["N/ui/serverWidget"], function (serverWidget) {
    var nsSublist;

    function wrap(s) {
        nsSublist = s;
        return this;
    }

    function setSublistValue(obj) {
        return nsSublist.setSublistValue(obj);
    }

    function addField(obj) {
        return nsSublist.addField(obj);
    }

    return {
        wrap: wrap,
        setSublistValue: setSublistValue,
        addField: addField,
    };
});
