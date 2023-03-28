import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {
  // private get =new BehaviorSubject<string>('');
  // getdata$= this.get.asObservable(); 
  userId:any
  user_details=[]
  firstletter=''
  check:any
  constructor(private router:Router,private makeapi :ApiService) { }

  ngOnInit(): void {
    var id;
    var data = JSON.parse(localStorage.getItem('user_data')) 
    if(data!=null){
      this.check=data
    id=data.user.uid
    // console.log(id)
    this.makeapi.getItem('Users',id).subscribe(data=>{
      // debugger
      this.user_details.push(data)
      // console.log(this.user_details)
      var fname=this.user_details[0]
      this.firstletter=fname.ufname[0]
    })
    
    }
  }
  profile(){
    this.router.navigate(['/profile']);
  }
}
