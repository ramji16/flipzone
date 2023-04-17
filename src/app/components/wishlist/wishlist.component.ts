import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
declare var $ :any

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist=[]
  collectiondata = [];
  userid ;
  wishlistid=[]
  wishlen: number;

  constructor(private router:Router, private makeapi: ApiService) {}


  ngOnInit(): void {
    // this.wishlistid.set();
    // this.wishlist.set()
    this.getlist()
  }
  
  back(){
    this.router.navigate(['/profile']);
  }

  delete(i) {
    var user = this.wishlistid[i]
    console.log(user)
    this.makeapi.deletewishlistcollection(this.userid.user.uid,user).then(data=>{
      alert('Product removed');
      this.getlist()
    })
    
    // setTimeout(()=>{                           
    //   window.location.reload()
    // }, 1000);
  }
  getlist(){
    this.userid = JSON.parse(localStorage.getItem('user_data'));
    this.makeapi.getwishlistcollection(this.userid.user.uid).subscribe((res) => {
      debugger;
      this.wishlist=[]
      res.map((e: any) => {
        this.wishlist.push(e.payload.doc.data());
        this.wishlistid.push(e.payload.doc.id);
      });
    });
  }
  move_to(){
     for(let i=0;i<this.wishlist.length;i++){
      this.makeapi.createordercollection(this.userid.user.uid,this.wishlist[i]);
     }
   
    //  $('#staticBackdrop').modal('hide')
  }
  navigation(){
    this.router.navigate(['/cart'])
  }
}
