import { createAction, createReducer, on } from '@ngrx/store';
import { User } from '../user';

export interface UserState {
  maskuserNameOrNot: boolean;
  currentUser: User;
  users: User[];
}

export const userReducer = createReducer(
  { maskuserNameOrNot: true },
  on(createAction('[User] Mask User Name'), (state) => {
    console.log('state.maskuserName', JSON.stringify(state.maskuserNameOrNot));
    return {
      ...state,
      maskuserNameOrNot: !state.maskuserNameOrNot,
    };
  })
);
