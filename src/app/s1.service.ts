import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class S1Service {

  private url = 'https://shoes-api.pages.dev/api.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getProduct(id: number): Observable<any> {
    return this.getData().pipe(
      map((data: any) => {
        return data.sneakers && data.sneakers.find((item:any) => item.id === id);
      })
    );
  }
}