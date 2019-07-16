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
    // @ts-ignore
    return items.filter(item => item.genres != filterSimilar);
  }
}
