import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from '../Entities/Product';
import { CartItem } from '../Entities/CartItem';
import { ProductService } from '../Services/product.service';
import { CartItemService } from '../Services/cart-item-service.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public displayableProducts = [];
  public products: Product[] = [];
  public cartItems: CartItem[] = [];



  constructor(private productService: ProductService,
              private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.generateMockData();
  }

  generateMockData() {
    this.generateProducts();
  }

  generateProducts(){
    console.log("Creating mock data in database");
    let productToAdd: Product =  {
      name: 'Superfast Jellyfish',
      description: 'A hot home cooked breakfast; delicious and piping hot in just three microwave minutes',
      stock: 100,
      price: 9.99
    };
    this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
      productToAdd =  {
        name: 'Hotdog In A Can!',
        description: 'Everything you love about hotdogs now in a can!',
        stock: 50,
        price: 5.49
      };
      this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
        productToAdd =  {
          name: 'Lucky Strike Cereals',
          description: 'Lucky Strikes are double toasted, they are so smooth',
          stock: 20,
          price: 4.99
        };
        this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
          productToAdd =  {
            name: 'Ultrabudget Ramen: Flavorless',
            description: 'All new from UBR! Even more SFW (Safe For Wallet), Flavorless Ramen now shaves all the flavor for half the price',
            stock: 1000,
            price: 0.10
          };
          this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
            this.generateCartItems();
          });
        });
      });
    });
  }

  generateCartItems(){
    let cartItemToAdd: CartItem = {
      cartItemId: 1,
      shoppingCartId: 1,
      productId: 1,
      quantity: 5
    };
    this.cartItemService.postCartItem(cartItemToAdd).pipe(take(1)).subscribe(() => {
      let cartItemToAdd: CartItem = {
        cartItemId: 2,
        shoppingCartId: 1,
        productId: 2,
        quantity: 3
      };
      this.cartItemService.postCartItem(cartItemToAdd).pipe(take(1)).subscribe(() => {
        let cartItemToAdd: CartItem = {
          cartItemId: 3,
          shoppingCartId: 1,
          productId: 3,
          quantity: 1
        };
        this.cartItemService.postCartItem(cartItemToAdd).pipe(take(1)).subscribe(() => {
          let cartItemToAdd: CartItem = {
            cartItemId: 4,
            shoppingCartId: 1,
            productId: 4,
            quantity: 100
          };
          this.cartItemService.postCartItem(cartItemToAdd).pipe(take(1)).subscribe(() => {
            console.log("Finished creating mock data.");
          });
        });
      });
    });
  }

}
