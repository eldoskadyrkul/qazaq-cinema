import { Injectable } from '@angular/core';
import {castList} from './cast';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  cast: any = castList;
  castList: any = castList;
  http: HttpClient;

  getActors(): Observable<any> {
    return of(this.cast);
  }

  getActorsID(id): Observable<any> {
    const selectActors = this.cast.filter(cast => cast.id === id);
    return of(selectActors[0]);
  }

  getActorsMovie(): Observable<any> {
    return of(this.castList);
  }
}
