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
  order_details = []
  card_number = [];
  card_id = [];
  user_details = [];
  user;
  userdata;
  user_wallet_amount:number;
  current_card; 
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
    this.uidDetails();
  }
  uidDetails(){
    this.userdata = JSON.parse(localStorage.getItem('user_data'));
    this.uid = this.userdata.user.uid;
    console.log(this.uid)
  }
  cardActivate() {
    this.flag = true;
    this.flag1 = false;
  }
  user_wallet(){
    this.uidDetails();
    debugger
    this.get_wallet_account()
    debugger
    this.user_wallet_amount = 0
    for(let i = 0;i<this.card_details.length;i++){
      debugger
      this.user_wallet_amount += this.card_details[i].amount
      console.log(this.user_wallet_amount)
    }
    this.userDetail();
    // this.amount_update();
    
  }
  amount_update(){
    debugger
    this.makeapi.insertuserdata(this.userdata,this.user).then(()=>{
      // alert('Wallet update');
    });
  }
  userDetail(){
    debugger
    this.makeapi.getuserItem(this.uid).subscribe(res => {
      debugger;
      this.user_details.push(res)
      console.log(this.user_details)
      this.user = this.user_details[0]
      this.user.uwallet = this.user_wallet_amount
      debugger
      this.amount_update();
    })
  }
  amount_card() {
    this.get_wallet_account()
    this.flag1 = true;
    this.flag = false;
  }
  saveWallet() {
    var data = this.Userwallet.value;
    this.makeapi.createwalletcollection(this.uid, data);
    alert('Card has been Saved');
    this.amount_card();
  }
  get_wallet_account(){
    debugger
    this.makeapi.getwalletcollection(this.uid).subscribe((res) => {
      debugger;
      this.card_details=[]
      res.map((e: any) => {
        this.card_details.push(e.payload.doc.data());
        this.card_id.push(e.payload.doc.id);
        debugger;
      });
        console.log(this.card_details);
        console.log(this.card_id)
        this.card_number = this.card_details
        debugger
    });
    this.makeapi.getordercollection(this.uid).subscribe((res) => {
      debugger;
      this.card_details=[]
      res.map((e: any) => {
        this.order_details.push(e.payload.doc.data());
        // this.card_id.push(e.payload.doc.id);
        debugger;
      });
        console.log(this.order_details);
        // console.log(this.card_id)
        // this.card_number = this.card_details
        debugger
    });
  }
  card_num(card_no){
    this.current_card = card_no
    console.log(this.current_card)
  }
  add_amount() {
      debugger;
      var data_value = this.wallet.value;
      this.new_value = this.card_number[this.current_card]
      var wid = this.card_id[this.current_card]
      console.log(this.new_value);
      this.Userwallet.patchValue(this.new_value)
      console.log(this.Userwallet.value)
      var det=this.Userwallet.value
      det.amount+=data_value.amt
      debugger;
      this.makeapi.updatewalletcollection(this.uid,wid,det).then(()=>{
        alert('Amount has been added to the wallet');
      });
      this.user_wallet()
  }
}
