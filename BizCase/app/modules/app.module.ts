import { NgModule } from '@angular/core';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';

import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui/sidedrawer/angular';
import { SideDrawerPageComponent } from './shared/side-drawer-page';
import { BorderlessBtnDirective } from './shared/borderless-btn.directive';


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LogoutComponent,
    DocumentComponent,
    SIDEDRAWER_DIRECTIVES,
    SideDrawerPageComponent,
    BorderlessBtnDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
