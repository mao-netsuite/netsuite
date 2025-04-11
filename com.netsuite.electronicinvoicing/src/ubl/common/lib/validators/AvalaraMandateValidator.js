/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../constants", "../userMessages"], function (require, exports, constants_1, userMessages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AvalaraMandateValidator = void 0;
    var AvalaraMandateValidator = /** @class */ (function () {
        function AvalaraMandateValidator(avalaraMandateRepository, errorService) {
            this.avalaraMandateRepository = avalaraMandateRepository;
            this.errorService = errorService;
        }
        AvalaraMandateValidator.prototype.validate = function (avalaraMandate, isOW, subsidiaryId) {
            var _a;
            log.debug("AvalaraMandateValidator.validate", {
                avalaraMandate: avalaraMandate,
                subsidiaryId: subsidiaryId,
            });
            var activationStatus = (_a = this.avalaraMandateRepository.getActivationStatus(avalaraMandate.countryMandate, isOW, subsidiaryId)) === null || _a === void 0 ? void 0 : _a.activationStatus;
            if (activationStatus !== "Completed") {
                log.error("AvalaraMandateValidator.validate", {
                    isValid: false,
                });
                throw this.errorService.create({
                    name: constants_1.AVALARA_MANDATE_ACTIVATION_ERROR_NAME,
                    message: (0, userMessages_1.avalara_mandate_activation_error_message)(avalaraMandate.countryMandate),
                });
            }
            log.debug("AvalaraMandateValidator.validate", {
                isValid: true,
            });
        };
        return AvalaraMandateValidator;
    }());
    exports.AvalaraMandateValidator = AvalaraMandateValidator;
});
