import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from '../Entities/Product';
import { CartItem } from '../Entities/CartItem';
import { ProductService } from '../Services/product.service';
import { CartItemService } from '../Services/cart-item-service.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';

export interface DisplayableProduct {
  productId: number;
  name: string;
  description?: string;
  inStock: string;
  price: string;
}

export interface DisplayableCartItem {
  cartItemId: number;
  name: string;
  description?: string;
  quantity: number;
  total: string;
}

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})


export class ShoppingCartComponent implements OnInit {
  public dcProducts = ['name', 'description', 'price', 'inStock', 'add'];
  public dcCartItems = ['name', 'description', 'quantity', 'total', 'remove']
  public displayableProducts: DisplayableProduct[] = [];
  public displayableCartItems: DisplayableCartItem[] = [];
  public products: Product[] = [];
  public cartItems: CartItem[] = [];
  public subTotal: number = 0;
  
  @ViewChild('cartDrawer') cartDrawer?: MatSidenav;

  constructor(private productService: ProductService,
              private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.generateMockData();
  }

  public toggleCart($event: any){
    this.cartDrawer?.toggle();
  }

  public order(productId: number){
    console.log("Ordering: " + productId);
  }

  public remove(cartId: number){
    console.log("Removing: " + cartId);
  }

  private generateMockData() {
    this.generateProducts();
  }

  private generateProducts(){
    console.log("Creating mock data in database");
    let productToAdd: Product =  {
      productId: 1,
      name: 'Superfast Jellyfish',
      description: 'A hot home cooked breakfast; delicious and piping hot in just three microwave minutes',
      stock: 100,
      price: 9.99
    };
    this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
      productToAdd =  {
        productId: 2,
        name: 'Hotdog In A Can!',
        description: 'Everything you love about hotdogs now in a can!',
        stock: 50,
        price: 5.49
      };
      this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
        productToAdd =  {
          productId: 3,
          name: 'Lucky Strike Cereals',
          description: 'Lucky Strikes are double toasted, they are so smooth',
          stock: 20,
          price: 4.99
        };
        this.productService.postProduct(productToAdd).pipe(take(1)).subscribe(() => {
          productToAdd =  {
            productId: 4,
            name: 'Ultrabudget Ramen: Flavorless',
            description: 'Flavorless Ramen now shaves all the flavor for half the price',
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

  private generateCartItems(){
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
            this.loadData();
          });
        });
      });
    });
  }

  private loadData() {
    this.productService.getAllProducts().pipe(take(1)).subscribe( res => {
      this.products = res;
      const newDisplayableProducts: DisplayableProduct[] = [];
      this.products.forEach(p => {
        const newDisplayableProduct: DisplayableProduct = {
          productId: p.productId,
          name: p.name,
          description: p.description,
          inStock: p.stock > 0 ? p.stock + ' In Stock' : 'Out of Stock',
          price: "\$" + p.price.toFixed(2)
        };
        newDisplayableProducts.push(newDisplayableProduct);
      });

      this.displayableProducts = newDisplayableProducts;
      
      this.cartItemService.getAllCartItems().pipe(take(1)).subscribe( res => {
        this.cartItems = res;
        const newDisplayableItems: DisplayableCartItem[] = [];
        this.cartItems.forEach(item => {
          const product = this.products[item.productId - 1];
          const newDisplayableItem: DisplayableCartItem = {
            cartItemId: item.cartItemId,
            name: product.name,
            description: product.description,
            quantity: item.quantity,
            total: "\$" + (item.quantity * product.price)
          };
          console.log(newDisplayableItem);
          this.subTotal += item.quantity * product.price;
          newDisplayableItems.push(newDisplayableItem);
        });
        this.displayableCartItems = newDisplayableItems;
      });
    });
    
  }
}
