import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoodService} from '../../core/services/food.service';
import {randomizer} from '../../app.module';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public filter: string;
  public food: [];
  public filteredFood: [];
  private foodSubj = new Subject<[]>();

  constructor(
    private router: ActivatedRoute,
    private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.currentPage();
    this.foodService.burgers()
      .pipe(
        map(burgers => {
          return burgers.map((item) => {
            return {...item, type: randomizer()};
          });
        })
      )
      .subscribe(burgers => {
        this.food = burgers;
        this.foodSubj.next(this.filterFood(burgers));
      });
    this.foodSubj.subscribe(value => this.filteredFood = value);
  }

  public filterFood(foods): any {
    this.currentPage();
    this.foodSubj.next(foods.filter((food) => food.type === this.filter));
    console.log(foods.filter((food) => food.type === this.filter))
  }
  private currentPage(): void {
    this.filter = this.router.snapshot.firstChild?.data.filter || this.router.snapshot.data.filter;
  }

}
