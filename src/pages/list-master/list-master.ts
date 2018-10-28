import { Notifications } from './../../providers/notification-provider/notification';
import { OMDBApiDto } from './../../models/OmdbApiDto';
import { MovieProvider } from './../../providers/movie/movie';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { Items } from '../../providers';
import { OmdbApiProvider } from '../../providers/omdb-api/omdb-api';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { MovieCardComponent } from '../../components/movie-card/movie-card';



@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage implements OnInit {
 

  movieList: OMDBApiDto[];
  originalList: OMDBApiDto[];
  sub: Subscription;


  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public api: OmdbApiProvider, public movie: MovieProvider, public notifications: Notifications) {
    this.initMovieListSub();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.initMovieList();
  }

  public async initMovieList(): Promise<void> {
    try {
      await this.notifications.presentLoader();
      this.movieList = await this.movie.getMoviesByUser();
      this.originalList = this.movieList.map(e => Object.assign({}, e));
      await this.notifications.dismissLoader();
    } catch (error) {
      console.error(error);
      await this.notifications.dismissLoader();
    }  
  }

  initMovieListSub(): void {
    this.sub = this.movie.memoryStoreProvider.movieListMemoryData().dataSubject
      .subscribe((value: OMDBApiDto[]) => {
        if (this.originalList) {
          this.originalList = [];
          console.log(`Fired in sub`);
          this.movieList = value;
          this.originalList = value;
          
        }
      });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(movie: OMDBApiDto) {
    let profileModal = this.modalCtrl.create(MovieCardComponent, movie);
    profileModal.present();



  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.movieList = this.originalList;
      return;
    }
    this.movieList = this.query({
      title: val
    });
  }


  query(params?: any): OMDBApiDto[] {
    if (!params) {
      return this.originalList;
    }
    if (this.movieList.length === 0) this.movieList = this.originalList;
    return this.movieList.filter((movie) => {
      for (let key in params) {
        let field = movie[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return movie;
        } else if (field == params[key]) {
          return movie;
        }
      }
      return null;
    });
  }

  public resetList(): void {
    this.query(null);
  }
  
}
