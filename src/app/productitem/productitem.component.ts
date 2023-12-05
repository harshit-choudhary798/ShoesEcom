import { Component, OnInit } from '@angular/core';
import { S1Service } from '../s1.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {
  id: any;
  product: any;
 

  // Constants
  private readonly DURATION_MILLISECONDS = 1000;
  private readonly itemAddedMessage = 'Item has been added to the cart';
  private readonly viewItemsActionText = 'View items';
  this: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: S1Service,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  i:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.id = +data.get('id');
  
      console.log(this.id);
  
      this.service.getProduct(this.id).subscribe(
        (product: any) => {
          this.product = product;
          console.log(product);
        },
        (error: any) => console.error(error)
      );
    });
  
    this.service.itemCount.subscribe(res => this.i = res);
  }
  

  addItem(id: any) {
    console.log(id);
    this.service.addToCart(id);
  
   
    if (this.i === undefined) {
      this.i = 1;
    } else {
      this.i++;
    }
  
    this.service.itemCount.next(this.i);
  

    const snackBarRef: MatSnackBarRef<any> = this._snackBar.open(
      this.itemAddedMessage,
      this.viewItemsActionText,
      {
        duration: this.DURATION_MILLISECONDS,
      }
    );
  
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
  
}
