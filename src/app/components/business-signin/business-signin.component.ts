import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-signin',
  templateUrl: './business-signin.component.html',
  styleUrls: ['./business-signin.component.css']
})
export class BusinessSigninComponent implements OnInit {
  bLoginForm: FormGroup;
  constructor(private makeapi:ApiService,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bLoginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get add(){
    return this.bLoginForm.controls
  }
  signInBtn() {
    if (this.bLoginForm.invalid) {
      this.bLoginForm.markAllAsTouched()
      // this.notify.notifyError('Form is Invaild')    
      return;
    } else {
      var loginval = this.bLoginForm.value
      this.makeapi.login(loginval.email, loginval.password).then(UserCredential => {  
          var bid = UserCredential.user.uid
          console.log(bid);
          localStorage.setItem('businessId',JSON.stringify(bid))
          this.router.navigate(['/businesshome'])
          // this.resetForm();
      }).catch(error => {
        // this.eventautherror.next(error);
        // this.notify.notifyError(error.message)        
      })
    }
  }

  BusinesssignUpNavigate(){
    this.router.navigate(['busniessSignUp']);
  }
}
