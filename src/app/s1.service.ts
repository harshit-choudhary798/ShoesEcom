import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class S1Service {


  private url = 'https://shoes-api.pages.dev/api.json';

  itemCount = new BehaviorSubject(0);

  cartItemsSubject = new BehaviorSubject<Array<any>>([]);
  Updatedcount: any;
  countValues:any;
  

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getProduct(id: number): Observable<any> {
    return this.getData().pipe(
      map((data: any) => {
        return data.sneakers && data.sneakers.find((item: any) => item.id === id);
      })
    );
  }

  addToCart(id: any) {
    this.getProduct(id).subscribe(productToAdd => {
      const currentCartItems = this.cartItemsSubject.getValue();
      
     
      const existingItemIndex = currentCartItems.findIndex(item => item.id === productToAdd.id);
  
      if (existingItemIndex !== -1) {
        
        currentCartItems[existingItemIndex].quantity += 1;
      } else {
        
        currentCartItems.push({ ...productToAdd, quantity: 1 });
      }
      this.cartItemsSubject.next([...currentCartItems]);
    });
  }

  updateCart(items: any, quantity: number) {
    const updatedItems = this.cartItemsSubject.getValue().filter((item: any) => {
      return item.id !== items.id;
    });
  
   
    this.cartItemsSubject.next(updatedItems);
  
    
    const totalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
  

    this.itemCount.next(totalCount);
  }
  
  

  }  


  


  
  
  
  
  
  

