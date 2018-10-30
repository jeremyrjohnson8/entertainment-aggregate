import { ProvidersModule } from './../../modules/providers.module';
import { ListMasterPageModule } from './../list-master/list-master.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import { SettingsPageModule } from '../settings/settings.module';
import { SearchPageModule } from '../search/search.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild(),
    SettingsPageModule,
    ListMasterPageModule,
    SearchPageModule,
    ProvidersModule
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule { }
