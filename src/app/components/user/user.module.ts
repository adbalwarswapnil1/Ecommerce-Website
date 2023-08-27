import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
