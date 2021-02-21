import { Component, OnInit } from '@angular/core';
import { Product } from '../Entities/Product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  generateMockData() {
    
  }


}
