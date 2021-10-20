import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FoodService} from '../../services/food.service';
import {exhaustMap, map} from 'rxjs/operators';
import {randomizer} from '../../../app.module';
import {SuccessBurgersList} from '../actions/categories.action';

@Injectable()
export class CategoriesEffects {

  loadBurgersList = createEffect(() => this.actions$.pipe(
      ofType('[Categories page] getBurgersList'),
      exhaustMap(() => this.foodService.getFood()
        .pipe(
          map(burgers => {
            return burgers.map((item, index) => {
              return {...item, type: randomizer(), number: 1, coast: index * 1.5};
            });
          }),
          map((val) => SuccessBurgersList({foods: val}))
        )
      )
    )
  );

  constructor(
    private foodService: FoodService,
    private actions$: Actions
  ) {
  }
}
