
  export interface Category {
      id: number;
      name: string;
      description: string;
  }

  export interface Discount {
      id: number;
      discountPercentage: number;
  }

  export interface OrderItem {
      id: number;
      orderId: number;
      productId: number;
      quantity: number;
  }

  export interface Product {
      id: number;
      brandName: string;
      description: string;
      quantity: number;
      price: number;
      categoryId: number;
      discountId: number;
      imageUrl: string;
  }

  export interface CartItem_1 {
      id: number;
      userId: number;
      productId: number;
      quantity: number;
  }

  export interface Payment {
      id: number;
      amount: number;
      status: string;
  }

  export interface OrderDetail {
      id: number;
      userId: number;
      total: number;
      paymentId: number;
  }

  export interface UserPayment {
      id: number;
      userId: number;
      paymentType: string;
      accountNo: number;
      expiry: Date;
  }

  export interface User {
      id: number;
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: number;
      address: string;
  }

  export interface User_1 {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: number;
    address: string;
}

  export interface Master{
    user:User,
    userPayment:UserPayment[],
    orderDetail:OrderDetail[],
    payment:Payment[],
    cartItem:CartItem[],
    orderItem:OrderItem[],
    discount:Discount[],
    category:Category[]

  }

  export interface All_Product {
    id: number
    description: string
    brandName: string
    quantity: number
    price: number
    imageUrl: string
    discountPercentage: number
    name: string
    p_desc: string
  }

  export interface CartItem {
    id: number
    userId: number
    quantity: number
    productId: number
    description: string
    brandName: string
    p_quantity: number
    price: number
    imageUrl: string
    discountPercentage: number
    name: string
    p_desc: string
  }

