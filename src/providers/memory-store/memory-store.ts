import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MemoryStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoryStoreProvider {

  private _loginMemoryData: any;


  constructor(public http: HttpClient) {
  }


  public loginMemoryData(): any {
    if (!this._loginMemoryData) {
      this._loginMemoryData = {}; 
    }
    return this._loginMemoryData;
  }

}
