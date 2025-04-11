/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       24 Sep 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 */
define(["N/file"], function (file) {
    /**
     * Instantiate a file object (specifying the name, type, and contents which are base-64 encoded for binary types.)
     * @restriction Server SuiteScript only
     *
     * @param {Object} options
     * @param {string} options.name file name
     * @param {string} options.fileType file type i.e. PLAINTEXT, HTMLDOC, PDF, WORD, see file.Type enum
     * @param {string} options.contents string containing file contents (must be base-64 encoded for binary types)
     * @return {File}
     *
     * @throws {error.SuiteScriptError} REQUIRED_PARAM_MISSING if options is missing or one of mandatory options properties not set
     * @throws {error.SuiteScriptError} SSS_INVALID_TYPE_ARG if options.fileType is an invalid type
     *
     * @since 2015.2
     */
    function create(params) {
        return file.create(params);
    }

    /**
     * Load a file from the file cabinet (via its internal ID or path).
     *
     * @governance 10 units
     * @restriction Server SuiteScript only
     *
     * @param {Object} options
     * @param {number|string} options.id internal ID or path to file in the file cabinet (i.e. /SuiteScript/foo.js)
     * @return {File}
     *
     * @throws {error.SuiteScriptError} REQUIRED_PARAM_MISSING if idOrPath parameter is missing
     * @throws {error.SuiteScriptError} RCRD_DSNT_EXIST attempt to load a file from non-existing path
     * @throws {error.SuiteScriptError} INSUFFICIENT_PERMISSION attempt to load a file with non-existing ID
     *
     * @since 2015.2
     */
    function load(params) {
        return file.load(params);
    }

    function deleteFile(params) {
        return file.delete(params);
    }

    return {
        create: create,
        load: load,
        Type: file.Type,
        deleteFile: deleteFile,
    };
});
