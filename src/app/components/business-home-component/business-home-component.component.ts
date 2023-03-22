import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-business-home-component',
  templateUrl: './business-home-component.component.html',
  styleUrls: ['./business-home-component.component.css']
})
export class BusinessHomeComponentComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  businessorder(){
    this.router.navigate(['/businessorder/']);
  }
  businessproduct(){
    this.router.navigate(['/businesslist/']);
  }
  businessadd(category:any){
    this.router.navigate(['/businessaddform/'],{queryParams:{cat:category}});

  }
  profilenav(){
    this.router.navigate(['/businessprofile'])
  }
}
