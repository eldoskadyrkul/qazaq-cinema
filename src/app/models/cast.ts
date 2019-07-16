import {MovieModel} from './movie-model';

export interface Cast {
  id: number;
  cast: Array<any>;
  image: string;
  movie_id: MovieModel[];
}
