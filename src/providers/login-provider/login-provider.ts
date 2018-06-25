import { IFirebaseUser } from './../../interfaces/firebase-user-interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,
    public af: AngularFireAuth) {
  }

  /**
   * googleLogin
   */
  public async googleLogin() : Promise<void> {
    let provider = new firebase.auth.GoogleAuthProvider();
    let response = await this.af.auth.signInWithPopup(provider).then((result: IFirebaseUser) => {
      // This gives you a Google Access Token. You can use it to access the Google API
      if (result.credential) {
        let providerId  = result.credential.providerId;
        // The signed-in user info.
        let user = result.user;
      }
    }).catch((errorResponse: any) => {
      // Handle Errors here.
      let errorCode = errorResponse.code;
      let errorMessage = errorResponse.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(errorResponse);
      }
    });

  }


  public async doLogin(email: string, pass: string): Promise<boolean> {

    if (!email || !pass) {
      return undefined;
    }


    this.af.auth.signInWithEmailAndPassword(email, pass).then().catch();



    return null;
  }

}
