import { LoginMemoryData } from './../../models/login-memory-data';
import { Injectable } from '@angular/core';
import { GenericMemoryData } from '../../models/memory-store/memory-store-data-model';
import { OMDBApiDto } from '../../models/OmdbApiDto';

/*
  Generated class for the MemoryStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoryStoreProvider {

  private _loginMemoryData: LoginMemoryData;

  private _movieMemoryData: GenericMemoryData<OMDBApiDto[]>;

  constructor() {
  }


  public loginMemoryData(): LoginMemoryData { 
    if (!this._loginMemoryData) {
      this._loginMemoryData = new LoginMemoryData(); 
    }
    return this._loginMemoryData;
  }

  public movieListMemoryData(): GenericMemoryData<OMDBApiDto[]> { 
    if (!this._movieMemoryData) {
      this._movieMemoryData = new GenericMemoryData<OMDBApiDto[]>(); 
    }
    return this._movieMemoryData;
  }
}
