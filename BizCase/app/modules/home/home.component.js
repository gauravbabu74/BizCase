"use strict";
var core_1 = require('@angular/core');
var page_1 = require("ui/page");
var HomeComponent = (function () {
    function HomeComponent(page) {
        this.page = page;
        this.text = 'Home Page';
        this.itemsAmount = [];
        this.itemsAmount.push("Less than $15,000");
        this.itemsAmount.push("$15,000 - $29,999");
        this.itemsAmount.push("$30,000 - $44,999");
        this.itemsAmount.push("$45,000 - $74,999");
        this.itemsAmount.push("$75,000 - $149,999");
        this.itemsAmount.push("$150,000 - $300,000");
        this.itemsAmount.push("More than $300,000");
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'modules/home/home.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof page_1.Page !== 'undefined' && page_1.Page) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map