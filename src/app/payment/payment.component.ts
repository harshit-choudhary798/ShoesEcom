import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total: number = 0;
  totalQuantity: number =0;
  totalAmount: number =0;
  promocode: string = '123';
  applied:boolean=false
  ActualAmount: number=0;
  order: boolean =false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.total = this.data.total;
    this.totalQuantity = this.data.totalQuantity;
    this.totalAmount = this.total + 75 + 10;
    console.log(this.data);
    this.ActualAmount=this.totalAmount
  
  }


  checkPromo(code: string) {
    if(!this.applied){

  
    if (code === 'harshit123' && !this.applied) {
      const discountPercentage = 0.1;
      const discountedAmount = this.ActualAmount - (this.ActualAmount * discountPercentage);
      this.totalAmount = +discountedAmount.toFixed(2); 
      this.applied = true;
    }
  }  
}


orderPlaced(){
  this.order=true
}
  
}
