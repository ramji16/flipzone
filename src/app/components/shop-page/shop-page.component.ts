import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  cartDetail = [];
  cartlist = [];
  Gender: FormGroup;
  collectiondata = [];
  category_value = 'all';
  filter_value = [];
  temp = new Set();
  temp_array = []
  true_count = 0;
  sort = new Set();
  sort_array = []
  brand_filter = [];
  fasle_count = 0;
  brand_name = new Set();
  tag_name = new Set();
  checked;
  temp_checked;
  brand_check: boolean = false;
  male: boolean = false;
  female: boolean = false;
  constructor(
    private makeapi: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.data_create();
  }
  data_store() {
    for (let i = 0; i <= this.collectiondata.length; i++) {
      debugger;
      this.makeapi.getsubcollection(this.collectiondata[i]).subscribe((res) => {
        debugger;
        res.map((e: any) => {
          this.cartDetail.push(e.payload.doc.data());
        });
        this.spinner.hide();
      });
    }
    console.log(this.cartDetail);
  }
  data_create() {
    if (this.collectiondata.length == 0) {
      debugger;
      this.spinner.show();
      this.makeapi.listItem('Business').subscribe((res) => {
        debugger;
        this.cartlist = res.map((e: any) => {
          // var collection = e.payload.doc.data();
          this.collectiondata.push(e.payload.doc.id);
          debugger;
          console.log(this.collectiondata);
        });
        debugger;
        this.data_store();
      });
    } else {
      debugger;
      this.data_store();
    }
  }
  category(event: any) {
    this.filter_value = [];
    this.category_value = event;
    this.brand_name.clear();
    console.log(this.category_value);
    var brand = [];
    if (this.category_value != 'all') {
      for (let i = 0; i < this.cartDetail.length; i++) {
        if (this.category_value == this.cartDetail[i].category) {
          this.filter_value.push(this.cartDetail[i]);
          debugger;
        }
      }
      this.temp_checked = false;
    }
    var tag = [];
    for (let i = 0; i < this.filter_value.length; i++) {
      tag.push(this.filter_value[i].tag);
    }
    this.tag_name = new Set(tag);
    console.log(this.tag_name, 'tag');
    console.log(this.filter_value);
    this.temp.clear();
  }
  category2(event: any) {
    var tagname = event;
    this.temp.clear();
    this.temp_array=[];
    this.brand_name.clear();
    this.temp_checked = true;
    this.brand_check = false;
    console.log(tagname);
    debugger;
    for (let i = 0; i < this.filter_value.length; i++) {
      debugger;
      if (tagname == this.filter_value[i].tag) {
        this.temp.add(this.filter_value[i]);
        this.temp_array.push(this.filter_value[i])
        this.brand_name.add(this.filter_value[i].brandName);
        debugger;
      }
    }
    console.log(this.temp, 'temp');
  }
  productview(ind: any) {
    this.router.navigate(['/productview'], {
      queryParams: { item: JSON.stringify(ind) },
    });
  }
  cartview() {
    this.router.navigate(['cart']);
  }
  wishlist(data) {
    var userid = JSON.parse(localStorage.getItem('user_data'));
    console.log(userid.user.uid);
    console.log(data);
    this.makeapi.createwishlistcollection(userid.user.uid, data);
    alert('Product added to Wishlist');
  }

  order(data) {
    var userid = JSON.parse(localStorage.getItem('user_data'));
    console.log(userid.user.uid);
    console.log(data);
    this.makeapi.createordercollection(userid.user.uid, data);
    alert('Product added to cart');
  }
  filter(event, gen) {
    this.checked = event.checked;
    this.brand_check = true;
    var gend = gen;
    if (this.checked == true) {
      for (let i = 0; i < this.temp_array.length; i++) {
        debugger;
        if (gend == this.temp_array[i].brandName) {
          debugger;
          this.sort_array.push(this.temp_array[i]);
        }
      }
    }
    this.false_fun(gend);
    this.sort = new Set(this.sort_array)
    console.log(this.sort)
    if (this.sort.size == 0) {
      this.brand_check = false;
    }
  }
  false_fun(gend) {
    if (this.checked == false) {
      debugger;
      for (let i = 0; i < this.sort_array.length; i++) {
        if (gend == this.sort_array[i].brandName) {
          this.sort_array.splice(i,1);
          debugger;
        }
      }
      console.log(this.sort_array);
    }
  }
}
