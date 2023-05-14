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
  productDetails:any;
  cartlist=[];
  collectiondata=[];
  productname;
  price
  description;
  category;
  tag;
  photo: any;
  quan:any=1;
  colors: string[] = [
    '#b3478c', '#1e62c0', '#ffa764', '#3de68b', '#a11f2a', '#ffbf00'
  ];
  selectedColor
  constructor(private makeapi:ApiService,private router:Router,private route:ActivatedRoute,private http:HttpClient) {}
 
  ngOnInit(): void {
   this. selectedColor = this.colors[0];
    this.route.queryParams
      .subscribe(params => {
          this.productDetails=JSON.parse(params.item)
          if(this.productDetails!=null){
            console.log(this.productDetails.category)
          }
          debugger
       this.productname=this.productDetails.productName
       this.price=this.productDetails.price
       this.description=this.productDetails.description
       this.category=this.productDetails.category
       this.tag=this.productDetails.tag
       this.photo=this.productDetails.photo
       console.log(this.productDetails.electronicType)
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
  order(){
    var userid = JSON.parse(localStorage.getItem('user_data'))
    console.log(userid.user.uid)
    console.log(this.productDetails)
    this.makeapi.createordercollection(userid.user.uid,this.productDetails)
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      alert('Product added to order')
    }, 3000);
    this.router.navigate(['/cart'], {
      queryParams: { quan:this.quan },
    });
  }
  increment(){
    this.quan+=1;
  }
  decrement(){
    if(this.quan<=1){
      this.quan=1
    }
    else{
      this.quan-=1;
    }
  }
}
