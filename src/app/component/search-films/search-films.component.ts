import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search-films',
  templateUrl: './search-films.component.html',
  styleUrls: ['./search-films.component.scss']
})
export class SearchFilmsComponent implements OnInit {

  @ViewChild('searchInput', null) searchInput: ElementRef;
  @Output() searchChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    fromEvent(
      this.searchInput.nativeElement, 'keyup'
    )
      .debounceTime(500)
      .distinctUntilChanged()
      .map(
        (event: KeyboardEvent) =>
          (event.target as HTMLInputElement).value

      ).subscribe(value => this.searchChange.emit(value));
  }


}
