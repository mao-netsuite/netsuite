/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Handles validation output details
 *
 * Version    Date            Author           Remarks
 * 1.00       02 Oct 2015     mjaurigue
 * @NModuleScope TargetAccount
 */

define([], function () {
    function create() {
        return new ValidationResult();
    }

    function ValidationResult() {
        var validity;
        var message;

        this.setValidity = function setValidity(v) {
            validity = v;
        };

        this.isValid = function isValid() {
            return validity;
        };

        this.setMessage = function setMessage(m) {
            message = m;
        };

        this.getMessage = function getMessage() {
            return message;
        };
    }

    return {
        create: create,
    };
});
