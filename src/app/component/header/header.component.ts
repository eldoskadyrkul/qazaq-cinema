import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {DatabaseModel} from '../../models/database-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchPhrase = '';

  constructor(private store: Store<DatabaseModel>) { }

  ngOnInit() {
  }

  onSearch(value) {
    this.searchPhrase = value;
    this.store.dispatch({type: 'SEARCH_MOVIES'});
  }

}
