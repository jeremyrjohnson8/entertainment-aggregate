import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OMDBApiDto } from '../../models/OmdbApiDto';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  public addMovieToCollection(movie: OMDBApiDto, uid: string): Promise<void> {
    let adjustedTitle = movie.title.replace(/ /g, "+");

    let movieData = this.mapMovieDataToGeneric(movie);
    return null;
}

public addMovieToDatabase(movie: OMDBApiDto) : void {
    debugger;
    let movieData = this.mapMovieDataToGeneric(movie);
    let adjustedTitle = movie.title.replace(/ /g, "+");

   // this.db.collection(`/moviedb/`).doc(adjustedTitle).set(movieData); 
}


private mapMovieDataToGeneric(movie: OMDBApiDto): object {

    if (movie) {
        let data = { 
            title: movie.title,
            Year: movie.Year,
            Rated: movie.Rated,
            Released: movie.Released,
            Runtime: movie.Runtime,
            Genre: movie.Genre,
            Director: movie.Director,
            Writer: movie.Writer,
            Actors: movie.Actors,
            Plot: movie.Plot,
            Language: movie.Language,
            Country: movie.Country,
            Poster: movie.Poster,
            Ratings: movie.Ratings,
            Metascore: movie.Metascore,
            imdbVotes: movie.imdbVotes,
            imdbID: movie.imdbID,
            Type: movie.Type,
            DVD: movie.DVD,
            BoxOffice: movie.BoxOffice,
            Production: movie.Production,
            Website: movie.Website,
            Response: movie.Response,
        }
        return data;
    }
    return {};

}

}
