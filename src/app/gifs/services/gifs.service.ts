import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiUrl: string = 'http://api.giphy.com/v1/gifs';
  private apiKey: string = 'r5bwKpIANFevhuezaFQwVlNB2Q4w6GAL';
  private apiLimit: string = '10';
  private _history: string[] = [];
  public results: Gif[] = [];

  constructor(private _http: HttpClient) {
    // Get info from localStorage
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get history(): string[] {
    return [...this._history];
  }

  public searchGifs(query: string): void {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query) && query !== '') {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);
      // Save in localStorage
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.apiLimit)
      .set('q', query);

    this._http.get<SearchGifsResponse>(`${ this.apiUrl }/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
        // Save in localStorage
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }

}
