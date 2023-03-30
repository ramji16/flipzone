import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  electronicsProduct = [];
  fashionProduct = [];
  furnitureProduct = [];
  othersProduct = [];
  productDetails = [];
  product=[]
  filterValue = 'All';
  constructor(private makeapi:ApiService,private router : Router ) { }

  ngOnInit(): void {
    var bid=JSON.parse(localStorage.getItem('businessId'))
    this.makeapi.getsubcollection(bid).subscribe(res=>{
      var details=res.map((e:any)=>{
         this.product.push(e.payload.doc.data()); 
      });
      console.log(this.product)
    });
    
  var electronics = JSON.parse(localStorage.getItem('Electronics'));
  var fashion = JSON.parse(localStorage.getItem('Fashion'));
  var furniture = JSON.parse(localStorage.getItem('Furniture'));
  var others = JSON.parse(localStorage.getItem('Others'));
  if(electronics!=null){
    this.electronicsProduct = electronics
    this.productDetails.push(...this.electronicsProduct);
    // console.log(this.productDetails)
  }
  if(fashion!=null){
    this.fashionProduct = fashion
    // console.log(this.fashionProduct)
    this.productDetails.push(...this.fashionProduct);
  }
  if(furniture!=null){
    this.furnitureProduct = furniture
    // console.log(this.furnitureProduct)
    this.productDetails.push(...this.furnitureProduct);
  }
  if(others!=null){
    this.othersProduct = others
    // console.log(this.othersProduct)
    this.productDetails.push(...this.othersProduct);
  }
  console.log(this.productDetails)
  }
  businessadd(category:any){
    this.router.navigate(['/businessaddform/'],{queryParams:{cat:category}});

  }

  filter(option : any){
    this.filterValue = option;
    console.log(this.filterValue);
  }

}
