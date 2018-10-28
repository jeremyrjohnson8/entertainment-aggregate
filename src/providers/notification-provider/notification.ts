import { Injectable } from "@angular/core";
import { Loading, LoadingOptions, ToastController, LoadingController } from "ionic-angular";


@Injectable()
export class Notifications {
    private loading: Loading;
    /** Default loader options */
    private loadingOptions: LoadingOptions = {
        content: 'Loading...'
    };

    constructor(public toast: ToastController, protected loadingCtrl: LoadingController){
        
    }



    showToast(displayable: string): void {
        let toast = this.toast.create({
            message: displayable,
            duration: 1500,
            position: `Top`,
            showCloseButton: true
        });
        toast.present();
    }


    public initLoader(options?: LoadingOptions): void {
        if (!options) {
            this.loading = this.loadingCtrl.create(this.loadingOptions);
        } else {
            this.loading = this.loadingCtrl.create(options);
        }

        this.loading.onDidDismiss(() => {
            this.loading = null;
        });
    }

    public async presentLoader(): Promise<void> {
        if (this.loading) {
            return await this.loading.present();
        } else {
            this.initLoader();
            return await this.loading.present();
        }
    }

    public async dismissLoader(): Promise<void> {
        if (this.loading) {
            return await this.loading.dismiss();
        }
    }


}