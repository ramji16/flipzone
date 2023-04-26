import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-changepassword',
  templateUrl: './business-changepassword.component.html',
  styleUrls: ['./business-changepassword.component.css']
})
export class BusinessChangepasswordComponent implements OnInit {
  userDetail = []
  userEmail:string;
  constructor(private makeApi: ApiService) { }

  ngOnInit(): void {
    this.getDetail()
  }
  getDetail(){
    var bid = JSON.parse(localStorage.getItem('businessId'))
    debugger
    this.makeApi.getItem('Business',bid).subscribe((data) => {
        this.userDetail.push(data)
        this.userEmail = this.userDetail[0].email
      debugger
    })
    console.log(this.userDetail)
    
    debugger
  }

}
