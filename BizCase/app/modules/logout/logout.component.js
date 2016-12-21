"use strict";
var core_1 = require('@angular/core');
var appSettings = require("application-settings");
var router_1 = require("@angular/router");
var LogoutComponent = (function () {
    function LogoutComponent(router) {
        this.router = router;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        var loginStatus = appSettings.getBoolean("isLogin");
        if (loginStatus === true) {
            appSettings.setBoolean("isLogin", false);
            this.router.navigate(["/"]);
        }
    };
    LogoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-login",
            templateUrl: "logout.component.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map