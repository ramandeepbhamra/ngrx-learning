import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import {
  State,
  getCurrentProduct,
  getShowProductCode,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage!: string;

  displayCode: boolean = false;

  products!: Product[];

  // Used to highlight the selected product in the list
  selectedProduct!: Product | null;
  sub!: Subscription;

  constructor(
    private store: Store<State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    //TODO: Unsubscibe
    this.store
      .select(getCurrentProduct)
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));
    // Before Chapter 7
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    //TODO: Unsubscibe
    this.store
      .select(getShowProductCode)
      .subscribe((showProductCode) => (this.displayCode = showProductCode));

    // Chapter 1
    // this.store.select('products').subscribe(
    //   products => {
    //       this.displayCode = products.showProductCode
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());

    // Before Chapter 7
    // this.store.dispatch({
    //   type: '[Product] Toggle Product Code',
    // });

    //this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initilizeCurrentProduct());
    // Before Chapter 7
    //this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
    // Before Chapter 7
    //this.productService.changeSelectedProduct(product);
  }
}
