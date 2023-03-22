import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  cartDetail=[];
  
  constructor(private makeapi:ApiService,private router :Router,private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<any>('assets/JSON/cartdetail.json').subscribe(
      data=>{
        // console.log(data);
        this.cartDetail = data;
        console.log(this.cartDetail);
      }
    )
  }
  productview(ind:number){
    this.router.navigate(['/productview'],{queryParams:{index:ind}})
  }
  cartview(){
    this.router.navigate(['cart']);
  }
}