/**
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../../../utils/Stopwatch"], function (require, exports, Stopwatch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Stopwatch_1 = __importDefault(Stopwatch_1);
    var DB = /** @class */ (function () {
        function DB(queryModule, recordModule) {
            this.queryModule = queryModule;
            this.recordModule = recordModule;
            this.MAX_SEARCH_RESULTS_NUMBER = 1000;
        }
        /**
         * Run the suiteQL query and return at most the first 5k rows
         * @param query
         * @param params
         */
        DB.prototype.query = function (query, params) {
            if (params === void 0) { params = []; }
            log.debug("SuiteQL query", "Parameters: ".concat(JSON.stringify(params), "; Query: ").concat(query));
            var stopwatch = Stopwatch_1.default.startNew();
            var result = this.queryModule
                .runSuiteQL({ query: query, params: params })
                .asMappedResults();
            log.debug("SuiteQL result", {
                executionTime: stopwatch.elapsedMillisecondsString,
                result: result,
            });
            return result;
        };
        /**
         * Run the Saved Search query and return at most the first 1k rows
         * @param searchBuilder
         * @param params
         */
        DB.prototype.search = function (searchBuilder, params) {
            var _this = this;
            if (params === void 0) { params = []; }
            var dbSearch = searchBuilder.build(params);
            log.debug("Saved Search query", {
                params: params,
                filters: dbSearch.search.filters,
                columns: dbSearch.columnsByName,
            });
            var stopwatch = Stopwatch_1.default.startNew();
            var result = dbSearch.search
                .run()
                .getRange({ start: 0, end: this.MAX_SEARCH_RESULTS_NUMBER - 1 })
                .map(function (searchResult) {
                return _this.toDBResult(dbSearch.columnsByName, searchResult);
            });
            log.debug("Saved Search result", {
                executionTime: stopwatch.elapsedMillisecondsString,
                result: result,
            });
            return result;
        };
        DB.prototype.toDBResult = function (columnsByName, searchResult) {
            var result = {};
            for (var columnName in columnsByName) {
                result[columnName] = searchResult.getValue(columnsByName[columnName]);
            }
            return result;
        };
        DB.prototype.submitRecordFields = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.recordModule.submitFields.promise(params)];
                });
            });
        };
        DB.prototype.loadRecord = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.recordModule.load.promise(params)];
                });
            });
        };
        DB.prototype.createRecord = function (params) {
            return this.recordModule.create(params);
        };
        DB.prototype.loadRecordSync = function (params) {
            return this.recordModule.load(params);
        };
        return DB;
    }());
    exports.default = DB;
});
