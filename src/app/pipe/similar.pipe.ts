import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'similar',
  pure: false
})
export class SimilarPipe implements PipeTransform {

  transform(items: any[], filterSimilar: any[]): any {
    if (items == null) {
      return items;
    } else {
      return items.filter(item => item.genres.includes(filterSimilar));
    }

  }
}
