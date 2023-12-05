import { Component, OnInit } from '@angular/core';
import { S1Service } from '../s1.service';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  couponCode: any;
  promoCode: any;
  empty: boolean = true;
  items: any;
  itemsJson: any;

  constructor(private _service: S1Service,public dialog: MatDialog) { }

  ngOnInit(): void {
    this._service.cartItemsSubject.subscribe(items => {
      this.items = items;
      this.empty = !this.items || this.items.length === 0;

      this.itemsJson = JSON.stringify(this.items);
      console.log(this.itemsJson);
    });
  }

  getTotalQuantity(): number {
    return this.items.reduce((total: any, item: { quantity: any; }) => total + (item.quantity || 0), 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((total: any, item: { quantity: any, retail_price_cents: any; }) => {
      return total + ((item.quantity || 0) * (item.retail_price_cents / 100 || 0));
    }, 0);
  }

  placeOrder() {
    this.dialog.open(PaymentComponent, {
      data: {
        total: this.getTotalPrice(),
        totalQuantity:this.getTotalQuantity()
      },
    });
  }


  removeItem(item: any): void {
  console.log(item)
    const index = this.items.indexOf(item);
    
 
      
      this.items.splice(index, 1);
  
     
      this._service.updateCart(this.items,this.items.quantity);
      
     
      // const newItemCount = this.length;
      // this._service.itemCount.next(quantity);

}
  


  }

