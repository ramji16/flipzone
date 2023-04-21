import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.css'],
})
export class BusinessOrderComponent implements OnInit {
  bid;
  orders = [];
  orderid = [];
  userid = [];
  userdetails = [];
  date = new Date();

  time;

  constructor(private router: Router, private makeapi: ApiService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    var today = new Date(this.date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.time = dd + '/' + mm + '/' + yyyy;
    this.bid = JSON.parse(localStorage.getItem('businessId'));
    debugger;
    this.get_orders();
    // console.log(this.orderid)
  }
  get_orders() {
    this.makeapi.getproductordercollection(this.bid).subscribe((res) => {
      this.orders = [];
      res.map((e: any) => {
        this.orders.push(e.payload.doc.data());
        this.orderid.push(e.payload.doc.id);
        console.log(this.orders, 'orders list');
      });
      debugger;
      this.get_userid();
    });
  }
  get_userid() {
    for (let i = 0; i < this.orders.length; i++) {
      this.userid.push(this.orders[i].customers);
    }
    debugger;
    this.get_userdata();
    console.log(this.userid);
  }
  get_userdata() {
    this.userdetails = [];
    debugger
    for (let i = 0; i < this.userid.length; i++) {
      // console.log(this.userid[i])
      var uid = this.userid[i];
      this.makeapi.getuserItem(uid).subscribe((resp) => {
        this.userdetails.push(resp);
        debugger
        this.gettable();
      });
    }
  }
  gettable() {
    debugger;
    for (let i = 0; i < this.userdetails.length; i++) {
      var ptable = this.userdetails[i];
      debugger;
      this.orders[i].ufname = ptable.ufname;
      this.orders[i].uaddress = ptable.uaddress;
      debugger;
    }
    console.log(this.orders, 'orders-list-mod');
  }
}
