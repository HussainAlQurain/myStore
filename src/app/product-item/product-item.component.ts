import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedValue: number = 1;
  @Input() product: Product;
  constructor(){
    this.product = {
      id:0,
      name: 'test',
      price: 20,
      url: 'test',
      description: ''
    }
  }

  ngOnInit(): void{

  }

}
