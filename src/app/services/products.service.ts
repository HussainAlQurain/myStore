import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../types/product';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../types/decodedToken';
import { OrderProduct } from '../types/OrderProduct';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private orderId: string | undefined;

  constructor(private productHttp: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.productHttp.get<Product[]>("http://localhost:3000/api/products")
  }
  //for testing
  addProducts(p: Product): Observable<Product[]> {
    return this.productHttp.post<Product[]>("http://localhost:3000/api/products/create", p)
  }

  getJson(): Observable<Product[]> {
    return this.productHttp.get<Product[]>('../../assets/data.json')
  }

  //get the token from local storage and decode it
  //then return the user id
  getUserId(): number {
    let token: string = localStorage.getItem('token')!;
    let decoded: DecodedToken = jwt_decode(token);
    return decoded["user"]["id"];
  }

  //add the product to the cart
  addToCart(quantity: number, orderId: string, productId: string): Observable<OrderProduct> {
    return this.productHttp.post<OrderProduct>(`http://localhost:3000/api/orders/${orderId}/products`, {
      quantity: quantity,
      orderId: orderId,
      productId: productId
    })
  }


}
