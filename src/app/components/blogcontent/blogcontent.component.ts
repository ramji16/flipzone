import { DatePipe } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogcontent',
  templateUrl: './blogcontent.component.html',
  styleUrls: ['./blogcontent.component.css'],
  providers:[DatePipe]
})
export class BlogcontentComponent implements OnInit {
  ind:number;
  content=[];
  comments=[];
  cont:any;
  consumers!:FormGroup;
  currentDate = new Date();
  len:number;
  constructor(private router:Router,private route:ActivatedRoute,private formBuilder : FormBuilder,private http:HttpClient) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.ind = +params.index;
        console.log(this.ind);
      });
    var path = "assets/JSON/blogcont.json";
    this.http.get<any>(path).subscribe( data =>
    {
    this.content = data;
    console.log('blogcontent array')
    console.log(this.content);
    this.cont=this.content[+this.ind];
    console.log(this.cont);
    var getdata = JSON.parse(localStorage.getItem(this.cont.heading+'com'));
    if (getdata != null) {
      this.comments = getdata;
      console.log(this.comments);
      this.len=this.comments.length;
      console.log(this.len)
      debugger
    }    
    });
    this.consumers =this.formBuilder.group({
      udate:[''],
      uname:['',Validators.required],
      uemail:['',[Validators.email,Validators.required]],
      ucom:['',Validators.required],
    });
  }
  commentsdetails(){
    var data=this.consumers.value;
    var date= data.udate =this.currentDate;
    this.consumers.patchValue(date);
    this.comments.push(data);
    var str = JSON.stringify(this.comments);
    localStorage.setItem((this.cont.heading+'com'), str);
    console.log(this.comments);
  }
  back(){
    this.router.navigate(['/blogs'],{queryParams:{com:this.len}})
  }
}
