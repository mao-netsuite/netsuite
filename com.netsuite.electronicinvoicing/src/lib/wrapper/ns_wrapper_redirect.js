/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       30 Mar 2016     ssantiago
 *
 * @NModuleScope TargetAccount
 */

define(["N/redirect"], function (redirect) {
    /**
     * Redirect to a record
     *
     * @governance 0 units
     * @restriction Suitelet and UE only
     *
     * @param {object} options
     * @param {string} options.type record type
     * @param {string} options.id record Id
     * @param {boolean} options.isEditMode(optional) default to false
     * @param {Map} options.parameters (optional)
     * @return {undefined}
     */
    function toRecord(options) {
        redirect.toRecord(options);
    }

    /**
     * Redirect to a suitelet.
     *
     * @governance 0 units
     * @restriction Suitelet and UE (beforeLoad and synchronous afterSubmit only)
     *
     * @param {object} options
     * @param {string} options.scriptId script Id for the suitelet
     * @param {string} options.de​p​l​o​y​m​e​n​t​I​d deployment Id for the suitelet
     * @param {boolean} options.isExernal(optional) indicates an external suitelet URL, default to false
     * @param {Map} options.parameters (optional) contains additional URL parameters
     * @return {undefined}
     */
    function toSuitelet(options) {
        redirect.toSuitelet(options);
    }

    return {
        toRecord: toRecord,
        toSuitelet: toSuitelet,
    };
});
