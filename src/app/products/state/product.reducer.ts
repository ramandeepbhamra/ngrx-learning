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
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
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

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id == currentProductId) ?? {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0,
          }
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const productReducer = createReducer<ProductState>(
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
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initilizeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductsSucess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductActions.updateProductSucess, (state, action): ProductState => {
    const updatedProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );

    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductActions.addProductSucess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.addProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductActions.deleteProductSucess, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter((item) => action.id !== item.id),
      currentProductId: null,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  })
);
