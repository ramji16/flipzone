import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  flag = false;
  flag1 = false;
  card_details = [];
  uid;
  new_value:any
  Userwallet!: FormGroup;
  wallet!: FormGroup;
  constructor(private makeapi: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.Userwallet = this.formBuilder.group({
      // bid: [''],
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expirydate: ['', Validators.required],
      cvv: ['', Validators.required],
      amount: [0],
    });
    this.wallet = this.formBuilder.group({
      amt: [''],
    });
    var userdata = JSON.parse(localStorage.getItem('user_data'));
    this.uid = userdata.user.uid;
  }
  cardActivate() {
    this.flag = true;
    this.flag1 = false;
  }
  amount_card() {
    this.flag1 = true;
    this.flag = false;
  }
  saveWallet() {
    var data = this.Userwallet.value;
    this.makeapi.createwalletcollection(this.uid, data);
    alert('Card has been Saved');
  }
  add_amount() {
    if (this.card_details.length == 0) {
      debugger;
      this.makeapi.getwalletcollection(this.uid).subscribe((res) => {
        debugger;
        res.map((e: any) => {
          this.card_details.push(e.payload.doc.data());
          debugger;
        });
          this.new_value = this.card_details[0];
          debugger
      });
      var data_value = this.wallet.value;
      console.log(this.new_value);
      this.Userwallet.patchValue(this.new_value)
      console.log(this.Userwallet.value)
      var det=this.Userwallet.value
      det.amount=data_value.amt
      debugger;
      this.makeapi.createwalletcollection(this.uid,det).then(()=>{
        alert('Amount has been added to the wallet');
      });
    }
  }
}
