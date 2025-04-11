var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/repositories/searchBuilders/UBLTransactionLineLegacySearchBuilder", "N/search", "./runtime"], function (require, exports, UBLTransactionLineLegacySearchBuilder_1, search_1, runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ublTransactionLineLegacySearchBuilder = void 0;
    search_1 = __importDefault(search_1);
    exports.ublTransactionLineLegacySearchBuilder = new UBLTransactionLineLegacySearchBuilder_1.UBLTransactionLineLegacySearchBuilder(search_1.default, runtime_1.runtime);
});
