import { PlatformUtil } from './../../utils/platform-util';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { OmdbApiProvider } from '../../providers/omdb-api/omdb-api';
import { OMDBApiDto } from '../../models/OmdbApiDto';
import { Notifications } from '../../providers/notification-provider/notification';
import { MoviePlatformEnum } from '../../enums/platforms';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit {


  currentMovie: OMDBApiDto;
  platforms: MoviePlatform[];
  currentPlatform: MoviePlatform;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: OmdbApiProvider, public notifications: Notifications) { }

  ngOnInit(): void {
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
  public async searchMovie(searchTerm: string): Promise<void> {
    this.notifications.presentLoader();
    try {
      this.currentMovie = await this.api.getMovieByTitle(searchTerm);
      console.log(this.currentMovie);
      this.notifications.dismissLoader();

    } catch (error) {
      console.error(error);
      this.notifications.showToast(`error occurred`);
      this.notifications.dismissLoader();

    }
  }

  public getSelectInterface(): string {
    return PlatformUtil.isDesktop() ? 'popover' : 'action-sheet';
  }


  public async addMovieToCollection(): Promise<void> {

    try {
      if (this.currentMovie && this.currentPlatform) {
        await this.api.movieProvider.addMovieToCollection(this.currentMovie, this.currentPlatform.value);
        this.notifications.dismissLoader();
      }
    } catch {
      this.notifications.showToast(`error occurred`);
      this.notifications.dismissLoader();
    }

  }

  public setMoviePlatform(moviePlatform: MoviePlatform): void {
    this.currentPlatform = moviePlatform;
  }
}


export class MoviePlatform {
  public displayable: string;
  public value: MoviePlatformEnum;
}

