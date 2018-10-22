import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MovieProvider } from './../providers/movie/movie';
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
import { OmdbApiProvider } from '../providers/omdb-api/omdb-api';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    
    ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
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
  providers: [LoginProvider, Notifications, MemoryStoreProvider, OmdbApiProvider, MovieProvider],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProvidersModule {} 
