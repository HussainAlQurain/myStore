import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OrderProduct } from '../types/OrderProduct';
import { Product } from '../types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products_in_order: OrderProduct[] = [];
  products: Product[] = [];
  constructor(private http: ProductsService ) { }


  getProductDetails(id: number){
    return this.http.getProduct(id).subscribe((data) => {
      this.products.push(data);
    })
  }

  ngOnInit(): void {
     this.http.getCartProducts().subscribe((data) => {
      this.products_in_order = data;
      this.initializeProducts();
    })
  }
  //function that initializes the products array after the products_in_order array is initialized
  //and then calls the getProductDetails function for each product in the products_in_order array
  initializeProducts(){
    this.products_in_order.map((product) => {
      this.getProductDetails(parseInt(product.product_id))
    })
  }

  onSubmit(){
    console.log('submitted');
  }
  

}