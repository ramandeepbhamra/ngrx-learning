import { createAction, createReducer, on } from '@ngrx/store';

export const productReducer = createReducer(
  { shwowProductCode: true },
  on(createAction("[Product] Toggle Product Code"), (state) => {
    return { 
        ...state,
        shwowProductCode: !state.shwowProductCode 
    };
  })
);