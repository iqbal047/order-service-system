import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:9090/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

    update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + "/" + product.id, product);
  }

  delete(ProductId: any ){
    return this.http.delete(this.baseUrl + "/" + ProductId);
  }

}