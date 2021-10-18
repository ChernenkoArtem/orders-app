import { createAction, props } from '@ngrx/store';

export const getBurgersList = createAction('[Categories page] getBurgersList');
export const SuccessBurgersList = createAction('[Categories page] BurgersList', props<{foods: []}>());
export const filterBurgers = createAction('[Categories page] filterBurgers');
export const currentPageName = createAction('[Categories page] CurrentPageName');
export const takeCurrentPageName = createAction('[Categories page] takeCurrentPageName', props<{navTo: string}>());
export const currentSelectItem = createAction('[Categories page] currentSelectItem', props<{currentItem: any}>());
export const addToBucket = createAction('[Categories page] addToBucket', props<{item: any}>());
