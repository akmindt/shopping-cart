import { Component, OnInit } from '@angular/core';
import { Product } from '../Entities/Product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public dataSource = [];
  private products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.generateMockData();
  }

  generateMockData() {
    // let productToAdd: Product =  {
    //   name: 'Superfast Jellyfish',
    //   description: 'A hot home cooked breakfast; delicious and piping hot in just three microwave minutes',
    //   stock: 100,
    //   price: 9.99
    // };
    // this.productService.postProduct(productToAdd).subscribe(res => {
    //   if(res){
    //     console.log('added!');
    //   }
    // });
    this.productService.getAllProducts().subscribe(() => console.log('success!'));
  }


}
