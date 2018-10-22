import { UserModel } from "./user-model";
import { IMemoryStoreData } from "../interfaces/memory-store-types";
import { Subject } from "rxjs/Subject";
import { User } from "../providers";
import { IFirebaseUser } from "../interfaces/firebase-user-interface";


export class LoginMemoryData implements IMemoryStoreData {

    public data: UserModel;
    public additionalUserInfo?: firebase.auth.AdditionalUserInfo;
    public firebaseUser: firebase.User;
    public dataSubject: Subject<UserModel> = new Subject<UserModel>();

    public publish(value: IFirebaseUser): Promise<UserModel> {
        return new Promise<UserModel>((resolve) => {
            if (value !== null && value !== undefined) {
                this.data = new UserModel(value); // assign data object
            } else {
                this.data = undefined; //reset data
            }
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }

    public publishExistingUser(value: IFirebaseUser): Promise<UserModel> {
        return new Promise<UserModel>((resolve) => {
            
            if (value !== null && value !== undefined) {
                this.data = new UserModel(value); // assign data object
            } else {
                this.data = undefined; //reset data
            }
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }

    public republish(): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }
}
