import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { LOGIN_PAGE, SIGN_UP_PAGE } from '../../constants/page.constants';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public title: string = `Your Online Movie Database`;
  constructor(public navCtrl: NavController) { }

  public doLogin(): void {
    this.navCtrl.push(LOGIN_PAGE);
  }

  public signup(): void {
    this.navCtrl.push(SIGN_UP_PAGE);
  }


}
