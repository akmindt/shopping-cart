import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from '../Entities/Product';
import { CartItem } from '../Entities/CartItem';
import { ProductService } from '../Services/product.service';
import { CartItemService } from '../Services/cart-item-service.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ScDeleteDialogComponent } from '../sc-delete-dialog/sc-delete-dialog.component';
import { ScAddToCartDialogComponent } from '../sc-add-to-cart-dialog/sc-add-to-cart-dialog.component';
import { ScEmptyCartDialogComponent } from '../sc-empty-cart-dialog/sc-empty-cart-dialog.component';

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
  stock: number;
  total: string;
}

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})


export class ShoppingCartComponent implements OnInit {
  public dcProducts = ['name', 'description', 'price', 'inStock', 'add'];
  public dcCartItems = ['name', 'description', 'quantity', 'total', 'remove'];
  public displayableProducts: DisplayableProduct[] = [];
  public displayableCartItems: DisplayableCartItem[] = [];
  public products: Product[] = [];
  public cartItems: CartItem[] = [];
  public subTotal: number = 0;
  public taxes: number = 0;
  public total: number = 0;
  
  @ViewChild('cartDrawer') cartDrawer?: MatSidenav;

  constructor(private productService: ProductService,
              private cartItemService: CartItemService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.generateMockData();
  }

  public toggleCart($event: any){
    if(this.cartItems.length > 0 || this.cartDrawer?.opened){
      this.cartDrawer?.toggle();
    } else {
      this.showEmptyCartAlert();
    }
  }

  private showEmptyCartAlert(){
    const dialogRef = this.dialog.open(ScEmptyCartDialogComponent, {
      width: '300px'
    });
  }

  public order(productId: number){
    if(this.products[productId - 1].stock > 0){

      const dialogRef = this.dialog.open(ScAddToCartDialogComponent, {
        width: '300px',
        data: {
          name: this.products[productId - 1].name,
          quantity: 1
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        this.productService.getProduct(productId).pipe(take(1)).subscribe(p => {
          p.stock -= result;
          this.productService.putProduct(p.productId, p).pipe(take(1)).subscribe(() => {
            const existingItem = this.cartItems.find(ci => ci.productId == productId);
            if(existingItem){
              existingItem.quantity += result;
              this.cartItemService.putCartItem(existingItem.cartItemId!, existingItem).pipe(take(1)).subscribe(() => {
                this.loadData(true);
              });
            } else {
              const newItem: CartItem = {
                productId: productId,
                quantity: result
              }
              this.cartItemService.postCartItem(newItem).subscribe(() => {
                this.loadData(true);
              });
            }
          });
        });
      });
    }
  }

  public remove(itemId: number){
    const dialogRef = this.dialog.open(ScDeleteDialogComponent, {
      width: '300px',
      data: itemId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cartItemService.getCartItem(result).subscribe(ci => {
        this.productService.getProduct(ci.productId).subscribe(p => {
          p.stock += ci.quantity;
          this.productService.putProduct(p.productId, p).subscribe(() => {

            this.cartItemService.deleteCartItem(result).subscribe(() => {
              this.loadData(false);
            });
          });
        });
      });
    });
  }

  public updateQuantity($event: number[]){
    this.cartItemService.getCartItem($event[0]).pipe(take(1)).subscribe( ci => {
      const originalAmount = ci.quantity;
      ci.quantity = $event[1];
      this.cartItemService.putCartItem($event[0], ci).pipe(take(1)).subscribe(() => {
        console.log("Updated quantity of item: " + $event[0]);
        this.productService.getProduct(ci.productId).pipe(take(1)).subscribe(p => {
          p.stock += originalAmount - $event[1];
          this.productService.putProduct(p.productId, p).pipe(take(1)).subscribe(() => {
            this.loadData(false);
          });
        }); 
      });
    });

  }

  private generateMockData() {
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
            console.log("Finished creating mock data.");
            this.loadData(true);
          });
        });
      });
    });
  }

  private loadData(toggleCart: boolean) {
    this.subTotal = 0;
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
              cartItemId: item.cartItemId!,
              name: product.name,
              description: product.description,
              quantity: item.quantity,
              stock: product.stock,
              total: "\$" + (item.quantity * product.price).toFixed(2)
            };
            this.subTotal += (item.quantity * product.price);
            newDisplayableItems.push(newDisplayableItem);
        });
        this.displayableCartItems = newDisplayableItems;
        this.taxes = this.subTotal * 0.08;
        this.total = this.subTotal + this.taxes;
        if(toggleCart || this.cartItems.length == 0){
          this.toggleCart(null);
        }
      });
    });
    
  }
}
