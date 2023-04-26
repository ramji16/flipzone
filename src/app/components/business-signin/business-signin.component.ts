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
  showpassword= false;
  constructor(private makeapi:ApiService,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bLoginForm = this.formBuilder.group({
      Password: ['', Validators.required],
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
      this.makeapi.login(loginval.email, loginval.Password).then(UserCredential => {  
          var bid = UserCredential.user.uid
          console.log(bid);
          localStorage.setItem('bdata',JSON.stringify(UserCredential))
          localStorage.setItem('businessId',JSON.stringify(bid))
          this.router.navigate(['/businesshome'])
          // this.resetForm();
      }).catch(error => {
        alert("Please check the username and password");
        window.location.reload()  
      })
    }
  }

 toggleShow(){
  this.showpassword = !this.showpassword;
 }
  BusinesssignUpNavigate(){
    this.router.navigate(['busniessSignUp']);
  }
back(){
  this.router.navigate(['mainlogin']);
}
}