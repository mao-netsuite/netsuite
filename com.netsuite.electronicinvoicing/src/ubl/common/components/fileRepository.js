/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../lib/repositories/FileRepository", "N/file", "./db"], function (require, exports, FileRepository_1, file_1, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fileRepository = void 0;
    file_1 = __importDefault(file_1);
    exports.fileRepository = new FileRepository_1.FileRepository(file_1.default, db_1.db);
});
