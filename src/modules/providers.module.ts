import { LoginProvider } from './../providers/login-provider/login-provider';
import { IonicModule } from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    
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
  ],
  entryComponents: [
    
  ],
  providers: [LoginProvider],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProvidersModule {}
