import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../service/movies.service';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';
import {Subject} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs-compat/add/operator/filter';

// @ts-ignore
@Component({
  selector: 'app-similar-movie',
  templateUrl: './similar-movie.component.html',
  styleUrls: ['./similar-movie.component.scss'],
})
export class SimilarMovieComponent implements OnInit {

  public movieList;
  public movie;
  public genres;
  public showSimilarMovie;

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private store: Store<DatabaseModel>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getMovies();
    this.getGenresURL();
  }

  getGenresURL() {
    this.route.queryParams
      .filter(params => params.genres)
      .subscribe((params) => {
        this.showSimilarMovie = params;
      });
  }

  getMovies() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getSimilarGenres(params.get('id'))
      )
      .takeUntil(this.ngUnscribe)
      .subscribe(movie => {
        this.movie = movie;
        this.store.dispatch({type: 'SEE A MOVIE'});
      });
  }

  setSimilarMovies(genre) {
    this.showSimilarMovie != genre ? this.showSimilarMovie = genre : this.showSimilarMovie = null;
    this.store.dispatch({type: 'SIMILAR MOVIE'});
  }

}
