import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, UserPayment } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  PaymentDetailsUrl="http://localhost:5012/api/PaymentDetails";
  UserPaymentsUrl="http://localhost:5012/api/UserPayments";
  constructor(private http:HttpClient) { }


  //PaymentDetails

  getAllPaymentDetails():Observable<Payment[]>{
    return this.http.get<Payment[]>(this.PaymentDetailsUrl);
  }

  getPaymentDetailsById(id:number):Observable<Payment>{
    return this.http.get<Payment>(this.PaymentDetailsUrl+"/"+id);
  }

  postPaymentDetails(data:any):Observable<any>{
    return this.http.post<any>(this.PaymentDetailsUrl,data);
  }

  deletePaymentDetails(id:number):Observable<Payment>{
    return this.http.delete<Payment>(this.PaymentDetailsUrl+"/"+id);
  }

  //UserPayments

  getAllUserPayments():Observable<UserPayment[]>{
    return this.http.get<UserPayment[]>(this.UserPaymentsUrl);
  }

  getUserPaymentsById(id:number):Observable<UserPayment>{
    return this.http.get<UserPayment>(this.UserPaymentsUrl+"/"+id);
  }

  postUserPayments(data:UserPayment):Observable<UserPayment>{
    return this.http.post<UserPayment>(this.UserPaymentsUrl,data);
  }

  deleteUserPayments(id:number):Observable<UserPayment>{
    return this.http.delete<UserPayment>(this.UserPaymentsUrl+"/"+id);
  }

  GetUserPaymentsByUser(id:number):Observable<UserPayment[]>{
    return this.http.get<UserPayment[]>(this.UserPaymentsUrl+"/GetUserPaymentsByUser/"+id);
  }
}
