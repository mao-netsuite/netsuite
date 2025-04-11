var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/Url", "N/url"], function (require, exports, Url_1, url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.url = void 0;
    url_1 = __importDefault(url_1);
    exports.url = new Url_1.Url(url_1.default);
});
