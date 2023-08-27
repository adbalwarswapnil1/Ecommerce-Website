import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  {
    path:"", pathMatch:"full", component: HomepageComponent
  },
  // {
  //   path:'**', pathMatch:'full',
  //   component:PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
