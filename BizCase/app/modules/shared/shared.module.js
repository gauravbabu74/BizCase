"use strict";
var core_1 = require('@angular/core');
var platform_1 = require('nativescript-angular/platform');
var angular_1 = require('nativescript-telerik-ui-pro/sidedrawer/angular');
var side_drawer_page_1 = require('./side-drawer-page');
var borderless_btn_directive_1 = require('./borderless-btn.directive');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
            ],
            declarations: [
                angular_1.SIDEDRAWER_DIRECTIVES,
                side_drawer_page_1.SideDrawerPageComponent,
                borderless_btn_directive_1.BorderlessBtnDirective
            ],
            exports: [
                side_drawer_page_1.SideDrawerPageComponent,
                borderless_btn_directive_1.BorderlessBtnDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map