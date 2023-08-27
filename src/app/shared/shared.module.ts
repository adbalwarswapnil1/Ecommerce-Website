import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ]

})
export class SharedModule { }
