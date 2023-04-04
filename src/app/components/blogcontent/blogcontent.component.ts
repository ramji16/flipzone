import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
// import { property } from './blogcontent.interface';

@Component({
  selector: 'app-blogcontent',
  templateUrl: './blogcontent.component.html',
  styleUrls: ['./blogcontent.component.css'],
  providers: [DatePipe]
})
export class BlogcontentComponent implements OnInit {
  ind: number;
  dummy = "hi"
  content = [];
  commentlength;
  comments = [];
  // comments:Observable<property[]>
  commentBlog: FormGroup;
  cont: any;
  user_details = []
  consumers!: FormGroup;
  currentDate = new Date();
  len: number;
  check: any;
  cdate: any;
  name: any
  fn: any
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private makeapi: ApiService) { }
  ngOnInit(): void {

    var id;
    var data = JSON.parse(localStorage.getItem('user_data'))
    // console.log(data) 
    if (data != null) {
      this.check = data
      id = data.user.uid
      // console.log(id)
      this.makeapi.getItem('Users', id).subscribe(data => {
        this.user_details.push(data)
        console.log(this.user_details)
        var user = this.user_details[0]
        this.fn = user.ufname[0]
        this.name = user.ufname
        // this.cdate = this.currentDate
        console.log(this.name)
        debugger
      })


    }
    this.getBlog()
    this.route.queryParams
      .subscribe(params => {
        this.ind = +params.index;
        console.log(this.ind);
      });
    var path = "assets/JSON/blogcont.json";
    this.http.get<any>(path).subscribe(data => {
      this.content = data;
      console.log('blogcontent array')
      console.log(this.content);
      this.cont = this.content[+this.ind];
      console.log(this.cont);
      var getdata = JSON.parse(localStorage.getItem(this.cont.heading + 'com'));
      if (getdata != null) {
        this.comments = getdata;
        console.log(this.comments);
        // this.content = this.comments
        this.len = this.comments.length;
        console.log(this.len)
        debugger
      }
    });
    this.consumers = this.formBuilder.group({
      uid: [''],
      customername: [''],
      cdate: [''],
      commentcontent: ['', Validators.required],
    });
    if (this.content.length != 0) {
      // this.user();
    }
  }
  // user(){
  //   for (let i=0;i<this.content.length;i++){
  //     var data = this.comments.uid
  //     this.makeapi.getuserItem(this.comments.uid[i]).subscribe(data => {
  //       this.user_details.push(data)
  //     })
  //   }
  // }
  commentsdetails() {
    var data = this.consumers.value;
    var date = data.udate = this.currentDate;
    this.consumers.patchValue(date);
    this.comments.push(data);
    var str = JSON.stringify(this.comments);
    localStorage.setItem((this.cont.heading + 'com'), str);
    console.log(this.comments);
  }
  back() {
    this.router.navigate(['/blogs'], { queryParams: { com: this.len } })
  }
  commentform() {
    var today = new Date(this.currentDate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var time = dd + '/' + mm + '/' + yyyy;
    var usid = JSON.parse(localStorage.getItem('user_data'))
    var data = this.consumers.value
    data.customername = this.name
    data.cdate = time
    debugger
    data.uid = usid.user.uid
    console.log(data.uid)
    this.makeapi.createBlog(data).then(data => {
      this.getBlog()
    })
    // window.location.reload()
  }
  getBlog() {

    this.makeapi.getcommentcollection().subscribe((res) => {
      this.comments = []
      res.map((e: any) => {
        this.comments.push(e.payload.doc.data());
        // this.orderId.push(e.payload.doc.id);
        console.log(this.comments.length);
        this.commentlength = this.comments.length;
      });     
    });

  }
}
