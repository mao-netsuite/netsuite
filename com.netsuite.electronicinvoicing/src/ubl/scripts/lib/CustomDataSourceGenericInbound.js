var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../../../lib/translator"], function (require, exports, translator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomDataSourceGenericInbound = void 0;
    translator = __importStar(translator);
    var CURRENCY_VENDOR_ERROR_MESSAGE = "ei.inbound.generic.plugin.missing.currency.for.vendor";
    var CustomDataSourceGenericInbound = /** @class */ (function () {
        function CustomDataSourceGenericInbound(ublFormatterService, ublInboundXMLParserService, runtime, currencyRepository, render) {
            this.ublFormatterService = ublFormatterService;
            this.ublInboundXMLParserService = ublInboundXMLParserService;
            this.runtime = runtime;
            this.currencyRepository = currencyRepository;
            this.render = render;
        }
        CustomDataSourceGenericInbound.prototype.inject = function (params) {
            try {
                var customObj = this.createCustomObject(params);
                return this.buildReturnObject(customObj);
            }
            catch (err) {
                return this.buildResultErrorObject(err.message);
            }
        };
        CustomDataSourceGenericInbound.prototype.createCustomObject = function (params) {
            var customObj = {};
            var xmlContent = params.inboundEDocRec.getValue({
                fieldId: "custrecord_psg_ei_inbound_content",
            });
            var nodes = this.ublInboundXMLParserService.parseDocument(xmlContent);
            customObj['trandate'] = this.ublFormatterService.formatDate(nodes.issuedDate.textContent);
            if (nodes.dueDate !== undefined)
                customObj['duedate'] = this.ublFormatterService.formatDate(nodes.dueDate.textContent);
            if (this.runtime.isMulticurrencyFeatureEnabled()) {
                var vendorId = params.entityRec.getValue("id");
                //get currency ISO
                var currency = this.currencyRepository.getCurrencyForVendorBySymbol(vendorId, nodes.currency.textContent);
                if (currency !== undefined)
                    customObj['currency'] = currency.name;
                else
                    throw new Error(translator.getString(CURRENCY_VENDOR_ERROR_MESSAGE));
            }
            return customObj;
        };
        CustomDataSourceGenericInbound.prototype.buildReturnObject = function (customObj) {
            return {
                customDataSources: [
                    {
                        format: this.render.DataSource.OBJECT,
                        alias: "CUSTOM",
                        data: customObj,
                    },
                ],
            };
        };
        CustomDataSourceGenericInbound.prototype.buildResultErrorObject = function (errorMessage) {
            return {
                result: {
                    success: false,
                    eiAuditTrailMsg: errorMessage
                }
            };
        };
        return CustomDataSourceGenericInbound;
    }());
    exports.CustomDataSourceGenericInbound = CustomDataSourceGenericInbound;
});
