import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { OMDBApiDto } from '../../models/OmdbApiDto';
import { IOMDBApi } from '../../interfaces/IOMDBApiDTO';
import { MovieProvider } from '../movie/movie';

/*
  Generated class for the OmdbApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmdbApiProvider {
  private url = `http://www.omdbapi.com/?i=tt3896198&apikey=f92f483e&t=`
  public omdbDto: OMDBApiDto;
  iomdbApi: any;
  constructor(public http: HttpClient, public movieProvider: MovieProvider, public db: AngularFireDatabase) {
  }

  private async isMovieInDb(title: string): Promise<boolean> {

    try {
      let adjustedTitle = title.replace(/ /g, "+");
      let snapshot = await this.db.object(`/moviedb/KX9ia5GkOFl0YMbrzpbA/${title}`);
      if (snapshot) {
        console.log(`Movie existed in db`);
        // this.omdbDto = snapshot.data() as OMDBApiDto;
        return true
      } else {
        return false;
      }

    } catch {
      return false;
    }

  }

  public async getMovieByTitle(title: string): Promise<OMDBApiDto> {

    try {
      let titleUrl = this.url + `${title}`
      let titleUrlFinal = titleUrl.replace(/ /g, "+");
      console.log(`URL ${titleUrlFinal}`);
      let isInMovieDb = await this.isMovieInDb(title);

      if (isInMovieDb) {
        console.log(`Resolved that move was in db`);
        return; 
      } else {
        console.log(`Movie didn't exist - calling omdb`);
      }

      let response = await this.http.get(titleUrlFinal);
      // this.iomdbApi = re as IOMDBApi;
      // this.omdbDto = new OMDBApiDto(this.iomdbApi);
      return this.omdbDto;
    } catch (error) {
      this.omdbDto.errorOccurred = true;
      this.omdbDto.errorMessage = error.message;
      return this.omdbDto;
    }
  }
}







