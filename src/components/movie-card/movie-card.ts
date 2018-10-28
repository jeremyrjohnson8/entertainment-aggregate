import { MovieProvider } from './../../providers/movie/movie';
import { Notifications } from './../../providers/notification-provider/notification';
import { OMDBApiDto } from './../../models/OmdbApiDto';
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlatformUtil } from '../../utils/platform-util';
import { MoviePlatform } from '../../pages/search/search';
import { MoviePlatformEnum } from '../../enums/platforms';


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

    this.platforms = [{
      value: MoviePlatformEnum.DVD,
      displayable: `DVD`
    } as MoviePlatform, {
      value: MoviePlatformEnum.BLURAY,
      displayable: `BLU-RAY`
    } as MoviePlatform, {
      value: MoviePlatformEnum.VHS,
      displayable: `VHS`
    } as MoviePlatform, {
      value: MoviePlatformEnum.AMAZON,
      displayable: `Amazon Prime`
    } as MoviePlatform, {
      value: MoviePlatformEnum.VUDU,
      displayable: `Vudu Digital`
    } as MoviePlatform, {
      value: MoviePlatformEnum.APPLE,
      displayable: `Apple TV`
    } as MoviePlatform]
  }

  public closeModal(): void {
    this.viewCtrl.dismiss();
  }

  public getSelectInterface(): string {
    return PlatformUtil.isDesktop() ? 'popover' : 'action-sheet';
  }

  public async updateMoviePlatform(moviePlatform: MoviePlatform): Promise<void> {
    this.currentPlatform = moviePlatform;
    this.movieObject.platform = moviePlatform;
    await this.movieProvider.updateMoviePlatform(this.movieObject.platform.value, this.movieObject.title);
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
          handler: ()  => {
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
