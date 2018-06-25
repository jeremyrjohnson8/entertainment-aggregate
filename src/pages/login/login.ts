import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { TABS_PAGE } from '../../constants/page.constants';
import { LoginProvider } from '../../providers/login-provider/login-provider';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginProvider: LoginProvider) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  public async doLogin() : Promise<void> {
   let boolish =  this.loginProvider.googleLogin();

    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(TABS_PAGE);
    }, (err) => {
      this.navCtrl.push(TABS_PAGE);
      // Unable to log in
      // let toast = this.toastCtrl.create({
      //   message: this.loginErrorString,
      //   duration: 3000,
      //   position: 'top'
      // });
    //  toast.present();
    });
  }
}
