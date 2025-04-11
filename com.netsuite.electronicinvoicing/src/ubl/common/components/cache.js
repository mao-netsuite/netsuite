var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/Cache", "N/cache"], function (require, exports, Cache_1, cache_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cache = void 0;
    cache_1 = __importDefault(cache_1);
    exports.cache = new Cache_1.Cache(cache_1.default);
});
