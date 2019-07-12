import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../service/movies.service';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';
import {Subject} from 'rxjs';
import {element} from 'protractor';
import {equal} from 'assert';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-similar-movie',
  templateUrl: './similar-movie.component.html',
  styleUrls: ['./similar-movie.component.scss']
})
export class SimilarMovieComponent implements OnInit {

  public movieList;
  public movie;
  public showSimilarMovie;

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private store: Store<DatabaseModel>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getSimilarMovies();
  }

  getSimilarMovies() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getSimilarGenres(+params.get('genres'))
      )
      .takeUntil(this.ngUnscribe)
      .subscribe(movie => {
        this.movie = movie;
        this.store.dispatch({type: 'SIMILAR MOVIE'});
      });
  }

  setSimilarMovies(genre) {
    this.showSimilarMovie ! = genre.movie.genres ? this.showSimilarMovie = genre.movie.genres : this.showSimilarMovie = null;
    this.store.dispatch({type: 'SIMILAR MOVIE'});
  }

}
