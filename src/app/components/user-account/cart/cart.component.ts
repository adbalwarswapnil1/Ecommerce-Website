import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { All_Product, CartItem } from 'src/app/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products!:CartItem[];
  product!:All_Product[];
  editCartItem!:any;
  total=0;
  discount=0;
  deliveryCharges="Free"
  isUserLoggedIn!:boolean;
  userAddress!:string;
  constructor(private authService:AuthService, private cartService:CartService,
    private productService:ProductService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("cart");
    this.total=0;
    this.discount=0;
    // this.productService.GetAllProductsWithDiscountAndCategory().subscribe(res=>{
    //   console.log(res);

    //   this.product=res;
    // })

    // this.authService.isUserLoggedIn.subscribe(res=>{
    //   console.log(res);
    //   if(res){
    //     this.cartService.getAllCartItemsByUser(this.authService.loggedInUserDetails.id).subscribe(data=>{
    //       console.log(data);
    //       console.log(this.product.filter(res => data.every(filter => res["id"]===filter.productId)));
    //     })
    //   }
    // })
    this.userAddress=this.authService.loggedInUserDetails.address;
    this.isUserLoggedIn=this.authService.isUserLoggedIn_1;
    console.log(this.isUserLoggedIn);

      if(this.authService.isUserLoggedIn_1){
        this.cartService.getAllCartItemsByUser(this.authService.loggedInUserDetails.id).subscribe(data=>{
          // setTimeout(()=>{},1000);
          console.log(data);
          // console.log(this.product.filter(res => data.every(filter => res["id"]===filter.productId)));
          // this.products=this.product.filter(res => data.every(filter => res["id"]===filter.productId));
          this.products=data;
          for(let item of this.products){
            this.total=this.total+item.price*item.quantity;
            this.discount=this.discount+(item.price*item.discountPercentage/100)*item.quantity;
          }
          console.log(this.total);

        })
      }
  }

  onDecreaseQuantityClick(product:CartItem){
    this.editCartItem={
      id:product.id,
      userId:product.userId,
      productId:product.productId,
      quantity:(product.quantity-1)
    }
    console.log(this.editCartItem);
    this.cartService.putCartItemsById(this.editCartItem).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 100);

  }

  onIncreaseQuantityClick(product:CartItem){
    this.editCartItem={
      id:product.id,
      userId:product.userId,
      productId:product.productId,
      quantity:(product.quantity+1)
    }
    console.log(this.editCartItem);

    this.cartService.putCartItemsById(this.editCartItem).subscribe()
    //console.log(productId);

    setTimeout(() => {
      this.ngOnInit();
    }, 100);
  }

  onRemoveCartItemClick(id:number){
    this.cartService.deleteCartItems(id).subscribe();
    setTimeout(() => {
      this.ngOnInit();
      this.authService.isUserLoggedIn.next(true);
    }, 100);

  }
}
