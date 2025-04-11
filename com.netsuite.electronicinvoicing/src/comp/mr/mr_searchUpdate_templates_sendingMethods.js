/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 *
 * Map/Reduce Script for templates ans sending methods subsidiary field updates
 *
 * Version    Date            Author           Remarks
 *
 * @NApiVersion 2.x
 * @NScriptType mapreducescript
 */

define(["N/search", "N/record", "N/runtime"], function (
    search,
    record,
    runtime
) {
    function getInputData() {
        var templateIds = [];
        var sendingMethodIds = [];
        var subsidiaryIds = [];
        var searchData = [];
        const CUSTOM_SEARCH_TEMPLATES = "customsearch_edoc_templates";
        const CUSTOM_SEARCH_SENDING_METHODS = "customsearch_ei_sending_methods";
        const CUSTOM_SEARCH_SUBSIDIARY = "customsearch_subsidiary_search";
        const INTERNAL_ID = "internalid";

        //Load templates IDs on to array
        search
            .load({ id: CUSTOM_SEARCH_TEMPLATES })
            .run()
            .each(function (result) {
                var tempId = result.getValue(INTERNAL_ID);

                templateIds.push(tempId);

                return true;
            });

        //Load sending method IDs on to array

        search
            .load({ id: CUSTOM_SEARCH_SENDING_METHODS })
            .run()
            .each(function (result) {
                var tempId = result.getValue(INTERNAL_ID);

                sendingMethodIds.push(tempId);

                return true;
            });

        //Load subsidiary IDs on to array

        if (runtime.isFeatureInEffect("SUBSIDIARIES")) {
            search
                .load({ id: CUSTOM_SEARCH_SUBSIDIARY })
                .run()
                .each(function (result) {
                    var subsId = result.getValue(INTERNAL_ID);

                    subsidiaryIds.push(subsId);

                    return true;
                });
        } else {
            subsidiaryIds.push(1);
        }

        searchData.push({
            templateIds: templateIds,

            sendingMethodIds: sendingMethodIds,

            subsidiaryIds: subsidiaryIds,
        });

        return searchData;
    }

    function map(context) {
        var contextValue = JSON.parse(context.value);

        var templateIds = contextValue.templateIds;

        var sendingMethodIds = contextValue.sendingMethodIds;

        var subsidiaryIds = contextValue.subsidiaryIds;

        //Loop in the templates for update

        if (templateIds.length > 0) {
            for (var i = 0; i < templateIds.length; i++) {
                updateTemplates(templateIds[i], subsidiaryIds);
            }
        }

        //Loop in the sending method records for update

        if (sendingMethodIds.length > 0) {
            for (var j = 0; j < sendingMethodIds.length; j++) {
                updateSendingMethods(sendingMethodIds[j], subsidiaryIds);
            }
        }
    }

    /**

         * To load a template and update the subsidiary field.

         *

         * @param templateId

         * @param subsidiaryIds

         */

    function updateTemplates(templateId, subsidiaryIds) {
        var EDOC_RECORD_TYPE = "customrecord_psg_ei_template";

        try {
            record.submitFields({
                type: EDOC_RECORD_TYPE,

                id: templateId,

                values: {
                    custrecord_psg_ei_template_subsidiary: subsidiaryIds,
                },
            });
        } catch (e) {
            log.error("Exception occured while updating template", e);
        }
    }

    /**

         * To update the sending method record using internal id and update the subsidiary field.

         *

         * @param sendingMethodId

         * @param subsidiaryIds

         */

    function updateSendingMethods(sendingMethodId, subsidiaryIds) {
        var EDOC_RECORD_TYPE = "customrecord_ei_sending_method";

        try {
            record.submitFields({
                type: EDOC_RECORD_TYPE,

                id: sendingMethodId,

                values: { custrecord_psg_ei_sm_subsidiary: subsidiaryIds },
            });
        } catch (e) {
            log.error("Exception occured while updating sending methods", e);
        }
    }

    return {
        getInputData: getInputData,

        map: map,
    };
});
