import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { All_Product, Category, Discount, Product } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="http://localhost:5012/api/Products";
  productCategoriesUrl="http://localhost:5012/api/ProductCategories"
  productDiscountUrl="http://localhost:5012/api/Discounts";
  FavoriteProductUrl="http://localhost:5012/api/FavoriteProducts";

  constructor(private http:HttpClient) { }


  //Product

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getProductsById(id:number):Observable<Product>{
    return this.http.get<Product>(this.url+"/"+id);
  }

  postProducts(data:Product):Observable<Product>{
    return this.http.post<Product>(this.url,data);
  }

  deleteProducts(id:number):Observable<Product>{
    return this.http.delete<Product>(this.url+"/"+id);
  }

  GetAllProductsWithDiscountAndCategory():Observable<All_Product[]>{
    return this.http.get<All_Product[]>(this.url+"/GetAllProductsWithDiscountAndCategory");
  }

  GetAllProductsWithDiscountAndCategoryByProductId(productId:number):Observable<All_Product[]>{
    return this.http.get<All_Product[]>(this.url+"/GetAllProductsWithDiscountAndCategoryByProductId/"+productId);
  }


  //ProductsCategories

  getAllProductsCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.productCategoriesUrl);
  }

  getProductsCategoriesById(id:number):Observable<Category>{
    return this.http.get<Category>(this.productCategoriesUrl+"/"+id);
  }

  postProductsCategories(data:Category):Observable<Category>{
    return this.http.post<Category>(this.productCategoriesUrl,data);
  }

  deleteProductsCategories(id:number):Observable<Category>{
    return this.http.delete<Category>(this.productCategoriesUrl+"/"+id);
  }

  //product discount

  getAllProductsDiscount():Observable<Discount[]>{
    return this.http.get<Discount[]>(this.productCategoriesUrl);
  }

  getProductsDiscountById(id:number):Observable<Discount>{
    return this.http.get<Discount>(this.productCategoriesUrl+"/"+id);
  }

  postProductsDiscount(data:Discount):Observable<Discount>{
    return this.http.post<Discount>(this.productCategoriesUrl,data);
  }

  deleteProductsDiscount(id:number):Observable<Discount>{
    return this.http.delete<Discount>(this.productCategoriesUrl+"/"+id);
  }

  //favorite product

  getAllFavoriteProducts():Observable<any>{
    return this.http.get<any>(this.FavoriteProductUrl)
  }

  getFavoriteProductById(id:number):Observable<any>{
    return this.http.get<any>(this.FavoriteProductUrl+"/"+id);
  }

  postFavoriteProduct(data:any):Observable<any>{
    return this.http.post<any>(this.FavoriteProductUrl,data);
  }

  deleteFavoriteProduct(id:number):Observable<any>{
    return this.http.delete<any>(this.FavoriteProductUrl+"/"+id);
  }

  getAllFavoriteProductsByUser(id:number):Observable<any>{
    return this.http.get<any>(this.FavoriteProductUrl+"/GetFavoriteProductsByUser/"+id);
  }

  GetFavoriteProductsWithProductDetailsByUser(id:number):Observable<any>{
    return this.http.get<any>(this.FavoriteProductUrl+"/GetFavoriteProductsWithProductDetailsByUser/"+id);
  }
}
