import { ListMasterPageModule } from './../pages/list-master/list-master.module';
import { SettingsPageModule } from './../pages/settings/settings.module';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { WelcomePage } from './../pages/welcome/welcome';
import { IonicModule } from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components.module';
import { CardsPage } from '../components/cards/cards';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPageModule } from '../pages/search/search.module';


@NgModule({
  declarations: [
    WelcomePage,
    LoginPage,
    SignupPage,
    CardsPage,
    TabsPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
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
    WelcomePage,
    LoginPage,
    SignupPage,
    CardsPage,
    TabsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
