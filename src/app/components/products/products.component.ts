import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { All_Product, Master, User } from 'src/app/model/index';
import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  fav:boolean=false;
  constructor(private route:ActivatedRoute, private cartService:CartService, private router:Router,
     private productService:ProductService, private authService:AuthService ) { }

  products!:All_Product[];
  newCartProduct!:any;
  master!:Master;
  query!:string;
  users!:User[];
  user!:User;
  p: any = 1;
  favoriteProducts!:any[];

  ngOnInit(): void {

    console.log("products");

    if(sessionStorage.getItem('isUserLoggedIn')){
      this.productService.getAllFavoriteProductsByUser(this.authService.loggedInUserDetails.id).subscribe(res=>{
        console.log(res);
        this.favoriteProducts=res.map((pro: { productId: any; })=>pro.productId);
      })
    }

    this.productService.GetAllProductsWithDiscountAndCategory().subscribe(res=>{
      this.products=res;
    })

      this.route.queryParamMap.subscribe(param=>{
      console.log(param.has("search"));



      if(param.has("search")){
        this.query=String(param.get('search'));
        this.route.queryParamMap.pipe(
          map(search=>search.get('search')),

          distinctUntilChanged(),
          switchMap((dta)=>this.productService.GetAllProductsWithDiscountAndCategory())
        ).subscribe(res=>{
          //console.log("switchmap");



          this.products= res.filter(data=>
            Object.values(data).some(val => val.toString().toLowerCase().includes(this.query.toLowerCase())));
          console.log(this.products);

        })

      }
      else if(param.has("subCategory")){

        this.query=String(param.get('subCategory'));
        this.productService.GetAllProductsWithDiscountAndCategory().subscribe(res=>{
          this.products=res.filter(item => item.p_desc.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()))
          //console.log(res);

        })
      }
      else if(param.has("brand")){
        this.query=String(param.get('brand'));
        this.productService.GetAllProductsWithDiscountAndCategory().subscribe(res=>{
          this.products=res.filter(item => item.brandName.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));
          //console.log(res);

        })
      }

    });


  //   //All json server
  //   this.route.queryParamMap.subscribe(param=>{
  //     console.log(param.has("search"));



  //     if(param.has("search")){
  //       this.query=String(param.get('search'));
  //       this.route.queryParamMap.pipe(
  //         map(search=>search.get('search')),

  //         distinctUntilChanged(),
  //         switchMap((dta)=>this.api.getFilteredProductsWithQuery(dta))
  //       ).subscribe(res=>{
  //         //console.log("switchmap");

  //         //console.log(res);
  //         this.products=res;

  //       })

  //     }
  //     else if(param.has("subCategory")){

  //       this.query=String(param.get('subCategory'));
  //       this.api.getProductByCategory(this.query).subscribe(res=>{
  //         this.products=res;
  //         //console.log(res);

  //       })
  //     }
  //     else if(param.has("brand")){
  //       this.query=String(param.get('brand'));
  //       this.api.getProductByBrand(this.query).subscribe(res=>{
  //         this.products=res;
  //         console.log(res);

  //       })
  //     }

  //   });

  }

  onFavoriteClick(productId:number){
    this.productService.getAllFavoriteProductsByUser(this.authService.loggedInUserDetails.id).subscribe(res=>{
      if(res.map((d: { productId: number; })=>d.productId).includes(productId)){
        this.productService.deleteFavoriteProduct(res.filter((d: { productId: number; })=>{return d.productId == productId;})[0].id).subscribe(res=>{
          console.log(res);
        });
        setTimeout(() => {
          this.ngOnInit();
        }, 200);
      }else{
        const newFavoriteProduct={
          productId:productId,
          userId:this.authService.loggedInUserDetails.id,
          favorite:true
        }
        this.productService.postFavoriteProduct(newFavoriteProduct).subscribe(res=>{
          console.log(res);

        })
        setTimeout(() => {
          this.ngOnInit();
        }, 200);
      }
    })

    // this.productService.getAllFavoriteProductsByUser(this.authService.loggedInUserDetails.id).subscribe(res=>{
    //   //const favPro=res.map((d: { productId: number; })=>d.productId=productId);
    //   const favPro = res.filter((d: { productId: number; })=>{
    //     return d.productId == productId;
    //   })[0].id;
    //   console.log(favPro);

    // })
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

  onBuyNowClick(){

  }

}
