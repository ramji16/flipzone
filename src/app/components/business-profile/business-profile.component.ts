import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  date:any
  wishlist='profile'
  bprofile!:FormGroup;
  userlist=[];
  umail:any;
  paramsObject: any;
  firstletter: any;
  upass: any;
  constructor(private router : Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bprofile=this.formBuilder.group({
      bid: [''],
      bCompanyName: ['', Validators.required],
      bOwnerName: ['', Validators.required],
      bmobile: ['', Validators.required],
      bsigninPassword: ['', Validators.required],
      baddress: ['', Validators.required],
      bmail: ['', [Validators.required, Validators.email]],
    });
  }
  back(){
    this.router.navigate(['/businesshome'],{queryParams:{mail:this.umail}});
  }
  get add(){
    return this.bprofile.controls
  }
  onSubmit(){
    if(this.bprofile.invalid){
      this.bprofile.markAllAsTouched();
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
