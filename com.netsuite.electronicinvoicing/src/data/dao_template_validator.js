/**
 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 */
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define(["../lib/dao_factory", "N/search", "N/record"], function (
    daoFactory,
    search,
    record
) {
    var RECORD_TYPE = "customrecord_psg_ei_template_validator";

    var FIELD_MAP = {
        validatorXpath: "custrecord_psg_ei_temp_validator_xpath",
        validatorRegex: "custrecord_psg_ei_temp_validator_regex",
        edocTemplate: "custrecord_psg_ei_temp_validator_parent",
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    /**
     * Create  e-document to be passed to DAO Factory Instance
     * @param {Object} edocPackage Inbound E-Document Object
     * @returns {Integer} Record ID
     */
    function create(edocTemplateValidator) {
        return dao.create(edocTemplateValidator);
    }

    function getTemplateValidators(templateId) {
        var filters = [FIELD_MAP.edocTemplate, search.Operator.IS, templateId];
        var columns = ["internalid"];
        var validatorIds = [];
        var validatorSearch = search.create({
            type: RECORD_TYPE,
            columns: columns,
            filters: filters,
        });
        validatorSearch.run().each(function (result) {
            validatorIds.push(result.id);
            return true;
        });
        return validatorIds;
    }
    function deleteExistingValidators(templateId) {
        if (templateId) {
            var validatorIds = getTemplateValidators(templateId);
            for (var validatorId in validatorIds) {
                record.delete({
                    type: RECORD_TYPE,
                    id: validatorIds[validatorId],
                });
            }
        }
    }
    return {
        create: create,
        deleteExistingValidators: deleteExistingValidators,
    };
});
