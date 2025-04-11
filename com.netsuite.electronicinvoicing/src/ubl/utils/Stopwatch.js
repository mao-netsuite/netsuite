/**
 * @copyright © 2024, Oracle and/or its affiliates. All rights reserved.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Stopwatch = /** @class */ (function () {
        function Stopwatch() {
        }
        Object.defineProperty(Stopwatch.prototype, "elapsedMilliseconds", {
            get: function () {
                if (!this.startTime)
                    return 0;
                return this.stopTime ? this.stopTime - this.startTime : new Date().getTime() - this.startTime;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Stopwatch.prototype, "elapsedMillisecondsString", {
            get: function () {
                return "".concat(this.elapsedMilliseconds, "ms");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Stopwatch.prototype, "elapsedSecondsString", {
            get: function () {
                return "".concat((this.elapsedMilliseconds / 1000).toFixed(3), "s");
            },
            enumerable: false,
            configurable: true
        });
        Stopwatch.prototype.start = function () {
            this.stopTime = undefined;
            this.startTime = new Date().getTime();
            return this;
        };
        Stopwatch.prototype.stop = function () {
            this.stopTime = new Date().getTime();
            return this;
        };
        Stopwatch.prototype.reset = function () {
            this.startTime = undefined;
            this.stopTime = undefined;
            return this;
        };
        Stopwatch.startNew = function () {
            return new Stopwatch().start();
        };
        return Stopwatch;
    }());
    exports.default = Stopwatch;
});
