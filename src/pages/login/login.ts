import { SIGN_UP_PAGE, TABS_PAGE } from './../../constants/page.constants';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider/login-provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user-model';
import { Notifications } from '../../providers/notification-provider/notification';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'jj@tester.com',
    password: 'testPass'
  };

  public loginFormGroup: FormGroup;
  public loginEmail: string;
  public loginPassword: string;
  public userModel: User;

  constructor(public navCtrl: NavController,
    public loginFormBuilder: FormBuilder,
    public loginProvider: LoginProvider,
    public notifications: Notifications,
    public translateService: TranslateService) {
  }


  ngOnInit(): void {
    this.setUpLoginForm();
  }

  // Attempt to login in through our User service
  public async doLogin(): Promise<void> {
    this.notifications.presentLoader();
    try {
      this.userModel = await this.loginProvider.doLogin(this.account.email, this.account.password);
      console.log(this.userModel.email);
      this.notifications.dismissLoader();
      this.notifications.showToast(`Success Login`);
      this.navCtrl.setRoot(TABS_PAGE);
    } catch {
      this.notifications.dismissLoader();
      this.notifications.showToast(`Failed Login`);
    }
  }

  private setUpLoginForm(): void {
    let formValues = {
      email: [this.loginEmail, [Validators.required, Validators.email]],
      password: [this.loginPassword, [Validators.required, Validators.minLength]],
    };
    this.loginFormGroup = this.loginFormBuilder.group(formValues);
  }

  public navigateToSignup(): void {
    this.navCtrl.setRoot(SIGN_UP_PAGE);
  }
}
