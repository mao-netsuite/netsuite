var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/Https", "N/https"], function (require, exports, Https_1, https_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.https = void 0;
    https_1 = __importDefault(https_1);
    exports.https = new Https_1.Https(https_1.default);
});
