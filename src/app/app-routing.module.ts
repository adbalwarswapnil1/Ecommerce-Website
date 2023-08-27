import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',pathMatch:'full',
    loadChildren: () => import('./components/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path:'products', component:ProductsComponent
  },
  {
    path:'product/:productId', component:ProductDetailsComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path:'account',
    loadChildren: ()=> import('./components/user-account/user-account.module').then(m=>m.UserAccountModule),
    canActivate: [AuthGuard]
  },
  {
    path:'**', pathMatch:'full',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
