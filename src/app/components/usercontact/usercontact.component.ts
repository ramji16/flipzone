import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css']
})
export class UsercontactComponent implements OnInit {
  contact:FormGroup
  constructor(private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.contact = this.formbuilder.group({
      name:['',Validators.required],
      phone:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      message:['',Validators.required]
    })
  }

}
