import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-completion',
  templateUrl: './order-completion.component.html',
  styleUrls: ['./order-completion.component.css']
})
export class OrderCompletionComponent implements OnInit {
  name: string | null = '';
  price: number | null = 0;


  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      this.price = Number(params['price']);
    });
  }

}

