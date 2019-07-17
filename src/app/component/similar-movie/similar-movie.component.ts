import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../service/movies.service';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';
import {Subject} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs-compat/add/operator/filter';

function search(nameKey, myArray){
  for (var i=0; i <= myArray.length; i++) {
    console.log(myArray[i])
    if (myArray[i].genres === nameKey) {
      console.log(myArray[i])
      return myArray[i];
    }
  }
}
@Component({
  selector: 'app-similar-movie',
  templateUrl: './similar-movie.component.html',
  styleUrls: ['./similar-movie.component.scss'],
})
export class SimilarMovieComponent implements OnInit, OnDestroy {

  public movieList;
  public movie;
  public genres;
  public showGenre;
  public similarMovie;
  public showDropdown = false;

  private  ngUnscribe: Subject<void> = new Subject<void>();

  constructor(
    private service: MoviesService,
    private store: Store<DatabaseModel>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
    this.getSimilarGenres();
  }

  ngOnDestroy() {
    this.ngUnscribe.next();
    this.ngUnscribe.complete();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  getMovies() {
    this.service.getMovies()
      .takeUntil(this.ngUnscribe)
      .subscribe(movies => {
        const a = Object.values(movies);
        this.movieList = a;
        this.store.dispatch({type: 'LOAD_SUCCEEDED'});
      });
  }

  getGenres() {
    const a = this.service.getSimilar()
      .subscribe(genres => {
        const a = Object.values(genres);
        this.genres = a;
      });
    return a;
  }

  getSimilarGenres() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getMoviesID(+params.get('id'))
      )
      .takeUntil(this.ngUnscribe)
      .subscribe(movies => {
        const a = Object.values(movies);
        this.movie = a;
        this.similarMovie = search(a[4], this.movieList);
      });
  }


  setGenre(genre) {
    this.showGenre ! = genre ? this.showGenre = genre : this.showGenre = null;
    this.store.dispatch({type: 'FILTER_MOVIES'});
  }

}
