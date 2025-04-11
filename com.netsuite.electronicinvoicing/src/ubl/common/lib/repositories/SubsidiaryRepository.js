define(["require", "exports", "../../../utils/string"], function (require, exports, string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubsidiaryRepository = void 0;
    var SubsidiaryRepository = /** @class */ (function () {
        function SubsidiaryRepository(db) {
            this.db = db;
        }
        SubsidiaryRepository.prototype.getById = function (subsidiaryId) {
            log.debug("EntityRepository.getById", { subsidiaryId: subsidiaryId });
            var results = this.db.query("SELECT s.id AS id\n                ,c.symbol as currencysymbol\n                ,c.name as currencyname\n            FROM subsidiary s, currency c \n            WHERE s.currency = c.id \n                AND s.id = ? \n            GROUP BY s.id, c.symbol", [subsidiaryId]);
            if (results.length === 0) {
                throw new Error("Subsidiary not defined");
            }
            var subsidiary = {
                id: subsidiaryId,
                currency: {
                    symbol: (0, string_1.parseString)(results[0].currencysymbol),
                    name: (0, string_1.parseString)((0, string_1.parseString)(results[0].currencyname))
                },
            };
            log.debug("EntityRepository.getById", { subsidiary: subsidiary });
            return subsidiary;
        };
        return SubsidiaryRepository;
    }());
    exports.SubsidiaryRepository = SubsidiaryRepository;
});
