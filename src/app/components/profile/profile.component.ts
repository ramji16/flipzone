import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!:FormGroup;
  userlist=[];
  date:any
  umail:any;
  wishlist='profile'
  paramsObject: any;
  firstletter: any;
  upass: any;
  constructor(private router:Router,private formBuilder: FormBuilder,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.profile=this.formBuilder.group({
      uid:[''],
      ufname: new FormControl('', Validators.required),
      ulname: new FormControl('', Validators.required),
      umail: new FormControl('', [Validators.required, Validators.email]),
      umobile:new FormControl('',Validators.required),
      ubdate: new FormControl('', Validators.required),
      ugender: new FormControl('', Validators.required),
      uaddress: new FormControl('', Validators.required),
      usigninPassword:new FormControl('',Validators.required)
    });
    this.route.queryParams
      .subscribe(params => {
        this.umail = params.mail;
        console.log(this.paramsObject);
      });
    var data=JSON.parse(localStorage.getItem('userDetails'));
    debugger
    if(data!=null){
      this.userlist=data
      // for(let i=0;i<this.userlist.length;i++){
      //   var data = this.userlist[i];
      //   var mail:any=this.paramsObject;
      //   debugger
      //   if (data.umail == mail) {
      //     this.umail=mail;
      //     console.log(this.umail);
      //     debugger
      //     break
      // }
    // }
    for(let j=0;j<this.userlist.length;j++){
      if(data!=null){
        var temp;
        var data = this.userlist[j];
          debugger
          if (data.umail == this.umail) {
            temp=data.ufname
            // this.upass=data.usigninPassword;
            debugger
            this.firstletter=temp.charAt(0);
            this.profile.patchValue(data)
            debugger
            
          }
        }
      }
    }
  }
  update(){
    var count;
    var data=JSON.parse(localStorage.getItem('userDetails'));
    debugger
    if(data!=null){
      this.userlist=data
      var temp=this.profile.value
      for(let i=0;i<this.userlist.length;i++){
        var data = this.userlist[i];
        debugger
        if(data.umail==this.umail){
          count=i
          debugger
          if(temp.ufname==data.ufname && temp.ulname==data.ulname && temp.ucountry==data.ucountry){
            console.log('no change');
            debugger
            break
          }
          else{
            this.userlist[i]=temp;
            var str = JSON.stringify(this.userlist);
            localStorage.setItem('userDetails', str);
            // JSON.stringify(localStorage.setItem('userDetails',splice(i,0,str)))
            debugger
            alert('Updated Successfully');
          }
        }
      }
    }
  }
  back(){
    this.router.navigate(['userhome'],{queryParams:{mail:this.umail}});
  }
  get add(){
    return this.profile.controls
  }
  onSubmit(){
    if(this.profile.invalid){
      this.profile.markAllAsTouched();
      return
    }
  }
  wishlistnav(str:any){
    if(str=="wishlist"){
      this.wishlist=str;
    }
    else if(str=="profile"){
      this.wishlist=str;
    }
    else if (str=="order"){
      this.wishlist=str
    }
    else if(str=='password'){
      this.wishlist=str
    }
    else if (str=='wallet'){
      this.wishlist=str
    }
  }
}
