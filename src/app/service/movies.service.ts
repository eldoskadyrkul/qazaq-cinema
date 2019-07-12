import { Injectable } from '@angular/core';
import {genreType} from '../models/genre-types.module';
import {Observable, of} from 'rxjs';
import { moviesList } from './movie-list';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movieList: any = moviesList;
  genres = genreType;

  getMovies(): Observable<any> {
    return of(this.movieList);
  }

  getMoviesID(id): Observable<any> {
    const selectMovie = this.movieList.filter(movie => movie.id === id);
    return of(selectMovie[0]);
  }

  getGenres(): Observable<any> {
    return of(this.genres);
  }

  getSimilarGenres(genres): Observable<any> {
    return of(genres);
  }


}
