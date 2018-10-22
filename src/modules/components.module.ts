import { MovieCardComponent } from './../components/movie-card/movie-card';
import { TabShellComponent } from './../components/tab-shell/tab-shell';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from '../components/header/header';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';
import { CardsPage } from '../components/cards/cards';


@NgModule({
  declarations: [
    HeaderComponent,
    TabShellComponent,
    MovieCardComponent
    ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }),
  ],
  exports: [
   HeaderComponent,
   TabShellComponent
  ],
  entryComponents: [
    // This is for dynamically added components that are added using ViewContainerRef.createComponent() (https://stackoverflow.com/questions/39756192/what-is-entrycomponents-in-angular-ngmodule)
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ComponentsModule {}
