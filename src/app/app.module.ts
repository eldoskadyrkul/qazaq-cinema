import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { FrontendComponent } from './component/frontend/frontend.component';
import {HttpClientModule} from '@angular/common/http';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { SearchFilmsComponent } from './component/search-films/search-films.component';
import { DetailsMovieComponent } from './component/details-movie/details-movie.component';
import { SearchPipe } from './pipe/search.pipe';
import { GenrePipe } from './pipe/genre.pipe';
import { routes } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {movieList} from './reducer_movie/movie-list';
import {StoreModule} from '@ngrx/store';
import { HeaderComponent } from './component/header/header.component';
import { SimilarPipe } from './pipe/similar.pipe';
import { SimilarMovieComponent } from './component/similar-movie/similar-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontendComponent,
    SearchFilmsComponent,
    DetailsMovieComponent,
    SearchPipe,
    GenrePipe,
    HeaderComponent,
    SimilarPipe,
    SimilarMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    CarouselModule.forRoot(),
    StoreModule.forRoot({
      movieList
    }),
    RouterModule.forRoot(
      routes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
