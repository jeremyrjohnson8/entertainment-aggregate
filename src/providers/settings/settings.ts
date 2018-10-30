import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {


  constructor(public af: AngularFireAuth,
    public navCtrl: NavController) {
  }



}
