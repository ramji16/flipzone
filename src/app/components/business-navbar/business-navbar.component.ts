import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-navbar',
  templateUrl: './business-navbar.component.html',
  styleUrls: ['./business-navbar.component.css']
})
export class BusinessNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }
  businessadd(category:any){
    this.router.navigate(['/businessaddform/'],{queryParams:{cat:category}});

  }
}
