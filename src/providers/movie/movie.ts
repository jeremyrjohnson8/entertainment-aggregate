import { MemoryStoreProvider } from './../memory-store/memory-store';
import { OMDBApiDto } from './../../models/OmdbApiDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UserModel } from '../../models/user-model';
import { MoviePlatformEnum } from '../../enums/platforms';
import { IMovieObject } from '../../interfaces/IOMDBApiDTO';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

    private user: UserModel;
    constructor(public http: HttpClient,
        public db: AngularFireDatabase,
        public memoryStoreProvider: MemoryStoreProvider) {
        this.user = this.memoryStoreProvider.loginMemoryData().data;
    }

    public async addMovieToCollection(movie: OMDBApiDto, platform: MoviePlatformEnum): Promise<void> {
        try {
            let adjustedTitle = this.adjustTitle(movie.title);
            let movieData = this.mapMovieDataToGeneric(movie, platform);
            await this.db.list(`/movie/${this.user.uid}`).set(adjustedTitle, movieData);
            let updatedList = await this.getMoviesByUser();
            this.memoryStoreProvider.movieListMemoryData().publish(updatedList);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    public async addMovieToDatabase(movie: OMDBApiDto): Promise<void> {
        try {
            let movieData = this.mapMovieDataToGeneric(movie);
            let adjustedTitle = this.adjustTitle(movie.title);
            await this.db.list(`/moviedb/`).set(adjustedTitle, movieData);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    public async getMovieFromMainDBByTitle(title: string): Promise<OMDBApiDto> {
        try {
            let adjustedTitle = this.adjustTitle(title);
            let snapshot = await this.db.object(`/moviedb/${adjustedTitle}`).valueChanges().take(1).toPromise() as IMovieObject;
            return new OMDBApiDto(snapshot);
        } catch (error) {
            console.error(`Error: ${error}`)
        }

    }

    public async getMoviesByUser(): Promise<OMDBApiDto[]> {
        try {
            let userMovieList = await this.db.list(`/movie/${this.user.uid}`).valueChanges().take(1).toPromise() as IMovieObject[];
            let userMovieObjectList = userMovieList.map(e => new OMDBApiDto(e)); 
            this.memoryStoreProvider.movieListMemoryData().publish(userMovieObjectList);
            return userMovieObjectList;
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }


    public async updateMoviePlatform(platform: number, title: string): Promise<void> {
        if (!platform || !title) {
            throw Error(`Null params sent to update movie platform`);
        }
        try {
            let titleFinal = `/movie/${this.user.uid}/${this.adjustTitle(title)}`;
            console.log(titleFinal);
            let ref: AngularFireObject<any> = await this.db.object(titleFinal);
            await ref.update({ Platform: platform });
        } catch (error) {
            console.error(`Error: ${error}`)
        }

    }

    public async removieMovieFromDatabase(title: string): Promise<void> {
        if (!title) {
            throw Error(`Null params sent to remove movie`);
        }

        try {
            let adjustedTitle = this.adjustTitle(title);
            await this.db.object(`/movie/${this.user.uid}/${adjustedTitle}`).remove();
            let updatedList = await this.getMoviesByUser();
            this.memoryStoreProvider.movieListMemoryData().publish(updatedList);
        } catch (error) {
            console.error(`Error: ${error}`)
        }

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

    private adjustTitle(title: string): string {
        return title.replace(/[^a-zA-Z0-9]/g, "+");
    }
}
