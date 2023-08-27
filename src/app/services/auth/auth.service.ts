import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  flag:boolean=false;
  allUsers!:User[];
  loggedInUserDetails!:User;
  isUserLoggedIn = new Subject<boolean>();
  isUserLoggedIn_1:boolean=false;
  constructor(private userService:UserService) {
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.allUsers=data
      }
    );
    this.isUserLoggedIn.subscribe(res=>{
      this.isUserLoggedIn_1=res;
    })
  }

  login(username:string,password:string){

    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.allUsers=data
      }
    );
    setTimeout(() => {
      for(let user of this.allUsers){
        if(user.username.toLocaleLowerCase()==username.toLocaleLowerCase() && user.password.toLocaleLowerCase()==password.toLocaleLowerCase()){
          sessionStorage.setItem('isUserLoggedIn','true');
          sessionStorage.setItem('loggedInUserDetails',JSON.stringify(user))
          this.loggedInUserDetails=user;
          this.isUserLoggedIn.next(true);
        }
      }
    }, 100);

  }

}


