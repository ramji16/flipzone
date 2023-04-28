import { Component, OnInit, Query } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css'],
})
export class UsercontactComponent implements OnInit {
  contact: FormGroup;
  queryDetails = [];
  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private makeApi : ApiService
  ) {}

  ngOnInit(): void {
    this.contact = this.formbuilder.group({
      cname: ['', Validators.required],
      phone: ['', Validators.required],
      umail: ['', [Validators.email, Validators.required]],
      message: ['', Validators.required],
      product: [],
    });
    this.route.queryParams.subscribe((params) => {
      this.queryDetails.push(params);
      console.log(this.queryDetails[0]);
    });
  }
  queryMsg() {
    var personal = this.contact.value;
    personal.product = this.queryDetails[0]
    console.log(personal);
    console.log(personal.product.productName);
    this.makeApi.insertquerydata(personal).then( () => {
      alert('Query passed')
    })
  }
}
