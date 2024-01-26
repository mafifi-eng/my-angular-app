import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-rewards-program',
  templateUrl: './rewards-program.component.html',
  styleUrl: './rewards-program.component.css'
})
export class RewardsProgramComponent implements OnInit {
  @Output() customEvent: EventEmitter<void> = new EventEmitter<void>();

  products: any[] = [];
  page: number = 0;
  pageSize: number = 6;

  constructor(private productService: ProductService, private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.productService.getRewards(this.page, this.pageSize).subscribe(
      (data: any) => {
        this.products = data;
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
