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
  userid = []
  userdetails = []
  date=new Date();

  time;

  constructor(private router: Router,private makeapi: ApiService) { }

  ngOnInit(): void {
     this.getList()
  }
  
  getList(){
    var today = new Date(this.date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.time = dd + '/' + mm + '/' + yyyy;
    this.bid = JSON.parse(localStorage.getItem('businessId'));
    this.get_orders();
    // console.log(this.orderid)

  }
  get_orders(){
    this.makeapi.getproductordercollection(this.bid).subscribe((res) => {
      debugger;
      this.orders = [];
      res.map((e: any) => {
        this.orders.push(e.payload.doc.data());
        this.orderid.push(e.payload.doc.id);
        console.log(this.orders)
        this.makeapi.getuserItem(this.orders[0].uid).subscribe(res => {
          this.userdetails.push(res)
          debugger
        })
        console.log(this.userdetails)
      });
      debugger
      // this.get_userid();
    });
    debugger
  }
  get_userid(){
    debugger
    for(let i=0;i<this.orders.length;i++){
      this.userid.push(this.orders[i].uid)
    }
    this.get_userdata();
    console.log(this.userid)
  }
  get_userdata(){
    debugger
    for(let i= 0;i<this.userid.length;i++){
      debugger
      // console.log(this.userid[i])
      var uid = this.userid[i]
      this.makeapi.getuserItem(uid).subscribe((res) => {
        this.userdetails.push(res)
        debugger
      })
      console.log(this.userdetails)
    }
  }
}
