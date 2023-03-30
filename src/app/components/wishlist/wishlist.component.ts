import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist = [];
  collectiondata = [];
  userid ;
  wishlistid = []
  wishlen: number;
  constructor(private http: HttpClient, private makeapi: ApiService) {}

  ngOnInit(): void {
    this.userid = JSON.parse(localStorage.getItem('user_data'));
    this.makeapi.getwishlistcollection(this.userid.user.uid).subscribe((res) => {
      debugger;
      res.map((e: any) => {
        this.wishlist.push(e.payload.doc.data());
        this.wishlistid.push(e.payload.doc.id);
      });
    });
    console.log(this.wishlist);
    console.log(this.wishlistid)
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
}
