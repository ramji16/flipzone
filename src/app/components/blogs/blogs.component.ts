import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  length:any;
  products =[];
  currentDate = new Date();
  constructor(private route:ActivatedRoute,private router : Router,private http : HttpClient) { 
  }
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.length = params.com;
        console.log(this.length);
      });
    var path = "assets/JSON/product.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.products = data;
    console.log(this.products);
    });
  }
  blogcont(ind:number){
    console.log(typeof(ind))
    this.router.navigate(['/blogcontent'],{queryParams:{index:ind}});
  }
  navigate(){
    this.router.navigate(['/blogcontent']);
  }

  // electronics(){
  //   this.route.navigate(['/electronics']);
  // }
  // furnitures(){
  //   this.route.navigate(['/furnitures']);
  // }
  // tools(){
  //   this.route.navigate(['/tools']);
  // }

}
