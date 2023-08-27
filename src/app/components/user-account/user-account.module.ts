import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    WishlistComponent,
    OrdersComponent,
    PlaceOrderComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    UserAccountRoutingModule,
    FormsModule
  ]
})
export class UserAccountModule { }
