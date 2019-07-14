import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'similar'
})
export class SimilarPipe implements PipeTransform {

  transform(value: any, type: any): any {
    if (type == null) {
      return value;
    } else {
      return value.filter(item => item.genres.includes(type));
    }
  }

}
