import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  date=new Date();
  day=this.date.getDay()
  month=this.date.getMonth()
  year=this.date.getFullYear()
  time= this.day+'/'+this.month+'/'+this.year
  constructor() { }

  ngOnInit(): void {
  }

}
