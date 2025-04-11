/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(["N/search", "N/file", "N/error"], function (search, file, error) {
    /**
     * @param params.filename {String} filename
     * @param params.uuid {String} uuid identifier where the file shared module resides
     *
     * @returns the absolute path given a filename and a uuid
     * @throws throws error in case duplicate search results are encountered or file does not exist.
     *
     */
    var EI_API_SHARED_MODULE_PATH =
        "Problem in finding the shared module in the localization bundle";
    var EI_API_SHARED_MODULE_NON_UNIQUE =
        "Problem in finding the shared module in the localization bundle.Shared Module name is non unique.";
    var EI_API_SHARED_MODULE_lOAD =
        "Problem in loading the shared module in the localization bundle.";
    var EI_API_SHARED_MODULE_NON_UNIQUE_UUID =
        "Problem in loading the shared module in the localization bundle.Non Unique UUID";
    var SHARED_MODULE_FILE_NAME = "inject_custom_data_to_template.js";
    var UUID = "59aa96d0-ea6f-4952-aae4-305b2a351c2b";
    var EI_API_EXECUTION =
        "Problem in calling the api of the localization bundle";

    function getSharedModule(params) {
        // search for the file record where name equals the uuid
        var translationDirs = [];
        search
            .create({
                type: "file",
                columns: ["name", "folder", "url"],
                filters: [
                    {
                        name: "name",
                        operator: "is",
                        values: params.uuid,
                    },
                ],
            })
            .run()
            .each(function (result) {
                translationDirs.push(result);
                return true;
            });
        var errorParams = {};
        if (translationDirs.length != 1) {
            errorParams = {
                name: "EI_API_SHARED_MODULE_NON_UNIQUE_UUID",
                message: EI_API_SHARED_MODULE_NON_UNIQUE_UUID,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }
        var folderId = translationDirs[0].getValue({ name: "folder" });
        // Search for the file record where name is equal to the shared module's name
        // and the its folder is the same as UUID file's directory
        var sharedModuleFiles = [];
        search
            .create({
                type: "file",
                columns: ["internalid"],
                filters: [
                    ["folder", search.Operator.IS, folderId],
                    "and",
                    ["name", search.Operator.IS, params.filename],
                ],
            })
            .run()
            .each(function (result) {
                sharedModuleFiles.push(result.getValue("internalid"));
                return true;
            });

        if (sharedModuleFiles.length != 1) {
            errorParams = {
                name: "EI_API_SHARED_MODULE_NON_UNIQUE",
                message: EI_API_SHARED_MODULE_NON_UNIQUE,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }

        try {
            var sharedModuleFileObj = file.load({ id: sharedModuleFiles[0] });
            if (!sharedModuleFileObj) {
                errorParams = {
                    name: "EI_API_SHARED_MODULE_PATH",
                    message: EI_API_SHARED_MODULE_PATH,
                };
                log.error(errorParams.name, errorParams.message);
                throw error.create(errorParams);
            }
            return sharedModuleFileObj.path;
        } catch (loadEx) {
            errorParams = {
                name: "EI_API_SHARED_MODULE_lOAD",
                message: EI_API_SHARED_MODULE_lOAD,
            };
            log.error(errorParams.name, errorParams.message);
            throw error.create(errorParams);
        }
    }
    function executeSharedModule(params) {
        try {
            var module = null;

            var filePathObj = getSharedModule({
                filename: SHARED_MODULE_FILE_NAME,
                uuid: UUID,
            });
            require([filePathObj], function (customModule) {
                module = customModule;
            });
            log.debug("Successfully Loaded Module " + module);
            return module.inject(params);
        } catch (ex) {
            var errorParams = {
                name: "EI_API_EXECUTION",
                message: EI_API_EXECUTION,
            };
            log.error(errorParams.name, EI_API_EXECUTION);
            throw error.create(errorParams);
        }
    }

    return {
        getSharedModule: getSharedModule,
        executeSharedModule: executeSharedModule,
    };
});
