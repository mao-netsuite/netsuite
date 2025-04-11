/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../../../utils/boolean", "../constants", "../model/schemas/TransactionRecordSchema"], function (require, exports, boolean_1, constants_1, TransactionRecordSchema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AvalaraService = void 0;
    var AvalaraService = /** @class */ (function () {
        function AvalaraService(avalaraMandateValidator) {
            this.avalaraMandateValidator = avalaraMandateValidator;
        }
        AvalaraService.prototype.isAvalaraCustomJson = function (customJson, eDocumentTemplate) {
            log.debug("AvalaraService.isAvalaraCustomJson", {
                customJson: customJson,
                isAvalaraTemplate: eDocumentTemplate === null || eDocumentTemplate === void 0 ? void 0 : eDocumentTemplate.isAvalaraTemplate,
            });
            var result = (0, boolean_1.booleanOrDefault)(eDocumentTemplate === null || eDocumentTemplate === void 0 ? void 0 : eDocumentTemplate.isAvalaraTemplate);
            if (result &&
                ((customJson === null || customJson === void 0 ? void 0 : customJson.customDataSources.length) !== 1 ||
                    customJson.customDataSources[0].format !== "OBJECT" ||
                    customJson.customDataSources[0].alias !==
                        constants_1.AVALARA_CUSTOM_DATA_SOURCE_ALIAS)) {
                log.error("Invalid customJSON for the Avalara template", {
                    customJson: customJson,
                });
                throw new Error("Invalid customJSON for the Avalara template");
            }
            log.debug("AvalaraService.isAvalaraCustomJson", { result: result });
            return result;
        };
        AvalaraService.prototype.processAvalaraCustomJson = function (options) {
            log.debug("AvalaraService.processAvalaraCustomJson", { options: options });
            var _a = options.customJson.customDataSources[0].data, mandate = _a.mandate, dataVersion = _a.dataVersion;
            this.avalaraMandateValidator.validate({ countryMandate: mandate }, options.isOW, options.subsidiaryId);
            this.setMandateOnTransactionFieldsToUpdate(options.transactionFieldsToUpdate, mandate, dataVersion);
            log.debug("AvalaraService.processAvalaraCustomJson", {
                transactionFieldsToUpdate: options.transactionFieldsToUpdate,
            });
        };
        AvalaraService.prototype.setMandateOnTransactionFieldsToUpdate = function (transactionFieldsToUpdate, mandate, dataVersion) {
            transactionFieldsToUpdate[TransactionRecordSchema_1.TRANSACTION_RECORD_SCHEMA.fields.avalaraMandate] = mandate;
            transactionFieldsToUpdate[TransactionRecordSchema_1.TRANSACTION_RECORD_SCHEMA.fields.avalaraDataVersion] = dataVersion;
        };
        return AvalaraService;
    }());
    exports.AvalaraService = AvalaraService;
});
