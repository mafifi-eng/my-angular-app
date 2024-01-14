// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://checkluxury.ddns.net:443/api';
  private apiUrl2 = 'https://checkluxury.ddns.net:443/api/rewards-program'; 
  searchTerm: String = '';
  private rerenderSubject = new Subject<void>();

  // Observable to subscribe to for triggering a re-render
  rerender$ = this.rerenderSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateSearchTerm(searchTerm: any){
    this.searchTerm = searchTerm;
  }

  getProductsInCategory(productName: string): Observable<any[]> {
    return this.  http.get<any[]>(`${this.apiUrl}/category/${productName}`);
  }

  getProductsByName(productName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${productName}`);
  }

  getRewards(): Observable<any> {
    return this.http.get(`${this.apiUrl2}`);
  }

   // Method to emit an event and trigger a re-render
   triggerRerender() {
    this.rerenderSubject.next();
  }
}
