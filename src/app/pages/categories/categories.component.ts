import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectBurgersList, selectFilteredList} from '../../core/store/reducers/categories.reducer';
import {currentSelectItem, filterBurgers, getBurgersList, takeCurrentPageName} from '../../core/store/actions/categories.action';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../shared/modal/modal.component';
import {getUserByTokenAction} from '../../core/store/actions/auth.action';
import {Food} from '../../core/models/food.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public food: Food[];
  public filteredFood: Food[];

  constructor(
    private router: ActivatedRoute,
    private store: Store<{}>,
    public dialog: MatDialog
  ) {
    this.store.dispatch(getUserByTokenAction());
    this.store.dispatch(takeCurrentPageName({navTo: this.currentPage(null)}));
    this.store.dispatch(getBurgersList());
  }

  ngOnInit(): void {
    this.store.select(selectBurgersList).subscribe(value => {
      if (value) {
        console.log(value);
        this.food = value;
        this.store.dispatch(filterBurgers());
      }
    });
    this.store.select(selectFilteredList).subscribe(value => this.filteredFood = value);
  }

  public filterFood(event): any {
    this.store.dispatch(takeCurrentPageName({navTo: this.currentPage(event.toLowerCase())}));
    this.store.dispatch(filterBurgers());
  }

  private currentPage(navTo: string): string {
    return navTo || (this.router.snapshot.firstChild?.data.filter || this.router.snapshot.data.filter);
  }

  public selectItem(item: any): void {
    this.store.dispatch(currentSelectItem({currentItem: item}));
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
