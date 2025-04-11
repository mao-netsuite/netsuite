/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../../../utils/string", "../../../utils/error"], function (require, exports, string_1, error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AvalaraMandateRepository = void 0;
    var AvalaraMandateRepository = /** @class */ (function () {
        function AvalaraMandateRepository(db) {
            this.db = db;
        }
        AvalaraMandateRepository.prototype.getActivationStatus = function (countryMandate, isOW, subsidiaryId) {
            var _a;
            log.debug("AvalaraMandateRepository.getActivationStatus", {
                countryMandate: countryMandate,
                isOW: isOW,
                subsidiaryId: subsidiaryId,
            });
            var result = null;
            try {
                result =
                    (_a = this.db
                        .query("SELECT t.id as id\n                        ,t.custrecord_nseb_mandate_id as avalaramandate\n                        ,t.custrecord_nseb_mandate_av_status as activationstatus\n                    FROM customrecord_nseb_av_mandate_status t\n                    WHERE t.custrecord_nseb_mandate_id = ? ".concat(isOW ? "AND t.custrecord_nseb_mandate_sub = ?" : "", "\n                    "), isOW ? [countryMandate, subsidiaryId] : [countryMandate])
                        .map(function (x) { return ({
                        id: (0, string_1.parseString)(x.id),
                        avalaraMandate: {
                            countryMandate: (0, string_1.parseString)(x.avalaramandate),
                        },
                        activationStatus: (0, string_1.parseString)(x.activationstatus),
                    }); })[0]) !== null && _a !== void 0 ? _a : null;
            }
            catch (error) {
                if ((0, error_1.isInvalidSearchTypeError)(error)) {
                    // Custom record customrecord_nseb_av_mandate_status may not be available
                    // and in this scenario the query will return an INVALID_SEARCH_TYPE error
                    log.error("AvalaraMandateRepository.getActivationStatus", {
                        error: error,
                    });
                }
                else {
                    throw error;
                }
            }
            log.debug("AvalaraMandateRepository.getActivationStatus", {
                result: result,
            });
            return result;
        };
        return AvalaraMandateRepository;
    }());
    exports.AvalaraMandateRepository = AvalaraMandateRepository;
});
