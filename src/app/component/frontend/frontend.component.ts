import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieModel} from '../../models/movie-model';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {MoviesService} from '../../service/movies.service';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit, OnDestroy {

  public movieList;
  public genres;
  public banner;
  public searchPhrase = '';
  public showGenre;
  public showDropdown = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private database: MoviesService,
    private store: Store<DatabaseModel>
  ) { }

  ngOnInit() {
    this.getMovieList();
    this.getGenres();
    this.setBanner();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getMovieList() {
    this.database.getMovies()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(movies => {
        this.movieList = movies;
        this.store.dispatch({type: 'LOAD_SUCCEEDED'});
      });
  }

  getGenres() {
    this.database.getGenres()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(genres => {
        this.genres = Object.keys(genres);
      });
  }

  setGenre(genre) {
    this.showGenre ! = genre ? this.showGenre = genre : this.showGenre = null;
    this.store.dispatch({type: 'FILTER_MOVIES'});
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSearch(value) {
    this.searchPhrase = value;
    this.store.dispatch({type: 'SEARCH_MOVIES'});
  }

  setBanner() {
    this.database.getMoviesID(24)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(movie => this.banner = movie);
  }
}
