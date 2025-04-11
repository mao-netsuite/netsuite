/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLService = void 0;
    var UBLService = /** @class */ (function () {
        function UBLService(fileRepository, ublTransactionService, ublTransactionMapper) {
            this.fileRepository = fileRepository;
            this.ublTransactionService = ublTransactionService;
            this.ublTransactionMapper = ublTransactionMapper;
        }
        UBLService.prototype.getGenericInboundTemplateAbsolutePath = function () {
            return this.fileRepository.getAbsolutePath(constants_1.GENERIC_INBOUND_TEMPLATE_PATH_FROM_APP_GUID);
        };
        UBLService.prototype.getUBLTemplateAbsolutePath = function () {
            return this.fileRepository.getAbsolutePath(constants_1.UBL_2_1_TEMPLATE_PATH_FROM_APP_GUID);
        };
        UBLService.prototype.buildUBLDefaultTransaction = function (transactionId, transType) {
            log.debug("UBLService.buildUBLDefaultTransaction", { transactionId: transactionId });
            var transaction = this.ublTransactionService.getUBLTransaction(transactionId, transType);
            var result = this.ublTransactionMapper.to(transaction);
            log.debug("UBLService.buildUBLDefaultTransaction", { result: result });
            return result;
        };
        return UBLService;
    }());
    exports.UBLService = UBLService;
});
