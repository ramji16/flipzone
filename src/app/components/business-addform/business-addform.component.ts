import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-business-addform',
  templateUrl: './business-addform.component.html',
  styleUrls: ['./business-addform.component.css'],
})
export class BusinessAddformComponent implements OnInit {
  productForm: FormGroup;
  productDetails = [];
  selectedFile: File = null;
  downloadURL: Observable<string>;
  path: string;
  selectedTeam = '';
  category: any;
  selectedCategory = '';
  fashionType = '';
  fashionTop = '';
  filePath: string;
  fsb;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private makeApi: ApiService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      uid: [''],
      productName: ['', Validators.required],
      quantity : ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      price: ['', Validators.required],
      photo: ['', Validators.required],
      discount: ['', Validators.required],
      category: ['', Validators.required],
      lowerPrice: ['', Validators.required],
      brandName: ['', Validators.required],
      modelNumber: ['', Validators.required],
      fashionType: ['', Validators.required],
      material: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      breadth: ['', Validators.required],
      gender: ['', Validators.required],
      dressSize: ['', Validators.required],
      footwearSize: ['', Validators.required],
      tag: ['', Validators.required],
      colour: ['', Validators.required],
      stocks: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      warrantyDate: ['', Validators.required],
      description: ['', Validators.required],
    });
    // var productData = JSON.parse(localStorage.getItem())
    this.route.queryParams.subscribe((params) => {
      this.category = params.cat;
      console.log(this.category);
    });

    var productData = JSON.parse(localStorage.getItem(this.category));
    if (productData != null) {
      this.productDetails = productData;
      console.log(this.productDetails);
    }

    this.selectedCategory = this.category;
  }
  get add() {
    return this.productForm.controls;
  }
  onSubmit() {
    debugger;
    if (this.productForm.invalid) {
      debugger;
      var bid = JSON.parse(localStorage.getItem('businessId'));
      if (bid != null) {
        debugger;
        console.log(this.category);
        debugger;
        var getdata = this.productForm.value;
        getdata.uid = bid;
        getdata.category = this.category;
        // getdata.photo = this.path
        this.productForm.patchValue(getdata);
        // console.log(getdata.photo)
        var data = this.productForm.value;
        debugger;
        // this.makeApi.insertproductdata(bid, data);
        // this.uploadSaveFile()
        this.router.navigate(['/businesslist'])
        console.log(data)
        //  this.makeApi.createsubcollection(bid,data)
       
        this.makeApi.createsubcollection(bid, data).then(data=>{
          debugger
          this.router.navigate(['/businesslist']);
          console.log(data);
        }).catch(error =>{

        })
        // this.makeApi.imageUpload('product_images',)
      }
    }
  }
  // selectedFile: File = null;
  // downloadURL: Observable<string>;
  getValue
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    debugger
    if (event.target.files && this.selectedFile) {
      var reader = new FileReader();
      var imagetype = this.selectedFile.type
      var imagedatatype = imagetype.split("/")
      var img_crt_type = imagedatatype[1]
      if (img_crt_type == "jpeg" || img_crt_type == "jpg" || img_crt_type == "png") {
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          
          // this.getValue = reader.result;
          // debugger
        }
      }
    }
  }
  
        
  /**save images**/
  // filePath: string;
  uploadSaveFile() {
    debugger
    if (this.selectedFile != null) {
      debugger
      var n = Date.now();
      this.filePath = `product_images/${this.selectedFile.name.split('.')}_${n}`;
      this.makeApi
        .imageUpload(this.filePath, this.selectedFile)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.makeApi
              .getImage(this.filePath)
              .getDownloadURL()
              .subscribe((url) => {
                if (url) {
                  this.fsb = url;
                  var getform = this.productForm.value;
                  getform.photo = this.fsb;
                  this.productForm.patchValue(getform);
                  debugger
                  this.onSubmit();
                }
              });
          })
        )
        .subscribe((url) => {});
    } else {
      this.onSubmit()
    }
  }
  /**delete Image**/
  deleteImage(url) {
    // this.makeapi.deleteImage(url)
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
  onProductValues() {
    var getdata = this.productForm.value;
    var data = (getdata.category = this.category);
    this.productForm.patchValue(data);
    this.productDetails.push(getdata);
    var str = JSON.stringify(this.productDetails);
    console.log(getdata.category);
    localStorage.setItem(getdata.category, str);
    console.log(this.productDetails);
    this.router.navigate(['/businesslist']);
  }
}
