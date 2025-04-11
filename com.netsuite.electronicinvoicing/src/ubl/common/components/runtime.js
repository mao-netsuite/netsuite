/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/Runtime", "N/runtime"], function (require, exports, Runtime_1, runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.runtime = void 0;
    runtime_1 = __importDefault(runtime_1);
    exports.runtime = new Runtime_1.Runtime(runtime_1.default);
});
