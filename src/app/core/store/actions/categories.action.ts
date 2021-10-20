import {createAction, props} from '@ngrx/store';
import {Food} from '../../models/food.model';

export const getBurgersList = createAction('[Categories page] getBurgersList');
export const SuccessBurgersList = createAction('[Categories page] BurgersList', props<{ foods: Food[] }>());
export const filterBurgers = createAction('[Categories page] filterBurgers');
export const currentPageName = createAction('[Categories page] CurrentPageName');
export const takeCurrentPageName = createAction('[Categories page] takeCurrentPageName', props<{ navTo: string }>());
export const currentSelectItem = createAction('[Categories page] currentSelectItem', props<{ currentItem: Food }>());
export const addToBucket = createAction('[Categories page] addToBucket', props<{ item: any }>());
export const deleteItemFromBucket = createAction('[Categories page] deleteItemFromBucket', props<{ itemId: number }>());
export const deleteAllItemsFromBucket = createAction('[Categories page] deleteAllItemFromBucket');
