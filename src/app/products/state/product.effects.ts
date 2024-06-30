import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSucess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap(action => {
        return this.productService.updateProduct(action.product).pipe(
          map((product) => ProductActions.updateProductSucess({ product })),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error }))
          )
        );
      })
    );
  });

  addProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      concatMap(action => {
        return this.productService.createProduct(action.product).pipe(
          map((product) => ProductActions.addProductSucess({ product })),
          catchError((error) =>
            of(ProductActions.addProductFailure({ error }))
          )
        );
      })
    );
  });

  deleteProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      concatMap(action => {
        console.log(action.id);
        return this.productService.deleteProduct(action.id).pipe(
          map(() => ProductActions.deleteProductSucess({ id: action.id })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
          )
        );
      })
    );
  });
}
