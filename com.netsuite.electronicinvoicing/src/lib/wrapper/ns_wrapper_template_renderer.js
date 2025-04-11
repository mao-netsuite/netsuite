/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       18 Sep 2015         ldimayuga
 *
 * @NModuleScope TargetAccount
 */
define(["N/render", "N/file"], function (render, file) {
    var templateRenderer;

    function getRenderer() {
        if (!templateRenderer) {
            templateRenderer = render.create();
        }
        return templateRenderer;
    }
    //uses a file for loading
    function setTemplate(template) {
        var xmlTemplateFile = file.load(template);
        getRenderer().templateContent = xmlTemplateFile.getContents();
    }
    //uses the string for setting the content
    function setTemplateContents(contents) {
        getRenderer().templateContent = contents;
    }
    function addRecord(label, record) {
        try {
            getRenderer().addRecord(label, record);
        } catch (e) {
            log.error("error", JSON.stringify(e));
        }
    }

    function addSearchResults(label, search) {
        getRenderer().addSearchResults(label, search);
    }

    function renderAsString() {
        return getRenderer().renderAsString();
    }

    function renderToResponse(response) {
        return getRenderer().renderToResponse(response);
    }

    function addDataSource(label, object) {
        var renderer = getRenderer();

        switch (typeof object) {
            case "nlobjRecord":
                renderer.addRecord(label, object);
                break;
            case "nlobjSearchResult":
                renderer.addSearchResults(label, object);
                break;
            default:
                break;
        }
    }

    function addCustomDataSource(label, format, object) {
        getRenderer().addCustomDataSource({
            alias: label,
            format: format,
            data: object,
        });
    }

    function transaction(params) {
        return render.transaction(params);
    }

    function getPrintMode() {
        return render.PrintMode;
    }

    function create() {
        return render.create();
    }

    function renderAsPdf() {
        return getRenderer().renderAsPdf();
    }

    //uses ID of the template for loading
    function setTemplateById(templateId) {
        getRenderer().setTemplateById(templateId);
    }

    return {
        setTemplate: setTemplate,
        setTemplateContents: setTemplateContents,
        addRecord: addRecord,
        addSearchResults: addSearchResults,
        addDataSource: addDataSource,
        renderAsString: renderAsString,
        renderToResponse: renderToResponse,
        addCustomDataSource: addCustomDataSource,
        transaction: transaction,
        getPrintMode: getPrintMode,
        setTemplateById: setTemplateById,
        renderAsPdf: renderAsPdf,
        create: create,
    };
});
