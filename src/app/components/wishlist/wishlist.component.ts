import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
 wishlist=[]
 wishlen:number;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    var path = "assets/JSON/wishlist.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.wishlist=[]= data;
    this.wishlen = this.wishlist.length;
    // console.log(this.products);
    });
   
  }
  delete(i:any){
    for (let item=0;item<this.wishlist.length;item++){
      if(item == i){
        this.wishlist.splice(i,1);
      }
    }
  }
}
