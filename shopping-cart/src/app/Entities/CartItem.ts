import { Product } from "./Product";

export interface CartItem {
    cartItemId?: number;
    productId: number;
    quantity: number;
}