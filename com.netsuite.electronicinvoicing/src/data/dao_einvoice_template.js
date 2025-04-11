/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     aalcabasa
 *
 */
define(["../lib/dao_factory"], function (daoFactory) {
    var RECORD_TYPE = "customrecord_psg_ei_template";
    var FIELD_MAP = {
        name: "name",
        description: "custrecord_psg_template_description",
        contentType: "custrecord_psg_file_content_type",
        generatorTemplate: "custrecord_psg_ei_template_content",
        fieldMapTemplate: "custrecord_psg_ei_parsing_template",
        outboundXsd: "custrecord_edoc_template_outbound_xsd",
        customPLDigitalSignature: "custrecord_ei_pl_digital_signature_impl",
        customPLOutboundValidation: "custrecord_ei_pl_outboundvalidation_impl",
        outboundXsdFolder: "custrecord_edoc_template_xsd_folder",
        isAvalaraTemplate: "custrecord_psg_ei_is_avalara_template",
    };

    var SUBLIST_MAPS = {
        recmachcustrecord_psg_ei_temp_validator_parent: {
            xPath: "custrecord_psg_ei_temp_validator_xpath",
            regex: "custrecord_psg_ei_temp_validator_regex",
        },
    };

    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
        subListMaps: SUBLIST_MAPS,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(auditTrail) {
        return dao.create(auditTrail);
    }

    function retrieve(id) {
        return dao.retrieve(id);
    }

    return {
        create: create,
        retrieve: retrieve,
    };
});
