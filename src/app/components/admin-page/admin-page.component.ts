import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
   adminpage='customers'
   str:any
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  admin(str:any){
    if(str =='customers'){
      this.adminpage =str;
    }
    else if(str =='Business'){
      this.adminpage =str;
    }
    else if(str =='products'){
      this.adminpage =str;
    }
  }
}
