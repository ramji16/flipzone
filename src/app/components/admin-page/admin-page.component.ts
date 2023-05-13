import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  adminpage = 'customers';
  str: any;
  customersearch: any;
  sellersearch: any;
  productsearch: any;
  querysearch: any;
  customerdata = [];
  customercount;
  sellerdata = [];
  sellercount;
  customlist = [];
  productData = [];
  productcount;
  queryData = [];
  orders = [];
  profitDetails = 0;
  querycount;
  sellerId = [];
  cartlist = [];
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private makeapi: ApiService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getSeller();
    this.getQuery();
  }
  getCustomers() {
    // if (this.customerdata.length == 0) {
    debugger;
    this.spinner.show();
    this.makeapi.listItem('Users').subscribe((res) => {
      debugger;
      this.cartlist = res.map((e: any) => {
        // var collection = e.payload.doc.data();
        this.customerdata.push(e.payload.doc.data());
        debugger;
        console.log(this.customerdata);
      });
      debugger;
      this.customercount = this.customerdata.length;
      // this.data_store();
    });
  }
  getQuery() {
    // if (this.customerdata.length == 0) {
    debugger;
    this.spinner.show();
    this.makeapi.listItem('Admin').subscribe((res) => {
      debugger;
      this.cartlist = res.map((e: any) => {
        // var collection = e.payload.doc.data();
        this.queryData.push(e.payload.doc.data());
        debugger;
        this.queryData.reverse();
        console.log(this.queryData);
      });
      this.spinner.hide();
      debugger;
      this.querycount = this.queryData.length;
      // this.data_store();
    });
  }
  getSeller() {
    if (this.sellerdata.length == 0) {
      debugger;
      // this.spinner.show();
      this.makeapi.listItem('Business').subscribe((res) => {
        debugger;
        this.cartlist = res.map((e: any) => {
          this.sellerdata.push(e.payload.doc.data());
          this.sellerId.push(e.payload.doc.id);
          debugger;
          console.log(this.sellerdata);
        });
        debugger;
        this.sellercount = this.sellerdata.length;
        this.getProducts();
        this.getorders();
      });
    }
  }
  getProducts() {
    for (let i = 0; i <= this.sellerId.length; i++) {
      debugger;
      this.makeapi.getsubcollection(this.sellerId[i]).subscribe((res) => {
        debugger;
        res.map((e: any) => {
          this.productData.push(e.payload.doc.data());
          this.productcount = this.productData.length;
        });
        debugger
      });
    }
    console.log(this.productData);
  }
  getorders() {
    for (let i = 0; i <= this.sellerId.length; i++) {
      debugger
      this.makeapi
        .getproductordercollection(this.sellerId[i])
        .subscribe((res) => {
          debugger;
          res.map((e: any) => {
            this.orders.push(e.payload.doc.data());
          });
          debugger
          this.getProfit()
        });
      console.log(this.orders, 'orders');
    }
    
  }
  getProfit() {
    for(let i=0;i<this.orders.length;i++){
      var amount = parseInt(this.orders[i].price) * parseInt(this.orders[i].quantity)
      this.profitDetails = this.profitDetails + (amount/20)
    }
    console.log(this.profitDetails,'profit')
  }
  logout(){
    this.makeapi.signout().then(()=>{
      localStorage.removeItem("bdata")
      localStorage.removeItem("businessId")
      this.router.navigate(['mainlogin'])
    })
  }
  admin(str: any) {
    if (str == 'customers') {
      this.adminpage = str;
    } else if (str == 'Business') {
      this.adminpage = str;
    } else if (str == 'products') {
      this.adminpage = str;
    } else if (str == 'query') {
      this.adminpage = str;
    }
  }
}
