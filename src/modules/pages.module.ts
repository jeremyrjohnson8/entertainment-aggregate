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
import { ListMasterPage } from '../pages/list-master/list-master';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { CardsPage } from '../components/cards/cards';
import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    WelcomePage,
    LoginPage,
    SignupPage,
    ListMasterPage,
    SettingsPage,
    SearchPage,
    CardsPage,
    TabsPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
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
    ListMasterPage,
    SettingsPage,
    SearchPage,
    CardsPage,
    TabsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
