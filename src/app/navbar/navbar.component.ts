import { Component, OnInit } from '@angular/core';
import { concatMap, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, private http: ProductsService) {}

  ngOnInit(){
    
  }

  addTestProducts() {
    this.http.getJson().pipe(
      concatMap((data: Product[]) => {
        const obs = data.map(p => this.http.addProducts(p));
        return forkJoin(obs);
      })
    ).subscribe(
      () => {
        console.log('Products added successfully');
      },
      (error) => {
        console.error('Error adding products:', error);
      }
    );
  }

}
