// scraper.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as cheerio from 'cheerio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {
  constructor(private http: HttpClient) {}

  scrapeWebsite(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }
}
