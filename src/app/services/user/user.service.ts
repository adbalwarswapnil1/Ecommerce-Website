import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, User_1 } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:5012/api/Users";

  constructor(private http:HttpClient) { }

  //user

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.url+"/"+id);
  }

  postUser(data:User_1){
    return this.http.post(this.url,data);
  }

  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(this.url+"/"+id);
  }

}
