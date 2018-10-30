import { ListMasterPageModule } from './../pages/list-master/list-master.module';
import { SettingsPageModule } from './../pages/settings/settings.module';
import { IonicModule } from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components.module';
import { SearchPageModule } from '../pages/search/search.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    TabsPageModule,
    SettingsPageModule,
    SearchPageModule,
    ListMasterPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [

  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
