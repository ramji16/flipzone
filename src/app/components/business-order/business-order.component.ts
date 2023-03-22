import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.css']
})
export class BusinessOrderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // redirectform(){
  //   this.router.navigate(['/businessaddform']);
  // }

}
