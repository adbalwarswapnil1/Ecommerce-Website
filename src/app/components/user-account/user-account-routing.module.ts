import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component:MyProfileComponent },
  { path:'orders', component:OrdersComponent },
  { path:'wishlist', component:WishlistComponent },
  { path:'checkout', component:PlaceOrderComponent },
  { path:'cart', component:CartComponent},
  // {
  //   path:'**', pathMatch:'full',
  //   component:PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
