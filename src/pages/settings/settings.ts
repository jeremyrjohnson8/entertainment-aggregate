import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public af: AngularFireAuth,
    public navCtrl: NavController) {
  }


  public doLogout(): void {
    this.af.auth.signOut();
    this.navCtrl.setRoot(`LoginPage`);
  }
}
