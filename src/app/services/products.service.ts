import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private productHttp: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.productHttp.get<Product[]>("http://localhost:3000/api/products")
  }

}