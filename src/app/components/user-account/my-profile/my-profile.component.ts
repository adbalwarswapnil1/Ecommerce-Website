import { Component, OnInit } from '@angular/core';
import { User, UserPayment } from 'src/app/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userDetails!:User;
  userPayments!:UserPayment[];
  constructor(private authService:AuthService, private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.userDetails=this.authService.loggedInUserDetails;
    this.paymentService.GetUserPaymentsByUser(this.authService.loggedInUserDetails.id).subscribe((res)=>{
      this.userPayments=res;
    })
  }

  onLogoutClick(){
    sessionStorage.removeItem('isUserLoggedIn');
    sessionStorage.removeItem('loggedInUserDetails');
    this.authService.isUserLoggedIn.next(false);
    window.location.reload();
  }

}
