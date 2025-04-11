var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "../../../utils/string"], function (require, exports, string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubsidiaryPreferencesService = void 0;
    var dropdownFieldId = "custpage_ei_accounting_book_field_select";
    var textFieldId = "custpage_ei_accounting_book_field_text";
    var SubsidiaryPreferencesService = /** @class */ (function () {
        function SubsidiaryPreferencesService(runtime, accountingBookSubsidiariesRepository, serverWidget, translate, subsidiaryPreferencesRepository) {
            this.runtime = runtime;
            this.accountingBookSubsidiariesRepository = accountingBookSubsidiariesRepository;
            this.serverWidget = serverWidget;
            this.translate = translate;
            this.subsidiaryPreferencesRepository = subsidiaryPreferencesRepository;
            this.FIELD_MAP = {
                ACCOUNTING_BOOK: "custrecord_ei_acc_book_currency"
            };
        }
        SubsidiaryPreferencesService.prototype.addAccountingBookFields = function (context) {
            var isAccountingBookMultiCurrencyEnabled = this.runtime.isMultiBookAccountingEnabled();
            var isAccountingBookForeignCurrencyEnabled = this.runtime.isForeignCurrencyManagementEnabled();
            if (isAccountingBookMultiCurrencyEnabled && isAccountingBookForeignCurrencyEnabled) {
                var subsidiaryId = (0, string_1.parseString)(context.newRecord.getValue("custrecord_psg_ei_sub_subsidiary"));
                this.addAccountingBookField(context, subsidiaryId);
            }
        };
        SubsidiaryPreferencesService.prototype.setSelectedAccountingBookOption = function (context) {
            var accountingBookFieldValue = context.newRecord.getValue(dropdownFieldId);
            context.newRecord.setValue("custrecord_ei_acc_book_currency", accountingBookFieldValue);
        };
        SubsidiaryPreferencesService.prototype.addAccountingBookField = function (context, subsidiaryId) {
            if (context.type === context.UserEventType.VIEW) {
                this.addAccountingBookFieldInViewMode(context);
            }
            if (context.type === context.UserEventType.EDIT) {
                this.addAccountingBookFieldInEditMode(context, subsidiaryId);
            }
        };
        SubsidiaryPreferencesService.prototype.createAccountingBookField = function (context, fieldT) {
            var accountingBookField = context.form.addField({
                id: (context.type === context.UserEventType.EDIT) ? dropdownFieldId : textFieldId,
                type: fieldT,
                label: this.translate.get({
                    collection: "custcollection_ei_translations",
                    key: "label_custrecord_ei_acc_book_currency",
                })(),
            });
            accountingBookField.setHelpText({
                help: (0, string_1.parseString)(this.translate.get({
                    collection: "custcollection_ei_translations",
                    key: "help_custrecord_ei_acc_book_currency",
                })()),
            });
            return accountingBookField;
        };
        SubsidiaryPreferencesService.prototype.addAccountingBookFieldInViewMode = function (context) {
            var _a;
            this.createAccountingBookField(context, this.serverWidget.FieldType.TEXT);
            var accountingBookFieldValue = context.newRecord.getValue("custrecord_ei_acc_book_currency");
            var accountingBookName = this.accountingBookSubsidiariesRepository
                .getAccountingBookById((0, string_1.parseString)(accountingBookFieldValue));
            context.newRecord.setValue(textFieldId, (0, string_1.parseString)((_a = accountingBookName[0]) === null || _a === void 0 ? void 0 : _a.name));
        };
        SubsidiaryPreferencesService.prototype.addAccountingBookFieldInEditMode = function (context, subsidiaryId) {
            var accountingBooksList = __spreadArray([
                {
                    accountingBookId: "",
                    accountingBookName: ""
                }
            ], this.accountingBookSubsidiariesRepository.getAccountingBooksBySubsidiaryId((0, string_1.parseString)(subsidiaryId)), true);
            var accountingBookField = this.createAccountingBookField(context, this.serverWidget.FieldType.SELECT);
            var selectedValue = (0, string_1.parseString)(context.newRecord.getValue(this.FIELD_MAP.ACCOUNTING_BOOK));
            accountingBooksList.forEach(function (option) {
                var accountingBookId = (0, string_1.parseString)(option.accountingBookId);
                var accountingBookName = (0, string_1.parseString)(option.accountingBookName);
                var isSelectedValue = (accountingBookId === selectedValue);
                accountingBookField.addSelectOption({
                    value: accountingBookId,
                    text: accountingBookName,
                    isSelected: isSelectedValue,
                });
            });
        };
        SubsidiaryPreferencesService.prototype.reset = function (deletedAccountingBook) {
            return __awaiter(this, void 0, void 0, function () {
                var subsidiaryPreferences, newValues, _i, subsidiaryPreferences_1, subsidiaryPreference;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            subsidiaryPreferences = this.subsidiaryPreferencesRepository.getSubsidiaryPreferencesByAccountingBook(deletedAccountingBook);
                            newValues = {};
                            newValues[this.FIELD_MAP.ACCOUNTING_BOOK] = null;
                            _i = 0, subsidiaryPreferences_1 = subsidiaryPreferences;
                            _a.label = 1;
                        case 1:
                            if (!(_i < subsidiaryPreferences_1.length)) return [3 /*break*/, 4];
                            subsidiaryPreference = subsidiaryPreferences_1[_i];
                            return [4 /*yield*/, this.subsidiaryPreferencesRepository.updateEntry(subsidiaryPreference.id, newValues)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return SubsidiaryPreferencesService;
    }());
    exports.SubsidiaryPreferencesService = SubsidiaryPreferencesService;
});
