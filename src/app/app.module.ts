import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoginComponentComponent } from './components/main-login-component/main-login-component.component';
import { BusinessHomeComponentComponent } from './components/business-home-component/business-home-component.component';
import { BusinessNavbarComponent } from './components/business-navbar/business-navbar.component';
import { BusinessOrderComponent } from './components/business-order/business-order.component';
import { BusinessAddformComponent } from './components/business-addform/business-addform.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { UserHomeComponentComponent } from './components/user-home-component/user-home-component.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogcontentComponent } from './components/blogcontent/blogcontent.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BusinessSignUpComponent } from './components/business-sign-up/business-sign-up.component';
import { BusinessSigninComponent } from './components/business-signin/business-signin.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { UsercontactComponent } from './components/usercontact/usercontact.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { BusinessChangepasswordComponent } from './components/business-changepassword/business-changepassword.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from   '@angular/fire/auth';
// import * as firebase from 'firebase';
import { DataService } from './services/data.service';
import { ApiService } from './services/api.service';
import {firebase} from '../environments/firebase';
import { NgOtpInputModule } from 'ng-otp-input';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";
import { BusinessWalletComponent } from './components/business-wallet/business-wallet.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuisnessSellersComponent } from './components/buisness-sellers/buisness-sellers.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    MainLoginComponentComponent,
    BusinessHomeComponentComponent,
    BusinessNavbarComponent,
    BusinessOrderComponent,
    BusinessAddformComponent,
    BusinessListComponent,
    UserHomeComponentComponent,
    ShopPageComponent,
    UserFilterComponent,
    AdminPageComponent,
    ProfileComponent,
    BlogsComponent,
    BlogcontentComponent,
    ProductviewComponent,
    WishlistComponent,
    ShoppingcartComponent,
    UsernavbarComponent,
    BusinessProfileComponent,
    UserSignUpComponent,
    UserFooterComponent,
    MyordersComponent,
    AboutusComponent,
    BusinessSignUpComponent,
    BusinessSigninComponent,
    ChangepasswordComponent,
    UsercontactComponent,
    WalletComponent,
    BusinessChangepasswordComponent,
    CartComponent,
    BusinessWalletComponent,
    AdminComponent,
    BuisnessSellersComponent,
    AdminProductsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule ,
    AngularFireStorageModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DataService, ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
