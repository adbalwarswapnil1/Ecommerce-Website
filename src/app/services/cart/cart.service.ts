import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartItem_1 } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  [x: string]: any;

  url="http://localhost:5012/api/CartItems";
  constructor(private http:HttpClient) { }

  getAllCartItems():Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.url);
  }

  getCartItemsById(id:number):Observable<CartItem>{
    return this.http.get<CartItem>(this.url+"/"+id);
  }

  postCartItems(data:any):Observable<any>{
    return this.http.post<any>(this.url,data);
  }

  deleteCartItems(id:number):Observable<CartItem>{
    return this.http.delete<CartItem>(this.url+"/"+id);
  }

  putCartItemsById(data:CartItem_1):Observable<CartItem_1>{
    console.log(this.url+"/"+data.id);
    console.log(JSON.stringify(data));
    const headers = {'Content-Type': 'application/json'};
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CartItem_1>(this.url+"/"+data.id,JSON.stringify(data),{ headers: headers });
  }

  getAllCartItemsByUser(id:number):Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.url+"/GetCartItemsByUser/"+id);
  }
}
