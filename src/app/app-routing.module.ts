import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontendComponent} from './component/frontend/frontend.component';
import {DetailsMovieComponent} from './component/details-movie/details-movie.component';
import {MovieModel} from './models/movie-model';
import {SimilarMovieComponent} from './component/similar-movie/similar-movie.component';


export const routes: Routes = [
  {path: '', redirectTo: '/movie', pathMatch: 'full'},
  { path: 'movie', component: FrontendComponent },
  { path: 'movie/:id', component: DetailsMovieComponent},
  { path: 'movie/:genres', component: SimilarMovieComponent},
  {
    path: '**',
    redirectTo: '/movie'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
