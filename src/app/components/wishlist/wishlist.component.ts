import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist = [];
  collectiondata = [];
  userid ;
  wishlistid = []
  wishlen: number;
  constructor(private router:Router, private makeapi: ApiService) {}

  ngOnInit(): void {
    var path = "assets/JSON/wishlist.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.wishlist=[]= data;
    this.wishlen = this.wishlist.length;
    // console.log(this.products);
    });
   
  }
  back(){
    this.router.navigate(['/profile']);
  }
  delete(i) {
    var user = this.wishlistid[i]
    console.log(user)
    this.makeapi.deletewishlistcollection(this.userid.user.uid,user)
    alert('Product removed')
    setTimeout(()=>{                           
      window.location.reload()
    }, 1000);
  }
  move_to(){
     for(let i=0;i<this.wishlist.length;i++){
      this.makeapi.createordercollection(this.userid.user.uid,this.wishlist[i]);
     }
    setTimeout(() => {
      alert('added to cart succesfully')
      this.router.navigate(['/cart'])
    }, 1000);
  }
}
