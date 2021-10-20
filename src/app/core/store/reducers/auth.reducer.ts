import {createReducer, createSelector, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import {User} from '../../models/user.model';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {
    id: 0,
    email: '',
    password: '',
  }
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.createAccountAction, (state) => ({...state})),
  on(AuthActions.createAccountSuccessAction, (state, user) => ({...state, ...user})),
  on(AuthActions.getUserByTokenAction, (state) => ({...state})),
);

export const selectFeature = (state) => state.auth;

export const selectUser = createSelector(
  selectFeature,
  (state: UserState) => state.user
);
