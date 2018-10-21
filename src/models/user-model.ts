import { IFirebaseUser } from './../interfaces/firebase-user-interface';
export class  User {

    displayname: string;
    email: string;

    constructor(userResponse: IFirebaseUser) {
        
        if (!userResponse) 
        {
            this.email = ``;
            this.displayname = ``;
            return;
        }
       this.email = userResponse.user.email;
       this.displayname = userResponse.user.displayName;
    }

}