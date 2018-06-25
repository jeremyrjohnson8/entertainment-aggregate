import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from '../components/header/header';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    HeaderComponent
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
   HeaderComponent
  ],
  entryComponents: [
    // This is for dynamically added components that are added using ViewContainerRef.createComponent() (https://stackoverflow.com/questions/39756192/what-is-entrycomponents-in-angular-ngmodule)
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ComponentsModule {}
