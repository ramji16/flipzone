import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe],
})
export class ProfileComponent implements OnInit {
  profile!: FormGroup;
  userlist = [];
  date: any;
  umail: any;
  check: any;
  user_details = [];
  wishlist = 'profile';
  paramsObject: any;
  firstletter: any;
  firstname: any;
  fletter: any;
  lastname: any;
  emailid: any;
  contact: any;
  upass: any;
  userData: any;
  fn: any;
  ln: any;
  em: any;
  pn: any;
  fl: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private makeapi: ApiService,
    private spinner: NgxSpinnerService
  ) {}
  currentDate: any;
  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      uid: [''],
      ufname: new FormControl('', Validators.required),
      ulname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
      ubdate: new FormControl('', Validators.required),
      ugender: new FormControl('', Validators.required),
      uaddress: new FormControl('', Validators.required),
      uwallet: new FormControl('', Validators.required),
    });
    this.currentDate = new Date();

    var id;
    var data = JSON.parse(localStorage.getItem('user_data'));
    // console.log(data)
    if (data != null) {
      this.check = data;
      id = data.user.uid;
      // console.log(id)
      this.makeapi.getItem('Users', id).subscribe((data) => {
        // this.spinner.show();
        // setTimeout(() => {
        //   /** spinner ends after 5 seconds */
        //   this.spinner.hide();
        // }, 3000);
        this.user_details.push(data);
        console.log(this.user_details);
        var user = this.user_details[0];
        this.fl = user.ufname[0];
        this.fn = user.ufname;
        debugger;

        this.profile.patchValue(user);
        console.log(this.profile.value);
      });
      // this.spinner.hide();
    }
    var data = JSON.parse(localStorage.getItem('userDetails'));
    if (data != null) {
      this.userlist = data;
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
      for (let j = 0; j < this.userlist.length; j++) {
        if (data != null) {
          var temp;
          var data = this.userlist[j];
          // debugger
          if (data.umail == this.umail) {
            temp = data.ufname;
            // this.upass=data.usigninPassword;
            // debugger
            this.firstletter = temp.charAt(0);
            this.profile.patchValue(data);
            // debugger
          }
        }
      }
    }
  }

  wishlistnaviagtion() {
    this.router.navigate(['/wishlist']);
  }
  ordersnaviagtion() {
    this.router.navigate(['/orders']);
  }

  // update() {
  //   if (this.profile.invalid) {
  //     //

  //   }
  // }
  back() {
    this.router.navigate(['userhome'], { queryParams: { mail: this.umail } });
  }
  get add() {
    return this.profile.controls;
  }
  refresh() {
    window.location.reload();
  }
  onSubmit() {
    if (this.profile.invalid) {
      var data = JSON.parse(localStorage.getItem('user_data'));
      debugger;
      this.userData = data;
      console.log(data);
      debugger;
      // var userCredential
      var registerdatavalue = this.profile.value;
      this.makeapi.insertuserdata(this.userData, registerdatavalue).then(() => {
        debugger;
        // alert("Updated successfully")
        // window.location.reload();
      });
      this.profile.markAllAsTouched();
    } else {
      var data = JSON.parse(localStorage.getItem('user_data'));
      debugger;
      this.userData = data;
      console.log(data);
      debugger;
      // var userCredential
      var registerdatavalue = this.profile.value;
      this.makeapi.insertuserdata(this.userData, registerdatavalue).then(() => {
        debugger;
        // alert("Updated successfully")
        // window.location.reload();
      });
    }
  }
  wishlistnav(str: any) {
    if (str == 'wishlist') {
      this.wishlist = str;
    } else if (str == 'profile') {
      this.wishlist = str;
      location.reload();
    } else if (str == 'order') {
      this.wishlist = str;
    } else if (str == 'password') {
      this.wishlist = str;
    } else if (str == 'wallet') {
      this.wishlist = str;
    }
    else if (str == 'logout') {
      this.makeapi.signout().then(()=>{
        localStorage.removeItem("user_data")
        localStorage.removeItem("verificationId")
        localStorage.removeItem("pno")
        this.router.navigate(['mainlogin'])
      })
    }
  }
}
