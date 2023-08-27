import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HomepageComponent} from './homepage.component'
import { HomepageRoutingModule } from './homepage-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OfferCardsComponent } from './offer-cards/offer-cards.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CarouselComponent,
    OfferCardsComponent,
    HomepageComponent,

  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  exports:[
    HomepageComponent
  ]
})
export class HomepageModule { }
