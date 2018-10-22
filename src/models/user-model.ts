import { IFirebaseUser } from './../interfaces/firebase-user-interface';
export class  UserModel {

    displayname: string;
    email: string;
    uid: string;

    public constructor(userResponse: IFirebaseUser) {
        
        if (!userResponse) 
        {
            this.email = ``;
            this.displayname = ``;
            this.uid = ``; 
            return;
        }
       this.email = userResponse.user.email;
       this.displayname = userResponse.user.displayName;
       this.uid = userResponse.user.uid;


    }

}