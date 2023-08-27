import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { All_Product, Product } from 'src/app/model';
//import { Product } from 'src/app/model/product';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!:All_Product;
  productId!:number;
  constructor(private route : ActivatedRoute, private productService:ProductService, private cartService:CartService,
    private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    console.log("product-details");

    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.GetAllProductsWithDiscountAndCategoryByProductId(this.productId).subscribe((res)=>{
      this.product=res[0];
      console.log(this.product);
    })

  }

  onAddtoCartClick(productId:number){
    if(this.authService.isUserLoggedIn_1){
      const newCartProduct={
        userId:this.authService.loggedInUserDetails.id,
        productId:productId,
        quantity:1
      }
      this.cartService.postCartItems(newCartProduct).subscribe();
      setTimeout(() => {
        this.authService.isUserLoggedIn.next(true);
      }, 200);
    }
    else{
      this.router.navigateByUrl('/user/login');
    }


  }

}
