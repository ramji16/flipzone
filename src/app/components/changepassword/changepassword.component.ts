import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  userDetail = []
  userEmail:string;
  constructor(private makeApi: ApiService) { }

  ngOnInit(): void {
    this.getDetail()
  }
  getDetail(){
    var bid = JSON.parse(localStorage.getItem('businessId'))
    debugger
    this.makeApi.getItem('Business',bid).subscribe(res => {
      this.userDetail.push(res)
      debugger
    })
    console.log(this.userDetail)
    this.userEmail = this.userDetail[0].email
    debugger
  }

}
