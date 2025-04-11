define(["require", "exports", "../../components/db"], function (require, exports, db_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomListRepository = void 0;
    var CustomListRepository = /** @class */ (function () {
        /**
         *
         * @param customListName - name of the customlist (customlist_etc)
         * @param customListFieldValueMap - should contain, for each expected property as key, the scriptid associated to the value.
         */
        function CustomListRepository(customListName, customListFieldValueMap) {
            this.customListName = customListName;
            this.customListFieldValueMap = customListFieldValueMap;
            this.customList = undefined;
        }
        CustomListRepository.prototype.list = function () {
            if (this.customList)
                return this.customList;
            this.customList = this.getCustomListValues();
            return this.customList;
        };
        /**
         * Build the list object by going through the list of properties defined in the customListFieldValueMap.
         * Returns an object containing, for each key, the id in the db.
         * @private
         */
        CustomListRepository.prototype.getCustomListValues = function () {
            var _this = this;
            var query = "SELECT scriptid, id FROM ".concat(this.customListName);
            var queryResults = db_1.db.query(query);
            var result = {};
            Object.keys(this.customListFieldValueMap).forEach(function (key) {
                var scriptIdValue = _this.customListFieldValueMap[key].toUpperCase();
                var row = queryResults.find(function (_a) {
                    var scriptid = _a.scriptid;
                    return scriptid === scriptIdValue;
                });
                if (row) {
                    result[key] = row.id.toString();
                }
            });
            return result;
        };
        return CustomListRepository;
    }());
    exports.CustomListRepository = CustomListRepository;
});
