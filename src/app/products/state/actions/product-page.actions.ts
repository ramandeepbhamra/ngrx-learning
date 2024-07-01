import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction('[Product Page] Toggle Product Code');
export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number | null }>()
);
export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);
export const initilizeCurrentProduct = createAction(
  '[Product Page] Initilize Current Product'
);
export const loadProducts = createAction('[Product Page] Load');
export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ product: Product }>()
);
export const addProduct = createAction(
  '[Product Page] Add Product',
  props<{ product: Product }>()
);
export const deleteProduct = createAction(
  '[Product Page] Delete Product',
  props<{ id: number }>()
);
