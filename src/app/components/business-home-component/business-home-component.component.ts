import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import {Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-business-home-component',
  templateUrl: './business-home-component.component.html',
  styleUrls: ['./business-home-component.component.css']
})
export class BusinessHomeComponentComponent implements OnInit {
  product;
  productArray = []
  orders;
  ordersArray = []
  customer;
  customerArray = []
  profit=0;
  netprofit=0;
  livecustomers=new Set();
  constructor(private router : Router,private makeapi:ApiService) { }

  ngOnInit(): void {
    var bid=JSON.parse(localStorage.getItem('businessId'))
    this.makeapi.getsubcollection(bid).subscribe(res=>{
      var details=res.map((e:any)=>{
         this.productArray.push(e.payload.doc.data()); 
      });
      console.log(this.productArray)
      this.product = this.productArray.length
    });
    this.makeapi.getproductordercollection(bid).subscribe(res=>{
      var details=res.map((e:any)=>{
         this.ordersArray.push(e.payload.doc.data());
         this.customerArray.push(e.payload.doc.id); 
      });
      for(let i=0;i<this.customerArray.length;i++){
        if(this.ordersArray[i].customers!="" && this.ordersArray[i].customers!=undefined){
          this.livecustomers.add(this.ordersArray[i].customers)
        }
        this.profit=this.profit + Number(this.ordersArray[i].price)
        debugger
      }
      this.netprofit=this.profit*(25/100)
      console.log(this.ordersArray)
      this.orders = this.ordersArray.length
      this.customer=this.livecustomers.size
      console.log(this.livecustomers)
    });
  }

  businessorder(){
    this.router.navigate(['/businessorder/']);
  }
  businessproduct(){
    this.router.navigate(['/businesslist/']);
  }
  businessadd(category:any){
    this.router.navigate(['/businessaddform/'],{queryParams:{cat:category}});

  }
  profilenav(){
    this.router.navigate(['/businessprofile'])
  }
}
