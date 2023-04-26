import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-sign-up',
  templateUrl: './business-sign-up.component.html',
  styleUrls: ['./business-sign-up.component.css']
})
export class BusinessSignUpComponent implements OnInit {
  bSigninForm!:FormGroup
  newuser = []
  showpassword= false;
  // eventautherror: any;
  private eventautherror = new BehaviorSubject<string>("");
  eventautherror$ = this.eventautherror.asObservable();
  constructor(private makeapi:ApiService,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bSigninForm = this.formBuilder.group({
      // bid: [''],
      bCompanyName: ['', Validators.required],
      bOwnerName: ['', Validators.required],
      bmobile: ['', Validators.required],
      Password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    
  }
  toggleShow(){
    this.showpassword = !this.showpassword;
   }
  get add(){
    return this.bSigninForm.controls
  }
  // onSubmit(){
  //   if(this.bSigninForm.invalid){
  //     this.bSigninForm.markAllAsTouched();
  //     return
  //   }
  // }
  RegisterBtn() {
    if (this.bSigninForm.invalid) {
      this.bSigninForm.markAllAsTouched()
      return;
    } else {
      var registerdata = this.bSigninForm.value      
      this.makeapi.registerItem(registerdata).then(UserCredential => {      
        debugger  
        this.newuser = registerdata 
        registerdata.uid=UserCredential.user.uid
        this.bSigninForm.patchValue(registerdata)
        debugger
        sessionStorage.setItem('uid',UserCredential.user.uid)   
        UserCredential.user.updateProfile({
          displayName: registerdata.bOwnerName
        })     
        debugger   
        this.makeapi.insertbusinessdata(UserCredential, registerdata).then(() => {
          this.router.navigate(['/busniessSignIn'])
          // this.resetForm();
        }).catch(error => {
          // this.eventautherror.next(error);
          // this.notify.notifyError(error.message)
        })
      }).catch(error => {
        debugger
        this.eventautherror.next(error);
        // this.notify.notifyError(error.message)
      })
    }
  }
  back(){
    this.router.navigate(['busniessSignIn'])
    
  }
}
