import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'similar',
  pure: false
})
export class SimilarPipe implements PipeTransform {

  transform(items: any[], filterSimilar: string): any {
    if (items == null) {
      return items;
    }
    return items.filter(item => item.genres === filterSimilar);
  }
}
