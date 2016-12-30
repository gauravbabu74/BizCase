import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      { path: '', component: LoginComponent,data: { title: 'Heroes List' } },
      { path: 'logout', component: LogoutComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {

}
