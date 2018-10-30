import { MovieProvider } from './../../providers/movie/movie';
import { Notifications } from './../../providers/notification-provider/notification';
import { OMDBApiDto, platformArray } from './../../models/OmdbApiDto';
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlatformUtil } from '../../utils/platform-util';
import { MoviePlatform } from '../../pages/search/search';


@Component({
  selector: 'movie-card',
  templateUrl: 'movie-card.html'
})
export class MovieCardComponent {

  text: string;
  public movieObject: OMDBApiDto;
  platforms: MoviePlatform[];
  currentPlatform: MoviePlatform;
  constructor(public navController: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public notifications: Notifications,
    public movieProvider: MovieProvider,
    public alertController: AlertController) {

  }

  ngOnInit() {
    this.movieObject = this.navParams.data;

    this.platforms = platformArray;
    this.getCurrentPlatform();
  }

  getCurrentPlatform(): void {
    if (this.movieObject.platform) {
      let index = this.platforms.findIndex(e => e.value == this.movieObject.platform);
      if (index && index >= 0) {
        this.currentPlatform = this.platforms[index];
      }
    }
  }

  public closeModal(): void {
    this.viewCtrl.dismiss();
  }

  public getSelectInterface(): string {
    return PlatformUtil.isDesktop() ? 'popover' : 'action-sheet';
  }

  public async updateMoviePlatform(moviePlatform: MoviePlatform): Promise<void> {
    this.currentPlatform = moviePlatform;
    this.movieObject.platform = moviePlatform.value;
    await this.notifications.presentLoader();
    await this.movieProvider.updateMoviePlatform(this.movieObject.platform, this.movieObject.title);
    await this.notifications.dismissLoader();
    this.notifications.showToast(`Platform successfully updated`);
  }

  public async removeMovie(): Promise<void> {
    let alert = this.alertController.create({
      title: 'Confirm Deletion',
      message: 'Remove this movie from your MovieShelf',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.doIt();
          }
        }
      ]
    });
    alert.present();
  }

  public async doIt(): Promise<void> {
    await this.movieProvider.removieMovieFromDatabase(this.movieObject.title);
    await this.closeModal();

  }

}
