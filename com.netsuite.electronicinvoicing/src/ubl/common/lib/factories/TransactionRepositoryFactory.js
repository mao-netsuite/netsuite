define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionRepositoryFactory = void 0;
    var TransactionRepositoryFactory = /** @class */ (function () {
        function TransactionRepositoryFactory(runtime, suiteTaxRepository, legacyRepository) {
            this.runtime = runtime;
            this.suiteTaxRepository = suiteTaxRepository;
            this.legacyRepository = legacyRepository;
        }
        TransactionRepositoryFactory.prototype.getTransactionRepository = function () {
            return this.runtime.isSuiteTaxEnabled() ? this.suiteTaxRepository : this.legacyRepository;
        };
        return TransactionRepositoryFactory;
    }());
    exports.TransactionRepositoryFactory = TransactionRepositoryFactory;
});
