import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  cartlist=[]
  cartlen:number
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    var path = "assets/JSON/cart.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.cartlist=[]= data;
    this.cartlen = this.cartlist.length;
    // console.log(this.products);
    });
  }
  delete(i:any){
    for (let item=0;item<this.cartlist.length;item++){
      if(item == i){
        this.cartlist.splice(i,1);
      }
    }
    // localStorage.setItem('scartlist',JSON.stringify(this.cartlist));
  }

}
