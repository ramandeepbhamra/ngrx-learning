import { createAction, createReducer, on } from '@ngrx/store';
import { User } from '../user';

export interface UserState {
  maskUserNameOrNot: boolean;
  currentUser: User;
  users: User[];
}

export const userReducer = createReducer(
  { maskUserNameOrNot: true },
  on(createAction('[User] Mask User Name'), (state) => {
    console.log('state.maskuserName', JSON.stringify(state.maskUserNameOrNot));
    return {
      ...state,
      maskUserNameOrNot: !state.maskUserNameOrNot,
    };
  })
);
