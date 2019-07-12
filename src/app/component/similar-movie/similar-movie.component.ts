import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../service/movies.service';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';
import {Subject} from 'rxjs';
import {element} from 'protractor';
import {equal} from 'assert';

@Component({
  selector: 'app-similar-movie',
  templateUrl: './similar-movie.component.html',
  styleUrls: ['./similar-movie.component.scss']
})
export class SimilarMovieComponent implements OnInit {

  public movieList;
  public movie;
  public showSimilarMovie;
  private genreSimilar;

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private store: Store<DatabaseModel>,
  ) { }

  ngOnInit() {
    this.getSimilarMovies();
  }

  getSimilarMovies() {

  }

  setSimilarMovies(genre) {
    this.showSimilarMovie ! = genre.movie.genres ? this.showSimilarMovie = genre.movie.genres : this.showSimilarMovie = null;
    this.store.dispatch({type: 'SIMILAR MOVIE'});
  }

}
