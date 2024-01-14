// translation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiKey = 'AIzaSyC3pbcI68VpRRNVj0knzzNt6eyH3De2O8Y';
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string, sourceLang: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('q', text)
      .set('source', sourceLang)
      .set('target', targetLanguage)
      .set('key', this.apiKey);

    return this.http.post<any>(`${this.apiUrl}`, {}, { headers, params })
      .pipe(
        map(result => result.data.translations[0].translatedText)
      );
  }
}
