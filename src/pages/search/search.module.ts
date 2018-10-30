import { ProvidersModule } from './../../modules/providers.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchPage } from './search';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    ProvidersModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
