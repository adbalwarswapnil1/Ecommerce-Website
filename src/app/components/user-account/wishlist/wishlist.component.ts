import { Component, OnInit } from '@angular/core';
import { All_Product } from 'src/app/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private authService:AuthService, private productService:ProductService) { }
  productCount!:any;
  products!:any[];
  ngOnInit(): void {
    // if(this.authService.isUserLoggedIn_1){
    //   this.productService.GetAllProductsWithDiscountAndCategory().subscribe((data)=>{
    //     this.productService.getAllFavoriteProductsByUser(this.authService.loggedInUserDetails.id).subscribe((res)=>{
    //       this.productCount=res.length;
    //       //this.products=data.filter((p: { [x: string]: any; }) => res.every((filter: { productId: any; }) => p['id'] == filter.productId));
    //       this.products=data.filter((p: { [x: string]: any; }) => res.some((filter: { productId: any; }) => p['id'] == filter.productId))
    //       console.log(data.filter((p: { [x: string]: any; }) => res.some((filter: { productId: any; }) => p['id'] == filter.productId)));

    //       //this.productCount=this.products;

    //     })
    //   })
    // }

    if(this.authService.isUserLoggedIn_1){
      this.productService.GetFavoriteProductsWithProductDetailsByUser(this.authService.loggedInUserDetails.id).subscribe((res)=>{
        this.products=res.reverse();
        this.productCount=res.length;
      })
    }
  }

  onDeleteClick(id:number){
    console.log(id);
    this.productService.deleteFavoriteProduct(id).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 200);
  }

}
