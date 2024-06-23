import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  shwowProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer<ProductState>(
  { shwowProductCode: true } as ProductState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      shwowProductCode: !state.shwowProductCode,
    };
  })
);

// Chapter 1
// export const productReducer = createReducer(
//   { shwowProductCode: true },
//   on(createAction('[Product] Toggle Product Code'), (state) => {
//     return {
//       ...state,
//       shwowProductCode: !state.shwowProductCode,
//     };
//   })
// );
