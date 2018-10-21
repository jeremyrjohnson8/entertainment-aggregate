import { Injectable } from "@angular/core";
import { Loading, LoadingOptions, ToastController, LoadingController } from "ionic-angular";


@Injectable()
export class Notifications {
    private loading: Loading;
    /** Default loader options */
    private defaultLoadingOptions: LoadingOptions = {
        content: 'Loading...'
    };

    constructor(public toast: ToastController, protected loadingCtrl: LoadingController){
        
    }



    showToast(displayable: string): void {
        let toast = this.toast.create({
            message: displayable,
            duration: 2500,
            position: `Top`,
            showCloseButton: true
        });
        toast.present();
    }


    public initLoader(options?: LoadingOptions): void {
        if (!options) {
            this.loading = this.loadingCtrl.create(this.defaultLoadingOptions);
        } else {
            this.loading = this.loadingCtrl.create(options);
        }

        this.loading.onDidDismiss(() => {
            this.loading = null;
        });
    }

    public presentLoader(): void {
        if (this.loading) {
            this.loading.present();
        } else {
            this.initLoader();
            this.loading.present();
        }
    }

    public dismissLoader(): void {
        if (this.loading) {
            this.loading.dismiss();
        }
    }


}