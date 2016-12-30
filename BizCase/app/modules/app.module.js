"use strict";
var core_1 = require('@angular/core');
var forms_1 = require("nativescript-angular/forms");
var platform_1 = require("nativescript-angular/platform");
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var home_component_1 = require('./home/home.component');
var logout_component_1 = require('./logout/logout.component');
var about_component_1 = require('./about/about.component');
var contact_component_1 = require('./contact/contact.component');
var shared_1 = require('./shared');
var rshared_1 = require('./rshared');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                app_routing_module_1.AppRoutingModule,
                shared_1.SharedModule,
                rshared_1.RsharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                logout_component_1.LogoutComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map