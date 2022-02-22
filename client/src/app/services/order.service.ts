import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order-interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: any[] = []
  constructor(private http:HttpClient) { }

  createNewOrder(order: Order) {
    console.log(order)
    return this.http.post(environment.baseUrl + "/orders/", order).pipe(
      map(res => {
       return console.log(res)
      }))
  }

}
