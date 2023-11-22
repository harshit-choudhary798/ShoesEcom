import { Component, OnInit } from '@angular/core';
import { S1Service } from '../s1.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ShoesEcom';
  shoesData: any[] = [];

  constructor(private service: S1Service) { }

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
  }

}
