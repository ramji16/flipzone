import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-home-component',
  templateUrl: './user-home-component.component.html',
  styleUrls: ['./user-home-component.component.css']
})
export class UserHomeComponentComponent implements OnInit {
  userlist=[]
  umail:any;
  upass:any;
  firstletter:any;
  paramsObject: any;
  collectiondata = []
  cartDetail = []
  cartlist = []
  products = []
  constructor(private router:Router,private route:ActivatedRoute, private spinner: NgxSpinnerService, private api:ApiService) { }

  ngOnInit(): void {
    this.data_create()
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  
 }
 shop(){
  this.router.navigate(['/shopping'])
 }
 productview(ind: any) {
  this.router.navigate(['/productview'], {
    queryParams: { item: JSON.stringify(ind) },
  });
}
order(data) {
  var userid = JSON.parse(localStorage.getItem('user_data'));
  console.log(userid.user.uid);
  console.log(data);
  this.api.createordercollection(userid.user.uid, data);
  alert('Product added to cart');
}
wishlist(data) {
  var userid = JSON.parse(localStorage.getItem('user_data'));
  console.log(userid.user.uid);
  console.log(data);
  this.api.createwishlistcollection(userid.user.uid, data);
  alert('Product added to Wishlist');
}
 redirect(){
  this.router.navigate(['/aboutus'])
 }
 data_store() {
  for (let i = 0; i <= this.collectiondata.length; i++) {
    this.api.getsubcollection(this.collectiondata[i]).subscribe((res) => {
      res.map((e: any) => {
        this.cartDetail.push(e.payload.doc.data());
      });
    });
  }
  // console.log(this.cartDetail);
  // this.products = this.cartDetail.slice(0,2)
  // debugger
  // console.log(this.products,"home page products")
}
data_create() {
  if (this.collectiondata.length == 0) {
    debugger;
    
    this.api.listItem('Business').subscribe((res) => {
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
}
