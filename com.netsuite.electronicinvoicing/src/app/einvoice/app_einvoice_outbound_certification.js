/**

 *    Copyright 2016 NetSuite Inc. User may not copy, modify, distribute, or re-bundle or otherwise make available this code.

 */

/**

 * @NApiVersion 2.x

 * @NModuleScope Public

 */

define([
    "N/search",
], function (search) {
    var SENDING_METHOD_SUBSIDIARY = "custrecord_psg_ei_sm_subsidiary";

    var SENDING_METHOD_TRANSACTION = "custrecord_psg_ei_trans_type";

    var SENDING_METHOD_CERT_CHKBOX = "custrecord_ei_sending_method_for_certifi";

    var SENDING_METHOD_TYPE = "customrecord_ei_sending_method";

    var SENDING_METHOD_INACTIVE = "isinactive";

    var CERTIFICATION_SENDING_METHOD_SAVED_SEARCH_ID =
        "customsearch_ei_sending_methods_certific";

    var SUBSIDIARY = "subsidiary";

    var TRANTYPE = "ntype";

    function getCertSendingMethodId(rec) {
        var certSendingMethodId;

        var filters = [];

        var subsidiaries = rec.getValue(SUBSIDIARY);

        var transaction = rec.getValue(TRANTYPE);

        if (subsidiaries.length !== 0) {
            filters.push([SENDING_METHOD_SUBSIDIARY, "anyof", subsidiaries]);

            filters.push("AND");
        }

        filters.push([SENDING_METHOD_TRANSACTION, "is", transaction]);

        filters.push("AND");

        filters.push([SENDING_METHOD_CERT_CHKBOX, "is", true]);

        filters.push("AND");

        filters.push([SENDING_METHOD_INACTIVE, "is", false]);

        var columns = ["internalid"];

        var sendingMethodSrch = search.create({
            type: SENDING_METHOD_TYPE,

            columns: columns,

            filters: filters,
        });

        sendingMethodSrch.run().each(function (result) {
            certSendingMethodId = result.id;

            log.debug(certSendingMethodId);
            return true;
        });

        return certSendingMethodId;
    }

    function isSendCertificationEnabled() {
        var searchResultCount = 0;
        var forCertificationSearchCheck = search.load({
            id: CERTIFICATION_SENDING_METHOD_SAVED_SEARCH_ID,
        });

        try {
            searchResultCount = forCertificationSearchCheck.runPaged({
                pageSize: 10,
            }).count;
        } catch (e) {
            if (e.name === "INSUFFICIENT_PERMISSION") {
                searchResultCount = 0;
            } else {
                throw e;
            }
        }

        return searchResultCount > 0;
    }

    return {
        getCertSendingMethodId: getCertSendingMethodId,
        isSendCertificationEnabled: isSendCertificationEnabled,
    };
});
