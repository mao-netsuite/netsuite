define(["require", "exports", "../ubl/common/components/db"], function (require, exports, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchMandateInformation = exports.parseGetInputDataValueToMandate = void 0;
    /**
     * Creates an object of type Mandate by getting information from a getInputData row result.
     * @param queryRow
     */
    function parseGetInputDataValueToMandate(queryRow) {
        var queryValues = JSON.parse(queryRow).values;
        return {
            name: queryValues[1],
            plugin_implementation: queryValues[2],
            id: queryValues[3],
        };
    }
    exports.parseGetInputDataValueToMandate = parseGetInputDataValueToMandate;
    function fetchMandateInformation(mandateId) {
        try {
            var mandateQuery = "SELECT id, nsebMandateRecord.custrecord_nseb_country_mandate_id as mandateName, nsebMandateRecord.custrecord_nseb_mandate_proc_status_pi as plugin_implementation from customrecord_nseb_av_mandate nsebMandateRecord where nsebMandateRecord.custrecord_nseb_country_mandate_id = ?";
            var mandateResults = db_1.db.query(mandateQuery, [mandateId]);
            log.debug("Mandate Query Results", mandateResults);
            return mandateResults[0];
        }
        catch (error) {
            log.error("Error while fetching Mnadate information", error);
        }
    }
    exports.fetchMandateInformation = fetchMandateInformation;
});
