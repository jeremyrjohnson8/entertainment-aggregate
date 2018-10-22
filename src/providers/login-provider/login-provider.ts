import { MemoryStoreProvider } from './../memory-store/memory-store';
import { IFirebaseUser } from './../../interfaces/firebase-user-interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { UserModel } from '../../models/user-model';
import { IFirebaseUserObject } from '../../interfaces/firebase/firebase-typings';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,
    public af: AngularFireAuth,
    public memoryStoreProvider: MemoryStoreProvider) {
  }

  /**
   * googleLogin
   */
  public async googleLogin(): Promise<void> {
    let provider = new firebase.auth.GoogleAuthProvider();
    let result: IFirebaseUser = await this.af.auth.signInWithPopup(provider);
    console.log(result);
    
    // .then((result: IFirebaseUser) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API
    //   if (result.credential) {
    //     let providerId = result.credential.providerId;
    //     // The signed-in user info.
    //     let user = result.user;
    //   }
    // }).catch((errorResponse: any) => {
    //   // Handle Errors here.
    //   let errorCode = errorResponse.code;
    //   let errorMessage = errorResponse.message;

    //   if (errorCode === 'auth/operation-not-allowed') {
    //     alert('You must enable Anonymous auth in the Firebase Console.');
    //   } else {
    //     console.error(errorResponse);
    //   }
    // });

  }

  public async signUpWithEmailAndPassword(firebaseUO: IFirebaseUserObject): Promise<UserModel> {
    try {
      let authUser: IFirebaseUser = await this.af.auth.createUserWithEmailAndPassword(firebaseUO.email, firebaseUO.password);
      let fbUser = authUser.user;
      fbUser.displayName = firebaseUO.displayName;
      await this.af.auth.updateCurrentUser(fbUser);
      return this.buildUserModel(authUser);;
    } catch (err) {
      Promise.reject(err);
    }
  }

  public async doLogin(email: string, pass: string): Promise<void> {

    if (!email || !pass) {
      Promise.resolve(undefined);
    }
    let userAuth = {} as IFirebaseUser;
    try {
      userAuth = await this.af.auth.signInWithEmailAndPassword(email, pass).then();
      this.memoryStoreProvider.loginMemoryData().publish(userAuth); 
    } catch (error) {
      Promise.reject(error);
    }
  }

  private buildUserModel(userResponse: IFirebaseUser): UserModel {
    if (!userResponse) return new UserModel(null);
    return new UserModel(userResponse);
  }
}
