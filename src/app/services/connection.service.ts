// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllProducts(page: number, pageSize: number): Observable<any[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', pageSize.toString());
    return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  updateSearchTerm(searchTerm: any){
    this.searchTerm = searchTerm;
  }

  getProductsInCategory(searchTerm: string, page: number, pageSize: number): Observable<any[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', pageSize.toString());
    return this.  http.get<any[]>(`${this.apiUrl}/category/${searchTerm}`, { params });
  }

  getProductsByName(productName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${productName}`);
  }

  getRewards(page: number, size: number): Observable<any> {
    const url = `${this.apiUrl2}?page=${page}&size=${size}`;
    return this.http.get(url);
  }

   // Method to emit an event and trigger a re-render
   triggerRerender() {
    this.rerenderSubject.next();
  }
}
