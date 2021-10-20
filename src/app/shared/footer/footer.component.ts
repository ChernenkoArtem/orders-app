import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCoastItemsInBucket, selectItemsInBucket} from '../../core/store/reducers/categories.reducer';
import {deleteAllItemsFromBucket, deleteItemFromBucket} from '../../core/store/actions/categories.action';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  coast$: Observable<number>;
  itemsInBucket: any[];
  isOpenBucket: boolean;

  constructor(private state: Store<{}>) {
    this.coast$ = state.select(selectCoastItemsInBucket);
    state.select(selectItemsInBucket).subscribe(value => this.itemsInBucket = value);
  }

  ngOnInit(): void {
  }

  public toggleBucket(): void {
    this.isOpenBucket = !this.isOpenBucket;
  }

  public deleteItem(itemId: number): void {
    this.state.dispatch(deleteItemFromBucket({itemId}));
  }

  public deleteAllItems(): void {
    this.state.dispatch(deleteAllItemsFromBucket());
  }
}
