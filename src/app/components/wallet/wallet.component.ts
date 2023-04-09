import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  flag=false
  flag1=false
  uid;
  Userwallet!:FormGroup
  constructor(private makeapi:ApiService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.Userwallet = this.formBuilder.group({
      // bid: [''],
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expirydate: ['', Validators.required],
      cvv: ['', Validators.required],
      amount:['']
    });
  }
  cardActivate(){
    this.flag=true;
  }
  amount_card(){
    this.flag1=true
  }
  saveWallet(){
    var userdata=JSON.parse(localStorage.getItem('user_data'))
    this.uid=userdata.user.uid
    var data=this.Userwallet.value
    this.makeapi.createwalletcollection(this.uid,data)
    alert("Card has been Saved")
  }
  add_amount(){
    var card_details=this.makeapi.getwalletcollection(this.uid)
    if(card_details!=null){
      var userdata=JSON.parse(localStorage.getItem('user_data'))
      console.log(card_details)
      var uid=userdata.user.uid
      var data=this.Userwallet.value
      console.log(data)
      this.Userwallet.patchValue(data)
      this.makeapi.createwalletcollection(uid,data)
    }
    
  }
}
