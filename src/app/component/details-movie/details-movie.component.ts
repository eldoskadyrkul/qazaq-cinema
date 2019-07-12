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

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit, OnDestroy {

  public pageISReady = false;
  public movie;
  private videoEmbedUrl = 'https://youtube.com/embed/';

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private route: ActivatedRoute,
    private store: Store<DatabaseModel>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getAboutMovies();
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
        this.store.dispatch({type: 'SEE A MOVIE'});
      });
  }



}
