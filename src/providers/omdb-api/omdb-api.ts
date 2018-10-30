import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { IOMDBApi } from '../../interfaces/IOMDBApiDTO';
import { MovieProvider } from '../movie/movie';
import { OMDBApiDto } from '../../models/OmdbApiDto';

/*
  Generated class for the OmdbApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const url = `http://www.omdbapi.com/?i=tt3896198&apikey=f92f483e&t=`

@Injectable()
export class OmdbApiProvider {

  constructor(public http: HttpClient, public movieProvider: MovieProvider, public db: AngularFireDatabase) {
  }

  private async isMovieInDb(title: string): Promise<OMDBApiDto> {
    try {
      let adjustedTitle = title.replace(/ /g, "+");
      let snapshot = await this.db.object(`/moviedb/${adjustedTitle}`).valueChanges().take(1).toPromise() as OMDBApiDto;
      if (snapshot) {
        // this.omdbDto = snapshot.data() as OMDBApiDto;
        return snapshot;
      } else {
        return null;
      }

    } catch (error) {
      console.error(`Title: ${title} - error: ${error.toString()}`);
      return null;
    }
  }

  public async getMovieByTitle(title: string): Promise<OMDBApiDto> {

    try {
      console.log(`GetMovieByTitle - Title: ${title}`);
      let cleanedTitle = title.replace(/[^a-zA-Z0-9]/g, "+");
      let titleUrl = url + `${cleanedTitle}`

      let valueInDb: OMDBApiDto;
      if (titleUrl && title.length > 0) {
        valueInDb = await this.isMovieInDb(title);
      }
      if (valueInDb) {
        return valueInDb;
      }
      let response = await this.http.get(titleUrl).toPromise();
      if (response !== null || response !== undefined) {
        let omdbApiDto = new OMDBApiDto(response as IOMDBApi);
        if (omdbApiDto) {
          this.movieProvider.addMovieToDatabase(omdbApiDto);
        }
        return omdbApiDto;
      } else {
        return null;
      }
    } catch (error) {
      let ombdResponse = new OMDBApiDto();
      ombdResponse.errorOccurred = true;
      ombdResponse.errorMessage = error.message;
      return ombdResponse;
    }
  }
}


