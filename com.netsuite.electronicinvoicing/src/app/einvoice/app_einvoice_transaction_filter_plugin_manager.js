/**
 *@NApiVersion 2.x
 */
define(["N/error", "N/query", "N/format", "N/plugin"], function (
    error,
    query,
    format,
    pluginMod
) {
    var PROBLEM_LOADING_PLUG_IN =
        "PROBLEM_LOADING_TRANSACTION_FILTERING_PLUGIN";
    var ERROR_RUNNING_PLUGIN = "ERROR_RUNNING_TRANSACTION_FILTERING_PLUGIN";
    var FILTER_PLUGIN_DEFAULT = "customscript_ei_pl_filter_plugin";

    /**
     * getFilteredTransactions - This function is the entry point of our plugin script
     *
     * @returns {Array} transactions
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

    /**
     * runPlugin - This function runs a plugin implementation given its implementation id
     * @returns {Array} list of transactions
     */
    function runPlugin(pluginImplId) {
        try {
            var transactions = [];
            if (!pluginImplId) {
                transactions = getFilteredTransactions();
            } else {
                var plugin = loadPlugin(pluginImplId);
                transactions = plugin.getFilteredTransactions();
            }
            return transactions;
        } catch (e) {
            log.error(e.name, e.message);
            throw error.create({
                name: ERROR_RUNNING_PLUGIN,
                message: [e.name, e.message].join("\n"),
                notifyOff: true,
            });
        }
    }

    /**
     * loadPlugin - This function loads a plugin implementation given its implementation id
     * @returns {Object} Plugin implementation
     */
    function loadPlugin(implId) {
        var plugin;
        try {
            plugin = pluginMod.loadImplementation({
                type: FILTER_PLUGIN_DEFAULT,
                implementation: implId,
            });
        } catch (e) {
            log.error(e.name, e.message);
            var errorParams = {
                name: PROBLEM_LOADING_PLUG_IN,
                message: [
                    "Transaction Filtering Plugin load encountered a problem\n",
                    e.message,
                ].join(""),
                notifyOff: true,
            };
            throw error.create(errorParams);
        }
        return plugin;
    }

    return {
        runPlugin: runPlugin,
    };
});
