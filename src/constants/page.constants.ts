import { SearchPage } from './../pages/search/search';
import { ListMasterPage } from './../pages/list-master/list-master';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { WelcomePage } from './../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
// The page the user lands on after opening the app and without a session
export const WELCOME_PAGE = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const TABS_PAGE = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const LIST_MASTER_PAGE_TAB = ListMasterPage;
export const SEARCH_PAGE_TAB = SearchPage;
export const SETTINGS_PAGE_TAB = SettingsPage;


export const LOGIN_PAGE = LoginPage; 
export const SIGN_UP_PAGE = SignupPage; 
