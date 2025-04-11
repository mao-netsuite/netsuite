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
define(["require", "exports", "../../../utils/string"], function (require, exports, string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubsidiaryPreferencesRepository = void 0;
    var SubsidiaryPreferencesRepository = /** @class */ (function () {
        function SubsidiaryPreferencesRepository(db) {
            this.db = db;
            this.RECORD_TYPE = "customrecord_psg_ei_sub_prefs_data";
            this.subsidiaryPrefByAccountingBook = "\n        SELECT \n            subPrefs.id \n        FROM\n            customrecord_psg_ei_sub_prefs_data subPrefs\n        WHERE\n            subPrefs.custrecord_ei_acc_book_currency = ?";
            this.subsidiaryPrefBySubsidiaryId = "\n        SELECT\n            custrecord_ei_acc_book_currency as accountingBookId\n        FROM\n            CUSTOMRECORD_PSG_EI_SUB_PREFS_DATA\n        WHERE\n            custrecord_psg_ei_sub_subsidiary = ?\n    ";
        }
        SubsidiaryPreferencesRepository.prototype.getSubsidiaryPreferencesByAccountingBook = function (accountingBookId) {
            var queryResult = this.db.query(this.subsidiaryPrefByAccountingBook, [accountingBookId]);
            return queryResult.map(function (x) { return ({
                id: (0, string_1.parseString)(x.id)
            }); });
        };
        SubsidiaryPreferencesRepository.prototype.getSubsidiaryPreferenceBySubsidiaryId = function (subsidiaryId) {
            var result = this.db.query(this.subsidiaryPrefBySubsidiaryId, [subsidiaryId]);
            if (result.length === 0)
                return undefined;
            return {
                accountingBookId: (0, string_1.parseString)(result[0].accountingbookid)
            };
        };
        SubsidiaryPreferencesRepository.prototype.updateEntry = function (id, values) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.submitRecordFields({
                                id: id,
                                type: this.RECORD_TYPE,
                                values: values
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SubsidiaryPreferencesRepository;
    }());
    exports.SubsidiaryPreferencesRepository = SubsidiaryPreferencesRepository;
});
