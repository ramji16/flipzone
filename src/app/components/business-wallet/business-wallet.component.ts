import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-wallet',
  templateUrl: './business-wallet.component.html',
  styleUrls: ['./business-wallet.component.css']
})
export class BusinessWalletComponent implements OnInit {
  orders=[]
  filtered_list=[]
  user_id=[]
  user_details=[]
  total_amount:Number=0
  constructor(private makeapi:ApiService,) { }

  ngOnInit(): void {
    this.getorders()
  }
  getorders(){
    this.orders=[]
    var bid=JSON.parse(localStorage.getItem("businessId"))
    this.makeapi.getproductordercollection(bid).subscribe((res) => {
      debugger;
      res.map((e: any) => {
        this.orders.push(e.payload.doc.data());
      });
      this. get_totalamount()
    });
    console.log(this.orders)
  }
  get_totalamount(){
    var amt
    var quan
    var temp
    debugger
    for(let i=0;i<this.orders.length;i++){
      amt=this.orders[i].price
      quan=this.orders[i].quantity
      temp=parseInt(amt)*parseInt(quan)
      this.total_amount+=temp
    }
    console.log(this.total_amount)
    this.filtered_list=this.orders.slice(-2,)
    var count=0
    for(let j=0;j<this.filtered_list.length;j++){
      count=count+1
      this.filtered_list[j].sno=count
      this.user_id.push(this.filtered_list[j].customers)
    }
    this.getuserdetails();
  }
  getuserdetails(){
    debugger
    for(let i=0;i<this.filtered_list.length;i++){
      this.makeapi.getuserItem(this.user_id[i]).subscribe(data=>{
        this.user_details.push(data)
        this.filtered_list[i].name=this.user_details[i].ufname
        debugger
      })
    }
  }
}
