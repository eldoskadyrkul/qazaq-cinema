import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MoviesService} from '../../service/movies.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DatabaseModel} from '../../models/database-model';
import {Store} from '@ngrx/store';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs-compat/add/operator/takeUntil';
import {DomSanitizer} from '@angular/platform-browser';
import {CastService} from '../../service/cast.service';
import {CastDatabase} from '../../models/cast-database';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit, OnDestroy {

  public pageISReady = false;
  public movie;
  public genres;
  public castList;
  public movieList;
  public showGenre;
  private videoEmbedUrl = 'https://youtube.com/embed/';

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private castService: CastService,
    private route: ActivatedRoute,
    private store: Store<DatabaseModel>,
    private storeCast: Store<CastDatabase>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getAboutMovies();
    this.getCastMovies();
    this.getGenres();
    this.getActors();
  }

  ngOnDestroy() {
    this.ngUnscribe.next();
    this.ngUnscribe.complete();
  }

  videoTrailerURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoEmbedUrl + this.movie.trailerFilms);
  }

  getAboutMovies() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getMoviesID(+params.get('id'))
      )
      .takeUntil(this.ngUnscribe)
      .subscribe(movie => {
        this.movie = movie;
        this.pageISReady = true;
        this.storeCast.dispatch({type: 'SEE A MOVIE'});
      });
  }

  getCastMovies() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.castService.getActorsID(+params.get('movie_id')))
      .takeUntil(this.ngUnscribe)
      .subscribe(cast => {
        this.castList = cast;
        this.store.dispatch({type: 'SEE A MOVIE'});
      });
  }

  getActors() {
    this.castService.getActorsMovie()
      .takeUntil(this.ngUnscribe)
      .subscribe(casts => {
        this.castList = Object.keys(casts);
      });
  }

  getGenres() {
    this.service.getGenres()
      .takeUntil(this.ngUnscribe)
      .subscribe(genres => {
        this.genres = Object.keys(genres);
      });
  }

  setGenre(genre) {
    this.showGenre ! = genre ? this.showGenre = genre : this.showGenre = null;
    this.store.dispatch({type: 'FILTER_MOVIES'});
  }



}
