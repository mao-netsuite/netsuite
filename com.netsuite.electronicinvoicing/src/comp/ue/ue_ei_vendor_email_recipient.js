/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * This is the user event for Vendor E-Document Email Recipients.
 *
 * Version    Date            Author           Remarks
 * 1.00       05 Sep 2016     ssantiago
 *
 * @NApiVersion 2.1
 * @NScriptType usereventscript
 *
 */
define([
    "../../app/einvoice/app_einvoice_entity_recipient_validator",
], function (recipientValidator) {
    var VENDOR = "vendor";

    function beforeSubmit(context) {
        recipientValidator.validateContext(context, VENDOR);
    }

    return {
        beforeSubmit: beforeSubmit,
    };
});
