import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
    { maskuserNameOrNot: true },
    on(createAction("[User] Mask User Name"), (state) => {
        console.log("state.maskuserName", JSON.stringify(state.maskuserNameOrNot))
      return { 
          ...state,
          maskuserNameOrNot: !state.maskuserNameOrNot 
      };
    })
  );