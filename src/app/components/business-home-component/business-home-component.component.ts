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
      });
      console.log(this.ordersArray)
      this.orders = this.ordersArray.length
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
