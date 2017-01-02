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
var document_component_1 = require('./document/document.component');
var angular_1 = require('nativescript-telerik-ui/sidedrawer/angular');
var side_drawer_page_1 = require('./shared/side-drawer-page');
var borderless_btn_directive_1 = require('./shared/borderless-btn.directive');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                logout_component_1.LogoutComponent,
                document_component_1.DocumentComponent,
                angular_1.SIDEDRAWER_DIRECTIVES,
                side_drawer_page_1.SideDrawerPageComponent,
                borderless_btn_directive_1.BorderlessBtnDirective
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map