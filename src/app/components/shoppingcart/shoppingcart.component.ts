import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  user_detail=[]
  quan: number;
  orderlist = [];
  udata
  orderId = [];
  amountlength: number;
  orderlength: any;
  amount = [];
  totalamount :Number;
  modal_check=false
  insufamt=false
  uadd=false
  constructor(private makeapi: ApiService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.quan=params.quan;
    });
    this.getList()
    this.getprofile()
  }
  quanti(event, i) {
    var quantity=event.target.value
    debugger
    this.quan = Number(quantity);
    console.log(typeof (this.quan));
    var amt = this.orderlist[i].price;
    console.log(amt,'amt')
    this.orderlist[i].quantity = quantity
    var amont=0
    amont = this.quan * Number(amt);
    debugger
    this.orderlist[i].customers=this.userid.user.uid
    //  this.orderlist[i].price = amont
     console.log(this.orderlist[i].price)
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
  getprofile(){
    debugger
    this.makeapi.getuserItem(this.userid.user.uid).subscribe(data=>{
      debugger
        this.user_detail.push(data)
        console.log(this.user_detail)
        this.udata = this.user_detail[0]
    })
  }
  placeorder(){
    debugger
    if(this.user_detail.length!=0){
      debugger
      if(this.user_detail[0].uwallet>=this.totalamount){
        if(this.user_detail[0].uaddress!=""){
          debugger
        for(let i =0 ; i<this.orderlist.length;i++){
          this.makeapi.createbordercollection(this.userid.user.uid,this.orderlist[i])
          this.makeapi.createproductordercollection(this.orderlist[i].uid,this.orderlist[i])
          debugger
          }
          this.wallet_change()
          this.modal_check=true
        }
        else{
          debugger
          this.uadd=true
        }
      }
      else{
        debugger
        this.insufamt=true
      }
    }
  }
  wallet_change(){
    debugger
    this.udata.uwallet = this.udata.uwallet - Number(this.totalamount)
    console.log(this.udata.uwallet)
    this.makeapi.insertuserdata(this.userid, this.udata).then(() => {
      console.log('Wallet update');
    });
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
  navigation_amt(){
    this.router.navigate(['/profile'])
  }
}
