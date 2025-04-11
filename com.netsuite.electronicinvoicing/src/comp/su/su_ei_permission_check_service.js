/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 *

 * Version    Date            Author           Remarks

 * 1.00       1 Mar 2018     ssomagari

 *

 * @NApiVersion 2.1

 * @NScriptName E-Invoice Permission Check Service SU

 * @NScriptId _ei_permission_check_service_su

 * @NScriptType Suitelet

 */

define(["N/search"], function (search) {
    var CUSTOM_STANDARD = "customstandard";
    var GENERATION_CHECK_BOX = "custrecord_permission_generation";
    var SENDING_CHECK_BOX = "custrecord_permission_sending";
    var CERTIFICATION_CHECK_BOX = "custrecord_permission_certification";
    var GET_NETWORK_STATUS_CHECK_BOX = "custrecord_permission_network_status";

    function onRequest(context) {
        var request = context.request;

        var response = context.response;

        var parameters = request.parameters;

        var role = parameters.role;

        var result = {
            hasGenerationAccess: true,
            hasSendingAccess: true,
            hasCertificationAccess: true,
            hasGetNetworkStatusAccess: true,
        };

        if (role) {
            var roleSearch = search.create({
                type: search.Type.ROLE,
                columns: [
                    CUSTOM_STANDARD,
                    GENERATION_CHECK_BOX,
                    SENDING_CHECK_BOX,
                    CERTIFICATION_CHECK_BOX,
                    GET_NETWORK_STATUS_CHECK_BOX,
                ],
                filters: [["internalid", "is", role]],
            });

            var PAGE_SIZE = 1000;

            var pagedData = roleSearch.runPaged({ pageSize: PAGE_SIZE });
            pagedData.pageRanges.forEach(function (pageRange) {
                var currPage = pagedData.fetch({ index: pageRange.index });

                currPage.data.forEach(function (searchResult) {
                    if (searchResult.getValue(CUSTOM_STANDARD) !== "Standard") {
                        result.hasGenerationAccess =
                            searchResult.getValue(GENERATION_CHECK_BOX);
                        result.hasSendingAccess =
                            searchResult.getValue(SENDING_CHECK_BOX);
                        result.hasCertificationAccess = searchResult.getValue(
                            CERTIFICATION_CHECK_BOX
                        );
                        result.hasGetNetworkStatusAccess =
                            searchResult.getValue(GET_NETWORK_STATUS_CHECK_BOX);
                    }
                });
            });
        }

        response.write(JSON.stringify(result));
    }

    return {
        onRequest: onRequest,
    };
});
