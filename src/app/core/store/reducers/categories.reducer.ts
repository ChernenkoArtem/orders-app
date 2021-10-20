import {createReducer, createSelector, on} from '@ngrx/store';
import * as CategoriesPageActions from '../actions/categories.action';
import {Food} from '../../models/food.model';

export interface State {
  filter: string;
  food: Food[];
  filteredFood: Food[];
  selected: Food;
  bucket: {
    items: Food[];
    coast: number
  };
}

export const initialState: State = {
  filter: '',
  food: [],
  filteredFood: [],
  selected: {
    id: 0,
    name: '',
    description: '',
    ingredients: '',
    type: '',
    number: 0,
    coast: 0
  },
  bucket: {
    items: [],
    coast: 0,
  }
};

const findElemById = (state: State, findElem) => {
  return state.bucket.items.find(elem => elem.id === findElem);
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
    {
      ...state,
      bucket: {
        coast: state.bucket.coast + itemm.item.coast,
        items: findElemById(state, itemm.item.id)
          ? [...state.bucket.items.filter(elem => elem.id !== itemm.item.id), {...itemm.item, number : findElemById(state, itemm.item.id).number + 1}]
          : [...state.bucket.items, itemm.item]
      }
    })),
  on(CategoriesPageActions.deleteItemFromBucket, (state, item) => (
    {
      ...state,
      bucket: {
        coast: state.bucket.coast - (findElemById(state, item.itemId).coast * findElemById(state, item.itemId).number ),
        items: state.bucket.items.filter((elem) => elem.id !== item.itemId)
      }
    })),
  on(CategoriesPageActions.deleteAllItemsFromBucket, (state) => (
    {
      ...state,
      bucket: {
        coast: 0,
        items: []
      }
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
export const selectItemsInBucket = createSelector(
  selectFeature,
  (state: State) => state.bucket.items
);
export const selectCoastItemsInBucket = createSelector(
  selectFeature,
  (state: State) => state.bucket.coast
);
