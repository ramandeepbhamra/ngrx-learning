import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductPageActions, ProductAPIActions} from '../state/actions';

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

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initilizeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductAPIActions.loadProductsSucess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductAPIActions.loadProductsFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductAPIActions.updateProductSucess, (state, action): ProductState => {
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
  on(ProductAPIActions.updateProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductAPIActions.addProductSucess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductAPIActions.addProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  }),
  on(ProductAPIActions.deleteProductSucess, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter((item) => action.id !== item.id),
      currentProductId: null,
      error: '',
    };
  }),
  on(ProductAPIActions.deleteProductFailure, (state): ProductState => {
    return {
      ...state,
      products: [],
      error: state.error,
    };
  })
);
