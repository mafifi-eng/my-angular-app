import { AfterViewInit, Component } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements AfterViewInit {

  productList: any[];

  constructor(private productService: ShoppingListService) {
    this.productList = this.productService.getProductList();
  }
  ngAfterViewInit(): void {
    if (this.productList.length == 0){
      const emptyDiv = document.querySelector(".empty-list-container") as HTMLElement;
      const emptyBtn = document.querySelector(".clear-button") as HTMLElement;

      emptyDiv.style.display = "block";
      emptyBtn.style.display = "none";
    }
  }
   

  clearProductList() {
    this.productService.clearProductList();
    this.productList = [];

    if (this.productList.length == 0){
      const emptyDiv = document.querySelector(".empty-list-container") as HTMLElement;
      const emptyBtn = document.querySelector(".clear-button") as HTMLElement;

      emptyDiv.style.display = "block";
      emptyBtn.style.display = "none";
    }
    this.productService.customEvent.emit();

  }

  removeProduct(i: any) {
    this.productService.removeProduct(i);
    this.productList = this.productService.getProductList();

    if (this.productList.length == 0){
      const emptyDiv = document.querySelector(".empty-list-container") as HTMLElement;
      const emptyBtn = document.querySelector(".clear-button") as HTMLElement;

      emptyDiv.style.display = "block";
      emptyBtn.style.display = "none";
    }
    this.productService.customEvent.emit();
  }

}
