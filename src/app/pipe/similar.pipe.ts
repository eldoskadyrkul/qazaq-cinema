import { Pipe, PipeTransform } from '@angular/core';
import {MovieModel} from '../models/movie-model';

@Pipe({
  name: 'similar',
  pure: false
})
export class SimilarPipe implements PipeTransform {

  transform(items: MovieModel[], filterSimilar: MovieModel): any {
    if (items == null) {
      return items;
    }

    items.filter(item => item.genres.find(genre => genre.name === filterSimilar.name) != undefined);
  }
}
