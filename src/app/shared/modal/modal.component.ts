import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentItem} from '../../core/store/reducers/categories.reducer';
import {Subscription} from 'rxjs';
import {addToBucket} from '../../core/store/actions/categories.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public currentItem;
  private currentItemSub: Subscription;

  constructor(private store: Store<{}>) {
    this.currentItemSub = this.store.select(selectCurrentItem).subscribe(value => this.currentItem = value);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.currentItemSub.unsubscribe();
  }


  public addToBucket(): void {
    this.store.dispatch(addToBucket({item: this.currentItem}));
  }
}
