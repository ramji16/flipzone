import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.css']
})
export class BusinessOrderComponent implements OnInit {
  bid
  orders=[];
  orderid = [];
  date=new Date();

  time;

  constructor(private router: Router,private makeapi: ApiService) { }

  ngOnInit(): void {
    var today = new Date(this.date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.time = dd + '/' + mm + '/' + yyyy;
    this.bid = JSON.parse(localStorage.getItem('businessId'));
    this.makeapi.getproductordercollection(this.bid).subscribe((res) => {
      debugger;
      res.map((e: any) => {
        this.orders.push(e.payload.doc.data());
        this.orderid.push(e.payload.doc.id);
      });
    });
    console.log(this.orders);
    console.log(this.orderid)
  }
  

}
