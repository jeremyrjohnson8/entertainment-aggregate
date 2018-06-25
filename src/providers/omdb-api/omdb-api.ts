import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
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
  constructor(public http: HttpClient, public movieProvider: MovieProvider, public db: AngularFirestore) {
  }

  private isMovieInDb(title: string): Promise<boolean> {

    return new Promise((resolved) => {
      let adjustedTitle = title.replace(/ /g, "+");
      this.db.firestore.doc(`/moviedb/KX9ia5GkOFl0YMbrzpbA/${title}`).get().then((snapshot) => {
        if (snapshot.exists) {
          console.log(`Movie existed in db`);
          this.omdbDto = snapshot.data() as OMDBApiDto;
          return Promise.resolve(true);
        } else
          Promise.resolve(false);
      });
    });
  }

  public getMovieByTitle(title: string): Promise<OMDBApiDto> {

    return new Promise((resolved) => {
      let titleUrl = this.url + `${title}`
      let titleUrlFinal = titleUrl.replace(/ /g, "+");
      console.log(`URL ${titleUrlFinal}`);
      // this.isMovieInDb(title).then((resolved: boolean) => { 
      // if (true) {
      //     console.log(`Resolved that move was in db`);
      //     return Promise.resolve(this.omdbDto); 
      //   } else {
      console.log(`Movie didn't exist - calling omdb`);
      debugger;
      return new Promise((resolve) => {
        if (title) {
          this.http.get(titleUrlFinal).subscribe((value: Response) => {
            this.iomdbApi = value.json() as IOMDBApi;
            this.omdbDto = new OMDBApiDto(this.iomdbApi);
            this.movieProvider.addMovieToDatabase(this.omdbDto);
            console.log(value.json());
            return resolve(this.omdbDto);
          }),
            (error: Error) => {
              this.omdbDto.errorOccurred = true;
              this.omdbDto.errorMessage = error.message;
              return resolve(this.omdbDto);
            }
        }
      });
    });
  }
}







