import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
  product=[];
  productDetails=[];
  ind:number;
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) {}
 
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.ind = +params.index;
        console.log(this.ind);
      });
    var path = "assets/JSON/cartdetail.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.productDetails = data;
    console.log('content array')
    console.log(this.productDetails);
    this.product=this.productDetails[+this.ind];
    console.log(this.product);
    //var getdata = JSON.parse(localStorage.getItem(this.cont.heading));
    // if (getdata != null) {
    //   this.comments = getdata;
    //   console.log(this.comments);
    //   this.len=this.comments.length;
    //   console.log(this.len)
    //   debugger
    // }    
    });
  }
  wishlist(){
    this.router.navigate(['wishlist']);
  }
}
