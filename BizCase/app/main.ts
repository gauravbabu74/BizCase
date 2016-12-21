import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./modules/app.module";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);

platformNativeScriptDynamic().bootstrapModule(AppModule);