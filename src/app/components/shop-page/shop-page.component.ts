import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  cartDetail = [];
  cartlist = [];
  Gender:FormGroup
  collectiondata = [];
  category_value='all';
  filter_value=[];
  temp=[]
  male:boolean=false
  female:boolean=false
  constructor(
    private makeapi: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.data_create()
  }
  data_store(){
    for(let i=0;i<=this.collectiondata.length;i++){
      debugger
      this.makeapi.getsubcollection(this.collectiondata[i]).subscribe((res) => {
        debugger;
        res.map((e: any) => {
          this.cartDetail.push(e.payload.doc.data());
        });
      });
    }
    console.log(this.cartDetail);
  }
  data_create() {
    if(this.collectiondata.length == 0){
      debugger
      this.makeapi.listItem('Business').subscribe( (res) => {
        debugger;
        this.cartlist = res.map((e: any) => {
          // var collection = e.payload.doc.data();
          this.collectiondata.push(e.payload.doc.id);
          debugger;
          console.log(this.collectiondata);
        });
        debugger
        this.data_store()
      });
    }
    else{
      debugger
      this.data_store();
    } 
  }
  category(event:any){
  this.filter_value=[]
   this.category_value = event
    console.log(this.category_value)
      if(this.category_value!='all'){
        for(let i=0;i<this.cartDetail.length;i++){
          if(this.category_value==this.cartDetail[i].category){
            this.filter_value.push(this.cartDetail[i])
          }
        }
      }
    console.log(this.filter_value)
  }
  productview(ind:any) {
    this.router.navigate(['/productview'], {queryParams:{item:JSON.stringify(ind)}});
  }
  cartview() {
    this.router.navigate(['cart']);
  }
  wishlist(data){
    var userid = JSON.parse(localStorage.getItem('user_data'))
    console.log(userid.user.uid)
    console.log(data)
    this.makeapi.createwishlistcollection(userid.user.uid,data)
    alert('Product added to Wishlist')
  }

  order(data){
    var userid = JSON.parse(localStorage.getItem('user_data'))
    console.log(userid.user.uid)
    console.log(data)
    this.makeapi.createordercollection(userid.user.uid,data)
    alert('Product added to cart')
  }
  filter(event,gen){
    console.log(event.checked,gen)
      if(event.checked==true){
        for(let j=0;j<this.filter_value.length;j++){
          debugger
          if (gen==this.filter_value[j].gender){
            this.temp.push(this.filter_value[j])
          }
        }
        console.log(this.temp)
      }
  }
}
