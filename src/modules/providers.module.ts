import { LoginProvider } from './../providers/login-provider/login-provider';
import { IonicModule } from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createTranslateLoader } from '../app/app.module';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Notifications } from '../providers/notification-provider/notification';
import { MemoryStoreProvider } from '../providers/memory-store/memory-store';


@NgModule({
  declarations: [
    
    ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
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
  providers: [LoginProvider, Notifications, MemoryStoreProvider],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProvidersModule {} 
