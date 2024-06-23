import {
  // Before Chapter 7
  //createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from '../state/product.actions';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  currentProduct: Product | null;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  currentProduct: null,
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
  (state) => state.currentProduct
);

export const getCurrentProductByProductid = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) =>
    state.products.find((p) => p.id == currentProductId)
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
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null,
    };
  }),
  on(ProductActions.initilizeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      },
    };
  })

  // Before Chapter 7
  //   on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
  //     return {
  //       ...state,
  //       showProductCode: !state.showProductCode,
  //     };
  //   })

  // Chapter 1
  // export const productReducer = createReducer(
  //   { shwowProductCode: true },
  //   on(createAction('[Product] Toggle Product Code'), (state) => {
  //     return {
  //       ...state,
  //       shwowProductCode: !state.shwowProductCode,
  //     };
  //   })
);
