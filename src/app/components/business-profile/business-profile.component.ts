import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css'],
  providers:[DatePipe]
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
  check:any;
  buser_details=[]
  bcn:any;
  bon:any;
  be:any;
  bm:any;
  buserData:any;
  bsid:any
  pw:any
  constructor(private router : Router,private formBuilder: FormBuilder,private makeapi : ApiService) { }

  ngOnInit(): void {
    this.date = new Date();
    var id;
    var data = JSON.parse(localStorage.getItem('businessId'))
    // console.log(data) 
    if (data != null) {
      this.check = data
       id = this.check

      // console.log(id)
      this.makeapi.getItem('Business', id).subscribe(data => {
        this.buser_details.push(data)
        var buser = this.buser_details[0]
        this.firstletter=buser.bOwnerName[0];
        // debugger
        var getdata = this.bprofile.value
        this.bcn=(getdata.bCompanyName = buser.bCompanyName)
        this.bon=(getdata.bOwnerName =  buser. bOwnerName)
        this.be=(getdata.email = buser.email)
        this.bm=(getdata.bmobile = buser.bmobile)
        this.pw=(getdata.Password= buser.Password)
        getdata.baddress = buser.baddress
        this.bprofile.patchValue(getdata)
        debugger
      })

    }

    this.bprofile=this.formBuilder.group({
      bid: [''],
      bCompanyName: ['', Validators.required],
      bOwnerName: ['', Validators.required],
      bmobile: ['', Validators.required],
      Password: [''],
      baddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // password:['']
    });
  }
  back(){
    this.router.navigate(['/businesshome'],{queryParams:{mail:this.umail}});
  }
  get add(){
    return this.bprofile.controls
  }
  
    
  
  onSubmit(){
    debugger
    if(this.bprofile.invalid){
      this.bprofile.markAllAsTouched();
      return
    }
    else{
      var data = JSON.parse(localStorage.getItem('businessId'))
      debugger
      this.buserData = data
      console.log(data)
     var bdata = JSON.parse(localStorage.getItem('bdata'))
       this.bsid = bdata;
      // var registerdata = this.profile.value
      // registerdata.uid = this.userData.user.uid
      // var getdata = this.profile.value;
      // var get=getdata.phoneNumber=this.umobile;
      // this.profile.patchValue(get)
      //   debugger
      // this.profile.patchValue(registerdata)
      debugger
      // var userCredential
      var registerdatavalue = this.bprofile.value;
      this.makeapi.insertbusinessdata(this.bsid, registerdatavalue).then(() => {
        debugger
       alert("updated successfully ")
      window.location.reload();
        // this.resetForm();
      })
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
