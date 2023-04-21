import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  electronicsProduct = [];
  fashionProduct = [];
  furnitureProduct = [];
  othersProduct = [];
  productDetails = [];
  product = [];
  productid = [];
  filterValue = 'All';
  bid;
  constructor(private makeapi: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getList();
  }
  filter_value() {
    debugger;
    this.electronicsProduct = []
    this.fashionProduct = []
    this.furnitureProduct = []
    this.othersProduct = []
    for (let i = 0; i < this.product.length; i++) {
      debugger;
      if (this.product[i].category == 'Electronics') {
        this.electronicsProduct.push(this.product[i]);
        debugger;
      }
      if (this.product[i].category == 'Fashion') {
        this.fashionProduct.push(this.product[i]);
        debugger;
      }
      if (this.product[i].category == 'Furniture') {
        this.furnitureProduct.push(this.product[i]);
        debugger;
      }
      if (this.product[i].category == 'Others') {
        this.othersProduct.push(this.product[i]);
        debugger;
      }
    }
    console.log(this.fashionProduct);
    console.log(this.electronicsProduct);
    console.log(this.furnitureProduct);
    console.log(this.othersProduct);
    debugger;
  }

  businessadd(category: any) {
    this.router.navigate(['/businessaddform/'], {
      queryParams: { cat: category },
    });
  }
  getList() {
    var bid = JSON.parse(localStorage.getItem('businessId'));
    this.bid = bid
    console.log(this.bid)
    debugger;
    this.makeapi.getsubcollection(bid).subscribe((res) => {
      this.product = [];
      var details = res.map((e: any) => {
        this.product.push(e.payload.doc.data());
        this.productid.push(e.payload.doc.id)
      });
      console.log(this.product);
      console.log(this.productid)
      debugger;
      this.filter_value();
    });
  }
  filter(option: any) {
    this.filterValue = option;
    console.log(this.filterValue);
  }
  removeItem(i: any) {
    var bid = JSON.parse(localStorage.getItem('businessId'));
    this.makeapi.deletesubcollection(bid, this.productid[i]).then(() => {
      debugger
      alert('Removed Successfully');
      window.location.reload();
    });
  }
}
