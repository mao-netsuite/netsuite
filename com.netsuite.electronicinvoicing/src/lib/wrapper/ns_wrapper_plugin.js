/**

 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.

 *

 * @NModuleScope TargetAccount

 */

define(["N/plugin", "N/query"], function (plugin, query) {
    /**

     * Returns the script IDs and Names of custom plug-in type implementations.

     Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.

     *

     */

    function findImplementations(id) {
        var pluginType = query.create({
            type: query.Type.PLUG_IN_TYPE,
            columns: [
                {
                    fieldId: "customplugintype",
                },
            ],
            condition: {
                fieldId: "scriptid",
                operator: query.Operator.IS,
                values: [id],
            },
        });

        var pluginRes = pluginType.run();

        var customPluginType = pluginRes.results[0].values[0];

        var pluginTypeImpl = query.create({
            type: query.Type.PLUG_IN_TYPE_IMPL,
            columns: [
                {
                    fieldId: "scriptid",
                },
                {
                    fieldId: "name",
                },
            ],
        });

        var pluginTypeImplQueryCondition = pluginTypeImpl.createCondition({
            fieldId: "customplugintype",
            operator: query.Operator.IS,
            values: [customPluginType],
        });
        var pluginTypeImplInactiveQueryCondition =
            pluginTypeImpl.createCondition({
                fieldId: "isinactive",
                operator: query.Operator.IS,
                values: false,
            });

        pluginTypeImpl.condition = pluginTypeImpl.and(
            pluginTypeImplQueryCondition,
            pluginTypeImplInactiveQueryCondition
        );

        var pluginTypeRes = pluginTypeImpl.run();

        var iter = pluginTypeRes.iterator();

        var res = [];
        iter.each(function (result) {
            var item = result.value;

            res.push({
                id: item.values[0],
                name: item.values[1],
            });

            return true;
        });
        log.debug("Plugin Implementations found:", res);
        return res;
    }

    function loadImplementation(options) {
        return plugin.loadImplementation(options);
    }

    return {
        findImplementations: findImplementations,

        loadImplementation: loadImplementation,
    };
});
