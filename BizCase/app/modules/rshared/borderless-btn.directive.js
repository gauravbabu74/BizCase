"use strict";
var core_1 = require('@angular/core');
var platform_1 = require('platform');
var application = require('application');
/**
 * Android Only.
 *
 * Directive which removes border from the button when applied on android.
 */
var BorderlessBtnDirective = (function () {
    function BorderlessBtnDirective(_el) {
        this._el = _el;
    }
    BorderlessBtnDirective.prototype.setBorderlessBackground = function () {
        var outValue = new android.util.TypedValue();
        application.android.context.getTheme().resolveAttribute(android.R.attr.selectableItemBackground, outValue, true);
        this.nsBtn.android.setBackgroundResource(outValue.resourceId);
    };
    BorderlessBtnDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (platform_1.isAndroid) {
            this.nsBtn = this._el.nativeElement;
            // if the view has already loaded - set immediately
            if (this.nsBtn.isLoaded) {
                this.setBorderlessBackground();
            }
            // Attach the setter for future loaded events
            this.nsBtn.on('loaded', function () { _this.setBorderlessBackground(); });
        }
    };
    BorderlessBtnDirective.prototype.ngOnDestroy = function () {
        // Cleanup
        if (platform_1.isAndroid) {
            this.nsBtn.off('loaded');
            this.nsBtn = undefined;
        }
    };
    BorderlessBtnDirective = __decorate([
        core_1.Directive({
            selector: '.borderless-btn'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], BorderlessBtnDirective);
    return BorderlessBtnDirective;
    var _a;
}());
exports.BorderlessBtnDirective = BorderlessBtnDirective;
//# sourceMappingURL=borderless-btn.directive.js.map