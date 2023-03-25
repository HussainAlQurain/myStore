import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../types/product';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../types/decodedToken';
import { OrderProduct } from '../types/OrderProduct';
import { Order } from '../types/order';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private order: string | undefined;

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

  //get the order id by the user id
  getOrderId(): Observable<Order> {
    let userId = this.getUserId();
    return this.productHttp.get<Order>(`http://localhost:3000/api/orders/${userId}`)
  }

  //create a new order if the user doesn't have one
  createOrder(): Observable<Order> {
    let userId = this.getUserId();
    return this.productHttp.post<Order>(`http://localhost:3000/api/orders/create`, {
      status: 'active',
      user_id: userId
    })
  }


  // add the product to the cart
  addToCart(quantity: number, productId: string): Observable<OrderProduct> {
    let userId = this.getUserId();

    if (this.order == undefined) {
      return this.getOrderId().pipe(
        tap(data => {
          this.order = data.id?.toString();
        }),
        catchError(err => {
          if (err.status == 404) {
            console.log('create no order')
          }
          return this.createOrder().pipe(
            tap(data => {
              this.order = data.id?.toString();
            })
          )
        }),
        switchMap(() => {
          return this.productHttp.post<OrderProduct>(`http://localhost:3000/api/orders/${this.order}/products`, {
            quantity: quantity,
            orderId: this.order,
            productId: productId
          })
        })
      )
    }
  return this.productHttp.post<OrderProduct>(`http://localhost:3000/api/orders/${this.order}/products`, {
      quantity: quantity,
      orderId: this.order,
      productId: productId
    })
  }


}
