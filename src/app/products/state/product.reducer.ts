import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  // Chapter 1
  //currentProduct: Product | null;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  // Chapter 1
  //currentProduct: null,
  products: [],
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

// Chapter 1
// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   (state) => state.currentProduct
// );

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    state.products.find((p) => p.id == currentProductId);
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const productReducer = createReducer<ProductState>(
  //Chapter 2
  //{ shwowProductCode: true } as ProductState,
  //Chapter 1
  //{ shwowProductCode: true },
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
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
