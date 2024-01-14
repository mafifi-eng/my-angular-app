import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'https://checkluxury.ddns.net:443/api/subscribe';
  response: any = '';
  private sub: any = '';
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
   this.sub = this.http.post(`${this.apiUrl}`, email, this.httpOptions);
    return this.sub;
  }
}
