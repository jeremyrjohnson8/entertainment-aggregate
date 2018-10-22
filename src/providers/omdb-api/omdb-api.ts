import { MoviePlatformEnum } from './../../enums/platforms';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { IOMDBApi } from '../../interfaces/IOMDBApiDTO';
import { MovieProvider } from '../movie/movie';
import { OMDBApiDto } from '../../models/OmdbApiDto';
import { async } from 'rxjs/internal/scheduler/async';

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


  public async loadMovies(): Promise<void> {



    let mods = [] as CsvJSONModel[];
    this.data.forEach((csvJson: CsvJson) => {
      mods.push(new CsvJSONModel(csvJson));
    });

    let length = mods.length;

    for (var i = 0; i < length; i++) {
      if (mods[i] && mods[i].Title.length > 0) {
        console.log(mods[i].Title);
        try {
          let response = await this.getMovieByTitle(mods[i].Title);
          if (response) {
            await this.movieProvider.addMovieToCollection(response, mods[i].videoFormat)
          }
        } catch (error) {
          console.error(`Title: ${mods[i].Title} - error: ${error.toString()}`);
        }
      }

    }
  }

  data = [
    {
      Title: "1408",
      Link: "",
      Category: "Suspense",
      Format: "DVD",
      Case: "ONE-23",
      HasDigital: false
    },
    {
      Title: "2012",
      Link: "",
      Category: "Disaster",
      Format: "DVD",
      Case: "ONE-18",
      HasDigital: false
    },
    {
      Title: "10 Things I Hate About You",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-7",
      HasDigital: false
    },
    {
      Title: "100 Women",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-10",
      HasDigital: false
    },
    {
      Title: "13 Going on 30",
      Link: "",
      Category: "Teen Comedy",
      Format: "DVD",
      Case: "TWO-7",
      HasDigital: false
    },
    {
      Title: "21 Jump Street",
      Link: "",
      Category: "Action Comedy",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "22 Jump Street",
      Link: "",
      Category: "Action Comedy",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "50 First Dates",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-1",
      HasDigital: false
    },
    {
      Title: "A Few Good Men",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE-15",
      HasDigital: false
    },
    {
      Title: "A Knight's Tale",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-4",
      HasDigital: false
    },
    {
      Title: "A Lot Like Love",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-5",
      HasDigital: false
    },
    {
      Title: "A Night at the Roxbury",
      Link: "",
      Category: "Silly Comedy",
      Format: "DVD",
      Case: "ONE-10",
      HasDigital: false
    },
    {
      Title: "A Walk to Remember",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-2",
      HasDigital: false
    },
    {
      Title: "Along Came Polly",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-7",
      HasDigital: false
    },
    {
      Title: "America: The Story of Us",
      Link: "",
      Category: "Documentary",
      Format: "BLUERAY",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "American Pie: The Naked Mile",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-6",
      HasDigital: false
    },
    {
      Title: "American Sniper",
      Link: "",
      Category: "Drama",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "American Wedding",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-7",
      HasDigital: false
    },
    {
      Title: "Amistad",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE-22",
      HasDigital: false
    },
    {
      Title: "An American Haunting",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-24",
      HasDigital: false
    },
    {
      Title: "Analyze That",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Analyze This",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Anger Management",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-14",
      HasDigital: false
    },
    {
      Title: "Argo",
      Link: "",
      Category: "Political Drama",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Army of Darkness",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Avatar",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Avengers",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Avengers: Age of Ultron",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Aviator",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE-21",
      HasDigital: false
    },
    {
      Title: "Baby Driver",
      Link: "",
      Category: "Heist",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Baby Mama",
      Link: "",
      Category: "Silly Comedy",
      Format: "DVD",
      Case: "ONE-14",
      HasDigital: false
    },
    {
      Title: "Bad Boys II",
      Link: "",
      Category: "Action Comedy",
      Format: "DVD",
      Case: "TWO-19",
      HasDigital: false
    },
    {
      Title: "Baseketball",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-9",
      HasDigital: false
    },
    {
      Title: "Batman",
      Link: "",
      Category: "Superhero",
      Format: "DVD",
      Case: "TWO-19",
      HasDigital: false
    },
    {
      Title: "Batman Begins",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Beverly Hills Ninja",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-8",
      HasDigital: false
    },
    {
      Title: "Bewitched",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-15",
      HasDigital: false
    },
    {
      Title: "Bewitched: First 3 Episodes",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-15",
      HasDigital: false
    },
    {
      Title: "Big Momma's House",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-4",
      HasDigital: false
    },
    {
      Title: "Big Trouble in Little China",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-7",
      HasDigital: false
    },
    {
      Title: "Bill & Ted's Excellent Adventure",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-8",
      HasDigital: false
    },
    {
      Title: "Black Knight",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-6",
      HasDigital: false
    },
    {
      Title: "Blazing Saddles",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-3",
      HasDigital: false
    },
    {
      Title: "Bob Funk",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Bourne Idenity",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Bourne Supremacy",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Captain America: Civil War",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Captain America: The First Avenger",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Captain America: The Winter Soldier",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Casino Royale 007",
      Link: "",
      Category: "Action",
      Format: "DVD",
      Case: "TWO-18",
      HasDigital: false
    },
    {
      Title: "Casper",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-14",
      HasDigital: false
    },
    {
      Title: "Central Intelligence",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Charlie and the Chocolate Factory",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-11",
      HasDigital: false
    },
    {
      Title: "Charlie's Angels: Full Throttle",
      Link: "",
      Category: "Action Comedy",
      Format: "DVD",
      Case: "TWO-2",
      HasDigital: false
    },
    {
      Title: "Cinderella Man",
      Link: "",
      Category: "Sports Drama",
      Format: "DVD",
      Case: "ONE-22",
      HasDigital: false
    },
    {
      Title: "Clerk's II",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "ONE-4",
      HasDigital: false
    },
    {
      Title: "Click",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-4",
      HasDigital: false
    },
    {
      Title: "Close Encounters of the Third Kind",
      Link: "",
      Category: "Si-Fi",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "Conan O'Brian's 10th Anniversary Show",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-14",
      HasDigital: false
    },
    {
      Title: "Concussion",
      Link: "",
      Category: "Sports Drama",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Copout",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-1",
      HasDigital: false
    },
    {
      Title: "Corky Romano",
      Link: "",
      Category: "Silly Comedy",
      Format: "DVD",
      Case: "ONE-12",
      HasDigital: false
    },
    {
      Title: "Crazy Stupid Love",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-1",
      HasDigital: false
    },
    {
      Title: "Curious George",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-11",
      HasDigital: false
    },
    {
      Title: "Dances with Wolves",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-22",
      HasDigital: false
    },
    {
      Title: "Dawn of the Planet of the Apes",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Dazed and Confused",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-7",
      HasDigital: false
    },
    {
      Title: "Deadpool",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Definitely, Maybe",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-1",
      HasDigital: false
    },
    {
      Title: "Derailed",
      Link: "",
      Category: "Suspense",
      Format: "DVD",
      Case: "ONE-24",
      HasDigital: false
    },
    {
      Title: "Detroit Rock City",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-8",
      HasDigital: false
    },
    {
      Title: "Die Hard",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Die Hard 2",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Die Hard with a Vengeance",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Dirty Dancing",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-2",
      HasDigital: false
    },
    {
      Title: "Dirty Grandpa",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Doctor Strange",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Dodge Ball",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Dogma",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "ONE-5",
      HasDigital: false
    },
    {
      Title: "Don Juan DeMarco",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Down to Earth",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-7",
      HasDigital: false
    },
    {
      Title: "Due Date",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-11",
      HasDigital: false
    },
    {
      Title: "Dumbo",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Dumbo",
      Link: "",
      Category: "Disney",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "E.T.",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-21",
      HasDigital: false
    },
    {
      Title: "Elf",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-13",
      HasDigital: false
    },
    {
      Title: "Euro Trip",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-9",
      HasDigital: false
    },
    {
      Title: "Ever After",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-4",
      HasDigital: false
    },
    {
      Title: "Fantasic Beasts and Where to Find Them",
      Link: "",
      Category: "Family",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Fast Times at Ridgemont High",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-8",
      HasDigital: false
    },
    {
      Title: "Ferris Buller's Day Off",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-13",
      HasDigital: false
    },
    {
      Title: "Fever Pitch",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-6",
      HasDigital: false
    },
    {
      Title: "Finding Dory",
      Link: "",
      Category: "Family",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Finding Nemo",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-9",
      HasDigital: false
    },
    {
      Title: "Five Man Video Band",
      Link: "",
      Category: "Live Concert",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Flight",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE-15",
      HasDigital: false
    },
    {
      Title: "Fly Boys",
      Link: "",
      Category: "War Drama",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Fools Rush In",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-6",
      HasDigital: false
    },
    {
      Title: "Forest Gump",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-16",
      HasDigital: false
    },
    {
      Title: "Forgetting Sara Marshall",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Forgetting Sara Marshall",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Freaky Friday",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-10",
      HasDigital: false
    },
    {
      Title: "Friday",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-1",
      HasDigital: false
    },
    {
      Title: "Friends with Money",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Frozen",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Gangs of New York",
      Link: "",
      Category: "Historical Drama",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Geronimo",
      Link: "",
      Category: "Historical Drama",
      Format: "DVD",
      Case: "TWO-19",
      HasDigital: false
    },
    {
      Title: "Get Him to the Greek",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-6",
      HasDigital: false
    },
    {
      Title: "Ghostbusters",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-16",
      HasDigital: false
    },
    {
      Title: "Ghostbusters 2",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-16",
      HasDigital: false
    },
    {
      Title: "Ghostbusters: Answer the Call",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-5",
      HasDigital: false
    },
    {
      Title: "Glengarry GlenRoss",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-17",
      HasDigital: false
    },
    {
      Title: "Gone Girl",
      Link: "",
      Category: "Suspense",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Good Will Hunting",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE-16",
      HasDigital: false
    },
    {
      Title: "Grandman's Boy",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-3",
      HasDigital: false
    },
    {
      Title: "Grease",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-8",
      HasDigital: false
    },
    {
      Title: "Grind",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-19",
      HasDigital: false
    },
    {
      Title: "Guardians of the Galaxy",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Guardians of the Galaxy Vol. II",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Half Nelson",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Harold & Kumar: Escape from Guantanamo Bay",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-12",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Chamber of Secrets",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Chamber of Secrets",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-25",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Deathly Hallows: Part I",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Deathly Hallows: Part I",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Harry Potter and the Deathly Hallows: Part II",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Harry Potter and the Deathly Hallows: Part II",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-26",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Goblet of Fire",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-25",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Half Blood Prince",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Harry Potter and the Half Blood Prince",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-26",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Order of the Phoenix",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Order of the Phoenix",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-26",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Prizoner of Azkaban",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-25",
      HasDigital: false
    },
    {
      Title: "Harry Potter and the Sorcerer's Stone",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "ONE-25",
      HasDigital: false
    },
    {
      Title: "Heartbreakers",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-3",
      HasDigital: false
    },
    {
      Title: "Hellboy  II",
      Link: "",
      Category: "Superhero",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Hellboy  II",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Hocus Pocus",
      Link: "",
      Category: "Holiday",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Hollywood Ending",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Hollywoodland",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Home Alone",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-13",
      HasDigital: false
    },
    {
      Title: "Home Alone 2",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-14",
      HasDigital: false
    },
    {
      Title: "Home Alone 3",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-14",
      HasDigital: false
    },
    {
      Title: "Horrible Bosses",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Hot Tub Time Machine",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-2",
      HasDigital: false
    },
    {
      Title: "How the Grinch Stole Christmas",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-12/VUDU",
      HasDigital: false
    },
    {
      Title: "How to Lose a Guy in 10 Days",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "I am Legend",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "ONE_17",
      HasDigital: false
    },
    {
      Title: "I Now Pronounce You Chuck and Larry",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-2",
      HasDigital: false
    },
    {
      Title: "Ice Age",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-12",
      HasDigital: false
    },
    {
      Title: "Ice Age: The Meltdown",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-12",
      HasDigital: false
    },
    {
      Title: "Inception",
      Link: "",
      Category: "Drama",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Inferno",
      Link: "",
      Category: "Suspense",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Intersellar",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Jackass 2",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Jay and Silent Bob Strike Back",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "ONE-2",
      HasDigital: false
    },
    {
      Title: "John Tucker Must Die",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-2",
      HasDigital: false
    },
    {
      Title: "Juno",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "ONE-6",
      HasDigital: false
    },
    {
      Title: "Jurassic Park",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Jurassic Park: The Lost World",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Jurassic World",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Just Like Heaven",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-6",
      HasDigital: false
    },
    {
      Title: "Killer Clowns from Outer Space",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-19",
      HasDigital: false
    },
    {
      Title: "Kingsman: The Secret Service",
      Link: "",
      Category: "Action Comedy",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "KISS Exposed",
      Link: "",
      Category: "Documentary",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Kiss the Girl",
      Link: "",
      Category: "Suspense",
      Format: "DVD",
      Case: "ONE-23",
      HasDigital: false
    },
    {
      Title: "Knocked Up",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-13",
      HasDigital: false
    },
    {
      Title: "Layer Cake",
      Link: "",
      Category: "Heist",
      Format: "DVD",
      Case: "ONE-18",
      HasDigital: false
    },
    {
      Title: "Legally Blonde",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-3",
      HasDigital: false
    },
    {
      Title: "Lego Moive",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Letters to Juliet",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-6",
      HasDigital: false
    },
    {
      Title: "Lion King",
      Link: "",
      Category: "Disney",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Live Free or Die Hard",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Logan",
      Link: "",
      Category: "Superhero",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Lord of the Rings: Fellowship of the Ring",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Lord of the Rings: Fellowship of the Ring",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-24",
      HasDigital: false
    },
    {
      Title: "Lord of the Rings: The Return of the King",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Lord of the Rings: The Two Towers",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Love Actually",
      Link: "",
      Category: "Holiday",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Made of Honor",
      Link: "",
      Category: "Romantic Comedy",
      Format: "DVD",
      Case: "TWO-5",
      HasDigital: false
    },
    {
      Title: "Mama Mia!",
      Link: "",
      Category: "Musical",
      Format: "DVD",
      Case: "TWO-1",
      HasDigital: false
    },
    {
      Title: "Mary Poppins",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "TWO-9/VUDU",
      HasDigital: false
    },
    {
      Title: "Midnight Express",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE",
      HasDigital: false
    },
    {
      Title: "Midnight in Paris",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Miracle on 34th Street",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-13",
      HasDigital: false
    },
    {
      Title: "Miss Congeniality",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-4",
      HasDigital: false
    },
    {
      Title: "Miss Congeniality 2",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-4",
      HasDigital: false
    },
    {
      Title: "Monster-in-Law",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO-3",
      HasDigital: false
    },
    {
      Title: "Moulin Rouge",
      Link: "",
      Category: "Musical",
      Format: "DVD",
      Case: "TWO-5",
      HasDigital: false
    },
    {
      Title: "Mr. & Mrs. Smith",
      Link: "",
      Category: "Action",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Mr. Deeds",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-5",
      HasDigital: false
    },
    {
      Title: "MUD",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Murder by Death",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "National Lampoon's Christmas Vacation",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-14",
      HasDigital: false
    },
    {
      Title: "National Treasure",
      Link: "",
      Category: "Action",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "No Country for Old Men",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-16",
      HasDigital: false
    },
    {
      Title: "Now You See Me",
      Link: "",
      Category: "Heist",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "One Last Thing",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Pacific Rim",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Passengers",
      Link: "",
      Category: "Drama",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Pineapple Express",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-15",
      HasDigital: false
    },
    {
      Title: "Pitch Black",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-23",
      HasDigital: false
    },
    {
      Title: "Pitch Perfect",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Pitch Perfect 2",
      Link: "",
      Category: "Comedy",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "Predator  2",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-23",
      HasDigital: false
    },
    {
      Title: "Pride and Predjudice",
      Link: "",
      Category: "Romancec",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Ratatouille",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "TWO-9",
      HasDigital: false
    },
    {
      Title: "Red",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Remember the Titans",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-8",
      HasDigital: false
    },
    {
      Title: "Reservoir Dogs",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-17",
      HasDigital: false
    },
    {
      Title: "Rio",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "TWO-8",
      HasDigital: false
    },
    {
      Title: "Rise of the Planet of the Apes",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Robin Hood",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "TWO-10/VUDU",
      HasDigital: false
    },
    {
      Title: "Rock Star",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-19",
      HasDigital: false
    },
    {
      Title: "Rough Night",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-9",
      HasDigital: false
    },
    {
      Title: "Saturday Night Live: The Best of Chris Farley",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-8",
      HasDigital: false
    },
    {
      Title: "Saving Silverman",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Scarface",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Secondhand Lions",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Seven Wonders of the World",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Shallow Hal",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-3",
      HasDigital: false
    },
    {
      Title: "Shampoo",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "Sherlock Holmes",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Sherlock Holmes",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Sherlock Holmes: A Game of Shadows",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-17",
      HasDigital: false
    },
    {
      Title: "She's Out of My League",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-10",
      HasDigital: false
    },
    {
      Title: "Sing",
      Link: "",
      Category: "",
      Format: "BLUERAY/4K UltraHD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Sixteen Candles",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-7",
      HasDigital: false
    },
    {
      Title: "Skyfall 007",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-18",
      HasDigital: false
    },
    {
      Title: "Slumdog Millionaire",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-18",
      HasDigital: false
    },
    {
      Title: "Snatch",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-18",
      HasDigital: false
    },
    {
      Title: "Space Jam",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-10",
      HasDigital: false
    },
    {
      Title: "Spiderman: Homecoming",
      Link: "",
      Category: "Superhero",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Spiderman: Homecoming",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Spy",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-11",
      HasDigital: false
    },
    {
      Title: "Star Trek Beyond",
      Link: "",
      Category: "Si-Fi",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Star Trek Beyond",
      Link: "",
      Category: "Si-Fi",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Star Trek Into Darkness",
      Link: "",
      Category: "Si-Fi",
      Format: "DVD",
      Case: "TWO-19",
      HasDigital: false
    },
    {
      Title: "Star Wars: A New Hope",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: Attack of the Clones",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: Empire Strikes Back",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: Return of the Jedi",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: Revenge of the Sith",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: Rogue One",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: The Force Awakens",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Star Wars: The Phantom Menace",
      Link: "",
      Category: "Si-Fi",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Starsky & Hutch",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-5",
      HasDigital: false
    },
    {
      Title: "Step Brothers",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Step Brothers",
      Link: "",
      Category: "Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Stir of Echos",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-20",
      HasDigital: false
    },
    {
      Title: "Straight Outta Compton",
      Link: "",
      Category: "Drama",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Straight Outta Compton",
      Link: "",
      Category: "Drama",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Superbad",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-13",
      HasDigital: false
    },
    {
      Title: "Take the Lead",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-5",
      HasDigital: false
    },
    {
      Title: "Taken",
      Link: "",
      Category: "Suspense",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Taxi Driver",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "The Big Short",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Blind Side",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-16",
      HasDigital: false
    },
    {
      Title: "The Boondock Saints",
      Link: "",
      Category: "Cult Classic",
      Format: "DVD",
      Case: "ONE-15",
      HasDigital: false
    },
    {
      Title: "The Bourne Ultimatum",
      Link: "",
      Category: "Action",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Breakfast Club",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-13",
      HasDigital: false
    },
    {
      Title: "The Brothers Bloom",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-21",
      HasDigital: false
    },
    {
      Title: "The Brothers Grimm",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-17",
      HasDigital: false
    },
    {
      Title: "The Bucket List",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-17",
      HasDigital: false
    },
    {
      Title: "The Buddy Holly Story",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "The Butterfly Effect",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-21",
      HasDigital: false
    },
    {
      Title: "The Croods",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-11",
      HasDigital: false
    },
    {
      Title: "The Dark Night",
      Link: "",
      Category: "Superhero",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Fast and the Furious",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-16",
      HasDigital: false
    },
    {
      Title: "The Fifth Element",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-16",
      HasDigital: false
    },
    {
      Title: "The Fighting Temptations",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "The Ghost of Darkness",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-20",
      HasDigital: false
    },
    {
      Title: "The Girl Next Door",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE",
      HasDigital: false
    },
    {
      Title: "The Good Shepard",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-19",
      HasDigital: false
    },
    {
      Title: "The Goods",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-20",
      HasDigital: false
    },
    {
      Title: "The Goonies",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-10",
      HasDigital: false
    },
    {
      Title: "The Great Mouse Detective",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Groomsmen",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "The Hangover",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Heat",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-11",
      HasDigital: false
    },
    {
      Title: "The Holiday",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "ONE/VUDU",
      HasDigital: false
    },
    {
      Title: "The Ides of March",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Internship",
      Link: "",
      Category: "Comedy",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "The Kingdom",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-22",
      HasDigital: false
    },
    {
      Title: "The Last of the Mohicans",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-15",
      HasDigital: false
    },
    {
      Title: "The Last Picture Show",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "The Last Thing",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "The Lego Movie",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Lego Movie",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Lion King",
      Link: "",
      Category: "Disney",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Lion King",
      Link: "",
      Category: "Disney",
      Format: "DVD",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Love Guru",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-14",
      HasDigital: false
    },
    {
      Title: "The Martian",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "The Miracle",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "The Mummy: Tomb of the Dragon Emperor",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO5",
      HasDigital: false
    },
    {
      Title: "The Muppets Christmas Carol",
      Link: "",
      Category: "Holiday",
      Format: "DVD",
      Case: "TWO-12",
      HasDigital: false
    },
    {
      Title: "The Night Before",
      Link: "",
      Category: "Holiday",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "The Prince & Me",
      Link: "",
      Category: "Romance",
      Format: "DVD",
      Case: "TWO-3",
      HasDigital: false
    },
    {
      Title: "The Princess Diaries",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-9",
      HasDigital: false
    },
    {
      Title: "The Pursuit of Happyness",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-20",
      HasDigital: false
    },
    {
      Title: "The Rocker",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-1",
      HasDigital: false
    },
    {
      Title: "The Sandlot",
      Link: "",
      Category: "Family",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Secret Life of Walter Mitty",
      Link: "",
      Category: "Drama",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "The Social Network",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "The Texas Chainsaw Massacre",
      Link: "",
      Category: "Horror",
      Format: "DVD",
      Case: "ONE-24",
      HasDigital: false
    },
    {
      Title: "The Town",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "The Way We Were",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ORIGINAL",
      HasDigital: false
    },
    {
      Title: "The Wizard of Oz",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-15",
      HasDigital: false
    },
    {
      Title: "The Wolf of Wall Street",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "There's Something About Mary",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-1",
      HasDigital: false
    },
    {
      Title: "This is the End",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-3",
      HasDigital: false
    },
    {
      Title: "Thor: The Dark World",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "DIGITAL",
      HasDigital: false
    },
    {
      Title: "Trancers I",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-17",
      HasDigital: false
    },
    {
      Title: "Trancers II",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-17",
      HasDigital: false
    },
    {
      Title: "Trolls",
      Link: "",
      Category: "Family",
      Format: "BLUERAY/DVD",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Tropic Thunder",
      Link: "",
      Category: "Silly Comedy",
      Format: "DVD",
      Case: "ONE-11",
      HasDigital: false
    },
    {
      Title: "Twilight",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Twilight: Eclipse",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Twlight: New Moon",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Two Weeks Notice",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-4",
      HasDigital: false
    },
    {
      Title: "V for Vandetta",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-17",
      HasDigital: false
    },
    {
      Title: "Van Halen",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE",
      HasDigital: false
    },
    {
      Title: "Van Wilder",
      Link: "",
      Category: "Raunchy Comedy",
      Format: "DVD",
      Case: "ONE-12",
      HasDigital: false
    },
    {
      Title: "Waiting",
      Link: "",
      Category: "",
      Format: "DIGITAL",
      Case: "AMAZON",
      HasDigital: true
    },
    {
      Title: "Watchmen",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-19",
      HasDigital: false
    },
    {
      Title: "Wedding Crashers",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "TWO",
      HasDigital: false
    },
    {
      Title: "Who Framed Roger Rabit",
      Link: "",
      Category: "Family",
      Format: "DVD",
      Case: "TWO-11",
      HasDigital: false
    },
    {
      Title: "Wreck-It Ralph",
      Link: "",
      Category: "Family",
      Format: "DIGITAL",
      Case: "VUDU",
      HasDigital: true
    },
    {
      Title: "X-MEN Origins: Wolverine",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "TWO-18",
      HasDigital: false
    },
    {
      Title: "X-MEN: Days of Future Past",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "X-MEN: First Class",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY/VUDU",
      HasDigital: true
    },
    {
      Title: "Yes Man",
      Link: "",
      Category: "Comedy",
      Format: "DVD",
      Case: "ONE-9",
      HasDigital: false
    },
    {
      Title: "Zero Dark Thirty",
      Link: "",
      Category: "",
      Format: "BLUERAY",
      Case: "BLUERAY",
      HasDigital: false
    },
    {
      Title: "Zombieland",
      Link: "",
      Category: "",
      Format: "DVD",
      Case: "ONE-10",
      HasDigital: false
    }
  ] as CsvJson[]
}

export interface CsvJson {
  Title: string;
  Link: string;
  Case: string;
  HasDigital: boolean;
  Category: string;
  Format: string;
}

export class CsvJSONModel {
  Title: string;
  Link: string;
  Case: string;
  HasDigital: boolean;
  Category: string;
  Format: string;

  constructor(csvJson: CsvJson) {
    if (csvJson) {
      this.Title = csvJson.Title;
      this.HasDigital = csvJson.HasDigital;
      this.Category = csvJson.Category;
      this.Format = csvJson.Format;
      this.Link = csvJson.Link;
      this.Case = csvJson.Case;
    } else {
      return null;
    }
  }

  get videoFormat(): MoviePlatformEnum {
    if (!this.Format) return null;
    switch (this.Format) {
      case "DVD": return MoviePlatformEnum.DVD;
      case "BLUERAY": return MoviePlatformEnum.BLURAY;
      case "BLUERAY/VUDU": return MoviePlatformEnum.VUDU;
      case "AMAZON": return MoviePlatformEnum.AMAZON;
      case "BLUERAY/DVD": {
        if (this.Case.indexOf('BLUERAY/VUDU') > 0) {
          return MoviePlatformEnum.VUDU;
        } else {
          return MoviePlatformEnum.BLURAY;
        }
      }
    }
  }


}







