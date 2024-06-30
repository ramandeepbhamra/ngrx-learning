import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input()
  errorMessage!: string | null;
  @Input()
  products!: Product[] | null;
  @Input()
  displayCode!: boolean | null;
  @Input()
  selectedProduct!: Product | null;
  @Output()
  displayCodeChanged = new EventEmitter<boolean>();
  @Output()
  initilizeNewProduct = new EventEmitter<void>();
  @Output()
  productWasSelected = new EventEmitter<Product>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newProduct(): void {
    this.initilizeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.productWasSelected.emit(product);
  }
}
