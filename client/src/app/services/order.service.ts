import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../order/order.component';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: any[] = []
  constructor(private http:HttpClient) { }




  createOrder(order: Order) {
    return this.http.post(environment.baseUrl + "/orders", order);
  }
}
