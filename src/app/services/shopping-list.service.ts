// product.service.ts

import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private storageKey = 'productList';

  constructor() {}

  customEvent: EventEmitter<void> = new EventEmitter<void>();

  // Get product list from localStorage
  getProductList(): any[] {
    const productListString = localStorage.getItem(this.storageKey);
    return productListString ? JSON.parse(productListString) : [];
  }

  // Add a product to the list and save to localStorage
  addProduct(product: any, prices: any): void {
    const productList = this.getProductList();
    const price = prices ? prices.value : 0;
    const supermarket = prices.supermarketName ? prices.supermarketName: prices.supermarket.name;

    productList.push({
      englishName: product.englishName,
      arabicName: product.arabicName,
      price: price,
      supermarket: supermarket
    });

    localStorage.setItem(this.storageKey, JSON.stringify(productList));
  }

  // Remove a product from the list by index and save to localStorage
  removeProduct(index: number): void {
    const productList = this.getProductList();

    if (index >= 0 && index < productList.length) {
      productList.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(productList));
    }
  }

  // Clear all products from localStorage
  clearProductList(): void {
    localStorage.removeItem(this.storageKey);
  }
}
