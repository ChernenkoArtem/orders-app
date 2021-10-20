import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user.model';

export const createAccountAction = createAction('[Login Page] createAcc', props<{ email: string, password: string }>());
export const createAccountSuccessAction = createAction('[Login Page] createAccountSuccess', props<{ user: User }>());
export const getUserByTokenAction = createAction('[Login Page] getUserByTokenAction');
