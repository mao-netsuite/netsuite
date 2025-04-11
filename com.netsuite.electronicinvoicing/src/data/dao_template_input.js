/**

 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.

 */

/**

 * @NApiVersion 2.x

 * @NModuleScope TargetAccount

 */

define([
    "N/runtime",

    "N/search",

    "N/record",

    "N/file",

    "./dao_edoc_package",

    "./dao_template_validator",

    "../app/einvoice/app_einvoice_ctt_manager",
], function (
    runtime,
    search,
    record,
    file,
    daoPackage,
    daoValidator,
    cttManager
) {
    var RECORD_TYPE = "customrecord_psg_ei_template";
    var INTERNAL_ID = "internalid";
    var XML_CONTENT_TYPE = "XML";

    var FIELD_MAP = {
        name: "name",
        description: "custrecord_psg_template_description",
        edocPackage: "custrecord_psg_ei_template_edoc_standard",
        transactionType: "custrecord_psg_ei_template_trans_type",
        templateContentType: "custrecord_psg_file_content_type",
        templateContent: "custrecord_psg_ei_template_content",
        templateXsd: "custrecord_edoc_template_xsd",
        outboundXsd: "custrecord_edoc_template_outbound_xsd",
        mappingFormat: "custrecord_ei_mapping_format",
        fieldMappingInboundEdoc: "custrecord_psg_ei_parsing_template",
        templatePACIdentifier: "custrecord_psg_ei_identifier",
        lockTxnOnStatus: "custrecord_psg_ei_temp_edoc_status",
        subsidiary: "custrecord_psg_ei_template_subsidiary",
        customDataSourcePluginImpl: "custrecord_ei_inject_data_source_impl",
        customDSPluginCustPage: "custpage_ei_custom_data_source",
        inboundCustomDataSourcePluginImpl:
            "custrecord_ei_in_inject_data_source_impl",
        digitalSignPluginImpl: "custrecord_ei_pl_digital_signature_impl",
        digSignImplCustPageValue: "custpage_ei_custom_pl_digital_signature",
        outboundValidationPluginImpl:
            "custrecord_ei_pl_outboundvalidation_impl",
        outboundXsdFolder: "custrecord_edoc_template_xsd_folder",
        templateLockingMode: "custrecord_psg_ei_native_temp_lock_mode",
        isAvalaraTemplate: "custrecord_psg_ei_is_avalara_template",
    };

    function createPacPackage(params) {
        var packageId = daoPackage.getPackageId(params.name);

        if (params.name && typeof packageId == "undefined") {
            var hashCodeVal = getHashCode(params.name);
            packageId = daoPackage.create({
                name: params.name,
                description: params.description,
                hashCode: hashCodeVal,
            });
        }

        return packageId;
    }

    function createTemplateValidator(params) {
        return daoValidator.create(params);
    }

    function deleteTemplateValidator(templateId) {
        return daoValidator.deleteExistingValidators(templateId);
    }

    function getHashCode(str) {
        var h = 0,
            l = str.length,
            i = 0;

        if (l > 0) while (i < l) h = ((h << 5) - h + str.charCodeAt(i++)) | 0;
        return h;
    }

    function getTemplateId(hashCode, templateName) {
        var templateId;

        var filters = [FIELD_MAP.name, search.Operator.IS, templateName];

        var columns = [INTERNAL_ID, FIELD_MAP.templatePACIdentifier];

        var templateSearch = search.create({
            type: RECORD_TYPE,
            filters: filters,
            columns: columns,
        });

        templateSearch.run().each(function (template) {
            var hashCodeStored = Number(
                template.getValue(FIELD_MAP.templatePACIdentifier)
            );
            if (hashCodeStored === hashCode) {
                templateId = template.id;
                return false;
            }
            return true;
        });

        return templateId;
    }

    function getTemplateRecord(templateId) {
        return record.load({
            id: templateId,
            type: RECORD_TYPE,
        });
    }

    function createTemplateRecord() {
        return record.create({
            type: RECORD_TYPE,
            isDynamic: true,
        });
    }

    function getFileContent(fileRef) {
        var fileId = file.load(fileRef);
        return fileId.getContents();
    }

    /* Returns an array containing Internal Ids of standard transactions and CTTs after
         getting the internal IDs of CTT from the string Ids of CTT which are used in JSON payload */

    function convertStringIdsToInternalIds(transTypeArr) {
        var finalIntIdArrTemp = [];
        var intId;

        for (var i in transTypeArr) {
            if (transTypeArr[i].indexOf("custom") != -1) {
                intId = cttManager.getInternalIdOfCTTFromStringId(
                    transTypeArr[i]
                );
                finalIntIdArrTemp.push(intId);
            } else {
                finalIntIdArrTemp.push(transTypeArr[i]);
            }
        }
        return finalIntIdArrTemp;
    }

    function upsertTemplate(params) {
        var templateRec;

        var hashCode = getHashCode(params.name + params.edocPackage);
        var templateName = params.name;

        var templateId = getTemplateId(hashCode, templateName);

        if (typeof templateId == "undefined") {
            templateRec = createTemplateRecord();
        } else {
            templateRec = getTemplateRecord(templateId);
        }

        templateRec.setValue(FIELD_MAP.name, params.name);

        templateRec.setValue(FIELD_MAP.description, params.description);

        var packageId = createPacPackage({
            name: params.edocPackage,
            description: params.edocDescription,
        });

        var subsidiaries = [];

        if (params.hasOwnProperty("subsidiary")) {
            subsidiaries = params.subsidiary;
            if (!runtime.isFeatureInEffect("SUBSIDIARIES")) {
                //for single instance accounts, they need to have parent subsidiary selected.
                subsidiaries = [1]; //in single instance accounts, 1 is for parent.
            }
        }

        var digitalSignPluginImpl = "";

        if (params.hasOwnProperty("digitalSignPluginImpl")) {
            digitalSignPluginImpl = params.digitalSignPluginImpl.toUpperCase();
        }

        var outboundValidationPluginImpl = "";

        if (params.hasOwnProperty("outboundValidationPluginImpl")) {
            outboundValidationPluginImpl =
                params.outboundValidationPluginImpl.toUpperCase();
        }

        var inboundCustomDataSourcePluginImpl = "";

        if (params.hasOwnProperty("inboundCustomDataSourcePluginImpl")) {
            inboundCustomDataSourcePluginImpl =
                params.inboundCustomDataSourcePluginImpl.toUpperCase();
        }

        templateRec.setText(
            FIELD_MAP.templateContentType,
            params.outboundContentType
        );
        templateRec.setValue(FIELD_MAP.edocPackage, packageId);

        var finalIntIdArrForTemp = convertStringIdsToInternalIds(
            params.transactionType
        );
        templateRec.setValue(FIELD_MAP.transactionType, finalIntIdArrForTemp);

        templateRec.setValue(FIELD_MAP.lockTxnOnStatus, params.lockTxnOnStatus);

        if (params.subsidiary) {
            templateRec.setValue(FIELD_MAP.subsidiary, subsidiaries);
        }

        templateRec.setValue(
            FIELD_MAP.templateContent,
            params.templateContent !== ""
                ? getFileContent(params.templateContent)
                : ""
        );

        if (params.templateXsd) {
            templateRec.setValue(
                FIELD_MAP.templateXsd,
                getFileIdFromPath(params.templateXsd)
            );
        }
        if (params.outboundXsd) {
            templateRec.setValue(
                FIELD_MAP.outboundXsd,
                getFileIdFromPath(params.outboundXsd)
            );
        }

        templateRec.setValue(
            FIELD_MAP.fieldMappingInboundEdoc,
            params.fieldMappingInboundEdoc !== ""
                ? getFileContent(params.fieldMappingInboundEdoc)
                : ""
        );
        templateRec.setValue(FIELD_MAP.templatePACIdentifier, hashCode);
        templateRec.setValue(
            FIELD_MAP.customDataSourcePluginImpl,
            params.customDataSourcePluginImpl.toUpperCase()
        );
        templateRec.setValue(
            FIELD_MAP.digitalSignPluginImpl,
            digitalSignPluginImpl
        );
        templateRec.setValue(
            FIELD_MAP.outboundValidationPluginImpl,
            outboundValidationPluginImpl
        );
        templateRec.setValue(
            FIELD_MAP.inboundCustomDataSourcePluginImpl,
            inboundCustomDataSourcePluginImpl
        );
        templateRec.setValue(
            FIELD_MAP.templateLockingMode,
            params.templateLockingMode
        );
        if (params.hasOwnProperty("isAvalaraTemplate")) {
            templateRec.setValue(
                FIELD_MAP.isAvalaraTemplate,
                params.isAvalaraTemplate || false
            );
        }

        if (params.hasOwnProperty("outboundXsdFolder")) {
            templateRec.setValue(
                FIELD_MAP.outboundXsdFolder,
                params.outboundXsdFolder
            );
        }

        templateId = templateRec.save();

        if (params.outboundContentType === XML_CONTENT_TYPE) {
            //discarding xml validators if outbound content type is non-XML
            deleteTemplateValidator(templateId);
            var xpathArr = params.xpath;
            var regexArr = params.regex;
            if (xpathArr.length !== 0 && regexArr.length !== 0) {
                for (var i in regexArr) {
                    createTemplateValidator({
                        validatorXpath: xpathArr[i],
                        validatorRegex: regexArr[i],
                        edocTemplate: templateId,
                    });
                }
            }
        }
        return templateId;
    }

    function getFileIdFromPath(filePath) {
        var fileObj = file.load(filePath);
        return fileObj.id;
    }

    return {
        upsertTemplate: upsertTemplate,
    };
});
