"use strict";
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./modules/app.module");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("DropDown", function () { return require("nativescript-drop-down/drop-down").DropDown; });
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map