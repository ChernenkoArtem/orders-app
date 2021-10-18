import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCoastItemsInBucket} from '../../core/store/reducers/categories.reducer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  coast$: Observable<number>;

  constructor(private state: Store<{}>) {
   this.coast$ = state.select(selectCoastItemsInBucket);
  }

  ngOnInit(): void {
  }

}
