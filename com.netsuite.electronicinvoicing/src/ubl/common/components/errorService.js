/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/services/ErrorService", "N/error"], function (require, exports, ErrorService_1, error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorService = void 0;
    error_1 = __importDefault(error_1);
    exports.errorService = new ErrorService_1.ErrorService(error_1.default);
});
