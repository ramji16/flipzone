import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-main-login-component',
  templateUrl: './main-login-component.component.html',
  styleUrls: ['./main-login-component.component.css'],
})
export class MainLoginComponentComponent implements OnInit {
  businessSignin = [];
  optfullValue: any;
  pno: any;
  userSignin = [];
  udata = [];
  id = null;
  flag: boolean = false;
  flag1 :boolean = false;
  temp = null;
  verify: any;
  uLoginForm: FormGroup;
  submitted = false;
  businessSignInnav = 'userSignIn';
  userId: any;
  user_details = [];
  firstletter = '';
  uid: any;
  check: any;
  otp: any;
  count = 1;
  collectiondata = []
  collectionid = []
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false })
  ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: { width: '50px', height: '50px' },
  };

  // mobileMedia:any =window.matchMedia("(max-width:430px)")
  // largemedia:any=window.matchMedia("(min-width:420px)")
  constructor(
    private makeapi: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    
  }
  ngOnInit(): void {
    this.uLoginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
    });
    // this.otpresposive();
  }
  // otpresposive(){
  //   if( this.mobileMedia.matches){
  //     this.config = {
  //       allowNumbersOnly: true,
  //       length: 6,
  //       isPasswordInput: false,
  //       disableAutoFocus: false,
  //       placeholder: '',
  //       inputStyles: { width: '25px', height: '25px' },
  //     };
    
  //   }
  // }
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
    var countryCode = '+91';
    var phoneNumber = countryCode + phone.phoneNumber;
    this.pno = countryCode + phone.phoneNumber;
    console.log(typeof phoneNumber);
    debugger;
    var reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' }
    );
    // debugger
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, reCaptchaVerifier)
      .then((confirmationResult) => {
        debugger;
        console.log(confirmationResult);
        debugger;
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        // this.router.navigate(['/'])
        debugger;
        this.verify = JSON.parse(localStorage.getItem('verificationId'));
        console.log(this.verify);
      });
    this.flag = true;
  }

  otpcheck(otpCode: any) {
    var otp1 = otpCode;
    console.log(otp1);
    this.optfullValue = otp1;
  }
  userCheck() {
    var temp = []
    var data = JSON.parse(localStorage.getItem('user_data'));
    this.uid = data.user.uid;
    console.log(this.uid);
    this.makeapi.listItem('Users').subscribe(res=>{
      this.udata=res.map((e:any)=>{
        this.collectiondata .push(e.payload.doc.data());
        temp.push(e.payload.doc.data())
        this.collectionid .push(e.payload.doc.id);
        // console.log(this.collectionid.id)
        console.log(temp.length,"tempvalue")

      });
      this.uservalidcheck()
    });
  }
  uservalidcheck(){
    for(let i=0;i<this.collectionid.length;i++){
      if(this.collectionid[i] == this.uid){
        this.flag1=true
        console.log(this.flag1)
        this.router.navigate(['/userhome'])
      }
      else if(this.flag1==false){
        this.count +=1
        console.log(this.flag1)
        if(this.count == this.collectionid.length){
          this.router.navigate(['/userSignUp'])
        }
      }
    }
  }
  home() {
    var otp = this.optfullValue;
    console.log(otp);
    var credentials = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      otp
    );
    debugger;
    firebase
      .auth()
      .signInWithCredential(credentials)
      .then((response) => {
        console.log(typeof response);
        // sessionStorage.setItem('uid',response.user.uid)
        localStorage.setItem('pno', JSON.stringify(this.pno));
        debugger;
        localStorage.setItem('user_data', JSON.stringify(response));
        // this.router.navigate(['/userSignUp']);
        this.userCheck();
        debugger
        // var id = JSON.parse(localStorage.getItem('user_data'));
        // console.log(id.user.uid)
      }).catch((err)=>{
        alert("please verify your OTP")
        window.location.reload()
      })
      // if(flagcheck==true){
      //   debugger
      //   this.router.navigate(['/userhome'])
      // }
      // else{
      //   debugger
      //   this.router.navigate(['/userSignUp'])
      // }
  }
  BusinessSignInNavigate() {
    this.router.navigate(['busniessSignIn']);
  }
}