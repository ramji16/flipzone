import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  flag=false
  constructor() { }

  ngOnInit(): void {
  }
  cardActivate(){
    this.flag=true;
  }
}
