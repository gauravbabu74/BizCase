"use strict";
var core_1 = require('@angular/core');
var page_1 = require("ui/page");
var dialogs = require("ui/dialogs");
var router_1 = require('nativescript-angular/router');
var HomeComponent = (function () {
    function HomeComponent(page, routerExtensions) {
        this.page = page;
        this.routerExtensions = routerExtensions;
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
    HomeComponent.prototype.profileAction = function () {
        var _this = this;
        dialogs.action({
            message: "User Menu",
            cancelButtonText: "Cancel",
            actions: ["My Account", "Logout"]
        }).then(function (result) {
            if (result == "Logout") {
                _this.routerExtensions.navigate(["/logout"]);
            }
            else if (result == "My Account") {
                _this.routerExtensions.navigate(["/myaccount"]);
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html',
            styleUrls: ["home.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [page_1.Page, router_1.RouterExtensions])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map