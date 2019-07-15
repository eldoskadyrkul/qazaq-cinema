import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'similar',
  pure: false
})
export class SimilarPipe implements PipeTransform {

  transform(items: any[], filterSimilar: any): any {
    if (items || !filterSimilar) {
      return items;
    }
    return items.filter(item => item.genres.indexOf(filterSimilar.genres) > -1);
  }

}
