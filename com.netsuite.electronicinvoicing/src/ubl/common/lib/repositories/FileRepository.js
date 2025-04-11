/*
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports", "../constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileRepository = void 0;
    var FileRepository = /** @class */ (function () {
        function FileRepository(file, db) {
            this.file = file;
            this.db = db;
        }
        FileRepository.prototype.getAbsolutePath = function (pathFromAppGuid) {
            log.debug("FileRepository.getAbsolutePath", { pathFromAppGuid: pathFromAppGuid });
            var result = this.getAppGuidAbsolutePath() + pathFromAppGuid;
            log.debug("FileRepository.getAbsolutePath", { result: result });
            return result;
        };
        FileRepository.prototype.getAppGuidAbsolutePath = function () {
            var appGuidDbFiles = this.db
                .query("select id from file where name = ?", [constants_1.APP_GUID])
                .map(function (x) { return ({
                id: String(x.id),
            }); });
            if (appGuidDbFiles.length === 0) {
                throw new Error("EI installation error. GUID file not found: " + constants_1.APP_GUID);
            }
            if (appGuidDbFiles.length !== 1) {
                throw new Error("EI installation error. GUID file is not unique: " + constants_1.APP_GUID);
            }
            var filePath = this.file.load({ id: appGuidDbFiles[0].id }).path;
            var result = filePath.substring(0, filePath.indexOf(constants_1.APP_GUID));
            log.debug("FileRepository.getAppGuidAbsolutePath", { result: result });
            return result;
        };
        return FileRepository;
    }());
    exports.FileRepository = FileRepository;
});
