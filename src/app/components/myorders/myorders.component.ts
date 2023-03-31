import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  order = [];
  collectiondata = [];
  userid ;
  orderid = []
  wishlen: number;
  date=new Date();
  day=this.date.getDay()
  // month=this.date.getMonth()
  // year=this.date.getFullYear()
  time;
  dtime;
  constructor(private router:Router, private makeapi: ApiService) { }

  ngOnInit(): void {
    var today = new Date(this.date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    // if (dd < 10)
    //    dd = '0' + String(dd)
    // if (mm < 10)
    //     mm = '0' + String(mm)

    this.time = dd + '/' + mm + '/' + yyyy;
    this.dtime = (10+dd) + '/' + mm + '/' + yyyy;


    this.userid = JSON.parse(localStorage.getItem('user_data'));
    this.makeapi.getboredercollection(this.userid.user.uid).subscribe((res) => {
      debugger;
      res.map((e: any) => {
        this.order.push(e.payload.doc.data());
        this.orderid.push(e.payload.doc.id);
      });
    });
    console.log(this.order);
    console.log(this.orderid)
  }
  back(){
    this.router.navigate(['/profile']);
  }

}
