import { IFirebaseUserObject } from './../../interfaces/firebase/firebase-typings';
import { LoginProvider } from './../../providers/login-provider/login-provider';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';
import { Notifications } from '../../providers/notification-provider/notification';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public notifications: Notifications,
    public translateService: TranslateService,
    public loginProvider: LoginProvider) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  public async doSignup() {
    // Attempt to login in through our User service
    try {
      this.loginProvider.signUpWithEmailAndPassword({ displayName: ``, photoURL: ``, email: ``, password: `` } as IFirebaseUserObject);

    } catch (error) {
      this.notifications.showToast(this.signupErrorString);
    }
  }
}
