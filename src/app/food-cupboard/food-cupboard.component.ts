import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-food-cupboard',
  templateUrl: './food-cupboard.component.html',
  styleUrl: './food-cupboard.component.css'
})
export class FoodCupboardComponent {
  errorMessage: string = '';
  categoryName: string = 'food-cupboard';
  products: any[] = [];
  pageSize: number = 10;
  page: number = 0;
  totalItems: number = 0;
  searchResult: any;
  private destroy$ = new Subject<void>();
  updateComponent: any = true;

  constructor(private productService: ProductService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.productService.rerender$
      .pipe(takeUntil(this.destroy$))
  }

  getAllProducts() {
    this.productService.getAllProducts(this.page, this.pageSize).subscribe(
      (allProducts) => {
        if (this.page != 0)
          this.products = this.products.concat(allProducts);
        else
          this.products = allProducts;
      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }

  getProducts(): void {

    if (this.categoryName) {
      this.productService.getProductsInCategory(this.categoryName, this.page, this.pageSize).subscribe(
        (data) => {
          if (data.length === 0) {
            this.errorMessage = `No products found for category ${this.categoryName}. Displaying all products.`;
            // Fetch all products
            this.getAllProducts();
          } else {
            this.errorMessage = '';
            if (this.page != 0)
              this.products = this.products.concat(data);
            else
              this.products = data;
          }
        },
        (error) => {
          console.error('Error fetching products by category:', error);
        }
      );
    } else {
      // Fetch all products if no category is specified
      this.getAllProducts();
    }
  }
  onLoadMore() {
    this.page++;
    this.getProducts();
  }
}
