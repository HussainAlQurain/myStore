import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products!: Product[];

  constructor(private http: ProductsService){

  }

  ngOnInit(){
    this.http.getProducts().subscribe(data => {
      this.products = data;
    })
  }

}
