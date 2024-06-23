import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../user';

export interface UserState {
  maskUserNameOrNot: boolean;
  currentUserId: number | null;
  // Chapter 1
  // currentUser: User | null;
  users: User[];
}

const initialState: UserState = {
  maskUserNameOrNot: true,
  currentUserId: null,
  // Chapter 1
  // currentUser: null,
  users: [],
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserNameOrNot = createSelector(
  getUserFeatureState,
  (state) => state.maskUserNameOrNot
);

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state) => state.currentUserId
);

export const getCurrentProduct = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state, currentUserId) => {
    state.users.find((p) => p.id == currentUserId);
  }
);

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask User Name'), (state) => {
    return {
      ...state,
      maskUserNameOrNot: !state.maskUserNameOrNot,
    };
  })
);
