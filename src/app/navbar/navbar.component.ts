import { S1Service } from './../s1.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _service:S1Service) { }

  count:any=0

  ngOnInit(): void {
    this._service.itemCount.subscribe((res)=>{
      this.count=res
    })
  }




}
