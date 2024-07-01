import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductPageActions, ProductAPIActions } from './actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductAPIActions.loadProductsSucess({ products })),
          catchError((error) =>
            of(ProductAPIActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map((product) => ProductAPIActions.updateProductSucess({ product })),
          catchError((error) =>
            of(ProductAPIActions.updateProductFailure({ error }))
          )
        );
      })
    );
  });

  addProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.addProduct),
      concatMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map((product) => ProductAPIActions.addProductSucess({ product })),
          catchError((error) =>
            of(ProductAPIActions.addProductFailure({ error }))
          )
        );
      })
    );
  });

  deleteProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      concatMap((action) => {
        console.log(action.id);
        return this.productService.deleteProduct(action.id).pipe(
          map(() => ProductAPIActions.deleteProductSucess({ id: action.id })),
          catchError((error) =>
            of(ProductAPIActions.deleteProductFailure({ error }))
          )
        );
      })
    );
  });
}
