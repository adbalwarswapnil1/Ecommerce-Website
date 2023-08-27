import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("footer");
    console.log(sessionStorage.getItem('isUserLoggedIn'));
    if(sessionStorage.getItem('isUserLoggedIn')){
      this.authService.loggedInUserDetails=JSON.parse(sessionStorage.getItem('loggedInUserDetails') || "");
      this.authService.isUserLoggedIn.next(true);
    }
  }

}
