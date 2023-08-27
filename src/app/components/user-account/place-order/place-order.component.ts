import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { All_Product, CartItem, User } from 'src/app/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  products!:CartItem[];
  //product!:All_Product[];
  productId!:number;
  editCartItem!:any;
  total=0;
  discount=0;
  deliveryCharges="Free"
  isUserLoggedIn!:boolean;
  userDetails!:User;
  payId!:any;
  buyNowQuantity:number=1;

  constructor(private authService:AuthService, private cartService:CartService, private productService:ProductService,
    private paymentService:PaymentService, private orderService:OrderService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.payId=0;
    this.products=[];
    this.total=0;
    this.discount=0;
    this.userDetails=this.authService.loggedInUserDetails;
    this.isUserLoggedIn=this.authService.isUserLoggedIn_1;
    console.log(this.isUserLoggedIn);

    this.route.queryParamMap.subscribe(param=>{
      if(param.has('productId')){
        this.productId=Number(param.get('productId'));
      }
      console.log(this.productId);
    })

    if(this.productId){
      console.log("yes");
      this.productService.GetAllProductsWithDiscountAndCategoryByProductId(this.productId).subscribe((res)=>{
        const product={
          id: 0,
          userId: this.userDetails.id,
          quantity: this.buyNowQuantity,
          productId: res[0].id,
          description: res[0].description,
          brandName: res[0].brandName,
          p_quantity: res[0].quantity,
          price: res[0].price,
          imageUrl: res[0].imageUrl,
          discountPercentage: res[0].discountPercentage,
          name: res[0].name,
          p_desc: res[0].p_desc
        }
        console.log(product);
        this.products.push(product)
        this.total=this.products[0].price*this.products[0].quantity;
        this.discount=(this.products[0].price*this.products[0].discountPercentage/100)*this.products[0].quantity

      })

    }
    else{

      if(this.authService.isUserLoggedIn_1){
        this.cartService.getAllCartItemsByUser(this.authService.loggedInUserDetails.id).subscribe(data=>{
          // setTimeout(()=>{},1000);
          console.log(data);
          // console.log(this.product.filter(res => data.every(filter => res["id"]===filter.productId)));
          // this.products=this.product.filter(res => data.every(filter => res["id"]===filter.productId));
          this.products=data;
          for(let item of this.products){
            this.total=this.total+item.price*item.quantity;
            this.discount=this.discount+(item.price*item.discountPercentage/100)*item.quantity;
          }
          console.log(this.total);

        })
      }
    }
  }

  onDecreaseQuantityClick(product:CartItem){
    this.editCartItem={
      id:product.id,
      userId:product.userId,
      productId:product.productId,
      quantity:(product.quantity-1)
    }
    console.log(this.editCartItem);
    this.cartService.putCartItemsById(this.editCartItem).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 100);

  }

  onIncreaseQuantityClick(product:CartItem){
    this.editCartItem={
      id:product.id,
      userId:product.userId,
      productId:product.productId,
      quantity:(product.quantity+1)
    }
    console.log(this.editCartItem);

    this.cartService.putCartItemsById(this.editCartItem).subscribe()
    //console.log(productId);

    setTimeout(() => {
      this.ngOnInit();
    }, 100);
  }

  onRemoveCartItemClick(id:number){
    this.cartService.deleteCartItems(id).subscribe();
    setTimeout(() => {
      this.ngOnInit();
      this.authService.isUserLoggedIn.next(true);
    }, 100);

  }

  onPayClick(){
    const paymentDetails={
      amount:this.total-this.discount,
      status:"Completed"
    }
    this.paymentService.postPaymentDetails(paymentDetails).subscribe()
    console.log(paymentDetails);
    setTimeout(() => {
      this.paymentService.getAllPaymentDetails().subscribe(res=>{
        this.payId=res[res.length-1].id;
        console.log(this.payId);
      })
    }, 100);

    setTimeout(() => {
      const orderDetails={
        userId:this.authService.loggedInUserDetails.id,
        total:this.total-this.discount,
        paymentId:this.payId
      }
      console.log(orderDetails);
      this.orderService.postOrderDetails(orderDetails).subscribe();
      setTimeout(() => {
        this.orderService.getAllOrderDetails().subscribe(res=>{
          this.products.forEach((data)=>{
            const orderItems={
              orderId:res[res.length-1].id,
              productId:data.productId,
              quantity:data.quantity
            }
            this.orderService.postOrderItems(orderItems).subscribe()
            console.log(orderItems);
          })
        })

      }, 100);

    }, 150);

  }

  onDecreaseQuantityClickBuyNow(product:CartItem){
    this.buyNowQuantity--;
    this.ngOnInit();
  }

  onIncreaseQuantityClickBuyNow(product:CartItem){
    this.buyNowQuantity++;
    this.ngOnInit();
  }

  onPayClickBuyNow(){
    const paymentDetails={
      amount:this.total-this.discount,
      status:"Completed"
    }
    this.paymentService.postPaymentDetails(paymentDetails).subscribe()
    console.log(paymentDetails);
    setTimeout(() => {
      this.paymentService.getAllPaymentDetails().subscribe(res=>{
        this.payId=res[res.length-1].id;
        console.log(this.payId);
      })
    }, 100);

    setTimeout(() => {
      const orderDetails={
        userId:this.authService.loggedInUserDetails.id,
        total:this.total-this.discount,
        paymentId:this.payId
      }
      console.log(orderDetails);
      this.orderService.postOrderDetails(orderDetails).subscribe();
      setTimeout(() => {
        this.orderService.getAllOrderDetails().subscribe(res=>{
        const orderItems={
          orderId:res[res.length-1].id,
          productId:this.products[0].productId,
          quantity:this.products[0].quantity
        }
        this.orderService.postOrderItems(orderItems).subscribe()
        console.log(orderItems);

      })

      }, 100);

    }, 200);

  }

  onOrderPlaced(){
    console.log('hello');

  }
}
