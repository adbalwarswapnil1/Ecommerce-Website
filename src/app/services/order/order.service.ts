import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail, OrderItem } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  OrderItemsUrl="http://localhost:5012/api/OrderItems";
  OrderDetailsUrl="http://localhost:5012/api/OrderDetails";

  constructor(private http:HttpClient) { }


  //OrderDetails

  getAllOrderDetails():Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(this.OrderDetailsUrl);
  }

  getOrderDetailsById(id:number):Observable<OrderDetail>{
    return this.http.get<OrderDetail>(this.OrderDetailsUrl+"/"+id);
  }

  postOrderDetails(data:any):Observable<any>{
    return this.http.post<any>(this.OrderDetailsUrl,data);
  }

  deleteOrderDetails(id:number):Observable<OrderDetail>{
    return this.http.delete<OrderDetail>(this.OrderDetailsUrl+"/"+id);
  }

  GetOrderDetailsByUser(id:number):Observable<any>{
    return this.http.get<any>(this.OrderDetailsUrl+"/GetOrderDetailsByUser/"+id);
  }


  //OrderItems

  getAllOrderItems():Observable<OrderItem[]>{
    return this.http.get<OrderItem[]>(this.OrderItemsUrl);
  }

  getOrderItemsById(id:number):Observable<OrderItem>{
    return this.http.get<OrderItem>(this.OrderItemsUrl+"/"+id);
  }

  postOrderItems(data:any):Observable<any>{
    return this.http.post<any>(this.OrderItemsUrl,data);
  }

  deleteOrderItems(id:number):Observable<OrderItem>{
    return this.http.delete<OrderItem>(this.OrderItemsUrl+"/"+id);
  }
}
