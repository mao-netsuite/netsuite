var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/SuiteAppInfo", "N/suiteAppInfo"], function (require, exports, SuiteAppInfo_1, suiteAppInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.suiteAppInfo = void 0;
    suiteAppInfo_1 = __importDefault(suiteAppInfo_1);
    exports.suiteAppInfo = new SuiteAppInfo_1.SuiteAppInfo(suiteAppInfo_1.default);
});
