/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */

define([
    "N/runtime",
    "N/query",
    "N/record",
    "N/file",
    "../app/einvoice/app_einvoice_ctt_manager",
], function (
    runtime,
    query,
    record,
    file,
    cttManager
) {
    var RECORD_TYPE = "customrecord_psg_ei_transres_template";


    var FIELD_MAP = {
        name: "name",
        description: "custrecord_psg_ei_transres_desc",
        tempUnqIdentifier : "custrecord_psg_ei_transres_uniqid",
        transactionType: "custrecord_psg_ei_transres_trans_type",
        templateContent: "custrecord_psg_ei_transres_content",
        subsidiary: "custrecord_psg_ei_transres_subsidiary",
        customDataSourcePluginImpl: "custrecord_psg_ei_transres_outplug",
        customDSPluginCustPage: "custpage_ei_custom_data_source",
    };
    var ID = "id";
    var INACTIVE = "isinactive"
    function getTemplateId(tempUnqIdentifier) {
        var templateId;

        const transResponseTemplateQuery = query.create({ type: RECORD_TYPE });
        transResponseTemplateQuery.columns = [ transResponseTemplateQuery.createColumn({ fieldId: ID }) ];
        const inActiveCondition = transResponseTemplateQuery.createCondition({ fieldId: INACTIVE, operator: query.Operator.IS, values: false });
        const uniqueIDCondition = transResponseTemplateQuery.createCondition({
            fieldId: FIELD_MAP['tempUnqIdentifier'],
            operator: query.Operator.IS,
            values: tempUnqIdentifier,
        });
        transResponseTemplateQuery.condition = transResponseTemplateQuery.and( inActiveCondition, uniqueIDCondition );
        const transResponseTemplateResults = transResponseTemplateQuery.run().asMappedResults();

        transResponseTemplateResults.forEach(function (template) {
                templateId = template.id;
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

    function upsertTransResponseTemplate(params) {
        log.debug("dao_tr_template_input:upsertTransResponseTemplate",params)
        var templateRec;

        var tempUnqIdentifier = params.tempUnqIdentifier

        var templateId = getTemplateId(tempUnqIdentifier);
        if (typeof templateId == "undefined") {
            log.debug("dao_tr_template_input:upsertTransResponseTemplate","creating new response template")
            templateRec = createTemplateRecord();
        } else {
            log.debug("dao_tr_template_input:upsertTransResponseTemplate","updating existing template :"+templateId)
            templateRec = getTemplateRecord(templateId);
        }
        templateRec.setValue(FIELD_MAP.name, params.name);
        templateRec.setValue(FIELD_MAP.description, params.description);

        var subsidiaries = [];
        if (params.hasOwnProperty("subsidiary")) {
            subsidiaries = params.subsidiary;
            if (!runtime.isFeatureInEffect("SUBSIDIARIES")) {
                //for single instance accounts, they need to have parent subsidiary selected.
                subsidiaries = [1]; //in single instance accounts, 1 is for parent.
            }
        }
        var finalIntIdArrForTemp = convertStringIdsToInternalIds(
            params.transactionType
        );
        templateRec.setValue(FIELD_MAP.transactionType, finalIntIdArrForTemp);
        if (params.subsidiary) {
            log.debug('Setting subsidiary'+FIELD_MAP.subsidiary, subsidiaries)
            templateRec.setValue(FIELD_MAP.subsidiary, subsidiaries);
        }
        templateRec.setValue(
            FIELD_MAP.templateContent,
            params.templateContent !== ""
                ? getFileContent(params.templateContent)
                : ""
        );

        templateRec.setValue(
            FIELD_MAP.customDataSourcePluginImpl,
            params.customDataSourcePluginImpl.toUpperCase()
        );
        templateRec.setValue(FIELD_MAP.tempUnqIdentifier, params.tempUnqIdentifier)
        templateId = templateRec.save();
        log.debug('saved record with template id')
        return templateId;
    }

    return {
        upsertTransResponseTemplate: upsertTransResponseTemplate,
    };
});
