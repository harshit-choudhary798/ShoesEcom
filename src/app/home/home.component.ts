import { Component, OnInit } from '@angular/core';
import { S1Service } from '../s1.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'ShoesEcom';
  shoesData: any[] = [];
  i:any
  // horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private service: S1Service,private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.service.getData().subscribe(
      (data: any) => {
        if (data && data.sneakers && Array.isArray(data.sneakers)) {
          this.shoesData = data.sneakers;
          console.log(this.shoesData);
        } else {
          console.error('Invalid data format. Expected an object with a "sneakers" property.');
        }
      },
      (error) => {
        console.error('Error in AppComponent:', error);
      }
    );
    
    this.service.itemCount.subscribe(res => this.i = res);
  }
  addItem(id: any) {
    console.log(id);
    this.service.addToCart(id);

    // Check if this.i is undefined before incrementing
    if (this.i === undefined) {
      this.i = 1;
    } else {
      this.i++;
    }

    this.service.itemCount.next(this.i);

    // Show Snack Bar
    const durationMilliseconds = 1000;
    const snackBarRef: MatSnackBarRef<any> = this._snackBar.open("Item has been added to the cart", 'View items', {
      duration: durationMilliseconds,
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
  

}
