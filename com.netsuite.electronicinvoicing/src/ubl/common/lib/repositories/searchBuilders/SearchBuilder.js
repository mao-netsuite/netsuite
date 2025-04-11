/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchBuilder = void 0;
    var SearchBuilder = /** @class */ (function () {
        function SearchBuilder(searchType, search) {
            this.searchType = searchType;
            this.search = search;
        }
        SearchBuilder.prototype.build = function (params) {
            if (params === void 0) { params = []; }
            var columnsByName = this.buildColumns();
            var search = this.search.create({
                type: this.searchType,
                columns: this.toValues(columnsByName),
                filters: this.buildFilters(params),
                settings: this.buildSettings(),
            });
            return {
                search: search,
                columnsByName: columnsByName,
            };
        };
        SearchBuilder.prototype.toValues = function (columns) {
            var result = [];
            for (var name_1 in columns) {
                result.push(columns[name_1]);
            }
            return result;
        };
        return SearchBuilder;
    }());
    exports.SearchBuilder = SearchBuilder;
});
