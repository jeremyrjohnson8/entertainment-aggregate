import { ProvidersModule } from './../../modules/providers.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    ProvidersModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
