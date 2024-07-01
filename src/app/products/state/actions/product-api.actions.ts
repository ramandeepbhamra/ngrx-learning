import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductsSucess = createAction(
  '[Product API] Load Sucess',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load Fail',
  props<{ error: string }>()
);
export const updateProductSucess = createAction(
  '[Product API]  Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product API]  Update Product Fail',
  props<{ error: string }>()
);
export const addProductSucess = createAction(
  '[Product API]  Add Product Success',
  props<{ product: Product }>()
);
export const addProductFailure = createAction(
  '[Product API]  Add Product Fail',
  props<{ error: string }>()
);
export const deleteProductSucess = createAction(
  '[Product API]  Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product API]  Delete Product Fail',
  props<{ error: string }>()
);
