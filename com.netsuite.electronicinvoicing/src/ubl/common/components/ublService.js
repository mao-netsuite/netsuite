/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../lib/services/UBLService", "./fileRepository", "./ublTransactionMapper", "./ublTransactionService"], function (require, exports, UBLService_1, fileRepository_1, ublTransactionMapper_1, ublTransactionService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ublService = void 0;
    exports.ublService = new UBLService_1.UBLService(fileRepository_1.fileRepository, ublTransactionService_1.ublTransactionService, ublTransactionMapper_1.ublTransactionMapper);
});
