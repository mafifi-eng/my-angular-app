// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';
  searchTerm: String = '';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductsInCategory(productName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${productName}`);
  }

  getProductsByName(productName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${productName}`);
  }
}
