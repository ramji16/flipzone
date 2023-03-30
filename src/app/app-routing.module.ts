import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { BlogcontentComponent } from './components/blogcontent/blogcontent.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BusinessAddformComponent } from './components/business-addform/business-addform.component';
import { BusinessHomeComponentComponent } from './components/business-home-component/business-home-component.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessNavbarComponent } from './components/business-navbar/business-navbar.component';
import { BusinessOrderComponent } from './components/business-order/business-order.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { BusinessSignUpComponent } from './components/business-sign-up/business-sign-up.component';
import { BusinessSigninComponent } from './components/business-signin/business-signin.component';
import { CartComponent } from './components/cart/cart.component';
import { MainLoginComponentComponent } from './components/main-login-component/main-login-component.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { UserHomeComponentComponent } from './components/user-home-component/user-home-component.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { UsercontactComponent } from './components/usercontact/usercontact.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'mainlogin', pathMatch: 'full' },
  { path: 'mainlogin', component: MainLoginComponentComponent },
  { path: 'userhome', component: UserHomeComponentComponent },
  { path: 'businesshome', component: BusinessHomeComponentComponent },
  { path: 'businessnavbar', component: BusinessNavbarComponent },
  { path: 'businessorder', component: BusinessOrderComponent },
  { path: 'businessaddform', component: BusinessAddformComponent },
  { path: 'businesslist', component: BusinessListComponent },
  { path: 'shopping', component: ShopPageComponent },
  { path: 'userfilter', component: UserFilterComponent },
  { path: 'adminpage', component: AdminPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogcontent', component: BlogcontentComponent },
  { path: 'productview', component: ProductviewComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: ShoppingcartComponent },
  { path: 'businessprofile', component: BusinessProfileComponent },
  { path: 'userSignUp', component: UserSignUpComponent },
  { path: 'usernavbar', component: UsernavbarComponent },
  { path: 'footer', component: UserFooterComponent },
  { path: 'orders', component: MyordersComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'busniessSignUp', component: BusinessSignUpComponent },
  { path: 'busniessSignIn', component: BusinessSigninComponent },
  { path: 'contact', component: UsercontactComponent },
  { path: 'cart', component:CartComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
