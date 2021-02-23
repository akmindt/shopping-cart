import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Entities/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api: string = 'http://localhost:5000/api/Products';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.api + '/' + id);
  }

  postProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.api, product);
  }

  putProduct(id: number, product: Product): Observable<Product>{
    return this.http.put<Product>(this.api + '/' + id, product);
  }
}
