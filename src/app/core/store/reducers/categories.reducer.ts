import {createReducer, createSelector, on} from '@ngrx/store';
import * as CategoriesPageActions from '../actions/categories.action';

export interface State {
  filter: string;
  food: any[];
  filteredFood: any[];
  selected: any;
  bucket: {
    items: any[];
    coast: number
  };
}

export const initialState: State = {
  filter: '',
  food: [],
  filteredFood: [],
  selected: {},
  bucket: {
    items: [],
    coast: 0,
  }
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesPageActions.getBurgersList, (state) => ({...state})),
  on(CategoriesPageActions.SuccessBurgersList, (state, result) => ({...state, food: result.foods})),
  on(CategoriesPageActions.currentPageName, (state) => ({...state})),
  on(CategoriesPageActions.takeCurrentPageName, (state, result) => ({...state, filter: result.navTo})),
  on(CategoriesPageActions.filterBurgers, (state) => (
    {
      ...state, filteredFood: state.food.filter((food) => {
        if (state.filter === 'all') {
          return food;
        }
        return state.filter === food.type;
      })
    })
  ),
  on(CategoriesPageActions.currentSelectItem, (state, result) => ({...state, selected: result.currentItem})),
  on(CategoriesPageActions.addToBucket, (state, itemm) => (
    {...state,
      bucket: {coast: state.bucket.coast + itemm.item.coast, items: [...state.bucket.items, itemm.item]}
    })),
);

export const selectFeature = (state) => state.categories;

export const selectBurgersList = createSelector(
  selectFeature,
  (state: State) => state.food
);
export const selectFilteredList = createSelector(
  selectFeature,
  (state: State) => state.filteredFood
);
export const selectCurrentPage = createSelector(
  selectFeature,
  (state: State) => state.filter
);
export const selectCurrentItem = createSelector(
  selectFeature,
  (state: State) => state.selected
);

export const selectCoastItemsInBucket = createSelector(
  selectFeature,
  (state: State) => state.bucket.coast
);
