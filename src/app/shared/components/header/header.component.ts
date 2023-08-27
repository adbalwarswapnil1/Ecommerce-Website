import { query } from '@angular/animations';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private router:Router,private authService:AuthService, private cartService:CartService) {

   }
  isUserLoggedIn:boolean=false;
  loggedInUserDetails!:User;
  cartItems!:any[];
  numberOfCartProducts:null | number=null;

  ngOnInit(): void {

    console.log("header");
    // if(sessionStorage.getItem('isUserLoggedIn')){
    //   if(this.isUserLoggedIn){
    //     this.cartService.getAllCartItemsByUser(this.loggedInUserDetails.id).subscribe((data)=>{
    //     // console.log(data);
    //     // this.cartItems=data;
    //     this.numberOfCartProducts=data.length
    //   })
    // }
    // }


    this.authService.isUserLoggedIn.subscribe(res=>{
      this.loggedInUserDetails=this.authService.loggedInUserDetails;
      this.isUserLoggedIn=res;
      if(this.isUserLoggedIn){
        this.cartService.getAllCartItemsByUser(this.loggedInUserDetails.id).subscribe((data)=>{
        // console.log(data);
        // this.cartItems=data;
        if(data.length!=0){
          this.numberOfCartProducts=data.length
        }
        else{
          this.numberOfCartProducts=null;
        }

      })
    }
    })

  }

  searchForm = new FormGroup ({

    search:new FormControl(null,[Validators.required])

  })

  onSearchClick(){
    //console.log(this.searchForm.get('search')?.value);

    this.router.navigate(["/products"],{queryParams:{ search:this.searchForm.get('search')?.value}})
  }

  onLogoutClick(){
    sessionStorage.removeItem('isUserLoggedIn');
    sessionStorage.removeItem('loggedInUserDetails');
    this.authService.isUserLoggedIn.next(false);
    window.location.reload();
  }

  demo(){

    console.log("demo from header");

  }
}
