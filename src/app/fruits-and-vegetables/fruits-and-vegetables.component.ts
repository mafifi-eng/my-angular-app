import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-fruits-and-vegetables',
  templateUrl: './fruits-and-vegetables.component.html',
  styleUrl: './fruits-and-vegetables.component.css'
})
export class FruitsAndVegetablesComponent {
  errorMessage: string = '';
  categoryName: string = 'Fruits ,Vegetables &amp Herbs';
  products: any[] = [];
  pageSize: number = 10;
  page: number = 0;
  loading: boolean = true;
  private destroy$ = new Subject<void>();
  updateComponent: any = true;

  constructor(private productService: ProductService, private shoppingListService: ShoppingListService) {
    this.productService.rerender$
      .pipe(takeUntil(this.destroy$))
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.loading = true; // Set loading to true when fetching starts

      if (this.categoryName) {
        const data = await this.productService.getProductsInCategory(this.categoryName, this.page, this.pageSize).toPromise();

        if (data && data.length > 0) {
          if (this.page !== 0) {
            this.products = this.products.concat(data);
          } else {
            this.products = data;
          }
          this.sortPricesAndAddBorders();
        } else {
          this.errorMessage = `No products found for ${this.categoryName}. Displaying all products.`;
          await this.getAllProducts();
        }
      } else {
        await this.getAllProducts();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.loading = false; // Set loading to false when fetching is complete
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
