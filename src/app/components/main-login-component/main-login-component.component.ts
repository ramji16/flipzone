import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import * as firebase from 'firebase';
import { ApiService } from 'src/app/services/api.service';

declare var $: any;
@Component({
  selector: 'app-main-login-component',
  templateUrl: './main-login-component.component.html',
  styleUrls: ['./main-login-component.component.css'],
})
export class MainLoginComponentComponent implements OnInit {
  businessSignin = [];
  userSignin = [];
  id = null;
  pno:any;
  flag: boolean = false;
  temp = null;
  verify: any;
  uLoginForm: FormGroup;
  submitted = false;
  businessSignInnav = 'userSignIn';
  constructor(
    private makeapi: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.uLoginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      otp: [''],
    });

  }
  get add() {
    return this.uLoginForm.controls;
  }
  onSubmit() {
    if (this.uLoginForm.invalid) {
      this.uLoginForm.markAllAsTouched();
      return;
    }
  }
  getOTP() {
    var phone = this.uLoginForm.value;
    var phoneNumber = phone.phoneNumber;
    this.pno = phone.phoneNumber
    debugger
    console.log(typeof phoneNumber);
   
    var reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' }
    );
    // debugger
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, reCaptchaVerifier)
      .then((confirmationResult) => {
      
        console.log(confirmationResult);
      
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.verify = JSON.parse(localStorage.getItem('verificationId'));
        console.log(this.verify);
      });
    this.flag = true;
  
  }

  home() {
    var data = this.uLoginForm.value;
    var otp = data.otp
    var credentials = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      otp
    )

    firebase.auth().signInWithCredential(credentials).then((response)=>{
      console.log(typeof(response))
      // sessionStorage.setItem('uid',response.user.uid)
      localStorage.setItem('pno',JSON.stringify(this.pno))
      debugger
      localStorage.setItem('user_data',JSON.stringify(response))
      this.router.navigate(['/userSignUp']);
    })
    
  }
  UsersignInNavigate() {
    this.router.navigate(['userSignUp']);
  }
  BusinessSignInNavigate() {
    this.router.navigate(['busniessSignIn']);
  }
}
