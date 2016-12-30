import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/platform';
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui-pro/sidedrawer/angular';

import { RSideDrawerPageComponent } from './side-rdrawer-page';
import { BorderlessBtnDirective } from './borderless-btn.directive';

@NgModule({
  imports: [
    NativeScriptModule,
  ],
  declarations: [
    SIDEDRAWER_DIRECTIVES,
    RSideDrawerPageComponent,
    BorderlessBtnDirective
  ],
  exports: [
    RSideDrawerPageComponent,
    BorderlessBtnDirective
  ]
})
export class RsharedModule {

}
