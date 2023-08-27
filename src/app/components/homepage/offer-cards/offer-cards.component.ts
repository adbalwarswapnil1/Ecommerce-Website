import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-cards',
  templateUrl: './offer-cards.component.html',
  styleUrls: ['./offer-cards.component.scss']
})
export class OfferCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("offer-cards");
  }

}
