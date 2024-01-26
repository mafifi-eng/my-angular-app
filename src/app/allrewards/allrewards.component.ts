import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-allrewards',
  templateUrl: './allrewards.component.html',
  styleUrl: './allrewards.component.css'
})
export class AllrewardsComponent implements OnInit {

  products: any[] = [];
  page: number = 0;
  pageSize: number = 10;

  constructor(private productService: ProductService, private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  onLoadMore() {
    this.page++;
    this.loadResults();
  }

  loadResults() {
    this.productService.getRewards(this.page, this.pageSize).subscribe(
      (data: any) => {
        this.products = this.products.concat(data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    ); 
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
}
