define(["require", "exports", "./pluginRepository", "../lib/constants"], function (require, exports, pluginRepository_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadPluginImplementation = void 0;
    /**
     * Loads specified plugin implementation for Process Request Status plugin type.
     * @param mandate
     */
    function loadPluginImplementation(mandate) {
        return pluginRepository_1.pluginRepository.loadPluginImplementation(constants_1.PROCESS_REQUEST_STATUS_PLUGIN_TYPE, mandate.plugin_implementation);
    }
    exports.loadPluginImplementation = loadPluginImplementation;
});
