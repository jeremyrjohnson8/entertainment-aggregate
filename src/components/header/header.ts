import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Platform, Navbar, NavController } from 'ionic-angular';
import { UserModel } from '../../models/user-model';
import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() title: string = 'YMBD';
  @Input() showBackLink: boolean;
  @ViewChild(Navbar) navBar: Navbar;

  public unsubscribe = new Subject<void>();
  public user: UserModel;
  constructor(public navCtrl: NavController,
    private platform: Platform) {
  }


  ngOnInit() {
    if (this.navCtrl.parent) {
      this.navBar.backButtonClick = (e: UIEvent) => {
        this.navCtrl.parent.viewCtrl.dismiss();
        return;
      };
    }
  }

  public isIOS() {
    return this.platform.is('ios');
  }

}

