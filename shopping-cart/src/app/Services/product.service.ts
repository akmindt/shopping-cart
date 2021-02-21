import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Entities/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'api/ProductsController';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
}
