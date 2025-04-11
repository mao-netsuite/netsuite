define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginRepository = void 0;
    var PluginRepository = /** @class */ (function () {
        function PluginRepository(nsPlugin) {
            this.nsPlugin = nsPlugin;
        }
        PluginRepository.prototype.loadPluginImplementation = function (type, implementation) {
            return this.nsPlugin.loadImplementation({
                type: type,
                implementation: implementation
            });
        };
        return PluginRepository;
    }());
    exports.PluginRepository = PluginRepository;
});
