import { MoviePlatform } from './../../pages/search/search';
import { MemoryStoreProvider } from './../memory-store/memory-store';
import { OMDBApiDto } from './../../models/OmdbApiDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../../models/user-model';
import { MoviePlatformEnum } from '../../enums/platforms';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

    private user: UserModel;
    constructor(public http: HttpClient, public db: AngularFireDatabase, public memoryStoreProvider: MemoryStoreProvider) {
        this.user = this.memoryStoreProvider.loginMemoryData().data;
    }



    public async addMovieToCollection(movie: OMDBApiDto, platform: MoviePlatformEnum): Promise<void> {
        let adjustedTitle = movie.title.replace(/[^a-zA-Z0-9]/g, "+");
        let movieData = this.mapMovieDataToGeneric(movie, platform);
        await this.db.list(`/movie/${this.user.uid}`).set(adjustedTitle, movieData);
        let updatedList = await this.getMoviesByUser(); 
        this.memoryStoreProvider.movieListMemoryData().publish(updatedList);
    }

    public async addMovieToDatabase(movie: OMDBApiDto): Promise<void> {
        let movieData = this.mapMovieDataToGeneric(movie);
        let adjustedTitle = movie.title.replace(/[^a-zA-Z0-9]/g, "+");
        await this.db.list(`/moviedb/`).set(adjustedTitle, movieData);
    }

    public async getMovieFromMainDBByTitle(title: string): Promise<OMDBApiDto> {
        let adjustedTitle = title.replace(/[^a-zA-Z0-9]/g, "+");
        let snapshot = await this.db.object(`/moviedb/${adjustedTitle}`).valueChanges().take(1).toPromise() as OMDBApiDto;
        return snapshot;
    }

    public async getMoviesByUser(): Promise<OMDBApiDto[]> {
        let userMovieList =  await this.db.list(`/movie/${this.user.uid}`).valueChanges().take(1).toPromise() as OMDBApiDto[];
        this.memoryStoreProvider.movieListMemoryData().publish(userMovieList); 
        return userMovieList;
    }


    private mapMovieDataToGeneric(movie: OMDBApiDto, platform: MoviePlatformEnum = null): object {

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
                Platform: platform
            }
            return data;
        }
        return {};

    }
}
