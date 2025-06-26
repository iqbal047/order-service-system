import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:9090/api/orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }
  
  update(order: Order): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + "/" + order.id, order);
  }

    delete(orderId: any ){
    return this.http.delete(this.baseUrl + "/" + orderId);
  }

}
