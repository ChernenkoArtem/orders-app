import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCoastItemsInBucket, selectItemsInBucket} from '../../core/store/reducers/categories.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectUser} from '../../core/store/reducers/auth.reducer';
import {deleteItemFromBucket} from '../../core/store/actions/categories.action';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  orderForm: FormGroup;
  coast$: Observable<number>;
  itemsInBucket: any[];
  user: any;
  constructor(
      private state: Store<{}>,
      private fb: FormBuilder) {
    this.coast$ = state.select(selectCoastItemsInBucket);
    state.select(selectItemsInBucket).subscribe(value => this.itemsInBucket = value);
    state.select(selectUser).subscribe(user => this.user = user);
  }


  ngOnInit(): void {
    this.initForm();
    console.log(this.user);
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      email: this.fb.control(this.user.email, [Validators.required]),
      phone: this.fb.control('+38', [Validators.required]),
      payType: this.fb.control('', [Validators.required]),
      textArea: this.fb.control('')
    });
  }

  public confirmOrder(): void {

  }

  public deleteItem(itemId: number): void {
    this.state.dispatch(deleteItemFromBucket({itemId}));
  }
}
