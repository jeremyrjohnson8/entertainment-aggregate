import { IOMDBApi } from "../interfaces/IOMDBApiDTO";

export class OMDBApiDto {
    public title: string;
    public Year: string;
    public Rated: string;
    public Released: string;
    public Runtime: string;
    public Genre: string;
    public Director: string;
    public Writer: string;
    public Actors: string;
    public Plot: string;
    public Language: string;
    public Country: string;
    public Poster: string;
    public Ratings: [{ Source: string; Value: string; }];
    public Metascore: string;
    public imdbVotes: string;
    public imdbID: string;
    public Type: string;
    public DVD: string;
    public BoxOffice: string;
    public Production: string;
    public Website: string;
    public Response: string;
    public errorOccurred: boolean;
    public errorMessage: string;

     constructor(omdbResult?: IOMDBApi) {
        console.log(`Omdb result to be mapped ${omdbResult}`);
        this.title = omdbResult && omdbResult.Title || "";
        this.Year = omdbResult && omdbResult.Year || "";
        this.Rated = omdbResult && omdbResult.Rated || "";
        this.Released = omdbResult && omdbResult.Released || "";
        this.Runtime = omdbResult && omdbResult.Runtime || "";
        this.Genre = omdbResult && omdbResult.Genre || "";
        this.Director = omdbResult && omdbResult.Director || "";
        this.Writer = omdbResult && omdbResult.Writer || "";
        this.Actors = omdbResult && omdbResult.Actors || "";
        this.Plot = omdbResult && omdbResult.Plot || "";
        this.Language = omdbResult && omdbResult.Language || "";
        this.Country = omdbResult && omdbResult.Country || "";
        this.Poster = omdbResult && omdbResult.Poster || "";
        this.Ratings = omdbResult && omdbResult.Ratings || [{Source: "", Value: ""}];
        this.Metascore = omdbResult && omdbResult.Metascore || "";
        this.imdbVotes = omdbResult && omdbResult.imdbVotes || "";
        this.imdbID = omdbResult && omdbResult.imdbID || "";
        this.Type = omdbResult && omdbResult.Type || "";
        this.DVD = omdbResult && omdbResult.DVD || "";
        this.BoxOffice = omdbResult && omdbResult.BoxOffice || "";
        this.Production = omdbResult && omdbResult.Production || "";
        this.Website = omdbResult && omdbResult.Website || "";
        this.Response = omdbResult && omdbResult.Response || "";
    }

}