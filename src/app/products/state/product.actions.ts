import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ currentProductId: number | null }>()
);
export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);
export const initilizeCurrentProduct = createAction(
  '[Product] Initilize Current Product'
);
export const loadProducts = createAction('[Product] Load');
export const loadProductsSucess = createAction(
  '[Product] Load Sucess',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Fail',
  props<{ error: string }>()
);
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);
export const updateProductSucess = createAction(
  '[Product]  Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product]  Update Product Fail',
  props<{ error: string }>()
);
export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product }>()
);
export const addProductSucess = createAction(
  '[Product]  Add Product Success',
  props<{ product: Product }>()
);
export const addProductFailure = createAction(
  '[Product]  Add Product Fail',
  props<{ error: string }>()
);
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSucess = createAction(
  '[Product]  Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product]  Delete Product Fail',
  props<{ error: string }>()
);