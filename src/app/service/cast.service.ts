import { Injectable } from '@angular/core';
import {castList} from './cast';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  cast: any = castList;

  getActors(): Observable<any> {
    return of(this.cast);
  }

  getActorsID(id): Observable<any> {
    const selectActors = this.cast.filter(cast => cast.id === id);
    return of(selectActors[0]);
  }
}
