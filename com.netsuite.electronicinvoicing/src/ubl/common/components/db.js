/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/query", "../lib/repositories/DB", "N/record"], function (require, exports, query_1, DB_1, record_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.db = void 0;
    query_1 = __importDefault(query_1);
    DB_1 = __importDefault(DB_1);
    record_1 = __importDefault(record_1);
    exports.db = new DB_1.default(query_1.default, record_1.default);
});
