import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message!:string;
  isUserLoggedIn:boolean=false;
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    console.log("login");

    this.authService.isUserLoggedIn.subscribe(res=>{
      this.isUserLoggedIn=res;
    })
  }

  loginForm= new FormGroup({
    userName: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6)])
  })

  onLoginClick(userName:string, password:string){
    // console.log(this.authService.login(userName,password));
    this.authService.login(userName,password);
    setTimeout(() => {
      if(this.isUserLoggedIn){
        this.router.navigateByUrl("");
        //this.router.navigate(['/'], { skipLocationChange: false });
       }
       else{
        this.message="Invalid username/password."
       }
    }, 150);

  }
}
