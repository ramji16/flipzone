import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
  product=[];
  productDetails=[];
  data;
  cartlist=[];
  paramsObject: any = {};
  collectiondata=[];
  constructor(private makeapi:ApiService,private router:Router,private route:ActivatedRoute,private http:HttpClient) {}
 
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.paramsObject=params.item
          debugger
          console.log(Object.entries(this.paramsObject))
      });
      // this.data_create() 
    // var path = "assets/JSON/cartdetail.json";
    // this.http.get<any>(path).subscribe( data =>
    // {
    // this.productDetails = data;
    // console.log('content array')
    // console.log(this.productDetails);
    // this.product=this.productDetails[+this.ind];
    // console.log(this.product);
    //var getdata = JSON.parse(localStorage.getItem(this.cont.heading));
    // if (getdata != null) {
    //   this.comments = getdata;
    //   console.log(this.comments);
    //   this.len=this.comments.length;
    //   console.log(this.len)
    //   debugger
    // }    
    // });
  }
  wishlist(){
    this.router.navigate(['wishlist']);
  }
  // data_create() {
  //     this.makeapi.listItem('Business').subscribe( (res) => {
  //       debugger;
  //       this.cartlist = res.map((e: any) => {
  //         // var collection = e.payload.doc.data();
  //         this.collectiondata.push(e.payload.doc.id);
  //         debugger
  //       });
  //       debugger
  //       // this.data_store();
  //     });
  // }
  // data_store(){
  //     debugger
  //     this.makeapi.getproductdetails(,this.collectiondata[this.ind]).subscribe((res) => {
  //       debugger;
        
  //         this.productDetails.push(data());
  //         debugger
  //         console.log(this.productDetails);
        
  //     });
  //     console.log(this.productDetails);
  // }
}
