/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       03 Mar 2016     aalcabasa
 *
 *
 * @NModuleScope TargetAccount
 *
 */
define(["N/ui/message"], function (nsMessage) {
    function create(options) {
        var message = nsMessage.create(options);
        return new Message(message);
    }

    function Message(message) {
        this.show = function show(options) {
            message.show(options);
            return true;
        };

        this.hide = function hide() {
            message.hide();
            return true;
        };
    }

    return {
        create: create,
        Type: nsMessage.Type,
    };
});
