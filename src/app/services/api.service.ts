import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore , AngularFirestoreCollection } from   '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private eventautherror = new BehaviorSubject<string>("");
  eventautherror$ = this.eventautherror.asObservable();
  tutorialsRef: AngularFirestoreCollection = null;


  constructor(private Afs: AngularFirestore, private Authfire: AngularFireAuth, private storage: AngularFireStorage, private router: Router) { }
  //new registration 
  registerItem(user) {
    // var tenantId = "TENANT_ID1";
    // var auth = this.Authfire.tenantId    /
    debugger
    return this.Authfire.createUserWithEmailAndPassword(user.email, user.Password)
  }
 
  //instertuserdata
  filePath: string
  insertbusinessdata(userCredential: firebase.default.auth.UserCredential, registerdata) {
    this.filePath = `Business/${userCredential.user.uid}`;
    return this.Afs.doc(this.filePath).set(registerdata)   
  }
  insertproductdata(UserCredential, registerdata) {
    this.filePath = `Products/${UserCredential}`;
    debugger
    return this.Afs.doc(this.filePath).set(registerdata)
  }
   //instertcustomerdata
   insertuserdata(userCredential: firebase.default.auth.UserCredential, registerdata) {
    this.filePath = `Users/${userCredential.user.uid}`;
    debugger
    return this.Afs.doc(this.filePath).set(registerdata)
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
  //add sub collection
  createordercollection(userCredential,registerdata) {
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
      .collection('/orders')
      .doc(id)
      .delete();
  }
  //add wishlist collection
  createwishlistcollection(userCredential, registerdata) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wishlist')
      .add(registerdata);
  }

  //get wishlist collection
  getwishlistcollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/wishlist')
      .snapshotChanges();
  }
  //get order collection
  getordercollection(userCredential) {
    return this.Afs.collection('/Users')
      .doc(userCredential)
      .collection('/orders')
      .snapshotChanges();
  }

  //get sub collection
  getsubcollection(userCredential) {
    return this.Afs.collection('/Business')
      .doc(userCredential)
      .collection('/product')
      .snapshotChanges();
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
    return this.Afs.collection('/' + url).add(data)
  }
  // get Function
  getItem(url, id) {
    sessionStorage.setItem('id', id)
    return this.Afs.collection('/' + url).doc(id).valueChanges();
  }
  // update Function
  updateItem(url, data) {
    // this.filePath = `Business/${url}`;
    // return this.Afs.doc(this.filePath).set(data)
    var id =JSON.parse(localStorage.getItem('businessId'))
    debugger
    return this.Afs.collection('/' + url).doc('/' + id).update(data)
  }
  // updateItem(url, data) {
  //   return this.Afs.collection('/' + url).doc('/' + sessionStorage.getItem('id')).update(data)
  // }
  // delete Function
  deleteItem(url, id) {
    return this.Afs.collection('/' + url).doc(id).delete();
  }

  // image upload
  imageUpload(url, data) {
    debugger
    return this.storage.upload(url, data);
  }
  // get Image
  getImage(url) {
    return this.storage.ref(url);
  }
  // delete images
  deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete()
  }
}
