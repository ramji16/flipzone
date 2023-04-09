import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent implements OnInit {
  cartlist = [];
  cartlen: number;
  userid;
  quan: number;
  orderlist = [];
  orderId = [];
  amountlength: number;
  orderlength: any;
  amount = [];
  totalamount :Number;
  constructor(private makeapi: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.getList()
  }
  quanti(quantity, i) {
    this.quan = Number(quantity);
    console.log(typeof this.quan);
    var amt = this.orderlist[i].price;
    this.orderlist[i].quantity = quantity
    console.log(amt);
    var amont = this.quan * Number(amt);
    this.orderlist[i].customers=this.userid.user.uid
     this.orderlist[i].price = amont
    if (this.amount[i] == null) {
      this.amount.push(amont);
    } else if (this.amount[i] != null) {
      this.amount[i] = amont;
    }
    this.amountlength = this.amount.length;
    console.log(this.amount);
    this.totalamount = 0
    for(let j = 0 ; j<this.amount.length;j++){
      this.totalamount = this.totalamount + this.amount[j]
      debugger
      console.log(this.totalamount)
    }
    // this.amount = quantity * amount
  }
  placeorder(){
    for(let i =0 ; i<this.orderlist.length;i++){
      this.makeapi.createbordercollection(this.userid.user.uid,this.orderlist[i])
      this.makeapi.createproductordercollection(this.orderlist[i].uid,this.orderlist[i])
    }
  }
  navigation(){
    this.router.navigate(['/orders'])
  }

  delete(i) {
    var user = this.orderId[i];
    console.log(user);
    this.makeapi.deleteordercollection(this.userid.user.uid, user).then(data=>{
      alert('Product removed');
      this.getList()
    })
    
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }
  getList(){
    this.userid = JSON.parse(localStorage.getItem('user_data'));
    this.makeapi.getordercollection(this.userid.user.uid).subscribe((res) => {
      debugger;
      this.orderlist=[]
      res.map((e: any) => {
        this.orderlist.push(e.payload.doc.data());
        this.orderId.push(e.payload.doc.id);
        console.log(this.orderlist.length);
        this.orderlength = this.orderlist.length;
      });
    });
  }
}
