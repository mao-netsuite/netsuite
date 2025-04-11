/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 * @NScriptType plugintypeimpl
 */
define(["N/query", "N/format"], function (query, format) {
    /**
     * getFilteredTransactions - This function is the entry point of our plugin script
     *
     * @returns {Array} transactions
     * @returns {Object} transaction
     * @returns {String} transaction.recordType
     * @returns {String} transaction.id
     */
    function getFilteredTransactions() {
        var transactions = [];
        var yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        var transQuery = query.create({
            type: query.Type.TRANSACTION,
        });

        transQuery.condition = transQuery.and(
            transQuery.createCondition({
                fieldId: "custbody_ei_network_id",
                operator: query.Operator.EMPTY_NOT,
            }),
            transQuery.createCondition({
                fieldId: "custbody_ei_network_updated_date_time",
                operator: query.Operator.BEFORE_NOT,
                values: format.format({
                    value: yesterdayDate,
                    type: format.Type.DATE,
                }),
            }),
            /**
             * Removing transactions with cancelled status
             */
            transQuery.createCondition({
                fieldId: "custbody_psg_ei_status",
                operator: query.Operator.EQUAL_NOT,
                values: 17,
            })
        );
        transQuery.columns = [
            transQuery.createColumn({
                fieldId: "id",
            }),
            transQuery.createColumn({
                fieldId: "recordType",
            }),
        ];

        var transResults = transQuery.runPaged({
            pageSize: 1000,
        });
        var iterator = transResults.iterator();
        iterator.each(function (result) {
            var page = result.value;
            for (var i = 0; i < page.pageRange.size; i++) {
                transactions.push({
                    id: page.data.results[i].values[0],
                    recordType: page.data.results[i].values[1],
                });
            }
            return true;
        });

        return transactions;
    }

    return {
        getFilteredTransactions: getFilteredTransactions,
    };
});
