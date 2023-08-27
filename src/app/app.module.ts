import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './components/homepage/homepage.module';
import { SharedModule } from "./shared/shared.module";
import { ProductsComponent } from './components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { UserModule } from './components/user/user.module';
import { UserAccountModule } from './components/user-account/user-account.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDetailsComponent,
        PageNotFoundComponent,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HomepageModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatBadgeModule,
        UserModule,
        UserAccountModule,
        NgxPaginationModule,
        AppRoutingModule,
    ],
    exports:[
      ReactiveFormsModule,
      FormsModule,
      MatBadgeModule
    ]
})
export class AppModule { }
