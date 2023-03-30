import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  collectiondata = [];

  constructor(
    private makeapi: ApiService,
    private router: Router,
    private http: HttpClient
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
  productview(ind: number) {
    this.router.navigate(['/productview'], { queryParams: { index: ind } });
  }
  cartview() {
    this.router.navigate(['cart']);
  }
}
