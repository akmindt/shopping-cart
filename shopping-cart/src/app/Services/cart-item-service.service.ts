import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../Entities/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  
  private api: string = 'http://localhost:5000/api/CartItems';
  constructor(private http: HttpClient) { }

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.api);
  }

  getAllCartItemsByType(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.api + '/CartId/' + cartId);
  }

  getCartItem(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(this.api + '/' + id);
  }

  postCartItem(CartItem: CartItem): Observable<CartItem>{
    return this.http.post<CartItem>(this.api, CartItem);
  }

  putCartItem(id: number, CartItem: CartItem): Observable<CartItem>{
    return this.http.put<CartItem>(this.api + '/' + id, CartItem);
  }

  deleteCartItem(id: number) {
    return this.http.delete<CartItem>(this.api + '/' + id);
  }
}
