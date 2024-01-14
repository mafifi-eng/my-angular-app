import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  errorMessage: string = '';
  categoryName: any = '';
  products: any[] = [];
  searchResult: any;
  private destroy$ = new Subject<void>();
  private inputSearch = document.getElementById('searchInput') as HTMLInputElement;
  updateComponent: any =true;


  constructor(private productService: ProductService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.productService.rerender$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.searchResult = this.productService.searchTerm;
      this.openSearchWindow();
    });
  }

  ngAfterViewInit(): void {

    document.addEventListener('DOMContentLoaded', () => {
      this.inputSearch.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this.searchResult = (this.inputSearch.value.trim());
          this.openSearchWindow();
        }
        document.getElementById('searchEnter')!.style.backgroundColor = 'lightcoral';
      });
    });
  }


  ngOnInit() {
    this.searchResult = this.productService.searchTerm;
    this.openSearchWindow();
  }


  openSearchWindow(): void {
    document.querySelector('#nav-links')!.classList.remove('active');
    this.categoryName = this.searchResult;
    this.getProducts();

  }

  getProducts(): void {

    if (this.categoryName) {
      this.productService.getProductsInCategory(this.categoryName).subscribe(
        (data) => {
          if (data.length === 0) {
            this.errorMessage = `No products found for category ${this.categoryName}. Displaying all products.`;
            // Fetch all products
            this.productService.getAllProducts().subscribe(
              (allProducts) => {
                this.products = allProducts;
              },
              (error) => {
                console.error('Error fetching all products:', error);
              }
            );
          } else {
            this.errorMessage = '';
            this.products = data;
          }
        },
        (error) => {
          console.error('Error fetching products by category:', error);
        }
      );
    } else {
      // Fetch all products if no category is specified
      this.productService.getAllProducts().subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching all products:', error);
        }
      );
    }
  }
}
