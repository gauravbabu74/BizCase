
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
import { RsharedModule } from './rshared';


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    RsharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LogoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
