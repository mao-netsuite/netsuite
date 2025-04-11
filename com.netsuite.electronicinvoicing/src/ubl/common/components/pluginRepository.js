var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/repositories/PluginRepository", "N/plugin"], function (require, exports, PluginRepository_1, plugin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pluginRepository = void 0;
    plugin_1 = __importDefault(plugin_1);
    exports.pluginRepository = new PluginRepository_1.PluginRepository(plugin_1.default);
});
