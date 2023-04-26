import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private eventautherror = new BehaviorSubject<string>('');
  eventautherror$ = this.eventautherror.asObservable();
  tutorialsRef: AngularFirestoreCollection = null;

  constructor(
    private Afs: AngularFirestore,
    private Authfire: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router
  ) {}
  //new registration
  registerItem(user) {
    // var tenantId = "TENANT_ID1";
    // var auth = this.Authfire.tenantId    /
    debugger;
    return this.Authfire.createUserWithEmailAndPassword(
      user.email,
      user.Password
    );
  }

  //instertuserdata
  filePath: string;
  insertbusinessdata(
    userCredential: firebase.default.auth.UserCredential,
    registerdata
  ) {
    this.filePath = `Business/${userCredential.user.uid}`;
    return this.Afs.doc(this.filePath).set(registerdata);
  }
  insertproductdata(UserCredential, registerdata) {
    this.filePath = `Products/${UserCredential}`;
    debugger;
    return this.Afs.doc(this.filePath).set(registerdata);
  }
  //instertcustomerdata
  insertuserdata(
    userCredential: firebase.default.auth.UserCredential,
    registerdata
  ) {
    this.filePath = `Users/${userCredential.user.uid}`;
    debugger;
    return this.Afs.doc(this.filePath).set(registerdata);
  }
  //loginuser
  login(email, Password) {
    return this.Authfire.signInWithEmailAndPassword(email, Password);
  }
  //add sub collection
  createsubcollection(userCredential, registerdata) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/product')
      .add(registerdata);
  }
  //add sub collection for wallet
  createwalletcollection(userCredential,data){
    return this.Afs.collection('/Users').doc(userCredential).collection('/wallet').add(data)
  }
  //get sub collection for wallet
  getwalletcollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wallet')
      .snapshotChanges();
  }
  //Blog comment
  createBlog(data) {
    return this.Afs.collection('/Blog')
      .add(data)
  }
  //add sub collection
  createordercollection(userCredential,registerdata) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/cart')
      .add(registerdata);
  }
  //add sub collection
  createbordercollection(userCredential,registerdata) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/orders')
      .add(registerdata);
  }
  //delete wishlist collection
  deletewishlistcollection(userCredential, id) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wishlist')
      .doc(id)
      .delete();
  }
  deleteordercollection(userCredential, id) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/cart')
      .doc(id)
      .delete();
  }
  deletesubcollection(userCredential,id){
    return this.Afs.collection('/Business')
    .doc(userCredential)
    .collection('/product')
    .doc(id)
    .delete()
  }
  //add wishlist collection
  createwishlistcollection(userCredential, registerdata) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wishlist')
      .add(registerdata);
  }
  getcommentcollection() {
    return this.Afs.collection('/Blog')
      .snapshotChanges();
  }

  //get wishlist collection
  getwishlistcollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wishlist')
      .snapshotChanges();
  }

  createproductordercollection(userCredential,data) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/orders')
      .add(data)
  }

  getboredercollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/orders')
      .snapshotChanges();
  }
  getproductordercollection(userCredential) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/orders')
      .snapshotChanges();
  }

  //get order collection
  getordercollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/cart')
      .snapshotChanges();
  }


  //get sub collection
  getsubcollection(userCredential) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/product')
      .snapshotChanges();
  }
  getproductdetails(userCredential,id) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/product')
      .doc(id)
      .valueChanges();
  }
  //getuser
  getUser() {
    return this.Authfire.authState;
  }
  // list Function
  listItem(url) {
    return this.Afs.collection('/' + url).snapshotChanges();
  }
  // add Function
  addItem(url, data) {
    data.id = this.Afs.createId();
    return this.Afs.collection('/' + url).add(data);
  }
  // get Function
  getItem(url, id) {
    sessionStorage.setItem('id', id);
    return this.Afs.collection('/' + url)
      .doc(id)
      .valueChanges();
  }
  forgetPassword(email){
    return this.Authfire.sendPasswordResetEmail(email).then( () =>{
      alert('Check your mail')
    }
    )
  }
  getuserItem(id) {
    // sessionStorage.setItem('id', id);
    return this.Afs.collection('/Users')
      .doc(id)
      .valueChanges();
  }
  //update sub collection for wallet
  updatewalletcollection(userCredential,id,data) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wallet')
      .doc('/' + id)
      .update(data);
  }
   //update sub collection for wallet
   updatewallet(userCredential,data) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .update(data);
  }
  // update Function
  updateItem(url, data) {
    // this.filePath = `Business/${url}`;
    // return this.Afs.doc(this.filePath).set(data)
    var id = JSON.parse(localStorage.getItem('businessId'));
    debugger;
    return this.Afs.collection('/' + url)
      .doc('/' + id)
      .update(data);
  }
  // updateItem(url, data) {
  //   return this.Afs.collection('/' + url).doc('/' + sessionStorage.getItem('id')).update(data)
  // }
  // delete Function
  deleteItem(url, id) {
    return this.Afs.collection('/' + url)
      .doc(id)
      .delete();
  }

  // image upload
  imageUpload(url, data) {
    debugger;
    return this.storage.upload(url, data);
  }
  // get Image
  getImage(url) {
    return this.storage.ref(url);
  }
  // delete images
  deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
