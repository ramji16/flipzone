import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-addform',
  templateUrl: './business-addform.component.html',
  styleUrls: ['./business-addform.component.css'],
})
export class BusinessAddformComponent implements OnInit {
  productForm: FormGroup;
  productDetails = [];
  path : string
  selectedTeam = '';
  category : any;
  selectedCategory = '';
  fashionType = '';
  fashionTop = '';
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router: Router,private makeApi : ApiService) {}

  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        uid : [''],
      productName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
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
  upload($event){
    this.path = $event.target.files[0]
    console.log(this.path)
    if(this.path!=""){
      debugger
      this.makeApi.imageUpload("/files"+Math.random()+this.path,this.path)
    }
    debugger
  }
  onSubmit(){
    debugger
    if(this.productForm.invalid){
      debugger
      var bid = JSON.parse(localStorage.getItem('businessId'))
      if(bid!= null){
        debugger
        var getdata = this.productForm.value
        var data =  getdata.uid = bid
        // getdata.photo = this.path
        this.productForm.patchValue(data)
        // console.log(getdata.photo)
        this.makeApi.insertproductdata(bid,getdata)
        this.router.navigate(['/businesslist'])
        // this.makeApi.imageUpload('product_images',)
      }
    }
  }
  onSelected(value: string): void {
    this.selectedTeam = value;
    debugger;
    console.log(this.selectedTeam);
  }

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
