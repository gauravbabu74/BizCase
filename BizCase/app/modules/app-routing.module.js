"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var logout_component_1 = require('./logout/logout.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var contact_component_1 = require('./contact/contact.component');
var document_component_1 = require('./document/document.component');
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule.forRoot([
                    { path: '', component: login_component_1.LoginComponent, data: { title: 'Heroes List' } },
                    { path: 'logout', component: logout_component_1.LogoutComponent },
                    { path: 'about', component: about_component_1.AboutComponent },
                    { path: 'contact', component: contact_component_1.ContactComponent },
                    { path: 'document', component: document_component_1.DocumentComponent },
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: 'register', component: register_component_1.RegisterComponent }
                ])
            ],
            exports: [router_1.NativeScriptRouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map