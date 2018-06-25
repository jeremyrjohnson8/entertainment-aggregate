import { LoginPage } from './../pages/login/login';
import { WelcomePage } from './../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
// The page the user lands on after opening the app and without a session
export const WELCOME_PAGE = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'TabsPage';

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'ListMasterPage';
export const Tab2Root = 'SearchPage';
export const Tab3Root = 'SettingsPage';


export const LOGIN_PAGE = LoginPage; 
export const SIGN_UP_PAGE = SignupPage; 
