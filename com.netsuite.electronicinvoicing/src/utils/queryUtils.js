define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getQueryResults = void 0;
    var PAGE_SIZE = 1000;
    /**
     * returns queryResuults not more than the maxResultsNumber for the particular Query.
     * @param transQuery
     * @param maxResultsNumber
     */
    function getQueryResults(transQuery, maxResultsNumber) {
        log.debug("getQueryResults", "maxResultsNumber: ".concat(maxResultsNumber, "; Query: ").concat(transQuery, ";"));
        var transactions = [];
        var iterator = transQuery
            .runPaged({
            pageSize: PAGE_SIZE,
        })
            .iterator();
        iterator.each(function (result) {
            var pageResults = result.value.data.results;
            if (maxResultsNumber === null || maxResultsNumber === undefined) {
                transactions = transactions.concat(pageResults);
            }
            else if (maxResultsNumber >= pageResults.length) {
                transactions = transactions.concat(pageResults);
                maxResultsNumber = maxResultsNumber - pageResults.length;
            }
            else {
                transactions = transactions.concat(pageResults.slice(0, maxResultsNumber));
                return false;
            }
            return true;
        });
        log.debug("transactions: queryUtils", transactions);
        return transactions;
    }
    exports.getQueryResults = getQueryResults;
});
