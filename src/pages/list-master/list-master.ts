import { OMDBApiDto } from './../../models/OmdbApiDto';
import { MovieProvider } from './../../providers/movie/movie';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { OmdbApiProvider } from '../../providers/omdb-api/omdb-api';
import { Subject, Subscription } from 'rxjs';
import 'rxjs/add/operator/takeUntil';



@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage implements OnInit {

  movieList: OMDBApiDto[];
  originalList: OMDBApiDto[];
  sub: Subscription;


  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public api: OmdbApiProvider, public movie: MovieProvider) {
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

  async initMovieList(): Promise<void> {
    this.movieList = await this.movie.getMoviesByUser();
    this.originalList = this.movieList.map(e => Object.assign({}, e));
  }

  initMovieListSub(): void {
    this.sub = this.movie.memoryStoreProvider.movieListMemoryData().dataSubject
      .subscribe((value: OMDBApiDto[]) => {
        if (this.originalList) {
          this.originalList = [];
          value.map(e => this.originalList.push(e));
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
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
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

  public resetList($event = null): void {
    this.query(null);
  }
  public async searchMovie(searchTerm: string): Promise<void> {

    await this.api.getMovieByTitle(searchTerm);
  }
}
