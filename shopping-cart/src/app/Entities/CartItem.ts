import { Product } from "./Product";

export interface CartItem {
    cartItemId: number;
    shoppingCartId: number;
    productId: number;
    quantity: number;
}