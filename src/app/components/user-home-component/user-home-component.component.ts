import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-home-component',
  templateUrl: './user-home-component.component.html',
  styleUrls: ['./user-home-component.component.css']
})
export class UserHomeComponentComponent implements OnInit {
  userlist=[]
  umail:any;
  upass:any;
  firstletter:any;
  paramsObject: any;
  constructor(private router:Router,private route:ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  //   this.route.queryParams
  //     .subscribe(params => {
  //       this.paramsObject = params.mail;
  //       console.log(this.paramsObject.umail);
  //     });
  //   var data=JSON.parse(localStorage.getItem('userDetails'));
  //   debugger
  //   if(data!=null){
  //     this.userlist=data
  //     for(let i=0;i<this.userlist.length;i++){
  //       var data = this.userlist[i];
  //       var mail:any=this.paramsObject;
  //       debugger
  //       if (data.umail == mail) {
  //         this.umail=mail;
  //         this.upass=data.usigninPassword;
  //         console.log(this.umail);
  //         debugger
  //         break
  //     }
  //   }
  // }
  // for(let j=0;j<this.userlist.length;j++){
  //   if(data!=null){
  //     var temp;
  //     var data = this.userlist[j];
  //       debugger
  //       if (data.umail == this.umail) {
  //         temp=data.ufname
  //         this.firstletter=temp.charAt(0);
  //         debugger
  //         break
  //     }
  //   }
  // }
 }
 shop(){
  this.router.navigate(['/shopping'])
 }
 redirect(){
  this.router.navigate(['/aboutus'])
 }
//  profilenavigate(){
//   this.router.navigate(['/profile'],{queryParams:{mail:this.umail}});
//  }
//  shoppingnavigate(){
//   this.router.navigate(['/shopping'],{queryParams:{mail:this.umail}})
//  }
//  blog(){
//   this.router.navigate(['/blogs'])
//  }
}
