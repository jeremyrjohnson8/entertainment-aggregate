import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';
import { LIST_MASTER_PAGE_TAB, SETTINGS_PAGE_TAB, SEARCH_PAGE_TAB } from '../../constants/page.constants';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = LIST_MASTER_PAGE_TAB;
  tab2Root: any = SEARCH_PAGE_TAB;
  tab3Root: any = SETTINGS_PAGE_TAB;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });
  }
}
