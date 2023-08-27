import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem, Category, Discount, OrderDetail, OrderItem, Payment, User, UserPayment} from 'src/app/model';
import { Product } from 'src/app/model/product';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { PaymentService } from '../payment/payment.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  all={};
  product!:Observable<Product>;
  user!:User;
  userPayments!:UserPayment[];
  paymentDetails!:Payment[];
  orderItems!:OrderItem[];
  orderDetails!:OrderDetail[];
  cartItems!:CartItem[];
  discounts!:Discount[];
  ProductCategories!:Category[];
  //products!:p[];
  constructor(private http:HttpClient, private orderService:OrderService,
    private cartService:CartService, private paymentService:PaymentService,
    private productService:ProductService, private userService:UserService ) {

      this.userService.getUserById(1).subscribe((data:User)=>{
        this.user=data;
      })

      this.cartService.getAllCartItems().subscribe((data:CartItem[])=>{
        this.cartItems=data;
      })

      this.orderService.getAllOrderDetails().subscribe((data:OrderDetail[])=>{
        this.orderDetails=data;
      })

      this.orderService.getAllOrderItems().subscribe((data:OrderItem[])=>{
        this.orderItems=data;
      })

      this.paymentService.getAllPaymentDetails().subscribe((data:Payment[])=>{
        this.paymentDetails= data;
      })

      this.paymentService.getAllUserPayments().subscribe((data:UserPayment[])=>{
        this.userPayments=data;
      })

  }

  url="http://localhost:3000/products";

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
  }

  getFilteredProducts(query:any):Observable<Product[]>{

    return this.getAllProducts().pipe(map((data:Product[])=>{
      return data.filter((dta)=>{
        console.log(dta);

        console.log(dta.brand.toLowerCase().includes(query.toLowerCase()));

        return dta.brand.includes(query);
      })
    }))
  }

  getFilteredProductsWithQuery(query:any):Observable<Product[]>{
    if(query){
      return this.http.get<Product[]>(this.url+"?q="+query)
    }
    return this.getAllProducts();
  }

  getProductById(id:number):Observable<Product>{

    return this.http.get<Product>(this.url+"?id="+id);
  }

  getProductByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+"?subCategory="+category);
  }

  getProductByBrand(brand:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+"?brand="+brand);
  }

  getAllUsers():Observable<User[]>{
    //console.log(this.user);
    return this.http.get<User[]>("http://localhost:5012/api/Users");


  }

  //all user demo


}
