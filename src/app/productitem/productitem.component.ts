import { Component, OnInit } from '@angular/core';
import { S1Service } from '../s1.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {

  id: any;

  product:any
  constructor(private activatedRoute: ActivatedRoute, private service1: S1Service) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data:any) => {
      this.id = +data.get('id');

      console.log(this.id);

      this.service1.getProduct(this.id).subscribe(
        (product: any) => {
          this.product=product
          console.log(product);

        },
        (error: any) => console.error(error)
      );
    });
  }
}
