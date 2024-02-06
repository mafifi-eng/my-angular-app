import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-frozen-food',
  templateUrl: './frozen-food.component.html',
  styleUrl: './frozen-food.component.css'
})
export class FrozenFoodComponent {
  errorMessage: string = '';
  categoryName: string = 'Frozen Food';
  products: any[] = [];
  pageSize: number = 10;
  page: number = 0;
  totalItems: number = 0;
  searchResult: any;
  private destroy$ = new Subject<void>();
  private inputSearch = document.getElementById('searchInput') as HTMLInputElement;
  updateComponent: any = true;

  constructor(private productService: ProductService, private shoppingListService: ShoppingListService) {
    this.productService.rerender$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.searchResult = this.productService.searchTerm;
      });
  }

  getAllProducts() {
    this.productService.getAllProducts(this.page, this.pageSize).subscribe(
      (allProducts) => {
        if (this.page != 0)
          this.products = this.products.concat(allProducts);
        else
          this.products = allProducts;

          this.sortPricesAndAddBorders();
      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }

  async getProducts(): Promise<void> {
    try {
      if (this.categoryName) {
        this.productService.getProductsInCategory(this.categoryName, this.page, this.pageSize).subscribe(
          (data) => {
            if (data.length === 0) {
              this.errorMessage = `No products found for ${this.categoryName}. Displaying all products.`;
              // Fetch all products
              this.getAllProducts();
            } else {
              this.errorMessage = '';
              if (this.page != 0)
                this.products = this.products.concat(data);
              else
                this.products = data;

                this.sortPricesAndAddBorders();

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
    } catch (error) {
      console.log(error);
    }
  }

  onLoadMore() {
    this.page++;
    this.getProducts();
  }

  addToBasket(event: Event, product: any, price: any) {
    event.preventDefault();

    // Get the button element from the event
    let buttonElement = event.currentTarget as HTMLElement;
    buttonElement = buttonElement.querySelector(".add-to-basket-btn")!;

    // Update the button's style
    buttonElement.style.backgroundColor = 'green';

    this.shoppingListService.addProduct(product, price);
    this.shoppingListService.customEvent.emit();
  }

  sortPricesAndAddBorders(): void {
    this.products.forEach(product => {
      // Sort prices in descending order
      product.prices.sort((a: any, b: any) => b.value - a.value);

      // Find the lowest price
      const lowestPrice = Math.min(...product.prices.map((price: any) => price.value));

      // Add a property to each price indicating if it's the lowest
      product.prices.forEach((price: any) => {
        price.isLowest = price.value === lowestPrice;
      });
    });
  }
}
