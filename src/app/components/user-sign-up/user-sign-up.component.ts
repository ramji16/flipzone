import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  uSigninForm!:FormGroup
  newuser=[]
  pno:any;
  userData :any
  constructor(private router:Router,private formBuilder: FormBuilder,private makeapi : ApiService) { }

  ngOnInit(): void {
  
    this.uSigninForm = this.formBuilder.group({
        uid: [''],
        ufname: ['', Validators.required],
        ulname: ['', Validators.required],
        // umobile: ['', Validators.required],
        phoneNumber: [''],
        email: ['', [Validators.required, Validators.email]],
      });
      var data = JSON.parse(localStorage.getItem('pno'))
      console.log(typeof(data))
      if(data!=null){
        this.pno = data;
        console.log(this.pno)
        var getdata = this.uSigninForm.value;
        var get=getdata.phoneNumber=this.pno;
        this.uSigninForm.patchValue(get)
        debugger
      }
      
  }
  get add(){
    return this.uSigninForm.controls
  }
  onSignup(){
    debugger
    if(this.uSigninForm.invalid){
      debugger
      this.uSigninForm.markAllAsTouched();
      return
    }
    else {
      debugger
      // var data = []
      // data.push(sessionStorage.getItem('uid'));
      // var newdata = data[0]
      var data = JSON.parse(localStorage.getItem('user_data'))
      debugger
      this.userData = data
      console.log(data)

      var registerdata = this.uSigninForm.value
      registerdata.uid=this.userData.user.uid
      var getdata = this.uSigninForm.value;
      var get=getdata.phoneNumber=this.pno;
      this.uSigninForm.patchValue(get)
        debugger
      this.uSigninForm.patchValue(registerdata)
      debugger
      // var userCredential
      var registerdatavalue = this.uSigninForm.value
      this.makeapi.insertuserdata(this.userData,registerdatavalue).then(() => {
        debugger
        this.router.navigate(['/userhome'])

        // this.resetForm();
      }).catch(error => {
        // this.eventautherror.next(error);
        // this.notify.notifyError(error.message)
      })
      
    }
  }
  back(){
    this.router.navigate(['mainlogin'])
  }
}
