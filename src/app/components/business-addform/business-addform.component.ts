import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-business-addform',
  templateUrl: './business-addform.component.html',
  styleUrls: ['./business-addform.component.css'],
})
export class BusinessAddformComponent implements OnInit {
  productForm: FormGroup;
  productDetails = [];
  selectedTeam = '';
  category : any;
  selectedCategory = '';
  fashionType = '';
  fashionTop = '';
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      dealerMail: ['', [Validators.required,Validators.email]],
      price: ['',Validators.required],
      photo: ['', Validators.required],
      discount: ['', Validators.required],
      category: ['', Validators.required],
      lowerPrice: ['', Validators.required],
      brandName: ['', Validators.required],
      modelNumber: ['', Validators.required],
      fashionType: ['', Validators.required],
      material: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['',Validators.required],
      breadth: ['',Validators.required],
      gender:['',Validators.required],
      dressSize:['',Validators.required],
      footwearSize:['',Validators.required],
      tag:['',Validators.required],
      colour:['',Validators.required],
      stocks:['',Validators.required],
      manufactureDate:['',Validators.required],
      warrantyDate:['',Validators.required],
      description:['',Validators.required],
    });
    // var productData = JSON.parse(localStorage.getItem())

    this.route.queryParams
      .subscribe(params => {
        this.category = params.cat;
        console.log(this.category);
      });
    
      var productData = JSON.parse(localStorage.getItem(this.category));
      if(productData != null){
        this.productDetails=productData;
        console.log(this.productDetails)
      }

      this.selectedCategory = this.category;
      
  }
  get add(){
    return this.productForm.controls
  }
  onSubmit(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return
    }
  }
  onSelected(value: string): void {
    this.selectedTeam = value;
    debugger;
    console.log(this.selectedTeam);
  }
  // onCategory(): void {
  //   this.selectedCategory = this.category;
  //   debugger;
  //   console.log(this.selectedCategory);
  // }
  onFashionType(value: string): void {
    this.fashionType = value;
    debugger;
    console.log(this.fashionType);
  }
  onFashionTopSize(value: string): void {
    this.fashionTop = value;
    debugger;
    console.log(this.fashionTop);
  }
  onProductValues(){
    var getdata = this.productForm.value;
    var data = getdata.category=this.category;
    this.productForm.patchValue(data);
    this.productDetails.push(getdata);
    var str = JSON.stringify(this.productDetails);
    console.log(getdata.category);
    localStorage.setItem(getdata.category,str);
    console.log(this.productDetails);
    this.router.navigate(['/businesslist'])
  }
}
