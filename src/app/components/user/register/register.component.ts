import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    console.log("register");

  }

  signUpForm=new FormGroup({
    firstName:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    lastName:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    userName:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    phone: new FormControl(null,[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
    address:new FormControl(null,[Validators.required]),
    checkBox:new FormControl(null,[Validators.requiredTrue])
  }
 )

 onSignUpClick(data:any){
  const userData={
      //id:Math.round(Math.random()*1000),
      username:data.userName,
      password:data.password,
      firstName:data.firstName,
      lastName:data.lastName,
      phone:data.phone,
      address:data.address
    }

  this.userService.postUser(userData).subscribe((data)=>{
    console.log(data);

  })
  console.log(userData);
  this.router.navigateByUrl("/user/login");
 }

}
