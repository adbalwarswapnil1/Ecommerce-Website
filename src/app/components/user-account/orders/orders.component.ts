import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  products!:any;
  productCount=0;
  constructor(private orderService:OrderService, private authService:AuthService) { }

  ngOnInit(): void {
    this.orderService.GetOrderDetailsByUser(this.authService.loggedInUserDetails.id).subscribe(res=>{
      console.log(res);
      this.productCount=res.length;
      this.products=res.reverse();

    })
  }

}
