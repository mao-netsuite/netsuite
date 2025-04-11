/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       05 Jul 2017     ssantiago
 *
 * @NModuleScope TargetAccount
 */

define(["N/util"], function (util) {
    /**
     * Returns true if the obj parameter is a plain JavaScript object(new Object() or {} for example), and false otherwise.
     *
     * @param {Object} obj
     * @returns {Boolean}
     */
    function isObject(obj) {
        return util.isObject(obj);
    }

    /**
     * Returns true if the obj parameter is a JavaScript Array object and false otherwise.
     *
     * @param {Array} obj
     * @returns {Boolean}
     */
    function isArray(obj) {
        return util.isArray(obj);
    }

    return {
        isArray: isArray,
        isObject: isObject,
    };
});
