import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  cartlist=[]
  cartlen:number
  userid ;
  quan:any;
  orderlist=[];
  orderId=[]
  constructor(private makeapi:ApiService) { }

  ngOnInit(): void {
    
    this.userid = JSON.parse(localStorage.getItem('user_data'));
    this.makeapi.getordercollection(this.userid.user.uid).subscribe((res) => {
      debugger;
      res.map((e: any) => {
        this.orderlist.push(e.payload.doc.data());
        this.orderId.push(e.payload.doc.id);
      });
    });
  }
  quantity(quantity){
    this.quan=quantity
  }
  delete(i) {
    var user = this.orderId[i]
    console.log(user)
    this.makeapi.deleteordercollection(this.userid.user.uid,user)
    alert('Product removed')
    setTimeout(()=>{                           
      window.location.reload()
    }, 1000);
  }
}
