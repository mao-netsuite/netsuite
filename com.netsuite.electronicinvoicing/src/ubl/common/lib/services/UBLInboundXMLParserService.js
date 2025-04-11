define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UBLInboundXMLParserService = void 0;
    var ISSUEDATEXPATH = "//cbc:IssueDate";
    var DUEDATEXPATH = "//cbc:DueDate";
    var CURRENCYPATH = '//cbc:DocumentCurrencyCode';
    var UBLInboundXMLParserService = /** @class */ (function () {
        function UBLInboundXMLParserService(xml) {
            this.xml = xml;
        }
        UBLInboundXMLParserService.prototype.parseDocument = function (xmlContent) {
            var xmlDocument = this.xml.Parser.fromString({
                text: xmlContent,
            });
            var issuedDateNode = this.xml.XPath.select({
                node: xmlDocument,
                xpath: ISSUEDATEXPATH,
            })[0];
            var dueDateNode = this.xml.XPath.select({
                node: xmlDocument,
                xpath: DUEDATEXPATH,
            })[0];
            var currencyNode = this.xml.XPath.select({
                node: xmlDocument,
                xpath: CURRENCYPATH,
            })[0];
            return {
                currency: currencyNode,
                issuedDate: issuedDateNode,
                dueDate: dueDateNode
            };
        };
        return UBLInboundXMLParserService;
    }());
    exports.UBLInboundXMLParserService = UBLInboundXMLParserService;
});
